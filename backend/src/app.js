import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { validateLead } from './validation.js';

export function createApp({ insertLead, checkDatabase, allowedOrigins, rateLimitMax = 30 }) {
  const app = express();
  const allow = new Set(allowedOrigins);
  // Nginx must forward its own $remote_addr, not an untrusted chain of IP headers.
  app.set('trust proxy', 'loopback');
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(express.json({ limit: '16kb', strict: true }));

  // Only approved website origins may use the browser-facing API.
  app.use(cors({
    origin(origin, callback) {
      callback(null, Boolean(origin && allow.has(origin)));
    },
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    maxAge: 600,
  }));

  app.get('/api/health', (_req, res) => res.status(200).json({ ok: true, service: 'xpertsedge-leads-api' }));
  app.get('/api/health/ready', async (_req, res) => {
    const startedAt = Date.now();
    try {
      await checkDatabase();
      res.status(200).json({ ok: true });
    } catch (err) {
      // Diagnose connection failures without exposing credentials to clients/logs.
      const safeMessage = (message) => String(message ?? '')
        .replaceAll(process.env.DATABASE_URL || 'DATABASE_URL_NOT_SET', '[DB_URL_REDACTED]')
        .replace(/postgres(?:ql)?:\/\/[^\s"']+/gi, '[DB_URL_REDACTED]')
        .replace(/(password|passwd|pwd|token|secret)\s*[:=]\s*[^\s,}]+/gi, '$1=[REDACTED]')
        .slice(0, 240);
      console.error('Database readiness failed', {
        pid: process.pid,
        code: err?.code ?? err?.cause?.code ?? 'UNKNOWN',
        name: err?.name ?? 'Error',
        message: safeMessage(err?.message),
        cause: safeMessage(err?.cause?.message),
        nestedCodes: Array.isArray(err?.errors)
          ? err.errors.map(e => e?.code ?? 'UNKNOWN').slice(0, 4)
          : undefined,
        elapsedMs: Date.now() - startedAt,
      });
      res.status(503).json({ ok: false });
    }
  });

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: rateLimitMax,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests. Please try again later.' },
  });

  app.post('/api/leads', limiter, async (req, res) => {
    const origin = req.get('Origin');
    // Non-browser health checks and curl requests with no Origin are allowed;
    // don't mistake Origin filtering for authorization (this is a public form).
    if (origin && !allow.has(origin)) {
      return res.status(403).json({ success: false, message: 'Origin not allowed.' });
    }
    const result = validateLead(req.body);
    if (!result.success) {
      return res.status(400).json({ success: false, message: 'Please check your form details.' });
    }
    if (result.data.website) {
      // Honeypot bots get an uninformative response without a database write.
      return res.status(202).json({ success: true, accepted: true });
    }
    try {
      const { created } = await insertLead(result.data);
      return res.status(created ? 201 : 200).json({
        success: true,
        leadId: result.data.leadId,
        duplicate: !created,
      });
    } catch (err) {
      // Never include database details, SQL or connection strings in public responses.
      console.error('Lead database insert failed', err instanceof Error ? err.name : 'UnknownError');
      return res.status(503).json({ success: false, message: 'Enquiry service is temporarily unavailable.' });
    }
  });

  app.use((err, _req, res, _next) => {
    if (err?.type === 'entity.too.large') {
      return res.status(413).json({ success: false, message: 'Form content is too large.' });
    }
    return res.status(400).json({ success: false, message: 'Invalid request.' });
  });
  return app;
}

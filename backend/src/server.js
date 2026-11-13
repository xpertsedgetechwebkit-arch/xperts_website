import 'dotenv/config';
import { createApp } from './app.js';
import { createLeadRepository } from './db.js';
import { createMsg91Verifier } from './msg91.js';

const port = Number(process.env.PORT || 3001);
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map(s => s.trim()).filter(Boolean);
const rateLimitMax = Number(process.env.RATE_LIMIT_MAX || 30);

if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
if (!allowedOrigins.length) throw new Error('Set ALLOWED_ORIGINS before starting the API');
if (!Number.isInteger(rateLimitMax) || rateLimitMax < 1 || rateLimitMax > 1000) throw new Error('Invalid RATE_LIMIT_MAX');

const repository = createLeadRepository(process.env.DATABASE_URL);
const otpRequired = process.env.MSG91_OTP_REQUIRED === 'true';
const verifyOtpAccessToken = otpRequired
  ? createMsg91Verifier({ authKey: process.env.MSG91_AUTHKEY })
  : undefined;
const app = createApp({ ...repository, allowedOrigins, rateLimitMax, otpRequired, verifyOtpAccessToken });
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`XpertsEdge Leads API listening on 127.0.0.1:${port}`);
});

function stop() {
  server.close(() => repository.close().finally(() => process.exit(0)));
  setTimeout(() => process.exit(1), 10000).unref();
}
process.on('SIGTERM', stop);
process.on('SIGINT', stop);

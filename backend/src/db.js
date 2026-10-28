import pg from 'pg';

// Use the restricted writer DB role, not a service-role key or the postgres superuser.
export function createLeadRepository(databaseUrl) {
  if (!databaseUrl || /YOUR_PROJECT_REF|YOUR_SESSION_POOLER_HOST|URL_ENCODED_PASSWORD/.test(databaseUrl)) {
    throw new Error('DATABASE_URL must be configured in the server-only .env file.');
  }
  const pool = new pg.Pool({
    connectionString: databaseUrl,
    max: 3,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    ssl: { rejectUnauthorized: true },
    application_name: 'xpertsedge-leads-api',
  });

  return {
    async insertLead(lead) {
      const a = lead.attribution || {};
      const message = lead.company
        ? `Company: ${lead.company}\n${lead.message}`.trim()
        : lead.message;

      const { rowCount } = await pool.query({
        text: `INSERT INTO public.website_leads (
          id, full_name, phone, email, interested_course, form_type, message,
          lead_status, utm_source, utm_medium, utm_campaign, utm_content,
          utm_term, landing_page, referrer_url
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,
          'new',$8,$9,$10,$11,$12,$13,$14
        ) ON CONFLICT DO NOTHING`,
        values: [
          lead.leadId, lead.name,
          lead.phone || null, lead.email, lead.course || null,
          lead.formType, message || null,
          a.utm_source || null, a.utm_medium || null,
          a.utm_campaign || null, a.utm_content || null,
          a.utm_term || null, a.landing_page || null, a.referrer_url || null,
        ],
      });
      return { created: rowCount === 1 };
    },
    async checkDatabase() {
      await pool.query('SELECT 1');
    },
    async close() {
      await pool.end();
    },
  };
}

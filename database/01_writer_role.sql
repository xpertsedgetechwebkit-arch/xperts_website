-- RUN ONCE IN SUPABASE SQL EDITOR using the project admin role.
-- IMPORTANT: Replace the placeholder with a strong, NEW password (>24 characters).
-- Do not share screenshots of this query with the password filled in.
-- This is for the Node.js backend only, NEVER the browser.
DO $$
DECLARE
  writer_password text := 'REPLACE_WITH_A_LONG_RANDOM_PASSWORD';
BEGIN
  IF writer_password = 'REPLACE_WITH_A_LONG_RANDOM_PASSWORD' OR length(writer_password) < 24 THEN
    RAISE EXCEPTION 'Set a unique password of at least 24 characters before running';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'xpertsedge_leads_writer') THEN
    EXECUTE format('CREATE ROLE xpertsedge_leads_writer LOGIN PASSWORD %L', writer_password);
  ELSE
    -- Re-running deliberately rotates the backend role password.
    EXECUTE format('ALTER ROLE xpertsedge_leads_writer PASSWORD %L', writer_password);
  END IF;
END $$;

GRANT CONNECT ON DATABASE postgres TO xpertsedge_leads_writer;
GRANT USAGE ON SCHEMA public TO xpertsedge_leads_writer;
GRANT INSERT ON TABLE public.website_leads TO xpertsedge_leads_writer;

-- RLS permits this *specific database role* to insert only; no read/update/delete.
ALTER TABLE public.website_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS xpertsedge_leads_writer_insert ON public.website_leads;
CREATE POLICY xpertsedge_leads_writer_insert ON public.website_leads
  FOR INSERT TO xpertsedge_leads_writer
  WITH CHECK (true);

-- Verify role capabilities. Expected: insert=true; read=false; update=false; delete=false.
SELECT
  has_table_privilege('xpertsedge_leads_writer', 'public.website_leads', 'INSERT') AS can_insert,
  has_table_privilege('xpertsedge_leads_writer', 'public.website_leads', 'SELECT') AS can_read,
  has_table_privilege('xpertsedge_leads_writer', 'public.website_leads', 'UPDATE') AS can_update,
  has_table_privilege('xpertsedge_leads_writer', 'public.website_leads', 'DELETE') AS can_delete;

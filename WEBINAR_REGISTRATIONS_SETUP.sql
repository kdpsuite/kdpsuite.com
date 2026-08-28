-- Webinar registrations table for /api/webinar/register
CREATE TABLE IF NOT EXISTS public.webinar_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_webinar_registrations_email
  ON public.webinar_registrations (email);

ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;

-- Service role manages inserts; no public read access to PII
DROP POLICY IF EXISTS "Service role manages webinar registrations" ON public.webinar_registrations;
CREATE POLICY "Service role manages webinar registrations"
  ON public.webinar_registrations
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

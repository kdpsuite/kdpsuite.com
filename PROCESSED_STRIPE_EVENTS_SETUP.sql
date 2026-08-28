-- Stripe webhook idempotency table
CREATE TABLE IF NOT EXISTS public.processed_stripe_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX IF NOT EXISTS idx_processed_stripe_events_processed_at
  ON public.processed_stripe_events (processed_at);

ALTER TABLE public.processed_stripe_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role manages processed stripe events" ON public.processed_stripe_events;
CREATE POLICY "Service role manages processed stripe events"
  ON public.processed_stripe_events
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Referral program table for ?ref= tracking and dashboard stats
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  referred_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'converted', 'paid')),
  commission NUMERIC(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_referrals_referred_email
  ON public.referrals (referred_email);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id
  ON public.referrals (referrer_id);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own referrals" ON public.referrals;
CREATE POLICY "Users can read their own referrals"
  ON public.referrals
  FOR SELECT
  USING (auth.uid() = referrer_id);

DROP POLICY IF EXISTS "Service role manages referrals" ON public.referrals;
CREATE POLICY "Service role manages referrals"
  ON public.referrals
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

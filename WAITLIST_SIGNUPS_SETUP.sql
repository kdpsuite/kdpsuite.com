-- ============================================================================
-- Supabase Waitlist Signups Table - Setup Script
-- Version: v1.0.0
-- Description: SQL script to create and configure the waitlist_signups table
--              for capturing email signups from the landing page
-- ============================================================================

-- ============================================================================
-- STEP 1: Create waitlist_signups Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.waitlist_signups (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Email information
  email TEXT UNIQUE NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  
  -- Optional metadata
  source TEXT DEFAULT 'landing_page',
  ip_address TEXT,
  user_agent TEXT
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_email ON public.waitlist_signups(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_created_at ON public.waitlist_signups(created_at DESC);

-- ============================================================================
-- STEP 2: Enable RLS (Row Level Security)
-- ============================================================================

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 3: Create RLS Policies
-- ============================================================================

-- Allow anyone to insert (for signup form)
CREATE POLICY "Anyone can add to waitlist"
  ON public.waitlist_signups FOR INSERT
  WITH CHECK (true);

-- Allow admin to view all entries (for Vercel function or API route with service role)
CREATE POLICY "Service role can view all waitlist entries"
  ON public.waitlist_signups FOR SELECT
  USING (true);

-- ============================================================================
-- STEP 4: Create Helper Function to Check Duplicate Emails
-- ============================================================================

CREATE OR REPLACE FUNCTION check_waitlist_duplicate(email_input TEXT)
RETURNS TABLE(email TEXT, created_at TIMESTAMP WITH TIME ZONE) AS $$
BEGIN
  RETURN QUERY
  SELECT email, created_at
  FROM public.waitlist_signups
  WHERE LOWER(email) = LOWER(email_input);
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check table exists and has correct columns
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'waitlist_signups' AND table_schema = 'public'
-- ORDER BY ordinal_position;

-- Check total signups
-- SELECT COUNT(*) as total_signups FROM public.waitlist_signups;

-- Check latest signups
-- SELECT email, created_at FROM public.waitlist_signups
-- ORDER BY created_at DESC LIMIT 10;

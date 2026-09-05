-- ============================================================================
-- Supabase User Profiles Table - Complete Setup & Validation Script
-- Version: v0.7.0
-- Description: Complete SQL script to set up, validate, and maintain the 
--              user_profiles table with all necessary columns, indexes, 
--              RLS policies, and triggers. Includes Stripe subscription columns.
-- ============================================================================

-- ============================================================================
-- STEP 1: Create or Validate user_profiles Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
  -- Primary key: references auth.users(id)
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- User information
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  
  -- Subscription information
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'inactive',
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  
  -- Stripe specific columns
  stripe_customer_id TEXT,
  subscription_id TEXT,
  subscription_plan TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  
  -- Additional metadata
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  login_count INTEGER DEFAULT 0
);

-- ============================================================================
-- STEP 2: Add Missing Columns (if they don't exist)
-- ============================================================================

DO $$ 
BEGIN
  -- Subscription Start Date
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'subscription_start_date') THEN
    ALTER TABLE public.user_profiles ADD COLUMN subscription_start_date TIMESTAMP WITH TIME ZONE;
  END IF;

  -- Subscription End Date
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'subscription_end_date') THEN
    ALTER TABLE public.user_profiles ADD COLUMN subscription_end_date TIMESTAMP WITH TIME ZONE;
  END IF;

  -- Stripe Customer ID
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'stripe_customer_id') THEN
    ALTER TABLE public.user_profiles ADD COLUMN stripe_customer_id TEXT;
  END IF;

  -- Subscription ID
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'subscription_id') THEN
    ALTER TABLE public.user_profiles ADD COLUMN subscription_id TEXT;
  END IF;

  -- Subscription Plan
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'subscription_plan') THEN
    ALTER TABLE public.user_profiles ADD COLUMN subscription_plan TEXT;
  END IF;
END $$;

-- ============================================================================
-- STEP 3: Create Indexes
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_stripe_customer_id ON public.user_profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_id ON public.user_profiles(subscription_id);

-- ============================================================================
-- STEP 4: Enable RLS and Policies
-- ============================================================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own profile" ON public.user_profiles;
CREATE POLICY "Users can read their own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Service role can manage all profiles" ON public.user_profiles;
CREATE POLICY "Service role can manage all profiles" ON public.user_profiles USING (auth.role() = 'service_role');

-- Block self-service escalation of billing fields (service role bypasses via GRANT ALL / bypass RLS)
REVOKE UPDATE ON public.user_profiles FROM authenticated;
GRANT UPDATE (
  full_name,
  username,
  avatar_url,
  bio,
  updated_at,
  last_login,
  login_count
) ON public.user_profiles TO authenticated;

-- ============================================================================
-- STEP 5: Triggers
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- auth.users exposes raw_user_meta_data (not user_metadata)
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = COALESCE(NULLIF(EXCLUDED.full_name, ''), public.user_profiles.full_name);
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

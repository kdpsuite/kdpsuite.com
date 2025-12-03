-- ============================================================================
-- Supabase User Profiles Table - Complete Setup & Validation Script
-- Version: v0.6.0
-- Description: Complete SQL script to set up, validate, and maintain the 
--              user_profiles table with all necessary columns, indexes, 
--              RLS policies, and triggers
-- ============================================================================

-- ============================================================================
-- STEP 1: Create or Validate user_profiles Table
-- ============================================================================

-- Create the user_profiles table if it doesn't exist
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

-- Add subscription_start_date if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'subscription_start_date'
  ) THEN
    ALTER TABLE public.user_profiles ADD COLUMN subscription_start_date TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Add subscription_end_date if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'subscription_end_date'
  ) THEN
    ALTER TABLE public.user_profiles ADD COLUMN subscription_end_date TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Add is_active if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE public.user_profiles ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
END $$;

-- Add last_login if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'last_login'
  ) THEN
    ALTER TABLE public.user_profiles ADD COLUMN last_login TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Add login_count if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'login_count'
  ) THEN
    ALTER TABLE public.user_profiles ADD COLUMN login_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- ============================================================================
-- STEP 3: Create Indexes for Better Query Performance
-- ============================================================================

-- Index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);

-- Index on username for profile discovery
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON public.user_profiles(username);

-- Index on subscription_tier for subscription queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_tier ON public.user_profiles(subscription_tier);

-- Index on subscription_status for active subscriptions
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_status ON public.user_profiles(subscription_status);

-- Index on is_active for active users
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_active ON public.user_profiles(is_active);

-- Index on created_at for sorting by creation date
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON public.user_profiles(created_at DESC);

-- ============================================================================
-- STEP 4: Enable Row Level Security (RLS)
-- ============================================================================

-- Enable RLS on user_profiles table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 5: Create RLS Policies
-- ============================================================================

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can read their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.user_profiles;
DROP POLICY IF EXISTS "Service role can manage all profiles" ON public.user_profiles;

-- Policy 1: Users can read their own profile
CREATE POLICY "Users can read their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy 2: Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy 3: Users can insert their own profile (for signup)
CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy 4: Public profiles are viewable by everyone (optional - for profile discovery)
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.user_profiles FOR SELECT
  USING (true);

-- Policy 5: Service role can manage all profiles (for admin operations)
CREATE POLICY "Service role can manage all profiles"
  ON public.user_profiles
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================================
-- STEP 6: Create or Replace Trigger Functions
-- ============================================================================

-- Function to handle new user signup (creates profile automatically)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.user_metadata->>'full_name', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update last_login and login_count
CREATE OR REPLACE FUNCTION public.update_last_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_profiles
  SET 
    last_login = TIMEZONE('utc'::text, NOW()),
    login_count = login_count + 1
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- STEP 7: Create or Replace Triggers
-- ============================================================================

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;

-- Trigger: Create profile when new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Update updated_at timestamp on profile changes
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- STEP 8: Validation Queries
-- ============================================================================

-- Check table structure
-- Run this to verify all columns exist:
/*
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'user_profiles'
ORDER BY ordinal_position;
*/

-- Check indexes
-- Run this to verify all indexes exist:
/*
SELECT 
  indexname,
  tablename,
  indexdef
FROM pg_indexes
WHERE tablename = 'user_profiles'
ORDER BY indexname;
*/

-- Check RLS status
-- Run this to verify RLS is enabled:
/*
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'user_profiles';
*/

-- Check RLS policies
-- Run this to verify all policies exist:
/*
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'user_profiles'
ORDER BY policyname;
*/

-- Check triggers
-- Run this to verify all triggers exist:
/*
SELECT 
  trigger_schema,
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'user_profiles'
ORDER BY trigger_name;
*/

-- ============================================================================
-- STEP 9: Sample Data & Testing
-- ============================================================================

-- View current user profiles (for testing)
-- SELECT * FROM public.user_profiles LIMIT 10;

-- Check subscription statistics
-- SELECT 
--   subscription_tier,
--   subscription_status,
--   COUNT(*) as user_count
-- FROM public.user_profiles
-- GROUP BY subscription_tier, subscription_status;

-- ============================================================================
-- STEP 10: Maintenance & Cleanup
-- ============================================================================

-- Optional: Delete inactive users (be careful with this!)
-- DELETE FROM public.user_profiles 
-- WHERE is_active = false 
-- AND updated_at < NOW() - INTERVAL '1 year';

-- Optional: Reset login count (monthly maintenance)
-- UPDATE public.user_profiles 
-- SET login_count = 0 
-- WHERE DATE_TRUNC('month', updated_at) < DATE_TRUNC('month', NOW());

-- ============================================================================
-- STEP 11: Grant Permissions
-- ============================================================================

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;

-- Grant permissions to service role (admin)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO service_role;

-- Grant permissions to anonymous users (for public profiles)
GRANT SELECT ON public.user_profiles TO anon;

-- ============================================================================
-- STEP 12: Summary & Documentation
-- ============================================================================

/*
TABLE STRUCTURE:
- id (UUID) - Primary key, references auth.users(id)
- email (TEXT) - Unique, required
- full_name (TEXT) - User's full name
- username (TEXT) - Unique username for profiles
- avatar_url (TEXT) - URL to user's avatar
- bio (TEXT) - User biography
- subscription_tier (TEXT) - 'free', 'starter', 'professional', 'enterprise'
- subscription_status (TEXT) - 'inactive', 'active', 'paused', 'cancelled'
- subscription_start_date (TIMESTAMP) - When subscription started
- subscription_end_date (TIMESTAMP) - When subscription ends
- is_active (BOOLEAN) - Whether user account is active
- last_login (TIMESTAMP) - Last login timestamp
- login_count (INTEGER) - Total login count
- created_at (TIMESTAMP) - Account creation timestamp
- updated_at (TIMESTAMP) - Last update timestamp

INDEXES:
- idx_user_profiles_email - For email lookups
- idx_user_profiles_username - For username searches
- idx_user_profiles_subscription_tier - For subscription queries
- idx_user_profiles_subscription_status - For active subscriptions
- idx_user_profiles_is_active - For active users
- idx_user_profiles_created_at - For sorting by creation date

RLS POLICIES:
1. Users can read their own profile
2. Users can update their own profile
3. Users can insert their own profile
4. Public profiles are viewable by everyone
5. Service role can manage all profiles

TRIGGERS:
1. on_auth_user_created - Creates profile on signup
2. update_user_profiles_updated_at - Updates timestamp on changes

AUTHENTICATION:
- Signup: /api/auth/signup creates user and profile
- Login: /api/auth/login retrieves user and profile
- Logout: /api/auth/logout clears session

SECURITY:
- RLS enabled to prevent unauthorized access
- Service role key required for admin operations
- Email and username are unique to prevent duplicates
- Timestamps track account activity
*/

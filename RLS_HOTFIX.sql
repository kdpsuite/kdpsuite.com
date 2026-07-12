-- ============================================================================
-- Hotfix: Apply after audit (run in Supabase SQL editor)
-- Fixes waitlist public SELECT and user_profiles billing column escalation
-- ============================================================================

-- Waitlist: remove public SELECT (service role bypasses RLS)
DROP POLICY IF EXISTS "Service role can view all waitlist entries" ON public.waitlist_signups;

-- Profiles: keep own-row UPDATE but strip billing columns from authenticated
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

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

-- If an older setup added public profile SELECT, remove it
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.user_profiles;

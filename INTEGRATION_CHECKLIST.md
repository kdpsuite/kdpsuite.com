# 🚀 Supabase Integration - Action Checklist

## Completed by Me ✅

- [x] Migrated waitlist from file storage to Supabase `waitlist_signups` table
- [x] Updated auth signup route to return proper session tokens
- [x] Updated auth login route to fetch full user profile
- [x] Enhanced auth logout to invalidate Supabase sessions
- [x] Verified auth-context.tsx is properly structured
- [x] Created SQL migration file for waitlist_signups table
- [x] Created comprehensive integration documentation
- [x] All TypeScript files pass linting - no errors

## Your Action Items 📋

### STEP 1: Run Database Migrations (5 minutes)
**Location**: Supabase Dashboard → SQL Editor

```bash
# 1. Copy entire contents of: SUPABASE_USER_PROFILES_SETUP.sql
# 2. Paste in Supabase SQL Editor
# 3. Click "Run"
# 4. Wait for success message

# 5. Copy entire contents of: WAITLIST_SIGNUPS_SETUP.sql
# 6. Paste in Supabase SQL Editor
# 7. Click "Run"
# 8. Wait for success message

# 9. Verify tables exist - run this:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('user_profiles', 'waitlist_signups');
```

**Expected Result**:
```
table_name
-----------
user_profiles
waitlist_signups
(2 rows)
```

---

### STEP 2: Verify Environment Variables (3 minutes)
**Location**: Your `.env.local` file and Vercel Project Settings

**Check locally**:
```bash
# These three variables should exist in .env.local:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**Check on Vercel**:
1. Go to https://vercel.com/dashboard
2. Select your "kdp-landing" project
3. Settings → Environment Variables
4. Add the same three variables if not already there
5. Redeploy project

---

### STEP 3: Test Locally (10 minutes)
**Location**: Terminal in project folder

```bash
# Start development server
npm run dev

# Visit http://localhost:3000

# TEST 1: Waitlist form
# - Scroll to newsletter/waitlist section
# - Enter test email: test1@example.com
# - Should see success message
# - Check Supabase: Data Editor → waitlist_signups → should see your email

# TEST 2: Signup
# - Go to /auth/signup
# - Enter: 
#   - Email: signup@test.com
#   - Password: TestPass123
#   - Full Name: Test User
# - Should redirect or show success
# - Check Supabase: Auth → Users → should see your email
# - Check Supabase: Data Editor → user_profiles → should see profile created

# TEST 3: Login
# - Go to /auth/login
# - Enter: signup@test.com / TestPass123
# - Should show welcome or redirect to dashboard
# - Check browser console: localStorage should have 'auth_session' and 'auth_user'
```

---

### STEP 4: Deploy to Vercel (5 minutes)
```bash
# Just push to GitHub - Vercel auto-deploys
git add .
git commit -m "feat: Supabase integration - waitlist and auth complete"
git push origin main

# Vercel will automatically:
# 1. Deploy the code
# 2. Use environment variables you added in Step 2
# 3. Deploy should complete in 1-3 minutes

# Check deployment status at: https://vercel.com/dashboard
```

---

### STEP 5 (Optional): Create Stripe Payment Links
**Location**: Stripe Dashboard → Payment Links

For each of the 4 tiers, create a payment link and update `lib/stripe.ts`:

```typescript
// BEFORE (current):
export const foundingCampaignPlans: PricingPlan[] = [
  { 
    id: 'starter_founding', 
    name: 'Starter', 
    price: 99, 
    spots: 300, 
    stripePriceId: 'YOUR_STRIPE_LINK_HERE_STARTER_FOUNDING'  // ← REPLACE THIS
  },
  // ... etc
];

// AFTER (with real links):
export const foundingCampaignPlans: PricingPlan[] = [
  { 
    id: 'starter_founding', 
    name: 'Starter', 
    price: 99, 
    spots: 300, 
    stripePriceId: 'https://buy.stripe.com/...'  // ← Real Stripe link
  },
  // ... etc
];
```

---

## Testing Checklist

### Waitlist Form
- [ ] Can submit email
- [ ] Duplicate email shows error
- [ ] Invalid email shows error
- [ ] Success message appears
- [ ] Email appears in Supabase waitlist_signups table

### User Signup
- [ ] Can create account with email/password/name
- [ ] Password < 8 chars shows error
- [ ] Invalid email shows error
- [ ] Duplicate email shows error
- [ ] User created in Supabase Auth Users
- [ ] Profile created in user_profiles table
- [ ] Session tokens returned and stored in localStorage

### User Login
- [ ] Can login with correct credentials
- [ ] Wrong password shows error
- [ ] User not found shows error
- [ ] Session tokens returned and stored in localStorage
- [ ] Auth context has user info available
- [ ] Browser console shows auth_session and auth_user in localStorage

### Auth Persistence
- [ ] Refresh page while logged in - still logged in
- [ ] Close browser - session gone (normal)
- [ ] Check browser localStorage after login - has auth_session and auth_user

### Protected Routes
- [ ] Dashboard only visible when logged in
- [ ] Redirects to login if not authenticated
- [ ] Shows correct user profile data

---

## Troubleshooting Guide

### Error: "Supabase not configured"
**Solution**: Check that all three env variables are set in both `.env.local` AND Vercel project settings

### Error: "Email already exists" on signup
**Solution**: This is correct behavior - user already has account. Use login instead.

### Error: "RLS policy prevents insert" on waitlist
**Solution**: SQL migrations didn't run correctly. Check Supabase SQL Editor that the CREATE POLICY statements ran.

### Waitlist form doesn't save
**Solution**:
1. Check browser network tab - does POST request return 201?
2. Check Supabase waitlist_signups table - is data there?
3. Check browser console for errors

### Auth tokens not stored
**Solution**:
1. Check API response - does it include `session` object?
2. Check browser console - any errors in auth-context?
3. Check localStorage - can you see auth_session and auth_user keys?

### Deploy fails on Vercel
**Solution**:
1. Check Vercel logs (Vercel Dashboard → Project → Deployments → Logs)
2. Likely issue: env variables missing on Vercel
3. Add them in Vercel Settings → Environment Variables

---

## Timeline

| Step | Time | Status |
|------|------|--------|
| DB Migrations | 5 min | ⏳ You do this |
| Verify Env Vars | 3 min | ⏳ You do this |
| Test Locally | 10 min | ⏳ You do this |
| Deploy to Vercel | 5 min | ⏳ You do this |
| **Total** | **23 min** | ✅ |

---

## Support Resources

1. **Documentation**: Read `SUPABASE_INTEGRATION_COMPLETE.md` (comprehensive guide)
2. **API Reference**: See `INTEGRATION_SUMMARY.md` for endpoint details
3. **Error Help**: Check troubleshooting section in `SUPABASE_INTEGRATION_COMPLETE.md`
4. **Code Examples**: Component integration examples in `SUPABASE_INTEGRATION_COMPLETE.md`

---

## Files Modified/Created

**Modified** (Integration):
- ✅ `app/api/waitlist/route.ts` - Now uses Supabase
- ✅ `app/api/auth/signup/route.ts` - Returns session tokens
- ✅ `app/api/auth/login/route.ts` - Already correct
- ✅ `app/api/auth/logout/route.ts` - Now invalidates sessions
- ✅ `lib/auth-context.tsx` - Ready to use

**Created** (New):
- ✅ `WAITLIST_SIGNUPS_SETUP.sql` - Waitlist table migration
- ✅ `SUPABASE_INTEGRATION_COMPLETE.md` - Comprehensive guide
- ✅ `INTEGRATION_SUMMARY.md` - Quick reference
- ✅ `INTEGRATION_CHECKLIST.md` - This file

---

## Next Features (After Launch)

- [ ] Email confirmation flow
- [ ] Password reset functionality
- [ ] User profile editing
- [ ] Subscription tier upgrades
- [ ] Admin dashboard for waitlist management
- [ ] Email notifications for new signups
- [ ] Analytics dashboard

---

**Status**: Ready for you to execute  
**Estimated Completion**: ~30 minutes  
**Questions?**: Check the comprehensive docs first, most answers are there!

🚀 Let's launch!

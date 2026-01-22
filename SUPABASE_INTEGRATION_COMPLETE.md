# Supabase Integration Complete Setup Guide - v1.0.0

## Overview
This guide documents the complete Supabase integration for authentication, user profiles, and waitlist signups. All API routes and context providers are now connected to Supabase PostgreSQL.

## Completed Updates

### 1. **Waitlist System** ✅
**File**: `app/api/waitlist/route.ts`

**Changes**:
- Migrated from file-based storage (`/tmp/waitlist.json`) to `waitlist_signups` table
- Uses Supabase service role key for database writes
- Email validation with regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Duplicate check before insertion
- Proper error handling with HTTP status codes

**Database Table**: `waitlist_signups`
- Columns: `id` (UUID), `email` (TEXT UNIQUE), `created_at` (TIMESTAMP), `source` (TEXT), `ip_address` (TEXT), `user_agent` (TEXT)
- Indexes: `email`, `created_at DESC`
- RLS: Enabled - anyone can insert, service role can read

**Endpoints**:
- `POST /api/waitlist` - Add email to waitlist
  - Request: `{ email: string }`
  - Response: `{ success: true, message: string, entry: WaitlistEntry }`
- `GET /api/waitlist` - Fetch all entries
  - Query: `?action=count` to get total count
  - Response: `{ entries: [], total: number }`

### 2. **Authentication System** ✅
**Files**: 
- `app/api/auth/signup/route.ts` - User registration
- `app/api/auth/login/route.ts` - User login
- `app/api/auth/logout/route.ts` - User logout
- `lib/auth-context.tsx` - React Context for auth state

**Signup Flow**:
1. User submits email, password (8+ chars), full name
2. Server creates Supabase auth user via `admin.createUser()`
3. Server creates `user_profiles` record with full_name, subscription_tier = 'free'
4. Returns user object + session with access_token, refresh_token, expires_in
5. Auth context stores both in localStorage

**Login Flow**:
1. User submits email + password
2. Server calls `signInWithPassword()` with anon key
3. Server fetches user_profiles by user.id to get full metadata
4. Returns user object with subscription info + session tokens
5. Auth context stores both in localStorage

**Logout Flow**:
1. Client calls `POST /api/auth/logout`
2. Server invalidates Supabase session (calls `signOut()`)
3. Client clears localStorage auth data

**Auth Context** (`lib/auth-context.tsx`):
- Uses React Context + localStorage for session persistence
- Provides: `user`, `session`, `isLoading`, `isAuthenticated`
- Methods: `login()`, `signup()`, `logout()`, `updateUser()`
- Auto-loads saved session on app mount

### 3. **User Profiles Table** ✅
**File**: `SUPABASE_USER_PROFILES_SETUP.sql` (already created)

**Table**: `user_profiles`
- Columns: `id` (UUID FK auth.users), `email`, `full_name`, `username`, `avatar_url`, `bio`, `subscription_tier`, `subscription_status`, `subscription_start_date`, `subscription_end_date`, `created_at`, `updated_at`, `is_active`, `last_login`, `login_count`
- RLS: Enabled - users can read/update own profile

### 4. **Waitlist Signup Table** ✅
**File**: `WAITLIST_SIGNUPS_SETUP.sql` (newly created)

**Table**: `waitlist_signups`
- Columns: `id` (UUID), `email` (TEXT UNIQUE), `created_at` (TIMESTAMP), `source` (TEXT), `ip_address` (TEXT), `user_agent` (TEXT)
- Indexes: On email and created_at for fast lookups
- RLS: Enabled - anyone can insert, service role can read

---

## SQL Setup Instructions

### Step 1: Create User Profiles Table
Copy and execute the SQL from `SUPABASE_USER_PROFILES_SETUP.sql` in your Supabase SQL editor.

### Step 2: Create Waitlist Signups Table
Copy and execute the SQL from `WAITLIST_SIGNUPS_SETUP.sql` in your Supabase SQL editor.

```sql
-- Quick create if not using the full migration file:
CREATE TABLE IF NOT EXISTS public.waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  source TEXT DEFAULT 'landing_page',
  ip_address TEXT,
  user_agent TEXT
);

CREATE INDEX idx_waitlist_signups_email ON public.waitlist_signups(email);
CREATE INDEX idx_waitlist_signups_created_at ON public.waitlist_signups(created_at DESC);

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can add to waitlist" ON public.waitlist_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can view all waitlist entries" ON public.waitlist_signups
  FOR SELECT USING (true);
```

### Step 3: Verify Tables Exist
Run these queries in Supabase SQL editor:

```sql
-- Check user_profiles
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'user_profiles' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check waitlist_signups
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'waitlist_signups' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check data
SELECT COUNT(*) as total_users FROM public.user_profiles;
SELECT COUNT(*) as total_waitlist FROM public.waitlist_signups;
```

---

## Environment Variables Required

Add these to `.env.local` (local development) and Vercel project settings (production):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_APP_URL=https://kdpsuite.com (or http://localhost:3000)
```

### Getting Your Keys from Supabase:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
5. Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

---

## Testing the Flows

### Test Waitlist Signup
```bash
# Local testing
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'

# Check count
curl http://localhost:3000/api/waitlist?action=count
```

### Test User Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123!",
    "fullName": "John Doe"
  }'

# Expected response:
# {
#   "user": {
#     "id": "uuid...",
#     "email": "newuser@example.com",
#     "fullName": "John Doe",
#     "username": null,
#     "avatarUrl": null,
#     "subscriptionTier": "free"
#   },
#   "session": {
#     "access_token": "eyJhbGc...",
#     "refresh_token": "...",
#     "expires_in": 3600
#   }
# }
```

### Test User Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123!"
  }'
```

---

## API Route Reference

### POST /api/waitlist
Adds an email to the waitlist.

**Request**:
```json
{
  "email": "user@example.com"
}
```

**Responses**:
- `201 Created`: `{ "success": true, "message": "...", "entry": {...} }`
- `400 Bad Request`: `{ "error": "Email is required" }`
- `409 Conflict`: `{ "error": "This email is already on the waitlist" }`
- `500 Server Error`: `{ "error": "Internal server error" }`

---

### GET /api/waitlist
Fetches all waitlist entries (for admin/API access).

**Query Parameters**:
- `action=count`: Returns only the count

**Response**:
```json
{
  "entries": [
    { "id": "uuid", "email": "user@example.com", "created_at": "2025-01-01T12:00:00Z" }
  ],
  "total": 1
}
```

---

### POST /api/auth/signup
Creates a new user account.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}
```

**Validation**:
- Email format: Valid email address required
- Password: Minimum 8 characters
- Full Name: Required (no minimum length)

**Responses**:
- `201 Created`: User + session object
- `400 Bad Request`: Validation error
- `500 Server Error`: Database error

---

### POST /api/auth/login
Authenticates a user.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response**:
- `200 OK`: User + session object
- `401 Unauthorized`: Invalid credentials
- `500 Server Error`: Server error

---

### POST /api/auth/logout
Logs out the current user.

**Request**: Empty body

**Response**:
- `200 OK`: `{ "message": "Logged out successfully" }`

---

## Component Integration

### Using Auth in Components
```tsx
import { useAuth } from '@/lib/auth-context';

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.fullName}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login('email@example.com', 'password')}>
          Login
        </button>
      )}
    </div>
  );
}
```

---

## Common Issues & Solutions

### Issue: "Missing Supabase environment variables"
**Solution**: Ensure all three env vars are set in `.env.local` and Vercel project settings. Restart dev server after adding.

### Issue: "Email already on waitlist"
**Solution**: This is expected - duplicate emails are rejected. Check that `waitlist_signups` table exists with UNIQUE constraint on email.

### Issue: "Failed to create user"
**Solution**: 
- Check that Supabase Auth is enabled (Settings → Authentication → Email)
- Verify SUPABASE_SERVICE_ROLE_KEY is correct (not the anon key)
- Check that the email doesn't already exist in Supabase Auth

### Issue: "RLS policy prevents insert"
**Solution**: Ensure RLS policies are correctly set in SQL. Run:
```sql
-- Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'waitlist_signups';
SELECT * FROM pg_policies WHERE tablename = 'user_profiles';
```

---

## Next Steps

1. ✅ Run SQL migrations for both tables
2. ✅ Add environment variables to `.env.local`
3. ✅ Test signup/login flows locally
4. ✅ Test waitlist form submission
5. ⏳ Deploy to Vercel with environment variables
6. ⏳ Create Stripe payment links for founding campaign
7. ⏳ Wire Stripe checkout to subscription logic

---

## Architecture Diagram

```
Landing Page (Components/forms)
    ↓
POST /api/waitlist  or  /api/auth/signup  or  /api/auth/login
    ↓
API Route Handler (validation + Supabase SDK)
    ↓
Supabase PostgreSQL (waitlist_signups, user_profiles, auth.users)
    ↓
Response JSON
    ↓
Auth Context (localStorage persistence)
    ↓
Protected Routes / Dashboard
```

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Maintainer**: Development Team

# Supabase Authentication Setup Guide - v0.6.0

## Overview

This guide provides instructions for setting up Supabase authentication with email/password and creating the user profiles table schema.

## Step 1: Enable Email Authentication in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Find **Email** provider
4. Toggle it **ON**
5. Configure email settings:
   - Enable **Confirm email** (recommended for security)
   - Set email confirmation validity to 24 hours
   - Save changes

## Step 2: Create User Profiles Table

Run the following SQL in your Supabase SQL editor:

```sql
-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes for faster queries
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_username ON user_profiles(username);

-- Enable RLS (Row Level Security)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can read their own profile
CREATE POLICY "Users can read their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Allow public read for usernames (for profile discovery)
CREATE POLICY "Public profiles are viewable by everyone"
  ON user_profiles FOR SELECT
  USING (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Step 3: Set Up Environment Variables

Add these to your Vercel environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 4: Configure Supabase Client

The Supabase client is already configured in `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);
```

## Step 5: API Routes for Authentication

Two new API routes handle authentication:

### Sign Up Route (`/api/auth/signup`)

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "user": { "id": "...", "email": "..." },
  "session": { "access_token": "...", "refresh_token": "..." }
}
```

### Login Route (`/api/auth/login`)

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": { "id": "...", "email": "..." },
  "session": { "access_token": "...", "refresh_token": "..." }
```

## Step 6: Frontend Pages

### Sign Up Page (`/auth/signup`)

- Email input with validation
- Password input with strength indicator
- Full name input
- Terms of service checkbox
- Submit button that calls `/api/auth/signup`
- Link to login page

### Login Page (`/auth/login`)

- Email input
- Password input
- Remember me checkbox
- Submit button that calls `/api/auth/login`
- Link to sign up page
- Forgot password link

## Step 7: Session Management

Session tokens are stored in localStorage and used for authenticated requests:

```typescript
// Get session from localStorage
const session = localStorage.getItem('auth_session');
const token = session ? JSON.parse(session).access_token : null;

// Use token in API requests
const response = await fetch('/api/protected-route', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## Step 8: Protected Routes

To protect routes, check for valid session:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('auth_session');
    if (!session) {
      router.push('/auth/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) return <div>Loading...</div>;

  return <div>Protected content</div>;
}
```

## Step 9: Testing Authentication

### Test Sign Up

1. Navigate to `/auth/signup`
2. Enter email and password
3. Click sign up
4. Check Supabase Auth users table for new user
5. Verify user_profiles entry was created

### Test Login

1. Navigate to `/auth/login`
2. Enter credentials from sign up
3. Click login
4. Should redirect to dashboard or home page
5. Session token should be stored in localStorage

### Test Protected Route

1. Log in successfully
2. Navigate to protected route
3. Should display content
4. Clear localStorage and refresh
5. Should redirect to login

## Troubleshooting

### Users not being created in user_profiles

- Check that the trigger `on_auth_user_created` exists
- Verify RLS policies are correctly configured
- Check Supabase logs for errors

### Login fails with "Invalid credentials"

- Verify email is correct
- Ensure password is correct
- Check that user exists in auth.users table

### Session not persisting

- Verify localStorage is enabled in browser
- Check that session token is being stored correctly
- Ensure token is valid and not expired

### CORS errors

- Add your domain to Supabase allowed origins
- Go to **Authentication** → **URL Configuration**
- Add your domain under **Authorized redirect URLs**

## Security Best Practices

1. **Never expose service role key** in frontend code
2. **Always use HTTPS** in production
3. **Enable email confirmation** for new accounts
4. **Implement rate limiting** on auth endpoints
5. **Use strong password requirements**
6. **Implement session timeout** for security
7. **Hash passwords** (Supabase handles this automatically)
8. **Enable 2FA** for admin accounts

## Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)


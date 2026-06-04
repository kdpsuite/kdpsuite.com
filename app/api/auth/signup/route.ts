import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: 'Supabase not configured' },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { email, password, fullName } = await request.json();

    // Validate input
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Create user
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: false,
        user_metadata: {
          full_name: fullName,
        },
      });

    if (authError || !authData.user) {
      console.error('Auth signup error:', authError);
      return NextResponse.json(
        { error: authError?.message || 'Failed to create user' },
        { status: 400 }
      );
    }

    // Create profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
    }

    // Create a session for the newly created user
    const { data: sessionData, error: sessionError } =
      await supabase.auth.admin.createSession(authData.user.id);

    if (sessionError) {
      console.error('Session creation error:', sessionError);
    }

    // Sync user to Flask backend for dashboard access
    const dashboardBackendUrl =
      process.env.NEXT_PUBLIC_DASHBOARD_API_URL ||
      'http://localhost:5000/api';
    try {
      const syncResponse = await fetch(
        `${dashboardBackendUrl}/sync-supabase-user`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            supabase_token: sessionData?.session?.access_token || '',
            email,
            username: fullName.toLowerCase().replace(/\s+/g, '_'),
          }),
        }
      );

      if (!syncResponse.ok) {
        console.warn(
          'Failed to sync user to dashboard backend:',
          await syncResponse.text()
        );
      }
    } catch (syncError) {
      console.warn('Dashboard sync error (non-critical):', syncError);
    }

    return NextResponse.json(
      {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          fullName,
          username: null,
          avatarUrl: null,
          subscriptionTier: 'free',
        },
        session: sessionData?.session
          ? {
              access_token: sessionData.session.access_token,
              refresh_token: sessionData.session.refresh_token || '',
              expires_in: sessionData.session.expires_in || 3600,
            }
          : null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}

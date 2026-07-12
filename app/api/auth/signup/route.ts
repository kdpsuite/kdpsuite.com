import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createRateLimitMiddleware } from '@/lib/rate-limit';
import { rateLimitResponse } from '@/lib/api-response';
import { logger, generateRequestId, createLogContext } from '@/lib/logger';

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();
  const logContext = createLogContext(request, requestId);

  const rateLimit = createRateLimitMiddleware(5, 60_000)(request);
  if (!rateLimit.allowed) {
    return rateLimitResponse(
      Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
    );
  }

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

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

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
      logger.error({
        ...logContext,
        statusCode: 400,
        error: authError?.message || 'Failed to create user',
      });
      return NextResponse.json(
        { error: authError?.message || 'Failed to create user' },
        { status: 400 }
      );
    }

    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
      });

    if (profileError) {
      logger.warn({
        ...logContext,
        userId: authData.user.id,
        error: profileError.message,
      });
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.admin.createSession(authData.user.id);

    if (sessionError) {
      logger.warn({
        ...logContext,
        userId: authData.user.id,
        error: sessionError.message,
      });
    }

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
        logger.warn({
          ...logContext,
          userId: authData.user.id,
          error: 'Dashboard sync failed',
        });
      }
    } catch {
      logger.warn({
        ...logContext,
        userId: authData.user.id,
        error: 'Dashboard sync error',
      });
    }

    logger.info({
      ...logContext,
      statusCode: 201,
      userId: authData.user.id,
    });

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
    logger.error({
      ...logContext,
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}

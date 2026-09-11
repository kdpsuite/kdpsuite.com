import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isAdminAuthorized } from '@/lib/admin-auth';
import { createRateLimitMiddleware } from '@/lib/rate-limit';
import { rateLimitResponse, unauthorizedResponse } from '@/lib/api-response';
import { logger, generateRequestId, createLogContext } from '@/lib/logger';

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();
  const logContext = createLogContext(request, requestId);

  try {
    const rateLimit = createRateLimitMiddleware(10, 60_000)(request);
    if (!rateLimit.allowed) {
      return rateLimitResponse(
        Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { data: existing, error: checkError } = await supabase
      .from('waitlist_signups')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (checkError) {
      logger.error({
        ...logContext,
        statusCode: 500,
        error: checkError.message,
      });
      return NextResponse.json(
        { error: 'An error occurred while processing your request' },
        { status: 500 }
      );
    }

    // Anti-enumeration: same success for new and existing emails
    if (!existing) {
      const { error: insertError } = await supabase.from('waitlist_signups').insert({
        email: normalizedEmail,
        source: 'landing_page',
      });

      if (insertError) {
        // Unique race: still return generic success
        if (insertError.code !== '23505') {
          logger.error({
            ...logContext,
            statusCode: 500,
            error: insertError.message,
          });
          return NextResponse.json(
            { error: 'Failed to add email to waitlist' },
            { status: 500 }
          );
        }
      }
    }

    logger.info({ ...logContext, statusCode: 200 });
    return NextResponse.json(
      {
        success: true,
        message: 'Thanks — you are on the waitlist.',
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      ...logContext,
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const requestId = generateRequestId();
  const logContext = createLogContext(request, requestId);

  try {
    const rateLimit = createRateLimitMiddleware(30, 60_000)(request);
    if (!rateLimit.allowed) {
      return rateLimitResponse(
        Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
      );
    }

    if (!isAdminAuthorized(request)) {
      logger.warn({ ...logContext, statusCode: 401, error: 'Unauthorized waitlist GET' });
      return unauthorizedResponse('Admin authorization required');
    }

    const action = new URL(request.url).searchParams.get('action');
    if (action !== 'count') {
      return NextResponse.json(
        { error: 'Only action=count is supported' },
        { status: 403 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { count, error } = await supabase
      .from('waitlist_signups')
      .select('*', { count: 'exact', head: true });

    if (error) {
      logger.error({
        ...logContext,
        statusCode: 500,
        error: error.message,
      });
      return NextResponse.json(
        { error: 'Failed to fetch waitlist count' },
        { status: 500 }
      );
    }

    logger.info({ ...logContext, statusCode: 200 });
    return NextResponse.json({ count: count ?? 0 });
  } catch (error) {
    logger.error({
      ...logContext,
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { rateLimitResponse } from '@/lib/api-response';
import { logger, generateRequestId, createLogContext } from '@/lib/logger';

function clearSupabaseCookies(response: NextResponse, request: NextRequest) {
  for (const cookie of request.cookies.getAll()) {
    if (
      cookie.name.startsWith('sb-') ||
      cookie.name.includes('supabase') ||
      cookie.name.includes('auth-token')
    ) {
      response.cookies.set(cookie.name, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
      });
    }
  }
}

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();
  const logContext = createLogContext(request, requestId);

  try {
    const rateLimit = await checkRateLimit(request, 20, 60_000);
    if (!rateLimit.allowed) {
      return rateLimitResponse(
        Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    if (!supabaseUrl || !supabaseAnonKey) {
      clearSupabaseCookies(response, request);
      logger.info({ ...logContext, statusCode: 200 });
      return response;
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    const { error } = await supabase.auth.signOut();
    if (error) {
      logger.warn({
        ...logContext,
        error: error.message,
      });
    }

    clearSupabaseCookies(response, request);
    logger.info({ ...logContext, statusCode: 200 });
    return response;
  } catch (error) {
    logger.error({
      ...logContext,
      statusCode: 200,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
    clearSupabaseCookies(response, request);
    return response;
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createRateLimitMiddleware } from '@/lib/rate-limit';
import { rateLimitResponse, unauthorizedResponse } from '@/lib/api-response';
import { logger, generateRequestId, createLogContext } from '@/lib/logger';

function isAdminAuthorized(request: NextRequest): boolean {
  const secret = process.env.ADMIN_API_SECRET || process.env.WAITLIST_ADMIN_SECRET;
  if (!secret) {
    return false;
  }

  const bearer = request.headers.get('authorization');
  if (bearer?.startsWith('Bearer ') && bearer.slice(7) === secret) {
    return true;
  }

  return request.headers.get('x-admin-secret') === secret;
}

export async function GET(request: NextRequest) {
  const requestId = generateRequestId();
  const logContext = createLogContext(request, requestId);

  try {
    if (!isAdminAuthorized(request)) {
      logger.warn({ ...logContext, statusCode: 401, error: 'Unauthorized admin waitlist GET' });
      return unauthorizedResponse('Admin authorization required');
    }

    const rateLimit = createRateLimitMiddleware(30, 60_000)(request);
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

    const { count: total, error: countError } = await supabase
      .from('waitlist_signups')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      logger.error({
        ...logContext,
        statusCode: 500,
        error: countError.message,
      });
      return NextResponse.json({ error: 'Failed to fetch waitlist stats' }, { status: 500 });
    }

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: last24h, error: recentError } = await supabase
      .from('waitlist_signups')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', since);

    if (recentError) {
      logger.error({
        ...logContext,
        statusCode: 500,
        error: recentError.message,
      });
      return NextResponse.json({ error: 'Failed to fetch waitlist stats' }, { status: 500 });
    }

    const { data: sourceRows, error: sourceError } = await supabase
      .from('waitlist_signups')
      .select('source');

    if (sourceError) {
      logger.error({
        ...logContext,
        statusCode: 500,
        error: sourceError.message,
      });
      return NextResponse.json({ error: 'Failed to fetch waitlist stats' }, { status: 500 });
    }

    const bySource: Record<string, number> = {};
    for (const row of sourceRows ?? []) {
      const source = row.source || 'unknown';
      bySource[source] = (bySource[source] ?? 0) + 1;
    }

    logger.info({ ...logContext, statusCode: 200 });
    return NextResponse.json({
      total: total ?? 0,
      last24h: last24h ?? 0,
      bySource,
    });
  } catch (error) {
    logger.error({
      ...logContext,
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createRateLimitMiddleware } from '@/lib/rate-limit';
import { rateLimitResponse } from '@/lib/api-response';
import { logger, generateRequestId, createLogContext } from '@/lib/logger';
import {
  getReferralCodeFromCookie,
  getReferralStatsForUser,
  isValidReferrerId,
  recordReferralSignup,
} from '@/lib/referral';
import { captureException } from '@/lib/sentry';

async function getAuthenticatedUserId(request: NextRequest): Promise<string | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice(7);
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return null;
  }

  return user.id;
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

    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getReferralStatsForUser(userId);

    logger.info({ ...logContext, statusCode: 200, userId });
    return NextResponse.json(stats);
  } catch (error) {
    captureException(error, { tags: { route: 'referral-get' } });
    logger.error({
      ...logContext,
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json({ error: 'Failed to fetch referral stats' }, { status: 500 });
  }
}

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

    const { email } = await request.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const referrerId = getReferralCodeFromCookie(request);
    if (!referrerId || !isValidReferrerId(referrerId)) {
      return NextResponse.json({ success: true, recorded: false });
    }

    await recordReferralSignup(referrerId, email);

    logger.info({ ...logContext, statusCode: 200 });
    return NextResponse.json({ success: true, recorded: true });
  } catch (error) {
    captureException(error, { tags: { route: 'referral-post' } });
    logger.error({
      ...logContext,
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json({ error: 'Failed to record referral' }, { status: 500 });
  }
}

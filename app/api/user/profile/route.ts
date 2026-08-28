import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createRateLimitMiddleware } from '@/lib/rate-limit';
import { rateLimitResponse } from '@/lib/api-response';
import { logger, generateRequestId, createLogContext } from '@/lib/logger';

const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,30}$/;

export async function PATCH(request: NextRequest) {
  const requestId = generateRequestId();
  const logContext = createLogContext(request, requestId);

  try {
    const rateLimit = createRateLimitMiddleware(20, 60_000)(request);
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

    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updates: Record<string, string> = {};

    if (typeof body.full_name === 'string') {
      const fullName = body.full_name.trim();
      if (fullName.length < 1 || fullName.length > 100) {
        return NextResponse.json(
          { error: 'Full name must be between 1 and 100 characters' },
          { status: 400 }
        );
      }
      updates.full_name = fullName;
    }

    if (typeof body.username === 'string') {
      const username = body.username.trim();
      if (!USERNAME_REGEX.test(username)) {
        return NextResponse.json(
          { error: 'Username must be 3-30 characters (letters, numbers, _ or -)' },
          { status: 400 }
        );
      }
      updates.username = username;
    }

    if (typeof body.bio === 'string') {
      const bio = body.bio.trim();
      if (bio.length > 500) {
        return NextResponse.json(
          { error: 'Bio must be 500 characters or fewer' },
          { status: 400 }
        );
      }
      updates.bio = bio;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid profile fields provided' },
        { status: 400 }
      );
    }

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select('full_name, username, bio, email')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Username is already taken' }, { status: 409 });
      }

      logger.error({
        ...logContext,
        statusCode: 500,
        userId: user.id,
        error: error.message,
      });
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    logger.info({ ...logContext, statusCode: 200, userId: user.id });
    return NextResponse.json({ success: true, profile: data });
  } catch (error) {
    logger.error({
      ...logContext,
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { stripe } from '@/lib/stripe';
import { getAllowedCheckoutPriceIds } from '@/lib/pricing-data';
import { checkRateLimit } from '@/lib/rate-limit';
import { rateLimitResponse } from '@/lib/api-response';
import { logger, generateRequestId, createLogContext } from '@/lib/logger';

async function resolveAuthenticatedUserId(
  request: NextRequest
): Promise<{ userId: string; email: string | null } | null> {
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
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return null;
  }

  return { userId: user.id, email: user.email ?? null };
}

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();
  const logContext = createLogContext(request, requestId);

  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 503 }
      );
    }

    const rateLimit = await checkRateLimit(request, 10, 60_000);
    if (!rateLimit.allowed) {
      return rateLimitResponse(
        Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
      );
    }

    const body = await request.json();
    const { priceId } = body;
    let email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!priceId) {
      return NextResponse.json(
        { error: 'Missing required field: priceId' },
        { status: 400 }
      );
    }

    const allowedPriceIds = getAllowedCheckoutPriceIds();
    if (!allowedPriceIds.has(priceId)) {
      logger.warn({
        ...logContext,
        statusCode: 400,
        error: 'Rejected priceId not on allowlist',
      });
      return NextResponse.json(
        { error: 'Invalid price' },
        { status: 400 }
      );
    }

    const authed = await resolveAuthenticatedUserId(request);
    // Prefer verified auth email over client-supplied email when logged in
    if (authed?.email) {
      email = authed.email;
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Missing required fields: priceId and email' },
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

    const metadata: Record<string, string> = {
      email,
    };
    if (authed?.userId) {
      metadata.supabase_user_id = authed.userId;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://kdpsuite.com'}/pricing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://kdpsuite.com'}/pricing?canceled=true`,
      customer_email: email,
      client_reference_id: authed?.userId || undefined,
      metadata,
      subscription_data: {
        metadata,
      },
    });

    logger.info({ ...logContext, statusCode: 200, userId: authed?.userId });
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    logger.error({
      ...logContext,
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

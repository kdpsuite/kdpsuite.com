import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getAllowedCheckoutPriceIds } from '@/lib/pricing-data';
import { createRateLimitMiddleware } from '@/lib/rate-limit';
import { rateLimitResponse } from '@/lib/api-response';
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

    const { priceId, email } = await request.json();

    if (!priceId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: priceId and email' },
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
      subscription_data: {
        metadata: {
          email: email,
        },
      },
    });

    logger.info({ ...logContext, statusCode: 200 });
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

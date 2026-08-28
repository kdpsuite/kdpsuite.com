import { NextRequest, NextResponse } from 'next/server';
import { createRateLimitMiddleware } from '@/lib/rate-limit';
import { rateLimitResponse } from '@/lib/api-response';
import { logger, generateRequestId, createLogContext } from '@/lib/logger';
import {
  subscribeToNewsletter,
  isValidNewsletterEmail,
  NewsletterConfigError,
  NewsletterSubscribeError,
} from '@/lib/newsletter';
import { captureException } from '@/lib/sentry';

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

    if (!email || typeof email !== 'string' || !isValidNewsletterEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    await subscribeToNewsletter(email);

    logger.info({ ...logContext, statusCode: 200 });

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof NewsletterConfigError) {
      logger.error({
        ...logContext,
        statusCode: 503,
        error: error.message,
      });
      return NextResponse.json(
        { error: 'Newsletter service is not configured' },
        { status: 503 }
      );
    }

    if (error instanceof NewsletterSubscribeError) {
      logger.error({
        ...logContext,
        statusCode: 502,
        error: error.message,
      });
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 502 }
      );
    }

    captureException(error, { tags: { route: 'newsletter-subscribe' } });
    logger.error({
      ...logContext,
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

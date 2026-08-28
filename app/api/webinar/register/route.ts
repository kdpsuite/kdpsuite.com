import { NextRequest, NextResponse } from 'next/server';
import { createRateLimitMiddleware } from '@/lib/rate-limit';
import { rateLimitResponse } from '@/lib/api-response';
import { logger, generateRequestId, createLogContext } from '@/lib/logger';
import {
  registerForWebinar,
  isValidWebinarEmail,
  WebinarConfigError,
  WebinarRegistrationError,
} from '@/lib/webinar';
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

    const body = await request.json();
    const { email, source } = body;

    if (!email || typeof email !== 'string' || !isValidWebinarEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    await registerForWebinar(email, typeof source === 'string' ? source : 'website');

    logger.info({ ...logContext, statusCode: 200 });

    return NextResponse.json(
      { success: true, message: 'Successfully registered for webinar' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof WebinarConfigError) {
      logger.error({
        ...logContext,
        statusCode: 503,
        error: error.message,
      });
      return NextResponse.json(
        { error: 'Webinar registration is not configured' },
        { status: 503 }
      );
    }

    if (error instanceof WebinarRegistrationError) {
      logger.error({
        ...logContext,
        statusCode: 502,
        error: error.message,
      });
      return NextResponse.json(
        { error: 'Failed to register for webinar' },
        { status: 502 }
      );
    }

    captureException(error, { tags: { route: 'webinar-register' } });
    logger.error({
      ...logContext,
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'Failed to register for webinar' },
      { status: 500 }
    );
  }
}

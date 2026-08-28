interface SentryContext {
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
  userId?: string;
}

function isSentryEnabled(): boolean {
  return Boolean(process.env.SENTRY_DSN);
}

export function captureException(error: unknown, context?: SentryContext): void {
  if (!isSentryEnabled()) {
    return;
  }

  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  console.error(
    JSON.stringify({
      level: 'error',
      sentry: true,
      message,
      stack,
      tags: context?.tags,
      extra: context?.extra,
      userId: context?.userId,
      timestamp: new Date().toISOString(),
    })
  );
}

export function captureMessage(message: string, context?: SentryContext): void {
  if (!isSentryEnabled()) {
    return;
  }

  console.warn(
    JSON.stringify({
      level: 'warning',
      sentry: true,
      message,
      tags: context?.tags,
      extra: context?.extra,
      userId: context?.userId,
      timestamp: new Date().toISOString(),
    })
  );
}

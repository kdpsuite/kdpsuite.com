import * as Sentry from "@sentry/nextjs";

interface SentryContext {
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
  userId?: string;
}

function isSentryEnabled(): boolean {
  return Boolean(process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN);
}

export function captureException(error: unknown, context?: SentryContext): void {
  if (!isSentryEnabled()) {
    return;
  }

  Sentry.withScope((scope) => {
    if (context?.tags) {
      for (const [key, value] of Object.entries(context.tags)) {
        scope.setTag(key, value);
      }
    }
    if (context?.extra) {
      scope.setExtras(context.extra);
    }
    if (context?.userId) {
      scope.setUser({ id: context.userId });
    }
    Sentry.captureException(error);
  });
}

export function captureMessage(message: string, context?: SentryContext): void {
  if (!isSentryEnabled()) {
    return;
  }

  Sentry.withScope((scope) => {
    if (context?.tags) {
      for (const [key, value] of Object.entries(context.tags)) {
        scope.setTag(key, value);
      }
    }
    if (context?.extra) {
      scope.setExtras(context.extra);
    }
    if (context?.userId) {
      scope.setUser({ id: context.userId });
    }
    Sentry.captureMessage(message, "warning");
  });
}

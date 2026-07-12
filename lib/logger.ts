import { NextRequest } from 'next/server';

interface LogContext {
  requestId: string;
  timestamp: string;
  method: string;
  path: string;
  statusCode?: number;
  duration?: number;
  error?: string;
  userId?: string;
}

class Logger {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatLog(context: LogContext): string {
    return JSON.stringify({
      timestamp: context.timestamp,
      requestId: context.requestId,
      method: context.method,
      path: context.path,
      statusCode: context.statusCode,
      duration: context.duration,
      userId: context.userId,
      error: context.error,
    });
  }

  info(context: LogContext): void {
    console.log(this.formatLog(context));
  }

  error(context: LogContext): void {
    console.error(this.formatLog(context));
  }

  warn(context: LogContext): void {
    console.warn(this.formatLog(context));
  }
}

export const logger = Logger.getInstance();

export function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createLogContext(
  req: NextRequest,
  requestId: string
): Omit<LogContext, 'statusCode' | 'duration' | 'error'> {
  return {
    requestId,
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.nextUrl.pathname,
  };
}

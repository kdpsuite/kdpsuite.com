import { NextResponse } from 'next/server';

export interface ApiSuccessResponse<T> {
  ok: true;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  ok: false;
  error: {
    message: string;
    code: string;
    details?: string;
    timestamp: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function successResponse<T>(
  data: T,
  message?: string,
  statusCode: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      ok: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode }
  );
}

export function errorResponse(
  message: string,
  code: string,
  statusCode: number = 400,
  details?: string
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      ok: false,
      error: {
        message,
        code,
        details,
        timestamp: new Date().toISOString(),
      },
    },
    { status: statusCode }
  );
}

export function internalErrorResponse(
  message: string = 'Internal server error',
  details?: string
): NextResponse<ApiErrorResponse> {
  return errorResponse(message, 'INTERNAL_ERROR', 500, details);
}

export function unauthorizedResponse(
  message: string = 'Unauthorized'
): NextResponse<ApiErrorResponse> {
  return errorResponse(message, 'UNAUTHORIZED', 401);
}

export function forbiddenResponse(
  message: string = 'Forbidden'
): NextResponse<ApiErrorResponse> {
  return errorResponse(message, 'FORBIDDEN', 403);
}

export function notFoundResponse(
  message: string = 'Not found'
): NextResponse<ApiErrorResponse> {
  return errorResponse(message, 'NOT_FOUND', 404);
}

export function rateLimitResponse(
  retryAfter: number = 60
): NextResponse<ApiErrorResponse> {
  const response = errorResponse(
    'Too many requests',
    'RATE_LIMIT_EXCEEDED',
    429,
    `Please retry after ${retryAfter} seconds`
  );
  response.headers.set('Retry-After', retryAfter.toString());
  return response;
}

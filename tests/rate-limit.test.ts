import { describe, expect, it } from 'vitest';
import { createRateLimitMiddleware, getClientIdentifier } from '../lib/rate-limit';
import type { NextRequest } from 'next/server';

function mockRequest(headers: Record<string, string>): NextRequest {
  return {
    headers: new Headers(headers),
  } as unknown as NextRequest;
}

describe('rate-limit helpers', () => {
  it('uses client IP and ignores spoofed x-user-id', () => {
    const req = mockRequest({
      'x-forwarded-for': '10.1.1.10, 10.1.1.11',
      'x-user-id': 'spoofed-user-id',
    });

    expect(getClientIdentifier(req)).toBe('ip:10.1.1.10');
  });

  it('enforces limit within a window', () => {
    const req = mockRequest({
      'x-forwarded-for': '192.168.25.1',
    });

    const middleware = createRateLimitMiddleware(2, 60_000);
    const first = middleware(req);
    const second = middleware(req);
    const third = middleware(req);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
    expect(third.remaining).toBe(0);
  });
});

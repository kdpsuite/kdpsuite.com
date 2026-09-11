import { describe, expect, it } from 'vitest';
import {
  createRateLimitMiddleware,
  getClientIdentifier,
  rateLimiter,
} from '../lib/rate-limit';
import type { NextRequest } from 'next/server';

function mockRequest(headers: Record<string, string>): NextRequest {
  return {
    headers: new Headers(headers),
  } as unknown as NextRequest;
}

describe('rate-limit helpers', () => {
  it('ignores client X-Forwarded-For when not on Vercel', () => {
    const prev = process.env.VERCEL;
    delete process.env.VERCEL;
    try {
      const req = mockRequest({
        'x-forwarded-for': '10.1.1.10, 10.1.1.11',
        'x-user-id': 'spoofed-user-id',
      });
      expect(getClientIdentifier(req)).toBe('ip:local');
    } finally {
      if (prev === undefined) {
        delete process.env.VERCEL;
      } else {
        process.env.VERCEL = prev;
      }
    }
  });

  it('uses X-Forwarded-For client IP on Vercel', () => {
    const prev = process.env.VERCEL;
    process.env.VERCEL = '1';
    try {
      const req = mockRequest({
        'x-forwarded-for': '10.1.1.10, 10.1.1.11',
      });
      expect(getClientIdentifier(req)).toBe('ip:10.1.1.10');
    } finally {
      if (prev === undefined) {
        delete process.env.VERCEL;
      } else {
        process.env.VERCEL = prev;
      }
    }
  });

  it('enforces limit within a window', () => {
    const prev = process.env.VERCEL;
    delete process.env.VERCEL;
    try {
      rateLimiter.reset('ip:local');
      const req = mockRequest({});
      const middleware = createRateLimitMiddleware(2, 60_000);
      const first = middleware(req);
      const second = middleware(req);
      const third = middleware(req);

      expect(first.allowed).toBe(true);
      expect(second.allowed).toBe(true);
      expect(third.allowed).toBe(false);
      expect(third.remaining).toBe(0);
    } finally {
      if (prev === undefined) {
        delete process.env.VERCEL;
      } else {
        process.env.VERCEL = prev;
      }
    }
  });
});

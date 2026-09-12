import { describe, expect, it } from 'vitest';
import {
  checkRateLimit,
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

  it('enforces limit within a window (memory path)', () => {
    const prev = process.env.VERCEL;
    const prevUrl = process.env.UPSTASH_REDIS_REST_URL;
    const prevToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.VERCEL;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    try {
      rateLimiter.reset('ip:local:2:60000');
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
      if (prev === undefined) delete process.env.VERCEL;
      else process.env.VERCEL = prev;
      if (prevUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL;
      else process.env.UPSTASH_REDIS_REST_URL = prevUrl;
      if (prevToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN;
      else process.env.UPSTASH_REDIS_REST_TOKEN = prevToken;
    }
  });

  it('checkRateLimit falls back to memory without Upstash', async () => {
    const prevUrl = process.env.UPSTASH_REDIS_REST_URL;
    const prevToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    try {
      rateLimiter.reset('ip:local:3:60000');
      const req = mockRequest({});
      const first = await checkRateLimit(req, 3, 60_000);
      expect(first.allowed).toBe(true);
      expect(first.headers['X-RateLimit-Limit']).toBe('3');
    } finally {
      if (prevUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL;
      else process.env.UPSTASH_REDIS_REST_URL = prevUrl;
      if (prevToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN;
      else process.env.UPSTASH_REDIS_REST_TOKEN = prevToken;
    }
  });
});

import { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private static instance: RateLimiter;
  private store: Map<string, RateLimitEntry> = new Map();

  private constructor() {
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.resetTime < now) {
        this.store.delete(key);
      }
    }
  }

  check(
    identifier: string,
    limit: number,
    windowMs: number
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || entry.resetTime < now) {
      const resetTime = now + windowMs;
      this.store.set(identifier, { count: 1, resetTime });
      return { allowed: true, remaining: limit - 1, resetTime };
    }

    if (entry.count < limit) {
      entry.count++;
      return {
        allowed: true,
        remaining: limit - entry.count,
        resetTime: entry.resetTime,
      };
    }

    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  reset(identifier: string): void {
    this.store.delete(identifier);
  }
}

export const rateLimiter = RateLimiter.getInstance();

/**
 * Prefer platform-provided client IP. On Vercel, X-Forwarded-For is trusted
 * (platform-controlled). Elsewhere, ignore client-supplied XFF to prevent spoofing.
 */
export function getClientIdentifier(req: NextRequest): string {
  const onVercel = process.env.VERCEL === '1';

  if (onVercel) {
    const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (forwarded) {
      return `ip:${forwarded}`;
    }
  }

  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp && onVercel) {
    return `ip:${realIp}`;
  }

  // Local / non-Vercel: do not trust X-Forwarded-For from the client
  return 'ip:local';
}

export function createRateLimitMiddleware(limit: number, windowMs: number) {
  return (req: NextRequest) => {
    const identifier = getClientIdentifier(req);
    const result = rateLimiter.check(identifier, limit, windowMs);

    return {
      ...result,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
      },
    };
  };
}

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  headers: Record<string, string>;
}

class MemoryRateLimiter {
  private static instance: MemoryRateLimiter;
  private store: Map<string, RateLimitEntry> = new Map();

  private constructor() {
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  static getInstance(): MemoryRateLimiter {
    if (!MemoryRateLimiter.instance) {
      MemoryRateLimiter.instance = new MemoryRateLimiter();
    }
    return MemoryRateLimiter.instance;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.resetTime < now) {
        this.store.delete(key);
      }
    }
  }

  check(identifier: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const entry = this.store.get(identifier);

    let result: { allowed: boolean; remaining: number; resetTime: number };

    if (!entry || entry.resetTime < now) {
      const resetTime = now + windowMs;
      this.store.set(identifier, { count: 1, resetTime });
      result = { allowed: true, remaining: limit - 1, resetTime };
    } else if (entry.count < limit) {
      entry.count++;
      result = {
        allowed: true,
        remaining: limit - entry.count,
        resetTime: entry.resetTime,
      };
    } else {
      result = {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    return {
      ...result,
      headers: toHeaders(limit, result.remaining, result.resetTime),
    };
  }

  reset(identifier: string): void {
    this.store.delete(identifier);
  }
}

export const rateLimiter = MemoryRateLimiter.getInstance();

const upstashLimiters = new Map<string, Ratelimit>();

function getUpstashLimiter(limit: number, windowMs: number): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return null;
  }

  const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));
  const cacheKey = `${limit}:${windowSeconds}`;
  const existing = upstashLimiters.get(cacheKey);
  if (existing) {
    return existing;
  }

  const limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
    prefix: 'kdpsuite:rl',
    analytics: false,
  });
  upstashLimiters.set(cacheKey, limiter);
  return limiter;
}

function toHeaders(
  limit: number,
  remaining: number,
  resetTime: number
): Record<string, string> {
  return {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': Math.max(0, remaining).toString(),
    'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString(),
  };
}

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

  return 'ip:local';
}

/**
 * Durable rate limit when Upstash env is set; otherwise in-memory fallback.
 */
export async function checkRateLimit(
  req: NextRequest,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const identifier = getClientIdentifier(req);
  const key = `${identifier}:${limit}:${windowMs}`;
  const upstash = getUpstashLimiter(limit, windowMs);

  if (upstash) {
    try {
      const result = await upstash.limit(key);
      const resetTime = result.reset;
      return {
        allowed: result.success,
        remaining: result.remaining,
        resetTime,
        headers: toHeaders(limit, result.remaining, resetTime),
      };
    } catch {
      // Fall through to memory if Upstash is unreachable
    }
  }

  return rateLimiter.check(key, limit, windowMs);
}

/** @deprecated Prefer checkRateLimit — kept for sync tests of the memory path. */
export function createRateLimitMiddleware(limit: number, windowMs: number) {
  return (req: NextRequest) => {
    const identifier = getClientIdentifier(req);
    const key = `${identifier}:${limit}:${windowMs}`;
    return rateLimiter.check(key, limit, windowMs);
  };
}

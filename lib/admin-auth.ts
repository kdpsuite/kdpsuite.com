import { timingSafeEqual } from 'crypto';
import type { NextRequest } from 'next/server';

function safeEqualString(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

/** Admin auth via Authorization: Bearer only (no custom headers). */
export function isAdminAuthorized(request: NextRequest): boolean {
  const secret = process.env.ADMIN_API_SECRET || process.env.WAITLIST_ADMIN_SECRET;
  if (!secret) {
    return false;
  }

  const bearer = request.headers.get('authorization');
  if (!bearer?.startsWith('Bearer ')) {
    return false;
  }

  return safeEqualString(bearer.slice(7), secret);
}

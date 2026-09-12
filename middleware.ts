import { createServerClient } from '@supabase/ssr';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { buildCspHeader, STATIC_SECURITY_HEADERS } from '@/lib/csp';
import { getReferralCodeFromRequest, setReferralCookie } from '@/lib/referral';

function applySecurityHeaders(response: NextResponse, nonce: string) {
  const csp = buildCspHeader(nonce, process.env.NODE_ENV === 'development');
  response.headers.set('Content-Security-Policy', csp);
  for (const { key, value } of STATIC_SECURITY_HEADERS) {
    response.headers.set(key, value);
  }
  return response;
}

function nextWithNonce(request: NextRequest, nonce: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  return applySecurityHeaders(response, nonce);
}

export async function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const referralCode = getReferralCodeFromRequest(request);
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isAuthPage =
    request.nextUrl.pathname.startsWith('/auth/login') ||
    request.nextUrl.pathname.startsWith('/auth/signup');

  // Fail closed: protected routes require auth config
  if (isDashboard && (!supabaseUrl || !supabaseAnonKey)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/login';
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    redirectUrl.searchParams.set('error', 'auth_unconfigured');
    const response = applySecurityHeaders(NextResponse.redirect(redirectUrl), nonce);
    if (referralCode) {
      setReferralCookie(response, referralCode);
    }
    return response;
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    const response = nextWithNonce(request, nonce);
    if (referralCode) {
      setReferralCookie(response, referralCode);
    }
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  applySecurityHeaders(response, nonce);

  if (referralCode) {
    setReferralCookie(response, referralCode);
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll().map((cookie) => ({
          name: cookie.name,
          value: cookie.value,
        }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isDashboard) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/login';
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    const redirect = applySecurityHeaders(NextResponse.redirect(redirectUrl), nonce);
    return redirect;
  }

  if (user && isAuthPage) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    return applySecurityHeaders(NextResponse.redirect(redirectUrl), nonce);
  }

  return response;
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

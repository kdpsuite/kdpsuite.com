/**
 * Content-Security-Policy builders for nonce-based script loading.
 * Host allowlists remain for img/connect/frame; script-src uses nonce + strict-dynamic.
 */

export function buildCspHeader(nonce: string, isDev: boolean): string {
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    // Third-party loaders (legacy browsers ignoring strict-dynamic)
    'https://js.stripe.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://pagead2.googlesyndication.com',
    'https://a.propellerads.com',
    // Next.js / React Refresh in development
    ...(isDev ? ["'unsafe-eval'"] : []),
  ].join(' ');

  // Styles: do not mix nonce with unsafe-inline — supporting browsers ignore
  // unsafe-inline when a nonce is present, which breaks Tailwind runtime CSS.
  const styleSrc = "'self' 'unsafe-inline'";

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    `style-src ${styleSrc}`,
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com https://*.sentry.io https://www.google-analytics.com https://pagead2.googlesyndication.com https://region1.google-analytics.com",
    "frame-src https://js.stripe.com https://hooks.stripe.com https://googleads.g.doubleclick.net",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ];

  return directives.join('; ').replace(/\s{2,}/g, ' ').trim();
}

export const STATIC_SECURITY_HEADERS: { key: string; value: string }[] = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

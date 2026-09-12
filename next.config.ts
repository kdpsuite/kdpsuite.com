import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import { STATIC_SECURITY_HEADERS } from "./lib/csp";

const nextConfig: NextConfig = {
  async headers() {
    // CSP is set per-request in middleware with a nonce.
    // Keep the rest of the hardened headers here for API/static paths.
    return [
      {
        source: "/:path*",
        headers: STATIC_SECURITY_HEADERS,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "kdpsuite.com" }],
        destination: "https://www.kdpsuite.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "kdp-creator-suite.com" }],
        destination: "https://www.kdpsuite.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kdp-creator-suite.com" }],
        destination: "https://www.kdpsuite.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "unlovedproductions",
  project: "kdp-creator-dashboard",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
});

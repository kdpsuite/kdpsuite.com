import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;

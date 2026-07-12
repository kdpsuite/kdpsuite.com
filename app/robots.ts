import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const protectedPaths = ["/auth/", "/dashboard/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: protectedPaths,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: protectedPaths,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: protectedPaths,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: protectedPaths,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: protectedPaths,
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: protectedPaths,
      },
    ],
    sitemap: "https://www.kdpsuite.com/sitemap.xml",
    host: "https://www.kdpsuite.com",
  };
}

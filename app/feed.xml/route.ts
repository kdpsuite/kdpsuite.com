import { blogPosts } from "@/lib/content/blog-posts";

const siteUrl = "https://www.kdpsuite.com";

export async function GET() {
  const items = [...blogPosts]
    .sort((a, b) => (a.datePublished > b.datePublished ? -1 : 1))
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>KDP Creator Suite Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Guides and playbooks for Amazon KDP creators.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

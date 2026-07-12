import Link from "next/link";
import { blogPosts } from "@/lib/content/blog-posts";

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) =>
    a.datePublished > b.datePublished ? -1 : 1,
  );

  return (
    <main className="min-h-screen bg-white text-neutral">
      <section className="bg-gradient-to-r from-primary to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
            KDP Publishing Guides
          </h1>
          <p className="text-xl opacity-90 font-body">
            Step-by-step resources for KDP formatting, pricing, and workflow
            decisions.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="h-44 bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center text-6xl">
                {post.imageEmoji}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs mb-3">
                  <span className="text-primary bg-pink-50 px-3 py-1 rounded-full font-semibold font-body">
                    {post.category}
                  </span>
                  <span className="text-gray-500 font-body">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 font-heading">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700 font-body mb-6">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 font-body border-t border-gray-100 pt-4">
                  <span>{post.datePublished}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    Read guide
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

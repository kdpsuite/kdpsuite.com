import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/content/blog-posts";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "KDP publishing guides covering formatting, pricing, and workflow automation for self-publishers.",
  alternates: {
    canonical: "/guides",
  },
};

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-heading text-neutral mb-4">
          KDP Guides
        </h1>
        <p className="text-gray-700 font-body mb-10">
          Practical, citation-friendly guides for KDP creators and small
          publishing teams.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-gray-200 p-6"
            >
              <p className="text-sm text-primary font-semibold font-body mb-2">
                {post.category}
              </p>
              <h2 className="text-2xl font-bold font-heading mb-3">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-700 font-body mb-4">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-primary font-semibold hover:underline"
              >
                Read guide
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

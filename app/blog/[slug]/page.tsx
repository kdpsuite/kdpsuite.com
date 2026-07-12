import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, blogPostsBySlug } from "@/lib/content/blog-posts";
import { toJsonLd } from "@/lib/seo/json-ld";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function styleArticleHtml(html: string): string {
  return html
    .replace(
      /<h2>/g,
      '<h2 class="text-3xl font-bold text-neutral mt-10 mb-4 font-heading">',
    )
    .replace(
      /<h3>/g,
      '<h3 class="text-2xl font-bold text-neutral mt-7 mb-3 font-heading">',
    )
    .replace(/<p>/g, '<p class="text-lg text-gray-700 mb-4 leading-relaxed">')
    .replace(/<ul>/g, '<ul class="list-disc list-inside mb-4 space-y-2">')
    .replace(/<ol>/g, '<ol class="list-decimal list-inside mb-4 space-y-2">')
    .replace(/<li>/g, '<li class="text-lg text-gray-700">')
    .replace(/<table>/g, '<table class="w-full border-collapse mb-6">')
    .replace(/<thead>/g, '<thead class="bg-gray-50">')
    .replace(/<th>/g, '<th class="text-left p-3 border border-gray-200">')
    .replace(/<td>/g, '<td class="p-3 border border-gray-200 align-top">')
    .replace(/<strong>/g, '<strong class="font-bold text-neutral">');
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://www.kdpsuite.com/blog/${post.slug}`,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author.name],
    },
    twitter: {
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    notFound();
  }

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "KDP Creator Suite",
      url: "https://www.kdpsuite.com",
    },
    mainEntityOfPage: `https://www.kdpsuite.com/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: "https://www.kdpsuite.com/blog",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: `https://www.kdpsuite.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-neutral">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(postJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />

      <section className="bg-gradient-to-r from-primary to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="font-semibold bg-white/20 px-3 py-1 rounded-full font-body">
              {post.category}
            </span>
            <span className="font-body">{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 font-heading">
            {post.title}
          </h1>
          <div className="text-white/90 font-body">
            <span>{post.author.name}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.datePublished}>{post.datePublished}</time>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <p className="text-lg text-gray-700 leading-relaxed mb-8 border-l-4 border-primary pl-4">
          {post.description}
        </p>
        <article
          className="max-w-none text-neutral font-body"
          dangerouslySetInnerHTML={{ __html: styleArticleHtml(post.contentHtml) }}
        />
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-2xl font-bold font-heading mb-2">About the author</h2>
          <p className="font-semibold text-neutral font-body">{post.author.name}</p>
          <p className="text-gray-600 font-body mb-3">{post.author.role}</p>
          <p className="text-gray-700 font-body">{post.author.bio}</p>
        </div>
        <div className="mt-8">
          <Link href="/blog" className="text-primary font-semibold hover:underline">
            Back to all guides
          </Link>
        </div>
      </section>
    </main>
  );
}

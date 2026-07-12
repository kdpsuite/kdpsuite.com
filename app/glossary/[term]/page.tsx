import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { glossaryBySlug, glossaryTerms } from "@/lib/content/glossary";
import { toJsonLd } from "@/lib/seo/json-ld";

type GlossaryTermPageProps = {
  params: Promise<{ term: string }>;
};

export async function generateStaticParams() {
  return glossaryTerms.map((term) => ({ term: term.slug }));
}

export async function generateMetadata({
  params,
}: GlossaryTermPageProps): Promise<Metadata> {
  const { term } = await params;
  const glossaryTerm = glossaryBySlug[term];

  if (!glossaryTerm) {
    return {};
  }

  return {
    title: `${glossaryTerm.term} Definition`,
    description: glossaryTerm.definition,
    alternates: {
      canonical: `/glossary/${glossaryTerm.slug}`,
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: GlossaryTermPageProps) {
  const { term } = await params;
  const glossaryTerm = glossaryBySlug[term];

  if (!glossaryTerm) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd({
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            name: glossaryTerm.term,
            description: glossaryTerm.definition,
            url: `https://www.kdpsuite.com/glossary/${glossaryTerm.slug}`,
            inDefinedTermSet: "https://www.kdpsuite.com/glossary",
          }),
        }}
      />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/glossary" className="text-primary font-semibold hover:underline">
          Back to glossary
        </Link>
        <h1 className="text-4xl font-bold font-heading text-neutral mt-4 mb-6">
          {glossaryTerm.term}
        </h1>
        <p className="text-xl text-gray-800 font-body mb-6">
          {glossaryTerm.definition}
        </p>
        <p className="text-gray-700 font-body leading-relaxed">
          {glossaryTerm.detail}
        </p>
      </section>
    </main>
  );
}

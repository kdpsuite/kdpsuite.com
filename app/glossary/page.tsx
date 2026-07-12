import type { Metadata } from "next";
import Link from "next/link";
import { glossaryTerms } from "@/lib/content/glossary";

export const metadata: Metadata = {
  title: "KDP Glossary",
  description:
    "Definitions for common KDP publishing terms, including bleed, trim size, gutter, and print specifications.",
  alternates: {
    canonical: "/glossary",
  },
};

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-heading text-neutral mb-4">
          KDP Glossary
        </h1>
        <p className="text-gray-700 font-body mb-10">
          Definition-first references for terms you will see in KDP workflows.
        </p>
        <ul className="space-y-4">
          {glossaryTerms.map((term) => (
            <li key={term.slug} className="rounded-xl border border-gray-200 p-5">
              <h2 className="text-2xl font-bold font-heading mb-2">
                <Link
                  href={`/glossary/${term.slug}`}
                  className="hover:text-primary"
                >
                  {term.term}
                </Link>
              </h2>
              <p className="text-gray-700 font-body">{term.definition}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

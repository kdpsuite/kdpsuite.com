import type { Metadata } from "next";
import Link from "next/link";
import RoyaltyCalculatorClient from "./calculator-client";
import { toJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "KDP Royalty Calculator",
  description:
    "Estimate royalty per sale with list price, estimated costs, and royalty rate before you publish.",
  alternates: {
    canonical: "/tools/kdp-royalty-calculator",
  },
};

const faqItems = [
  {
    question: "What does this calculator estimate?",
    answer:
      "It estimates royalty per sale using list price, royalty rate, and estimated costs for planning scenarios.",
  },
  {
    question: "Is this the exact payout from Amazon KDP?",
    answer:
      "No. It is a planning estimate. Actual payout depends on format and marketplace-specific fee details.",
  },
];

export default function RoyaltyCalculatorPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Estimate KDP royalties before publishing",
            step: [
              {
                "@type": "HowToStep",
                name: "Enter list price",
              },
              {
                "@type": "HowToStep",
                name: "Enter estimated costs",
              },
              {
                "@type": "HowToStep",
                name: "Select royalty rate and review estimate",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-heading text-neutral mb-4">
          KDP Royalty Calculator
        </h1>
        <p className="text-gray-700 font-body mb-10">
          Test pricing scenarios before launch so you can publish with realistic
          margin targets.
        </p>
        <RoyaltyCalculatorClient />
        <p className="mt-10 text-gray-700 font-body">
          Related:{" "}
          <Link href="/blog/kdp-royalty-calculator-guide" className="text-primary hover:underline">
            Royalty calculator guide
          </Link>
          {" · "}
          <Link href="/pricing" className="text-primary hover:underline">
            Pricing
          </Link>
          {" · "}
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
        </p>
      </section>
    </main>
  );
}

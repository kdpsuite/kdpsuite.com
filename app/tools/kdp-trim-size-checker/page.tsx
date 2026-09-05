import type { Metadata } from "next";
import Link from "next/link";
import TrimSizeCheckerClient from "./checker-client";
import { toJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "KDP Trim Size Checker",
  description:
    "Validate your book dimensions against common Amazon KDP trim sizes before uploading print-ready files.",
  alternates: {
    canonical: "/tools/kdp-trim-size-checker",
  },
};

const faqItems = [
  {
    question: "What does this trim size checker do?",
    answer:
      "It compares your entered width and height against common KDP paperback trim sizes and flags whether your dimensions match a supported size.",
  },
  {
    question: "Does a match guarantee KDP will accept my file?",
    answer:
      "No. Trim size is one requirement. KDP also validates margins, bleed, cover dimensions, and PDF settings separately.",
  },
  {
    question: "Why do some trim sizes use decimals like 5.06 x 7.81?",
    answer:
      "KDP lists trim sizes in inches with fractional equivalents of metric standards. Always use the exact dimensions KDP specifies for your chosen size.",
  },
];

export default function TrimSizeCheckerPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Check KDP trim size before upload",
            step: [
              {
                "@type": "HowToStep",
                name: "Enter page width in inches",
              },
              {
                "@type": "HowToStep",
                name: "Enter page height in inches",
              },
              {
                "@type": "HowToStep",
                name: "Review match against common KDP trim sizes",
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
          KDP Trim Size Checker
        </h1>
        <p className="text-gray-700 font-body mb-10">
          Enter your interior page dimensions to see if they match a common KDP
          trim size before you export your print-ready PDF.
        </p>
        <TrimSizeCheckerClient />
        <h2 className="text-2xl font-bold font-heading mt-12 mb-3">FAQ</h2>
        {faqItems.map((item) => (
          <div key={item.question} className="mb-4">
            <h3 className="font-semibold text-neutral font-body">{item.question}</h3>
            <p className="text-gray-700 font-body">{item.answer}</p>
          </div>
        ))}
        <p className="mt-10 text-gray-700 font-body">
          Related:{" "}
          <Link href="/blog/kdp-formatting-guide" className="text-primary hover:underline">
            Formatting guide
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

import type { Metadata } from "next";
import Link from "next/link";
import { toJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Vellum Alternative for KDP Workflows",
  description:
    "A practical comparison of KDP workflow priorities when evaluating Vellum alternatives for formatting, conversion, and publishing operations.",
  alternates: {
    canonical: "/compare/vellum-alternative",
  },
};

const comparisonFaq = [
  {
    question: "What makes a useful Vellum alternative?",
    answer:
      "A useful alternative matches your output quality needs while reducing platform lock-in, handoffs, and per-title setup time.",
  },
  {
    question: "Is Vellum worth keeping for Mac users?",
    answer:
      "Vellum produces polished eBook and print exports on macOS. If you publish infrequently and value its preview quality, it may remain the right fit.",
  },
  {
    question: "Why look beyond Vellum?",
    answer:
      "Common reasons include cross-platform access, built-in compliance validation, batch publishing workflows, and consolidating multiple subscriptions.",
  },
];

export default function VellumAlternativePage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: comparisonFaq.map((item) => ({
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
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-heading text-neutral mb-4">
          Vellum Alternative: Workflow Comparison
        </h1>
        <p className="text-gray-700 font-body mb-10">
          Vellum is a premium Mac-only formatter known for clean eBook and
          paperback exports. If you need cross-platform access, repeatable
          low-content workflows, or compliance checks before upload, compare
          alternatives by end-to-end publishing outcomes.
        </p>
        <div className="overflow-x-auto mb-10">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 border border-gray-200">Criteria</th>
                <th className="text-left p-3 border border-gray-200">
                  Vellum-style formatter
                </th>
                <th className="text-left p-3 border border-gray-200">
                  Unified KDP workflow
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200">Platform</td>
                <td className="p-3 border border-gray-200">macOS only</td>
                <td className="p-3 border border-gray-200">
                  Browser-based, cross-platform
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Export quality</td>
                <td className="p-3 border border-gray-200">
                  High-quality eBook and print previews
                </td>
                <td className="p-3 border border-gray-200">
                  Print-ready PDF and Kindle outputs with presets
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Low-content workflows</td>
                <td className="p-3 border border-gray-200">
                  Manual layout per title
                </td>
                <td className="p-3 border border-gray-200">
                  Template-driven repeat publishing
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Pricing model</td>
                <td className="p-3 border border-gray-200">
                  One-time license per format tier
                </td>
                <td className="p-3 border border-gray-200">
                  Subscription with ongoing updates
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-bold font-heading mb-3">How to decide</h2>
        <ol className="list-decimal list-inside text-gray-700 font-body space-y-2 mb-10">
          <li>List the formats you publish most (Kindle, paperback, both).</li>
          <li>Note whether macOS-only access limits your workflow.</li>
          <li>Measure time spent on compliance fixes after export.</li>
          <li>Compare total cost: license fees plus any companion tools you still need.</li>
        </ol>
        <h2 className="text-2xl font-bold font-heading mb-3">FAQ</h2>
        {comparisonFaq.map((item) => (
          <div key={item.question} className="mb-4">
            <h3 className="font-semibold text-neutral font-body">{item.question}</h3>
            <p className="text-gray-700 font-body">{item.answer}</p>
          </div>
        ))}
        <p className="mt-10 text-gray-700 font-body">
          Related:{" "}
          <Link href="/features" className="text-primary hover:underline">
            Features
          </Link>
          {" · "}
          <Link href="/pricing" className="text-primary hover:underline">
            Pricing
          </Link>
          {" · "}
          <Link href="/blog" className="text-primary hover:underline">
            Blog
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

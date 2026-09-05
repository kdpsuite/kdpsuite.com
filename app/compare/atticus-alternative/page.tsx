import type { Metadata } from "next";
import Link from "next/link";
import { toJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Atticus Alternative for KDP Workflows",
  description:
    "A practical comparison of KDP workflow priorities when evaluating Atticus alternatives for formatting, conversion, and publishing operations.",
  alternates: {
    canonical: "/compare/atticus-alternative",
  },
};

const comparisonFaq = [
  {
    question: "What makes a useful Atticus alternative?",
    answer:
      "A useful alternative reduces workflow friction, supports your target format, and keeps quality checks close to publishing steps.",
  },
  {
    question: "Is Atticus a bad tool for KDP publishing?",
    answer:
      "No. Atticus is a capable formatting tool. The question is whether a single-platform workflow fits your publishing cadence better than a standalone formatter.",
  },
  {
    question: "Should I switch from Atticus if it already works?",
    answer:
      "Only if you are hitting friction points—multiple exports, separate compliance checks, or repeated handoffs—that a unified workflow would remove.",
  },
];

export default function AtticusAlternativePage() {
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
          Atticus Alternative: Workflow Comparison
        </h1>
        <p className="text-gray-700 font-body mb-10">
          Atticus focuses on manuscript formatting and export. If your bottleneck
          is the full path from draft to published title—including compliance
          checks, batch operations, and performance tracking—compare tools by
          workflow outcomes, not just formatting features.
        </p>
        <div className="overflow-x-auto mb-10">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 border border-gray-200">Criteria</th>
                <th className="text-left p-3 border border-gray-200">
                  Standalone formatter (Atticus-style)
                </th>
                <th className="text-left p-3 border border-gray-200">
                  Unified KDP workflow
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200">Formatting</td>
                <td className="p-3 border border-gray-200">
                  Strong chapter themes and export presets
                </td>
                <td className="p-3 border border-gray-200">
                  Templates plus built-in trim and margin presets
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Compliance checks</td>
                <td className="p-3 border border-gray-200">
                  Manual review after export
                </td>
                <td className="p-3 border border-gray-200">
                  Validation before upload step
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Multi-title ops</td>
                <td className="p-3 border border-gray-200">
                  Per-project formatting focus
                </td>
                <td className="p-3 border border-gray-200">
                  Shared templates and batch workflows
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Cost control</td>
                <td className="p-3 border border-gray-200">
                  Formatter plus separate tools for other steps
                </td>
                <td className="p-3 border border-gray-200">
                  One core platform cost
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-bold font-heading mb-3">How to decide</h2>
        <ol className="list-decimal list-inside text-gray-700 font-body space-y-2 mb-10">
          <li>Map your current workflow from draft to publish.</li>
          <li>Identify where Atticus ends and other tools begin.</li>
          <li>Count export/import steps and manual compliance reviews per title.</li>
          <li>Prioritize the setup that removes the most repetitive friction.</li>
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

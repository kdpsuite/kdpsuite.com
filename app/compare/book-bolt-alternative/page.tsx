import type { Metadata } from "next";
import { toJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Book Bolt Alternative for KDP Workflows",
  description:
    "A practical comparison of KDP workflow priorities when evaluating Book Bolt alternatives for formatting, conversion, and publishing operations.",
  alternates: {
    canonical: "/compare/book-bolt-alternative",
  },
};

const comparisonFaq = [
  {
    question: "What makes a useful Book Bolt alternative?",
    answer:
      "A useful alternative reduces workflow friction, supports your target format, and keeps quality checks close to publishing steps.",
  },
  {
    question: "Should I choose by feature count alone?",
    answer:
      "No. Workflow fit and reliability matter more than a longer feature list if your publishing cadence is the goal.",
  },
];

export default function BookBoltAlternativePage() {
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
          Book Bolt Alternative: Workflow Comparison
        </h1>
        <p className="text-gray-700 font-body mb-10">
          If your goal is fewer handoffs and fewer format issues, compare tools by
          workflow outcomes, not just feature checklists.
        </p>
        <div className="overflow-x-auto mb-10">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 border border-gray-200">Criteria</th>
                <th className="text-left p-3 border border-gray-200">
                  Traditional multi-tool flow
                </th>
                <th className="text-left p-3 border border-gray-200">
                  Unified KDP workflow
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200">Setup time</td>
                <td className="p-3 border border-gray-200">
                  Repeated setup across tools
                </td>
                <td className="p-3 border border-gray-200">
                  Shared templates and repeatable steps
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Error risk</td>
                <td className="p-3 border border-gray-200">
                  More file handoffs and re-exports
                </td>
                <td className="p-3 border border-gray-200">
                  Fewer handoffs before publish
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Cost control</td>
                <td className="p-3 border border-gray-200">
                  Multiple subscriptions
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
          <li>Count app switches and export/import steps for one title.</li>
          <li>Prioritize the setup that removes the most repetitive friction.</li>
        </ol>
        <h2 className="text-2xl font-bold font-heading mb-3">FAQ</h2>
        {comparisonFaq.map((item) => (
          <div key={item.question} className="mb-4">
            <h3 className="font-semibold text-neutral font-body">{item.question}</h3>
            <p className="text-gray-700 font-body">{item.answer}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

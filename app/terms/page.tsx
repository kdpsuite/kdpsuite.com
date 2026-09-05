import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for KDP Creator Suite, including account usage and billing terms.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-heading mb-6 text-neutral">
          Terms of Service
        </h1>
        <p className="text-gray-700 font-body mb-6">
          Effective date: July 12, 2026
        </p>
        <div className="space-y-6 text-gray-700 font-body leading-relaxed">
          <p>
            By using KDP Creator Suite, you agree to use the service for lawful
            publishing and business purposes.
          </p>
          <p>
            You are responsible for the content you upload and for ensuring that
            you have the rights required to publish it.
          </p>
          <p>
            Subscription terms, renewals, and cancellation terms are presented at
            checkout. Failure to comply with these terms may result in account
            suspension.
          </p>
          <p>
            For questions about these terms, contact support@kdpsuite.com.
          </p>
        </div>
        <p className="mt-10 text-gray-700 font-body">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          {" · "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact
          </Link>
          {" · "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy
          </Link>
        </p>
      </section>
    </main>
  );
}

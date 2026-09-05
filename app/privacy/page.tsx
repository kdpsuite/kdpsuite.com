import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for KDP Creator Suite covering data collection, usage, and contact details.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-heading mb-6 text-neutral">
          Privacy Policy
        </h1>
        <p className="text-gray-700 font-body mb-6">
          Effective date: July 12, 2026
        </p>
        <div className="space-y-6 text-gray-700 font-body leading-relaxed">
          <p>
            KDP Creator Suite collects the minimum account and product usage data
            needed to provide publishing workflows, billing, and support.
          </p>
          <p>
            We use your account information to authenticate sessions, process
            requests you initiate, and deliver service updates. We do not sell
            personal information.
          </p>
          <p>
            Payment processing is handled by Stripe. We do not store full card
            details on our servers.
          </p>
          <p>
            You can request account deletion or data export by contacting
            support@kdpsuite.com.
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
          <Link href="/terms" className="text-primary hover:underline">
            Terms
          </Link>
        </p>
      </section>
    </main>
  );
}

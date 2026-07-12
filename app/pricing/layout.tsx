import type { Metadata } from "next";
import { toJsonLd } from "@/lib/seo/json-ld";

const pricingFaq = [
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can upgrade or downgrade your plan, and changes apply on the next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Current pricing and campaign details are shown on the pricing page. Check the live page for active offers.",
  },
  {
    question: "What payment methods are supported?",
    answer: "Checkout is handled through Stripe and supports major credit cards.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes. You can cancel from your billing settings, and access continues through the current billing period.",
  },
];

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "View KDP Creator Suite pricing plans and compare features for independent creators and publishing teams.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "KDP Creator Suite Pricing",
    description:
      "Compare KDP Creator Suite plans and select the best fit for your publishing workflow.",
    url: "https://www.kdpsuite.com/pricing",
  },
  twitter: {
    title: "KDP Creator Suite Pricing",
    description:
      "Compare KDP Creator Suite plans and select the best fit for your publishing workflow.",
  },
};

export default function PricingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: pricingFaq.map((item) => ({
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
      {children}
    </>
  );
}

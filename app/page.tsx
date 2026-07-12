import type { Metadata } from "next";
import FoundingCampaignPage from "./page-founding-campaign";
import { toJsonLd } from "@/lib/seo/json-ld";

const homepageFaq = [
  {
    question: "When will the platform be ready?",
    answer:
      "The platform is live and founding members can access the dashboard immediately.",
  },
  {
    question: "What happens after founding spots sell out?",
    answer:
      "When founding spots are sold out, the platform moves to monthly subscription pricing.",
  },
  {
    question: "Can I upgrade my tier later?",
    answer:
      "Founding members can upgrade by paying the difference while lifetime tiers are available.",
  },
];

export const metadata: Metadata = {
  title: "Amazon KDP Software and Publishing Workflow Platform",
  description:
    "KDP Creator Suite helps self-publishers format, validate, and publish faster with one workflow platform.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KDP Creator Suite",
    description:
      "Amazon KDP workflow software for conversion, formatting, compliance checks, and analytics.",
    url: "https://www.kdpsuite.com",
  },
  twitter: {
    title: "KDP Creator Suite",
    description:
      "Amazon KDP workflow software for conversion, formatting, compliance checks, and analytics.",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homepageFaq.map((item) => ({
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
      <FoundingCampaignPage />
    </>
  );
}

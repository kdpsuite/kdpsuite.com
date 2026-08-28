import type { Metadata } from "next";
import FoundingCampaignPage from "./page-founding-campaign";
import { foundingCampaignFaqs, homepageFaqs, toFaqPageJsonLd } from "@/lib/content/homepage-faq";
import { toJsonLd } from "@/lib/seo/json-ld";

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
          __html: toJsonLd(
            toFaqPageJsonLd([...foundingCampaignFaqs, ...homepageFaqs])
          ),
        }}
      />
      <FoundingCampaignPage />
    </>
  );
}

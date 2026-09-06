import type { Metadata } from "next";
import FoundingCampaignPage from "./page-founding-campaign";
import { foundingCampaignFaqs, homepageFaqs, toFaqPageJsonLd } from "@/lib/content/homepage-faq";
import { toJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: {
    absolute: "KDP Creator Suite",
  },
  description:
    "KDP Creator Suite is a publishing platform for Amazon KDP workflows, including formatting, compliance checks, conversion, and royalty planning.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KDP Creator Suite",
    description:
      "KDP Creator Suite is a publishing platform for Amazon KDP workflows, including formatting, compliance checks, conversion, and royalty planning.",
    url: "https://www.kdpsuite.com",
  },
  twitter: {
    title: "KDP Creator Suite",
    description:
      "KDP Creator Suite is a publishing platform for Amazon KDP workflows, including formatting, compliance checks, conversion, and royalty planning.",
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

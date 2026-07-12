import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore KDP Creator Suite features for Amazon KDP workflows, including conversion, formatting, validation, and publishing automation.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "KDP Creator Suite Features",
    description:
      "Feature overview for KDP Creator Suite publishing workflows and automation tools.",
    url: "https://www.kdpsuite.com/features",
  },
  twitter: {
    title: "KDP Creator Suite Features",
    description:
      "Feature overview for KDP Creator Suite publishing workflows and automation tools.",
  },
};

export default function FeaturesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

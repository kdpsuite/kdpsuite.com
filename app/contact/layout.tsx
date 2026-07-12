import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact KDP Creator Suite for product questions, support, and partnership inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact KDP Creator Suite",
    description:
      "Reach the KDP Creator Suite team for support and product questions.",
    url: "https://www.kdpsuite.com/contact",
  },
  twitter: {
    title: "Contact KDP Creator Suite",
    description:
      "Reach the KDP Creator Suite team for support and product questions.",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the founder story and mission behind KDP Creator Suite and the product direction for independent KDP publishers.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About KDP Creator Suite",
    description:
      "Founder story and mission behind KDP Creator Suite for independent self-publishers.",
    url: "https://www.kdpsuite.com/about",
  },
  twitter: {
    title: "About KDP Creator Suite",
    description:
      "Founder story and mission behind KDP Creator Suite for independent self-publishers.",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides for KDP formatting, pricing, workflow automation, and publishing operations for independent creators.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "KDP Creator Suite Blog",
    description:
      "Publishing guides and tutorials for KDP creators and small publishing teams.",
    url: "https://www.kdpsuite.com/blog",
    type: "website",
  },
  twitter: {
    title: "KDP Creator Suite Blog",
    description:
      "Publishing guides and tutorials for KDP creators and small publishing teams.",
  },
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AdScriptLoader } from "@/components/ads";
import { AuthProvider } from "@/lib/auth-context";
import { toJsonLd } from "@/lib/seo/json-ld";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "KDP Creator Suite",
    template: "%s | KDP Creator Suite",
  },
  description:
    "KDP Creator Suite is a publishing platform for Amazon KDP workflows, including formatting, compliance checks, conversion, and royalty planning.",
  keywords: [
    "amazon kdp software",
    "kdp publishing tools",
    "pdf to coloring book converter",
    "kdp formatting software",
    "kdp royalty calculator",
    "amazon self publishing tools",
    "low content book creator",
    "kdp niche research",
    "kdp batch processing",
    "kdp analytics dashboard",
  ],
  authors: [{ name: "KDP Creator Suite" }],
  creator: "KDP Creator Suite",
  publisher: "Unloved Productions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.kdpsuite.com"),
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "KDP Creator Suite",
    description:
      "All-in-one Amazon KDP workflow software for formatting, compliance, conversion, and publishing analytics.",
    url: "https://www.kdpsuite.com",
    siteName: "KDP Creator Suite",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "KDP Creator Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KDP Creator Suite",
    description:
      "Amazon KDP workflow software for formatting, conversion, compliance, and royalty planning.",
    images: ["/og-image.svg"],
    creator: "@kdpcreatorsuite",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DL0SQ99CX4" strategy="afterInteractive" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DL0SQ99CX4');
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#e91e63" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLd({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KDP Creator Suite",
              url: "https://www.kdpsuite.com",
              logo: "https://www.kdpsuite.com/apple-touch-icon.svg",
              email: "support@kdpsuite.com",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLd({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "KDP Creator Suite",
              url: "https://www.kdpsuite.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.kdpsuite.com/blog?query={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLd({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "KDP Creator Suite",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "0",
                highPrice: "99",
                priceCurrency: "USD",
                offerCount: "3",
              },
              description:
                "Amazon KDP workflow software for formatting, compliance checks, conversion, and publishing analytics.",
            }),
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${lato.variable} antialiased font-body`}
      >
        <AuthProvider>{children}</AuthProvider>
        <AdScriptLoader />
        <Analytics />
      </body>
    </html>
  );
}


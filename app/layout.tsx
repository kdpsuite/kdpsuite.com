import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Amazon KDP Software: Publishing Tools & PDF to Coloring Book | KDP Suite",
  description: "Professional Amazon KDP software with AI-powered publishing tools. Convert PDF to coloring book, validate KDP compliance, and automate your kdp workflow. Advanced kdp analytics, batch image processing, and kdp integration for digital book publishing. Self-publishing tools for kdp revenue analytics and publishing performance metrics.",
  keywords: [
    "kdp publishing tools",
    "amazon kdp software",
    "pdf to coloring book",
    "kdp compliance validation",
    "ai-powered publishing tools",
    "automated kdp workflow",
    "kdp integration",
    "batch image processing",
    "kdp analytics",
    "digital book publishing",
    "self-publishing tools",
    "kdp revenue analytics",
    "coloring book creator",
    "kdp conversion software",
    "publishing performance metrics",
  ],
  authors: [{ name: "KDP Creator Suite" }],
  creator: "KDP Creator Suite",
  publisher: "Unloved Productions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.kdpsuite.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Amazon KDP Software: Publishing Tools & PDF to Coloring Book | KDP Suite",
    description: "Professional Amazon KDP software and kdp publishing tools. AI-powered pdf to coloring book conversion, kdp compliance validation, and automated kdp workflow. Advanced kdp analytics and batch image processing.",
    url: 'https://www.kdpsuite.com',
    siteName: 'KDP Creator Suite',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KDP Creator Suite - Professional KDP Publishing Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Amazon KDP Software: Publishing Tools & PDF to Coloring Book | KDP Suite",
    description: "Professional Amazon KDP software with kdp publishing tools. AI-powered pdf to coloring book conversion, kdp compliance validation, and self-publishing automation.",
    images: ['/og-image.png'],
    creator: '@kdpcreatorsuite',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DL0SQ99CX4"></script>
        <script
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#E91E63" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "KDP Creator Suite",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "0",
                "highPrice": "99",
                "priceCurrency": "USD",
                "offerCount": "3"
              },
              "description": "Professional Amazon KDP software and kdp publishing tools with AI-powered pdf to coloring book conversion, kdp compliance validation, batch image processing, and automated kdp workflow for digital book publishing.",
              "operatingSystem": "Web, iOS, Android",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "1000"
              }
            })
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${lato.variable} antialiased font-body`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}


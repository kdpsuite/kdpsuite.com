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
  title: "KDP Creator Suite - Best Amazon KDP Software & PDF to Coloring Book Tools | Professional KDP Publishing Tools",
  description: "The ultimate KDP publishing tools suite. Convert PDF to coloring book with AI-powered Amazon KDP software. Professional KDP publishing tools for creators. Join 1,000+ creators on the waitlist for early access.",
  keywords: [
    "KDP creator tools",
    "Amazon KDP publishing",
    "coloring book converter",
    "PDF to coloring book",
    "KDP compliance tool",
    "self-publishing automation",
    "book creation software",
    "KDP formatting tool",
    "Amazon publishing software",
    "coloring book creator",
    "KDP automation",
    "publishing workflow",
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
    title: "KDP Creator Suite - Professional Amazon KDP Software & PDF to Coloring Book Converter",
    description: "Professional KDP publishing tools and Amazon KDP software. Convert PDF to coloring book with AI. Best KDP publishing tools for Amazon creators.",
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
    title: "KDP Creator Suite - Best Amazon KDP Software & PDF to Coloring Book Tools",
    description: "Professional KDP publishing tools and Amazon KDP software. Convert PDF to coloring book with AI. Best KDP publishing tools for creators.",
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
              "description": "Professional Amazon KDP software and KDP publishing tools with AI-powered PDF to coloring book conversion, KDP compliance validation, and automated publishing workflow.",
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


export interface HomepageFaqItem {
  question: string;
  answer: string;
}

/** Visible homepage FAQ — keep in sync with FAQPage JSON-LD in app/page.tsx */
export const homepageFaqs: HomepageFaqItem[] = [
  {
    question: 'How does KDP Creator Suite work?',
    answer:
      'Upload your PDF or images, our AI converts them to KDP-compliant coloring books, validates compliance, and you can publish directly to Amazon KDP.',
  },
  {
    question: 'Do I need design skills?',
    answer:
      'No! Our AI handles all the design work. Just upload your content and we handle the rest.',
  },
  {
    question: 'What file formats do you support?',
    answer: 'We support PDF, JPG, PNG, and TIFF formats. Files up to 500MB.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes! Cancel your subscription anytime with no penalties or questions asked.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! Start with our free plan (10 conversions/month) or get a 14-day free trial of Pro.',
  },
  {
    question: 'How much can I earn?',
    answer:
      'Publishers earn $500-$5,000/month on average. Some earn much more! It depends on your niche and marketing.',
  },
];

/** Founding-campaign FAQ for JSON-LD on pages that still show founding copy */
export const foundingCampaignFaqs: HomepageFaqItem[] = [
  {
    question: 'When will the platform be ready?',
    answer:
      'The platform is live and founding members can access the dashboard immediately.',
  },
  {
    question: 'What happens after founding spots sell out?',
    answer:
      'When founding spots are sold out, the platform moves to monthly subscription pricing.',
  },
  {
    question: 'Can I upgrade my tier later?',
    answer:
      'Founding members can upgrade by paying the difference while lifetime tiers are available.',
  },
];

export function toFaqPageJsonLd(faqs: HomepageFaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

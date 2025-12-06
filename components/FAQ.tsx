'use client';

/**
 * FAQ Component
 * Displays frequently asked questions with expandable answers
 */

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
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

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-12 font-heading">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full p-6 text-left font-semibold text-neutral hover:bg-gray-50 transition-colors flex justify-between items-center"
              >
                {faq.question}
                <span
                  className={`transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="p-6 bg-gray-50 border-t border-gray-200 text-gray-700 font-body">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

/**
 * FAQ Component
 * Displays frequently asked questions with expandable answers
 */

import { useState } from 'react';
import { homepageFaqs } from '@/lib/content/homepage-faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = homepageFaqs;

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

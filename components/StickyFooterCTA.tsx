'use client';

/**
 * Sticky Footer CTA Component
 * Displays a fixed call-to-action banner at the bottom of the page
 * Improves conversion rates by keeping CTA visible while scrolling
 */

import { useState } from 'react';
import Link from 'next/link';

export default function StickyFooterCTA() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 shadow-2xl z-40">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <p className="font-semibold font-heading">Ready to transform your publishing?</p>
          <p className="text-sm text-pink-100 font-body">Start your free trial today</p>
        </div>
        <div className="flex gap-4">
          <Link href="https://dashboard.kdpsuite.com" className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 inline-block font-body">
            Start Free Trial
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

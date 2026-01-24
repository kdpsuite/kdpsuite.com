'use client';

import { useState } from 'react';

/**
 * IndieGoGo Campaign Banner Component
 * 
 * IMPORTANT: Replace the placeholder campaign URL with your actual IndieGoGo campaign link
 * 
 * TODO: Update the INDIEGOGO_CAMPAIGN_URL below with your campaign address
 * Example: https://www.indiegogo.com/projects/kdp-creator-suite-your-campaign-name
 */
const INDIEGOGO_CAMPAIGN_URL = 'https://www.indiegogo.com/projects/YOUR-CAMPAIGN-ID-HERE';

export default function IndieGoGoCampaign() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <span className="text-3xl">🚀</span>
              <span className="text-sm font-bold uppercase tracking-wider bg-white bg-opacity-20 px-3 py-1 rounded-full">
                LIVE NOW
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              IndieGoGo Campaign is LIVE!
            </h2>
            <p className="text-purple-100 text-lg mb-4">
              Be an early supporter and get exclusive perks at special founding member prices
            </p>
            <ul className="text-purple-100 space-y-2 mb-6 text-sm md:text-base">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-yellow-300">⭐</span>
                Early bird pricing - Save up to 50%
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-yellow-300">⭐</span>
                Lifetime access to premium features
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-yellow-300">⭐</span>
                Exclusive community access
              </li>
            </ul>
          </div>

          {/* Right CTA */}
          <div className="flex-shrink-0 flex flex-col gap-3 w-full md:w-auto">
            <a
              href={INDIEGOGO_CAMPAIGN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl text-center"
            >
              Back Us Now
            </a>
            <button
              onClick={() => setIsVisible(false)}
              className="text-purple-200 hover:text-white transition-colors text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Progress Bar (Optional) */}
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white border-opacity-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left flex-1">
              <p className="text-purple-100 text-sm">Campaign Progress</p>
              <div className="bg-white bg-opacity-20 rounded-full h-2 mt-2 overflow-hidden">
                <div className="bg-yellow-300 h-full w-3/4 rounded-full transition-all duration-1000"></div>
              </div>
              <p className="text-purple-100 text-xs mt-2">$75,000 of $100,000 goal</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-purple-100 text-sm">Backers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">18</p>
              <p className="text-purple-100 text-sm">Days Left</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

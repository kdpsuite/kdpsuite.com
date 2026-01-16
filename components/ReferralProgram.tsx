'use client';

/**
 * Referral Program Component
 * Viral growth mechanism - 30% commission on first year
 * Expected impact: +10-20% viral growth
 */

import { useState } from 'react';

export default function ReferralProgram() {
  const [copied, setCopied] = useState(false);

  // In production, this would come from user context/session
  const userId = process.env.NEXT_PUBLIC_USER_ID || 'demo123';
  const referralLink = `https://kdpsuite.com?ref=${userId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-4 font-heading">
          Earn Rewards
        </h2>
        <p className="text-center text-gray-600 mb-12 font-body">
          Refer friends and earn 30% commission on their first year
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Referral Link Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2 text-neutral font-heading">
              Your Referral Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-neutral font-body"
              />
              <button
                onClick={copyToClipboard}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all font-heading whitespace-nowrap"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-primary font-heading">0</p>
              <p className="text-gray-600 text-sm font-body">Referrals</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-primary font-heading">$0</p>
              <p className="text-gray-600 text-sm font-body">Earned</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-primary font-heading">30%</p>
              <p className="text-gray-600 text-sm font-body">Commission</p>
            </div>
          </div>

          {/* How It Works */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-neutral mb-4 font-heading">How It Works</h3>
            <ol className="space-y-3 text-sm text-gray-600 font-body">
              <li className="flex gap-3">
                <span className="text-primary font-semibold">1.</span>
                <span>Share your referral link with friends and colleagues</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold">2.</span>
                <span>They sign up using your link and start their free trial</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold">3.</span>
                <span>You earn 30% commission on their first year subscription</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold">4.</span>
                <span>Commissions are paid monthly to your account</span>
              </li>
            </ol>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4 font-body">
            Want to learn more about our referral program?
          </p>
          <a
            href="/contact"
            className="inline-block text-primary font-semibold hover:underline font-heading"
          >
            Contact our team →
          </a>
        </div>
      </div>
    </section>
  );
}

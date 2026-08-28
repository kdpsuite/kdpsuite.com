'use client';

/**
 * Referral Program Component
 * Viral growth mechanism - 30% commission on first year
 */

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';

interface ReferralStats {
  referralCount: number;
  totalEarned: number;
  commissionRate: number;
  referralCode: string;
}

export default function ReferralProgram() {
  const { user, session, isAuthenticated, isLoading } = useAuth();
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kdpsuite.com';
  const referralCode = user?.id ?? stats?.referralCode ?? null;
  const referralLink = referralCode ? `${appUrl}?ref=${referralCode}` : '';

  useEffect(() => {
    if (!isAuthenticated || !session?.access_token) {
      return;
    }

    let cancelled = false;
    setStatsLoading(true);

    fetch('/api/referral', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }
        return response.json() as Promise<ReferralStats>;
      })
      .then((data) => {
        if (!cancelled && data) {
          setStats(data);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setStatsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, session?.access_token]);

  const copyToClipboard = () => {
    if (!referralLink) {
      return;
    }
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referralCount = stats?.referralCount ?? 0;
  const totalEarned = stats?.totalEarned ?? 0;
  const commissionRate = stats?.commissionRate ?? 0.3;

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
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2 text-neutral font-heading">
              Your Referral Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink || 'Log in to get your referral link'}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-neutral font-body"
              />
              <button
                onClick={copyToClipboard}
                disabled={!referralLink}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all font-heading whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            {!isLoading && !isAuthenticated && (
              <p className="text-sm text-gray-500 mt-2 font-body">
                <a href="/auth/login" className="text-primary hover:underline">
                  Log in
                </a>{' '}
                to get your referral link and track stats.
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-primary font-heading">
                {statsLoading ? '—' : referralCount}
              </p>
              <p className="text-gray-600 text-sm font-body">Referrals</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-primary font-heading">
                {statsLoading ? '—' : `$${totalEarned.toFixed(0)}`}
              </p>
              <p className="text-gray-600 text-sm font-body">Earned</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-primary font-heading">
                {Math.round(commissionRate * 100)}%
              </p>
              <p className="text-gray-600 text-sm font-body">Commission</p>
            </div>
          </div>

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

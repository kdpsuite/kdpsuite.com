'use client';

import { useState } from 'react';
import { pricingPlans } from '@/lib/stripe';

export default function PricingPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'Failed to create checkout session');
        setLoading(false);
        return;
      }

      // Redirect to Stripe checkout URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        setMessage('Failed to get checkout URL');
        setLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setMessage('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#E91E63] to-pink-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl opacity-90">
            Choose the perfect plan for your KDP publishing journey
          </p>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Email Input */}
        <div className="mb-12 text-center">
          <input
            type="email"
            placeholder="Enter your email to get started"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-md px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#E91E63]"
          />
          {message && (
            <p
              className={`mt-2 text-sm ${
                message.includes('error') || message.includes('failed')
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg border-2 transition-all ${
                selectedPlan === plan.id
                  ? 'border-[#E91E63] shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Plan Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b-2 border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-[#E91E63]">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{plan.interval === 'month' ? 'month' : 'year'}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#E91E63] mr-3 font-bold">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    handleCheckout(plan.stripePriceId);
                  }}
                  disabled={loading}
                  className="w-full bg-[#E91E63] text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading && selectedPlan === plan.id
                    ? 'Processing...'
                    : 'Get Started'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-lg p-8 mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                Can I change plans?
              </h3>
              <p className="text-gray-700">
                Yes! You can upgrade or downgrade your plan at any time. Changes
                take effect on your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                Is there a free trial?
              </h3>
              <p className="text-gray-700">
                We offer a 14-day free trial for all plans. No credit card
                required to start.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-700">
                We accept all major credit cards (Visa, Mastercard, American
                Express) through Stripe.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-700">
                Yes! Cancel your subscription anytime with no questions asked.
                You&apos;ll have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


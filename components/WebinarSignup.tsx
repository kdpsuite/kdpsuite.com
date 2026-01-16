'use client';

/**
 * Webinar/Demo Signup Component
 * Free live demo registration for lead generation
 * Expected impact: +5-10% lead generation
 */

import { useState } from 'react';

export default function WebinarSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (_error) {
      setStatus('error');
    }
  };

  return (
    <section className="bg-primary text-white py-20">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4 font-heading">
          Free Live Demo
        </h2>
        <p className="text-primary-light mb-8 font-body">
          See KDP Creator Suite in action. Learn how to publish your first book in
          30 minutes.
        </p>

        {/* Demo Details */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-2xl font-bold font-heading">Dec 15</p>
            <p className="text-primary-light text-sm font-body">2 PM EST</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-2xl font-bold font-heading">30 min</p>
            <p className="text-primary-light text-sm font-body">Live demo</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-2xl font-bold font-heading">Free</p>
            <p className="text-primary-light text-sm font-body">
              No credit card
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="flex-1 px-4 py-3 rounded-lg text-neutral focus:outline-none disabled:opacity-50 font-body"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 transition-all font-heading whitespace-nowrap"
            >
              {status === 'loading' ? 'Registering...' : 'Register Now'}
            </button>
          </div>

          {status === 'success' && (
            <p className="text-green-200 text-center font-body">
              ✓ Check your email for demo link!
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-200 text-center font-body">
              ✗ Something went wrong. Please try again.
            </p>
          )}
        </form>

        {/* What You&apos;ll Learn */}
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm text-left">
          <h3 className="font-semibold mb-4 font-heading">
            What You&apos;ll Learn:
          </h3>
          <ul className="space-y-2 text-sm font-body">
            <li>
              ✓ How to convert PDFs to KDP-compliant coloring books in seconds
            </li>
            <li>✓ Batch processing to publish 10+ books per day</li>
            <li>✓ Compliance validation to avoid Amazon rejections</li>
            <li>✓ Direct KDP integration for seamless publishing</li>
            <li>✓ Analytics to track your earnings in real-time</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

'use client';

/**
 * Newsletter Signup Component
 * High-ROI email marketing channel (42:1 return)
 * Expected to build 1,000+ subscriber list in 3 months
 */

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('✓ Check your email for confirmation!');
        setEmail('');
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.error || '✗ Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage('✗ Network error. Please try again.');
    }
  };

  return (
    <section className="bg-primary text-white py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-center font-heading">
          Get Weekly KDP Tips
        </h2>
        <p className="text-center text-pink-100 mb-8 font-body">
          Join 5,000+ publishers receiving exclusive tips, guides, and success stories
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
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
            className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 transition-all font-heading whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 font-body ${
              status === 'success' ? 'text-green-200' : 'text-red-200'
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-sm text-pink-100 mt-4 font-body">
          No spam, unsubscribe anytime
        </p>
      </div>
    </section>
  );
}

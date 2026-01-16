'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoogleAdsenseBanner, NativeAd } from '@/components/ads';
import IndieGoGoCampaign from '@/components/IndieGoGoCampaign';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const launchDate = new Date('2025-11-17T00:00:00').getTime();

    const tick = () => {
      const now = Date.now();
      const d = launchDate - now;

      if (d <= 0) return;

      setTimeLeft({
        days: Math.floor(d / (1000 * 60 * 60 * 24)),
        hours: Math.floor((d / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((d / (1000 * 60)) % 60),
        seconds: Math.floor((d / 1000) % 60),
      });
    };

    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Welcome to the waitlist! Check your email.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral">
      <IndieGoGoCampaign />

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image src="/kdpsuitelogo.png" alt="KDP Creator Suite" width={180} height={40} />
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
            <a href="https://app.kdpsuite.com/login" className="px-4 py-2 border rounded-full">
              Login
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-3">
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white text-center">
        <h1 className="text-6xl font-extrabold mb-6">
          Professional Amazon KDP Publishing Software
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-700 mb-10">
          Convert PDFs to KDP-ready coloring books, validate compliance, and publish faster
          with AI-powered KDP tools.
        </p>

        <div className="max-w-xl mx-auto bg-pink-600 text-white rounded-2xl p-8 mb-10">
          <p className="font-semibold mb-4">IndieGoGo Launch In</p>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(timeLeft).map(([k, v]) => (
              <div key={k} className="bg-white/20 rounded p-4">
                <div className="text-3xl font-bold">{v}</div>
                <div className="text-sm">{k}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border rounded-lg"
          />
          <button className="px-6 py-3 bg-primary text-white rounded-lg">
            {status === 'loading' ? 'Joining…' : 'Join Waitlist'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </section>

      {/* FEATURES */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            'PDF to Coloring Book',
            'KDP Compliance Validation',
            'Batch Processing',
            'Direct KDP Integration',
            'Analytics & Revenue Tracking',
            'AI-Powered Tools',
          ].map((f) => (
            <div key={f} className="p-6 bg-gray-50 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2">{f}</h3>
            </div>
          ))}
        </div>
      </section>

      <GoogleAdsenseBanner slot="HOME_BANNER_SLOT" format="horizontal" />
      <NativeAd />

      {/* FOOTER */}
      <footer className="bg-neutral text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <Image
            src="/unlovedproductions_logo.png"
            alt="Unloved Productions"
            width={140}
            height={40}
            className="mx-auto mb-4"
          />
          <p className="text-sm opacity-80">© 2025 KDP Creator Suite</p>
        </div>
      </footer>
    </div>
  );
}
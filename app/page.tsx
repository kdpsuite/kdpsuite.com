'use client';

import { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoogleAdsenseBanner, NativeAd } from '@/components/ads';
import IndieGoGoCampaign from '@/components/IndieGoGoCampaign';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate countdown timer
  useEffect(() => {
    const calculateCountdown = () => {
      // Indiegogo campaign launch: 3 weeks from 10/27/2025
      const launchDate = new Date('2025-11-17T00:00:00').getTime();
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('🎉 Welcome to the waitlist! Check your email for confirmation.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral">
      {/* IndieGoGo Campaign Banner - PROMINENT PLACEMENT AT TOP */}
      <IndieGoGoCampaign />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/kdpsuitelogo.png"
              alt="KDP Creator Suite Logo"
              width={180}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-neutral hover:text-primary transition-colors font-body">
              Features
            </Link>
            <Link href="/blog" className="text-neutral hover:text-primary transition-colors font-body">
              Blog
            </Link>
            <Link href="/#pricing" className="text-neutral hover:text-primary transition-colors font-body">
              Pricing
            </Link>
            <Link href="/contact" className="text-neutral hover:text-primary transition-colors font-body">
              Contact
            </Link>
            <a href="https://app.kdpsuite.com/login" className="px-6 py-2 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all font-body font-semibold">
              Login
            </a>
            <a href="https://dashboard.kdpsuite.com" className="px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all font-body font-semibold">
              Dashboard
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5"
          >
            <span className={`h-0.5 w-6 bg-neutral transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-6 bg-neutral transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-6 bg-neutral transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-4">
            <Link href="/features" className="block text-neutral hover:text-primary transition-colors font-body">
              Features
            </Link>
            <Link href="/blog" className="block text-neutral hover:text-primary transition-colors font-body">
              Blog
            </Link>
            <Link href="/#pricing" className="block text-neutral hover:text-primary transition-colors font-body">
              Pricing
            </Link>
            <Link href="/contact" className="block text-neutral hover:text-primary transition-colors font-body">
              Contact
            </Link>
            <a href="https://app.kdpsuite.com/login" className="block px-6 py-2 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all font-body font-semibold text-center">
              Login
            </a>
            <a href="https://dashboard.kdpsuite.com" className="block px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all font-body font-semibold text-center">
              Dashboard
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-neutral">
            Transform Your KDP Publishing
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Convert PDFs to KDP-compliant coloring books, validate compliance, and publish to Amazon KDP—all in one powerful platform.
          </p>

          {/* Countdown Timer */}
          <div className="bg-gradient-to-r from-[#E91E63] to-pink-600 text-white rounded-2xl p-8 mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider mb-4">IndieGoGo Campaign Launching In</p>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-3xl font-bold">{timeLeft.days}</p>
                <p className="text-sm opacity-90">Days</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-3xl font-bold">{timeLeft.hours}</p>
                <p className="text-sm opacity-90">Hours</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-3xl font-bold">{timeLeft.minutes}</p>
                <p className="text-sm opacity-90">Minutes</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-3xl font-bold">{timeLeft.seconds}</p>
                <p className="text-sm opacity-90">Seconds</p>
              </div>
            </div>
            <p className="text-sm opacity-90">Get notified when we launch and receive exclusive early-bird pricing</p>
          </div>

          {/* Email Signup */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>

          {message && (
            <p
              className={`text-sm ${
                status === 'success' ? 'text-green-600' : status === 'error' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-neutral">Why Choose KDP Creator Suite?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Convert PDFs to coloring books in minutes, not hours' },
              { icon: '✓', title: 'Compliance Validated', desc: 'Automatic KDP compliance checking saves you from rejections' },
              { icon: '🎨', title: 'AI-Powered', desc: 'Advanced algorithms ensure perfect results every time' },
              { icon: '📊', title: 'Analytics', desc: 'Track your publishing success with detailed insights' },
              { icon: '🔄', title: 'Batch Processing', desc: 'Process multiple books simultaneously' },
              { icon: '🚀', title: 'Direct Publishing', desc: 'Publish directly to Amazon KDP from our platform' },
            ].map((feature, idx) => (
              <div key={idx} className="p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <p className="text-4xl mb-4">{feature.icon}</p>
                <h3 className="text-xl font-bold mb-2 text-neutral">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="py-8 bg-gray-50">
        <GoogleAdsenseBanner slot="HOME_BANNER_SLOT" format="horizontal" />
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#E91E63] to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Publishing?</h2>
          <p className="text-xl opacity-90 mb-8">Join thousands of successful publishers using KDP Creator Suite</p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Native Ad */}
      <div className="py-8">
        <NativeAd />
      </div>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-neutral">Simple Pricing</h2>
          <p className="text-gray-700 mb-12">Choose the plan that fits your needs</p>
          <Link
            href="/pricing"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            View All Plans
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:text-gray-300">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-gray-300">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
                <li><a href="#" className="hover:text-gray-300">About</a></li>
                <li><a href="#" className="hover:text-gray-300">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-300">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-300">LinkedIn</a></li>
                <li><a href="#" className="hover:text-gray-300">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 KDP Creator Suite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

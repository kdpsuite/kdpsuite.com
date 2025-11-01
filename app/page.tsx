'use client';

import { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
        headers: {
          'Content-Type': 'application/json',
        },
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
            <a href="#pricing" className="text-neutral hover:text-primary transition-colors font-body">
              Pricing
            </a>
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
              <a href="#pricing" className="block text-neutral hover:text-primary transition-colors font-body">
                Pricing
              </a>
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
      <header className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse font-body">
              🚀 Launching Soon - Join the Waitlist
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-neutral font-heading">
            Best KDP Publishing Tools & Amazon KDP Software for Creators
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-body">
            The ultimate KDP publishing tools suite and professional Amazon KDP software for creators. Convert PDF to coloring book with AI-powered technology, ensure KDP compliance, and automate your publishing workflow. Our advanced KDP publishing tools are designed for professional creators who want to streamline their Amazon KDP publishing process.
          </p>

          {/* Email Capture Form */}
          <div className="max-w-xl mx-auto mt-12">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={status === 'loading'}
                className="flex-1 px-6 py-4 rounded-full border-2 border-gray-300 focus:border-primary focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md font-body"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap font-heading"
                aria-label="Join waitlist"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  'Get Early Access'
                )}
              </button>
            </form>

            {message && (
              <div
                className={`mt-4 p-4 rounded-2xl text-center font-medium transform transition-all duration-300 font-body ${
                  status === 'success'
                    ? 'bg-green-50 text-green-700 border-2 border-green-200'
                    : 'bg-red-50 text-red-700 border-2 border-red-200'
                } animate-slide-up`}
                role="alert"
              >
                {message}
              </div>
            )}

            <p className="text-sm text-gray-500 mt-4 font-body">
              Join 1,000+ creators waiting for early access. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </header>

      {/* Countdown Timer */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 font-heading">Indiegogo Campaign Launches In</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold font-heading">{timeLeft.days}</div>
              <div className="text-sm md:text-base font-body mt-2">Days</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold font-heading">{timeLeft.hours}</div>
              <div className="text-sm md:text-base font-body mt-2">Hours</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold font-heading">{timeLeft.minutes}</div>
              <div className="text-sm md:text-base font-body mt-2">Minutes</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold font-heading">{timeLeft.seconds}</div>
              <div className="text-sm md:text-base font-body mt-2">Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral mb-4 font-heading">
            Complete KDP Publishing Tools Suite for Amazon Success
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
            Professional-grade KDP publishing tools and Amazon KDP software designed specifically for creators. From PDF to coloring book conversion to full Amazon KDP publishing automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: '📚', title: 'PDF to Coloring Book Converter', desc: 'Advanced AI-powered PDF to coloring book conversion from any PDF or image to professional KDP-compliant coloring books with customizable line art and filters. Our PDF to coloring book tool is the fastest in the industry.' },
            { icon: '✅', title: 'KDP Compliance Validation', desc: 'Automatic validation of margins, bleed, trim sizes, and DPI requirements. Our KDP publishing tools ensure your books meet all Amazon KDP requirements. Never get rejected by Amazon again.' },
            { icon: '⚡', title: 'Batch Processing for KDP', desc: 'Process hundreds of images at once with real-time progress tracking. Our KDP publishing tools save hours of manual work with batch PDF to coloring book conversion.' },
            { icon: '🔗', title: 'Direct Amazon KDP Integration', desc: 'Seamlessly publish to Amazon KDP with automated workflow. Our Amazon KDP software integrates directly with your Amazon KDP account. From creation to publication in minutes.' },
            { icon: '📊', title: 'KDP Publishing Analytics', desc: 'Track your KDP publishing performance, revenue analytics, and conversion metrics in real-time dashboards. Monitor your Amazon KDP success with advanced analytics.' },
            { icon: '📱', title: 'Cross-Platform KDP Tools', desc: 'Work anywhere with mobile app, web dashboard, and cloud sync. Access your KDP publishing tools and Amazon KDP software from any device. Your projects always at your fingertips.' },
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-gray-50 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-neutral mb-3 font-heading">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed font-body">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral mb-4 font-heading">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 font-body">From hobbyists to professional studios</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Free', price: '$0', features: ['10 conversions/month', 'Basic KDP compliance', 'Community support'] },
              { name: 'Pro', price: '$29', features: ['Unlimited conversions', 'Advanced AI processing', 'Batch processing', 'Priority support'], popular: true },
              { name: 'Studio', price: '$99', features: ['Everything in Pro', 'Team collaboration', 'API access', 'Dedicated support'] },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl shadow-lg transition-all duration-300 ${
                  plan.popular
                    ? 'bg-primary text-white transform scale-105 border-4 border-primary'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="text-sm font-semibold mb-2 bg-white/20 rounded-full px-3 py-1 inline-block font-heading">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 font-heading ${plan.popular ? 'text-white' : 'text-neutral'}`}>
                  {plan.name}
                </h3>
                <div className={`text-4xl font-bold mb-6 font-heading ${plan.popular ? 'text-white' : 'text-neutral'}`}>
                  {plan.price}<span className={`text-lg ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>/mo</span>
                </div>
                <ul className={`space-y-3 mb-8 font-body ${plan.popular ? 'text-white' : 'text-gray-600'}`}>
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <span className={plan.popular ? 'text-white' : 'text-primary'}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Ready to Transform Your KDP Business with Professional KDP Publishing Tools?
          </h2>
          <p className="text-xl mb-8 opacity-90 font-body">
            Join thousands of creators who are waiting for early access to the most powerful Amazon KDP software and KDP publishing tools ever built. Our PDF to coloring book converter and complete KDP publishing tools suite will revolutionize your Amazon KDP publishing workflow.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-full text-neutral outline-none text-lg font-body"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-heading"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Image
              src="/unlovedproductions_logo.png"
              alt="Unloved Productions Logo"
              width={150}
              height={50}
              className="mx-auto mb-4"
            />
            <p className="text-sm text-gray-300 font-body">A product of Unloved Productions</p>
          </div>

          <div className="flex justify-center gap-6 text-sm mb-8 font-body">
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>

          <div className="text-center text-gray-400 text-sm font-body">
            <p>© 2025 KDP Creator Suite. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

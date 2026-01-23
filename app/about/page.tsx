'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-neutral hover:text-primary transition-colors font-body">
              Features
            </Link>
            <Link href="/about" className="text-primary font-semibold font-body">
              About
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
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
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
            <Link href="/about" className="block text-primary font-semibold font-body">
              About
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
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral mb-6 font-heading">
            About KDP Creator Suite
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-body">
            Built from nothing, with determination and a library WiFi connection
          </p>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-neutral mb-12 font-heading">
            The Founder&apos;s Story
          </h2>

          <div className="space-y-6 text-lg leading-relaxed font-body text-gray-700">
            <p>
              I built KDP Creator Suite over <strong className="text-primary">8 months using library WiFi while homeless</strong>. Zero budget. No cloud credits. No startup funding. Just me, a laptop, and a determination to solve a problem I lived every day.
            </p>

            <p>
              As a KDP creator, I was paying over <strong className="text-primary">$180/month</strong> for tools: Canva Pro, Book Bolt, Creative Fabrica, formatting software, royalty calculators. That&apos;s <strong className="text-primary">$2,160 per year</strong> just to publish coloring books and journals.
            </p>

            <p>
              I couldn&apos;t afford it. So I built something better.
            </p>

            <p>
              This platform consolidates everything you need into one place. AI coloring book conversion, 500+ templates, smart formatting, batch processing, royalty calculations—all the tools you&apos;re currently overpaying for, in a single platform.
            </p>

            <p>
              <strong className="text-primary">Now I&apos;m launching with lifetime founding memberships.</strong> Pay once during this campaign, use it forever. No recurring fees. No subscription treadmill. Just permanent access as a founding member.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container mx-auto px-4 py-20 bg-gray-50 rounded-3xl my-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-neutral mb-12 text-center font-heading">
            Our Vision
          </h2>

          <div className="space-y-6 text-lg leading-relaxed font-body text-gray-700">
            <p>
              KDP Creator Suite was built on the principle that creators shouldn&apos;t have to choose between affordability and power. Every tool in this platform is designed to:
            </p>

            <ul className="space-y-4 list-none">
              <li className="flex gap-4">
                <span className="text-2xl text-primary">🎯</span>
                <span><strong>Save you money:</strong> Replace multiple expensive subscriptions with one affordable platform</span>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl text-primary">⚡</span>
                <span><strong>Save you time:</strong> Automate repetitive tasks so you can focus on creating</span>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl text-primary">📈</span>
                <span><strong>Amplify your success:</strong> Give you the insights and tools professional publishers use</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Join the Founding Members
          </h2>
          <p className="text-xl mb-8 opacity-90 font-body">
            Be part of a movement to democratize KDP publishing tools. Get lifetime access at founding member prices.
          </p>
          <Link
            href="/#pricing"
            className="inline-block px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-heading"
          >
            See Founding Pricing
          </Link>
        </div>
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

          <div className="flex justify-center gap-6 text-sm mb-8 font-body flex-wrap">
            <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>

          <div className="text-center text-gray-400 text-sm font-body">
            <p>© 2025 KDP Creator Suite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

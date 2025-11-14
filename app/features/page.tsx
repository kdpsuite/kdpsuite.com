'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    { icon: '📚', title: 'PDF to Coloring Book Converter', desc: 'Advanced AI-powered pdf to coloring book conversion with our kdp conversion software. Convert any PDF or image to professional KDP-compliant coloring books with customizable line art and filters. Our pdf to coloring book tool is the fastest in the industry for digital book publishing.' },
    { icon: '✅', title: 'KDP Compliance Validation', desc: 'Automatic kdp compliance validation of margins, bleed, trim sizes, and DPI requirements. Our kdp publishing tools ensure your books meet all Amazon KDP requirements. Advanced validation for digital book publishing compliance.' },
    { icon: '⚡', title: 'Batch Image Processing', desc: 'Process hundreds of images at once with real-time progress tracking. Our batch image processing features save hours of manual work with automated kdp workflow and batch pdf to coloring book conversion.' },
    { icon: '🔗', title: 'Direct KDP Integration', desc: 'Seamless kdp integration with automated kdp workflow. Our Amazon KDP software integrates directly with your Amazon KDP account. Automated kdp workflow from creation to publication in minutes.' },
    { icon: '📊', title: 'KDP Analytics & Revenue Tracking', desc: 'Advanced kdp analytics with kdp revenue analytics and publishing performance metrics. Track your KDP publishing performance in real-time dashboards. Monitor your Amazon KDP success with kdp analytics and revenue tracking.' },
    { icon: '📱', title: 'Cross-Platform KDP Tools', desc: 'Access kdp publishing tools and Amazon KDP software from any device. Mobile app, web dashboard, and cloud sync for seamless automated kdp workflow. Your projects always at your fingertips.' },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      features: ['PDF to Coloring Book Converter', 'Basic KDP Compliance Validation', 'Up to 50 images/month', 'Email Support'],
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      features: ['Everything in Starter', 'Batch Image Processing', 'Unlimited images/month', 'KDP Analytics', 'Priority Support', 'Direct KDP Integration'],
      highlighted: true,
    },
    {
      name: 'Studio',
      price: '$199',
      period: '/month',
      features: ['Everything in Professional', 'Advanced KDP Revenue Analytics', 'Custom Workflows', 'API Access', 'Dedicated Account Manager', 'White-label Options'],
    },
  ];

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
            <Link href="/features" className="text-primary font-semibold font-body">
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
            <Link href="/features" className="block text-primary font-semibold font-body">
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
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral mb-6 font-heading">
            Complete Amazon KDP Software & KDP Publishing Tools Suite
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-body">
            Discover all the powerful features of our professional Amazon KDP software with advanced kdp publishing tools. Our AI-powered publishing tools include pdf to coloring book conversion, kdp compliance validation, batch image processing, kdp integration, kdp analytics, and kdp revenue analytics for digital book publishing and automated kdp workflow.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-gray-50 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-neutral mb-3 font-heading">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed font-body">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="container mx-auto px-4 py-20 bg-gray-50 rounded-3xl my-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-neutral mb-12 text-center font-heading">
            Amazon KDP Software Plans & Pricing
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 px-6 font-bold text-neutral font-heading">Feature</th>
                  <th className="text-center py-4 px-6 font-bold text-neutral font-heading">Starter</th>
                  <th className="text-center py-4 px-6 font-bold text-neutral font-heading">Professional</th>
                  <th className="text-center py-4 px-6 font-bold text-neutral font-heading">Studio</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 font-body">PDF to Coloring Book Converter</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 font-body">KDP Compliance Validation</td>
                  <td className="text-center py-4 px-6 font-body">Basic</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 font-body">Batch Image Processing</td>
                  <td className="text-center py-4 px-6 font-body">-</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 font-body">KDP Integration</td>
                  <td className="text-center py-4 px-6 font-body">-</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 font-body">KDP Analytics & Revenue Tracking</td>
                  <td className="text-center py-4 px-6 font-body">-</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-body">API Access</td>
                  <td className="text-center py-4 px-6 font-body">-</td>
                  <td className="text-center py-4 px-6 font-body">-</td>
                  <td className="text-center py-4 px-6 font-body">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-neutral mb-12 text-center font-heading">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-primary text-white shadow-2xl transform scale-105'
                  : 'bg-gray-50 border border-gray-200 shadow-lg hover:shadow-xl'
              }`}
            >
              <h3 className={`text-2xl font-bold mb-2 font-heading ${plan.highlighted ? 'text-white' : 'text-neutral'}`}>
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className={`text-4xl font-bold font-heading ${plan.highlighted ? 'text-white' : 'text-primary'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ml-2 ${plan.highlighted ? 'text-white text-opacity-80' : 'text-gray-600'}`}>
                  {plan.period}
                </span>
              </div>
              <ul className={`space-y-3 mb-8 font-body ${plan.highlighted ? 'text-white text-opacity-90' : 'text-gray-700'}`}>
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 font-heading ${
                  plan.highlighted
                    ? 'bg-white text-primary hover:bg-opacity-90'
                    : 'bg-primary text-white hover:bg-opacity-90'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Ready to Transform Your KDP Business with Amazon KDP Software?
          </h2>
          <p className="text-xl mb-8 opacity-90 font-body">
            Join thousands of creators using our professional kdp publishing tools and Amazon KDP software. Our AI-powered publishing tools include pdf to coloring book conversion, kdp compliance validation, batch image processing, kdp integration, kdp analytics, and kdp revenue analytics. Experience automated kdp workflow and publishing performance metrics with our self-publishing tools.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-heading"
          >
            Join Waitlist
          </Link>
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
            <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
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


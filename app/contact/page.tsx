'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMessage('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setResponseMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMessage('Network error. Please check your connection and try again.');
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
            <Link href="/contact" className="text-primary font-semibold font-body">
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
            <Link href="/blog" className="block text-neutral hover:text-primary transition-colors font-body">
              Blog
            </Link>
            <Link href="/#pricing" className="block text-neutral hover:text-primary transition-colors font-body">
              Pricing
            </Link>
            <Link href="/contact" className="block text-primary font-semibold font-body">
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

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral mb-4 font-heading">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 font-body">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-neutral mb-2 font-heading">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 text-lg font-body"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-neutral mb-2 font-heading">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 text-lg font-body"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-lg font-semibold text-neutral mb-2 font-heading">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                  className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 text-lg font-body"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-neutral mb-2 font-heading">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                  rows={6}
                  className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 text-lg font-body resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-heading"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Status Message */}
              {responseMessage && (
                <div
                  className={`p-4 rounded-lg text-center font-medium font-body ${
                    status === 'success'
                      ? 'bg-green-50 text-green-700 border-2 border-green-200'
                      : 'bg-red-50 text-red-700 border-2 border-red-200'
                  }`}
                  role="alert"
                >
                  {responseMessage}
                </div>
              )}
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-neutral mb-2 font-heading">Email</h3>
              <a href="mailto:contact.kdpcreatorsuite@gmail.com" className="text-primary hover:underline font-body text-lg">
                contact.kdpcreatorsuite@gmail.com
              </a>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-neutral mb-2 font-heading">Response Time</h3>
              <p className="text-gray-600 font-body">We typically respond within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral text-white py-12 mt-20">
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


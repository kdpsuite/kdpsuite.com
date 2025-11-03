'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FeaturesPage() {
  const features = [
    {
      icon: '📚',
      title: 'PDF to Coloring Book Converter',
      description: 'Advanced AI-powered PDF to coloring book conversion from any PDF or image to professional KDP-compliant coloring books with customizable line art and filters. Our PDF to coloring book tool is the fastest in the industry.',
      details: [
        'Automatic line detection and enhancement',
        'Customizable line thickness and darkness',
        'Support for color and black & white conversions',
        'Batch processing for multiple files',
        'High-resolution output (300 DPI)',
      ]
    },
    {
      icon: '✅',
      title: 'KDP Compliance Validation',
      description: 'Automatic validation of margins, bleed, trim sizes, and DPI requirements. Our KDP publishing tools ensure your books meet all Amazon KDP requirements. Never get rejected by Amazon again.',
      details: [
        'Real-time compliance checking',
        'Automatic margin correction',
        'Bleed and trim validation',
        'DPI and color space verification',
        'Detailed error reports with fixes',
      ]
    },
    {
      icon: '⚡',
      title: 'Batch Processing for KDP',
      description: 'Process hundreds of images at once with real-time progress tracking. Our KDP publishing tools save hours of manual work with batch PDF to coloring book conversion.',
      details: [
        'Process up to 1000 files simultaneously',
        'Real-time progress tracking',
        'Automatic error handling',
        'Batch export to multiple formats',
        'Scheduled batch processing',
      ]
    },
    {
      icon: '🔗',
      title: 'Direct Amazon KDP Integration',
      description: 'Seamlessly publish to Amazon KDP with automated workflow. Our Amazon KDP software integrates directly with your Amazon KDP account. From creation to publication in minutes.',
      details: [
        'One-click Amazon KDP publishing',
        'Automatic metadata population',
        'Direct account integration',
        'Pricing optimization suggestions',
        'Real-time publication status tracking',
      ]
    },
    {
      icon: '📊',
      title: 'KDP Publishing Analytics',
      description: 'Track your KDP publishing performance, revenue analytics, and conversion metrics in real-time dashboards. Monitor your Amazon KDP success with advanced analytics.',
      details: [
        'Real-time sales tracking',
        'Revenue analytics and forecasting',
        'Competitor price monitoring',
        'Keyword performance metrics',
        'Custom report generation',
      ]
    },
    {
      icon: '📱',
      title: 'Cross-Platform KDP Tools',
      description: 'Work anywhere with mobile app, web dashboard, and cloud sync. Access your KDP publishing tools and Amazon KDP software from any device. Your projects always at your fingertips.',
      details: [
        'iOS and Android mobile apps',
        'Web-based dashboard',
        'Real-time cloud synchronization',
        'Offline mode support',
        'Cross-device project sync',
      ]
    },
    {
      icon: '🎨',
      title: 'Advanced Image Processing',
      description: 'Professional-grade image processing tools for perfect coloring books. Enhance, adjust, and optimize your images for KDP publishing.',
      details: [
        'Contrast and brightness adjustment',
        'Noise reduction and smoothing',
        'Edge detection and enhancement',
        'Color to grayscale conversion',
        'Watermark and signature support',
      ]
    },
    {
      icon: '🔒',
      title: 'Secure Cloud Storage',
      description: 'Your projects are safely stored in our secure cloud infrastructure with automatic backups and version control.',
      details: [
        'Military-grade encryption',
        'Automatic daily backups',
        'Version history and rollback',
        'Unlimited storage (Pro plan)',
        'GDPR and CCPA compliant',
      ]
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Collaborate with team members in real-time. Share projects, assign tasks, and manage workflows efficiently.',
      details: [
        'Real-time collaborative editing',
        'User role management',
        'Project sharing and permissions',
        'Team activity logs',
        'Comment and feedback system',
      ]
    },
    {
      icon: '📚',
      title: 'Template Library',
      description: 'Access hundreds of professionally designed templates to jumpstart your coloring book projects.',
      details: [
        '500+ professional templates',
        'Customizable layouts',
        'Category-based organization',
        'Monthly new template additions',
        'User-created template sharing',
      ]
    },
    {
      icon: '🎯',
      title: 'Keyword Research & SEO',
      description: 'Built-in keyword research tools to optimize your book titles and descriptions for maximum Amazon visibility.',
      details: [
        'Amazon keyword research',
        'Search volume analysis',
        'Competition analysis',
        'SEO score calculation',
        'Title and description optimization',
      ]
    },
    {
      icon: '💡',
      title: 'AI-Powered Suggestions',
      description: 'Get intelligent recommendations for pricing, categories, keywords, and marketing strategies based on market data.',
      details: [
        'Pricing optimization',
        'Category recommendations',
        'Keyword suggestions',
        'Marketing strategy insights',
        'Trend analysis and predictions',
      ]
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
            <Link href="/#features" className="text-neutral hover:text-primary transition-colors font-body">
              Features
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
        </div>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-neutral mb-3 font-heading">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed font-body">
                {feature.description}
              </p>
              <ul className="space-y-2 mb-6">
                {feature.details.map((detail, didx) => (
                  <li key={didx} className="flex items-start gap-3 text-sm text-gray-700 font-body">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
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
                  <th className="text-left py-4 px-6 font-heading font-bold text-neutral">Feature</th>
                  <th className="text-center py-4 px-6 font-heading font-bold text-neutral">Free</th>
                  <th className="text-center py-4 px-6 font-heading font-bold text-primary">Pro</th>
                  <th className="text-center py-4 px-6 font-heading font-bold text-neutral">Studio</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Monthly Conversions', free: '10', pro: 'Unlimited', studio: 'Unlimited' },
                  { feature: 'PDF to Coloring Book', free: '✓', pro: '✓', studio: '✓' },
                  { feature: 'KDP Compliance Check', free: '✓', pro: '✓', studio: '✓' },
                  { feature: 'Batch Processing', free: '—', pro: '✓', studio: '✓' },
                  { feature: 'Amazon KDP Integration', free: '—', pro: '✓', studio: '✓' },
                  { feature: 'Analytics Dashboard', free: '—', pro: '✓', studio: '✓' },
                  { feature: 'Team Collaboration', free: '—', pro: '—', studio: '✓' },
                  { feature: 'API Access', free: '—', pro: '—', studio: '✓' },
                  { feature: 'Priority Support', free: '—', pro: '✓', studio: '✓' },
                  { feature: 'Custom Integrations', free: '—', pro: '—', studio: '✓' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-body text-neutral">{row.feature}</td>
                    <td className="text-center py-4 px-6 font-body text-gray-600">{row.free}</td>
                    <td className="text-center py-4 px-6 font-body text-primary font-semibold">{row.pro}</td>
                    <td className="text-center py-4 px-6 font-body text-neutral">{row.studio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 font-body">
            Join thousands of KDP creators using our professional KDP publishing tools and Amazon KDP software.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-heading"
            >
              Join Waitlist
            </Link>
            <a
              href="https://app.kdpsuite.com/login"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-300 font-heading"
            >
              Login to App
            </a>
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

          <div className="flex justify-center gap-6 text-sm mb-8 font-body">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
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


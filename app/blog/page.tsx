'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample blog posts - these would typically come from Supabase in production
const blogPosts = [
  {
    slug: 'kdp-formatting-guide',
    title: 'How to Format Your Book for KDP: A Beginner\'s Guide to Kindle eBooks and Paperbacks',
    excerpt: 'Learn how to format your book for Kindle eBooks and paperbacks with our comprehensive KDP formatting guide. Discover trim sizes, margins, fonts, and best practices for professional book formatting using KDP Creator Suite.',
    date: 'November 4, 2024',
    author: 'KDP Creator Suite',
    category: 'Formatting',
    readTime: '12 min read',
    image: '📖',
  },
  {
    slug: 'getting-started-kdp',
    title: 'Getting Started with KDP Publishing Tools: A Beginner\'s Guide',
    excerpt: 'Learn how to use our professional kdp publishing tools and Amazon KDP software to create your first coloring book. This comprehensive guide covers everything from pdf to coloring book conversion to kdp compliance validation.',
    date: 'November 1, 2024',
    author: 'KDP Creator Suite',
    category: 'Tutorial',
    readTime: '8 min read',
    image: '📚',
  },
  {
    slug: 'pdf-to-coloring-book-tips',
    title: 'Mastering PDF to Coloring Book Conversion with AI-Powered Publishing Tools',
    excerpt: 'Discover advanced techniques for converting your PDFs into stunning coloring books using our AI-powered pdf to coloring book converter. Learn about batch image processing and kdp conversion software best practices.',
    date: 'October 28, 2024',
    author: 'KDP Creator Suite',
    category: 'Tips & Tricks',
    readTime: '6 min read',
    image: '🎨',
  },
  {
    slug: 'kdp-compliance-validation',
    title: 'Complete Guide to KDP Compliance Validation and Amazon KDP Software Requirements',
    excerpt: 'Ensure your books meet all Amazon KDP requirements with our kdp compliance validation tools. Learn about margins, bleed, trim sizes, DPI requirements, and how our kdp publishing tools automate the validation process.',
    date: 'October 25, 2024',
    author: 'KDP Creator Suite',
    category: 'Compliance',
    readTime: '7 min read',
    image: '✅',
  },
  {
    slug: 'batch-processing-workflow',
    title: 'Automate Your Publishing Workflow with Batch Image Processing',
    excerpt: 'Save hours of manual work with our batch image processing features. Learn how to process hundreds of images at once and implement an automated kdp workflow for digital book publishing.',
    date: 'October 22, 2024',
    author: 'KDP Creator Suite',
    category: 'Workflow',
    readTime: '5 min read',
    image: '⚡',
  },
  {
    slug: 'kdp-analytics-revenue',
    title: 'Tracking Your Success: KDP Analytics and Revenue Analytics Guide',
    excerpt: 'Understand your publishing performance with advanced kdp analytics and kdp revenue analytics. Learn how to interpret publishing performance metrics and optimize your Amazon KDP strategy.',
    date: 'October 19, 2024',
    author: 'KDP Creator Suite',
    category: 'Analytics',
    readTime: '6 min read',
    image: '📊',
  },
  {
    slug: 'coloring-book-creator-tips',
    title: 'Pro Tips for Coloring Book Creators Using Amazon KDP Software',
    excerpt: 'Maximize your success as a coloring book creator with our professional kdp publishing tools. Learn insider tips for creating bestselling coloring books and leveraging kdp integration for seamless publishing.',
    date: 'October 16, 2024',
    author: 'KDP Creator Suite',
    category: 'Strategy',
    readTime: '7 min read',
    image: '🎯',
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

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
            <Link href="/blog" className="text-primary font-semibold font-body">
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
            KDP Creator Suite Blog
          </h1>
          <p className="text-xl opacity-90 font-body">
            Learn professional kdp publishing tools, Amazon KDP software tips, and digital book publishing strategies. Discover how to master pdf to coloring book conversion, kdp compliance validation, and automated kdp workflow.
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="container mx-auto px-4 py-20">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-neutral mb-6 font-heading">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-semibold transition-all font-body ${
                selectedCategory === null
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-neutral hover:bg-gray-200'
              }`}
            >
              All Posts
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all font-body ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-neutral hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="h-full rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                {/* Image/Icon */}
                <div className="h-48 bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center text-6xl">
                  {post.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-primary bg-pink-50 px-3 py-1 rounded-full font-body">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 font-body">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral mb-3 line-clamp-2 font-heading hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 font-body">
                    {post.excerpt}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500 font-body">{post.date}</span>
                    <span className="text-primary font-semibold text-sm hover:underline font-body">
                      Read More →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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

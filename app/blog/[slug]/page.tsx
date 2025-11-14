'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface BlogPost {
  title: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  content: string;
}

const blogPostsData: Record<string, BlogPost> = {
  'kdp-formatting-guide': {
    title: 'How to Format Your Book for KDP: A Beginner\'s Guide to Kindle eBooks and Paperbacks',
    date: 'November 4, 2024',
    author: 'KDP Creator Suite',
    category: 'Formatting',
    readTime: '12 min read',
    image: '📖',
    content: '<h2>What KDP Formatting Actually Means</h2><p>KDP formatting means setting up your manuscript so it displays properly on Kindle devices and apps (for eBooks) and prints cleanly when uploaded as a paperback. In other words, it\'s the cleanup and setup stage between your raw manuscript and a finished, bookstore-ready book.</p><p>There are two versions you\'ll likely create: eBook (text adjusts to the reader\'s screen size) and Paperback (fixed-size pages).</p><h2>Tools That Make Formatting Easy</h2><p>Here are the most beginner-friendly tools for formatting your book:</p><ul><li><strong>KDP Creator Suite</strong> – The all-in-one option for both Kindle and print. Templates, margin presets, TOC builder, and ready-to-upload exports. Visit www.kdpsuite.com</li><li><strong>Amazon Kindle Create</strong> – Free and simple for eBooks and paperbacks.</li><li><strong>Microsoft Word or Google Docs</strong> – Write and export your file as .docx for clean uploads.</li><li><strong>Vellum, Atticus, or Scrivener</strong> – Paid software made for self-publishing authors.</li><li><strong>InDesign or Affinity Publisher</strong> – For advanced layout work.</li></ul><p>Tip: If you\'re just starting out, use KDP Creator Suite or Kindle Create. They handle formatting rules automatically.</p><h2>How to Format Your eBook for Kindle</h2><p><strong>1. Stick to simple fonts and layout.</strong> Kindle uses default fonts, so just focus on clear formatting. Avoid fancy styles or text boxes.</p><p><strong>2. Set up paragraphs neatly.</strong> Use a font size between 11–13 pt. Add first-line indents (0.2–0.3 inch) in Paragraph Settings — never with spaces or tabs. Keep line spacing between 1.15–1.5 and don\'t use multiple blank lines.</p><p><strong>3. Use proper headings for chapters.</strong> Apply Heading 1 or Heading 2 instead of just bold text. This helps KDP automatically generate a Table of Contents.</p><p><strong>4. Add a clickable Table of Contents (TOC).</strong> In Word: go to References > Table of Contents > Automatic. Or let Kindle Create or KDP Creator Suite build it for you.</p><p><strong>5. Use real page breaks.</strong> Insert them with Ctrl (or Cmd) + Enter — not extra blank lines.</p><p><strong>6. Insert images correctly.</strong> Use JPG or PNG files at least 1000 pixels wide (2560 recommended for full-width). Always set them as "In line with text" to avoid shifting on Kindle.</p><p><strong>7. Include front and back matter.</strong> Include your title page, copyright, dedication, author bio, and acknowledgments. Skip page numbers — Kindle calculates "locations" automatically.</p><p><strong>8. Best file formats to upload.</strong> .docx or .kpf (from Kindle Create). KDP also accepts .epub but avoid .pdf for eBooks.</p><h2>How to Format Your Paperback</h2><p><strong>1. Choose a trim size early.</strong> Popular choices: 5" x 8" or 5.25" x 8" for novels, 6" x 9" for most books, 8.5" x 11" for workbooks.</p><p><strong>2. Set margins and gutter.</strong> Use roughly 0.75–1 inch outer margins. Gutter (inner margin near the spine) should be 0.375–0.5 inches for 150–300 pages.</p><p><strong>3. Decide on bleed or no bleed.</strong> "No bleed" means everything stays inside the margins — best for standard text books. "Bleed" is for artwork or background color that touches the page edge. Set bleed to 0.125" (3.2mm) on all sides.</p><p><strong>4. Pick readable print fonts.</strong> Garamond, Minion, Baskerville, or Palatino are excellent print choices. Font size: 10–12 pt. Embed fonts in your exported PDF.</p><p><strong>5. Add headings and page numbers.</strong> Use running headers and footers, but skip them on chapter opening pages. Front matter uses Roman numerals (i, ii, iii), while your main text uses regular numbers.</p><p><strong>6. Use high-quality images.</strong> 300 ppi at actual print size. Convert grayscale for black and white interiors.</p><p><strong>7. Export to a print-ready PDF.</strong> The PDF\'s page size must match your chosen trim size perfectly. Include bleed if used and embed all fonts.</p><h2>Designing Your Book Cover</h2><p>eBook cover: JPG/TIFF, at least 2560 x 1600 px, 1:1.6 aspect ratio. Paperback cover: Full-wrap PDF (including back, spine, and front) made using KDP\'s Cover Template. Keep all text away from trim edges and use 300 dpi resolution for printing. Avoid QR codes leading to other stores and ensure you have rights to all fonts and images used.</p><h2>Accepted File Types</h2><p>eBooks: DOCX, KPF (Kindle Create), or EPUB. Paperbacks: PDF (preferred) or DOCX. Covers: JPG, TIFF (for eBooks), or PDF (for paperbacks).</p><h2>Mistakes to Avoid</h2><ul><li>Using spaces or tabs to indent paragraphs</li><li>Uploading a PDF for an eBook</li><li>Low-resolution images</li><li>Missing or broken Table of Contents links</li><li>Forgetting to embed fonts in a print PDF</li><li>Wrong trim size or margins</li><li>Page numbers on chapter-opening pages</li><li>Oversized image files that raise Kindle delivery costs</li></ul><h2>Quick-Check Lists Before You Publish</h2><p><strong>eBook Checklist:</strong></p><ul><li>Clean .docx with proper headings</li><li>Linked TOC</li><li>Page breaks before each chapter</li><li>Inline images (JPG or PNG)</li><li>No headers, footers, or page numbers</li><li>Export to .docx, .epub, or .kpf</li><li>Test in Kindle Previewer</li></ul><p><strong>Paperback Checklist:</strong></p><ul><li>Set trim size and margins</li><li>Bleed/no-bleed chosen</li><li>Font 10–12 pt, indents 0.2–0.3"</li><li>Page numbers correct (Roman + Arabic)</li><li>Images 300 ppi, fonts embedded</li><li>Export print-ready PDF</li><li>Preview in KDP Print Previewer</li></ul><h2>Formatting by Genre</h2><p><strong>Novels:</strong> Indented paragraphs, no extra spacing, and chapters start on the right-hand page. <strong>Nonfiction:</strong> Block paragraphs or spacing between, clear subheadings, and lists. <strong>Children\'s Books:</strong> Usually fixed layout (may need specialized tools). <strong>Poetry:</strong> Keep line breaks exact; test on various screen sizes.</p><h2>Why Use KDP Creator Suite</h2><p>KDP Creator Suite helps you choose correct trim size and margins instantly, apply and reuse styles consistently, auto-generate Kindle-friendly TOCs, check image quality before uploading, export professionally formatted EPUB and print-ready PDFs, and preview your layout in Kindle and print views before you publish. Learn more or download at www.kdpsuite.com.</p><h2>Test Before Publishing</h2><p>Preview your book every time: Use Kindle Previewer (desktop or KDP online), test on phone, tablet, and e-ink devices, and for print versions, order a proof copy to check your margins, spine text, and paper quality.</p><h2>Final Thoughts</h2><p>Formatting can feel intimidating when you\'re new, but it\'s honestly a part of the creative process. It\'s what takes your manuscript from "just words" to a real book that readers will enjoy. Start simple. Keep your layout clean. Don\'t skip the preview step. A few careful tweaks now can make your book look every bit as professional as something from a major publisher. You\'ve already written the book — now let\'s make sure it looks the part, too.</p>',
  },
  'getting-started-kdp': {
    title: 'Getting Started with KDP Publishing Tools: A Beginner\'s Guide',
    date: 'November 1, 2024',
    author: 'KDP Creator Suite',
    category: 'Tutorial',
    readTime: '8 min read',
    image: '📚',
    content: '<h2>Introduction to Professional KDP Publishing Tools</h2><p>Welcome to the world of self-publishing with Amazon KDP software! Whether you\'re a seasoned author or just starting your publishing journey, our professional kdp publishing tools are designed to make the process seamless and efficient.</p>',
  },
  'pdf-to-coloring-book-tips': {
    title: 'Mastering PDF to Coloring Book Conversion with AI-Powered Publishing Tools',
    date: 'October 28, 2024',
    author: 'KDP Creator Suite',
    category: 'Tips & Tricks',
    readTime: '6 min read',
    image: '🎨',
    content: '<h2>The Art of PDF to Coloring Book Conversion</h2><p>Converting PDFs into stunning coloring books is an art and a science. Our AI-powered pdf to coloring book converter makes the process effortless.</p>',
  },
  'kdp-compliance-validation': {
    title: 'Complete Guide to KDP Compliance Validation and Amazon KDP Software Requirements',
    date: 'October 25, 2024',
    author: 'KDP Creator Suite',
    category: 'Compliance',
    readTime: '7 min read',
    image: '✅',
    content: '<h2>Understanding KDP Compliance Validation</h2><p>One of the most critical aspects of successful digital book publishing is ensuring your books meet Amazon KDP requirements.</p>',
  },
  'batch-processing-workflow': {
    title: 'Automate Your Publishing Workflow with Batch Image Processing',
    date: 'October 22, 2024',
    author: 'KDP Creator Suite',
    category: 'Workflow',
    readTime: '5 min read',
    image: '⚡',
    content: '<h2>The Power of Batch Image Processing</h2><p>One of the most time-consuming aspects of digital book publishing is processing multiple images.</p>',
  },
  'kdp-analytics-revenue': {
    title: 'Tracking Your Success: KDP Analytics and Revenue Analytics Guide',
    date: 'October 19, 2024',
    author: 'KDP Creator Suite',
    category: 'Analytics',
    readTime: '6 min read',
    image: '📊',
    content: '<h2>Understanding KDP Analytics</h2><p>To succeed in digital book publishing, you need to understand your publishing performance metrics.</p>',
  },
  'coloring-book-creator-tips': {
    title: 'Pro Tips for Coloring Book Creators Using Amazon KDP Software',
    date: 'October 16, 2024',
    author: 'KDP Creator Suite',
    category: 'Strategy',
    readTime: '7 min read',
    image: '🎯',
    content: '<h2>Becoming a Successful Coloring Book Creator</h2><p>The coloring book market on Amazon KDP is booming with our professional kdp publishing tools.</p>',
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPostsData[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-neutral flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-heading">Post Not Found</h1>
          <p className="text-gray-600 mb-8 font-body">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog" className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-opacity-90 transition-all font-body">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full font-body">
              {post.category}
            </span>
            <span className="text-sm text-white text-opacity-80 font-body">{post.readTime}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">{post.title}</h1>
          <div className="flex items-center gap-4 text-white text-opacity-90">
            <span className="font-body">{post.author}</span>
            <span className="text-opacity-60">•</span>
            <span className="font-body">{post.date}</span>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <div
          className="prose prose-lg max-w-none text-neutral font-body"
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/<h2>/g, '<h2 class="text-3xl font-bold text-neutral mt-8 mb-4 font-heading">')
              .replace(/<h3>/g, '<h3 class="text-2xl font-bold text-neutral mt-6 mb-3 font-heading">')
              .replace(/<p>/g, '<p class="text-lg text-gray-700 mb-4 leading-relaxed">')
              .replace(/<ul>/g, '<ul class="list-disc list-inside mb-4 space-y-2">')
              .replace(/<li>/g, '<li class="text-lg text-gray-700">')
              .replace(/<strong>/g, '<strong class="font-bold text-neutral">')
          }}
        />
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
          </div>

          <div className="text-center text-gray-400 text-sm font-body">
            <p>© 2025 KDP Creator Suite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

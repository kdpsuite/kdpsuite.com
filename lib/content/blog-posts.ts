export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  category: string;
  readTime: string;
  imageEmoji: string;
  keywords: string[];
  author: {
    name: string;
    role: string;
    bio: string;
  };
  faq: BlogFaqItem[];
  contentHtml: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "all-in-one-publishing-platform",
    title: "All-in-One KDP Publishing Platform: What It Is and How It Saves Time",
    description:
      "A practical guide to using one KDP publishing platform instead of stitching together multiple tools for formatting, compliance, conversion, and analytics.",
    excerpt:
      "KDP Creator Suite is an all-in-one publishing platform that combines formatting, compliance checks, conversion, and performance tracking in one workflow.",
    datePublished: "2024-11-11",
    dateModified: "2026-07-12",
    category: "Guide",
    readTime: "11 min read",
    imageEmoji: "📚",
    keywords: [
      "all in one publishing platform",
      "kdp publishing tools",
      "amazon kdp software",
      "kdp workflow",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Product and Publishing Research",
      bio: "The KDP Creator Suite editorial team publishes implementation guides based on day-to-day self-publishing workflows and product usage data.",
    },
    faq: [
      {
        question: "What is an all-in-one publishing platform for KDP?",
        answer:
          "It is one software workspace that combines formatting, compliance checks, conversion, and publishing workflows without forcing you to switch between multiple tools.",
      },
      {
        question: "When does an all-in-one platform save the most time?",
        answer:
          "It saves the most time when you publish repeatedly, manage multiple titles, or collaborate with contributors because approvals and exports stay in one system.",
      },
      {
        question: "Should beginners use one platform or many tools?",
        answer:
          "Most beginners move faster with one platform because there are fewer settings, fewer export errors, and fewer opportunities to lose files.",
      },
    ],
    contentHtml:
      "<p><strong>An all-in-one publishing platform for KDP is a single workflow that handles formatting, validation, conversion, and release steps in one place.</strong> For most independent creators, this reduces tool switching and lowers the chance of rejection-causing file mistakes. The tradeoff is that you choose a tighter workflow instead of maximum customization from separate apps.</p><h2>Why creators move away from multi-tool stacks</h2><p>Using separate apps for covers, interiors, quality checks, and analytics sounds flexible, but it creates handoff errors. Files are exported and re-imported repeatedly, naming conventions drift, and version control becomes manual. If your goal is consistent weekly publishing, the stack itself becomes friction.</p><h2>How to evaluate if you need one platform</h2><ol><li><strong>List your current workflow:</strong> document where each file is created, exported, reviewed, and published.</li><li><strong>Measure handoffs:</strong> count each app switch or export step for one title.</li><li><strong>Track rework:</strong> identify where KDP issues were caused by formatting or image specs.</li><li><strong>Price your stack:</strong> total monthly tooling cost plus the hours spent fixing avoidable issues.</li><li><strong>Pilot one title:</strong> run one full project inside one platform and compare cycle time.</li></ol><h2>What to look for in an all-in-one KDP workflow</h2><ul><li>Template and trim-size presets for repeatable setups</li><li>Built-in compliance checks for margins, bleed, and image readiness</li><li>Batch actions for repetitive asset processing</li><li>One place to review performance and royalty trends</li></ul><h2>Single-platform vs multi-tool setup</h2><table><thead><tr><th>Area</th><th>Multi-tool stack</th><th>All-in-one workflow</th></tr></thead><tbody><tr><td>Setup time</td><td>High on every title</td><td>Lower after first template</td></tr><tr><td>Error surface</td><td>Many export/import points</td><td>Fewer handoffs</td></tr><tr><td>Cost control</td><td>Several subscriptions</td><td>Single predictable plan</td></tr><tr><td>Team onboarding</td><td>Train on many interfaces</td><td>One shared workspace</td></tr></tbody></table><h2>FAQ</h2><h3>Can one platform replace every specialist tool?</h3><p>Not always. If you rely on niche design or layout requirements, you may keep one specialized tool. For most low-content and standard book workflows, one platform covers the majority of tasks.</p><h3>Is this approach only for advanced publishers?</h3><p>No. Beginners often benefit more because they avoid complex setup choices and can focus on execution quality.</p><h2>Bottom line</h2><p>If your publishing bottleneck is operational friction, an all-in-one KDP workflow is usually the fastest way to improve throughput while reducing avoidable compliance errors.</p>",
  },
  {
    slug: "kdp-formatting-guide",
    title: "KDP Formatting Guide: Steps for eBook and Paperback Files",
    description:
      "A clear KDP formatting checklist for Kindle eBooks and paperbacks, including trim size, margins, image specs, table of contents, and final validation.",
    excerpt:
      "KDP formatting is the process of preparing files so Kindle renders them correctly and print editions meet trim, bleed, and margin requirements.",
    datePublished: "2024-11-04",
    dateModified: "2026-08-21",
    category: "Formatting",
    readTime: "12 min read",
    imageEmoji: "📖",
    keywords: [
      "kdp formatting guide",
      "how to format book for kdp",
      "kindle formatting",
      "paperback trim size",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Formatting and Production",
      bio: "The team documents practical formatting standards used by independent KDP publishers for both Kindle and print-ready interiors.",
    },
    faq: [
      {
        question: "What is the safest file type for Kindle uploads?",
        answer:
          "A clean DOCX or EPUB with proper heading structure is usually the safest starting point for Kindle eBook conversion.",
      },
      {
        question: "What causes the most paperback formatting rejections?",
        answer:
          "Incorrect trim-size setup, weak margin/gutter configuration, and low-resolution print images are the most common causes.",
      },
      {
        question: "Do I need different files for eBook and paperback?",
        answer:
          "Yes. Kindle files are reflowable, while paperback files require fixed dimensions and print-specific settings.",
      },
    ],
    contentHtml:
      "<p><strong>KDP formatting means preparing your manuscript so Kindle displays it correctly and paperback files print with the right trim, margins, and bleed.</strong> If you treat eBook and print as separate outputs from the start, you avoid most upload errors.</p><h2>Step-by-step formatting workflow</h2><ol><li><strong>Choose your output types:</strong> decide if you will ship Kindle only, print only, or both.</li><li><strong>Build semantic structure:</strong> apply heading styles for chapter titles and subheads before visual styling.</li><li><strong>Set paragraph rules once:</strong> use paragraph settings (not tabs or repeated spaces) for indents and spacing.</li><li><strong>Insert real page breaks:</strong> each chapter should start with an actual page break.</li><li><strong>Prepare images:</strong> use high-quality JPG/PNG assets and keep print images at 300 PPI.</li><li><strong>Create a linked TOC:</strong> ensure table-of-contents links resolve correctly in preview.</li><li><strong>Export and validate:</strong> preview in Kindle and print contexts before publishing.</li></ol><h2>eBook formatting essentials</h2><ul><li>Prefer clean DOCX or EPUB sources.</li><li>Use heading styles for automatic TOC generation.</li><li>Avoid fixed-width layout tricks that break on smaller devices.</li><li>Keep front matter clear and concise.</li></ul><h2>Paperback formatting essentials</h2><ul><li>Select trim size before final layout.</li><li>Configure outer margins and gutter according to page count.</li><li>Choose bleed only when graphics run to the page edge. With bleed, set the PDF page size to trim plus 0.125&quot; on the width and 0.25&quot; on the height (a 6&quot; × 9&quot; trim becomes 6.125&quot; × 9.25&quot;).</li><li>Embed fonts and export a print-ready PDF at those final dimensions.</li></ul><h2>Common rejection patterns</h2><table><thead><tr><th>Issue</th><th>Why it fails</th><th>Fast fix</th></tr></thead><tbody><tr><td>Missing gutter room</td><td>Inner text collides with spine</td><td>Increase gutter and re-export PDF</td></tr><tr><td>Low-resolution interior images</td><td>Print quality degrades visibly</td><td>Replace assets with 300 PPI originals</td></tr><tr><td>Broken TOC links</td><td>Navigation fails in Kindle</td><td>Rebuild TOC from heading styles</td></tr></tbody></table><h2>FAQ</h2><h3>Can I upload one PDF for both Kindle and print?</h3><p>For most projects, no. Kindle reads best from reflowable sources, while print needs fixed-size output.</p><h3>What should I validate before final upload?</h3><p>Check heading structure, TOC links, image quality, margin/gutter, and final trim-size dimensions.</p><h2>Bottom line</h2><p>A repeatable formatting checklist removes guesswork and cuts rejection cycles. Start structured, preview early, and keep eBook and print outputs separate.</p>",
  },
  {
    slug: "kdp-royalty-calculator-guide",
    title: "KDP Royalty Calculator Guide: Price, Printing Cost, and Profit",
    description:
      "Learn how to estimate Kindle and paperback royalties with a simple calculator workflow and margin targets before publishing.",
    excerpt:
      "A KDP royalty calculator helps you test pricing scenarios before launch so you can set profitable list prices and avoid margin surprises.",
    datePublished: "2026-07-12",
    dateModified: "2026-08-21",
    category: "Analytics",
    readTime: "9 min read",
    imageEmoji: "💰",
    keywords: [
      "kdp royalty calculator",
      "kdp profit calculator",
      "kdp pricing strategy",
      "paperback royalty estimate",
      "kdp 50 percent royalty",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Pricing and Analytics",
      bio: "The team publishes pricing frameworks and calculator workflows to help KDP creators make launch decisions using clear margin targets.",
    },
    faq: [
      {
        question: "Why use a royalty calculator before launch?",
        answer:
          "It lets you test prices against expected costs before publishing so you can avoid listing books that have weak or negative margins.",
      },
      {
        question: "Should I optimize for maximum royalty per unit?",
        answer:
          "Usually no. Balance unit profit against conversion. For print, also model the $9.99 cliff: list prices below $9.99 USD earn 50%, while $9.99 and above earn 60%, so $10.99 can beat $8.99 even at similar volume.",
      },
      {
        question: "How often should I re-check pricing?",
        answer:
          "Re-check after major cost changes, format changes, or when your conversion trend shifts over several weeks.",
      },
    ],
    contentHtml:
      "<p><strong>A KDP royalty calculator is a planning tool that estimates per-sale earnings from list price and production costs before you publish.</strong> It helps you choose a price band that can support ads, promotions, and long-term margin targets.</p><h2>What to calculate before setting price</h2><ul><li>List price and target format (Kindle or paperback)</li><li>Estimated printing or delivery cost assumptions</li><li>Expected royalty rate model for your format</li><li>Minimum profit per sale needed for your business model</li></ul><h2>The June 2025 print royalty cliff</h2><p>Since June 10, 2025, KDP print royalties are 50% when the list price is below $9.99 USD, and 60% at $9.99 and above. The same split applies at other marketplace floors: €9.99, £7.99, CAD $13.99, AUD $13.99, 110 SEK, 40 PLN, and 1000 JPY. If you edit book details or content after that date, KDP can force the new minimum list price. Sub-$9.99 journals and coloring books that looked healthy at 60% now earn less per unit.</p><h2>Five-step pricing workflow</h2><ol><li><strong>Define a floor price:</strong> set the lowest price that still keeps a positive margin at the 50% rate if you list below $9.99.</li><li><strong>Model three scenarios:</strong> conservative, baseline, and a price at or above the 60% floor.</li><li><strong>Estimate profit per sale:</strong> compute expected royalty minus print cost.</li><li><strong>Stress-test promotion pricing:</strong> verify discount prices remain viable at the rate that actually applies.</li><li><strong>Review monthly:</strong> update assumptions when costs or conversion trends change.</li></ol><h2>Simple scenario table</h2><p>Print royalty = (rate × list price) − print cost. Example uses a $2.40 print cost on Amazon.com.</p><table><thead><tr><th>Scenario</th><th>List price</th><th>Rate</th><th>Estimated cost</th><th>Estimated royalty</th><th>Margin signal</th></tr></thead><tbody><tr><td>Conservative</td><td>$6.99</td><td>50%</td><td>$2.40</td><td>$1.10</td><td>Thin</td></tr><tr><td>Baseline</td><td>$8.99</td><td>50%</td><td>$2.40</td><td>$2.10</td><td>Thin</td></tr><tr><td>Premium</td><td>$10.99</td><td>60%</td><td>$2.40</td><td>$4.19</td><td>Healthy if conversion holds</td></tr></tbody></table><h2>FAQ</h2><h3>Can I use one pricing rule for every book?</h3><p>No. Niche demand, page count, and format differences change what buyers accept and what margin is realistic. Print titles also need a separate check against the $9.99 royalty floor.</p><h3>How does this help with ad spend?</h3><p>A tested margin target tells you how much you can spend to acquire one sale without running negative unit economics.</p><h2>Bottom line</h2><p>Use a royalty calculator before launch and during optimization cycles. Price across the $9.99 print cliff, not just inside one rate band.</p>",
  },
  {
    slug: "kdp-compliance-requirements",
    title: "KDP Compliance Requirements: What Amazon Checks Before Publishing",
    description:
      "A practical checklist of KDP compliance requirements for Kindle eBooks and paperbacks, covering file specs, metadata, content policies, and pre-upload validation.",
    excerpt:
      "KDP compliance requirements are the file, metadata, and content standards Amazon validates before a title goes live on Kindle or KDP Print.",
    datePublished: "2026-08-15",
    dateModified: "2026-08-21",
    category: "Compliance",
    readTime: "10 min read",
    imageEmoji: "✅",
    keywords: [
      "kdp compliance requirements",
      "kdp file requirements",
      "amazon kdp upload checklist",
      "kdp print specifications",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Compliance and Production",
      bio: "The team documents KDP upload standards and common rejection patterns based on independent publishing workflows.",
    },
    faq: [
      {
        question: "What are KDP compliance requirements?",
        answer:
          "They are the file format, dimension, metadata, and content policy standards Amazon checks before publishing a Kindle eBook or paperback.",
      },
      {
        question: "What causes the most KDP compliance rejections?",
        answer:
          "Incorrect trim size or margins, low-resolution print images, broken table-of-contents links, and metadata mismatches are the most common causes.",
      },
      {
        question: "Do eBook and paperback have different compliance rules?",
        answer:
          "Yes. eBooks use reflowable formats with heading structure and TOC requirements. Paperbacks require fixed trim size, margins, gutter, bleed, and print-ready PDF output.",
      },
    ],
    contentHtml:
      "<p><strong>KDP compliance requirements are the file, metadata, and content standards Amazon validates before a title goes live.</strong> Meeting them before upload reduces rejection cycles and keeps your publishing schedule on track. eBook and paperback each have distinct rules—treat them as separate outputs from the start.</p><h2>Core compliance areas</h2><ul><li><strong>File format:</strong> DOCX or EPUB for Kindle; print-ready PDF for paperback.</li><li><strong>Dimensions:</strong> correct trim size, margins, gutter, and bleed for print.</li><li><strong>Image quality:</strong> 300 DPI at final print size for interior images.</li><li><strong>Metadata:</strong> accurate title, author, description, categories, and keywords.</li><li><strong>Content policy:</strong> no prohibited content, misleading metadata, or duplicate listings.</li><li><strong>AI disclosure:</strong> tell KDP if text, images, or translations were AI-generated. AI-assisted edits do not require disclosure.</li><li><strong>Low-content checkbox:</strong> select it only for notebooks, planners, journals, and similar fill-in books. Coloring and puzzle books are generally not low-content; the wrong box is a rejection.</li></ul><h2>Pre-upload compliance checklist</h2><ol><li><strong>Confirm trim size:</strong> verify interior PDF dimensions match a supported KDP trim size.</li><li><strong>Check margins and gutter:</strong> increase gutter for higher page counts so text stays readable near the spine.</li><li><strong>Validate images:</strong> replace low-resolution assets before export.</li><li><strong>Test TOC links:</strong> preview navigation in Kindle Previewer or KDP preview tools.</li><li><strong>Review metadata:</strong> ensure title, subtitle, and description match the book content.</li><li><strong>Disclose AI-generated content:</strong> check the AI box when the text, images, or translations were created by an AI tool, including converter output.</li><li><strong>Confirm the low-content category:</strong> match the checkbox to Amazon's definition, not to marketing shorthand.</li><li><strong>Run a final preview:</strong> inspect every page in KDP's online previewer before submitting.</li></ol><h2>eBook vs paperback requirements</h2><table><thead><tr><th>Area</th><th>Kindle eBook</th><th>Paperback</th></tr></thead><tbody><tr><td>Layout</td><td>Reflowable (adapts to screen)</td><td>Fixed page geometry</td></tr><tr><td>File type</td><td>DOCX or EPUB</td><td>Print-ready PDF</td></tr><tr><td>Trim size</td><td>Not applicable</td><td>Must match selected KDP size</td></tr><tr><td>Bleed</td><td>Not applicable</td><td>Required when art extends to edge</td></tr><tr><td>Cover</td><td>JPG meeting minimum dimensions</td><td>Full wrap PDF with spine</td></tr></tbody></table><h2>FAQ</h2><h3>Can I fix compliance issues after publishing?</h3><p>Yes, but fixing live titles pauses sales during re-review. Pre-upload validation is faster and avoids customer-facing errors.</p><h3>Does KDP check content quality?</h3><p>KDP validates technical file specs and content policy. Reader experience quality—layout, readability, and design—is your responsibility.</p><h2>Bottom line</h2><p>Build compliance checks into your workflow before export, not after upload. A repeatable checklist cuts rejection cycles and keeps publishing predictable.</p>",
  },
  {
    slug: "low-content-book-creator-workflow",
    title: "Low Content Book Creator Workflow: From Idea to Published Title",
    description:
      "A step-by-step low content book creator workflow covering niche selection, interior layout, cover design, KDP upload, and post-launch optimization.",
    excerpt:
      "A low content book creator workflow is a repeatable process for designing, formatting, and publishing journals, planners, and activity books on KDP.",
    datePublished: "2026-08-15",
    dateModified: "2026-08-21",
    category: "Workflow",
    readTime: "11 min read",
    imageEmoji: "📓",
    keywords: [
      "low content book creator",
      "low content book workflow",
      "kdp journal publishing",
      "planner book kdp",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Low-Content Publishing",
      bio: "The team publishes workflow guides for independent creators publishing journals, planners, and activity books on Amazon KDP.",
    },
    faq: [
      {
        question: "What is a low content book creator workflow?",
        answer:
          "It is a repeatable process for designing interiors, applying covers, validating print specs, and publishing low-content titles like journals and planners on KDP.",
      },
      {
        question: "What trim sizes work best for low content books?",
        answer:
          "6x9 and 8.5x11 are common choices. Journals often use 6x9; workbooks and planners frequently use 8.5x11 for more writing space.",
      },
      {
        question: "How do I scale a low content publishing workflow?",
        answer:
          "Use reusable interior templates, batch cover generation, and a consistent compliance checklist so each new title reuses proven layout settings.",
      },
    ],
    contentHtml:
      "<p><strong>A low content book creator workflow is a repeatable process for designing, formatting, and publishing journals, planners, and similar fill-in books on KDP.</strong> The goal is to reduce per-title setup time while keeping print quality and compliance consistent across a catalog.</p><h2>What counts as low content</h2><p>Amazon defines low-content as interiors with minimal or repetitive fill-in pages. Coloring books, puzzle books, and most activity books are <strong>not</strong> low-content. Checking the wrong box is a rejection.</p><ul><li>Low-content: notebooks, planners, diaries and journals, prompt journals, log books</li><li>Not low-content: coloring books, puzzle books, and other activity books with unique pages</li></ul><p>Low-content titles cannot use Expanded Distribution, cannot join a series, and do not get a Look Inside sample or back-cover thumbnail when published without an ISBN.</p><h2>Step-by-step creator workflow</h2><ol><li><strong>Choose a niche:</strong> pick an audience with clear search intent and manageable competition.</li><li><strong>Select trim size:</strong> decide between 6x9 (portable) or 8.5x11 (spacious) before layout.</li><li><strong>Build an interior template:</strong> create a reusable page grid with correct margins and gutter.</li><li><strong>Design the cover:</strong> include front, spine, and back in a print-ready wrap at the correct dimensions.</li><li><strong>Validate compliance:</strong> check trim size, bleed, margins, image resolution, and the low-content checkbox before export.</li><li><strong>Upload to KDP:</strong> set metadata, categories, keywords, and pricing for the target format.</li><li><strong>Preview and publish:</strong> inspect every page in KDP's previewer, then submit for review.</li><li><strong>Track and iterate:</strong> monitor sales and reviews, then refine templates for the next title.</li></ol><h2>Workflow comparison: first title vs scaled catalog</h2><table><thead><tr><th>Stage</th><th>First title</th><th>Scaled workflow</th></tr></thead><tbody><tr><td>Niche research</td><td>Manual, exploratory</td><td>Repeatable criteria checklist</td></tr><tr><td>Interior design</td><td>Built from scratch</td><td>Cloned from proven template</td></tr><tr><td>Compliance</td><td>Learned through trial</td><td>Automated validation step</td></tr><tr><td>Time per title</td><td>Days to weeks</td><td>Hours with templates</td></tr></tbody></table><h2>FAQ</h2><h3>Do low content books need an ISBN?</h3><p>Low-content books are not eligible for the free KDP ISBN. Use your own ISBN, or publish without one. The free KDP ISBN is only for titles that are not classified as low-content.</p><h3>Should I publish Kindle and paperback together?</h3><p>Many low-content creators focus on paperback first since the physical product is the primary value. Add Kindle later if a digital version makes sense for your niche.</p><h2>Bottom line</h2><p>Low content publishing scales when you invest in templates and compliance checks upfront. Each new title should reuse proven layout settings instead of starting from zero.</p>",
  },
  {
    slug: "kdp-coloring-book-low-content",
    title: "Coloring Books Are Not Low-Content on KDP (The Checkbox Was Not Retired)",
    description:
      "Amazon KDP still requires the low-content checkbox for journals and planners, but coloring and puzzle books are generally not low-content. Wrong classification causes rejection and changes ISBN, series, and review rules.",
    excerpt:
      "Coloring books on KDP are generally not low-content. Checking the low-content box on a coloring title can get it rejected and blocks the free ISBN, series enrollment, and Look Inside.",
    datePublished: "2026-08-28",
    dateModified: "2026-08-28",
    category: "Compliance",
    readTime: "10 min read",
    imageEmoji: "🎨",
    keywords: [
      "kdp coloring book low content",
      "is a coloring book low content kdp",
      "kdp low content checkbox",
      "coloring book kdp classification",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Compliance and Production",
      bio: "The team documents KDP classification rules and common rejection patterns for coloring and activity book publishers.",
    },
    faq: [
      {
        question: "Is a coloring book low content on KDP?",
        answer:
          "Generally no. Amazon Help states that activity books such as puzzle books and coloring books do not typically feature the repetitive fill-in pages that define low-content books.",
      },
      {
        question: "Did KDP retire the low-content checkbox in 2023?",
        answer:
          "No. Amazon Help still requires publishers to check the Low-content box when uploading notebooks, planners, and similar titles. Some third-party FAQs claim the box was retired; that is incorrect as of August 2026.",
      },
      {
        question: "What happens if I check low-content on a coloring book?",
        answer:
          "Amazon can reject the title for category mismatch. Even if it passes, you lose access to the free KDP ISBN, series enrollment, Expanded Distribution, and Look Inside samples that apply differently to low-content rules.",
      },
    ],
    contentHtml:
      "<p><strong>On Amazon KDP, a coloring book is generally not a low-content book.</strong> Low-content titles are repetitive fill-in interiors like notebooks and planners. Coloring books have unique pages on every spread, so they belong outside the low-content category. Checking the wrong box still causes rejections—and some popular third-party guides falsely claim KDP retired the checkbox in 2023. Amazon Help reviewed August 2026 still requires it for true low-content uploads.</p><h2>How Amazon splits the categories</h2><p>Amazon defines low-content as minimal or repetitive interiors designed to be filled in by the reader. It explicitly excludes activity books:</p><ul><li><strong>Low-content:</strong> notebooks, planners, diaries and journals, prompt journals, log books</li><li><strong>Not generally low-content:</strong> novels, puzzle books, coloring books, photography, children's books</li></ul><p>Under Categories you must check the Low-content box for eligible titles. If you do not select it—or select a different box—your book can be rejected.</p><h2>Why the wrong box breaks more than metadata</h2><table><thead><tr><th>Rule</th><th>True low-content</th><th>Coloring book (not low-content)</th></tr></thead><tbody><tr><td>Free KDP ISBN</td><td>Not eligible</td><td>Eligible if otherwise qualified</td></tr><tr><td>Series enrollment</td><td>Not eligible</td><td>Eligible</td></tr><tr><td>Expanded Distribution</td><td>Not supported</td><td>Coloring is banned from ED anyway (see our ED guide)</td></tr><tr><td>Look Inside / back-cover thumbnail without ISBN</td><td>Not supported</td><td>Standard rules apply</td></tr><tr><td>Review timeline</td><td>Up to 10 business days</td><td>Standard paperback timeline</td></tr></tbody></table><h2>Five-step classification workflow</h2><ol><li><strong>Read the interior:</strong> if every page is a unique illustration or puzzle, it is not low-content.</li><li><strong>Match Amazon's list:</strong> compare against Help categories, not marketing blog shorthand.</li><li><strong>Leave the box unchecked</strong> for coloring, puzzle, and activity books.</li><li><strong>Check metadata:</strong> title and description should say coloring book or activity book, not journal or planner.</li><li><strong>Preview before submit:</strong> wrong classification is easier to fix pre-upload than after Human Review.</li></ol><h2>Do not trust the “checkbox retired” FAQ</h2><p>Some SEO sites claim KDP removed the low-content checkbox in 2023. Amazon Help still documents the box and the rejection rule for mismatches. Kindlepreneur's general low-content article (updated December 2025) includes a bullet that coloring books are not low-content, but its standalone coloring marketing guide never walks through classification. BookBolt still markets activity books alongside low-content niches. Your safest source is Amazon Help, not a recycled FAQ.</p><h2>FAQ</h2><h3>Can I publish a coloring book as low-content to get faster review?</h3><p>No. Misclassification is a policy issue, not a shortcut. Coloring books follow standard review rules when classified correctly.</p><h3>Where does this differ from our low-content workflow guide?</h3><p>Our <a href=\"/blog/low-content-book-creator-workflow\">low-content workflow</a> covers journals and planners. This article is the dedicated classification guide for coloring and activity books.</p><h2>Bottom line</h2><p>Classify coloring books as activity titles, not low-content. Use templates built for unique-page interiors and validate category settings before every upload.</p>",
  },
  {
    slug: "kdp-expanded-distribution-coloring-book",
    title: "KDP Expanded Distribution Will Not Take Coloring Books, Journals, or Heavy-Ink Interiors",
    description:
      "Amazon KDP Expanded Distribution excludes coloring books, lined journals, high-ink interiors, and all hardcovers. Plan Amazon-only pricing instead of bookstore distribution.",
    excerpt:
      "Expanded Distribution on KDP refuses coloring books, frequent lined or blank pages, interiors that need heavy ink coverage, and every hardcover format—regardless of trim size eligibility elsewhere.",
    datePublished: "2026-08-28",
    dateModified: "2026-08-28",
    category: "Compliance",
    readTime: "9 min read",
    imageEmoji: "🚫",
    keywords: [
      "kdp expanded distribution coloring book",
      "kdp expanded distribution high ink",
      "kdp expanded distribution journal",
      "kdp expanded distribution eligibility",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Distribution and Pricing",
      bio: "The team publishes distribution and royalty guides so KDP creators price for the channels Amazon actually supports.",
    },
    faq: [
      {
        question: "Can coloring books use KDP Expanded Distribution?",
        answer:
          "No. Amazon Help lists coloring books under content not currently accepted for Expanded Distribution.",
      },
      {
        question: "Are 8.5x11 color paperbacks eligible for Expanded Distribution?",
        answer:
          "The trim size can be eligible for some ink and paper combinations, but coloring books are excluded as a content type. Journals with frequent lined or blank pages are also excluded.",
      },
      {
        question: "What royalty rate applies if I enroll a qualifying paperback in ED?",
        answer:
          "Expanded Distribution pays 40% of list price minus printing costs, lower than the standard 50% or 60% print royalty on Amazon.com.",
      },
    ],
    contentHtml:
      "<p><strong>KDP Expanded Distribution will not distribute coloring books, journals with frequent lined or blank pages, interiors that require heavy ink, or any hardcover.</strong> The program sends paperbacks to wholesale channels outside Amazon.com, but Amazon publishes an explicit exclusion list. If your business model assumes bookstore placement for coloring catalogs, plan for Amazon-only sales instead.</p><h2>What Expanded Distribution excludes</h2><p>Amazon Help (reviewed August 2026) lists these common kill-switches for coloring and low-content publishers:</p><ul><li><strong>Coloring books</strong> — listed under content not currently accepted</li><li><strong>Frequent lined or blank pages</strong> — journals, notebooks, planners, calendars, agendas, organizers</li><li><strong>High concentration of ink</strong> — dark fills and heavy coverage interiors</li><li><strong>Hardcover books</strong> — not eligible for Expanded Distribution at all</li></ul><p>Draft2Digital and other aggregators also refuse coloring and low-content titles, so switching platforms does not bypass the rule.</p><h2>The 8.25×11 vs 8.5×11 trap</h2><p>Expanded Distribution trim eligibility is not the same as “can I publish this trim on KDP.” Amazon's chart shows 8.25×11 is ineligible for all ED paper and ink combinations. 8.5×11 color paperbacks can be ED-eligible on paper/ink grounds—but coloring books are still banned as a content type. A creator can satisfy trim rules and still fail on content rules.</p><table><thead><tr><th>Title type</th><th>8.5×11 paperback on Amazon</th><th>Expanded Distribution</th></tr></thead><tbody><tr><td>Coloring book</td><td>Yes (standard print path)</td><td>No — content ban</td></tr><tr><td>Journal / planner</td><td>Yes</td><td>No — lined/blank ban</td></tr><tr><td>Dark heavy-ink interior</td><td>Yes</td><td>No — ink concentration ban</td></tr><tr><td>Hardcover any trim</td><td>Yes (five hardcover sizes)</td><td>No — format ban</td></tr></tbody></table><h2>Pricing workflow when ED is off the table</h2><ol><li><strong>Drop ED from the financial model:</strong> use Amazon.com print royalties only (50% below $9.99 USD, 60% at or above).</li><li><strong>Model print cost honestly:</strong> color interiors cost more; heavy pages raise manufacturing cost even without ED.</li><li><strong>Set list price on Amazon conversion:</strong> ED's 40% rate does not apply to excluded titles anyway.</li><li><strong>Document the exclusion in SOPs:</strong> template teams should not promise bookstore reach for coloring SKUs.</li><li><strong>Re-check Help before relaunch:</strong> exclusion lists change rarely but do change—verify before each catalog sprint.</li></ol><h2>FAQ</h2><h3>Should I enroll qualifying journals in ED for extra reach?</h3><p>Only if the interior is not mostly lined or blank pages. Most KDP journals fail the content rule even when trim size qualifies.</p><h3>Does Expanded Distribution affect Kindle?</h3><p>No. ED is a paperback wholesale program. Kindle Select and KU are separate decisions.</p><h2>Bottom line</h2><p>Price coloring and journal catalogs for Amazon.com first. Use our <a href=\"/tools/kdp-royalty-calculator\">royalty calculator</a> with ED turned off in your assumptions.</p>",
  },
  {
    slug: "kdp-insufficient-bleed-live-element-margin",
    title: "KDP Insufficient Bleed After Print Previewer Passed (LEM vs Bleed Explained)",
    description:
      "When KDP Print Previewer passes but Human Review emails insufficient bleed, the failure is often live-element margin—not missing bleed. Fix unsafe zones and copyright lines before resubmitting.",
    excerpt:
      "KDP can approve a file in Print Previewer and still reject it for insufficient bleed during Human Review. The fix is usually live-element margin: keep art and text out of the unsafe zone, not just add bleed.",
    datePublished: "2026-08-28",
    dateModified: "2026-08-28",
    category: "Formatting",
    readTime: "11 min read",
    imageEmoji: "📐",
    keywords: [
      "kdp insufficient bleed",
      "kdp coloring book rejected bleed",
      "kdp print previewer inside margin",
      "kdp live element margin",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Formatting and Production",
      bio: "The team documents print rejection forensics for coloring books and full-bleed KDP interiors.",
    },
    faq: [
      {
        question: "Why does KDP say insufficient bleed when Print Previewer passed?",
        answer:
          "Interior Reviewer and Print Previewer check different rules than Human Review. A common cause is live elements—text, line art, or logos— sitting too close to the trim edge inside the margin safety zone, not literal missing bleed extension.",
      },
      {
        question: "Does Amazon use the term Live Element Margin?",
        answer:
          "Amazon Help documents bleed and margin math but does not use the phrase Live Element Margin. Publishers use LEM in community threads to describe art that must stay inside the safe area.",
      },
      {
        question: "Can copyright text in the bleed zone cause rejection?",
        answer:
          "Yes. Full-bleed coloring pages with copyright notices placed in the outer margin or bleed area are a repeated failure mode in KDP Community threads.",
      },
    ],
    contentHtml:
      "<p><strong>Insufficient bleed on KDP often means your live elements sit too close to the trim line—not that your PDF lacks the 0.125-inch bleed extension.</strong> Print Previewer and Interior Reviewer can pass while Human Review later emails a vague insufficient bleed warning with no page list. Coloring publishers see this on full-bleed 8.5×11 files when line art, titles, or copyright lines cross into the unsafe zone. Amazon Help never names Live Element Margin, but community threads use LEM to describe the same failure.</p><h2>Bleed vs live-element margin</h2><table><thead><tr><th>Concept</th><th>What Amazon documents</th><th>What fails in practice</th></tr></thead><tbody><tr><td>Bleed</td><td>Add 0.125\" width and 0.25\" height to trim (6×9 → 6.125×9.25)</td><td>PDF page size wrong vs selected trim</td></tr><tr><td>Margins / gutter</td><td>Inner and outer margin tables by page count</td><td>Text disappears into spine</td></tr><tr><td>Live-element safety</td><td>Important content must stay inside margin guides</td><td>Art or copyright in bleed/unsafe zone triggers HR email</td></tr></tbody></table><p>Generic rejection listicles focus on bleed math. The operational gap is the two-stage review: automated preview pass, human email fail.</p><h2>Diagnostic workflow when preview passed but email failed</h2><ol><li><strong>Confirm PDF page size:</strong> match trim plus bleed dimensions from Help, not affiliate template shortcuts.</li><li><strong>Audit the unsafe zone:</strong> on full-bleed coloring pages, check whether line art or fills touch the trim rectangle.</li><li><strong>Move copyright and logos:</strong> place small text at least inside the margin guide, not on the outer bleed strip.</li><li><strong>Re-export one suspect page:</strong> fix the worst offender before re-uploading the whole interior.</li><li><strong>Re-run Print Previewer:</strong> then submit and watch for the Human Review email within 72 hours (longer for some categories).</li></ol><h2>Coloring-specific patterns from KDP Community</h2><p>Threads through 2025 still describe the same cycle: 8.5×11 full-bleed coloring interiors pass automated checks, then fail with insufficient bleed when copyright or decorative borders sit in the outer zone. Members distinguish LEM from literal bleed because the PDF already includes bleed extension. Amazon's Fix Formatting Help covers margin errors but not the IR-vs-HR split—this article fills that gap.</p><h2>What not to do</h2><ul><li>Do not blindly add more bleed if page dimensions are already correct.</li><li>Do not assume one preview tool equals final approval.</li><li>Do not copy affiliate journal templates that use 6.125×9.125 instead of Amazon's 6.125×9.25.</li></ul><h2>FAQ</h2><h3>Will KDP tell me which page failed?</h3><p>Often no. Human Review emails can cite insufficient bleed without a page list, so you must audit margins manually.</p><h3>Can a trim checker help?</h3><p>Yes. Validate dimensions and margin presets before export with our <a href=\"/tools/kdp-trim-size-checker\">trim size checker</a>, then inspect live elements visually in Print Previewer.</p><h2>Bottom line</h2><p>Treat insufficient bleed as a safety-zone problem until you prove otherwise. Keep important art and text inside margin guides on every full-bleed coloring page.</p>",
  },
  {
    slug: "kdp-hardcover-coloring-book-trim",
    title: "Why 8.5×11 Coloring Books Fail as KDP Hardcovers",
    description:
      "KDP hardcover trims top out at 8.25×11, not 8.5×11. Coloring books designed for standard paperback size fail hardcover upload, wrap math, and unit economics.",
    excerpt:
      "Coloring books default to 8.5×11 paperbacks, but KDP hardcover only supports five trim sizes up to 8.25×11. Uploading the same file as hardcover causes rejection and uneconomic print costs.",
    datePublished: "2026-08-28",
    dateModified: "2026-08-28",
    category: "Formatting",
    readTime: "10 min read",
    imageEmoji: "📕",
    keywords: [
      "kdp hardcover coloring book",
      "8.5x11 hardcover kdp",
      "kdp hardcover trim sizes",
      "coloring book trim size kdp",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Formatting and Production",
      bio: "The team documents trim-size traps for coloring publishers moving from paperback to hardcover on Amazon KDP.",
    },
    faq: [
      {
        question: "Can I publish an 8.5x11 coloring book as a KDP hardcover?",
        answer:
          "No. KDP hardcover supports five trim sizes, the largest being 8.25×11. Standard 8.5×11 coloring interiors are incompatible with hardcover upload.",
      },
      {
        question: "Why did my hardcover fail when paperback accepted the same Canva file?",
        answer:
          "Paperback and hardcover use different trim lists and cover wrap templates. A 8.5×11 interior that fits paperback specs cannot map to a supported hardcover trim.",
      },
      {
        question: "Are large-page coloring hardcovers economical?",
        answer:
          "Community publishers report that 300+ page color hardcovers become prohibitively expensive for buyers. Trim rejection is often a blessing for unit economics.",
      },
    ],
    contentHtml:
      "<p><strong>An 8.5×11 coloring book cannot publish as a KDP hardcover because hardcover trims stop at 8.25×11.</strong> Coloring niches standardize on 8.5×11 paperbacks for page area. Creators who duplicate the same Canva interior for hardcover see incompatible manuscript errors—even when paperback uploaded cleanly. Wrap and hinge math also differ from paperback, and long color hardcovers hit uneconomic print costs.</p><h2>Supported hardcover trims vs coloring default</h2><p>KDP hardcover currently allows five interior trim sizes, largest 8.25×11. Paperback coloring templates commonly export at 8.5×11 (often 8.625×11.25 with bleed in design tools). That mismatch alone blocks hardcover binding.</p><table><thead><tr><th>Format</th><th>Typical coloring trim</th><th>KDP support</th></tr></thead><tbody><tr><td>Paperback</td><td>8.5×11</td><td>Yes</td></tr><tr><td>Hardcover</td><td>8.5×11</td><td>No — max 8.25×11</td></tr><tr><td>Hardcover</td><td>8.25×11</td><td>Yes — requires redesign from 8.5×11 art</td></tr></tbody></table><h2>Cover wrap and page-count economics</h2><p>Hardcover covers use wrap dimensions with 0.51-inch wrap and 0.4-inch hinge requirements, plus spine width tied to page count. A 350-page color interior—not unusual in community threads—creates a thick spine and high print quote. Coloring buyers rarely pay premium hardcover prices for large page counts. Paperback at 8.5×11 is usually the rational default.</p><h2>Decision workflow before you design hardcover</h2><ol><li><strong>Confirm trim list:</strong> open KDP hardcover specs before layout, not after paperback is finished.</li><li><strong>Choose audience format:</strong> if buyers expect lay-flat area, stay paperback 8.5×11.</li><li><strong>Redesign if you must do hardcover:</strong> reflow art to 8.25×11 or smaller—not a automatic duplicate.</li><li><strong>Rebuild wrap PDF:</strong> use KDP Cover Calculator output for hardcover, not paperback spread templates.</li><li><strong>Model print cost:</strong> compare paperback vs hardcover unit economics before ordering proofs.</li></ol><h2>Community failure mode</h2><p>KDP Community publishers describe uploading 8.5×11 Canva coloring interiors that paperback accepted, then receiving hardcover rejection for incompatible manuscript size. Peer advice: hardcovers only exist in the limited trim set—if 8.5×11 is not on the list, redesign or stay paperback.</p><h2>FAQ</h2><h3>Can I shrink 8.5×11 art to fit 8.25×11 hardcover?</h3><p>Only with a full relayout. Scaling down uniformly shrinks line art and margins unpredictably. Treat it as a new interior.</p><h3>Does Expanded Distribution help hardcover coloring?</h3><p>No. Hardcovers are ineligible for Expanded Distribution, and coloring books are excluded regardless.</p><h2>Bottom line</h2><p>Ship coloring at 8.5×11 paperback unless you deliberately design for a supported hardcover trim. Validate sizes with our <a href=\"/tools/kdp-trim-size-checker\">trim size checker</a> before cover export.</p>",
  },
  {
    slug: "kdp-print-royalty-cliff-catalog-repricing",
    title: "KDP Print Royalty Cliff Catalog Repricing: SKU Audit After the June 2025 Rate Split",
    description:
      "A catalog SKU-audit SOP for the June 2025 KDP print royalty cliff: 50% below $9.99, 60% at or above, marketplace floors including 110 SEK, and how to fix wrong $7.99×60% math.",
    excerpt:
      "After June 2025, KDP print royalties are 50% below marketplace cliffs and 60% at or above them. Catalog operators need a SKU audit—not another calculator explainer—to reprice live titles safely.",
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
    category: "Analytics",
    readTime: "12 min read",
    imageEmoji: "📉",
    keywords: [
      "kdp print royalty cliff",
      "kdp catalog repricing",
      "kdp 50 percent royalty",
      "kdp paperback royalty audit",
      "kdp sek royalty floor",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Pricing and Analytics",
      bio: "The team publishes pricing frameworks and catalog-ops workflows so KDP creators reprice live SKUs against current Amazon Help rates.",
    },
    faq: [
      {
        question: "What is the KDP print royalty cliff after June 2025?",
        answer:
          "On Amazon.com, list prices at or below $9.98 USD earn 50% of list minus printing cost; $9.99 and above earn 60%. Other marketplaces use matching floors, including 110 SEK for the 60% band on Amazon.se.",
      },
      {
        question: "Does a $7.99 USD paperback earn 60% royalty?",
        answer:
          "No. $7.99 USD is below the $9.99 cliff, so Amazon.com applies 50%. Treating every paperback as 60% × list price overstates margin. £7.99 on Amazon.co.uk is a different floor and must be modeled separately.",
      },
      {
        question: "What happens if I edit a title priced under the new minimum?",
        answer:
          "Amazon’s June 2025 announcement stated that updates to book details or content after June 10, 2025 can require you to raise list price to the new minimum for that marketplace.",
      },
    ],
    contentHtml:
      "<p><strong>A KDP print royalty cliff catalog audit is a SKU-by-SKU repricing SOP for titles that still sit below marketplace rate floors after the June 2025 print royalty change.</strong> This is not another unit-math explainer. It is how catalog operators inventory live paperbacks and hardcovers, map each marketplace list price to the correct 50% or 60% band, and decide whether to raise price, accept thinner 50% margins, or leave untouched titles alone. Amazon Help as of 2026-08-21 documents the split: 50% at or below the listed floors (for example $9.98 USD) and 60% at or above the next cent ($9.99 USD). Expanded Distribution remains 40% of list minus print cost when eligible.</p><h2>What changed—and what wrong blogs still teach</h2><p>Before June 10, 2025, many low-price journals and coloring paperbacks assumed a flat 60% Amazon.com print royalty. After the cliff, sub-$9.99 USD titles earn 50%. Help (reviewed 2026-08-21) lists marketplace floors including Amazon.com 9.98/9.99 USD, EUR 9.98/9.99, UK 7.98/7.99 GBP, CAD and AUD 13.98/13.99, JPY 999/1000, PLN 39/40, and Amazon.se <strong>109/110 SEK</strong>. Some coloring FAQs still teach “paperbacks always use 60%” and show $7.99 × 0.60 math. That is wrong on Amazon.com: $7.99 USD is a 50% title. Do not copy that arithmetic into a catalog spreadsheet.</p><table><thead><tr><th>Marketplace</th><th>50% band (at or below)</th><th>60% band (at or above)</th></tr></thead><tbody><tr><td>Amazon.com</td><td>$9.98 USD</td><td>$9.99 USD</td></tr><tr><td>Amazon.co.uk</td><td>£7.98</td><td>£7.99</td></tr><tr><td>Amazon.se</td><td>109 SEK</td><td>110 SEK</td></tr><tr><td>Amazon.ca / .com.au</td><td>13.98 local</td><td>13.99 local</td></tr></tbody></table><h2>Catalog SKU-audit SOP</h2><ol><li><strong>Export live print SKUs:</strong> list every paperback and hardcover with current list prices per marketplace you actually sell in.</li><li><strong>Tag the rate band:</strong> mark each price 50% or 60% using Help floors—not a single global 60% assumption.</li><li><strong>Recalculate royalty:</strong> use (rate × list) − print cost. Run scenarios in our <a href=\"/tools/kdp-royalty-calculator\">KDP royalty calculator</a> before changing live prices.</li><li><strong>Flag edit risk:</strong> titles you plan to revise after June 10, 2025 may be forced to new minimum list prices—batch content edits with price updates.</li><li><strong>Prioritize thin-margin SKUs:</strong> sub-cliff color interiors with high print cost first; leave healthy 60% titles alone.</li><li><strong>Reprice or accept 50%:</strong> raise to the 60% floor only when conversion math still works; document the decision per ASIN.</li><li><strong>Re-check Help before the next sprint:</strong> SEK and other floors can move; verify against Amazon Help, not a cached blog table.</li></ol><h2>Ops rules that prevent catalog damage</h2><ul><li>Never model USD $7.99 as 60% royalty.</li><li>Treat UK £7.99, EUR €9.99, and SEK 110 as separate cliffs—not USD copies.</li><li>Do not enroll coloring or heavy-ink titles in Expanded Distribution to “recover” margin; ED exclusions still apply.</li><li>Use our <a href=\"/blog/kdp-royalty-calculator-guide\">royalty calculator guide</a> for unit scenarios; use this SOP for catalog queueing and owner sign-off.</li></ul><h2>FAQ</h2><h3>Should I raise every title to $9.99?</h3><p>No. Raise only when 60% math plus expected conversion beats staying at 50%. Some niches convert better under $9.99 even at the lower rate.</p><h3>Is Expanded Distribution a workaround for the cliff?</h3><p>No. ED pays 40% of list minus print cost and excludes coloring books, many journals, and heavy-ink interiors entirely.</p><h2>Bottom line</h2><p>Audit the catalog by marketplace floor, kill the $7.99×60% habit, and reprice only where unit economics justify crossing the cliff.</p>",
  },
  {
    slug: "kdp-coloring-book-too-much-ink",
    title: "KDP Coloring Books and “Too Much Ink”: Darkness, Rejection Risk, and ED Exclusion",
    description:
      "How KDP treats coloring books with high ink concentration: Expanded Distribution exclusion, forum failure patterns, and what Amazon Help actually says—without inventing TAC percentages.",
    excerpt:
      "Coloring books are already barred from Expanded Distribution, and interiors that need a high concentration of ink are a separate ED kill-switch. Forums discuss darkness failures; Help does not publish a TAC percentage.",
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
    category: "Compliance",
    readTime: "10 min read",
    imageEmoji: "🖤",
    keywords: [
      "kdp coloring book too much ink",
      "kdp high concentration of ink",
      "kdp expanded distribution ink",
      "kdp coloring book darkness",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Distribution and Pricing",
      bio: "The team publishes distribution and production guides so coloring publishers avoid ink and Expanded Distribution assumptions Amazon does not support.",
    },
    faq: [
      {
        question: "Does Amazon publish a maximum ink or TAC percentage for KDP coloring books?",
        answer:
          "No. Amazon Help excludes paperbacks whose interiors require a high concentration of ink from Expanded Distribution, but it does not publish a numeric TAC or ink-coverage threshold for publishers to target.",
      },
      {
        question: "Are coloring books blocked from Expanded Distribution even with light line art?",
        answer:
          "Yes. Coloring books are listed under content not currently accepted for Expanded Distribution, separate from the high-ink rule.",
      },
      {
        question: "Can dark full-page fills cause print quality issues on Amazon.com?",
        answer:
          "Community threads report darkness and ink-related quality complaints on heavy fills. Treat heavy black or dense gray fields as a production risk even when the title remains Amazon.com-only.",
      },
    ],
    contentHtml:
      "<p><strong>“Too much ink” on a KDP coloring book usually means one of two Amazon rules colliding with dark interiors: Expanded Distribution’s high-ink exclusion, or print-quality failures discussed in publisher forums.</strong> Amazon Help lists both coloring books and paperbacks that require a high concentration of ink under content not accepted for Expanded Distribution. Help does not publish a total area coverage (TAC) percentage, CMYK ink limit, or darkness meter. Any blog that invents a numeric TAC threshold is guessing. This guide stays inside what Help and forums actually support.</p><h2>Two separate kill-switches</h2><table><thead><tr><th>Rule</th><th>What Help says</th><th>What it means for coloring</th></tr></thead><tbody><tr><td>Coloring books</td><td>Not currently accepted for Expanded Distribution</td><td>ED is off regardless of how light the line art is</td></tr><tr><td>High concentration of ink</td><td>Interiors that require heavy ink to print are not accepted for ED</td><td>Dark fills and dense coverage are an independent ban</td></tr><tr><td>Amazon.com sales</td><td>ED exclusions do not by themselves ban Amazon retail</td><td>You can still sell on Amazon.com; do not promise bookstore ED</td></tr></tbody></table><p>See our dedicated <a href=\"/blog/kdp-expanded-distribution-coloring-book\">Expanded Distribution coloring guide</a> for the full exclusion list including journals and hardcovers.</p><h2>What forums report (and what they do not prove)</h2><p>KDP Community and publisher forums repeatedly describe heavy black backgrounds, solid gray panels, and dense patterned fills as triggers for ink-related quality complaints or ED denial. Those threads are useful as risk signals. They are not official thresholds. Do not reverse-engineer a fake “under X% ink” rule from anecdotal posts.</p><h2>Production workflow for dark coloring interiors</h2><ol><li><strong>Decide channel first:</strong> if you need ED, coloring books are already ineligible—stop designing for wholesale.</li><li><strong>Audit fill density:</strong> flag full-page blacks, large solid panels, and stacked overlapping strokes before export.</li><li><strong>Lighten where possible:</strong> prefer open line art and white negative space over flooded backgrounds when the design allows.</li><li><strong>Order a proof:</strong> judge darkness on a physical copy, not only on a calibrated monitor.</li><li><strong>Price for Amazon.com only:</strong> model print cost with ED off; heavy pages raise manufacturing cost even without ED.</li><li><strong>Document the SOP:</strong> template teams should not promise ED or invent a TAC percentage in briefs.</li></ol><h2>FAQ</h2><h3>Is “high concentration of ink” only an Expanded Distribution rule?</h3><p>Help states it under ED eligibility. Separately, dark interiors can still create print-quality issues on Amazon.com sales. Treat both risks as real without inventing a shared percentage.</p><h3>Should I switch to black-and-white ink to avoid the rule?</h3><p>Black ink can still look heavy if coverage is dense. Ink type does not erase the coloring-book ED ban.</p><h2>Bottom line</h2><p>Plan coloring catalogs for Amazon.com, avoid inventing TAC math, and treat heavy fills as a proof-and-design problem—not an ED growth lever.</p>",
  },
  {
    slug: "kdp-activity-book-interior-specs",
    title: "KDP Activity and Puzzle Book Interior Specs: Not Low-Content, Gutters vs Grids",
    description:
      "Interior specifications for KDP activity and puzzle books: why they are not low-content, how gutters differ from grid gutters, and a pre-upload checklist.",
    excerpt:
      "Activity and puzzle books are generally not low-content on KDP. Specs hinge on unique pages, binding gutters by page count, and keeping puzzle grids out of the unsafe margin zone.",
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
    category: "Formatting",
    readTime: "11 min read",
    imageEmoji: "🧩",
    keywords: [
      "kdp activity book interior",
      "kdp puzzle book gutter",
      "activity book kdp specifications",
      "kdp puzzle book not low content",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Formatting and Production",
      bio: "The team documents print interior specs for activity, puzzle, and coloring publishers who need Amazon-accurate classification and margin rules.",
    },
    faq: [
      {
        question: "Are activity books and puzzle books low-content on KDP?",
        answer:
          "Generally no. Amazon Help says low-content does not typically include activity books such as puzzle books or coloring books, because they do not feature repetitive fill-in pages.",
      },
      {
        question: "What is the difference between binding gutter and a puzzle grid gutter?",
        answer:
          "Binding gutter is Amazon’s inside margin that grows with page count so content clears the spine. A puzzle grid gutter is the white gap between cells in your design—it does not replace Amazon’s margin table.",
      },
      {
        question: "Can I mark an activity book as low-content for faster review?",
        answer:
          "No. Wrong classification can reject the title and changes ISBN, series, and review-timeline eligibility. Leave the low-content box unchecked for unique-page activity interiors.",
      },
    ],
    contentHtml:
      "<p><strong>KDP activity and puzzle book interiors are fixed-layout print PDFs with unique pages—not low-content repetitive fill-in books.</strong> Amazon Help groups puzzle books and coloring books with titles that generally do not feature the same page repeated. That classification choice drives checkbox settings, ISBN eligibility, series enrollment, and review timing. Interior engineering then comes down to trim, bleed, and binding gutters—not marketing blogs that still lump activity books into “low content niches.”</p><h2>Classification first</h2><p>Under Amazon’s low-content Help, notebooks, planners, diaries/journals, prompt journals, and log books are low-content. Novels, puzzle books, coloring books, photography, and children’s books are generally not. If every crossword, maze, or activity page is unique, leave the Low-content box unchecked. For the coloring-specific checklist, use our <a href=\"/blog/kdp-coloring-book-low-content\">coloring book classification guide</a>.</p><h2>Gutter vs grid: do not confuse the terms</h2><table><thead><tr><th>Term</th><th>Meaning on KDP</th><th>Failure mode</th></tr></thead><tbody><tr><td>Binding gutter (inside margin)</td><td>Amazon minimum inside margin by page count (for example 0.375\" at 24–150 pages, rising to 0.875\" at 701–828)</td><td>Puzzle answers or grid edges disappear into the spine</td></tr><tr><td>Outer/top/bottom margins</td><td>0.25\" without bleed; 0.375\" with bleed</td><td>Clipped numbers, titles, or QR codes</td></tr><tr><td>Puzzle grid spacing</td><td>Designer-chosen gaps between cells</td><td>Looks fine on screen but still violates binding gutter if the whole grid sits too close to the spine</td></tr></tbody></table><h2>Interior spec workflow</h2><ol><li><strong>Pick trim for the activity:</strong> many puzzle books use 8.5×11 or 6×9; lock trim before drawing grids.</li><li><strong>Count pages early:</strong> set inside margin from Amazon’s page-count table, then build the grid inside that safe rectangle.</li><li><strong>Keep answer keys clear of the spine:</strong> move solution pages or mirror layouts so text does not ride the gutter.</li><li><strong>Decide bleed:</strong> edge-to-edge art needs +0.125\" width and +0.25\" height; most grid-only interiors do better without bleed and with 0.25\" outer margins.</li><li><strong>Export unique pages:</strong> do not submit a 100-page file that is one worksheet repeated—that invites low-content treatment and quality policy risk.</li><li><strong>Preview and classify:</strong> confirm the low-content box is off, then run Print Previewer before submit.</li></ol><h2>FAQ</h2><h3>Do activity books get the 10-business-day low-content review?</h3><p>When correctly classified as not low-content, they follow standard paperback timelines rather than the low-content review window. Misclassification breaks both policy and calendar planning.</p><h3>Can lined practice pages inside an activity book make it low-content?</h3><p>A mostly unique activity interior with a few practice lines is still usually not a notebook. If the book is primarily repetitive lined or blank pages, Amazon may treat it as low-content—design the majority of pages as distinct activities.</p><h2>Bottom line</h2><p>Treat activity books as unique-page print products: correct classification, Amazon binding gutters, and grids that live inside the safe area—not affiliate “low content” bundles.</p>",
  },
  {
    slug: "kdp-journal-6x9-bleed-math",
    title: "KDP 6×9 Journal Bleed Math: Use 6.125×9.25, Not Affiliate 6.125×9.125",
    description:
      "Correct KDP 6×9 bleed page size is 6.125×9.25 inches. Affiliate templates that export 6.125×9.125 are short on height—here is the Help math and a fix workflow.",
    excerpt:
      "For a 6×9 KDP paperback with bleed, Amazon requires 6.125\" × 9.25\". Templates that use 6.125×9.125 underbuild height by 0.125\" and risk rejection or trim errors.",
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
    category: "Formatting",
    readTime: "9 min read",
    imageEmoji: "📏",
    keywords: [
      "kdp 6x9 bleed",
      "kdp journal bleed size",
      "6.125 x 9.25 kdp",
      "kdp paperback page size with bleed",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Formatting and Production",
      bio: "The team documents Amazon-canonical trim and bleed math so journal publishers catch wrong affiliate template dimensions before upload.",
    },
    faq: [
      {
        question: "What PDF page size should a 6x9 KDP journal use with bleed?",
        answer:
          "6.125 inches wide by 9.25 inches high. Amazon’s Help example adds 0.125\" to width and 0.25\" to height for a 6×9 trim.",
      },
      {
        question: "Why do some templates use 6.125×9.125?",
        answer:
          "That size incorrectly adds only 0.125\" to height instead of 0.25\". It is a common affiliate shortcut, not Amazon’s documented formula.",
      },
      {
        question: "Do no-bleed 6x9 journals use 6×9 exactly?",
        answer:
          "Yes. Without bleed, set the PDF to the trim size (6×9) and keep outer margins at least 0.25\". Use bleed dimensions only when art extends to the trim edge.",
      },
    ],
    contentHtml:
      "<p><strong>Correct KDP bleed math for a 6×9 paperback is 6.125\" wide × 9.25\" high—not the affiliate shortcut 6.125×9.125.</strong> Amazon Help states that when a book has bleed you add 0.125\" (3.2 mm) to the width and 0.25\" (6.4 mm) to the height. For a 6\" × 9\" trim, that produces a manuscript page of 6.125\" × 9.25\". Templates that only bump height by 0.125\" leave the file short and can fail upload checks or print with unexpected trim.</p><h2>Amazon’s formula vs the wrong template</h2><table><thead><tr><th>Source</th><th>Width</th><th>Height</th><th>Verdict</th></tr></thead><tbody><tr><td>Amazon Help (6×9 with bleed)</td><td>6.125\"</td><td>9.25\"</td><td>Correct</td></tr><tr><td>Common affiliate export</td><td>6.125\"</td><td>9.125\"</td><td>Short 0.125\" on height</td></tr><tr><td>6×9 without bleed</td><td>6.0\"</td><td>9.0\"</td><td>Correct only if no edge-to-edge art</td></tr></tbody></table><p>Full formatting context—including margins and gutters—is in our <a href=\"/blog/kdp-formatting-guide\">KDP formatting guide</a>.</p><h2>Fix workflow for journal templates</h2><ol><li><strong>Measure the PDF page box:</strong> open the interior and confirm MediaBox equals 6.125×9.25 when bleed is on.</li><li><strong>Reject 9.125 height:</strong> rebuild or re-export any Canva/template file stuck on the affiliate size.</li><li><strong>Extend background fills:</strong> lined or patterned backgrounds must reach the full bleed rectangle, not stop at trim.</li><li><strong>Keep live text inside margins:</strong> with bleed, outer margins are at least 0.375\"; increase the inside gutter by page count.</li><li><strong>Validate before upload:</strong> run dimensions through our <a href=\"/tools/kdp-trim-size-checker\">trim size checker</a>, then inspect Print Previewer.</li></ol><h2>When journals still fail after “correct” bleed</h2><ul><li>Lined pages that hug the outer edge can trip live-element / insufficient-bleed Human Review even when page size is right.</li><li>Hardcover and paperback wrap files are separate—do not reuse paperback bleed math for hardcover wrap templates.</li><li>No-bleed journals should not silently include bleed-sized canvases; mismatch between KDP trim selection and PDF size causes rejection.</li></ul><h2>FAQ</h2><h3>Is 6.125×9.25 only for journals?</h3><p>No. Any 6×9 paperback with bleed uses the same Help example—novels, workbooks, and journals alike.</p><h3>Can I crop a 6.125×9.125 file to fix it?</h3><p>Cropping alone does not add missing bleed height. Rebuild the page to 9.25\" and re-extend edge art.</p><h2>Bottom line</h2><p>Trust Amazon’s +0.125\" / +0.25\" rule. If a template ships 6.125×9.125 for 6×9 bleed, replace it before you upload.</p>",
  },
  {
    slug: "kdp-ai-disclosure-image-catalogs",
    title: "KDP AI Disclosure for Converter and Image Catalogs (Not a Generic Checkbox Guide)",
    description:
      "How to disclose AI-generated images when your KDP catalog uses photo-to-line-art converters or AI image pipelines—when the box is required and when AI-assisted edits are not.",
    excerpt:
      "Converter output that creates line art or other images is AI-generated under KDP rules, even after heavy edits. Image-catalog publishers must disclose; generic AI-assisted cleanup does not require the same checkbox.",
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
    category: "Compliance",
    readTime: "10 min read",
    imageEmoji: "🤖",
    keywords: [
      "kdp ai disclosure images",
      "kdp ai generated coloring book",
      "kdp converter ai disclosure",
      "amazon kdp ai content images",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Compliance and Production",
      bio: "The team documents KDP AI disclosure for image-heavy catalogs so converter and generative-art publishers answer Amazon’s questions accurately.",
    },
    faq: [
      {
        question: "Is photo-to-coloring converter output AI-generated on KDP?",
        answer:
          "Yes, if an AI-based tool created the actual images. Amazon defines AI-generated content as text, images, or translations created by an AI-based tool, even when you apply substantial edits afterward.",
      },
      {
        question: "Do I need to disclose AI-assisted cleanup of hand-drawn art?",
        answer:
          "No. If you created the art yourself and only used AI to edit, refine, or error-check it, Amazon treats that as AI-assisted and does not require disclosure.",
      },
      {
        question: "Does disclosure apply to covers as well as interiors?",
        answer:
          "Yes. AI-generated images include cover and interior images and artwork. Disclose when either was created by an AI tool.",
      },
    ],
    contentHtml:
      "<p><strong>KDP AI disclosure for image catalogs is the requirement to tell Amazon when an AI tool created your cover or interior images—including converter pipelines that turn photos into line art.</strong> This is not another generic “check the AI box” SERP clone. Catalog operators who batch-convert photos or generate decorative assets need a clear rule: converter output that creates the artwork is AI-generated; human-made art that only used AI for cleanup is AI-assisted and does not require disclosure. Amazon Help (Content Guidelines) states you must inform KDP of AI-generated text, images, or translations when you publish or republish.</p><h2>Amazon’s definitions that matter for converters</h2><ul><li><strong>AI-generated:</strong> an AI-based tool created the actual content (text, images, or translations), even if you edited heavily afterward.</li><li><strong>AI-assisted:</strong> you created the content yourself and used AI only to edit, refine, error-check, or otherwise improve it.</li><li><strong>Images in scope:</strong> cover images, interior images, and artwork all count.</li></ul><p>Pair this with the broader upload checklist in our <a href=\"/blog/kdp-compliance-requirements\">KDP compliance requirements</a> guide.</p><h2>Catalog disclosure SOP</h2><ol><li><strong>Inventory the pipeline:</strong> list every title that used a photo-to-line-art converter, generative image model, or AI upscaler that produced new artwork.</li><li><strong>Classify each asset:</strong> mark AI-generated vs AI-assisted vs fully human. When unsure whether the tool created the image, treat converter-created line art as AI-generated.</li><li><strong>Disclose on publish and republish:</strong> answer Amazon’s AI questions when uploading new books or editing and republishing existing ones that include those assets.</li><li><strong>Do not hide behind “I edited it”:</strong> substantial manual cleanup does not convert AI-generated images into undisclosed human work under Help’s definition.</li><li><strong>Keep a SKU log:</strong> store which ASIN used which model/converter so future edits stay consistent.</li><li><strong>Skip the box only for true assistance:</strong> sharpening or cleanup on art you drew still does not require disclosure.</li></ol><h2>What this post is not</h2><table><thead><tr><th>Topic</th><th>Covered here?</th><th>Why</th></tr></thead><tbody><tr><td>Generic AI text novel disclosure</td><td>No</td><td>SERP already saturated; not the image-catalog problem</td></tr><tr><td>Converter / generative image catalogs</td><td>Yes</td><td>Unique operational gap for coloring and illustration SKUs</td></tr><tr><td>Whether AI art is “allowed”</td><td>Disclosure focus only</td><td>Help requires disclosure of AI-generated images; follow all other content policies separately</td></tr></tbody></table><h2>FAQ</h2><h3>If only the cover is AI-generated, do I still disclose?</h3><p>Yes. Disclose AI-generated images when any cover or interior artwork was created by an AI tool.</p><h3>Does using a non-AI filter on a photo avoid disclosure?</h3><p>Traditional non-AI image filters are outside Amazon’s AI-generated definition. If the tool is AI-based and creates the artwork, disclose.</p><h2>Bottom line</h2><p>For converter and generative image catalogs, disclose AI-generated artwork on every affected publish or republish—and stop treating heavy edits as a loophole.</p>",
  },
  {
    slug: "kdp-publishing-calendar-title-cap",
    title: "KDP Publishing Calendar: 10 Titles per Format per Week (Not the Old 3/Day Rule)",
    description:
      "Build a KDP publishing calendar around Amazon Help’s limit of 10 titles per book format each week and up to 10 business days for low-content review—not outdated 3-per-day news.",
    excerpt:
      "Amazon Help limits new titles to 10 per book format each week. Low-content review can take up to 10 business days. Plan calendars from Help, not from 2023 3-titles-per-day articles.",
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
    category: "Workflow",
    readTime: "10 min read",
    imageEmoji: "📅",
    keywords: [
      "kdp publishing calendar",
      "kdp title limit per week",
      "kdp 10 titles per week",
      "kdp low content review time",
    ],
    author: {
      name: "KDP Creator Suite Editorial Team",
      role: "Product and Publishing Research",
      bio: "The team publishes implementation guides based on day-to-day self-publishing workflows and current Amazon Help operational limits.",
    },
    faq: [
      {
        question: "How many KDP titles can I create per week?",
        answer:
          "Amazon Help states you can create up to 10 titles per book format each week. If you need to create more regularly, Help says to contact Amazon to inquire about an exception.",
      },
      {
        question: "Is the KDP limit still 3 titles per day?",
        answer:
          "Amazon Help does not publish a 3-titles-per-day cap. That figure comes from 2023 news coverage. Plan from the live Help rule: 10 titles per book format each week.",
      },
      {
        question: "How long does low-content review take?",
        answer:
          "Help estimates up to 10 business days for low-content books such as journals or notebooks to go live, versus about 3 business days for many other books. Manuscript updates can also take up to 10 business days for low-content titles.",
      },
    ],
    contentHtml:
      "<p><strong>A KDP publishing calendar under current Amazon Help is paced by a weekly creation cap—10 titles per book format each week—and by longer review windows for low-content books.</strong> It is not paced by the widely repeated “3 titles per day” figure from 2023 news articles. Help’s Paperback Submission Guidelines still state the weekly per-format limit and invite high-volume publishers to contact Amazon for an exception. Timelines Help still estimates about 3 business days for many books to go live, and up to 10 business days for low-content titles such as journals or notebooks.</p><h2>Current Help limits vs outdated headlines</h2><table><thead><tr><th>Rule people cite</th><th>Status as of Help reviewed 2026-08-21</th><th>Use in your calendar?</th></tr></thead><tbody><tr><td>10 titles per book format each week</td><td>Documented in Amazon Help</td><td>Yes — primary throttle</td></tr><tr><td>3 titles per day</td><td>Not in current Help; 2023 news only</td><td>No — do not treat as live policy</td></tr><tr><td>~3 business days to live</td><td>Standard estimate for many books</td><td>Yes for non-low-content</td></tr><tr><td>Up to 10 business days</td><td>Low-content new books and many low-content updates</td><td>Yes for journals/notebooks</td></tr></tbody></table><h2>Weekly calendar SOP</h2><ol><li><strong>Count by format:</strong> track paperback, hardcover, and eBook creation separately against the 10-per-format weekly cap.</li><li><strong>Batch by review class:</strong> queue true low-content titles with a 10-business-day buffer; keep correctly classified coloring/activity books on the standard timeline.</li><li><strong>Reserve slots for fixes:</strong> do not burn the weekly cap on speculative uploads if you expect rejections and resubmits.</li><li><strong>Align edits with price locks:</strong> content edits after major royalty policy dates can force list-price updates—group those changes.</li><li><strong>Request an exception only if needed:</strong> Help says to contact Amazon if you regularly need more than 10 titles per format per week.</li><li><strong>Re-read Help each quarter:</strong> do not refresh the calendar from viral “3/day” posts.</li></ol><h2>Low-content vs activity timing</h2><p>Misclassifying a coloring or puzzle book as low-content does more than risk rejection—it wrecks launch dates if you assumed a 10-day review. Classify first using our <a href=\"/blog/kdp-coloring-book-low-content\">coloring classification guide</a>, then place the title on the matching calendar row. Journal workflows remain in our <a href=\"/blog/low-content-book-creator-workflow\">low-content creator workflow</a>.</p><h2>FAQ</h2><h3>Does the weekly cap apply to manuscript updates?</h3><p>Help’s wording limits how many titles you can create at the same time to 10 per book format each week. Plan new creations against that cap; treat update review time using the separate timelines Help publishes.</p><h3>Can I publish 10 paperbacks and 10 eBooks in the same week?</h3><p>Help expresses the limit per book format. Count each format’s creations toward its own weekly ten unless Amazon tells you otherwise for your account.</p><h2>Bottom line</h2><p>Build the calendar from Help’s 10-per-format weekly cap and 10-day low-content review—not from outdated 3-per-day headlines.</p>",
  },
];

export const blogPostsBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPost>;

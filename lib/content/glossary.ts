export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  detail: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "bleed",
    term: "Bleed",
    definition:
      "Bleed is extra artwork that extends past the trim edge so printed pages do not show white borders.",
    detail:
      "When a design reaches the edge of a page, files must include bleed so trimming does not expose unprinted edges.",
  },
  {
    slug: "trim-size",
    term: "Trim Size",
    definition:
      "Trim size is the final physical width and height of a printed book after production.",
    detail:
      "Common KDP trim sizes include 6x9 for many nonfiction titles and 8.5x11 for workbook-style formats.",
  },
  {
    slug: "gutter",
    term: "Gutter",
    definition:
      "Gutter is the inner margin near the spine used to keep text readable after binding.",
    detail:
      "As page count increases, gutter needs to increase to avoid text disappearing into the spine.",
  },
  {
    slug: "reflowable-layout",
    term: "Reflowable Layout",
    definition:
      "Reflowable layout means eBook text adapts to reader font settings and screen sizes.",
    detail:
      "Kindle eBooks usually use reflowable layout, unlike print PDFs that keep fixed page geometry.",
  },
  {
    slug: "dpi",
    term: "DPI",
    definition:
      "DPI means dots per inch and describes print image resolution quality.",
    detail:
      "Low DPI images look blurry in print. Interiors often target 300 DPI at final print dimensions.",
  },
  {
    slug: "isbn",
    term: "ISBN",
    definition:
      "ISBN is a unique International Standard Book Number that identifies a specific book edition.",
    detail:
      "KDP can assign a free ISBN for eligible titles, or you can supply your own if you want a consistent publisher imprint across retailers.",
  },
  {
    slug: "kdp-select",
    term: "KDP Select",
    definition:
      "KDP Select is an optional enrollment program that makes your eBook exclusive to Amazon in exchange for promotional tools.",
    detail:
      "Enrollment lasts 90 days and includes access to Kindle Unlimited and promotional programs like Free Book Promotion and Countdown Deals.",
  },
  {
    slug: "paperback",
    term: "Paperback",
    definition:
      "Paperback is a softcover print format produced through KDP Print on demand.",
    detail:
      "Paperback files require fixed trim size, margins, gutter, and print-ready PDF output. KDP prints and ships copies when customers order.",
  },
  {
    slug: "margin",
    term: "Margin",
    definition:
      "Margin is the blank space between page content and the trim edge of a printed page.",
    detail:
      "Outer, top, and bottom margins keep text away from edges. Inner margin near the spine is called the gutter and must increase with page count.",
  },
  {
    slug: "spine",
    term: "Spine",
    definition:
      "Spine is the bound edge of a book where pages are glued or stitched together.",
    detail:
      "Spine width depends on page count and paper type. Cover files must include an accurate spine dimension for paperback uploads.",
  },
  {
    slug: "cover",
    term: "Cover",
    definition:
      "Cover is the outer artwork and layout that wraps the front, spine, and back of a print book or displays as the eBook thumbnail.",
    detail:
      "Print covers must match trim size and include bleed where artwork extends to edges. eBook covers are typically JPG files meeting KDP dimension minimums.",
  },
  {
    slug: "metadata",
    term: "Metadata",
    definition:
      "Metadata is the descriptive information about a book, including title, subtitle, author, description, and categories.",
    detail:
      "Accurate metadata helps readers find your book in search and browse. KDP metadata also includes keywords, BISAC categories, and age ranges where applicable.",
  },
  {
    slug: "bisac",
    term: "BISAC",
    definition:
      "BISAC is a standardized book industry category code used to classify titles by subject.",
    detail:
      "KDP asks for up to two BISAC categories during setup. Choosing relevant categories improves discoverability in the right browse paths.",
  },
  {
    slug: "kindle-unlimited",
    term: "Kindle Unlimited",
    definition:
      "Kindle Unlimited is Amazon's subscription reading program where enrolled KDP Select eBooks earn page-read royalties.",
    detail:
      "Only KDP Select eBooks participate. Royalties are calculated from normalized page reads rather than per-unit sales during subscription borrows.",
  },
  {
    slug: "print-on-demand",
    term: "Print on Demand",
    definition:
      "Print on demand means books are manufactured only when a customer places an order, with no upfront inventory.",
    detail:
      "KDP Print uses this model for paperbacks and hardcovers. You upload files once; Amazon handles printing, fulfillment, and customer shipping.",
  },
  {
    slug: "hardcover",
    term: "Hardcover",
    definition:
      "Hardcover is a case-laminate or jacketed print format with a rigid cover, available through KDP Print in select markets.",
    detail:
      "Hardcover files follow similar trim and margin rules as paperback but require cover templates sized for the thicker binding.",
  },
  {
    slug: "front-matter",
    term: "Front Matter",
    definition:
      "Front matter is the preliminary content before the main body, such as title page, copyright, and dedication.",
    detail:
      "Proper front matter structure helps both print pagination and eBook navigation. Keep copyright and ISBN details accurate and consistent across formats.",
  },
];

export const glossaryBySlug = Object.fromEntries(
  glossaryTerms.map((term) => [term.slug, term]),
) as Record<string, GlossaryTerm>;

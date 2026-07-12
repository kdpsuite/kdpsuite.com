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
];

export const glossaryBySlug = Object.fromEntries(
  glossaryTerms.map((term) => [term.slug, term]),
) as Record<string, GlossaryTerm>;

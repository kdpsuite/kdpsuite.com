# SEO audit punch list — 2026-09-04

Site: https://www.kdpsuite.com  
Audit id: `9e2b7276-f169-402a-8a12-a2faab4c9b80`  
Money-page rule used: OpenSEO crawl proxy (user declined to enumerate). Only `/` had crawl depth 0; other pages lacked inbound-link counts in this audit.

## Class 1 — Broken links / 4xx on money pages

None found.

## Class 2 — Titles and metas

All `title-too-long`, `meta-description-too-long`, and `meta-description-too-short` rows from this audit were fixed in-repo (`lib/content/blog-posts.ts`, `lib/content/glossary.ts`).

## Class 3 — Uncrawlable / orphans / link graph

`orphan-page` and `no-outgoing-links` from this audit were addressed with homepage footer links and related links on compare / privacy / terms / tools pages. Re-crawl to confirm.

## Class 4 — Thin content (punted)

Expand or consolidate these pages. OpenSEO howToFix: expand with useful content, noindex, or merge into a stronger page. Owner: content editor (repo: `lib/content/glossary.ts` and page templates).

| URL | wordCount |
| --- | ---: |
| https://www.kdpsuite.com/contact | 44 |
| https://www.kdpsuite.com/compare/book-bolt-alternative | 120 |
| https://www.kdpsuite.com/privacy | 70 |
| https://www.kdpsuite.com/terms | 68 |
| https://www.kdpsuite.com/tools/kdp-royalty-calculator | 38 |
| https://www.kdpsuite.com/glossary/bleed | 39 |
| https://www.kdpsuite.com/glossary/gutter | 31 |
| https://www.kdpsuite.com/glossary/trim-size | 32 |
| https://www.kdpsuite.com/glossary/reflowable-layout | 29 |
| https://www.kdpsuite.com/glossary/dpi | 28 |
| https://www.kdpsuite.com/glossary/bisac | 35 |
| https://www.kdpsuite.com/glossary/cover | 49 |
| https://www.kdpsuite.com/glossary/kindle-unlimited | 36 |
| https://www.kdpsuite.com/glossary/metadata | 39 |
| https://www.kdpsuite.com/glossary/front-matter | 40 |
| https://www.kdpsuite.com/glossary/print-on-demand | 41 |
| https://www.kdpsuite.com/glossary/hardcover | 39 |
| https://www.kdpsuite.com/glossary/isbn | 39 |
| https://www.kdpsuite.com/glossary/margin | 42 |
| https://www.kdpsuite.com/glossary/paperback | 33 |
| https://www.kdpsuite.com/glossary/spine | 36 |
| https://www.kdpsuite.com/glossary/kdp-select | 41 |

Notes:

- Glossary stubs are definition pages by design; expand `definition`/`detail` in `lib/content/glossary.ts` or noindex the set if they should not compete.
- Privacy/terms need fuller legal copy (counsel / founder), not filler.
- Contact and tools need more server-rendered explanatory copy around the form/widget.

## Class 5 — Slow pages / performance

No `slow-response` issues in the summary. Lighthouse completed 20/20 (0 failed).

## Who owns what

| Item | Owner |
| --- | --- |
| Glossary expansion | Content editor |
| Privacy / terms expansion | Legal / founder |
| Contact / tools body copy | Content editor |
| Re-crawl verification | Next MEASURE / act loop |

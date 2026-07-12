# SEO / GEO / AEO Monitoring Runbook

## Weekly Checks

1. Google Search Console:
   - Review index coverage and newly excluded URLs.
   - Review performance for target queries:
     - best amazon kdp software
     - pdf to coloring book converter
     - how to format book for kdp
     - kdp royalty calculator
     - kdp compliance requirements
2. Citation checks:
   - Run each target query in Perplexity and ChatGPT web mode.
   - Record whether `kdpsuite.com` is cited and which URL is used.
3. Freshness check:
   - Confirm `/sitemap.xml` contains all expected routes.
   - Confirm `/llms.txt` links only to live URLs.

## Monthly Checks

1. Bot crawl behavior:
   - Review logs for GPTBot, PerplexityBot, ClaudeBot, Googlebot.
   - Flag sudden crawl drops or 4xx/5xx spikes.
2. Structured data validation:
   - Validate homepage FAQ schema.
   - Validate pricing FAQ schema.
   - Validate each blog `BlogPosting` and breadcrumb schema.
3. Content pruning:
   - Remove or rewrite thin pages before they accumulate.
   - Keep only high-signal pages in sitemap.

## Change Gate

Before publishing major content or metadata changes:

1. Confirm canonical URL and title/description are unique.
2. Confirm page is in `app/sitemap.ts` if indexable.
3. Confirm page appears (or intentionally does not appear) in `public/llms.txt`.
4. Run lint + typecheck.

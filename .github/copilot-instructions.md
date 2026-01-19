# AI Coding Agent Instructions for KDP Creator Suite Landing

## Project Overview
KDP Creator Suite is a **Next.js 15 landing page and SaaS platform** for Amazon KDP (Kindle Direct Publishing) tools. The site combines marketing/sales pages with authenticated user features, payment processing, and backend integrations.

## Architecture & Key Integration Points

### Core Tech Stack
- **Framework**: Next.js 15.5.9 (App Router with Turbopack)
- **Auth**: Supabase (email/password via `/api/auth/signup`, `/api/auth/login`, `/api/auth/logout`)
- **Payments**: Stripe (subscription checkout via `/api/stripe/checkout`)
- **Database**: Supabase PostgreSQL with RLS policies (`user_profiles` table)
- **Email**: Nodemailer (contact forms, waitlist via `/api/newsletter/subscribe`)
- **Styling**: Tailwind CSS 4 + PostCSS
- **Frontend State**: React Context (AuthContext in `lib/auth-context.tsx`)

### Data Flow
1. **Authentication**: Form submission → POST `/api/auth/signup` → Supabase Admin API → User Profile created + stored in localStorage
2. **Payments**: Pricing page → POST `/api/stripe/checkout` → Stripe Session → Redirect to checkout
3. **Email Capture**: Waitlist/Newsletter form → POST `/api/waitlist` or `/api/newsletter/subscribe` → Nodemailer
4. **Webhooks**: Stripe webhook at `/api/stripe/webhook` (processes subscription events; has `no-explicit-any` ESLint exception)

### Critical Files to Know
- [lib/supabase.ts](lib/supabase.ts) - Supabase client initialization
- [lib/stripe.ts](lib/stripe.ts) - Stripe SDK, pricing plan definitions, price IDs
- [lib/auth-context.tsx](lib/auth-context.tsx) - React Context for user state, session management (localStorage-based)
- [lib/protected-route.tsx](lib/protected-route.tsx) - Auth guard for dashboard/protected pages
- [app/layout.tsx](app/layout.tsx) - Global metadata, fonts (Montserrat headings, Lato body), Vercel Analytics
- [app/page.tsx](app/page.tsx) - Homepage with countdown timer (hardcoded launch date: 2025-11-17)

## Development Workflow

### Local Development
```bash
npm run dev           # Starts Next.js with Turbopack on localhost:3000
npm run build         # Production build with Turbopack
npm run lint          # ESLint check
npm start             # Production server
```

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
NEXT_PUBLIC_APP_URL (e.g., https://kdpsuite.com for production)
```

### Key Deployment Platform
- **Vercel** (primary) - configured in [vercel.json](vercel.json)
- Branch deployments via GitHub integration
- SEO metadata and structured data (Schema.org) already in place

## Code Patterns & Conventions

### TypeScript Configuration
- Strict mode enabled (`"strict": true`)
- Path alias: `@/*` → root of project (e.g., `@/lib/supabase.ts`)
- ESLint extends `next/core-web-vitals` + `next/typescript`
- **Exception**: Stripe webhook file has `@typescript-eslint/no-explicit-any` disabled

### Component Patterns
- **Page Router**: Client components use `'use client'` directive (e.g., `app/page.tsx`, auth pages)
- **Server Components**: API routes + layouts are server-side by default
- **Client State**: React Context for auth (localStorage persistence), local useState for forms
- **Forms**: Uncontrolled inputs with FormEvent handler, email validation via regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`

### API Route Pattern
```typescript
// POST handler structure (e.g., /api/auth/signup)
export async function POST(request: NextRequest) {
  try {
    const { field } = await request.json();
    // Validation → Database/Service call → Return NextResponse.json()
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 500 });
  }
}
```

### Supabase Patterns
- **Client-side**: Use anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
- **Server-side (API routes)**: Use service role key (SUPABASE_SERVICE_ROLE_KEY) for admin operations
- **Auth flow**: `supabase.auth.admin.createUser()` in signup → auto-trigger `on_auth_user_created` function → inserts into `user_profiles`
- **RLS Policies**: User_profiles has RLS enabled; users can only read/update their own profiles

### Stripe Integration
- **Price IDs**: Defined as constants in [lib/stripe.ts](lib/stripe.ts) (e.g., `price_starter_monthly`)
- **Checkout**: POST `/api/stripe/checkout` with `{ priceId, email }` → returns `{ sessionId, url }`
- **Webhook**: Verifies Stripe signature; updates subscription status in database

## Brand & Styling
- **Colors**: Deep Pink `#E91E63`, Black `#000000`, Neutral Gray `#333333`
- **Fonts**: Montserrat (headings, weights 400-800), Lato (body, weights 400, 700)
- **Tailwind**: Customizable via `tailwind.config.ts`; uses `container` class for layout max-width

## Component Library
Landing page sections in [components/](components/):
- `NewsletterSignup.tsx`, `WebinarSignup.tsx` - Email capture
- `PricingComparison.tsx`, `ReferralProgram.tsx`, `CaseStudies.tsx` - Marketing
- `IntercomChat.tsx` - Live chat widget
- `GoogleAdsenseBanner.tsx`, `SidebarAd.tsx`, `NativeAd.tsx` - Ad components
- Reusable: `TrustBadges.tsx`, `Testimonials.tsx`, `FAQ.tsx`, `Stats.tsx`

## Testing & Validation
- **No Jest/Vitest** setup currently - use manual testing locally
- **Common test paths**: Waitlist form, auth flow (signup/login), pricing page, Stripe checkout, contact form
- **Email validation** in signup: minimum 8-char password, email format check
- **Countdown timer** recalculates every second; updates `timeLeft` state

## Important Notes
- **Vercel Analytics** loaded in layout; tracks page views automatically
- **Intercom** integration available via `IntercomChat.tsx` (requires Intercom workspace ID)
- **Blog section** exists (`/blog`) but templates in `/blog/[slug]/page.tsx` need content implementation
- **Dashboard** route (`/dashboard`) requires authentication via `protected-route.tsx`
- **Nodemailer** configured but email credentials need env setup for outbound emails
- **pnpm** is the package manager (see `pnpm-lock.yaml`, `pnpm-workspace.yaml`)

## When Adding Features
1. **New API routes**: Place in `app/api/` following the folder-per-endpoint pattern
2. **New pages**: Create in `app/` with optional dynamic routes via `[param]/`
3. **New components**: Place in `components/` with descriptive names
4. **Database changes**: Update Supabase schema SQL in documentation, add migration notes
5. **Environment vars**: Add to `.env.local` locally and Vercel project settings
6. **Stripe changes**: Update price IDs in `lib/stripe.ts` and update checkout references

---
**Last Updated**: January 2026 | **Version**: 1.0.0

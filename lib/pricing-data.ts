export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year' | 'lifetime';
  description: string;
  features: string[];
  stripePriceId: string;
  spots?: number;
  badgeText?: string;
  savings?: string;
}

// ========== FOUNDING CAMPAIGN PRICING (Lifetime Memberships) ==========
// These are the early-bird campaign pricing tiers - pay once, use forever
// Campaign runs until 1,185 total spots are sold out
export const foundingCampaignPlans: PricingPlan[] = [
  {
    id: 'starter_founding',
    name: 'Starter',
    price: 99,
    currency: 'usd',
    interval: 'lifetime',
    description: 'Perfect for individual KDP creators',
    spots: 300,
    badgeText: 'EARLY BIRD',
    savings: '10-Year Savings: $3,381 vs. $29/month',
    features: [
      'All core features',
      'AI coloring book converter',
      '500+ templates',
      'Smart formatting',
      'Royalty calculator',
      'Founding member badge',
      'Beta access before public launch',
    ],
    stripePriceId: 'https://buy.stripe.com/00w3cu6iycwQ99X66gc7u00',
  },
  {
    id: 'professional_founding',
    name: 'Professional',
    price: 249,
    currency: 'usd',
    interval: 'lifetime',
    description: 'For scaling KDP publishers',
    spots: 250,
    badgeText: 'MOST POPULAR',
    savings: '10-Year Savings: $9,231 vs. $79/month',
    features: [
      'Everything in Starter, plus:',
      'Unlimited batch processing',
      'Advanced analytics',
      'Priority support',
      'Custom template requests',
      'Early access to new features',
      'Unique member number',
    ],
    stripePriceId: 'https://buy.stripe.com/5kQaEW36m0O8fyl52cc7u01',
  },
  {
    id: 'enterprise_founding',
    name: 'Enterprise',
    price: 499,
    currency: 'usd',
    interval: 'lifetime',
    description: 'For publishing teams and studios',
    spots: 150,
    badgeText: 'FOR TEAMS',
    savings: '10-Year Savings: $23,381 vs. $199/month',
    features: [
      'Everything in Professional, plus:',
      'Multi-user collaboration',
      'Team workspaces',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'API access',
    ],
    stripePriceId: 'https://buy.stripe.com/bJe4gy9uK40kgCp0LWc7u02',
  },
  {
    id: 'founders_circle',
    name: "Founder's Circle",
    price: 9999,
    currency: 'usd',
    interval: 'lifetime',
    description: 'Your name on the app splash screen forever',
    spots: 10,
    badgeText: 'DIGITAL IMMORTALITY',
    savings: 'Legacy positioning + Enterprise access',
    features: [
      'Everything in Enterprise, plus:',
      'Name on app splash screen forever',
      'Monthly advisory calls with founder',
      'Direct product roadmap influence',
      '5% referral revenue share',
      'Physical engraved plaque',
    ],
    stripePriceId: 'https://buy.stripe.com/eVqcN45eu1Sc5XLfGQc7u03',
  },
];

// ========== REGULAR MONTHLY PRICING (Post-Campaign) ==========
// These pricing tiers become available AFTER all 1,185 founding spots are sold out
// Monthly subscriptions for regular customers who missed the founding campaign
export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    currency: 'usd',
    interval: 'month',
    description: 'Perfect for beginners just starting their KDP journey',
    features: [
      'Up to 10 books per month',
      'Basic PDF to Coloring Book conversion',
      'Email support',
      'Basic analytics',
    ],
    stripePriceId: 'price_starter_monthly', // Replace with actual Stripe price ID
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    currency: 'usd',
    interval: 'month',
    description: 'For serious publishers scaling their business',
    features: [
      'Unlimited books per month',
      'Advanced AI-powered publishing tools',
      'Priority email & chat support',
      'Advanced analytics & reporting',
      'Batch image processing',
      'KDP compliance validation',
    ],
    stripePriceId: 'price_professional_monthly', // Replace with actual Stripe price ID
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    currency: 'usd',
    interval: 'month',
    description: 'For large-scale publishing operations',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      'White-label options',
      '24/7 phone support',
    ],
    stripePriceId: 'price_enterprise_monthly', // Replace with actual Stripe price ID
  },
];

/** Price IDs accepted by /api/stripe/checkout. Env list overrides/extends plan IDs. */
export function getAllowedCheckoutPriceIds(): Set<string> {
  const fromPlans = pricingPlans
    .map((plan) => plan.stripePriceId)
    .filter((id) => id.startsWith('price_') && !id.includes('://'));

  const fromEnv = (process.env.STRIPE_ALLOWED_PRICE_IDS || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);

  return new Set([...fromPlans, ...fromEnv]);
}

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-10-29.clover',
});

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  description: string;
  features: string[];
  stripePriceId: string;
}

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


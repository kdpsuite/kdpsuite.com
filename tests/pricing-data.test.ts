import { afterEach, describe, expect, it } from 'vitest';
import { getAllowedCheckoutPriceIds } from '../lib/pricing-data';

const originalEnv = process.env.STRIPE_ALLOWED_PRICE_IDS;

describe('getAllowedCheckoutPriceIds', () => {
  afterEach(() => {
    process.env.STRIPE_ALLOWED_PRICE_IDS = originalEnv;
  });

  it('includes monthly checkout price IDs and ignores payment links', () => {
    process.env.STRIPE_ALLOWED_PRICE_IDS = '';

    const allowed = getAllowedCheckoutPriceIds();
    expect(allowed.has('price_starter_monthly')).toBe(true);
    expect(allowed.has('price_professional_monthly')).toBe(true);
    expect(allowed.has('price_enterprise_monthly')).toBe(true);
    expect(allowed.has('https://buy.stripe.com/00w3cu6iycwQ99X66gc7u00')).toBe(false);
  });

  it('includes explicit env allowlist overrides', () => {
    process.env.STRIPE_ALLOWED_PRICE_IDS = 'price_custom_one, price_custom_two';

    const allowed = getAllowedCheckoutPriceIds();
    expect(allowed.has('price_custom_one')).toBe(true);
    expect(allowed.has('price_custom_two')).toBe(true);
  });
});

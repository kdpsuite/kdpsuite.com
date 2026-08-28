import { describe, expect, it } from 'vitest';
import {
  getNewsletterProvider,
  isValidNewsletterEmail,
  normalizeNewsletterEmail,
} from '../lib/newsletter';

describe('newsletter helpers', () => {
  it('normalizes and validates email addresses', () => {
    expect(normalizeNewsletterEmail('  Test@Example.COM  ')).toBe('test@example.com');
    expect(isValidNewsletterEmail('valid@example.com')).toBe(true);
    expect(isValidNewsletterEmail('not-an-email')).toBe(false);
  });

  it('returns null when NEWSLETTER_PROVIDER is unset', () => {
    const original = process.env.NEWSLETTER_PROVIDER;
    delete process.env.NEWSLETTER_PROVIDER;
    expect(getNewsletterProvider()).toBeNull();
    process.env.NEWSLETTER_PROVIDER = original;
  });

  it('accepts configured provider values', () => {
    const original = process.env.NEWSLETTER_PROVIDER;
    process.env.NEWSLETTER_PROVIDER = 'mailchimp';
    expect(getNewsletterProvider()).toBe('mailchimp');
    process.env.NEWSLETTER_PROVIDER = 'brevo';
    expect(getNewsletterProvider()).toBe('brevo');
    process.env.NEWSLETTER_PROVIDER = original;
  });
});

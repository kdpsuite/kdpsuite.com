import { describe, expect, it } from 'vitest';
import {
  DEFAULT_COMMISSION_RATE,
  isValidReferrerId,
  REFERRAL_COOKIE_NAME,
} from '../lib/referral';

describe('referral helpers', () => {
  it('validates referrer IDs', () => {
    expect(isValidReferrerId('abc123')).toBe(true);
    expect(isValidReferrerId('user-id_42')).toBe(true);
    expect(isValidReferrerId('bad id!')).toBe(false);
    expect(isValidReferrerId('')).toBe(false);
  });

  it('exposes stable referral constants', () => {
    expect(REFERRAL_COOKIE_NAME).toBe('kdp_ref');
    expect(DEFAULT_COMMISSION_RATE).toBe(0.3);
  });
});

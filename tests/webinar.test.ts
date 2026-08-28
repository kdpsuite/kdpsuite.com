import { describe, expect, it } from 'vitest';
import {
  isValidWebinarEmail,
  normalizeWebinarEmail,
} from '../lib/webinar';

describe('webinar helpers', () => {
  it('normalizes webinar emails', () => {
    expect(normalizeWebinarEmail('  User@Site.COM ')).toBe('user@site.com');
  });

  it('validates webinar emails', () => {
    expect(isValidWebinarEmail('user@site.com')).toBe(true);
    expect(isValidWebinarEmail('bad-email')).toBe(false);
  });
});

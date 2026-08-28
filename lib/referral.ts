import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { NextRequest, NextResponse } from 'next/server';

export const REFERRAL_COOKIE_NAME = 'kdp_ref';
export const REFERRAL_COOKIE_MAX_AGE = 30 * 24 * 60 * 60;
export const DEFAULT_COMMISSION_RATE = 0.3;

const REFERRER_ID_REGEX = /^[a-zA-Z0-9_-]{1,64}$/;

export interface ReferralStats {
  referralCount: number;
  totalEarned: number;
  commissionRate: number;
  referralCode: string;
}

export function isValidReferrerId(referrerId: string): boolean {
  return REFERRER_ID_REGEX.test(referrerId);
}

export function getReferralCodeFromRequest(request: NextRequest): string | null {
  const ref = request.nextUrl.searchParams.get('ref');
  if (!ref || !isValidReferrerId(ref)) {
    return null;
  }
  return ref;
}

export function setReferralCookie(response: NextResponse, referrerId: string): void {
  response.cookies.set(REFERRAL_COOKIE_NAME, referrerId, {
    maxAge: REFERRAL_COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

export function getReferralCodeFromCookie(request: NextRequest): string | null {
  const ref = request.cookies.get(REFERRAL_COOKIE_NAME)?.value;
  if (!ref || !isValidReferrerId(ref)) {
    return null;
  }
  return ref;
}

export function createReferralSupabaseClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function recordReferralSignup(
  referrerId: string,
  referredEmail: string
): Promise<void> {
  const supabase = createReferralSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  if (!isValidReferrerId(referrerId)) {
    throw new Error('Invalid referrer ID');
  }

  const normalizedEmail = referredEmail.toLowerCase().trim();

  const { data: referrerProfile } = await supabase
    .from('user_profiles')
    .select('id, email')
    .eq('id', referrerId)
    .maybeSingle();

  if (!referrerProfile) {
    return;
  }

  if (referrerProfile.email?.toLowerCase() === normalizedEmail) {
    return;
  }

  const { data: existing } = await supabase
    .from('referrals')
    .select('id')
    .eq('referred_email', normalizedEmail)
    .maybeSingle();

  if (existing) {
    return;
  }

  const { error } = await supabase.from('referrals').insert({
    referrer_id: referrerId,
    referred_email: normalizedEmail,
    status: 'pending',
    commission: 0,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getReferralStatsForUser(userId: string): Promise<ReferralStats> {
  const supabase = createReferralSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const { data, error } = await supabase
    .from('referrals')
    .select('commission, status')
    .eq('referrer_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  const referrals = data ?? [];
  const referralCount = referrals.length;
  const totalEarned = referrals.reduce((sum, row) => sum + Number(row.commission ?? 0), 0);

  return {
    referralCount,
    totalEarned,
    commissionRate: DEFAULT_COMMISSION_RATE,
    referralCode: userId,
  };
}

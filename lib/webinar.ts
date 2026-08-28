import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class WebinarConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WebinarConfigError';
  }
}

export class WebinarRegistrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WebinarRegistrationError';
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeWebinarEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function isValidWebinarEmail(email: string): boolean {
  return EMAIL_REGEX.test(normalizeWebinarEmail(email));
}

export function createWebinarSupabaseClient(): SupabaseClient | null {
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

export async function registerForWebinar(
  email: string,
  source: string = 'website'
): Promise<void> {
  if (!isValidWebinarEmail(email)) {
    throw new WebinarRegistrationError('Invalid email address');
  }

  const supabase = createWebinarSupabaseClient();
  if (!supabase) {
    throw new WebinarConfigError('Supabase is not configured');
  }

  const normalizedEmail = normalizeWebinarEmail(email);

  const { data: existing, error: lookupError } = await supabase
    .from('webinar_registrations')
    .select('id')
    .eq('email', normalizedEmail)
    .maybeSingle();

  if (lookupError) {
    throw new WebinarRegistrationError(lookupError.message);
  }

  if (existing) {
    return;
  }

  const { error: insertError } = await supabase.from('webinar_registrations').insert({
    email: normalizedEmail,
    source,
  });

  if (insertError) {
    throw new WebinarRegistrationError(insertError.message);
  }
}

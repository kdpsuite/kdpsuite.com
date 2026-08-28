export type NewsletterProvider = 'mailchimp' | 'brevo';

export class NewsletterConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NewsletterConfigError';
  }
}

export class NewsletterSubscribeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NewsletterSubscribeError';
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeNewsletterEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function isValidNewsletterEmail(email: string): boolean {
  return EMAIL_REGEX.test(normalizeNewsletterEmail(email));
}

export function getNewsletterProvider(): NewsletterProvider | null {
  const provider = process.env.NEWSLETTER_PROVIDER?.toLowerCase();
  if (provider === 'mailchimp' || provider === 'brevo') {
    return provider;
  }
  return null;
}

function getMailchimpConfig(): { apiKey: string; listId: string; serverPrefix: string } {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  if (!apiKey || !listId) {
    throw new NewsletterConfigError('MAILCHIMP_API_KEY and MAILCHIMP_LIST_ID are required');
  }

  const serverPrefix = apiKey.split('-').pop();
  if (!serverPrefix) {
    throw new NewsletterConfigError('Invalid MAILCHIMP_API_KEY format');
  }

  return { apiKey, listId, serverPrefix };
}

function getBrevoConfig(): { apiKey: string; listId: number } {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  if (!apiKey || !listId) {
    throw new NewsletterConfigError('BREVO_API_KEY and BREVO_LIST_ID are required');
  }

  const parsedListId = Number.parseInt(listId, 10);
  if (Number.isNaN(parsedListId)) {
    throw new NewsletterConfigError('BREVO_LIST_ID must be a number');
  }

  return { apiKey, listId: parsedListId };
}

async function subscribeWithMailchimp(email: string): Promise<void> {
  const { apiKey, listId, serverPrefix } = getMailchimpConfig();
  const normalizedEmail = normalizeNewsletterEmail(email);

  const response = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: normalizedEmail,
        status: 'subscribed',
      }),
    }
  );

  if (response.ok) {
    return;
  }

  const payload = (await response.json().catch(() => null)) as { title?: string } | null;
  if (response.status === 400 && payload?.title === 'Member Exists') {
    return;
  }

  throw new NewsletterSubscribeError(
    payload?.title || `Mailchimp request failed (${response.status})`
  );
}

async function subscribeWithBrevo(email: string): Promise<void> {
  const { apiKey, listId } = getBrevoConfig();
  const normalizedEmail = normalizeNewsletterEmail(email);

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: normalizedEmail,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (response.ok || response.status === 204) {
    return;
  }

  const payload = (await response.json().catch(() => null)) as { message?: string } | null;
  if (response.status === 400 && payload?.message?.includes('already exist')) {
    return;
  }

  throw new NewsletterSubscribeError(
    payload?.message || `Brevo request failed (${response.status})`
  );
}

export async function subscribeToNewsletter(email: string): Promise<void> {
  if (!isValidNewsletterEmail(email)) {
    throw new NewsletterSubscribeError('Invalid email address');
  }

  const provider = getNewsletterProvider();
  if (!provider) {
    throw new NewsletterConfigError('NEWSLETTER_PROVIDER is not configured');
  }

  switch (provider) {
    case 'mailchimp':
      await subscribeWithMailchimp(email);
      break;
    case 'brevo':
      await subscribeWithBrevo(email);
      break;
    default: {
      const _exhaustive: never = provider;
      throw new NewsletterConfigError(`Unsupported provider: ${_exhaustive}`);
    }
  }
}

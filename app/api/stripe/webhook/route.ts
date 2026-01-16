import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionEvent(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionEvent(subscription: Record<string, any>) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return;
  }

  const customerEmail = subscription.metadata?.email;

  if (!customerEmail) {
    console.warn('No email found in subscription metadata');
    return;
  }

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('email', customerEmail)
    .single();

  if (!user) {
    console.warn(`User not found for email: ${customerEmail}`);
    return;
  }

  const { error } = await supabase.from('subscriptions').upsert(
    {
      user_id: user.id,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
      plan_id: subscription.items.data[0]?.price.id,
      updated_at: new Date(),
    },
    { onConflict: 'stripe_subscription_id' }
  );

  if (error) {
    console.error('Error updating subscription in Supabase:', error);
  }
}

async function handleSubscriptionCanceled(subscription: Record<string, any>) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return;
  }

  const { error } = await supabase
    .from('subscriptions')
    .update({ status: 'canceled', updated_at: new Date() })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating canceled subscription:', error);
  }
}

async function handleInvoicePaymentSucceeded(invoice: Record<string, any>) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return;
  }

  const { error } = await supabase.from('invoices').upsert(
    {
      stripe_invoice_id: invoice.id,
      stripe_customer_id: invoice.customer,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: 'paid',
      paid_at: new Date(invoice.paid_date * 1000),
      updated_at: new Date(),
    },
    { onConflict: 'stripe_invoice_id' }
  );

  if (error) {
    console.error('Error recording paid invoice:', error);
  }
}

async function handleInvoicePaymentFailed(invoice: Record<string, any>) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return;
  }

  const { error } = await supabase.from('invoices').upsert(
    {
      stripe_invoice_id: invoice.id,
      stripe_customer_id: invoice.customer,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: 'failed',
      updated_at: new Date(),
    },
    { onConflict: 'stripe_invoice_id' }
  );

  if (error) {
    console.error('Error recording failed invoice:', error);
  }
}


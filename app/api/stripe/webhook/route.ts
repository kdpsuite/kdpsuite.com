import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

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

  // Create Supabase client within the function
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const supabase = supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

  if (!supabase) {
    console.error('Supabase client not initialized - missing environment variables');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionEvent(supabase, event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(supabase, event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(supabase, event.data.object);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(supabase, event.data.object);
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

async function handleSubscriptionEvent(supabase: any, subscription: Record<string, any>) {
  const customerEmail = subscription.metadata?.email;

  if (!customerEmail) {
    console.warn('No email found in subscription metadata');
    return;
  }

  // Query user_profiles instead of users table
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('email', customerEmail)
    .single();

  if (!userProfile) {
    console.warn(`User profile not found for email: ${customerEmail}`);
    return;
  }

  // Update user_profiles with subscription information
  const { error: profileError } = await supabase
    .from('user_profiles')
    .update({
      stripe_customer_id: subscription.customer,
      subscription_id: subscription.id,
      subscription_plan: subscription.items.data[0]?.price.id,
      subscription_status: subscription.status,
      subscription_start_date: new Date(subscription.current_period_start * 1000).toISOString(),
      subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', userProfile.id);

  if (profileError) {
    console.error('Failed to update user profile with subscription:', profileError);
    return;
  }

  // Also upsert into subscriptions table for historical tracking
  const { error: subscriptionError } = await supabase.from('subscriptions').upsert(
    {
      user_id: userProfile.id,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      plan_id: subscription.items.data[0]?.price.id,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'stripe_subscription_id' }
  );

  if (subscriptionError) {
    console.error('Failed to upsert subscription record:', subscriptionError);
  }
}

async function handleSubscriptionCanceled(supabase: any, subscription: Record<string, any>) {
  // Update user_profiles to reflect canceled subscription
  const { error } = await supabase
    .from('user_profiles')
    .update({
      subscription_status: 'cancelled',
      subscription_end_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', subscription.customer);

  if (error) {
    console.error('Failed to update subscription status on cancellation:', error);
  }

  // Also update subscriptions table
  const { error: subscriptionError } = await supabase
    .from('subscriptions')
    .update({
      status: 'cancelled',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (subscriptionError) {
    console.error('Failed to update subscription record on cancellation:', subscriptionError);
  }
}

async function handleInvoicePaymentSucceeded(supabase: any, invoice: Record<string, any>) {
  const customerEmail = invoice.customer_email;

  if (!customerEmail) {
    console.warn('No email found in invoice');
    return;
  }

  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('email', customerEmail)
    .single();

  if (!userProfile) {
    console.warn(`User profile not found for email: ${customerEmail}`);
    return;
  }

  // Upsert invoice record
  const { error } = await supabase.from('invoices').upsert(
    {
      user_id: userProfile.id,
      stripe_invoice_id: invoice.id,
      stripe_customer_id: invoice.customer,
      amount_paid: invoice.amount_paid,
      currency: invoice.currency,
      status: invoice.status,
      invoice_date: new Date(invoice.created * 1000).toISOString(),
      due_date: invoice.due_date ? new Date(invoice.due_date * 1000).toISOString() : null,
      paid_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'stripe_invoice_id' }
  );

  if (error) {
    console.error('Failed to upsert invoice record:', error);
  }
}

async function handleInvoicePaymentFailed(supabase: any, invoice: Record<string, any>) {
  const customerEmail = invoice.customer_email;

  if (!customerEmail) {
    console.warn('No email found in invoice');
    return;
  }

  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('email', customerEmail)
    .single();

  if (!userProfile) {
    console.warn(`User profile not found for email: ${customerEmail}`);
    return;
  }

  // Update user_profiles to reflect payment failure
  const { error: profileError } = await supabase
    .from('user_profiles')
    .update({
      subscription_status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('id', userProfile.id);

  if (profileError) {
    console.error('Failed to update subscription status on payment failure:', profileError);
  }

  // Upsert invoice record with failed status
  const { error: invoiceError } = await supabase.from('invoices').upsert(
    {
      user_id: userProfile.id,
      stripe_invoice_id: invoice.id,
      stripe_customer_id: invoice.customer,
      amount_paid: invoice.amount_paid,
      currency: invoice.currency,
      status: 'failed',
      invoice_date: new Date(invoice.created * 1000).toISOString(),
      due_date: invoice.due_date ? new Date(invoice.due_date * 1000).toISOString() : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'stripe_invoice_id' }
  );

  if (invoiceError) {
    console.error('Failed to upsert invoice record:', invoiceError);
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase not configured - missing environment variables');
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing authorization' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // Verify token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user profile with subscription data
    // Note: Ensure these columns exist in your Supabase user_profiles table
    const { data, error } = await supabase
      .from('user_profiles')
      .select('stripe_customer_id, subscription_id, subscription_plan, subscription_status, subscription_start_date, subscription_end_date')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Database fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Subscription fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

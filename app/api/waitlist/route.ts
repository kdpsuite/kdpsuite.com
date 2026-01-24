import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with service role for API routes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists in waitlist
    const { data: existing, error: checkError } = await supabase
      .from('waitlist_signups')
      .select('email')
      .eq('email', normalizedEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows found (expected for new emails)
      console.error('Error checking waitlist:', checkError);
      return NextResponse.json(
        { error: 'An error occurred while processing your request' },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    // Insert new entry
    const { data: newEntry, error: insertError } = await supabase
      .from('waitlist_signups')
      .insert({
        email: normalizedEmail,
        source: 'landing_page',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error adding to waitlist:', insertError);
      return NextResponse.json(
        { error: 'Failed to add email to waitlist' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully added to waitlist',
        entry: newEntry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Get all waitlist entries
    const { data: entries, error } = await supabase
      .from('waitlist_signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching waitlist:', error);
      return NextResponse.json(
        { error: 'Failed to fetch waitlist' },
        { status: 500 }
      );
    }

    if (action === 'count') {
      return NextResponse.json({ count: entries?.length || 0 });
    }

    // Return all entries
    return NextResponse.json({
      entries: entries || [],
      total: entries?.length || 0,
    });
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


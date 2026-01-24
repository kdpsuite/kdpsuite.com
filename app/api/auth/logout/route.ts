import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { message: 'Logged out successfully (partial)' },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Sign out the user
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error);
      // Still consider it a successful logout on client side
    }

    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  }
}
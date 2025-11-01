import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Simple file-based storage for waitlist (will work on Vercel with serverless functions)
const DATA_DIR = '/tmp';
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.json');

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeWaitlist(entries: WaitlistEntry[]): Promise<void> {
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2));
}

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

    // Read existing waitlist
    const waitlist = await readWaitlist();

    // Check for duplicates
    const exists = waitlist.some(entry => entry.email === normalizedEmail);
    if (exists) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    // Add new entry
    const newEntry: WaitlistEntry = {
      id: Date.now().toString(),
      email: normalizedEmail,
      created_at: new Date().toISOString(),
    };

    waitlist.push(newEntry);
    await writeWaitlist(waitlist);

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

    const waitlist = await readWaitlist();

    if (action === 'count') {
      return NextResponse.json({ count: waitlist.length });
    }

    // Return all entries
    return NextResponse.json({ 
      entries: waitlist.reverse(), 
      total: waitlist.length 
    });
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


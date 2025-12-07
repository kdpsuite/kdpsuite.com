import { NextRequest, NextResponse } from 'next/server';

/**
 * Webinar Registration API Route
 * Handles free demo/webinar signups
 */

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // TODO: Integrate with calendar/webinar service
    // Example for Calendly, Zoom, or similar:
    // const response = await fetch('https://api.calendly.com/event_types', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.CALENDLY_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // });

    // For now, log the registration
    console.log('Webinar registration:', email, new Date().toISOString());

    // In production, save to database and send confirmation email
    // await db.webinarRegistration.create({ email, registeredAt: new Date() });

    return NextResponse.json(
      { success: true, message: 'Successfully registered for webinar' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Webinar registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register for webinar' },
      { status: 500 }
    );
  }
}

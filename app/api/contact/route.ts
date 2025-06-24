import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, usn, specialization, email, message } = await req.json();

    // Hardcoded EmailJS credentials
    const serviceID = 'service_6yd60g2';
    const templateID = 'template_1118eta';
    const userID = 'qx2jxijBdwq8Vvg0C';

    const templateParams = {
      name,
      usn,
      specialization,
      email,
      message,
    };

    // Use EmailJS REST API directly
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: templateParams,
      }),
    });

    let data = null;
    try {
      data = await response.json();
    } catch (jsonErr) {
      // If response is not JSON, ignore
    }

    if (!response.ok) {
      console.error('EmailJS response error:', data || response.statusText);
      return NextResponse.json({ error: data || response.statusText || 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('EmailJS fetch error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 
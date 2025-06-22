import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, usn, specialization, email, message } = await req.json();

    const serviceID = process.env.EMAILJS_SERVICE_ID || '';
    const templateID = process.env.EMAILJS_TEMPLATE_ID || '';
    const userID = process.env.EMAILJS_USER_ID || '';

    const templateParams = {
      name,
      usn,
      specialization,
      email,
      message,
    };

    // Use EmailJS REST API directly (emailjs-com is for client-side)
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

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
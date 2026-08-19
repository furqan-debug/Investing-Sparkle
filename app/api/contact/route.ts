import { NextResponse } from 'next/server';

/**
 * Contact form endpoint.
 *
 * TODO — connect this to a transactional email provider (Resend, Postmark,
 * SendGrid) so submissions actually land in the inbox. Resend example:
 *
 *   const res = await fetch('https://api.resend.com/emails', {
 *     method: 'POST',
 *     headers: {
 *       Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
 *       'Content-Type': 'application/json',
 *     },
 *     body: JSON.stringify({
 *       from: 'website@investingsparkle.com',
 *       to: 'support@investingsparkle.com',
 *       reply_to: email,
 *       subject: `[${interest}] Website enquiry from ${name}`,
 *       text: message,
 *     }),
 *   });
 *
 * Whatever you use, send from a domain with SPF, DKIM, and DMARC configured —
 * without those, these emails land in spam.
 */

type Payload = {
  name?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  interest?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { error: 'Name, a valid email address, and a message are required.' },
      { status: 400 }
    );
  }

  // Simple length guard — the form has no captcha by design (the plan rules out
  // bot-detection friction), so keep payloads bounded.
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'That message is too long.' }, { status: 400 });
  }

  // ---------------------------------------------------------------------
  // TODO: replace with the real email send.
  // ---------------------------------------------------------------------
  if (process.env.NODE_ENV === 'production') {
    console.error('[contact] Email provider is not configured — submission dropped.');
    return NextResponse.json(
      { error: 'The contact form is not connected yet. Please use WhatsApp or email.' },
      { status: 503 }
    );
  }

  console.info('[contact] (dev) would send enquiry from', email);
  return NextResponse.json({ ok: true });
}

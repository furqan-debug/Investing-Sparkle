import { NextResponse } from 'next/server';

/**
 * Newsletter subscription endpoint.
 *
 * TODO — connect this to your email provider. Two things to do:
 *
 *   1. Set the provider credentials in .env.local (see .env.example).
 *   2. Replace the marked block below with the provider call.
 *
 * ConvertKit example:
 *   await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ api_key: process.env.CONVERTKIT_API_KEY, email }),
 *   });
 *
 * Whichever provider you choose, turn ON double opt-in in its settings — the
 * pre-launch checklist requires it, and it is what keeps deliverability healthy.
 */

export async function POST(request: Request) {
  let email: unknown;

  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
  }

  // ---------------------------------------------------------------------
  // TODO: replace with the real provider call.
  // Until this is wired up the endpoint accepts the address and drops it,
  // so the form must not be considered working. This deliberately fails
  // loudly in production rather than silently pretending to succeed.
  // ---------------------------------------------------------------------
  if (process.env.NODE_ENV === 'production') {
    console.error('[subscribe] Newsletter provider is not configured — subscription dropped.');
    return NextResponse.json(
      { error: 'Newsletter signup is not connected yet.' },
      { status: 503 }
    );
  }

  console.info(`[subscribe] (dev) would subscribe: ${email}`);
  return NextResponse.json({ ok: true });
}

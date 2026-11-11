import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { site } from '@/content/site';
import { SESSION_COOKIE, readSession } from '@/lib/auth';

/**
 * Result hand-off for the signed-in tools.
 *
 * The visitor is already authenticated by the time this is called, so the
 * identity comes from the signed session cookie rather than the request body.
 * Nothing a caller sends can change who the lead is recorded as.
 *
 * Delivery through Resend is best-effort. The visitor's result must never be
 * blocked because our inbox is unavailable, so a failed send still returns ok.
 *
 * The WhatsApp hand-off happens in the browser as a click-to-chat link. WhatsApp
 * does not allow a website to send a message to someone who has not messaged
 * the business first, and a template would need approval before it could carry
 * a personalised result.
 */

const TOOLS = new Set(['risk-profile', 'zakat']);

type Payload = {
  tool?: unknown;
  result?: unknown;
  /** Honeypot. Real people never see this field. */
  company?: unknown;
};

export async function POST(request: Request) {
  const jar = await cookies();
  const user = readSession(jar.get(SESSION_COOKIE)?.value);

  if (!user) {
    return NextResponse.json({ error: 'Sign in to send a result.' }, { status: 401 });
  }

  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof body.company === 'string' && body.company.trim()) {
    // Pretend it worked. Telling a bot why it failed only helps it adapt.
    return NextResponse.json({ ok: true, delivered: false });
  }

  const tool = typeof body.tool === 'string' ? body.tool : '';
  const result = typeof body.result === 'string' ? body.result.trim() : '';

  if (!TOOLS.has(tool) || result.length < 10 || result.length > 4000) {
    return NextResponse.json({ error: 'Check the result and try again.' }, { status: 400 });
  }

  const subject =
    tool === 'risk-profile'
      ? `[Risk profile] ${user.name} opened their blueprint`
      : `[Zakat] ${user.name} opened their liability sheet`;

  const key = process.env.RESEND_API_KEY;
  let delivered = false;

  if (key) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Investing Sparkle <website@investingsparkle.com>`,
          to: site.contact.email,
          reply_to: user.email,
          subject,
          text: [`Tool: ${tool}`, `Name: ${user.name}`, `Email: ${user.email}`, '', result].join(
            '\n'
          ),
        }),
      });

      delivered = response.ok;
      if (!response.ok) {
        console.error('[tool-result] Resend rejected the message', response.status);
      }
    } catch (error) {
      console.error('[tool-result] Could not reach Resend', error);
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.info('[tool-result] (dev) result received', { tool, user });
  } else {
    console.error(
      '[tool-result] No delivery provider configured. Set RESEND_API_KEY or wire this route to your CRM.'
    );
  }

  return NextResponse.json({ ok: true, delivered });
}

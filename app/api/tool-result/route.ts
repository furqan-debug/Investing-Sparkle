import { NextResponse } from 'next/server';

import { site } from '@/content/site';
import { formatPhone, normalizePhone } from '@/lib/lead';

/**
 * Lead capture endpoint for the gated tool results.
 *
 * The result itself is computed in the browser, so this route never gates the
 * visitor's answer. It records the lead and, when RESEND_API_KEY is set,
 * forwards the whole result to the support inbox so a reply can pick up where
 * the tool left off.
 *
 * The WhatsApp hand-off happens in the browser as a click-to-chat link. That is
 * deliberate: WhatsApp does not allow a website to send a message to someone
 * who has not messaged the business first, and a template would need approval
 * before it could carry a personalised result.
 */

const TOOLS = new Set(['risk-profile', 'zakat']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Payload = {
  tool?: unknown;
  name?: unknown;
  whatsapp?: unknown;
  email?: unknown;
  result?: unknown;
  /** Honeypot. Real people never see this field. */
  company?: unknown;
};

export async function POST(request: Request) {
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
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const result = typeof body.result === 'string' ? body.result.trim() : '';
  const digits = typeof body.whatsapp === 'string' ? normalizePhone(body.whatsapp) : null;

  if (
    !TOOLS.has(tool) ||
    name.length < 2 ||
    name.length > 120 ||
    !digits ||
    !EMAIL_RE.test(email) ||
    email.length > 200 ||
    result.length < 10 ||
    result.length > 4000
  ) {
    return NextResponse.json({ error: 'Check the details and try again.' }, { status: 400 });
  }

  const whatsapp = formatPhone(digits);
  const subject =
    tool === 'risk-profile'
      ? `[Risk profile] ${name} unlocked their blueprint`
      : `[Zakat] ${name} unlocked their liability sheet`;

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
          reply_to: email,
          subject,
          text: [
            `Tool: ${tool}`,
            `Name: ${name}`,
            `WhatsApp: ${whatsapp}`,
            `Email: ${email}`,
            '',
            result,
          ].join('\n'),
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
    console.info('[tool-result] (dev) lead received', { tool, name, whatsapp, email });
  } else {
    console.error(
      '[tool-result] No delivery provider configured. Set RESEND_API_KEY or wire this route to your CRM.'
    );
  }

  return NextResponse.json({ ok: true, delivered });
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { SESSION_COOKIE, authConfigured, googleClientId, readSession } from '@/lib/auth';

/**
 * Current session, plus whether sign-in is configured.
 *
 * The tools call this on mount. Returning `configured` lets the gate explain
 * itself instead of showing a Google button that cannot work yet, and
 * returning the client ID here means the button does not depend on a
 * build-time NEXT_PUBLIC_ value.
 */
export async function GET() {
  const jar = await cookies();
  const user = readSession(jar.get(SESSION_COOKIE)?.value);
  const configured = authConfigured();

  return NextResponse.json(
    { user, configured, clientId: configured ? googleClientId() : null },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function DELETE() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ ok: true });
}

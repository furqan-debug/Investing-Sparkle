import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  authConfigured,
  createSessionCookie,
  googleClientId,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/lib/auth';

/**
 * Google sign-in exchange.
 *
 * The browser gets an ID token from Google Identity Services and posts it here.
 * We verify it with Google before trusting a single field in it: signature,
 * audience, issuer, expiry and verified email are all checked, so a token minted
 * for another site cannot open this one.
 *
 * Verification uses Google's tokeninfo endpoint rather than a local JWKS
 * implementation. It is one request per sign-in, and it keeps the dependency
 * list at zero.
 */

const TOKENINFO = 'https://oauth2.googleapis.com/tokeninfo?id_token=';
const ISSUERS = new Set(['accounts.google.com', 'https://accounts.google.com']);
const MAX_CREDENTIAL = 4096;

type TokenInfo = {
  aud?: string;
  iss?: string;
  exp?: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
  picture?: string;
};

export async function POST(request: Request) {
  if (!authConfigured()) {
    return NextResponse.json(
      { error: 'Google sign-in is not configured on this site yet.' },
      { status: 503 }
    );
  }

  let body: { credential?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const credential = typeof body.credential === 'string' ? body.credential : '';
  if (!credential || credential.length > MAX_CREDENTIAL) {
    return NextResponse.json({ error: 'That sign-in could not be read. Please try again.' }, { status: 400 });
  }

  let info: TokenInfo;

  try {
    const response = await fetch(TOKENINFO + encodeURIComponent(credential), {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Google could not verify that sign-in. Please try again.' },
        { status: 401 }
      );
    }

    info = (await response.json()) as TokenInfo;
  } catch {
    console.error('[auth] Could not reach Google token verification');
    return NextResponse.json(
      { error: 'Could not reach Google. Check your connection and try again.' },
      { status: 502 }
    );
  }

  const emailVerified = info.email_verified === true || info.email_verified === 'true';
  const expiry = Number(info.exp);

  if (
    info.aud !== googleClientId() ||
    !info.iss ||
    !ISSUERS.has(info.iss) ||
    !emailVerified ||
    !Number.isFinite(expiry) ||
    expiry * 1000 <= Date.now()
  ) {
    return NextResponse.json(
      { error: 'That sign-in did not pass verification. Please try again.' },
      { status: 401 }
    );
  }

  const email = (info.email ?? '').trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: 'Google did not share an email address.' }, { status: 401 });
  }

  const name = (info.name ?? '').trim() || email.split('@')[0];
  const user = {
    name: name.slice(0, 120),
    email: email.slice(0, 200),
    picture: typeof info.picture === 'string' ? info.picture : null,
  };

  const session = createSessionCookie(user);
  if (!session) {
    console.error('[auth] AUTH_SECRET is missing, so no session could be signed');
    return NextResponse.json({ error: 'Sign-in is not configured on this site yet.' }, { status: 503 });
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  return NextResponse.json({ ok: true, user });
}

import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Google sign-in for the free tools.
 *
 * There is no user database. A successful Google sign-in produces a short
 * profile (name, email, picture) which is signed with HMAC-SHA256 and stored in
 * an httpOnly cookie. Every request that needs an identity re-checks that
 * signature, so the cookie cannot be edited to impersonate someone else.
 *
 * Scope is deliberately narrow: the site needs to know who unlocked a tool,
 * not to act on the visitor's Google account. No tokens are stored, no Google
 * APIs are called on the visitor's behalf, and signing out deletes the cookie.
 */

export type SessionUser = {
  name: string;
  email: string;
  picture: string | null;
};

type SessionPayload = SessionUser & { iat: number };

export const SESSION_COOKIE = 'is_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * A fixed development secret keeps local work moving without a setup step.
 * Production refuses to issue or read sessions unless a real secret is set.
 */
const DEV_SECRET = 'investing-sparkle-dev-only-session-secret';

function sessionSecret(): string | null {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 24) return secret;
  if (process.env.NODE_ENV !== 'production') return DEV_SECRET;
  return null;
}

export function googleClientId(): string | null {
  return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || null;
}

/** Both the client button and the cookie secret have to be present. */
export function authConfigured(): boolean {
  return Boolean(googleClientId() && sessionSecret());
}

export function createSessionCookie(
  user: SessionUser
): { name: string; value: string; maxAge: number } | null {
  const secret = sessionSecret();
  if (!secret) return null;

  const body = Buffer.from(JSON.stringify({ ...user, iat: Date.now() }), 'utf8').toString(
    'base64url'
  );
  const signature = createHmac('sha256', secret).update(body).digest('base64url');

  return { name: SESSION_COOKIE, value: `${body}.${signature}`, maxAge: SESSION_MAX_AGE };
}

export function readSession(raw: string | undefined | null): SessionUser | null {
  const secret = sessionSecret();
  if (!raw || !secret) return null;

  const dot = raw.lastIndexOf('.');
  if (dot <= 0) return null;

  const body = raw.slice(0, dot);
  const signature = raw.slice(dot + 1);
  const expected = createHmac('sha256', secret).update(body).digest('base64url');

  const given = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length || !timingSafeEqual(given, wanted)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as Partial<SessionPayload>;

    if (!payload.email || !payload.name || typeof payload.iat !== 'number') return null;
    if (Date.now() - payload.iat > SESSION_MAX_AGE * 1000) return null;

    return {
      name: payload.name,
      email: payload.email,
      picture: typeof payload.picture === 'string' ? payload.picture : null,
    };
  } catch {
    return null;
  }
}

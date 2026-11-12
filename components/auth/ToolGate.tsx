'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, LogOut, RefreshCw, ShieldCheck } from 'lucide-react';

import type { SessionUser } from '@/lib/auth';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
import { AuthProvider } from './AuthProvider';
import { GoogleSignInButton } from './GoogleSignInButton';

/**
 * Sign-in gate for every free tool.
 *
 * The tools are free, but they are not anonymous: a visitor signs in with
 * Google once and the calculators and quiz open. That replaces the old
 * name/WhatsApp/email form, so nobody has to type details that Google already
 * holds, and the same account works across every tool for 30 days.
 *
 * Sign-in is checked against our own route on mount. Nothing is read from
 * localStorage, so signing out actually clears the session cookie server-side.
 */

type SessionResponse = { user: SessionUser | null; configured: boolean; clientId: string | null };

const panel =
  'mx-auto w-full max-w-xl rounded-[28px] border border-line bg-white/[0.025] p-6 md:p-8';

export function ToolGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [failed, setFailed] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setFailed(false);

    try {
      const response = await fetch('/api/auth/session', { cache: 'no-store' });
      if (!response.ok) throw new Error('Session check failed');
      setSession((await response.json()) as SessionResponse);
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleCredential(credential: string) {
    setPending(true);
    setError('');

    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });

      const data = (await response.json().catch(() => null)) as
        | { user?: SessionUser; error?: string }
        | null;

      if (!response.ok || !data?.user) {
        setError(data?.error ?? 'That sign-in did not complete. Please try again.');
        return;
      }

      setSession({ user: data.user, configured: true, clientId: session?.clientId ?? null });
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  async function signOut() {
    setPending(true);

    try {
      await fetch('/api/auth/session', { method: 'DELETE' });
    } catch {
      // A failed sign-out still clears the client view; the cookie expires on
      // its own. Better than leaving the visitor stuck on a blank gate.
    }

    setPending(false);
    setSession((current) => (current ? { ...current, user: null } : current));
  }

  if (failed) {
    return (
      <div className={panel}>
        <p className="mono-label text-sparkle-300">Free tools</p>
        <h2 className="h3 mt-3">We could not check your sign-in.</h2>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          Something went wrong on the way to the server. Try again, and if it keeps happening, tell
          us on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => void load()}
          className="btn btn--secondary btn--md mt-6"
        >
          <RefreshCw className="h-4 w-4" aria-hidden /> Try again
        </button>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={panel} aria-busy>
        <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
        <div className="mt-5 h-7 w-3/4 animate-pulse rounded-lg bg-white/10" />
        <div className="mt-3 h-4 w-full animate-pulse rounded-md bg-white/[0.06]" />
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded-md bg-white/[0.06]" />
        <div className="mt-7 h-11 w-full animate-pulse rounded-full bg-white/[0.06]" />
        <span className="mt-4 block text-center text-xs text-muted">Checking your sign-in…</span>
      </div>
    );
  }

  if (session.user) {
    const initials = session.user.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');

    return (
      <AuthProvider user={session.user}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-white/[0.02] px-3.5 py-2.5">
          <span className="flex min-w-0 items-center gap-2.5 text-xs text-muted">
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-sparkle-400/25 bg-sparkle-400/[0.08] text-[10px] font-semibold text-sparkle-300"
              aria-hidden
            >
              {initials || 'IS'}
            </span>
            <span className="truncate">
              Signed in as <span className="text-ink">{session.user.email}</span>
            </span>
          </span>

          <button
            type="button"
            onClick={() => void signOut()}
            disabled={pending}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink disabled:opacity-60"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden /> Sign out
          </button>
        </div>

        {children}
      </AuthProvider>
    );
  }

  return (
    <div className={panel}>
      <p className="mono-label text-sparkle-300">Free tools</p>
      <h2 className="h2 mt-3">One free account. Every tool.</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Sign in with Google to use the calculators and the risk profile quiz. It is free, there is
        no card, and we never see your Google password.
      </p>

      <ul className="mt-5 space-y-2.5 text-sm text-ink">
        {[
          'Every calculator, at no cost',
          'No details to type, no forms to repeat',
          'Sign out whenever you like',
        ].map((line) => (
          <li key={line} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
            {line}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {session.configured && session.clientId ? (
          <GoogleSignInButton
            clientId={session.clientId}
            onCredential={handleCredential}
            pending={pending}
          />
        ) : (
          <div className="rounded-xl border border-sparkle-400/25 bg-sparkle-400/[0.05] p-4">
            <p className="text-sm font-medium text-ink">Google sign-in is not switched on yet.</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              The tools unlock as soon as sign-in is live. Until then, message us on WhatsApp and we
              will run the numbers with you.
            </p>
            <a
              href={whatsappLink(whatsappMessages.toolHelp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-green-300 underline decoration-green-300/30 underline-offset-2 hover:text-green-200"
            >
              Message us on WhatsApp <ArrowRight className="h-3 w-3" aria-hidden />
            </a>
            <p className="mt-4 border-t border-line pt-3 text-[11px] leading-relaxed text-low">
              Owner setup: add GOOGLE_CLIENT_ID and AUTH_SECRET, then restart. Steps are in the
              README.
            </p>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-3 text-xs leading-relaxed text-red-300">
            {error}
          </p>
        )}
      </div>

      <p className="mt-5 flex items-start gap-1.5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" aria-hidden />
        <span>
          We receive your name, email, and Google profile photo. Nothing else from your Google
          account. Read the{' '}
          <Link
            href="/privacy"
            className="text-green-300 underline decoration-green-300/30 underline-offset-2 hover:text-green-200"
          >
            privacy policy
          </Link>
          .
        </span>
      </p>
    </div>
  );
}

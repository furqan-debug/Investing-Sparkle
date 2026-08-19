'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Reusable newsletter signup.
 *
 * Appears in the footer, at the end of articles, after tool completion, and
 * mid-page on the blog listing.
 *
 * TODO — wire this to your email provider (ConvertKit / Mailchimp / Buttondown).
 * Two options:
 *   1. Point `action` at the provider's hosted form endpoint and let the browser
 *      POST to it directly. Simplest, no server code.
 *   2. Keep this handler and add app/api/subscribe/route.ts that calls the
 *      provider API with a server-side key.
 * Either way, turn on DOUBLE OPT-IN in the provider — the pre-launch checklist
 * requires it, and it keeps the list clean.
 */

export function Newsletter({
  variant = 'light',
  compact,
}: {
  variant?: 'light' | 'dark';
  compact?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const dark = variant === 'dark';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div
        className={cn(
          'flex items-center gap-3 rounded-2xl p-5',
          dark ? 'bg-white/10 text-white' : 'bg-green-50 text-ink'
        )}
      >
        <Check className={cn('h-5 w-5 shrink-0', dark ? 'text-sparkle-400' : 'text-green-600')} />
        <p className="text-sm">
          Almost there — check your inbox and confirm your subscription. If it is not there in a
          few minutes, look in spam and mark it as safe.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(!compact && 'max-w-xl')}>
      {!compact && (
        <>
          <h3 className={cn('h3', dark ? 'text-white' : 'text-ink')}>
            One honest email a week
          </h3>
          <p className={cn('mt-2 text-sm', dark ? 'text-green-100' : 'text-muted')}>
            One PSX explainer, one market update. No hype, no tips, no forwarding your address to
            anyone.
          </p>
        </>
      )}

      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`newsletter-${variant}-${compact ? 'c' : 'f'}`} className="sr-only">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail
            className={cn(
              'pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2',
              dark ? 'text-green-200' : 'text-muted'
            )}
            aria-hidden
          />
          <input
            id={`newsletter-${variant}-${compact ? 'c' : 'f'}`}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className={cn(
              'w-full rounded-full border py-3 pl-10 pr-4 text-sm outline-none transition-colors',
              dark
                ? 'border-white/20 bg-white/10 text-white placeholder:text-green-200 focus:border-sparkle-400'
                : 'border-line bg-white text-ink placeholder:text-muted focus:border-green-600'
            )}
          />
        </div>
        <button
          type="submit"
          disabled={state === 'loading'}
          className="rounded-full bg-sparkle-400 px-6 py-3 text-sm font-semibold text-green-950 transition-colors hover:bg-sparkle-500 disabled:opacity-60"
        >
          {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      {state === 'error' && (
        <p className="mt-2 text-sm text-danger">
          That didn’t go through. Try again, or email us directly.
        </p>
      )}
    </div>
  );
}

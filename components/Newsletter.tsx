'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export function Newsletter({
  variant = 'light',
  compact,
}: {
  variant?: 'light' | 'dark';
  compact?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

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
      <div className="flex animate-scale-in items-center gap-3 rounded-2xl border border-green-500/25 bg-green-500/[0.06] p-5">
        <Check className="h-5 w-5 shrink-0 text-green-400" aria-hidden />
        <p className="text-sm text-muted">
          Almost there. Check your inbox and confirm your subscription. If it is not there in a
          few minutes, look in spam and mark it as safe.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(!compact && 'max-w-xl')}>
      {!compact && (
        <>
          <h3 className="h3">One honest email a week</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            One PSX explainer, one market update. No hype, no tips, no forwarding your address to
            anyone.
          </p>
        </>
      )}

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`newsletter-${variant}-${compact ? 'c' : 'f'}`} className="sr-only">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-low"
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
            className="w-full rounded-full border border-line bg-[#030604] py-3 pl-10 pr-4 text-sm text-ink outline-none transition-all duration-200 placeholder:text-low focus:border-sparkle-400 focus:ring-2 focus:ring-sparkle-400/15"
          />
        </div>
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn btn--primary btn--md disabled:opacity-60"
        >
          {state === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {state === 'error' && (
        <p className="mt-2 text-sm text-danger">
          That didn&apos;t go through. Try again, or email us directly.
        </p>
      )}
    </div>
  );
}

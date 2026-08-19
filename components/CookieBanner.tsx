'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'is-cookie-consent';

/**
 * Cookie consent band.
 *
 * Analytics and the Facebook Pixel should only load once consent is stored as
 * 'accepted' — see components/Analytics.tsx, which reads the same key. Choosing
 * "Reject" is a real rejection, not a dismissal.
 */
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      // Storage blocked (private mode / strict settings) — say nothing rather
      // than showing a banner whose choice we cannot remember.
    }
  }, []);

  function decide(choice: 'accepted' | 'rejected') {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    setShow(false);
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: choice }));
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-green-950 text-white"
    >
      <div className="container-page flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-green-100">
          This site uses cookies for analytics and to improve your experience. See our{' '}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-sparkle-400">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide('accepted')}
            className="rounded-full bg-sparkle-400 px-5 py-2 text-sm font-semibold text-green-950 hover:bg-sparkle-500"
          >
            Accept
          </button>
          <button
            onClick={() => decide('rejected')}
            className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold hover:bg-white/10"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

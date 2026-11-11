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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-[#070c09]/95 text-ink backdrop-blur-xl"
    >
      <div className="container-page flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-[13px] leading-relaxed text-muted">
          This site uses cookies for analytics and to improve your experience. See our{' '}
          <Link
            href="/privacy"
            className="text-sparkle-300 underline decoration-sparkle-400/40 underline-offset-2 hover:text-sparkle-200"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => decide('accepted')} className="btn btn--primary btn--sm">
            Accept
          </button>
          <button onClick={() => decide('rejected')} className="btn btn--secondary btn--sm">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

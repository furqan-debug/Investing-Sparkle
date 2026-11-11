'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { liveSession } from '@/content/live-session';

const STORAGE_KEY = 'is-live-banner-hidden';

/** Slim, dismissible announcement above the header, on every page. */
export function LiveSessionBanner() {
  const [state, setState] = useState<'loading' | 'show' | 'hide'>('loading');

  useEffect(() => {
    try {
      setState(localStorage.getItem(STORAGE_KEY) === '1' ? 'hide' : 'show');
    } catch {
      setState('show');
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setState('hide');
  }

  if (state !== 'show') return null;

  return (
    <div className="border-b border-line bg-[#070c09]">
      <div className="container-page relative flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 pr-9 text-center">
        <span className="mono-label hidden items-center gap-2 rounded-full border border-sparkle-400/30 bg-sparkle-400/[0.06] px-2.5 py-1 text-sparkle-300 sm:inline-flex">
          <span className="signal-dot" aria-hidden />
          Free live
        </span>

        <p className="text-[12px] leading-snug text-muted sm:text-[13px]">
          <span className="font-medium text-ink">{liveSession.title}</span>
          <span className="mx-2 text-white/20" aria-hidden>
            /
          </span>
          <span className="num text-sparkle-300">{liveSession.date}</span>
          <span className="hidden sm:inline"> / {liveSession.platform}</span>
        </p>

        <Link
          href="/live"
          className="shrink-0 text-[12px] font-medium text-sparkle-300 underline decoration-sparkle-400/40 underline-offset-4 transition-colors hover:text-sparkle-200 sm:text-[13px]"
        >
          Details
        </Link>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-1 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-ink"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}

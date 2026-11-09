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
    <div className="bg-sparkle-400 text-green-950">
      <div className="container-page relative flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 py-1.5 pr-9 text-center text-[11px] leading-snug sm:gap-x-2.5 sm:py-2 sm:text-sm">
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-green-950 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-sparkle-300 sm:inline-flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sparkle-300" aria-hidden />
          Free
        </span>
        <p className="font-medium">
          <span className="font-bold">{liveSession.title}</span>
          <span className="mx-1 opacity-50" aria-hidden>
            ·
          </span>
          {liveSession.date}
          <span className="hidden sm:inline"> · {liveSession.platform}</span>
        </p>
        <Link
          href="/live"
          className="shrink-0 font-bold underline underline-offset-2 hover:opacity-75"
        >
          Details
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-1.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full transition-colors hover:bg-green-950/10"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

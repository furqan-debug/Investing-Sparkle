'use client';

import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { calendly } from '@/content/integrations';

/**
 * Optional Calendly scheduling, offered alongside WhatsApp rather than instead
 * of it. Renders nothing at all when NEXT_PUBLIC_CALENDLY_URL is unset.
 *
 * The widget is loaded in an iframe rather than via Calendly's script, so no
 * third-party JavaScript runs on the page — and it only mounts after the
 * visitor asks for it, so it costs nothing to anyone who books on WhatsApp.
 */
export function CalendlyEmbed({ label = 'Or pick a slot yourself' }: { label?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!calendly.enabled || !mounted) return null;

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Calendar className="h-5 w-5 text-green-700" aria-hidden />
          <p className="font-semibold text-ink">{label}</p>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="rounded-full border-2 border-green-800 px-5 py-2 text-sm font-semibold text-green-800 transition-colors hover:bg-green-800 hover:text-white"
        >
          {open ? 'Hide calendar' : 'Show calendar'}
        </button>
      </div>

      {open && (
        <iframe
          src={calendly.url!}
          title="Schedule a call"
          className="mt-5 h-[42rem] w-full rounded-xl border border-line"
          loading="lazy"
        />
      )}
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight, Calendar, Facebook, Radio, Ticket } from 'lucide-react';
import { liveSession } from '@/content/live-session';
import { Button } from './ui/Button';

/** Promotional card for the upcoming free Facebook Live session. */
export function LiveSessionCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-sparkle-400/25 bg-gradient-to-br from-green-900 via-green-900 to-green-800 text-white ${className}`}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-sparkle-400/10" />
        <div className="absolute -bottom-20 right-10 h-40 w-40 rounded-full bg-sparkle-400/[0.06]" />
      </div>

      <div className="relative grid gap-6 p-6 md:grid-cols-[1.6fr_auto] md:items-center md:p-8">
        <div>
          <p className="eyebrow text-sparkle-400">
            <Radio className="h-3.5 w-3.5" aria-hidden />
            {liveSession.eyebrow}
          </p>
          <h3 className="mt-2 font-display text-2xl leading-tight md:text-3xl">
            {liveSession.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-green-100">
            {liveSession.subtitle}
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-green-100">
            <li className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
              {liveSession.date}
            </li>
            <li className="flex items-center gap-2">
              <Facebook className="h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
              {liveSession.platform}
            </li>
            <li className="flex items-center gap-2">
              <Ticket className="h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
              Free to attend
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2.5 md:w-48">
          <Button href={liveSession.platformUrl} size="lg" external className="w-full" goo="var(--color-sparkle-700)" gooScale>
            {liveSession.watchLabel} <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Link
            href="/live"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Session details
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight, Calendar, Facebook, Radio, Ticket } from 'lucide-react';
import { liveSession } from '@/content/live-session';
import { Button } from './ui/Button';

/** Promotional card for the upcoming free Facebook Live session. */
export function LiveSessionCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-sparkle-400/25 bg-[linear-gradient(165deg,rgba(235,206,134,0.065),rgba(255,255,255,0.015)_58%)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full border border-sparkle-400/10" />
        <div className="absolute -bottom-24 right-16 h-48 w-48 rounded-full bg-sparkle-400/[0.05]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sparkle-400/50 to-transparent" />
      </div>

      <div className="relative grid gap-8 p-6 md:grid-cols-[1.6fr_auto] md:items-center md:p-8">
        <div>
          <p className="mono-label flex items-center gap-2.5 text-sparkle-300">
            <Radio className="h-3.5 w-3.5" aria-hidden />
            {liveSession.eyebrow}
          </p>
          <h3 className="mt-4 font-display text-2xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-[2rem]">
            {liveSession.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {liveSession.subtitle}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] text-muted">
            <li className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-sparkle-400" aria-hidden />
              <span className="num">{liveSession.date}</span>
            </li>
            <li className="flex items-center gap-2">
              <Facebook className="h-3.5 w-3.5 shrink-0 text-sparkle-400" aria-hidden />
              {liveSession.platform}
            </li>
            <li className="flex items-center gap-2">
              <Ticket className="h-3.5 w-3.5 shrink-0 text-sparkle-400" aria-hidden />
              Free to attend
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2.5 md:w-52">
          <Button
            href={liveSession.platformUrl}
            size="lg"
            external
            className="w-full"
            goo="var(--color-sparkle-300)"
            gooScale
          >
            {liveSession.watchLabel} <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Link
            href="/live"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-white/20 hover:bg-white/[0.06]"
          >
            Session details
          </Link>
        </div>
      </div>
    </div>
  );
}

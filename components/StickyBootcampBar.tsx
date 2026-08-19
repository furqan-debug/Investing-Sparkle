'use client';

import { useEffect, useState } from 'react';
import { bootcamp } from '@/content/bootcamp';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';

/**
 * Scarcity bar, shown after the visitor scrolls past the hero.
 *
 * Renders ONLY when there is a genuine number to report — a real seat count or
 * a real closing date in content/bootcamp.ts. The plan is blunt about this:
 * fake scarcity kills trust, and a permanent "only 2 seats left" is a lie the
 * second time someone visits.
 */
export function StickyBootcampBar() {
  const [visible, setVisible] = useState(false);

  const hasRealScarcity =
    bootcamp.status === 'enrolling' &&
    (bootcamp.seatsRemaining !== null || bootcamp.registrationCloses !== null);

  useEffect(() => {
    if (!hasRealScarcity) return;
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasRealScarcity]);

  if (!hasRealScarcity) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-green-900 text-white transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3.5">
        <p className="text-sm">
          {bootcamp.seatsRemaining !== null && (
            <span className="font-semibold text-sparkle-400">
              {bootcamp.seatsRemaining} seats remaining
            </span>
          )}
          {bootcamp.seatsRemaining !== null && bootcamp.registrationCloses !== null && (
            <span className="mx-2 text-green-300">·</span>
          )}
          {bootcamp.registrationCloses !== null && (
            <span className="text-green-100">Registration closes {bootcamp.registrationCloses}</span>
          )}
        </p>
        <a
          href={whatsappLink(whatsappMessages.bootcampReserve(bootcamp.cohort))}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-sparkle-400 px-5 py-2 text-sm font-semibold text-green-950 hover:bg-sparkle-500"
        >
          Reserve now
        </a>
      </div>
    </div>
  );
}

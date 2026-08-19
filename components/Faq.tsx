'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';

export type QA = { q: string; a: string };

/**
 * FAQ accordion.
 *
 * Built on real buttons with aria-expanded rather than details/summary, so the
 * open/closed state is announced correctly and styling stays consistent across
 * browsers. All answers remain in the DOM for search engines.
 */
export function Faq({ items, invert }: { items: QA[]; invert?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className={cn('divide-y', invert ? 'divide-white/15' : 'divide-line')}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
              >
                <span
                  className={cn(
                    'font-sans text-base font-semibold md:text-lg',
                    invert ? 'text-white' : 'text-ink'
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full',
                    invert ? 'bg-white/10 text-sparkle-400' : 'bg-green-50 text-green-700'
                  )}
                  aria-hidden
                >
                  {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
            </h3>
            <div className={cn('overflow-hidden pr-10', !isOpen && 'hidden')}>
              <p className={cn('pb-5 text-sm leading-relaxed', invert ? 'text-green-100' : 'text-muted')}>
                {item.a}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

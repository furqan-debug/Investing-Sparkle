'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';

export type QA = { q: string; a: string };

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
                    'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full transition-transform duration-200',
                    isOpen && 'rotate-90',
                    invert ? 'bg-white/10 text-sparkle-400' : 'bg-green-50 text-green-700'
                  )}
                  aria-hidden
                >
                  {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
            </h3>
            <div className="faq-answer pr-10" data-open={isOpen}>
              <div>
                <p className={cn('pb-5 text-sm leading-relaxed', invert ? 'text-green-100' : 'text-muted')}>
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

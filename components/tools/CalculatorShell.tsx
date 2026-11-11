'use client';

import { MessageCircle } from 'lucide-react';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
import { Newsletter } from '@/components/Newsletter';

/**
 * Shared layout and controls for the calculators, so each tool file contains
 * only its own arithmetic rather than a re-implementation of the same panel.
 */

export type SliderSpec = {
  id: string;
  label: string;
  value: number;
  set: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  /** Optional help text shown under the control. */
  hint?: string;
};

export function SliderPanel({ title, sliders }: { title: string; sliders: SliderSpec[] }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 md:p-6">
      <h2 className="font-sans text-base font-semibold text-ink">{title}</h2>

      <div className="mt-6 space-y-6">
        {sliders.map((s) => (
          <div key={s.id}>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor={s.id} className="text-sm font-medium text-ink">
                {s.label}
              </label>
              <output
                htmlFor={s.id}
                className="num min-w-0 break-words text-right text-[15px] leading-tight text-green-300"
              >
                {s.format(s.value)}
              </output>
            </div>
            <input
              id={s.id}
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="mt-2.5 w-full accent-sparkle-400"
            />
            <div className="mt-1 flex justify-between text-xs text-muted">
              <span>{s.format(s.min)}</span>
              <span>{s.format(s.max)}</span>
            </div>
            {s.hint && <p className="mt-2 text-xs leading-relaxed text-muted">{s.hint}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Headline result block, with optional supporting figures beneath. */
export function ResultPanel({
  eyebrow,
  headline,
  sub,
  rows,
  children,
}: {
  eyebrow: string;
  headline: string;
  sub?: string;
  rows?: { label: string; value: string; accent?: boolean }[];
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-green-900 p-5 text-white md:p-6">
      <p className="eyebrow text-sparkle-300">{eyebrow}</p>
      <p className="num mt-3 break-words text-[1.75rem] leading-[1.05] text-sparkle-300 md:text-[2.1rem]">
        {headline}
      </p>
      {sub && <p className="mt-2.5 text-sm leading-relaxed text-muted">{sub}</p>}

      {rows && rows.length > 0 && (
        <dl className="mt-5 grid gap-4 border-t border-white/15 pt-5 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="min-w-0">
              <dt className="mono-label text-[10px] text-muted">{row.label}</dt>
              <dd
                className={`num mt-1.5 break-words text-[15px] ${
                  row.accent ? 'text-sparkle-300' : 'text-ink'
                }`}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {children}
    </div>
  );
}

/** Newsletter capture, WhatsApp CTA, and the honesty note every tool carries. */
export function ToolFooter({
  calculatorName,
  disclaimer,
}: {
  calculatorName: string;
  disclaimer: string;
}) {
  return (
    <>
      <div className="rounded-2xl border border-line bg-white p-5">
        <Newsletter compact />
      </div>

      <a
        href={whatsappLink(whatsappMessages.calculatorResult(calculatorName))}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--secondary inline-flex"
      >
        <MessageCircle className="h-4 w-4" aria-hidden /> Talk through these numbers
      </a>

      <p className="text-xs leading-relaxed text-muted">{disclaimer}</p>
    </>
  );
}

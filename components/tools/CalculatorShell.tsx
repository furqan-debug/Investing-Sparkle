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
    <div className="rounded-3xl border border-line bg-white p-7 md:p-8">
      <h2 className="font-sans text-lg font-semibold text-ink">{title}</h2>

      <div className="mt-7 space-y-7">
        {sliders.map((s) => (
          <div key={s.id}>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor={s.id} className="text-sm font-medium text-ink">
                {s.label}
              </label>
              <output htmlFor={s.id} className="font-display text-xl text-green-800">
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
              className="mt-2.5 w-full accent-green-700"
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
    <div className="rounded-3xl bg-green-900 p-7 text-white md:p-8">
      <p className="eyebrow text-sparkle-400">{eyebrow}</p>
      <p className="mt-3 font-display text-4xl leading-none text-sparkle-400 md:text-5xl">
        {headline}
      </p>
      {sub && <p className="mt-2 text-sm text-green-200">{sub}</p>}

      {rows && rows.length > 0 && (
        <dl className="mt-7 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="text-xs uppercase tracking-wider text-green-200">{row.label}</dt>
              <dd
                className={`mt-1 font-display text-2xl ${
                  row.accent ? 'text-sparkle-400' : 'text-white'
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
      <div className="rounded-2xl border border-line bg-white p-6">
        <Newsletter compact />
      </div>

      <a
        href={whatsappLink(whatsappMessages.calculatorResult(calculatorName))}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-green-950 hover:bg-[#1eb857]"
      >
        <MessageCircle className="h-4 w-4" aria-hidden /> Talk through these numbers
      </a>

      <p className="text-xs leading-relaxed text-muted">{disclaimer}</p>
    </>
  );
}

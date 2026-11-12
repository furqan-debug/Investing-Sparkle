'use client';

import type { ReactNode } from 'react';
import { AlertTriangle, ArrowUpRight, Info } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { SourceKey } from '@/content/tax-rates';
import { TAX_YEAR, VERIFIED_ON, taxSources } from '@/content/tax-rates';
import { formatDate } from '@/lib/format';

/**
 * Shared controls for the calculator pages. The visual rules match the rest of
 * the site: hairline borders, inset fields, mono figures, and one gold action
 * per view. Nothing here is a nested card.
 */

export function ToolGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] [&>*]:min-w-0">
      {children}
    </div>
  );
}

export function ToolPanel({
  title,
  intro,
  children,
  className,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('rounded-2xl border border-line bg-white/[0.018] p-5 md:p-6', className)}>
      <h2 className="font-sans text-base font-semibold text-ink">{title}</h2>
      {intro && <p className="mt-1.5 text-sm leading-relaxed text-muted">{intro}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function FieldLabel({
  htmlFor,
  children,
  suffix,
}: {
  htmlFor?: string;
  children: ReactNode;
  suffix?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink">
      <span>{children}</span>
      {suffix && <span className="mono-label shrink-0 text-[10px]">{suffix}</span>}
    </label>
  );
}

export function NumberField({
  id,
  label,
  value,
  set,
  min = 0,
  step = 1,
  prefix = 'PKR',
  suffix,
  hint,
  placeholder = '0',
}: {
  id: string;
  label: string;
  value: number;
  set: (value: number) => void;
  min?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} suffix={suffix}>
        {label}
      </FieldLabel>

      <div className="mt-1.5 flex items-stretch overflow-hidden rounded-xl border border-line bg-[var(--bg-inset)] transition-colors focus-within:border-sparkle-400/70 focus-within:ring-2 focus-within:ring-sparkle-400/15">
        {prefix && (
          <span className="flex shrink-0 items-center border-r border-line px-3 text-xs text-low">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value || ''}
          onChange={(event) => set(Number(event.target.value) || 0)}
          placeholder={placeholder}
          className="num min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-low"
        />
      </div>

      {hint && <p className="mt-1.5 text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}

export function DateField({
  id,
  label,
  value,
  set,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  set: (value: string) => void;
  hint?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(event) => set(event.target.value)}
        className="num mt-1.5 w-full rounded-xl border border-line bg-[var(--bg-inset)] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sparkle-400/70 focus:ring-2 focus:ring-sparkle-400/15"
      />
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  set,
  options,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  set: (value: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <select
        id={id}
        value={value}
        onChange={(event) => set(event.target.value)}
        className="mt-1.5 w-full appearance-none rounded-xl border border-line bg-[var(--bg-inset)] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sparkle-400/70 focus:ring-2 focus:ring-sparkle-400/15"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[var(--bg-elevated)]">
            {option.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  set,
  options,
  hint,
  columns = 2,
}: {
  label: string;
  value: T;
  set: (value: T) => void;
  options: { value: T; label: string }[];
  hint?: string;
  columns?: 2 | 3;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-ink">{label}</p>
      <div
        className={cn(
          'mt-1.5 grid gap-1 rounded-xl border border-line bg-[var(--bg-inset)] p-1',
          columns === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
        )}
      >
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => set(option.value)}
              className={cn(
                'min-h-9 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                active
                  ? 'bg-sparkle-400/12 text-sparkle-200 ring-1 ring-inset ring-sparkle-400/25'
                  : 'text-muted hover:bg-white/[0.04] hover:text-ink'
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}

export function ToggleRow({
  label,
  hint,
  checked,
  set,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  set: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-[var(--bg-inset)] p-3.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => set(event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-sparkle-400"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink">{label}</span>
        {hint && <span className="mt-1 block text-xs leading-relaxed text-muted">{hint}</span>}
      </span>
    </label>
  );
}

export function Breakdown({
  title,
  rows,
  footer,
}: {
  title?: string;
  rows: { label: string; value: string; strong?: boolean; accent?: boolean }[];
  footer?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white/[0.018] p-5 md:p-6">
      {title && <h2 className="font-sans text-base font-semibold text-ink">{title}</h2>}
      <dl className={cn('divide-y divide-line text-sm', title ? 'mt-4' : undefined)}>
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 py-2.5">
            <dt className={cn('min-w-0', row.strong ? 'font-semibold text-ink' : 'text-muted')}>
              {row.label}
            </dt>
            <dd
              className={cn(
                'num shrink-0 text-right',
                row.accent ? 'text-sparkle-300' : row.strong ? 'font-semibold text-ink' : 'text-ink'
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      {footer}
    </div>
  );
}

export function SourceNote({
  sources,
  extra,
  title = 'Rates and sources',
  intro,
}: {
  sources: SourceKey[];
  extra?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-white/[0.015] p-4">
      <p className="mono-label text-[10px]">{title}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        {intro ??
          `Tax year ${TAX_YEAR}. Verified ${formatDate(VERIFIED_ON)}. Rates change with each Finance Act and FBR clarification, so check the source before you file.`}
      </p>

      {sources.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {sources.map((key) => (
            <li key={key}>
              <a
                href={taxSources[key].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1 text-xs text-green-300 underline decoration-green-300/25 underline-offset-2 hover:text-green-200"
              >
                {taxSources[key].label}
                <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      )}

      {extra && <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">{extra}</p>}
    </div>
  );
}

export function AssumptionNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-xl border border-line bg-white/[0.015] p-3.5 text-xs leading-relaxed text-muted">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

export function WarningNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-xl border border-warning/25 bg-warning/[0.06] p-3.5 text-xs leading-relaxed text-muted">
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

export function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-line bg-white/[0.02] px-3.5 py-3">
      <p className="mono-label text-[9px]">{label}</p>
      <p className="num mt-1.5 break-words text-sm text-ink">{value}</p>
    </div>
  );
}

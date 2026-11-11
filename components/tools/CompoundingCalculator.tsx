'use client';

import { useMemo, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
import { formatPKR } from '@/lib/format';
import { Newsletter } from '@/components/Newsletter';

/**
 * Compounding calculator.
 *
 * Deliberately shows the split between what you contributed and what growth
 * added — that contrast is the actual lesson, and a single future-value number
 * hides it.
 *
 * The return rate is an assumption the user sets, never a projection we supply.
 * The result copy states that explicitly.
 */

const RANGE = {
  principal: { min: 0, max: 10_000_000, step: 5_000 },
  monthly: { min: 0, max: 500_000, step: 1_000 },
  rate: { min: 1, max: 30, step: 0.5 },
  years: { min: 1, max: 40, step: 1 },
};

export function CompoundingCalculator() {
  const [principal, setPrincipal] = useState(100_000);
  const [monthly, setMonthly] = useState(10_000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;

    // Lump sum compounded monthly.
    const lumpValue = principal * Math.pow(1 + monthlyRate, months);

    // Ordinary annuity for the monthly contributions. The zero-rate case is
    // handled separately because the closed form divides by the rate.
    const contribValue =
      monthlyRate === 0
        ? monthly * months
        : monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const future = lumpValue + contribValue;
    const invested = principal + monthly * months;

    return {
      future,
      invested,
      growth: future - invested,
      growthShare: future > 0 ? ((future - invested) / future) * 100 : 0,
    };
  }, [principal, monthly, rate, years]);

  const inputs = [
    {
      id: 'principal',
      label: 'Starting amount (PKR)',
      value: principal,
      set: setPrincipal,
      ...RANGE.principal,
      format: formatPKR,
    },
    {
      id: 'monthly',
      label: 'Added every month (PKR)',
      value: monthly,
      set: setMonthly,
      ...RANGE.monthly,
      format: formatPKR,
    },
    {
      id: 'rate',
      label: 'Assumed annual return (%)',
      value: rate,
      set: setRate,
      ...RANGE.rate,
      format: (v: number) => `${v}%`,
    },
    {
      id: 'years',
      label: 'Years invested',
      value: years,
      set: setYears,
      ...RANGE.years,
      format: (v: number) => `${v} ${v === 1 ? 'year' : 'years'}`,
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-white/[0.025] p-5 md:p-6">
        <h2 className="mono-label text-ink">Your numbers</h2>

        <div className="mt-6 space-y-6">
          {inputs.map((input) => (
            <div key={input.id}>
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor={input.id} className="text-sm font-medium text-ink">
                  {input.label}
                </label>
                <output className="num min-w-0 break-words text-right text-[15px] leading-tight text-green-300">
                  {input.format(input.value)}
                </output>
              </div>
              <input
                id={input.id}
                type="range"
                min={input.min}
                max={input.max}
                step={input.step}
                value={input.value}
                onChange={(e) => input.set(Number(e.target.value))}
                className="mt-2.5 w-full accent-sparkle-400"
              />
              <div className="mt-1 flex justify-between text-xs text-muted">
                <span>{input.format(input.min)}</span>
                <span>{input.format(input.max)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-sparkle-400/20 bg-green-900 p-5 md:p-6">
          <p className="mono-label text-sparkle-300">After {years} years</p>
          <p className="num mt-3 break-words text-[1.75rem] leading-[1.05] text-sparkle-300 md:text-[2.1rem]">
            PKR {formatPKR(result.future)}
          </p>

          {/* The split is the point of the tool. */}
          <div className="mt-6">
            <div
              className="flex h-2.5 overflow-hidden rounded-full bg-white/10"
              role="img"
              aria-label={`${Math.round(100 - result.growthShare)}% of the total is money you put in; ${Math.round(result.growthShare)}% is growth`}
            >
              <div
                className="bg-green-400"
                style={{ width: `${100 - result.growthShare}%` }}
              />
              <div className="bg-sparkle-400" style={{ width: `${result.growthShare}%` }} />
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <dt className="mono-label flex items-center gap-2 text-[10px] text-muted">
                  <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden />
                  You put in
                </dt>
                <dd className="num mt-2 break-words text-[15px]">PKR {formatPKR(result.invested)}</dd>
              </div>
              <div>
                <dt className="mono-label flex items-center gap-2 text-[10px] text-muted">
                  <span className="h-2 w-2 rounded-full bg-sparkle-400" aria-hidden />
                  Growth added
                </dt>
                <dd className="num mt-2 break-words text-[15px] text-sparkle-300">
                  PKR {formatPKR(result.growth)}
                </dd>
              </div>
            </dl>

            <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-relaxed text-muted">
              <span className="num text-sparkle-300">{Math.round(result.growthShare)}%</span> of that
              final figure is growth rather than money you contributed. Lengthen the time horizon and
              watch that share move, it moves far more than the return rate does.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
          <Newsletter compact />
        </div>

        <a
          href={whatsappLink(whatsappMessages.calculatorResult('Compounding Calculator'))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--secondary btn--md self-start"
        >
          <MessageCircle className="h-4 w-4" aria-hidden /> Talk through these numbers
        </a>

        <p className="text-xs leading-relaxed text-muted">
          This is arithmetic, not a forecast. The return rate is the figure you chose: we are not
          projecting it, and no market delivers the same return every year. Real returns arrive
          unevenly, which is exactly why the behavioural side of investing matters more than the
          spreadsheet.
        </p>
      </div>
    </div>
  );
}

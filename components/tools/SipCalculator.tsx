'use client';

import { useMemo, useState } from 'react';
import { SliderPanel, ResultPanel, ToolFooter, type SliderSpec } from './CalculatorShell';
import { formatPKR } from '@/lib/format';

/**
 * SIP calculator — what a fixed monthly contribution builds up to.
 *
 * Also answers the question the plan flags as the real lesson: what starting
 * late costs you. The delay comparison is the part worth showing.
 */
export function SipCalculator() {
  const [monthly, setMonthly] = useState(15_000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);
  const [delay, setDelay] = useState(5);

  const result = useMemo(() => {
    const monthlyRate = rate / 100 / 12;

    const futureValue = (months: number) =>
      monthlyRate === 0
        ? monthly * months
        : monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    const months = years * 12;
    const onTime = futureValue(months);

    // Starting `delay` years later means contributing for that many fewer years.
    const delayedMonths = Math.max(0, (years - delay) * 12);
    const delayed = futureValue(delayedMonths);

    const invested = monthly * months;

    return {
      onTime,
      delayed,
      cost: onTime - delayed,
      invested,
      growth: onTime - invested,
      growthShare: onTime > 0 ? ((onTime - invested) / onTime) * 100 : 0,
    };
  }, [monthly, rate, years, delay]);

  const sliders: SliderSpec[] = [
    {
      id: 'sip-monthly',
      label: 'Invested every month (PKR)',
      value: monthly,
      set: setMonthly,
      min: 1_000,
      max: 200_000,
      step: 1_000,
      format: formatPKR,
    },
    {
      id: 'sip-rate',
      label: 'Assumed annual return (%)',
      value: rate,
      set: setRate,
      min: 1,
      max: 30,
      step: 0.5,
      format: (v) => `${v}%`,
      hint: 'Your assumption, not our forecast. No market returns the same figure every year.',
    },
    {
      id: 'sip-years',
      label: 'Years investing',
      value: years,
      set: setYears,
      min: 1,
      max: 40,
      step: 1,
      format: (v) => `${v} ${v === 1 ? 'year' : 'years'}`,
    },
    {
      id: 'sip-delay',
      label: 'If you started this many years later',
      value: delay,
      set: setDelay,
      min: 0,
      max: 20,
      step: 1,
      format: (v) => (v === 0 ? 'No delay' : `${v} ${v === 1 ? 'year' : 'years'} late`),
      hint: 'Move this to see what waiting costs. It is usually far more than people expect.',
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SliderPanel title="Your monthly plan" sliders={sliders} />

      <div className="flex flex-col gap-5">
        <ResultPanel
          eyebrow={`After ${years} ${years === 1 ? 'year' : 'years'}`}
          headline={`PKR ${formatPKR(result.onTime)}`}
          sub={`From PKR ${formatPKR(monthly)} invested every month.`}
          rows={[
            { label: 'You contributed', value: `PKR ${formatPKR(result.invested)}` },
            { label: 'Growth added', value: `PKR ${formatPKR(result.growth)}`, accent: true },
          ]}
        >
          <div className="mt-6 border-t border-white/15 pt-6">
            <div
              className="flex h-3 overflow-hidden rounded-full bg-white/15"
              role="img"
              aria-label={`${Math.round(result.growthShare)} percent of the total is growth`}
            >
              <div className="bg-green-300" style={{ width: `${100 - result.growthShare}%` }} />
              <div className="bg-sparkle-400" style={{ width: `${result.growthShare}%` }} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-green-100">
              {Math.round(result.growthShare)}% of the final figure is growth rather than money you
              put in.
            </p>
          </div>
        </ResultPanel>

        {delay > 0 && (
          <div className="rounded-2xl border-2 border-sparkle-400 bg-sparkle-100 p-6">
            <p className="eyebrow text-green-800">The cost of waiting</p>
            <p className="mt-3 font-display text-3xl text-green-800">
              PKR {formatPKR(result.cost)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              Starting {delay} {delay === 1 ? 'year' : 'years'} later (same monthly amount, same
              assumed return) leaves you with PKR {formatPKR(result.delayed)} instead. The
              difference is {Math.round((result.cost / result.onTime) * 100)}% of the total, and you
              only skipped {delay * 12} contributions.
            </p>
          </div>
        )}

        <ToolFooter
          calculatorName="SIP Calculator"
          disclaimer="This assumes a constant return applied evenly and contributions made at the start of each month. Real returns arrive unevenly, and this ignores inflation, taxes, and transaction costs. Treat it as an illustration of how regular investing behaves, not a projection of your balance."
        />
      </div>
    </div>
  );
}

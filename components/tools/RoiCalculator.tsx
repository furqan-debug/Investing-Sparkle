'use client';

import { useMemo, useState } from 'react';
import { ResultPanel, ToolFooter } from './CalculatorShell';
import { formatPKR } from '@/lib/format';

/**
 * ROI calculator — what a holding actually returned.
 *
 * Two things most retail return calculations get wrong, and this handles both:
 * - Dividends are part of the return. Ignoring them understates PSX holdings
 *   substantially, since dividend income is a large share of total return here.
 * - Transaction costs are real. A gross return that ignores commission is not
 *   the return you received.
 *
 * It also shows the annualised figure, because "up 40%" means very different
 * things over one year and over seven.
 */
export function RoiCalculator() {
  const [buyPrice, setBuyPrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(135);
  const [shares, setShares] = useState(1000);
  const [dividends, setDividends] = useState(8);
  const [costs, setCosts] = useState(1500);
  const [months, setMonths] = useState(24);

  const result = useMemo(() => {
    const invested = buyPrice * shares;
    const proceeds = sellPrice * shares;
    const dividendIncome = dividends * shares;

    const capitalGain = proceeds - invested;
    const netProfit = capitalGain + dividendIncome - costs;

    const totalReturn = invested > 0 ? (netProfit / invested) * 100 : 0;
    const priceOnlyReturn = invested > 0 ? (capitalGain / invested) * 100 : 0;

    // Annualised (CAGR) on the total position value, so dividends and costs count.
    const years = months / 12;
    const endValue = invested + netProfit;
    const annualised =
      years > 0 && invested > 0 && endValue > 0
        ? (Math.pow(endValue / invested, 1 / years) - 1) * 100
        : 0;

    return {
      invested,
      capitalGain,
      dividendIncome,
      costs,
      netProfit,
      totalReturn,
      priceOnlyReturn,
      annualised,
    };
  }, [buyPrice, sellPrice, shares, dividends, costs, months]);

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-green-600';

  const fields = [
    { id: 'buy', label: 'Buy price per share (PKR)', value: buyPrice, set: setBuyPrice, step: 0.5 },
    {
      id: 'sell',
      label: 'Sell price per share (PKR)',
      value: sellPrice,
      set: setSellPrice,
      step: 0.5,
    },
    { id: 'shares', label: 'Number of shares', value: shares, set: setShares, step: 1 },
    {
      id: 'div',
      label: 'Total dividends received per share (PKR)',
      value: dividends,
      set: setDividends,
      step: 0.25,
      hint: 'Add up every dividend across the whole holding period. Leaving this out is the most common way people understate a PSX return.',
    },
    {
      id: 'costs',
      label: 'Total transaction costs (PKR)',
      value: costs,
      set: setCosts,
      step: 100,
      hint: 'Commission on both the buy and the sell, plus any charges your broker passed through.',
    },
    {
      id: 'months',
      label: 'Months held',
      value: months,
      set: setMonths,
      step: 1,
      hint: 'Used for the annualised figure.',
    },
  ];

  const positive = result.netProfit >= 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-line bg-white p-7 md:p-8">
        <h2 className="font-sans text-lg font-semibold text-ink">The position</h2>
        <p className="mt-1.5 text-sm text-muted">
          Works for a closed position, or use today’s price to check one you still hold.
        </p>

        <div className="mt-7 space-y-5">
          {fields.map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="text-sm font-medium text-ink">
                {f.label}
              </label>
              <input
                id={f.id}
                type="number"
                min={0}
                step={f.step}
                inputMode="decimal"
                value={f.value || ''}
                onChange={(e) => f.set(Number(e.target.value) || 0)}
                placeholder="0"
                className={inputClass}
              />
              {'hint' in f && f.hint && (
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{f.hint}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <ResultPanel
          eyebrow="Total return"
          headline={`${positive ? '+' : ''}${result.totalReturn.toFixed(1)}%`}
          sub={`${positive ? 'Profit' : 'Loss'} of PKR ${formatPKR(Math.abs(result.netProfit))} on PKR ${formatPKR(result.invested)} invested.`}
          rows={[
            {
              label: 'Annualised',
              value: `${result.annualised >= 0 ? '+' : ''}${result.annualised.toFixed(1)}%`,
              accent: true,
            },
            {
              label: 'Price change alone',
              value: `${result.priceOnlyReturn >= 0 ? '+' : ''}${result.priceOnlyReturn.toFixed(1)}%`,
            },
          ]}
        />

        <div className="rounded-2xl border border-line bg-white p-6">
          <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">
            Where the return came from
          </h3>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ['Capital gain', result.capitalGain],
              ['Dividends received', result.dividendIncome],
              ['Transaction costs', -result.costs],
            ].map(([label, value]) => (
              <div key={label as string} className="flex justify-between gap-4">
                <dt className="text-muted">{label as string}</dt>
                <dd
                  className={`font-medium ${(value as number) < 0 ? 'text-danger' : 'text-ink'}`}
                >
                  {(value as number) < 0 ? '−' : ''}PKR {formatPKR(Math.abs(value as number))}
                </dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-line pt-3">
              <dt className="font-semibold text-ink">Net profit</dt>
              <dd className={`font-semibold ${positive ? 'text-green-700' : 'text-danger'}`}>
                {positive ? '' : '−'}PKR {formatPKR(Math.abs(result.netProfit))}
              </dd>
            </div>
          </dl>

          {result.dividendIncome > 0 && (
            <p className="mt-4 rounded-xl bg-green-50 p-3.5 text-xs leading-relaxed text-green-800">
              Dividends contributed{' '}
              {Math.round((result.dividendIncome / Math.abs(result.netProfit || 1)) * 100)}% of your
              net profit here. This is why comparing only entry and exit prices understates what a
              PSX holding actually did for you.
            </p>
          )}
        </div>

        <ToolFooter
          calculatorName="ROI Calculator"
          disclaimer="This measures a realised return before tax. Capital gains tax and the tax already deducted from dividends are not included — add them for a true after-tax figure. Past returns on one position tell you nothing about future ones."
        />
      </div>
    </div>
  );
}

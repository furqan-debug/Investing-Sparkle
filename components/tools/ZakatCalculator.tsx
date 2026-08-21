'use client';

import { useMemo, useState } from 'react';
import { Info } from 'lucide-react';
import { ResultPanel, ToolFooter } from './CalculatorShell';
import { formatPKR } from '@/lib/format';

/**
 * Zakat calculator for an investment portfolio.
 *
 * Uses number inputs rather than sliders — these are amounts people look up
 * from statements, not values they explore.
 *
 * Deliberate design decisions:
 * - The nisab threshold is entered by the user, because it is derived from
 *   prevailing gold or silver prices and changes constantly. Hardcoding a
 *   figure would go stale and produce a wrong answer with a confident face.
 * - The 2.5% rate is the widely-applied lunar-year rate and is stated openly.
 * - Where scholars differ (notably on long-term holdings and on deductible
 *   liabilities), the tool says so instead of quietly picking a side.
 */

const RATE = 0.025;

type Field = { id: string; label: string; hint?: string };

const assetFields: Field[] = [
  {
    id: 'shares',
    label: 'Market value of shares held for trading',
    hint: 'Bought with the intention of selling for gain, zakatable on full market value.',
  },
  {
    id: 'longTerm',
    label: 'Zakatable portion of long-term shareholdings',
    hint: 'Where a company publishes a zakat-per-share figure, multiply it by your holding and enter the total here.',
  },
  { id: 'tradingCash', label: 'Cash sitting in your trading account' },
  { id: 'dividends', label: 'Dividends received and still held as cash' },
  { id: 'bankCash', label: 'Cash in bank accounts and at home' },
  { id: 'goldSilver', label: 'Value of gold and silver held' },
];

export function ZakatCalculator() {
  const [values, setValues] = useState<Record<string, number>>({});
  const [liabilities, setLiabilities] = useState(0);
  const [nisab, setNisab] = useState(0);

  const set = (id: string, v: number) => setValues((prev) => ({ ...prev, [id]: v }));

  const result = useMemo(() => {
    const assets = assetFields.reduce((sum, f) => sum + (values[f.id] || 0), 0);
    const net = Math.max(0, assets - liabilities);
    const meetsNisab = nisab > 0 && net >= nisab;

    return { assets, net, meetsNisab, zakat: net * RATE };
  }, [values, liabilities, nisab]);

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-green-600';

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-line bg-white p-7 md:p-8">
        <h2 className="font-sans text-lg font-semibold text-ink">Your zakatable wealth</h2>
        <p className="mt-1.5 text-sm text-muted">
          Enter values as at your zakat date. Leave anything that does not apply blank.
        </p>

        <div className="mt-7 space-y-5">
          {assetFields.map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="text-sm font-medium text-ink">
                {f.label} <span className="text-muted">(PKR)</span>
              </label>
              <input
                id={f.id}
                type="number"
                min={0}
                inputMode="decimal"
                value={values[f.id] ?? ''}
                onChange={(e) => set(f.id, Number(e.target.value) || 0)}
                placeholder="0"
                className={inputClass}
              />
              {f.hint && <p className="mt-1.5 text-xs leading-relaxed text-muted">{f.hint}</p>}
            </div>
          ))}

          <div className="border-t border-line pt-5">
            <label htmlFor="liabilities" className="text-sm font-medium text-ink">
              Immediately due liabilities <span className="text-muted">(PKR)</span>
            </label>
            <input
              id="liabilities"
              type="number"
              min={0}
              inputMode="decimal"
              value={liabilities || ''}
              onChange={(e) => setLiabilities(Number(e.target.value) || 0)}
              placeholder="0"
              className={inputClass}
            />
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              Scholars differ on which debts are deductible. Follow the position you hold, and ask a
              scholar if the amount is material.
            </p>
          </div>

          <div>
            <label htmlFor="nisab" className="text-sm font-medium text-ink">
              Current nisab threshold <span className="text-muted">(PKR)</span>
            </label>
            <input
              id="nisab"
              type="number"
              min={0}
              inputMode="decimal"
              value={nisab || ''}
              onChange={(e) => setNisab(Number(e.target.value) || 0)}
              placeholder="Look up today's figure"
              className={inputClass}
            />
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              Nisab is based on prevailing gold or silver prices, so it changes constantly. We do not
              hardcode it. Look up the current figure from a source you trust and enter it here.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <ResultPanel
          eyebrow="Zakat due"
          headline={result.meetsNisab ? `PKR ${formatPKR(result.zakat)}` : '-'}
          sub={
            result.meetsNisab
              ? `2.5% of PKR ${formatPKR(result.net)} net zakatable wealth.`
              : nisab > 0
                ? 'Your net zakatable wealth is below the nisab threshold you entered.'
                : 'Enter the current nisab threshold to see whether zakat is due.'
          }
          rows={[
            { label: 'Total assets', value: `PKR ${formatPKR(result.assets)}` },
            { label: 'Net after liabilities', value: `PKR ${formatPKR(result.net)}`, accent: true },
          ]}
        />

        <div className="flex gap-3 rounded-2xl border-l-4 border-sparkle-400 bg-sparkle-100 p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-green-800" aria-hidden />
          <p className="text-sm leading-relaxed text-ink">
            This calculates at 2.5%, the widely applied rate for a lunar year. It is a calculation
            aid, not a religious ruling. Treatment of long-term holdings and deductible liabilities
            varies between scholars. Where your situation is unusual or the amount is large, ask a
            qualified scholar rather than relying on a calculator.
          </p>
        </div>

        <ToolFooter
          calculatorName="Zakat Calculator"
          disclaimer="We teach the calculation, not the ruling. Nothing here is a fatwa, and we do not take a position where scholars differ. Keep your working. Next year takes a fraction of the time when last year's method is written down."
        />
      </div>
    </div>
  );
}

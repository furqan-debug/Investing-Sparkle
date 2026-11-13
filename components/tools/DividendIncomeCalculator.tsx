'use client';

import { useMemo, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  MiniStat,
  NumberField,
  Segmented,
  SourceNote,
  ToolGrid,
  ToolPanel,
} from './ToolUI';
import { dividendIncome } from '@/lib/dividends';
import { formatNumber, formatPKR, formatPKR2, formatPct } from '@/lib/format';

type Holding = { id: string; name: string; shares: number; dps: number };

const INITIAL: Holding[] = [
  { id: 'a', name: 'Holding A', shares: 1_000, dps: 10 },
  { id: 'b', name: 'Holding B', shares: 500, dps: 12 },
  { id: 'c', name: 'Holding C', shares: 2_000, dps: 8 },
];

/**
 * Portfolio dividend income. The tax rate is a single editable figure because
 * the point here is the portfolio total, not the payer-by-payer table, which
 * the dividend tax calculator already covers.
 */
export function DividendIncomeCalculator() {
  const [holdings, setHoldings] = useState<Holding[]>(INITIAL);
  const [taxRate, setTaxRate] = useState(15);
  const [payouts, setPayouts] = useState(2);
  const nextId = useRef(1);

  const update = (id: string, patch: Partial<Holding>) => {
    setHoldings((current) => current.map((h) => (h.id === id ? { ...h, ...patch } : h)));
  };

  const add = () => {
    setHoldings((current) =>
      current.length >= 8
        ? current
        : [...current, { id: `h-${nextId.current++}`, name: `Holding ${current.length + 1}`, shares: 0, dps: 0 }]
    );
  };

  const remove = (id: string) => {
    setHoldings((current) => (current.length <= 1 ? current : current.filter((h) => h.id !== id)));
  };

  const result = useMemo(
    () => dividendIncome({ holdings, taxRate: taxRate / 100, payouts }),
    [holdings, taxRate, payouts]
  );

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="Your holdings"
          intro="Enter the shares you hold and the annual dividend per share each company or fund pays. Use the gross amount declared, before tax."
        >
          <div className="space-y-3">
            {holdings.map((holding) => (
              <div
                key={holding.id}
                className="grid gap-2 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_auto] sm:items-end"
              >
                <div>
                  <label htmlFor={`dh-name-${holding.id}`} className="mono-label text-[10px]">
                    Holding
                  </label>
                  <input
                    id={`dh-name-${holding.id}`}
                    type="text"
                    value={holding.name}
                    onChange={(event) => update(holding.id, { name: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-[var(--bg-inset)] px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sparkle-400/70 focus:ring-2 focus:ring-sparkle-400/15"
                  />
                </div>

                <div>
                  <label htmlFor={`dh-shares-${holding.id}`} className="mono-label text-[10px]">
                    Shares
                  </label>
                  <input
                    id={`dh-shares-${holding.id}`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={100}
                    value={holding.shares || ''}
                    onChange={(event) => update(holding.id, { shares: Number(event.target.value) || 0 })}
                    placeholder="0"
                    className="num mt-1 w-full rounded-xl border border-line bg-[var(--bg-inset)] px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sparkle-400/70 focus:ring-2 focus:ring-sparkle-400/15"
                  />
                </div>

                <div>
                  <label htmlFor={`dh-dps-${holding.id}`} className="mono-label text-[10px]">
                    Dividend per share
                  </label>
                  <div className="mt-1 flex items-stretch overflow-hidden rounded-xl border border-line bg-[var(--bg-inset)] transition-colors focus-within:border-sparkle-400/70 focus-within:ring-2 focus-within:ring-sparkle-400/15">
                    <span className="flex shrink-0 items-center border-r border-line px-2.5 text-xs text-low">
                      PKR
                    </span>
                    <input
                      id={`dh-dps-${holding.id}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step={0.5}
                      value={holding.dps || ''}
                      onChange={(event) => update(holding.id, { dps: Number(event.target.value) || 0 })}
                      placeholder="0"
                      className="num min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-ink outline-none placeholder:text-low"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => remove(holding.id)}
                  disabled={holdings.length <= 1}
                  aria-label="Remove this holding"
                  className="inline-flex h-[42px] w-full items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-warning/40 hover:text-warning disabled:cursor-not-allowed disabled:opacity-40 sm:w-[42px]"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={add}
            disabled={holdings.length >= 8}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3.5 py-2 text-xs font-medium text-green-300 transition-colors hover:border-green-400/40 hover:text-green-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden /> Add holding
          </button>
        </ToolPanel>

        <ToolPanel
          title="Tax and timing"
          intro="One rate across the portfolio. Use the dividend tax calculator when the payers carry different rates."
        >
          <NumberField
            id="dh-tax"
            label="Dividend withholding tax"
            value={taxRate}
            set={setTaxRate}
            step={1}
            prefix="%"
            hint="15% for a listed company dividend for a filer, 30% for a non-filer. IPPs, REITs and funds have their own rates."
          />
          <Segmented
            label="Typical payouts a year"
            value={String(payouts)}
            set={(value) => setPayouts(Number(value))}
            options={[
              { value: '1', label: 'Annual' },
              { value: '2', label: 'Twice' },
              { value: '4', label: 'Quarterly' },
            ]}
            columns={3}
            hint="Used only to show the average per payout. Real companies pay on their own dates, and some skip a year."
          />
        </ToolPanel>

        <SourceNote
          sources={['whtCard', 'financeAct2026', 'ordinance']}
          title="Rates and sources"
          intro="Checked 13 November 2026. Section 150 sets withholding on dividends. The default is 15% for a listed company dividend for a filer."
          extra="A non-filer pays 30% on the same dividend. An IPP pays 7.5% to a filer, a debt fund 25%, and a company with exempt income or losses 25%. The dividend tax calculator covers each payer type."
        />

        <AssumptionNote>
          A dividend is not guaranteed. The tool assumes every holding pays the annual dividend per
          share you entered. Companies can cut, skip or pay in shares, and the tax rate can change
          with the Finance Act or your ATL status on the payment date.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Net dividend income a year"
          headline={`PKR ${formatPKR(result.net)}`}
          sub={`From PKR ${formatPKR(result.gross)} gross across ${holdings.length} ${holdings.length === 1 ? 'holding' : 'holdings'}. Tax takes PKR ${formatPKR(result.tax)}.`}
          rows={[
            { label: 'Average per payout', value: `PKR ${formatPKR(result.perPayout)}`, accent: true },
            { label: 'Average per month', value: `PKR ${formatPKR(result.monthly)}` },
            { label: 'Gross a year', value: `PKR ${formatPKR(result.gross)}` },
            { label: 'Tax withheld', value: `PKR ${formatPKR(result.tax)}` },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Holdings" value={String(holdings.length)} />
          <MiniStat label="Effective tax rate" value={formatPct(result.effectiveRate)} />
        </div>

        <div className="rounded-2xl border border-line bg-white/[0.018] p-5 md:p-6">
          <h2 className="font-sans text-base font-semibold text-ink">By holding</h2>
          <p className="mt-1 text-xs text-muted">Net of the same withholding rate.</p>

          <div className="mt-4 divide-y divide-line">
            {holdings.map((holding) => {
              const gross = Math.max(0, holding.shares) * Math.max(0, holding.dps);
              const net = gross * (1 - Math.min(1, Math.max(0, taxRate / 100)));

              return (
                <div key={holding.id} className="flex items-start justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm text-ink">{holding.name || 'Holding'}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                      {formatNumber(holding.shares)} shares at PKR {formatPKR2(holding.dps)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="num text-sm text-ink">PKR {formatPKR(net)}</p>
                    <p className="mt-0.5 text-[11px] text-muted">
                      of PKR {formatPKR(gross)} gross
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ToolFooter
          calculatorName="Dividend Income Calculator"
          disclaimer="This is a plan based on the dividends you enter, not a forecast of what a company will pay. It ignores the tax treatment of different payers beyond the single rate you set, and it does not account for dividends paid in shares rather than cash."
        />
      </div>
    </ToolGrid>
  );
}

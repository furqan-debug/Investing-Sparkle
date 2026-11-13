'use client';

import { useMemo, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  MiniStat,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { xirr } from '@/lib/growth';
import { formatPKR, formatPct } from '@/lib/format';

type Flow = { id: string; date: string; amount: number };

const INITIAL: Flow[] = [
  { id: 'a', date: '2023-01-01', amount: -100_000 },
  { id: 'b', date: '2024-01-01', amount: -50_000 },
  { id: 'c', date: '2025-01-01', amount: 20_000 },
  { id: 'd', date: '2026-01-01', amount: 160_000 },
];

/**
 * XIRR from dated cashflows. The sign convention is the one every spreadsheet
 * uses: money leaving your pocket is negative, money arriving is positive.
 */
export function XirrCalculator() {
  const [flows, setFlows] = useState<Flow[]>(INITIAL);
  const nextId = useRef(1);

  const update = (id: string, patch: Partial<Flow>) => {
    setFlows((current) => current.map((flow) => (flow.id === id ? { ...flow, ...patch } : flow)));
  };

  const add = () => {
    setFlows((current) => [
      ...current,
      { id: `cf-${nextId.current++}`, date: '2026-01-01', amount: 0 },
    ]);
  };

  const remove = (id: string) => {
    setFlows((current) => (current.length <= 2 ? current : current.filter((flow) => flow.id !== id)));
  };

  const result = useMemo(() => xirr(flows.map(({ date, amount }) => ({ date, amount }))), [flows]);

  const totals = useMemo(() => {
    const invested = flows.filter((flow) => flow.amount < 0).reduce((sum, flow) => sum + Math.abs(flow.amount), 0);
    const returned = flows.filter((flow) => flow.amount > 0).reduce((sum, flow) => sum + flow.amount, 0);
    const times = flows
      .map((flow) => Date.parse(flow.date))
      .filter((time) => Number.isFinite(time));

    return {
      invested,
      returned,
      net: returned - invested,
      simple: invested > 0 ? (returned - invested) / invested : 0,
      span: times.length > 1 ? (Math.max(...times) - Math.min(...times)) / (365 * 24 * 60 * 60 * 1000) : 0,
    };
  }, [flows]);

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="Cashflows"
          intro="Enter every amount on the date it moved. Money you put in is negative; money you took out is positive."
        >
          <div className="space-y-3">
            {flows.map((flow) => (
              <div
                key={flow.id}
                className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end"
              >
                <div>
                  <label htmlFor={`cf-date-${flow.id}`} className="mono-label text-[10px]">
                    Date
                  </label>
                  <input
                    id={`cf-date-${flow.id}`}
                    type="date"
                    value={flow.date}
                    onChange={(event) => update(flow.id, { date: event.target.value })}
                    className="num mt-1 w-full rounded-xl border border-line bg-[var(--bg-inset)] px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sparkle-400/70 focus:ring-2 focus:ring-sparkle-400/15"
                  />
                </div>

                <div>
                  <label htmlFor={`cf-amount-${flow.id}`} className="mono-label text-[10px]">
                    Amount, negative is money in
                  </label>
                  <div className="mt-1 flex items-stretch overflow-hidden rounded-xl border border-line bg-[var(--bg-inset)] transition-colors focus-within:border-sparkle-400/70 focus-within:ring-2 focus-within:ring-sparkle-400/15">
                    <span className="flex shrink-0 items-center border-r border-line px-3 text-xs text-low">
                      PKR
                    </span>
                    <input
                      id={`cf-amount-${flow.id}`}
                      type="number"
                      inputMode="decimal"
                      step={1_000}
                      value={flow.amount || ''}
                      onChange={(event) => update(flow.id, { amount: Number(event.target.value) || 0 })}
                      placeholder="0"
                      className="num min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-low"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => remove(flow.id)}
                  disabled={flows.length <= 2}
                  aria-label="Remove this cashflow"
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
            className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3.5 py-2 text-xs font-medium text-green-300 transition-colors hover:border-green-400/40 hover:text-green-200"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden /> Add cashflow
          </button>
        </ToolPanel>

        <AssumptionNote>
          The default example is two investments, a dividend and a sale. Replace the rows with your
          own. Dates are exact, so a cashflow on 1 January and one on 31 December of the same year are
          almost a full year apart.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        {result === null ? (
          <WarningNote>
            XIRR needs at least two dated amounts, with at least one negative and one positive. Add
            the money you put in and the money you took out.
          </WarningNote>
        ) : (
          <ResultPanel
            eyebrow={`Money-weighted return over ${totals.span.toFixed(1)} years`}
            headline={formatPct(result)}
            sub={`Across ${flows.length} cashflows, with PKR ${formatPKR(totals.invested)} in and PKR ${formatPKR(totals.returned)} out.`}
            rows={[
              { label: 'Net gain', value: `PKR ${formatPKR(totals.net)}`, accent: true },
              { label: 'Simple return', value: formatPct(totals.simple) },
              { label: 'Total invested', value: `PKR ${formatPKR(totals.invested)}` },
              { label: 'Total returned', value: `PKR ${formatPKR(totals.returned)}` },
            ]}
          />
        )}

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Cashflows" value={String(flows.length)} />
          <MiniStat label="Date span" value={`${totals.span.toFixed(1)} years`} />
        </div>

        <Breakdown
          title="What XIRR is doing"
          rows={[
            { label: 'Money in', value: `PKR ${formatPKR(totals.invested)}` },
            { label: 'Money out', value: `PKR ${formatPKR(totals.returned)}` },
            { label: 'Net result', value: `PKR ${formatPKR(totals.net)}` },
            { label: 'Return on money in', value: formatPct(totals.simple) },
            { label: 'Annualised, money-weighted', value: result === null ? 'Not solvable' : formatPct(result), strong: true, accent: true },
          ]}
          footer={
            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              The simple return divides the net gain by the money you put in. XIRR also accounts for
              when each amount was invested, which is why the two numbers differ.
            </p>
          }
        />

        <ToolFooter
          calculatorName="XIRR Calculator"
          disclaimer="XIRR is only as good as the cashflows you enter. It ignores tax unless you include it, and it assumes each amount is invested for exactly the dates shown. For a single buy and a single sell with no income in between, XIRR equals CAGR."
        />
      </div>
    </ToolGrid>
  );
}

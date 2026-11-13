'use client';

import { useMemo, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  NumberField,
  ToolGrid,
  ToolPanel,
} from './ToolUI';
import { compareStocks, type StockRow } from '@/lib/valuation';
import { formatPKR2, formatPct } from '@/lib/format';

type Stock = {
  id: string;
  name: string;
  price: number;
  eps: number;
  bookValue: number;
  dps: number;
};

const INITIAL: Stock[] = [
  { id: 'a', name: 'Stock A', price: 100, eps: 12, bookValue: 80, dps: 8 },
  { id: 'b', name: 'Stock B', price: 250, eps: 25, bookValue: 100, dps: 5 },
  { id: 'c', name: 'Stock C', price: 50, eps: 4, bookValue: 50, dps: 4 },
];

const METRICS = [
  { key: 'pe', label: 'P/E', kind: 'multiple' },
  { key: 'pb', label: 'P/B', kind: 'multiple' },
  { key: 'dividendYield', label: 'Dividend yield', kind: 'percent' },
  { key: 'roe', label: 'Return on equity', kind: 'percent' },
] as const;

type MetricKey = (typeof METRICS)[number]['key'];

function formatMetric(value: number | null, kind: 'multiple' | 'percent'): string {
  if (value === null) return 'n/a';
  return kind === 'multiple' ? `${value.toFixed(2)}x` : formatPct(value);
}

/**
 * A like-for-like comparison of the figures the visitor enters. The tool does
 * not fetch prices or financial statements: the quality of the comparison is
 * the quality of the inputs.
 */
export function CompareStocksCalculator() {
  const [stocks, setStocks] = useState<Stock[]>(INITIAL);
  const nextId = useRef(1);

  const update = (id: string, patch: Partial<Stock>) => {
    setStocks((current) => current.map((stock) => (stock.id === id ? { ...stock, ...patch } : stock)));
  };

  const add = () => {
    setStocks((current) =>
      current.length >= 4
        ? current
        : [
            ...current,
            {
              id: `s-${nextId.current++}`,
              name: `Stock ${String.fromCharCode(65 + current.length)}`,
              price: 0,
              eps: 0,
              bookValue: 0,
              dps: 0,
            },
          ]
    );
  };

  const remove = (id: string) => {
    setStocks((current) => (current.length <= 2 ? current : current.filter((stock) => stock.id !== id)));
  };

  const result = useMemo(() => compareStocks(stocks), [stocks]);

  const namesFor = (key: MetricKey, value: number | null) => {
    if (value === null) return 'n/a';
    const names = result.rows
      .filter((row) => row[key] !== null && Math.abs((row[key] as number) - value) < 1e-9)
      .map((row) => row.name || 'Unnamed');
    return names.length > 0 ? names.join(', ') : 'n/a';
  };

  const isBest = (row: StockRow, key: MetricKey) => {
    const value = row[key];
    const best = result.best[key];
    return value !== null && best !== null && Math.abs(value - best) < 1e-9;
  };

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The stocks"
          intro="Enter the same kind of figures for each company: current price, earnings per share, book value per share and annual dividend per share. Two to four stocks."
        >
          <div className="space-y-3">
            {stocks.map((stock) => (
              <div key={stock.id} className="rounded-xl border border-line bg-[var(--bg-inset)] p-3.5">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={stock.name}
                    onChange={(event) => update(stock.id, { name: event.target.value })}
                    aria-label="Stock name"
                    className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink outline-none placeholder:text-low"
                    placeholder="Stock name"
                  />
                  <button
                    type="button"
                    onClick={() => remove(stock.id)}
                    disabled={stocks.length <= 2}
                    aria-label="Remove this stock"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-warning/40 hover:text-warning disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <NumberField
                    id={`compare-price-${stock.id}`}
                    label="Price"
                    value={stock.price}
                    set={(value) => update(stock.id, { price: value })}
                    step={0.5}
                    prefix="PKR"
                  />
                  <NumberField
                    id={`compare-eps-${stock.id}`}
                    label="EPS"
                    value={stock.eps}
                    set={(value) => update(stock.id, { eps: value })}
                    step={0.5}
                    prefix="PKR"
                  />
                  <NumberField
                    id={`compare-book-${stock.id}`}
                    label="Book value"
                    value={stock.bookValue}
                    set={(value) => update(stock.id, { bookValue: value })}
                    step={1}
                    prefix="PKR"
                  />
                  <NumberField
                    id={`compare-dps-${stock.id}`}
                    label="Dividend"
                    value={stock.dps}
                    set={(value) => update(stock.id, { dps: value })}
                    step={0.5}
                    prefix="PKR"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={add}
            disabled={stocks.length >= 4}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3.5 py-2 text-xs font-medium text-green-300 transition-colors hover:border-green-400/40 hover:text-green-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden /> Add stock
          </button>
        </ToolPanel>

        <AssumptionNote>
          This compares the figures you enter, not live prices or reported statements. P/E and P/B are
          lower for cheaper stocks; dividend yield and return on equity are higher for stronger ones.
          A negative EPS or book value makes the relevant ratio unavailable, not zero.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Best on each measure"
          headline={
            result.best.pe !== null ? `P/E leader: ${namesFor('pe', result.best.pe)}` : 'Not enough data'
          }
          sub="Lower P/E and P/B are cheaper. Higher dividend yield and return on equity are stronger. Each measure is marked in the table below."
          rows={[
            {
              label: 'Lowest P/E',
              value: `${namesFor('pe', result.best.pe)}${result.best.pe !== null ? ` · ${result.best.pe.toFixed(2)}x` : ''}`,
              accent: result.best.pe !== null,
            },
            {
              label: 'Lowest P/B',
              value: `${namesFor('pb', result.best.pb)}${result.best.pb !== null ? ` · ${result.best.pb.toFixed(2)}x` : ''}`,
            },
            {
              label: 'Highest dividend yield',
              value: `${namesFor('dividendYield', result.best.dividendYield)}${
                result.best.dividendYield !== null ? ` · ${formatPct(result.best.dividendYield)}` : ''
              }`,
            },
            {
              label: 'Highest return on equity',
              value: `${namesFor('roe', result.best.roe)}${
                result.best.roe !== null ? ` · ${formatPct(result.best.roe)}` : ''
              }`,
            },
          ]}
        />

        <div className="hidden overflow-hidden rounded-2xl border border-line bg-white/[0.018] md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="mono-label px-4 py-3 text-left text-[10px]">
                    Metric
                  </th>
                  {result.rows.map((row) => (
                    <th key={row.id} scope="col" className="px-3 py-3 text-right text-xs font-medium text-ink">
                      <span className="block max-w-[10rem] truncate">{row.name || 'Unnamed'}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {METRICS.map((metric) => (
                  <tr key={metric.key}>
                    <th scope="row" className="px-4 py-2.5 text-left text-xs font-normal text-muted">
                      {metric.label}
                    </th>
                    {result.rows.map((row) => {
                      const best = isBest(row, metric.key);
                      return (
                        <td
                          key={row.id}
                          className={`num px-3 py-2.5 text-right text-xs ${
                            best ? 'text-sparkle-300' : 'text-ink'
                          }`}
                        >
                          {formatMetric(row[metric.key], metric.kind)}
                          {best && <span className="ml-1 text-[9px] uppercase tracking-wide">Best</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3 md:hidden">
          {result.rows.map((row) => (
            <div key={row.id} className="rounded-2xl border border-line bg-white/[0.018] p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="min-w-0 truncate text-sm font-semibold text-ink">{row.name || 'Unnamed'}</p>
                <p className="num shrink-0 text-xs text-muted">PKR {formatPKR2(row.price)}</p>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-3">
                {METRICS.map((metric) => {
                  const best = isBest(row, metric.key);
                  return (
                    <div key={metric.key}>
                      <dt className="mono-label text-[10px]">{metric.label}</dt>
                      <dd className={`num mt-1 text-sm ${best ? 'text-sparkle-300' : 'text-ink'}`}>
                        {formatMetric(row[metric.key], metric.kind)}
                        {best && <span className="ml-1 text-[9px] uppercase tracking-wide">Best</span>}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
        </div>

        <ToolFooter
          calculatorName="Compare PSX Stocks"
          disclaimer="The comparison is only as good as the figures you enter. It does not fetch live prices or reported statements, and it ignores debt, cash, growth, accounting differences and the reason one stock is cheaper than another. A single ratio is not an investment case."
        />
      </div>
    </ToolGrid>
  );
}

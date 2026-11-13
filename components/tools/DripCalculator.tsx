'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  MiniStat,
  NumberField,
  SourceNote,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { drip } from '@/lib/dividends';
import { formatNumber, formatPKR, formatPKR2, formatPct } from '@/lib/format';

/**
 * Dividend reinvestment. The model buys shares at the prevailing price each
 * year and lets the payout grow at its own rate. Fractional shares are allowed,
 * which is a simplification of a real plan.
 */
export function DripCalculator() {
  const [shares, setShares] = useState(1_000);
  const [price, setPrice] = useState(100);
  const [dps, setDps] = useState(8);
  const [dividendGrowth, setDividendGrowth] = useState(5);
  const [priceGrowth, setPriceGrowth] = useState(8);
  const [years, setYears] = useState(10);
  const [taxRate, setTaxRate] = useState(15);

  const horizon = Math.max(1, Math.round(years));

  const result = useMemo(
    () =>
      drip({
        shares,
        price,
        dps,
        dividendGrowth: dividendGrowth / 100,
        priceGrowth: priceGrowth / 100,
        years: horizon,
        taxRate: taxRate / 100,
      }),
    [shares, price, dps, dividendGrowth, priceGrowth, horizon, taxRate]
  );

  const schedule = useMemo(() => {
    const rows = result.schedule;
    if (rows.length <= 12) return rows;
    const step = Math.ceil(rows.length / 12);
    return rows.filter((row, index) => index === 0 || index === rows.length - 1 || index % step === 0);
  }, [result.schedule]);

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The holding"
          intro="One stock or fund, held for a set number of years. The dividend is reinvested at the price on the day it is paid."
        >
          <NumberField
            id="drip-shares"
            label="Shares held"
            value={shares}
            set={setShares}
            step={100}
            prefix="Qty"
          />
          <NumberField
            id="drip-price"
            label="Current share price"
            value={price}
            set={setPrice}
            step={0.5}
            prefix="PKR"
          />
          <NumberField
            id="drip-dps"
            label="Annual dividend per share"
            value={dps}
            set={setDps}
            step={0.5}
            prefix="PKR"
            hint="The cash dividend for the current year, before withholding tax."
          />
          <NumberField
            id="drip-dividend-growth"
            label="Dividend growth a year"
            value={dividendGrowth}
            set={setDividendGrowth}
            step={0.5}
            prefix="%"
            hint="A constant growth rate. Real dividends can be cut as well as raised."
          />
          <NumberField
            id="drip-price-growth"
            label="Share price growth a year"
            value={priceGrowth}
            set={setPriceGrowth}
            step={0.5}
            prefix="%"
            hint="Used to value the final holding and to set the price at each reinvestment."
          />
          <NumberField
            id="drip-years"
            label="Years"
            value={years}
            set={setYears}
            min={1}
            step={1}
            prefix="Years"
            hint="Whole years. The tool rounds a fractional entry to the nearest year."
          />
          <NumberField
            id="drip-tax"
            label="Dividend withholding tax"
            value={taxRate}
            set={setTaxRate}
            step={1}
            prefix="%"
            hint="15% for a listed company dividend for a filer, 30% for a non-filer."
          />
        </ToolPanel>

        <SourceNote
          sources={['whtCard', 'financeAct2026', 'ordinance']}
          title="Rates and sources"
          intro="Checked 13 November 2026. Section 150 sets withholding on dividends. The default is 15% for a listed company dividend for a filer."
          extra="The tax rate is editable because the payer and your ATL status change it. The model reinvests the net dividend, not the gross amount."
        />

        <AssumptionNote>
          The model allows fractional shares. A real plan may buy whole shares and carry the
          remainder as cash, which produces a slightly lower final share count. Fees, taxes on the
          sale and changes in the payout ratio are outside the calculation.
        </AssumptionNote>

        {price <= 0 && (
          <WarningNote>
            A share price of zero cannot buy new shares. Enter the price at which the dividend would
            be reinvested to see the effect of compounding.
          </WarningNote>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow={`Value after ${horizon} ${horizon === 1 ? 'year' : 'years'}`}
          headline={`PKR ${formatPKR(result.finalValue)}`}
          sub={`From ${formatNumber(shares)} shares at PKR ${formatPKR2(price)}, with dividends reinvested and the payout growing ${dividendGrowth}% a year.`}
          rows={[
            { label: 'Final share count', value: formatNumber(result.finalShares, 2), accent: true },
            { label: 'Gross dividends', value: `PKR ${formatPKR(result.totalDividends)}` },
            { label: 'Net reinvested', value: `PKR ${formatPKR(result.totalReinvested)}` },
            { label: 'Value if cash taken', value: `PKR ${formatPKR(result.cashValue)}` },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Reinvestment advantage" value={`PKR ${formatPKR(result.advantage)}`} />
          <MiniStat
            label="Forward annual income"
            value={`PKR ${formatPKR(result.finalAnnualIncome)}`}
          />
        </div>

        <div className="rounded-2xl border border-line bg-white/[0.018] p-5 md:p-6">
          <h2 className="font-sans text-base font-semibold text-ink">Year by year</h2>
          <p className="mt-1 text-xs text-muted">
            Shares after reinvestment, dividends received and holding value at the end of each year.
          </p>

          <div className="mono-label mt-4 grid grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] gap-2 text-[10px]">
            <span>Year</span>
            <span className="text-right">Shares</span>
            <span className="text-right">Dividends</span>
            <span className="text-right">Value</span>
          </div>

          <div className="divide-y divide-line">
            {schedule.map((row) => (
              <div
                key={row.year}
                className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] gap-2 py-2.5 text-[11px]"
              >
                <span className="text-muted">{row.year}</span>
                <span className="num text-right text-ink">{formatNumber(row.shares, 0)}</span>
                <span className="num text-right text-ink">{formatPKR(row.dividends)}</span>
                <span className="num text-right text-ink">{formatPKR(row.value)}</span>
              </div>
            ))}
          </div>

          <p className="mt-3 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">
            All figures in PKR. Dividends are gross. The final value uses the price after the last
            year’s growth.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <MiniStat
            label="Income growth"
            value={formatPct(
              result.initialAnnualIncome > 0
                ? result.finalAnnualIncome / result.initialAnnualIncome - 1
                : 0
            )}
          />
          <MiniStat label="Final share price" value={`PKR ${formatPKR2(result.finalPrice)}`} />
        </div>

        <ToolFooter
          calculatorName="Dividend Reinvestment (DRIP) Calculator"
          disclaimer="Reinvestment is modelled at the prevailing price with no fees, no taxes beyond withholding, and constant growth in the dividend and the share price. Real payouts and prices arrive unevenly, and a cut in the dividend changes the result far more than a small change in the growth rate."
        />
      </div>
    </ToolGrid>
  );
}

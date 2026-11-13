'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  NumberField,
  Segmented,
  SourceNote,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { cpiAdjust, inflationAdjust } from '@/lib/growth';
import { formatPKR, formatPct } from '@/lib/format';

type Mode = 'future' | 'today' | 'cpi';

/**
 * Inflation moves an amount in one direction; discounting moves it back. The
 * CPI mode does the same job with two index readings, so no series is bundled
 * and no rate is invented.
 */
export function InflationCalculator() {
  const [mode, setMode] = useState<Mode>('future');
  const [amount, setAmount] = useState(100_000);
  const [ratePct, setRatePct] = useState(7);
  const [years, setYears] = useState(10);
  const [cpiStart, setCpiStart] = useState(100);
  const [cpiEnd, setCpiEnd] = useState(250);

  const adjusted = useMemo(
    () => inflationAdjust({ amount, rate: ratePct / 100, years }),
    [amount, ratePct, years]
  );

  const cpi = useMemo(
    () => cpiAdjust({ amount, cpiStart, cpiEnd }),
    [amount, cpiStart, cpiEnd]
  );

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="What you want to convert"
          intro="Move an amount forward at an inflation rate, discount a future amount back to today, or use two CPI index readings."
        >
          <Segmented<Mode>
            label="Calculation"
            value={mode}
            set={setMode}
            options={[
              { value: 'future', label: 'Future cost' },
              { value: 'today', label: 'Worth today' },
              { value: 'cpi', label: 'CPI index' },
            ]}
            columns={3}
          />

          <NumberField
            id="inflation-amount"
            label={mode === 'today' ? 'Amount in the future' : 'Amount today'}
            value={amount}
            set={setAmount}
            step={10_000}
            prefix="PKR"
          />

          {mode === 'cpi' ? (
            <>
              <NumberField
                id="cpi-start"
                label="CPI at the earlier date"
                value={cpiStart}
                set={setCpiStart}
                step={1}
                prefix="Index"
                hint="Use the index number from the release, not the percentage change."
              />
              <NumberField
                id="cpi-end"
                label="CPI at the later date"
                value={cpiEnd}
                set={setCpiEnd}
                step={1}
                prefix="Index"
                hint="Both readings must come from the same base year."
              />
            </>
          ) : (
            <>
              <NumberField
                id="inflation-rate"
                label="Assumed annual inflation"
                value={ratePct}
                set={setRatePct}
                step={0.5}
                prefix="%"
                hint="A rate you choose. The tool does not forecast inflation."
              />
              <NumberField
                id="inflation-years"
                label="Years"
                value={years}
                set={setYears}
                step={1}
                prefix="Years"
              />
            </>
          )}
        </ToolPanel>

        {mode === 'cpi' ? (
          <SourceNote
            sources={['pbsCpi']}
            title="Where the index comes from"
            intro="The calculator does not bundle a CPI series. It uses the two index numbers you enter, taken from the monthly releases published by the Pakistan Bureau of Statistics."
            extra="Checked 13 November 2026. CPI base years have changed over time, so use two readings from the same series. Only the ratio matters, which means the base year cancels out."
          />
        ) : (
          <AssumptionNote>
            A constant inflation rate is a planning assumption, not a forecast. Pakistan's inflation
            has moved sharply between years, so test a higher rate as well as the one you expect.
          </AssumptionNote>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {mode === 'future' && (
          <>
            <ResultPanel
              eyebrow={`In ${years} ${years === 1 ? 'year' : 'years'}`}
              headline={`PKR ${formatPKR(adjusted.futureCost)}`}
              sub={`At ${ratePct}% inflation, PKR ${formatPKR(amount)} of today's spending costs this much in ${years} ${years === 1 ? 'year' : 'years'}.`}
              rows={[
                { label: 'Total inflation', value: formatPct(adjusted.change), accent: true },
                { label: 'Cost multiplier', value: `${(1 + adjusted.change).toFixed(2)}x` },
                { label: 'Extra needed', value: `PKR ${formatPKR(adjusted.futureCost - amount)}` },
                { label: 'Amount today', value: `PKR ${formatPKR(amount)}` },
              ]}
            />

            <Breakdown
              title="The arithmetic"
              rows={[
                { label: 'Amount today', value: `PKR ${formatPKR(amount)}` },
                { label: 'Assumed inflation', value: `${ratePct}% a year` },
                { label: 'Years', value: String(years) },
                { label: 'Compounding', value: 'Annual' },
                { label: 'Future cost', value: `PKR ${formatPKR(adjusted.futureCost)}`, strong: true, accent: true },
              ]}
            />
          </>
        )}

        {mode === 'today' && (
          <>
            <ResultPanel
              eyebrow={`Discounted back ${years} ${years === 1 ? 'year' : 'years'}`}
              headline={`PKR ${formatPKR(adjusted.todayValue)}`}
              sub={`PKR ${formatPKR(amount)} received in ${years} ${years === 1 ? 'year' : 'years'} buys what this much buys today, at ${ratePct}% inflation.`}
              rows={[
                { label: 'Purchasing power lost', value: formatPct(amount > 0 ? 1 - adjusted.todayValue / amount : 0), accent: true },
                { label: 'Value multiplier', value: `${(amount > 0 ? adjusted.todayValue / amount : 0).toFixed(2)}x` },
                { label: 'Amount in the future', value: `PKR ${formatPKR(amount)}` },
                { label: 'Assumed inflation', value: `${ratePct}% a year` },
              ]}
            />

            <Breakdown
              title="The arithmetic"
              rows={[
                { label: 'Future amount', value: `PKR ${formatPKR(amount)}` },
                { label: 'Assumed inflation', value: `${ratePct}% a year` },
                { label: 'Years', value: String(years) },
                { label: 'Compounding', value: 'Annual' },
                { label: 'Worth today', value: `PKR ${formatPKR(adjusted.todayValue)}`, strong: true, accent: true },
              ]}
            />
          </>
        )}

        {mode === 'cpi' && (
          <>
            {cpi.valid ? (
              <ResultPanel
                eyebrow={`Index ${cpiStart} to ${cpiEnd}`}
                headline={`PKR ${formatPKR(cpi.equivalent)}`}
                sub={`PKR ${formatPKR(amount)} at the earlier index has the same purchasing power as this amount at the later index.`}
                rows={[
                  { label: 'Index change', value: formatPct(cpi.change), accent: true },
                  { label: 'Index ratio', value: `${(cpiEnd / cpiStart).toFixed(2)}x` },
                  { label: 'Earlier index', value: String(cpiStart) },
                  { label: 'Later index', value: String(cpiEnd) },
                ]}
              />
            ) : (
              <WarningNote>
                Both index readings have to be greater than zero. Copy the index number from the CPI
                release, not the year-on-year percentage.
              </WarningNote>
            )}

            <Breakdown
              title="The arithmetic"
              rows={[
                { label: 'Amount at earlier index', value: `PKR ${formatPKR(amount)}` },
                { label: 'Earlier index', value: String(cpiStart) },
                { label: 'Later index', value: String(cpiEnd) },
                { label: 'Equivalent later amount', value: cpi.valid ? `PKR ${formatPKR(cpi.equivalent)}` : 'Not available', strong: true, accent: true },
              ]}
            />
          </>
        )}

        <ToolFooter
          calculatorName="Inflation Calculator"
          disclaimer="This is a conversion, not a forecast. The rate mode uses the inflation you enter; the CPI mode uses the two index readings you supply. Neither accounts for the fact that your personal basket may move differently from the headline index."
        />
      </div>
    </ToolGrid>
  );
}

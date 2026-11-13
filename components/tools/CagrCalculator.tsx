'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  NumberField,
  Segmented,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { cagr, projectGrowth } from '@/lib/growth';
import { formatPKR, formatPct } from '@/lib/format';

type Mode = 'rate' | 'project' | 'years';

/**
 * CAGR connects a starting value to an ending value. The projection and
 * years-needed modes use the same equation rearranged for a different unknown.
 */
export function CagrCalculator() {
  const [mode, setMode] = useState<Mode>('rate');

  const [initial, setInitial] = useState(100_000);
  const [finalValue, setFinalValue] = useState(250_000);
  const [years, setYears] = useState(5);
  const [ratePct, setRatePct] = useState(15);

  const rateResult = useMemo(
    () => cagr({ initial, final: finalValue, years }),
    [initial, finalValue, years]
  );

  const projected = useMemo(
    () => projectGrowth({ initial, rate: ratePct / 100, years }),
    [initial, ratePct, years]
  );

  const yearsNeeded = useMemo(() => {
    if (initial <= 0 || finalValue <= 0 || ratePct <= 0) return null;
    const ratio = finalValue / initial;
    if (ratio <= 1) return null;
    return Math.log(ratio) / Math.log(1 + ratePct / 100);
  }, [initial, finalValue, ratePct]);

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="What you want to solve"
          intro="CAGR is one rate that joins two values. Ask for the rate, the future value, or the time it takes."
        >
          <Segmented<Mode>
            label="Calculation"
            value={mode}
            set={setMode}
            options={[
              { value: 'rate', label: 'Find the rate' },
              { value: 'project', label: 'Project a value' },
              { value: 'years', label: 'Find the years' },
            ]}
            columns={3}
          />

          <NumberField
            id="cagr-initial"
            label="Starting value"
            value={initial}
            set={setInitial}
            step={10_000}
            prefix="PKR"
          />

          {mode === 'project' ? (
            <>
              <NumberField
                id="cagr-target-rate"
                label="Target CAGR"
                value={ratePct}
                set={setRatePct}
                step={0.5}
                prefix="%"
                hint="The constant annual rate you want to test."
              />
              <NumberField
                id="cagr-projection-years"
                label="Years"
                value={years}
                set={setYears}
                step={1}
                prefix="Years"
              />
            </>
          ) : (
            <NumberField
              id="cagr-final"
              label={mode === 'years' ? 'Target value' : 'Ending value'}
              value={finalValue}
              set={setFinalValue}
              step={10_000}
              prefix="PKR"
            />
          )}

          {mode === 'rate' && (
            <NumberField
              id="cagr-years"
              label="Years held"
              value={years}
              set={setYears}
              step={1}
              prefix="Years"
              hint="Use exact years, including part years as a decimal if needed."
            />
          )}

          {mode === 'years' && (
            <NumberField
              id="cagr-rate"
              label="Assumed CAGR"
              value={ratePct}
              set={setRatePct}
              step={0.5}
              prefix="%"
            />
          )}
        </ToolPanel>

        <AssumptionNote>
          CAGR uses only the starting value, the ending value and the time between them. It says
          nothing about the path, the drawdowns, or the timing of any money you added or removed.
          For a portfolio with contributions, use XIRR.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        {mode === 'rate' && (
          <>
            {rateResult.valid ? (
              <ResultPanel
                eyebrow={`Over ${years} ${years === 1 ? 'year' : 'years'}`}
                headline={formatPct(rateResult.rate)}
                sub={`The constant yearly rate that turns PKR ${formatPKR(initial)} into PKR ${formatPKR(finalValue)}.`}
                rows={[
                  { label: 'Total return', value: formatPct(rateResult.totalReturn), accent: true },
                  { label: 'Multiple of your money', value: `${rateResult.multiple.toFixed(2)}x` },
                  { label: 'Gain', value: `PKR ${formatPKR(finalValue - initial)}` },
                  { label: 'Years', value: String(years) },
                ]}
              />
            ) : (
              <WarningNote>
                Enter a starting value, an ending value and a holding period greater than zero. CAGR
                is undefined when the starting value is zero.
              </WarningNote>
            )}

            <Breakdown
              title="The two endpoints"
              rows={[
                { label: 'Starting value', value: `PKR ${formatPKR(initial)}` },
                { label: 'Ending value', value: `PKR ${formatPKR(finalValue)}` },
                { label: 'Absolute change', value: `PKR ${formatPKR(finalValue - initial)}` },
                { label: 'Years', value: String(years) },
              ]}
            />
          </>
        )}

        {mode === 'project' && (
          <>
            <ResultPanel
              eyebrow={`After ${years} ${years === 1 ? 'year' : 'years'} at ${ratePct}%`}
              headline={`PKR ${formatPKR(projected)}`}
              sub={`From PKR ${formatPKR(initial)}, growing at a constant ${ratePct}% a year.`}
              rows={[
                { label: 'Growth added', value: `PKR ${formatPKR(projected - initial)}`, accent: true },
                { label: 'Multiple of your money', value: `${(projected / Math.max(1, initial)).toFixed(2)}x` },
                { label: 'Assumed CAGR', value: `${ratePct}%` },
                { label: 'Years', value: String(years) },
              ]}
            />

            <Breakdown
              title="What the projection assumes"
              rows={[
                { label: 'Starting value', value: `PKR ${formatPKR(initial)}` },
                { label: 'Constant annual rate', value: `${ratePct}%` },
                { label: 'Compounding', value: 'Annual' },
                { label: 'Years', value: String(years) },
              ]}
            />
          </>
        )}

        {mode === 'years' && (
          <>
            {yearsNeeded !== null ? (
              <ResultPanel
                eyebrow={`At ${ratePct}% a year`}
                headline={`${yearsNeeded.toFixed(1)} years`}
                sub={`The time needed to turn PKR ${formatPKR(initial)} into PKR ${formatPKR(finalValue)} at a constant ${ratePct}% CAGR.`}
                rows={[
                  { label: 'Target multiple', value: `${(finalValue / Math.max(1, initial)).toFixed(2)}x` },
                  { label: 'Assumed CAGR', value: `${ratePct}%`, accent: true },
                  { label: 'Starting value', value: `PKR ${formatPKR(initial)}` },
                  { label: 'Target value', value: `PKR ${formatPKR(finalValue)}` },
                ]}
              />
            ) : (
              <WarningNote>
                The target has to be larger than the starting value, and the assumed CAGR has to be
                above zero. Otherwise the target is never reached.
              </WarningNote>
            )}

            <Breakdown
              title="The arithmetic"
              rows={[
                { label: 'Target multiple', value: `${(finalValue / Math.max(1, initial)).toFixed(2)}x` },
                { label: 'Assumed annual rate', value: `${ratePct}%` },
                { label: 'Formula', value: 'Logarithmic' },
              ]}
            />
          </>
        )}

        <ToolFooter
          calculatorName="CAGR Calculator"
          disclaimer="CAGR is a summary of two endpoints, not a description of the journey. It ignores volatility, taxes, fees and the timing of contributions. Use it to compare like with like, not to predict next year."
        />
      </div>
    </ToolGrid>
  );
}

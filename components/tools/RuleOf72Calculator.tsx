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
import { doublingTime, rateToDouble } from '@/lib/growth';
import { formatPct } from '@/lib/format';

type Mode = 'years' | 'rate';

/**
 * The rule of 72, with the exact logarithm beside it. The shortcut is useful
 * precisely because the error is small in the range people usually use.
 */
export function RuleOf72Calculator() {
  const [mode, setMode] = useState<Mode>('years');
  const [ratePct, setRatePct] = useState(12);
  const [years, setYears] = useState(8);

  const exactYears = useMemo(() => doublingTime(ratePct / 100), [ratePct]);
  const exactRate = useMemo(() => rateToDouble(years), [years]);

  const valid = mode === 'years' ? ratePct > 0 : years > 0;
  const divisor = mode === 'years' ? ratePct : years;
  const rule72 = valid ? 72 / divisor : 0;
  const rule693 = valid ? 69.3 / divisor : 0;

  const headline =
    mode === 'years'
      ? valid
        ? `${exactYears.toFixed(1)} years`
        : 'Not enough data'
      : valid
        ? formatPct(exactRate)
        : 'Not enough data';

  const difference = valid
    ? mode === 'years'
      ? exactYears - rule72
      : exactRate - rule72 / 100
    : 0;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="What you know"
          intro="Pick the direction. The exact answer uses logarithms; the rule of 72 is the shortcut people carry in their heads."
        >
          <Segmented<Mode>
            label="Calculation"
            value={mode}
            set={setMode}
            options={[
              { value: 'years', label: 'Years to double' },
              { value: 'rate', label: 'Rate to double' },
            ]}
          />

          {mode === 'years' ? (
            <NumberField
              id="rule-rate"
              label="Annual return"
              value={ratePct}
              set={setRatePct}
              step={0.5}
              prefix="%"
              hint="A constant compound rate. The rule is most accurate between about 6% and 10%."
            />
          ) : (
            <NumberField
              id="rule-years"
              label="Years to double"
              value={years}
              set={setYears}
              step={1}
              prefix="Years"
              hint="How long you are willing to wait for the money to double."
            />
          )}
        </ToolPanel>

        <AssumptionNote>
          The exact doubling time is ln(2) / ln(1 + rate). The rule of 72 divides 72 by the
          percentage rate, which is close enough for a mental estimate and increasingly wrong at high
          rates.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        {valid ? (
          <ResultPanel
            eyebrow={mode === 'years' ? `At ${ratePct}% a year` : `To double in ${years} years`}
            headline={headline}
            sub={
              mode === 'years'
                ? `The exact time for a lump sum to double at a constant ${ratePct}% compound return.`
                : `The exact compound return needed to double your money in ${years} years.`
            }
            rows={[
              {
                label: 'Rule of 72 estimate',
                value: mode === 'years' ? `${rule72.toFixed(1)} years` : formatPct(rule72 / 100),
                accent: true,
              },
              {
                label: 'Rule of 69.3 estimate',
                value: mode === 'years' ? `${rule693.toFixed(1)} years` : formatPct(rule693 / 100),
              },
              {
                label: 'Shortcut error',
                value:
                  mode === 'years'
                    ? `${difference >= 0 ? '+' : ''}${difference.toFixed(2)} years`
                    : `${difference >= 0 ? '+' : ''}${(difference * 100).toFixed(2)} points`,
              },
              { label: 'Exact answer', value: headline },
            ]}
          />
        ) : (
          <WarningNote>
            Enter a rate or a number of years above zero. Money does not double at zero, and a
            negative return never doubles it.
          </WarningNote>
        )}

        <Breakdown
          title="Common rates"
          rows={[6, 8, 10, 12, 15, 20].map((rate) => ({
            label: `${rate}% a year (rule ${(72 / rate).toFixed(1)})`,
            value: `${doublingTime(rate / 100).toFixed(1)} years`,
          }))}
        />

        <ToolFooter
          calculatorName="Rule of 72 Calculator"
          disclaimer="Doubling time assumes a constant compound return with no tax, fees or withdrawals. Real returns vary, so the actual doubling date will not match any single rate."
        />
      </div>
    </ToolGrid>
  );
}

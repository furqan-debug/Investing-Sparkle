'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  MiniStat,
  NumberField,
  Segmented,
  ToolGrid,
  ToolPanel,
} from './ToolUI';
import { lumpsum, type Compounding } from '@/lib/growth';
import { formatPKR, formatPct } from '@/lib/format';

/**
 * A single amount left to compound. The real value matters as much as the
 * nominal one, so both are on the same screen.
 */
export function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(500_000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(7);
  const [frequency, setFrequency] = useState<Compounding>('monthly');

  const result = useMemo(
    () =>
      lumpsum({
        principal,
        annualRate: annualRate / 100,
        years,
        inflation: inflation / 100,
        frequency,
      }),
    [principal, annualRate, years, inflation, frequency]
  );

  const schedule = useMemo(() => {
    const rows = result.schedule;
    if (rows.length <= 10) return rows;
    const step = Math.ceil(rows.length / 10);
    return rows.filter((row, index) => index === 0 || index === rows.length - 1 || index % step === 0);
  }, [result.schedule]);

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The investment"
          intro="One amount, invested once and left alone. The return is the figure you choose, not a forecast."
        >
          <NumberField
            id="lumpsum-principal"
            label="Amount invested"
            value={principal}
            set={setPrincipal}
            step={10_000}
            prefix="PKR"
            hint="The full amount placed on day one."
          />
          <NumberField
            id="lumpsum-rate"
            label="Assumed annual return"
            value={annualRate}
            set={setAnnualRate}
            step={0.5}
            prefix="%"
            hint="Before tax and fees. A constant rate is a simplification, not a prediction."
          />
          <NumberField
            id="lumpsum-years"
            label="Years invested"
            value={years}
            set={setYears}
            step={1}
            prefix="Years"
            hint="The longer the horizon, the more of the final value comes from growth."
          />
          <NumberField
            id="lumpsum-inflation"
            label="Assumed inflation"
            value={inflation}
            set={setInflation}
            step={0.5}
            prefix="%"
            hint="Used only to convert the result into today's purchasing power."
          />
          <Segmented<Compounding>
            label="Compounding frequency"
            value={frequency}
            set={setFrequency}
            options={[
              { value: 'annual', label: 'Annual' },
              { value: 'quarterly', label: 'Quarterly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
            hint="How often the return is added to the balance. Monthly compounding produces the highest figure at the same stated rate."
          />
        </ToolPanel>

        <AssumptionNote>
          The return is applied evenly and the amount is never touched. Real markets deliver uneven
          returns, and a bad decade early on changes the outcome far more than the same average
          suggests. Tax, platform fees and exit loads are not deducted.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow={`After ${years} ${years === 1 ? 'year' : 'years'}`}
          headline={`PKR ${formatPKR(result.futureValue)}`}
          sub={`From PKR ${formatPKR(principal)} at ${annualRate}% a year, compounded ${frequency}.`}
          rows={[
            { label: 'Growth added', value: `PKR ${formatPKR(result.growth)}`, accent: true },
            { label: 'Multiple of your money', value: `${result.multiple.toFixed(2)}x` },
            { label: 'Worth in today’s prices', value: `PKR ${formatPKR(result.realValue)}` },
            { label: 'Real annual return', value: formatPct(result.realRate) },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat
            label="Nominal gain"
            value={formatPct(principal > 0 ? result.growth / principal : 0)}
          />
          <MiniStat
            label="Purchasing power change"
            value={formatPct(principal > 0 ? result.realValue / principal - 1 : 0)}
          />
        </div>

        <Breakdown
          title="Value path"
          rows={schedule.map((row) => ({
            label: row.year === 0 ? 'Start' : `Year ${row.year}`,
            value: `PKR ${formatPKR(row.value)}`,
          }))}
        />

        <ToolFooter
          calculatorName="Lumpsum Investment Calculator"
          disclaimer="This is arithmetic, not a forecast. The return and inflation figures are the ones you entered, and the result ignores tax, fees and the uneven path real returns take."
        />
      </div>
    </ToolGrid>
  );
}

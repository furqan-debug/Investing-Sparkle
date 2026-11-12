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
} from './ToolUI';
import { purification } from '@/lib/tax';
import { formatPKR, formatPct } from '@/lib/format';

/**
 * Dividend purification.
 *
 * The ratio comes from the company’s own disclosures: non-compliant income
 * divided by total revenue. The tool applies it to the dividend or gain the
 * investor actually received. It does not decide whether the stock is
 * compliant; that is the screening step.
 */

type Mode = 'financials' | 'ratio';

export function DividendPurificationCalculator() {
  const [dividend, setDividend] = useState(50_000);
  const [mode, setMode] = useState<Mode>('financials');
  const [nonCompliant, setNonCompliant] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [directRatio, setDirectRatio] = useState(0);

  const result = useMemo(
    () =>
      purification({
        dividend,
        nonCompliantIncome: nonCompliant,
        totalRevenue,
        directRatio: mode === 'ratio' ? directRatio : null,
      }),
    [dividend, mode, nonCompliant, totalRevenue, directRatio]
  );

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="What you received"
          intro="Use the gross dividend or the gain on the sale. Purification is calculated on the amount that reached you."
        >
          <NumberField
            id="dividend"
            label="Dividend or gain received"
            value={dividend}
            set={setDividend}
            step={1_000}
          />
          <Segmented
            label="How do you know the ratio?"
            value={mode}
            set={setMode}
            options={[
              { value: 'financials', label: 'From the financials' },
              { value: 'ratio', label: 'I have the ratio' },
            ]}
            hint="Most companies publish the ratio in their annual report or on the Shariah screening page."
          />
        </ToolPanel>

        {mode === 'financials' ? (
          <ToolPanel
            title="The company’s figures"
            intro="Take both numbers from the same annual report, in the same units."
          >
            <NumberField
              id="non-compliant"
              label="Non-compliant income"
              value={nonCompliant}
              set={setNonCompliant}
              step={100_000}
              hint="Interest income, income from non-compliant activities, and similar items disclosed by the company."
            />
            <NumberField
              id="total-revenue"
              label="Total revenue"
              value={totalRevenue}
              set={setTotalRevenue}
              step={1_000_000}
              hint="The denominator the company uses for its own purification ratio."
            />
          </ToolPanel>
        ) : (
          <ToolPanel
            title="The ratio"
            intro="Enter the percentage the company or your screening service publishes."
          >
            <NumberField
              id="ratio"
              label="Non-compliant income share"
              value={directRatio}
              set={setDirectRatio}
              step={0.01}
              prefix="%"
              hint="For example, 2.5 means 2.5% of income was non-compliant."
            />
          </ToolPanel>
        )}

        <SourceNote
          sources={['ordinance']}
          extra="Purification is a matter of Shariah reasoning, not tax law. The calculation here follows the common method of applying the company’s non-compliant income ratio to the dividend received."
        />
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Amount to purify"
          headline={`PKR ${formatPKR(result.amount)}`}
          sub={`Give this amount in charity without expecting a reward for it. It is ${formatPct(result.ratio)} of the PKR ${formatPKR(dividend)} you received.`}
          rows={[
            { label: 'Purification ratio', value: formatPct(result.ratio), accent: true },
            { label: 'Amount to give', value: `PKR ${formatPKR(result.amount)}` },
            { label: 'Amount that stays yours', value: `PKR ${formatPKR(result.compliant)}` },
            { label: 'Basis', value: mode === 'ratio' ? 'Published ratio' : 'Company financials' },
          ]}
        />

        <Breakdown
          title="The calculation"
          rows={[
            { label: 'Amount received', value: `PKR ${formatPKR(dividend)}` },
            ...(mode === 'financials'
              ? [
                  { label: 'Non-compliant income', value: `PKR ${formatPKR(nonCompliant)}` },
                  { label: 'Total revenue', value: `PKR ${formatPKR(totalRevenue)}` },
                ]
              : [{ label: 'Ratio entered', value: formatPct(directRatio / 100) }]),
            { label: 'Ratio applied', value: formatPct(result.ratio) },
            { label: 'Purification amount', value: `PKR ${formatPKR(result.amount)}`, strong: true, accent: true },
          ]}
        />

        <div className="rounded-2xl border border-line bg-white/[0.018] p-5">
          <p className="mono-label text-[10px]">The method in four steps</p>
          <ol className="mt-3 space-y-2 text-xs leading-relaxed text-muted">
            <li>
              <span className="text-ink">1.</span> Screen the stock first. Purification only applies
              to a business that has already passed the Shariah tests.
            </li>
            <li>
              <span className="text-ink">2.</span> Take non-compliant income and total revenue from
              the same annual report.
            </li>
            <li>
              <span className="text-ink">3.</span> Divide non-compliant income by total revenue to
              get the ratio.
            </li>
            <li>
              <span className="text-ink">4.</span> Apply that ratio to each dividend or gain, and
              give the result in charity.
            </li>
          </ol>
        </div>

        <AssumptionNote>
          This is a calculation aid, not a fatwa. Scholars differ on which income counts as
          non-compliant, whether the ratio should use revenue or profit, and whether the amount
          should be given as charity or deducted from the dividend. Follow the method your scholar
          or screening service uses, and keep the working.
        </AssumptionNote>

        <ToolFooter
          calculatorName="Dividend Purification Calculator"
          disclaimer="Where the amount is material or the company’s disclosure is unclear, ask a qualified scholar rather than relying on a calculator."
        />
      </div>
    </ToolGrid>
  );
}

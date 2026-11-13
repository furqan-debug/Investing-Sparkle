'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  MiniStat,
  NumberField,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { grahamNumber } from '@/lib/valuation';
import { formatPKR2, formatPct } from '@/lib/format';

/**
 * The Graham number is a ceiling built from two old rules of thumb: no more
 * than 15 times earnings and no more than 1.5 times book value. It says
 * nothing about growth, quality or the price the market is willing to pay.
 */
export function GrahamNumberCalculator() {
  const [eps, setEps] = useState(12);
  const [bookValue, setBookValue] = useState(80);
  const [price, setPrice] = useState(100);

  const result = useMemo(
    () => grahamNumber({ eps, bookValue, price }),
    [eps, bookValue, price]
  );

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="Earnings and book value"
          intro="Use the latest annual earnings per share and book value per share. Both are accounting figures, not cash flow."
        >
          <NumberField
            id="graham-eps"
            label="Earnings per share"
            value={eps}
            set={setEps}
            step={0.5}
            prefix="PKR"
            hint="Profit after tax divided by the number of shares. Use a representative year, not a one-off gain."
          />
          <NumberField
            id="graham-book"
            label="Book value per share"
            value={bookValue}
            set={setBookValue}
            step={1}
            prefix="PKR"
            hint="Shareholders' equity divided by the number of shares."
          />
          <NumberField
            id="graham-price"
            label="Current share price"
            value={price}
            set={setPrice}
            step={0.5}
            prefix="PKR"
            hint="Used to show the upside or downside against the Graham number."
          />
        </ToolPanel>

        {!result.valid && (
          <WarningNote>
            The Graham number needs positive earnings and a positive book value. A loss-making
            company, or one with negative equity, has no meaningful Graham number.
          </WarningNote>
        )}

        <AssumptionNote>
          The 15 times earnings and 1.5 times book value limits are Graham’s defensive-investor
          rules, not a forecast. A company can be cheap on both measures and still be a poor
          business. The tool does not adjust for growth, debt, industry or accounting quality.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Graham number"
          headline={result.valid ? `PKR ${formatPKR2(result.value)}` : 'Not available'}
          sub={
            result.valid
              ? `The geometric mean of 15 times earnings and 1.5 times book value. The price is PKR ${formatPKR2(price)}.`
              : 'Positive earnings and book value are required.'
          }
          rows={[
            {
              label: 'Upside or downside',
              value: result.valid ? formatPct(result.upside) : 'n/a',
              accent: result.valid,
            },
            {
              label: 'Margin of safety',
              value: result.valid ? formatPct(result.marginOfSafety) : 'n/a',
            },
            { label: 'Current P/E', value: result.pe > 0 ? `${result.pe.toFixed(2)}x` : 'n/a' },
            { label: 'Current P/B', value: result.pb > 0 ? `${result.pb.toFixed(2)}x` : 'n/a' },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="15 × earnings" value={`PKR ${formatPKR2(result.earningsCeiling)}`} />
          <MiniStat label="1.5 × book value" value={`PKR ${formatPKR2(result.bookCeiling)}`} />
        </div>

        <Breakdown
          title="How the number is built"
          rows={[
            { label: 'Earnings per share', value: `PKR ${formatPKR2(eps)}` },
            { label: '15 times earnings', value: `PKR ${formatPKR2(result.earningsCeiling)}` },
            { label: 'Book value per share', value: `PKR ${formatPKR2(bookValue)}` },
            { label: '1.5 times book value', value: `PKR ${formatPKR2(result.bookCeiling)}` },
            {
              label: 'Product of the two ceilings',
              value: `PKR ${formatPKR2(result.earningsCeiling * result.bookCeiling)}`,
            },
            {
              label: 'Square root = Graham number',
              value: result.valid ? `PKR ${formatPKR2(result.value)}` : 'Not available',
              strong: true,
              accent: true,
            },
          ]}
          footer={
            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              The square root keeps the result between the two ceilings. A stock is below the Graham
              number only when it is cheap on both earnings and book value at the same time.
            </p>
          }
        />

        <ToolFooter
          calculatorName="Graham Number Calculator"
          disclaimer="The Graham number is a screening rule from a different market and era, not a valuation of this company. It ignores growth, debt, competitive advantage and the quality of the accounting. Use it to start a conversation, not to finish one."
        />
      </div>
    </ToolGrid>
  );
}

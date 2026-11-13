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
import { dividendYield, dpsFromFaceValue } from '@/lib/dividends';
import { formatNumber, formatPKR, formatPKR2, formatPct } from '@/lib/format';

type Mode = 'dps' | 'percent';

/**
 * Dividend yield. The percentage mode exists because PSX companies often
 * declare a dividend as a percentage of face value, which is not the same
 * number as a yield on the market price.
 */
export function DividendYieldCalculator() {
  const [mode, setMode] = useState<Mode>('dps');
  const [price, setPrice] = useState(100);
  const [dps, setDps] = useState(8);
  const [percent, setPercent] = useState(80);
  const [faceValue, setFaceValue] = useState(10);
  const [shares, setShares] = useState(1_000);
  const [cost, setCost] = useState(80);
  const [targetYield, setTargetYield] = useState(8);

  const effectiveDps = mode === 'dps' ? dps : dpsFromFaceValue(faceValue, percent);

  const result = useMemo(
    () => dividendYield({ price, dps: effectiveDps, cost, shares }),
    [price, effectiveDps, cost, shares]
  );

  const priceAtTarget = targetYield > 0 ? effectiveDps / (targetYield / 100) : 0;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The dividend and the price"
          intro="Use the annual dividend per share and the market price. The original cost is optional and only affects the yield on cost."
        >
          <NumberField
            id="dy-price"
            label="Current share price"
            value={price}
            set={setPrice}
            step={0.5}
            prefix="PKR"
            hint="The price you would pay today, not the price on the dividend record date."
          />

          <Segmented<Mode>
            label="How the dividend is declared"
            value={mode}
            set={setMode}
            options={[
              { value: 'dps', label: 'Rupees per share' },
              { value: 'percent', label: '% of face value' },
            ]}
            hint="PSX companies often declare a percentage of the Rs 10 face value. That is not a yield on the market price."
          />

          {mode === 'dps' ? (
            <NumberField
              id="dy-dps"
              label="Annual dividend per share"
              value={dps}
              set={setDps}
              step={0.5}
              prefix="PKR"
              hint="The cash dividend for a full year, before withholding tax."
            />
          ) : (
            <>
              <NumberField
                id="dy-percent"
                label="Dividend declared"
                value={percent}
                set={setPercent}
                step={5}
                prefix="%"
                hint="For example, 80 means 80% of face value."
              />
              <NumberField
                id="dy-face"
                label="Face value per share"
                value={faceValue}
                set={setFaceValue}
                step={1}
                prefix="PKR"
                hint="Most PSX shares have a face value of Rs 10. Check the company’s notice if you are unsure."
              />
            </>
          )}

          <NumberField
            id="dy-shares"
            label="Shares held"
            value={shares}
            set={setShares}
            step={100}
            prefix="Qty"
          />

          <NumberField
            id="dy-cost"
            label="Your original cost per share"
            value={cost}
            set={setCost}
            step={0.5}
            prefix="PKR"
            hint="Optional. Used only for the yield on cost."
          />

          <NumberField
            id="dy-target"
            label="Target yield"
            value={targetYield}
            set={setTargetYield}
            step={0.5}
            prefix="%"
            hint="The price that would give you this yield on the current dividend."
          />
        </ToolPanel>

        <AssumptionNote>
          A high yield can mean a generous dividend, a fallen price, or both. The dividend is not
          fixed, and a yield calculated on last year’s payout disappears if the company cuts it.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Dividend yield at the current price"
          headline={formatPct(result.currentYield)}
          sub={`An annual dividend of PKR ${formatPKR2(result.dps)} per share on a price of PKR ${formatPKR2(price)}.`}
          rows={[
            { label: 'Yield on your cost', value: formatPct(result.yieldOnCost), accent: true },
            { label: 'Annual income', value: `PKR ${formatPKR(result.annualIncome)}` },
            { label: 'Dividend per share', value: `PKR ${formatPKR2(result.dps)}` },
            { label: 'Price at target yield', value: `PKR ${formatPKR2(priceAtTarget)}` },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Shares held" value={formatNumber(shares)} />
          <MiniStat label="Income per share" value={`PKR ${formatPKR2(result.incomePerShare)}`} />
        </div>

        <Breakdown
          title="The calculation"
          rows={[
            { label: 'Share price', value: `PKR ${formatPKR2(price)}` },
            ...(mode === 'percent'
              ? [
                  { label: 'Face value', value: `PKR ${formatPKR2(faceValue)}` },
                  { label: 'Dividend declared', value: `${percent}% of face value` },
                ]
              : []),
            { label: 'Dividend per share', value: `PKR ${formatPKR2(result.dps)}` },
            { label: 'Current yield', value: formatPct(result.currentYield), strong: true, accent: true },
            ...(cost > 0
              ? [
                  { label: 'Original cost per share', value: `PKR ${formatPKR2(cost)}` },
                  { label: 'Yield on cost', value: formatPct(result.yieldOnCost) },
                ]
              : []),
            { label: 'Annual income', value: `PKR ${formatPKR(result.annualIncome)}` },
          ]}
          footer={
            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              Yield is the annual dividend divided by the price. Yield on cost uses the price you
              paid instead of today’s price, which is why the two numbers differ.
            </p>
          }
        />

        <ToolFooter
          calculatorName="Dividend Yield Calculator"
          disclaimer="The dividend is the last declared annual amount, not a promise for next year. The tool ignores withholding tax, which reduces the cash you actually receive, and it does not adjust for special or one-off dividends."
        />
      </div>
    </ToolGrid>
  );
}

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
import { peRatio } from '@/lib/valuation';
import { formatPKR2, formatPct } from '@/lib/format';

/**
 * P/E is a price per rupee of earnings. The earnings yield inverts it, PEG
 * puts it next to growth, and the target multiple turns it into a price. None
 * of those steps decides whether the earnings are durable.
 */
export function PeRatioCalculator() {
  const [price, setPrice] = useState(100);
  const [eps, setEps] = useState(10);
  const [growth, setGrowth] = useState(12);
  const [targetPe, setTargetPe] = useState(15);

  const result = useMemo(
    () => peRatio({ price, eps, growth, targetPe }),
    [price, eps, growth, targetPe]
  );

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The stock"
          intro="Use the current price and the earnings per share for a full year. The growth rate and target multiple are your assumptions."
        >
          <NumberField
            id="pe-price"
            label="Current share price"
            value={price}
            set={setPrice}
            step={0.5}
            prefix="PKR"
          />
          <NumberField
            id="pe-eps"
            label="Earnings per share"
            value={eps}
            set={setEps}
            step={0.5}
            prefix="PKR"
            hint="Profit after tax divided by shares. Use a normal year rather than a one-off gain."
          />
          <NumberField
            id="pe-growth"
            label="Expected earnings growth"
            value={growth}
            set={setGrowth}
            step={0.5}
            prefix="%"
            hint="The annual growth you expect over the next few years. PEG uses this number."
          />
          <NumberField
            id="pe-target"
            label="Target P/E"
            value={targetPe}
            set={setTargetPe}
            step={0.5}
            prefix="x"
            hint="The multiple you think the market should pay for these earnings. The range below is a 10% band around it."
          />
        </ToolPanel>

        {eps <= 0 && (
          <WarningNote>
            Earnings per share are zero or negative, so P/E and the fair value are not meaningful. A
            loss-making company needs a different framework, not a multiple of a negative number.
          </WarningNote>
        )}

        {eps > 0 && growth <= 0 && (
          <WarningNote>
            PEG needs positive growth. With flat or falling earnings, the P/E stands on its own and
            the growth comparison is not available.
          </WarningNote>
        )}

        <AssumptionNote>
          A target P/E is a judgement about the future, not a rule. The range below is a 10% band
          around your target, not a confidence interval. The tool does not adjust for debt, accounting
          differences, cyclical earnings or the quality of the growth.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="P/E at the current price"
          headline={result.valid ? `${result.pe.toFixed(2)}x` : 'Not available'}
          sub={
            result.valid
              ? `A price of PKR ${formatPKR2(price)} on earnings of PKR ${formatPKR2(eps)} per share.`
              : 'Positive earnings per share are required.'
          }
          rows={[
            {
              label: 'Earnings yield',
              value: result.valid ? formatPct(result.earningsYield) : 'n/a',
              accent: result.valid,
            },
            {
              label: 'PEG ratio',
              value: result.peg > 0 ? result.peg.toFixed(2) : 'n/a',
            },
            {
              label: 'Fair value at target P/E',
              value: result.fairValue > 0 ? `PKR ${formatPKR2(result.fairValue)}` : 'n/a',
            },
            {
              label: 'Upside or downside',
              value: result.fairValue > 0 ? formatPct(result.upside) : 'n/a',
            },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat
            label="Target range low"
            value={result.rangeLow > 0 ? `PKR ${formatPKR2(result.rangeLow)}` : 'n/a'}
          />
          <MiniStat
            label="Target range high"
            value={result.rangeHigh > 0 ? `PKR ${formatPKR2(result.rangeHigh)}` : 'n/a'}
          />
        </div>

        <Breakdown
          title="The calculation"
          rows={[
            { label: 'Share price', value: `PKR ${formatPKR2(price)}` },
            { label: 'Earnings per share', value: `PKR ${formatPKR2(eps)}` },
            {
              label: 'P/E',
              value: result.valid ? `${result.pe.toFixed(2)}x` : 'Not available',
              strong: true,
              accent: true,
            },
            {
              label: 'Earnings yield',
              value: result.valid ? formatPct(result.earningsYield) : 'n/a',
            },
            { label: 'Expected growth', value: `${growth}% a year` },
            {
              label: 'PEG',
              value: result.peg > 0 ? result.peg.toFixed(2) : 'n/a',
            },
            {
              label: 'Growth implied at PEG 1',
              value: result.impliedGrowth > 0 ? `${result.impliedGrowth.toFixed(2)}%` : 'n/a',
            },
            { label: 'Target P/E', value: `${targetPe}x` },
            {
              label: 'Fair value at target',
              value: result.fairValue > 0 ? `PKR ${formatPKR2(result.fairValue)}` : 'n/a',
            },
          ]}
          footer={
            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              PEG divides the P/E by the growth rate as a percentage. A PEG of 1 means the multiple
              equals the growth rate; lower is cheaper on this one measure, and higher is more
              expensive.
            </p>
          }
        />

        <ToolFooter
          calculatorName="P/E Ratio & Fair Price Calculator"
          disclaimer="The target multiple and growth rate are the ones you entered. A low P/E can mean a bargain or a business the market expects to shrink, and a high P/E can be justified by growth that may not arrive. The tool ignores debt, cash, accounting quality and the cycle."
        />
      </div>
    </ToolGrid>
  );
}

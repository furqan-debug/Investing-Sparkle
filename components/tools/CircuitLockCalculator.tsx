'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  MiniStat,
  NumberField,
  Segmented,
  SourceNote,
  ToolGrid,
  ToolPanel,
} from './ToolUI';
import { circuitLocks } from '@/lib/psx';
import { formatNumber, formatPKR, formatPKR2, formatPct } from '@/lib/format';

/**
 * The daily price band, often called the upper and lower lock.
 *
 * The band is a percentage of the previous close with a rupee floor, so a very
 * cheap stock can move by a larger percentage than a very expensive one. That
 * floor is why the applied percentage is shown separately from the nominal one.
 */

type Market = 'ready' | 'oddLot';

export function CircuitLockCalculator() {
  const [previousClose, setPreviousClose] = useState(250);
  const [bandPct, setBandPct] = useState(10);
  const [market, setMarket] = useState<Market>('ready');
  const [shares, setShares] = useState(1_000);

  const floorAmount = market === 'ready' ? 1 : 2;

  const locks = useMemo(
    () =>
      circuitLocks({
        previousClose,
        bandPct: bandPct / 100,
        floorAmount,
      }),
    [previousClose, bandPct, floorAmount]
  );

  const value = (price: number) => `PKR ${formatPKR(price * Math.max(0, shares))}`;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The stock"
          intro="Use the closing price PSX published for the previous session. The band resets against that price every morning."
        >
          <NumberField
            id="previous-close"
            label="Previous closing price"
            value={previousClose}
            set={setPreviousClose}
            step={0.5}
            prefix="PKR"
            hint="The official close, not the last trade in your broker's app."
          />
          <Segmented
            label="Market"
            value={market}
            set={setMarket}
            options={[
              { value: 'ready', label: 'Ready market' },
              { value: 'oddLot', label: 'Odd lot' },
            ]}
            hint="The odd lot market uses a two-rupee floor rather than one rupee. Both use the same percentage band."
          />
          <NumberField
            id="band"
            label="Price band"
            value={bandPct}
            set={setBandPct}
            step={0.5}
            prefix="%"
            hint="Ten per cent since July 2024. Editable because the Exchange can change it."
          />
          <NumberField
            id="shares"
            label="Shares held"
            value={shares}
            set={setShares}
            step={100}
            prefix="Qty"
            hint="Optional. Used only to show what the band means in rupees."
          />
        </ToolPanel>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Upper lock"
          headline={`PKR ${formatPKR2(locks.upper)}`}
          sub={`A ${formatPct(locks.upperMove)} move from the previous close of PKR ${formatPKR2(
            previousClose
          )}. At the lower lock the price would be PKR ${formatPKR2(locks.lower)}, a ${formatPct(
            locks.lowerMove
          )} move.`}
          rows={[
            { label: 'Lower lock', value: `PKR ${formatPKR2(locks.lower)}`, accent: true },
            { label: 'Band applied', value: formatPct(locks.appliedPct) },
            { label: 'Rupee range', value: `PKR ${formatPKR2(locks.range)}` },
            {
              label: 'Floor in force',
              value: `Rs ${floorAmount} or ${formatPct(bandPct / 100, 1)}`,
            },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Value at upper lock" value={value(locks.upper)} />
          <MiniStat label="Value at lower lock" value={value(locks.lower)} />
        </div>

        <Breakdown
          title="The arithmetic"
          rows={[
            { label: 'Previous close', value: `PKR ${formatPKR2(previousClose)}` },
            {
              label: `Percentage move at ${formatPct(bandPct / 100, 1)}`,
              value: `PKR ${formatPKR2((previousClose * bandPct) / 100)}`,
            },
            { label: 'Rupee floor', value: `PKR ${formatPKR2(floorAmount)}` },
            {
              label: 'Move applied',
              value: `PKR ${formatPKR2((locks.upper - previousClose))}`,
              strong: true,
            },
            { label: 'Upper lock', value: `PKR ${formatPKR2(locks.upper)}`, strong: true, accent: true },
            { label: 'Lower lock', value: `PKR ${formatPKR2(locks.lower)}`, strong: true },
            {
              label: 'Shares held',
              value: `${formatNumber(shares)} shares worth ${value(previousClose)}`,
            },
          ]}
        />

        <SourceNote
          sources={['psxRegulations']}
          title="Rates and sources"
          intro="Checked 13 November 2026. Regulation 19.3 of the PSX Regulations sets a scrip-wise circuit breaker. The band was raised in half-point steps from 7.5% and reached 10% on 22 July 2024, where it has stayed."
          extra="The Exchange can change the band, and it applies different treatment to some products and to the first day of a rights allotment. Confirm the current band on PSX before relying on a lock price."
        />

        <AssumptionNote>
          A lock is not a guarantee of an exit. At the lower lock there can be no buyers at all, so
          a position can be stuck for more than one session. Separately, PSX can halt the whole
          market when the KSE-30 index moves 5% and holds that move for five minutes. The halt
          length is set by the Exchange.
        </AssumptionNote>

        <ToolFooter
          calculatorName="PSX Upper & Lower Lock Calculator"
          disclaimer="We apply the published band and floor to the close you enter. The Exchange's own notice for the session is the final word on the lock price."
        />
      </div>
    </ToolGrid>
  );
}

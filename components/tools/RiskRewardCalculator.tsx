'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  MiniStat,
  NumberField,
  SourceNote,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { riskReward } from '@/lib/psx';
import { formatNumber, formatPKR, formatPKR2, formatPct } from '@/lib/format';

/**
 * Risk to reward, and the hit rate the setup needs to be worth taking.
 *
 * The second number is the one people skip. A 3:1 trade still loses money if it
 * only works one time in four.
 */

export function RiskRewardCalculator() {
  const [entry, setEntry] = useState(100);
  const [stop, setStop] = useState(94);
  const [target, setTarget] = useState(118);
  const [shares, setShares] = useState(500);
  const [winRate, setWinRate] = useState(50);

  const result = useMemo(
    () =>
      riskReward({
        entry,
        stop,
        target,
        winRate: winRate / 100,
        shares,
      }),
    [entry, stop, target, winRate, shares]
  );

  const expectancyPerTrade = result.expectancy * result.totalRisk;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The setup"
          intro="Three prices and one quantity. The entry and the stop decide what you risk. The target decides what you are trying to make."
        >
          <NumberField
            id="entry"
            label="Entry price"
            value={entry}
            set={setEntry}
            step={0.5}
            prefix="PKR"
            hint="The price you expect to pay."
          />
          <NumberField
            id="stop"
            label="Stop-loss price"
            value={stop}
            set={setStop}
            step={0.5}
            prefix="PKR"
            hint="Where you accept the idea was wrong. Below the entry."
          />
          <NumberField
            id="target"
            label="Target price"
            value={target}
            set={setTarget}
            step={0.5}
            prefix="PKR"
            hint="Where you would take the profit. Above the entry."
          />
          <NumberField
            id="shares"
            label="Number of shares"
            value={shares}
            set={setShares}
            step={100}
            prefix="Qty"
            hint="Used for the rupee figures. Leave it at zero to work in ratios only."
          />
        </ToolPanel>

        <ToolPanel
          title="Your hit rate"
          intro="How often this kind of setup actually works for you. If you do not know, start at 50% and treat the result as a question rather than an answer."
        >
          <NumberField
            id="win-rate"
            label="Winning trades"
            value={winRate}
            set={setWinRate}
            step={5}
            prefix="%"
            hint="The share of trades that reach the target rather than the stop."
          />
        </ToolPanel>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Risk to reward"
          headline={result.valid ? `${result.ratio.toFixed(2)} : 1` : 'Not a valid setup'}
          sub={
            result.valid
              ? `You risk PKR ${formatPKR2(result.riskPerShare)} a share to make PKR ${formatPKR2(
                  result.rewardPerShare
                )}. At a ${formatPct(winRate / 100, 0)} hit rate the setup expects to ${
                  result.expectancy >= 0 ? 'make' : 'lose'
                } PKR ${formatPKR(Math.abs(expectancyPerTrade))} per trade.`
              : 'The stop has to be below the entry and the target above it. Adjust the three prices.'
          }
          rows={[
            { label: 'Break-even hit rate', value: formatPct(result.breakEvenWinRate), accent: true },
            { label: 'Your hit rate', value: formatPct(winRate / 100, 0) },
            { label: 'Expectancy per rupee risked', value: result.expectancy.toFixed(2) },
            { label: 'Total reward at target', value: `PKR ${formatPKR(result.totalReward)}` },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Total risk" value={`PKR ${formatPKR(result.totalRisk)}`} />
          <MiniStat label="Expectancy per trade" value={`PKR ${formatPKR(expectancyPerTrade)}`} />
        </div>

        {!result.valid && (
          <WarningNote>
            A long trade needs the stop below the entry and the target above it. If one of those is
            reversed, the ratio is meaningless.
          </WarningNote>
        )}

        <Breakdown
          title="The arithmetic"
          rows={[
            { label: 'Entry minus stop', value: `PKR ${formatPKR2(result.riskPerShare)}` },
            { label: 'Target minus entry', value: `PKR ${formatPKR2(result.rewardPerShare)}` },
            {
              label: 'Reward divided by risk',
              value: result.valid ? `${result.ratio.toFixed(2)} : 1` : '0.00 : 1',
              strong: true,
            },
            {
              label: 'Hit rate needed to break even',
              value: formatPct(result.breakEvenWinRate),
              strong: true,
              accent: true,
            },
            {
              label: 'Expectancy at your hit rate',
              value: result.expectancy.toFixed(2),
              strong: true,
            },
            {
              label: 'Expectancy per trade',
              value: `PKR ${formatPKR(expectancyPerTrade)}`,
              strong: true,
            },
          ]}
        />

        <SourceNote
          sources={[]}
          title="Method"
          intro="Break-even hit rate is 1 divided by 1 plus the reward-to-risk ratio. Expectancy is the hit rate multiplied by the ratio, minus the loss rate. Both assume every winner reaches the target and every loser exits exactly at the stop."
          extra="Charges and capital gains tax are not included. A 2:1 ratio after costs can be closer to 1.8:1, which is why the brokerage calculator sits next to this one."
        />

        <AssumptionNote>
          Real trades do not resolve neatly at two prices. Partial exits, trailing stops and gaps
          all change the distribution. Treat the expectancy figure as a sanity check on the setup,
          not a forecast of your year.
        </AssumptionNote>

        <ToolFooter
          calculatorName="Risk Reward & Stop Loss Calculator"
          disclaimer="We show the ratio and the hit rate it needs. A favourable ratio does not make a bad idea good, and it is not a recommendation to trade."
        />
      </div>
    </ToolGrid>
  );
}

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
import { positionSize } from '@/lib/psx';
import { formatNumber, formatPKR, formatPKR2, formatPct } from '@/lib/format';

/**
 * Fixed-fractional sizing.
 *
 * The number of shares is decided by the distance to the stop, not by how
 * confident the trade feels. That is the whole point of the tool.
 */

export function PositionSizeCalculator() {
  const [accountSize, setAccountSize] = useState(500_000);
  const [riskPct, setRiskPct] = useState(1);
  const [entry, setEntry] = useState(100);
  const [stop, setStop] = useState(92);

  const result = useMemo(
    () =>
      positionSize({
        accountSize,
        riskPct: riskPct / 100,
        entry,
        stop,
      }),
    [accountSize, riskPct, entry, stop]
  );

  const oversize = result.positionValue > accountSize;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="Your account and your risk"
          intro="Risk is the amount you are willing to lose if the stop is hit, not the amount you invest. Two per cent of a small account is a small number, and that is the point."
        >
          <NumberField
            id="account-size"
            label="Trading account size"
            value={accountSize}
            set={setAccountSize}
            step={50_000}
            prefix="PKR"
            hint="Cash you have set aside for trading, not your total net worth."
          />
          <NumberField
            id="risk-pct"
            label="Risk per trade"
            value={riskPct}
            set={setRiskPct}
            step={0.25}
            prefix="%"
            hint="One to two per cent is the common range. Ten trades at 10% risk can end an account."
          />
        </ToolPanel>

        <ToolPanel
          title="The trade"
          intro="The stop is the price at which you accept that the idea was wrong. It has to be set before the entry, not after."
        >
          <NumberField
            id="entry"
            label="Entry price"
            value={entry}
            set={setEntry}
            step={0.5}
            prefix="PKR"
            hint="The price you expect to pay, including any slippage you want to allow."
          />
          <NumberField
            id="stop"
            label="Stop-loss price"
            value={stop}
            set={setStop}
            step={0.5}
            prefix="PKR"
            hint="Below the entry for a long position. The distance to this price decides the share count."
          />
        </ToolPanel>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Position size"
          headline={`${formatNumber(result.shares)} shares`}
          sub={
            result.valid
              ? `At PKR ${formatPKR2(entry)} that is PKR ${formatPKR(result.positionValue)}, or ${formatPct(
                  result.accountPct
                )} of your account. If the stop is hit you lose about PKR ${formatPKR(result.actualRisk)}.`
              : 'Set an entry above the stop, and a risk budget above zero, to see a position size.'
          }
          rows={[
            { label: 'Risk budget', value: `PKR ${formatPKR(result.riskAmount)}` },
            { label: 'Risk per share', value: `PKR ${formatPKR2(result.riskPerShare)}`, accent: true },
            { label: 'Position value', value: `PKR ${formatPKR(result.positionValue)}` },
            { label: 'Capital at risk', value: `PKR ${formatPKR(result.actualRisk)}` },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Cash left" value={`PKR ${formatPKR(Math.max(0, accountSize - result.positionValue))}`} />
          <MiniStat
            label="Loss if stopped"
            value={formatPct(accountSize > 0 ? result.actualRisk / accountSize : 0)}
          />
        </div>

        {oversize && (
          <WarningNote>
            This position is larger than your account. That only works with leverage, and leverage
            turns a normal stop into a margin call. Either widen the stop and accept fewer shares,
            or accept a smaller position.
          </WarningNote>
        )}

        {!result.valid && (
          <WarningNote>
            The stop has to be below the entry for a long position. If your stop is above the entry,
            you are describing a short, and PSX ready-market trading does not work that way for
            ordinary investors.
          </WarningNote>
        )}

        <Breakdown
          title="How the share count is decided"
          rows={[
            { label: 'Account size', value: `PKR ${formatPKR(accountSize)}` },
            { label: `Risk per trade at ${formatPct(riskPct / 100, 2)}`, value: `PKR ${formatPKR(result.riskAmount)}` },
            { label: 'Entry minus stop', value: `PKR ${formatPKR2(result.riskPerShare)}` },
            {
              label: 'Risk budget divided by risk per share',
              value: formatNumber(result.shares),
              strong: true,
            },
            {
              label: 'Rounded down to whole shares',
              value: `${formatNumber(result.shares)} shares`,
              strong: true,
              accent: true,
            },
          ]}
        />

        <SourceNote
          sources={[]}
          title="Method"
          intro="Fixed-fractional position sizing. The share count is the risk budget divided by the distance from entry to stop, rounded down, so the position never risks more than you asked it to."
          extra="Brokerage, sales tax and slippage are not included. On a real order, the fill price and the stop you actually get can both differ from the figures here."
        />

        <AssumptionNote>
          A stop is an instruction, not a guarantee. A gap through the stop, or a lower lock with no
          buyers, can produce a worse exit than the one modelled. Size the position so that a worse
          exit is still survivable.
        </AssumptionNote>

        <AssumptionNote>
          PSX has a daily price band of 10%, or one rupee, whichever is higher. A stop placed
          inside the band can still be jumped by an opening gap, and a stock at its lower lock can
          have no buyers at all.
        </AssumptionNote>

        <ToolFooter
          calculatorName="Position Size Calculator"
          disclaimer="We show the arithmetic of a risk budget. The decision to take the trade, and the stop you can actually live with, are yours."
        />
      </div>
    </ToolGrid>
  );
}

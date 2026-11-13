'use client';

import { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  MiniStat,
  NumberField,
  SourceNote,
  ToolGrid,
  ToolPanel,
} from './ToolUI';
import { averagePrice, sharesToTargetAverage, type Lot } from '@/lib/psx';
import { formatNumber, formatPKR, formatPKR2 } from '@/lib/format';

/**
 * Weighted average cost across several buys, and the arithmetic behind
 * averaging down. The average is a cost figure, not a target price: the tool
 * never suggests that a lower average makes a position a good one.
 */

const startingLots: Lot[] = [
  { price: 100, shares: 500 },
  { price: 90, shares: 500 },
];

export function StockAverageCalculator() {
  const [lots, setLots] = useState<Lot[]>(startingLots);
  const [targetAverage, setTargetAverage] = useState(95);
  const [newPrice, setNewPrice] = useState(80);

  const position = useMemo(() => averagePrice(lots), [lots]);

  const needed = useMemo(
    () =>
      sharesToTargetAverage({
        currentShares: position.shares,
        currentAverage: position.average,
        buyPrice: newPrice,
        targetAverage,
      }),
    [position.shares, position.average, newPrice, targetAverage]
  );

  function updateLot(index: number, patch: Partial<Lot>) {
    setLots((current) => current.map((lot, i) => (i === index ? { ...lot, ...patch } : lot)));
  }

  function addLot() {
    setLots((current) => [...current, { price: position.average || 0, shares: 0 }]);
  }

  function removeLot(index: number) {
    setLots((current) => (current.length > 1 ? current.filter((_, i) => i !== index) : current));
  }

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="Your buys"
          intro="Every purchase of the same stock, at the price you paid. The average is weighted by shares, so a large buy moves it more than a small one."
        >
          <div className="space-y-3">
            {lots.map((lot, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 [&>*]:min-w-0">
                <NumberField
                  id={`lot-price-${index}`}
                  label={`Buy ${index + 1} price`}
                  value={lot.price}
                  set={(price) => updateLot(index, { price })}
                  step={0.5}
                  prefix="PKR"
                />
                <NumberField
                  id={`lot-shares-${index}`}
                  label="Shares"
                  value={lot.shares}
                  set={(shares) => updateLot(index, { shares })}
                  step={100}
                  prefix="Qty"
                />
                {lots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLot(index)}
                    className="col-span-2 inline-flex items-center gap-1.5 self-start text-xs text-muted transition-colors hover:text-ink"
                  >
                    <Trash2 className="h-3 w-3" aria-hidden /> Remove buy {index + 1}
                  </button>
                )}
              </div>
            ))}
          </div>

          {lots.length < 8 && (
            <button
              type="button"
              onClick={addLot}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-green-300 transition-colors hover:text-green-200"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden /> Add another buy
            </button>
          )}
        </ToolPanel>

        <ToolPanel
          title="Averaging down, or up"
          intro="Set the average you want and the price you would pay next. The tool works out how many shares that takes, and whether the target is reachable at all."
        >
          <NumberField
            id="target-average"
            label="Target average price"
            value={targetAverage}
            set={setTargetAverage}
            step={0.5}
            prefix="PKR"
            hint="Below your current average means averaging down. Above it means averaging up."
          />
          <NumberField
            id="new-price"
            label="Price of the next buy"
            value={newPrice}
            set={setNewPrice}
            step={0.5}
            prefix="PKR"
            hint="The market price you would actually deal at, plus commission if you want the all-in figure."
          />
        </ToolPanel>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Weighted average cost"
          headline={`PKR ${formatPKR2(position.average)}`}
          sub={`${formatNumber(position.shares)} shares for PKR ${formatPKR(position.cost)} in total, across ${lots.length} ${
            lots.length === 1 ? 'buy' : 'buys'
          }.`}
          rows={[
            { label: 'Total cost', value: `PKR ${formatPKR(position.cost)}` },
            { label: 'Total shares', value: formatNumber(position.shares) },
            {
              label: 'Average per share',
              value: `PKR ${formatPKR2(position.average)}`,
              accent: true,
            },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat
            label="Shares needed at target"
            value={needed === null ? 'Not reachable' : formatNumber(needed)}
          />
          <MiniStat
            label="Capital needed"
            value={needed === null ? 'PKR 0' : `PKR ${formatPKR(needed * newPrice)}`}
          />
        </div>

        {needed === null ? (
          <AssumptionNote>
            That target is not reachable at this price. To move the average towards a target, the
            new price has to sit on the other side of it: below the target when averaging down,
            above it when averaging up. A target equal to the new price can never be reached,
            because each new share pulls the average towards that price without arriving.
          </AssumptionNote>
        ) : (
          <Breakdown
            title="After the next buy"
            rows={[
              { label: 'Shares now', value: formatNumber(position.shares) },
              { label: 'Shares added', value: formatNumber(needed) },
              { label: 'Shares after', value: formatNumber(position.shares + needed), strong: true },
              { label: 'Capital added', value: `PKR ${formatPKR(needed * newPrice)}` },
              {
                label: 'Cost after',
                value: `PKR ${formatPKR(position.cost + needed * newPrice)}`,
                strong: true,
              },
              {
                label: 'New average',
                value: `PKR ${formatPKR2((position.cost + needed * newPrice) / (position.shares + needed))}`,
                strong: true,
                accent: true,
              },
            ]}
          />
        )}

        <Breakdown
          title="Each buy's weight"
          rows={lots.map((lot, index) => ({
            label: `Buy ${index + 1} at PKR ${formatPKR2(lot.price)}`,
            value: `${formatNumber(lot.shares)} shares, ${formatPKR(lot.price * lot.shares)}`,
          }))}
        />

        <SourceNote
          sources={[]}
          title="Method"
          intro="A weighted average, not a simple one. Each buy contributes in proportion to the number of shares, which is the only definition that matches what your account statement shows."
          extra="Commission, sales tax and capital gains tax are not included. Add commission to the price you enter if you want the all-in cost per share."
        />

        <AssumptionNote>
          Averaging down lowers your break-even price, but it also increases the amount of money
          exposed to the same thesis. If the reason you bought has changed, a lower average does
          not repair it. This tool does the arithmetic and takes no view on the company.
        </AssumptionNote>

        <ToolFooter
          calculatorName="Stock Average Price Calculator"
          disclaimer="We show the weighted average and the shares needed to reach a target. Neither is a recommendation to buy more of any stock."
        />
      </div>
    </ToolGrid>
  );
}

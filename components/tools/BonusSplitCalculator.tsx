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
  WarningNote,
} from './ToolUI';
import { corporateAction } from '@/lib/dividends';
import { formatNumber, formatPKR, formatPKR2, formatPct } from '@/lib/format';

type Mode = 'bonus' | 'split';

/**
 * Bonus issues and splits are the same arithmetic with different labels. The
 * share count rises and the price falls in the same proportion, so the value of
 * the holding does not change on the day.
 */
export function BonusSplitCalculator() {
  const [mode, setMode] = useState<Mode>('bonus');
  const [shares, setShares] = useState(1_000);
  const [price, setPrice] = useState(100);
  const [cost, setCost] = useState(80);
  const [bonusNew, setBonusNew] = useState(1);
  const [bonusFor, setBonusFor] = useState(5);
  const [splitNew, setSplitNew] = useState(2);
  const [splitOld, setSplitOld] = useState(1);

  const factor =
    mode === 'bonus'
      ? 1 + (bonusFor > 0 ? bonusNew / bonusFor : 0)
      : splitOld > 0
        ? splitNew / splitOld
        : 1;

  const result = useMemo(
    () => corporateAction({ shares, price, cost, factor }),
    [shares, price, cost, factor]
  );

  const valid =
    shares > 0 &&
    factor > 0 &&
    (mode === 'bonus' ? bonusFor > 0 && bonusNew >= 0 : splitOld > 0 && splitNew > 0);

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The event"
          intro="A bonus issue gives you extra shares for nothing. A split replaces each old share with several new ones. Neither changes what the company is worth."
        >
          <Segmented<Mode>
            label="What happened"
            value={mode}
            set={setMode}
            options={[
              { value: 'bonus', label: 'Bonus issue' },
              { value: 'split', label: 'Stock split' },
            ]}
          />

          <NumberField
            id="ca-shares"
            label="Shares held before"
            value={shares}
            set={setShares}
            step={100}
            prefix="Qty"
          />
          <NumberField
            id="ca-price"
            label="Price before the event"
            value={price}
            set={setPrice}
            step={0.5}
            prefix="PKR"
            hint="The market price on the last cum-event day."
          />
          <NumberField
            id="ca-cost"
            label="Your original cost per share"
            value={cost}
            set={setCost}
            step={0.5}
            prefix="PKR"
            hint="Used to work out the adjusted average cost."
          />

          {mode === 'bonus' ? (
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                id="ca-bonus-new"
                label="Bonus shares"
                value={bonusNew}
                set={setBonusNew}
                step={1}
                prefix="Qty"
              />
              <NumberField
                id="ca-bonus-for"
                label="For every held"
                value={bonusFor}
                set={setBonusFor}
                step={1}
                prefix="Qty"
                hint="A one for five bonus means 1 new share for every 5 held."
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                id="ca-split-new"
                label="New shares"
                value={splitNew}
                set={setSplitNew}
                step={1}
                prefix="Qty"
              />
              <NumberField
                id="ca-split-old"
                label="Replace old shares"
                value={splitOld}
                set={setSplitOld}
                step={1}
                prefix="Qty"
                hint="A two for one split replaces 1 old share with 2 new ones."
              />
            </div>
          )}
        </ToolPanel>

        {!valid && (
          <WarningNote>
            Enter a positive number of shares and a positive ratio. A zero denominator or a zero
            split cannot be applied.
          </WarningNote>
        )}

        <AssumptionNote>
          A bonus issue and a split do not create value. The share count rises and the price falls in
          the same proportion. The tool does not round to whole shares, and it does not calculate the
          effect on your cost basis for capital gains tax.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        {valid ? (
          <ResultPanel
            eyebrow={`After a ${mode === 'bonus' ? 'bonus issue' : 'stock split'}`}
            headline={`${formatNumber(result.newShares, 2)} shares`}
            sub={`From ${formatNumber(shares)} shares at PKR ${formatPKR2(price)}. The price adjusts to PKR ${formatPKR2(result.adjustedPrice)}.`}
            rows={[
              { label: 'Adjusted price', value: `PKR ${formatPKR2(result.adjustedPrice)}`, accent: true },
              { label: 'Adjusted cost per share', value: `PKR ${formatPKR2(result.adjustedCost)}` },
              { label: 'Value before', value: `PKR ${formatPKR(result.valueBefore)}` },
              { label: 'Value after', value: `PKR ${formatPKR(result.valueAfter)}` },
            ]}
          />
        ) : (
          <WarningNote>
            The result is not available until the ratio is valid.
          </WarningNote>
        )}

        {valid && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <MiniStat label="Share count change" value={formatPct(result.factor - 1)} />
              <MiniStat label="Adjustment factor" value={`${result.factor.toFixed(4)}x`} />
            </div>

            <Breakdown
              title="Before and after"
              rows={[
                { label: 'Shares before', value: formatNumber(shares) },
                { label: 'Shares after', value: formatNumber(result.newShares, 2) },
                { label: 'Price before', value: `PKR ${formatPKR2(price)}` },
                { label: 'Price after', value: `PKR ${formatPKR2(result.adjustedPrice)}` },
                { label: 'Cost before, per share', value: `PKR ${formatPKR2(cost)}` },
                { label: 'Cost after, per share', value: `PKR ${formatPKR2(result.adjustedCost)}` },
                { label: 'Total cost', value: `PKR ${formatPKR(result.totalCost)}` },
                { label: 'Market value', value: `PKR ${formatPKR(result.valueAfter)}`, strong: true, accent: true },
              ]}
              footer={
                <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                  The total cost does not change. The same cost is spread over more shares, which is
                  why the adjusted cost per share falls.
                </p>
              }
            />
          </>
        )}

        <ToolFooter
          calculatorName="Bonus Shares & Stock Split Calculator"
          disclaimer="This is the arithmetic of the event, not a valuation. The market price after the event can differ from the theoretical adjusted price, and a bonus issue can be taxed or treated differently from a split. Ask a tax adviser about your cost basis."
        />
      </div>
    </ToolGrid>
  );
}

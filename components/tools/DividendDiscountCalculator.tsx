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
import { ddm } from '@/lib/valuation';
import { formatPKR2, formatPct } from '@/lib/format';

/**
 * Two dividend models side by side. Gordon growth assumes one constant rate
 * forever; the two-stage model gives the dividend a faster path for a few years
 * and then settles into stable growth. Both are only as good as the growth and
 * discount-rate assumptions.
 */
export function DividendDiscountCalculator() {
  const [dps, setDps] = useState(8);
  const [price, setPrice] = useState(100);
  const [requiredReturn, setRequiredReturn] = useState(12);
  const [stableGrowth, setStableGrowth] = useState(5);
  const [highGrowth, setHighGrowth] = useState(10);
  const [years, setYears] = useState(5);

  const result = useMemo(
    () =>
      ddm({
        dps,
        price,
        requiredReturn: requiredReturn / 100,
        stableGrowth: stableGrowth / 100,
        highGrowth: highGrowth / 100,
        years,
      }),
    [dps, price, requiredReturn, stableGrowth, highGrowth, years]
  );

  const canShow = result.twoStageValid && result.twoStage > 0;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The dividend and the price"
          intro="Use the cash dividend per share for the last full year and the current market price. The models value the stream of dividends, not the company’s assets."
        >
          <NumberField
            id="ddm-dps"
            label="Current dividend per share"
            value={dps}
            set={setDps}
            step={0.5}
            prefix="PKR"
            hint="The annual cash dividend declared for the last full year, before withholding tax."
          />
          <NumberField
            id="ddm-price"
            label="Current share price"
            value={price}
            set={setPrice}
            step={0.5}
            prefix="PKR"
            hint="Used to calculate the return implied by the market price."
          />
        </ToolPanel>

        <ToolPanel
          title="The assumptions"
          intro="The required return is the return you demand for the risk. Stable growth is the rate the dividend grows at forever; high growth applies only during the first stage."
        >
          <NumberField
            id="ddm-required"
            label="Required return"
            value={requiredReturn}
            set={setRequiredReturn}
            step={0.5}
            prefix="%"
            hint="Also called the cost of equity. It must be above stable growth for the model to work."
          />
          <NumberField
            id="ddm-stable"
            label="Stable growth"
            value={stableGrowth}
            set={setStableGrowth}
            step={0.5}
            prefix="%"
            hint="The long-run dividend growth rate. It should not exceed nominal growth in the economy."
          />
          <NumberField
            id="ddm-high"
            label="High growth"
            value={highGrowth}
            set={setHighGrowth}
            step={0.5}
            prefix="%"
            hint="The faster growth applied during the first stage of the two-stage model."
          />
          <NumberField
            id="ddm-years"
            label="High-growth years"
            value={years}
            set={setYears}
            min={1}
            step={1}
            prefix="Years"
            hint="How long the faster growth lasts before the dividend settles into stable growth."
          />
        </ToolPanel>

        {requiredReturn <= stableGrowth && (
          <WarningNote>
            The required return must be above stable growth. At or below it, the perpetuity formula
            has no finite answer, and the model is not usable.
          </WarningNote>
        )}

        {dps <= 0 && (
          <WarningNote>
            A zero dividend has no dividend-discount value. This model is for companies that pay a
            cash dividend, not for every stock.
          </WarningNote>
        )}

        <AssumptionNote>
          The models assume the dividend grows smoothly and forever. Real dividends are set by
          boards, can be cut, and are paid out of cash flow that moves with the cycle. The terminal
          value usually carries most of the answer, so the stable growth rate deserves the most
          scrutiny.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Two-stage value per share"
          headline={canShow ? `PKR ${formatPKR2(result.twoStage)}` : 'Not available'}
          sub={
            canShow
              ? `${highGrowth}% growth for ${years} ${years === 1 ? 'year' : 'years'}, then ${stableGrowth}% forever, discounted at ${requiredReturn}%.`
              : 'Check the dividend, the required return and stable growth.'
          }
          rows={[
            {
              label: 'Gordon growth value',
              value: result.gordonValid ? `PKR ${formatPKR2(result.gordonValue)}` : 'n/a',
              accent: canShow,
            },
            {
              label: 'Upside or downside',
              value: canShow && price > 0 ? formatPct(result.upside) : 'n/a',
            },
            {
              label: 'Dividend yield',
              value: price > 0 ? formatPct(result.dividendYield) : 'n/a',
            },
            {
              label: 'Terminal value share',
              value: canShow ? formatPct(result.terminalShare) : 'n/a',
            },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat
            label="Implied return, Gordon"
            value={result.gordonImplied !== null ? formatPct(result.gordonImplied) : 'n/a'}
          />
          <MiniStat
            label="Implied return, two-stage"
            value={result.twoStageImplied !== null ? formatPct(result.twoStageImplied) : 'n/a'}
          />
        </div>

        <Breakdown
          title="The two models"
          rows={[
            { label: 'Current dividend per share', value: `PKR ${formatPKR2(dps)}` },
            { label: 'Required return', value: `${requiredReturn}%` },
            { label: 'Stable growth', value: `${stableGrowth}%` },
            {
              label: 'Gordon growth value',
              value: result.gordonValid ? `PKR ${formatPKR2(result.gordonValue)}` : 'n/a',
            },
            { label: 'High growth', value: `${highGrowth}% for ${years} years` },
            {
              label: 'PV of stage-one dividends',
              value: canShow ? `PKR ${formatPKR2(result.twoStagePvExplicit)}` : 'n/a',
            },
            {
              label: 'PV of terminal value',
              value: canShow ? `PKR ${formatPKR2(result.twoStagePvTerminal)}` : 'n/a',
            },
            {
              label: 'Two-stage value',
              value: canShow ? `PKR ${formatPKR2(result.twoStage)}` : 'n/a',
              strong: true,
              accent: true,
            },
          ]}
          footer={
            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              Gordon growth is the special case where high growth equals stable growth. The two-stage
              model adds a separate first stage and then values the remaining dividend stream as a
              growing perpetuity.
            </p>
          }
        />

        {canShow && (
          <Breakdown
            title="Stage-one dividends"
            rows={result.twoStageSchedule.map((point) => ({
              label: `Year ${point.year}`,
              value: `PKR ${formatPKR2(point.dps)} · PV ${formatPKR2(point.presentValue)}`,
            }))}
          />
        )}

        <ToolFooter
          calculatorName="Dividend Discount Model Calculator"
          disclaimer="This is a model of a dividend stream, not a recommendation. The growth rates and required return are your assumptions, and the value is highly sensitive to each. It ignores buybacks, special dividends, withholding tax and the possibility of a cut."
        />
      </div>
    </ToolGrid>
  );
}

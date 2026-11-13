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
import { pivotLevels, pivotMethodLabels, type PivotMethod } from '@/lib/psx';
import { formatPKR2 } from '@/lib/format';

/**
 * Pivot levels for the next session from one day of prices.
 *
 * Five families, one set of inputs. Camarilla and DeMark define the central
 * price differently, which is why the same high, low and close can produce
 * quite different support and resistance.
 */

export function PivotPointCalculator() {
  const [high, setHigh] = useState(412.5);
  const [low, setLow] = useState(398);
  const [close, setClose] = useState(407.25);
  const [open, setOpen] = useState(401.5);
  const [method, setMethod] = useState<PivotMethod>('classic');

  const levels = useMemo(() => pivotLevels({ high, low, close, open }), [high, low, close, open]);
  const selected = levels[method];

  const price = (value: number) => `PKR ${formatPKR2(value)}`;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="Yesterday's session"
          intro="Use the previous trading day's high, low, close and open. Pivots are a description of where the last session traded, not a prediction of the next one."
        >
          <NumberField
            id="high"
            label="Previous high"
            value={high}
            set={setHigh}
            step={0.5}
            prefix="PKR"
          />
          <NumberField
            id="low"
            label="Previous low"
            value={low}
            set={setLow}
            step={0.5}
            prefix="PKR"
          />
          <NumberField
            id="close"
            label="Previous close"
            value={close}
            set={setClose}
            step={0.5}
            prefix="PKR"
            hint="The closing price PSX published, not the last trade you saw."
          />
          <NumberField
            id="open"
            label="Previous open"
            value={open}
            set={setOpen}
            step={0.5}
            prefix="PKR"
            hint="Only DeMark uses the open. The other four methods ignore it."
          />
        </ToolPanel>

        <ToolPanel
          title="Method"
          intro="Each family has its own definition. Traders use the one their desk uses, not the one that looks best in hindsight."
        >
          <Segmented
            label="Pivot family"
            value={method}
            set={setMethod}
            columns={3}
            options={(Object.keys(pivotMethodLabels) as PivotMethod[]).map((key) => ({
              value: key,
              label: pivotMethodLabels[key],
            }))}
          />
        </ToolPanel>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow={`${pivotMethodLabels[method]} pivot`}
          headline={price(selected.pivot)}
          sub={`The central level for the next session. Range in the previous session was PKR ${formatPKR2(
            high - low
          )}.`}
          rows={
            method === 'demark'
              ? [
                  { label: 'Resistance 1', value: price(selected.r1), accent: true },
                  { label: 'Support 1', value: price(selected.s1) },
                  { label: 'Previous close', value: price(close) },
                  { label: 'Previous range', value: price(high - low) },
                ]
              : [
                  { label: 'Resistance 1', value: price(selected.r1), accent: true },
                  { label: 'Support 1', value: price(selected.s1) },
                  { label: 'Resistance 2', value: price(selected.r2) },
                  { label: 'Support 2', value: price(selected.s2) },
                ]
          }
        />

        <Breakdown
          title={`${pivotMethodLabels[method]} levels`}
          rows={[
            ...(method === 'camarilla' && selected.r4 !== undefined
              ? [{ label: 'Resistance 4', value: price(selected.r4) }]
              : []),
            ...(method !== 'demark'
              ? [
                  { label: 'Resistance 3', value: price(selected.r3) },
                  { label: 'Resistance 2', value: price(selected.r2) },
                ]
              : []),
            { label: 'Resistance 1', value: price(selected.r1) },
            { label: 'Pivot', value: price(selected.pivot), strong: true, accent: true },
            { label: 'Support 1', value: price(selected.s1) },
            ...(method !== 'demark'
              ? [
                  { label: 'Support 2', value: price(selected.s2) },
                  { label: 'Support 3', value: price(selected.s3) },
                ]
              : []),
            ...(method === 'camarilla' && selected.s4 !== undefined
              ? [{ label: 'Support 4', value: price(selected.s4) }]
              : []),
          ]}
        />

        <Breakdown
          title="Central pivot by method"
          rows={(Object.keys(levels) as PivotMethod[]).map((key) => ({
            label: pivotMethodLabels[key],
            value: price(levels[key].pivot),
            accent: key === method,
          }))}
        />

        <SourceNote
          sources={[]}
          title="Method"
          intro="Classic, Fibonacci and Woodie all build on the same central pivot, which is the average of high, low and close. Camarilla anchors to the close, and DeMark uses the relationship between the open and the close to choose its formula."
          extra="Levels are rounded to the nearest paisa for display. PSX quotes in rupees and paisa, and a level that falls between ticks is not tradeable as printed. DeMark defines only one resistance and one support level."
        />

        <AssumptionNote>
          A pivot is arithmetic, not support. It becomes interesting only if price actually reacts
          there, and the same level is watched by everyone using the same method. Use it to frame a
          stop or a target, not as a reason to trade.
        </AssumptionNote>

        <ToolFooter
          calculatorName="Pivot Point Calculator"
          disclaimer="We calculate published pivot formulas from the prices you enter. We do not forecast the next session."
        />
      </div>
    </ToolGrid>
  );
}

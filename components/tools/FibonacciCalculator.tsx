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
  WarningNote,
} from './ToolUI';
import { fibLevels } from '@/lib/psx';
import { formatPKR2, formatPct } from '@/lib/format';

/**
 * Retracement and extension levels between a swing high and a swing low.
 *
 * The direction toggle matters: the same two prices produce a different ladder
 * depending on whether the swing travelled up or down.
 */

export function FibonacciCalculator() {
  const [low, setLow] = useState(350);
  const [high, setHigh] = useState(420);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [current, setCurrent] = useState(398);

  const valid = high > low && low > 0;
  const levels = useMemo(
    () => (valid ? fibLevels({ low, high, direction }) : []),
    [low, high, direction, valid]
  );

  const retracements = levels.filter((level) => level.kind === 'retracement');
  const extensions = levels.filter((level) => level.kind === 'extension');

  const nearest = useMemo(() => {
    if (!valid || current <= 0) return null;
    return retracements.reduce<{ ratio: number; price: number; distance: number } | null>(
      (best, level) => {
        const distance = Math.abs(level.price - current);
        return best === null || distance < best.distance
          ? { ratio: level.ratio, price: level.price, distance }
          : best;
      },
      null
    );
  }, [retracements, current, valid]);

  const distanceLabel = (price: number) => {
    if (current <= 0) return 'Set a price';
    const change = price / current - 1;
    return `${change >= 0 ? '+' : ''}${formatPct(change)}`;
  };

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The swing"
          intro="A swing is two turning points, not two arbitrary prices. Use the high and low of the move you are measuring."
        >
          <NumberField
            id="swing-low"
            label="Swing low"
            value={low}
            set={setLow}
            step={0.5}
            prefix="PKR"
          />
          <NumberField
            id="swing-high"
            label="Swing high"
            value={high}
            set={setHigh}
            step={0.5}
            prefix="PKR"
          />
          <Segmented
            label="Direction of the swing"
            value={direction}
            set={setDirection}
            options={[
              { value: 'up', label: 'Low to high (uptrend)' },
              { value: 'down', label: 'High to low (downtrend)' },
            ]}
            hint="Levels are measured back against the direction of the move. Get this wrong and every number is inverted."
          />
          <NumberField
            id="current-price"
            label="Current price"
            value={current}
            set={setCurrent}
            step={0.5}
            prefix="PKR"
            hint="Optional. Used only to show how far each level sits from the market."
          />
        </ToolPanel>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Nearest retracement"
          headline={nearest ? `${formatPct(nearest.ratio, 1)} at PKR ${formatPKR2(nearest.price)}` : 'Set a valid swing'}
          sub={
            valid
              ? `The 50% level of this swing is PKR ${formatPKR2(
                  (high + low) / 2
                )}. The range is PKR ${formatPKR2(high - low)}.`
              : 'The swing high has to be above the swing low, and both above zero.'
          }
          rows={[
            { label: 'Swing low', value: `PKR ${formatPKR2(low)}` },
            { label: 'Swing high', value: `PKR ${formatPKR2(high)}` },
            { label: '50% level', value: `PKR ${formatPKR2((high + low) / 2)}`, accent: true },
            { label: 'Direction', value: direction === 'up' ? 'Up leg' : 'Down leg' },
          ]}
        />

        {!valid && (
          <WarningNote>
            Check the two swing prices. The high must be above the low, and neither can be zero.
          </WarningNote>
        )}

        {valid && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <MiniStat
                label="38.2% retracement"
                value={`PKR ${formatPKR2(retracements[2]?.price ?? 0)}`}
              />
              <MiniStat
                label="61.8% retracement"
                value={`PKR ${formatPKR2(retracements[4]?.price ?? 0)}`}
              />
            </div>

            <Breakdown
              title="Retracement levels"
              rows={retracements.map((level) => ({
                label: `${formatPct(level.ratio, 1)} of the swing`,
                value: `PKR ${formatPKR2(level.price)} · ${distanceLabel(level.price)}`,
                accent: level.ratio === 0.5,
              }))}
              footer={
                <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                  The 50% level is not a Fibonacci ratio. It is included because traders watch it,
                  and because it is the midpoint of the swing.
                </p>
              }
            />

            <Breakdown
              title="Extension levels"
              rows={extensions.map((level) => ({
                label: `${formatPct(level.ratio, 1)} extension`,
                value: `PKR ${formatPKR2(level.price)} · ${distanceLabel(level.price)}`,
              }))}
            />
          </>
        )}

        <SourceNote
          sources={[]}
          title="Method"
          intro="Retracements are measured as a proportion of the swing range, starting from the end of the move. Extensions project the same range beyond the swing in the direction of the trend. The ratios themselves are convention, not law."
          extra="Prices are shown to the nearest paisa. PSX tick sizes mean a level between ticks is not directly tradeable, and the level is only as meaningful as the swing you chose."
        />

        <AssumptionNote>
          Fibonacci levels describe where a move has retraced, not where it must stop. Two people
          can draw different swings on the same chart and both be internally consistent. Decide the
          swing before you look at the levels, not after.
        </AssumptionNote>

        <ToolFooter
          calculatorName="Fibonacci Retracement Calculator"
          disclaimer="We calculate the conventional ratios from the swing you enter. The levels are not predictions and not a recommendation to trade."
        />
      </div>
    </ToolGrid>
  );
}

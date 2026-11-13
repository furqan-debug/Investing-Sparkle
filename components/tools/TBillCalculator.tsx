'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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
import { tbill, tbillDays } from '@/lib/savings';
import { securityWht, tbillFallback, type TbillSnapshot } from '@/content/savings-rates';
import { formatDate, formatPKR, formatPKR2, formatPct } from '@/lib/format';

type Tenor = '1' | '3' | '6' | '12';
type FilerStatus = 'filer' | 'nonFiler';
type Holder = 'individual' | 'company';

/**
 * A Treasury bill bought at a discount. The cut-off yield comes from the
 * latest SBP auction result, and the visitor can replace it to model a
 * different price. The after-tax return is the number that matters.
 */
export function TBillCalculator() {
  const [faceValue, setFaceValue] = useState(500_000);
  const [months, setMonths] = useState<Tenor>('12');
  const [yieldPct, setYieldPct] = useState(12.41);
  const [status, setStatus] = useState<FilerStatus>('filer');
  const [holder, setHolder] = useState<Holder>('individual');
  const [auction, setAuction] = useState<TbillSnapshot | null>(null);
  const [feedFailed, setFeedFailed] = useState(false);
  const applied = useRef(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/market/auction', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('feed failed');
        return response.json() as Promise<{ tbills: TbillSnapshot }>;
      })
      .then((data) => {
        if (cancelled || !data.tbills) return;
        setAuction(data.tbills);
        if (!applied.current) {
          applied.current = true;
          const twelve = data.tbills.yields.find((entry) => entry.months === 12);
          if (twelve) setYieldPct(Number((twelve.yield * 100).toFixed(4)));
        }
      })
      .catch(() => {
        if (!cancelled) setFeedFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const whtRate =
    holder === 'individual'
      ? status === 'filer'
        ? securityWht.individual.filer
        : securityWht.individual.nonFiler
      : status === 'filer'
        ? securityWht.company.filer
        : securityWht.company.nonFiler;

  const result = useMemo(
    () => tbill({ faceValue, yieldRate: yieldPct / 100, months: Number(months), whtRate }),
    [faceValue, yieldPct, months, whtRate]
  );

  function applyTenor(next: Tenor) {
    setMonths(next);
    const live = auction?.yields.find((entry) => entry.months === Number(next));
    if (live) setYieldPct(Number((live.yield * 100).toFixed(4)));
  }

  const curve = auction ?? tbillFallback;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The bill"
          intro="A Treasury bill is bought below face value and repaid at face value. The difference is your profit, and it is taxed as profit on debt."
        >
          <NumberField
            id="tbill-face"
            label="Face value at maturity"
            value={faceValue}
            set={setFaceValue}
            step={100_000}
            prefix="PKR"
            hint="The amount the government repays. You invest less than this today."
          />

          <Segmented<Tenor>
            label="Tenor"
            value={months}
            set={applyTenor}
            options={[
              { value: '1', label: '1 month' },
              { value: '3', label: '3 months' },
              { value: '6', label: '6 months' },
              { value: '12', label: '12 months' },
            ]}
            hint="The calculator uses 30, 91, 182 or 365 days for the four tenors."
          />

          <NumberField
            id="tbill-yield"
            label="Cut-off yield"
            value={yieldPct}
            set={setYieldPct}
            step={0.01}
            prefix="%"
            hint="Starts at the latest SBP auction cut-off. Edit it to model a different price or a secondary-market yield."
          />

          <Segmented<Holder>
            label="Holder"
            value={holder}
            set={setHolder}
            options={[
              { value: 'individual', label: 'Individual' },
              { value: 'company', label: 'Company' },
            ]}
            hint="An individual pays 15% or 30%; a company pays 20% or 40% on government securities."
          />

          <Segmented<FilerStatus>
            label="Tax status"
            value={status}
            set={setStatus}
            options={[
              { value: 'filer', label: 'Filer' },
              { value: 'nonFiler', label: 'Non-filer' },
            ]}
          />
        </ToolPanel>

        <div className="rounded-xl border border-line bg-[var(--bg-inset)] p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="mono-label text-[9px]">Auction yields</p>
            {auction ? (
              <span className="inline-flex items-center gap-1.5 text-[10px] text-muted">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${auction.live ? 'bg-green-400' : 'bg-warning'}`}
                  aria-hidden
                />
                {auction.live ? 'Live SBP file' : 'Reference figure'}
              </span>
            ) : feedFailed ? (
              <span className="inline-flex items-center gap-1.5 text-[10px] text-warning">
                <span className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden /> Feed
                unavailable
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[10px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden /> Loading
              </span>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {curve.yields.map((entry) => (
              <div key={entry.months} className="rounded-lg border border-line bg-white/[0.02] px-2.5 py-2">
                <p className="text-[10px] text-muted">{entry.months}M</p>
                <p className="num mt-0.5 text-xs text-ink">{formatPct(entry.yield)}</p>
              </div>
            ))}
          </div>

          <p className="mt-2.5 text-[10px] leading-relaxed text-muted">
            {curve.source}. {curve.live ? 'Read from the SBP result file' : 'Dated snapshot'} for the
            auction on {formatDate(curve.asOf)}.
          </p>
        </div>

        <SourceNote
          sources={['sbpTbills', 'whtCard']}
          title="Yields and tax"
          intro="Cut-off yields are read from the latest SBP Market Treasury Bills auction result. Withholding follows section 151 of the Income Tax Ordinance."
          extra="The price uses a 365-day year and the exact day count shown. SBP's published price can differ by a few paisa because of the auction's settlement dates."
        />

        {yieldPct <= 0 && (
          <WarningNote>
            Enter a yield above zero. A zero yield means the bill is bought at face value and there
            is no profit to tax.
          </WarningNote>
        )}

        <AssumptionNote>
          The bill is held to maturity. Selling before maturity can produce a capital gain or loss
          that is taxed differently, and the secondary-market yield may not match the auction
          cut-off. The calculator ignores transaction costs and any zakat deduction.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Price per PKR 100 of face value"
          headline={`PKR ${formatPKR2(result.price)}`}
          sub={`You invest PKR ${formatPKR(result.investment)} today for PKR ${formatPKR(
            faceValue
          )} at maturity in ${result.days} days.`}
          rows={[
            { label: 'Gain at maturity', value: `PKR ${formatPKR(result.gain)}` },
            { label: 'Withholding tax', value: `PKR ${formatPKR(result.wht)}` },
            {
              label: 'Net gain',
              value: `PKR ${formatPKR(result.netGain)}`,
              accent: true,
            },
            { label: 'Net annual return', value: formatPct(result.netAnnual) },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Days to maturity" value={`${result.days} days`} />
          <MiniStat label="Net at maturity" value={`PKR ${formatPKR(result.netMaturity)}`} />
        </div>

        <Breakdown
          title="The calculation"
          rows={[
            { label: 'Face value', value: `PKR ${formatPKR(faceValue)}` },
            { label: 'Tenor', value: `${months === '1' ? '1 month' : `${months} months`} · ${result.days} days` },
            { label: 'Cut-off yield', value: formatPct(yieldPct / 100) },
            {
              label: `Price per 100 at ${formatPct(yieldPct / 100)}`,
              value: `PKR ${formatPKR2(result.price)}`,
            },
            { label: 'Amount invested', value: `PKR ${formatPKR(result.investment)}` },
            { label: 'Gain at maturity', value: `PKR ${formatPKR(result.gain)}` },
            {
              label: `Withholding at ${formatPct(whtRate, 0)}`,
              value: `PKR ${formatPKR(result.wht)}`,
            },
            {
              label: 'Net gain',
              value: `PKR ${formatPKR(result.netGain)}`,
              strong: true,
              accent: true,
            },
          ]}
          footer={
            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              Price is 100 divided by one plus the yield times the day count over 365. The gain is
              the face value minus the amount invested, and the annual return is that gain spread
              over the days held.
            </p>
          }
        />

        <Breakdown
          title="The same face value across the curve"
          rows={curve.yields.map((entry) => {
            const price = 100 / (1 + (entry.yield * (tbillDays[entry.months] ?? 365)) / 365);
            const cost = (faceValue * price) / 100;
            return {
              label: `${entry.months} month`,
              value: `${formatPct(entry.yield)} · invest PKR ${formatPKR(cost)}`,
            };
          })}
          footer={
            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              What PKR {formatPKR(faceValue)} of face value would cost at each auction cut-off, before
              tax. Shorter bills usually carry a lower yield.
            </p>
          }
        />

        <ToolFooter
          calculatorName="T-Bill Calculator"
          disclaimer="The yield is the cut-off from the SBP auction result at the date shown, or the figure you type. The calculator assumes the bill is held to maturity and uses a 365-day year with the day count shown. It ignores transaction costs, early sale, secondary-market pricing and any zakat deduction."
        />
      </div>
    </ToolGrid>
  );
}

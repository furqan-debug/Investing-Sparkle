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
import { bondYtm, type CouponFrequency } from '@/lib/savings';
import { pibFallback, securityWht, type PibSnapshot } from '@/content/savings-rates';
import { formatDate, formatPKR, formatPKR2, formatPct } from '@/lib/format';

type FilerStatus = 'filer' | 'nonFiler';
type Holder = 'individual' | 'company';

/**
 * A coupon-paying Pakistan Investment Bond. The reference prices and yields
 * come from the latest SBP fixed-rate auction, and the tenor rows let a
 * visitor load one with a click. The yield is then solved from the price the
 * visitor sees, which is the honest direction: price is quoted, yield follows.
 */
export function PibBondCalculator() {
  const [faceValue, setFaceValue] = useState(500_000);
  const [couponPct, setCouponPct] = useState(12.25);
  const [price, setPrice] = useState(98.1366);
  const [years, setYears] = useState(5);
  const [frequency, setFrequency] = useState<CouponFrequency>('semiannual');
  const [daysSinceCoupon, setDaysSinceCoupon] = useState(0);
  const [holder, setHolder] = useState<Holder>('individual');
  const [status, setStatus] = useState<FilerStatus>('filer');
  const [auction, setAuction] = useState<PibSnapshot | null>(null);
  const [feedFailed, setFeedFailed] = useState(false);
  const [activeYears, setActiveYears] = useState(5);
  const applied = useRef(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/market/auction', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('feed failed');
        return response.json() as Promise<{ pibs: PibSnapshot }>;
      })
      .then((data) => {
        if (cancelled || !data.pibs) return;
        setAuction(data.pibs);
        if (!applied.current) {
          applied.current = true;
          const five = data.pibs.bonds.find((bond) => bond.years === 5);
          if (five) {
            setCouponPct(Number((five.coupon * 100).toFixed(4)));
            setPrice(five.price);
            setYears(five.years);
            setActiveYears(five.years);
          }
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
    () =>
      bondYtm({
        faceValue,
        couponRate: couponPct / 100,
        years,
        frequency,
        cleanPrice: price,
        daysSinceCoupon,
        whtRate,
      }),
    [faceValue, couponPct, years, frequency, price, daysSinceCoupon, whtRate]
  );

  function applyBond(bond: { years: number; coupon: number; price: number }) {
    setYears(bond.years);
    setCouponPct(Number((bond.coupon * 100).toFixed(4)));
    setPrice(bond.price);
    setDaysSinceCoupon(0);
    setActiveYears(bond.years);
  }

  const reference = auction ?? pibFallback;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The bond"
          intro="A Pakistan Investment Bond pays a fixed coupon twice a year and returns the face value at maturity. It is quoted as a clean price per 100 of face value, with accrued interest added at settlement."
        >
          <div className="rounded-xl border border-line bg-[var(--bg-inset)] p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="mono-label text-[9px]">Latest fixed-rate auction</p>
              {auction ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] text-muted">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      auction.live ? 'bg-green-400' : 'bg-warning'
                    }`}
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

            <div className="mt-3 space-y-1.5">
              {reference.bonds.map((bond) => {
                const active = activeYears === bond.years;
                return (
                  <button
                    key={bond.years}
                    type="button"
                    onClick={() => applyBond(bond)}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors ${
                      active
                        ? 'border-sparkle-400/60 bg-sparkle-400/[0.08]'
                        : 'border-line bg-white/[0.02] hover:border-sparkle-400/30'
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-ink">{bond.years} year</span>
                      <span className="mt-0.5 block text-[10px] text-muted">
                        Coupon {formatPct(bond.coupon)} · price {formatPKR2(bond.price)}
                      </span>
                    </span>
                    <span className="num shrink-0 text-xs text-sparkle-300">
                      {formatPct(bond.yield)}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-2.5 text-[10px] leading-relaxed text-muted">
              {reference.source}.{' '}
              {reference.live ? 'Read from the SBP result file' : 'Dated snapshot'} for the auction
              on {formatDate(reference.asOf)}. Tap a row to load its coupon and price.
            </p>
          </div>

          <NumberField
            id="pib-face"
            label="Face value"
            value={faceValue}
            set={setFaceValue}
            step={100_000}
            prefix="PKR"
            hint="The amount repaid at maturity, and the base the coupon is calculated on."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <NumberField
              id="pib-coupon"
              label="Coupon rate"
              value={couponPct}
              set={setCouponPct}
              step={0.05}
              prefix="%"
              hint="Annual coupon, paid in equal instalments."
            />
            <NumberField
              id="pib-price"
              label="Clean price"
              value={price}
              set={setPrice}
              step={0.01}
              prefix="PKR"
              hint="Per 100 of face value, excluding accrued interest."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <NumberField
              id="pib-years"
              label="Years to maturity"
              value={years}
              set={setYears}
              step={1}
              prefix="Yrs"
              hint="The bond's remaining life from settlement."
            />
            <NumberField
              id="pib-days"
              label="Days since last coupon"
              value={daysSinceCoupon}
              set={setDaysSinceCoupon}
              step={1}
              prefix="Days"
              hint="Used for accrued interest. Zero on a coupon date."
            />
          </div>

          <Segmented<CouponFrequency>
            label="Coupon frequency"
            value={frequency}
            set={setFrequency}
            options={[
              { value: 'semiannual', label: 'Twice a year' },
              { value: 'annual', label: 'Once a year' },
            ]}
            hint="Fixed-rate PIBs pay semi-annually. Annual is here for comparison."
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

        <SourceNote
          sources={['sbpPibs', 'whtCard']}
          title="Prices and tax"
          intro="Reference prices, coupons and cut-off yields are read from the latest SBP fixed-rate PIB auction result. Withholding follows section 151 of the Income Tax Ordinance."
          extra="The 2-year and 15-year zero-coupon PIBs are not included: their price and yield use a different convention. The calculator prices a coupon-paying bond."
        />

        {price <= 0 && (
          <WarningNote>
            Enter a clean price above zero. At zero the buyer pays only accrued interest and the
            yield to maturity cannot be solved.
          </WarningNote>
        )}

        {result.ytm === null && price > 0 && (
          <WarningNote>
            No yield solves this price with the inputs given. Check the coupon, the years to
            maturity and the clean price.
          </WarningNote>
        )}

        <AssumptionNote>
          The bond is held to maturity and every coupon is paid on time. Accrued interest is
          calculated on a 365-day year with the days since the last coupon that you enter. The
          actual settlement day count and any early sale can change both the price and the return.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Yield to maturity"
          headline={result.ytm === null ? 'Not solvable' : formatPct(result.ytm)}
          sub={
            result.ytm === null
              ? 'The price and the cash flows do not meet. Check the inputs.'
              : `If you pay PKR ${formatPKR(result.dirtyAmount)} today and hold to maturity, this is the annual return before tax.`
          }
          rows={[
            { label: 'Clean amount', value: `PKR ${formatPKR2(result.cleanAmount)}` },
            { label: 'Accrued interest', value: `PKR ${formatPKR2(result.accrued)}` },
            {
              label: 'Total to pay today',
              value: `PKR ${formatPKR2(result.dirtyAmount)}`,
              accent: true,
            },
            { label: 'Current yield', value: formatPct(result.currentYield) },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat
            label="Each coupon"
            value={`PKR ${formatPKR2(result.couponPayment)}`}
          />
          <MiniStat label="Coupons left" value={`${result.periods}`} />
        </div>

        {result.ytm !== null && (
          <>
            <Breakdown
              title="Income and tax over the life"
              rows={[
                { label: 'Face value', value: `PKR ${formatPKR(faceValue)}` },
                {
                  label: 'Coupon',
                  value: `${formatPct(couponPct / 100)} ${
                    frequency === 'semiannual' ? 'paid twice a year' : 'paid once a year'
                  }`,
                },
                {
                  label: 'Total coupons',
                  value: `PKR ${formatPKR(result.totalCoupons)}`,
                },
                {
                  label: `Withholding at ${formatPct(whtRate, 0)}`,
                  value: `PKR ${formatPKR(result.wht)}`,
                },
                {
                  label: 'Gain over the dirty price',
                  value: `PKR ${formatPKR(faceValue - result.dirtyAmount)}`,
                },
                {
                  label: 'Net profit to maturity',
                  value: `PKR ${formatPKR(result.netProfit)}`,
                  strong: true,
                  accent: true,
                },
                {
                  label: 'Net annual return',
                  value: formatPct(result.netAnnual),
                },
              ]}
              footer={
                <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                  Net profit is every coupon after withholding, plus the face value at maturity,
                  minus what you pay today. The annual figure spreads that over the years remaining.
                </p>
              }
            />

            <Breakdown
              title="At settlement"
              rows={[
                {
                  label: 'Clean price per 100',
                  value: formatPKR2(result.clean),
                },
                {
                  label: 'Clean amount on PKR ' + formatPKR(faceValue),
                  value: `PKR ${formatPKR2(result.cleanAmount)}`,
                },
                {
                  label: `${daysSinceCoupon} days of accrued interest`,
                  value: `PKR ${formatPKR2(result.accrued)}`,
                },
                {
                  label: 'Dirty price you pay',
                  value: `PKR ${formatPKR2(result.dirtyAmount)}`,
                  strong: true,
                },
              ]}
              footer={
                <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                  The seller receives the accrued interest you pay, then the next coupon comes to
                  you in full. That is why the price quoted and the cash paid differ.
                </p>
              }
            />
          </>
        )}

        <ToolFooter
          calculatorName="PIB Bond Yield Calculator"
          disclaimer="The reference prices and yields come from the SBP fixed-rate PIB auction result at the date shown, or from the figures you type. The calculator assumes the bond is held to maturity with every coupon paid on time, uses a 365-day year, and ignores transaction costs, early sale, secondary-market pricing, zakat and any capital gain treatment."
        />
      </div>
    </ToolGrid>
  );
}

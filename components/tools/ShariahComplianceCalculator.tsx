'use client';

import { useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  MiniStat,
  NumberField,
  Segmented,
  SourceNote,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { shariahScreen } from '@/lib/valuation';
import { formatNumber, formatPKR2, formatPct } from '@/lib/format';

type BusinessAnswer = 'yes' | 'no';

/**
 * The PSX financial screens, applied to the figures a visitor enters. The
 * business screen is a separate question because no ratio can rescue a company
 * whose core activity is impermissible.
 */
export function ShariahComplianceCalculator() {
  const [business, setBusiness] = useState<BusinessAnswer>('yes');
  const [totalAssets, setTotalAssets] = useState(10_000_000);
  const [debt, setDebt] = useState(2_000_000);
  const [investments, setInvestments] = useState(1_000_000);
  const [illiquid, setIlliquid] = useState(4_000_000);
  const [liabilities, setLiabilities] = useState(3_000_000);
  const [shares, setShares] = useState(1_000_000);
  const [revenue, setRevenue] = useState(5_000_000);
  const [nonCompliantIncome, setNonCompliantIncome] = useState(100_000);
  const [price, setPrice] = useState(100);

  const result = useMemo(
    () =>
      shariahScreen({
        businessPermissible: business === 'yes',
        totalAssets,
        interestBearingDebt: debt,
        nonCompliantInvestments: investments,
        totalRevenue: revenue,
        nonCompliantIncome,
        illiquidAssets: illiquid,
        totalLiabilities: liabilities,
        shares,
        price,
      }),
    [
      business,
      totalAssets,
      debt,
      investments,
      illiquid,
      liabilities,
      shares,
      revenue,
      nonCompliantIncome,
      price,
    ]
  );

  const passed = result.screens.filter((screen) => screen.available && screen.pass).length;
  const failed = result.screens.length - passed;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="Business screen"
          intro="The core activity must be permissible before any financial ratio matters. Conventional banking and insurance, interest-based lending, alcohol, tobacco, pork, gambling and non-compliant entertainment fail outright."
        >
          <Segmented<BusinessAnswer>
            label="Core business"
            value={business}
            set={setBusiness}
            options={[
              { value: 'yes', label: 'Permissible' },
              { value: 'no', label: 'Not permissible' },
            ]}
            hint="This is a judgement about what the company actually does, not a number from the accounts."
          />
        </ToolPanel>

        <ToolPanel
          title="Balance sheet"
          intro="Use the latest audited financial statements. Enter the amounts in rupees; the tool converts them into the published ratios."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField
              id="shariah-assets"
              label="Total assets"
              value={totalAssets}
              set={setTotalAssets}
              step={1_000_000}
              prefix="PKR"
            />
            <NumberField
              id="shariah-shares"
              label="Shares outstanding"
              value={shares}
              set={setShares}
              step={100_000}
              prefix="Qty"
            />
            <NumberField
              id="shariah-debt"
              label="Interest-bearing debt"
              value={debt}
              set={setDebt}
              step={500_000}
              prefix="PKR"
              hint="Loans and borrowings that carry interest, not trade payables."
            />
            <NumberField
              id="shariah-investments"
              label="Non-compliant investments"
              value={investments}
              set={setInvestments}
              step={500_000}
              prefix="PKR"
              hint="Investments in prohibited businesses or interest-bearing instruments."
            />
            <NumberField
              id="shariah-illiquid"
              label="Illiquid assets"
              value={illiquid}
              set={setIlliquid}
              step={500_000}
              prefix="PKR"
              hint="Assets that Shariah permits to be traded at a value other than par, such as property and plant."
            />
            <NumberField
              id="shariah-liabilities"
              label="Total liabilities"
              value={liabilities}
              set={setLiabilities}
              step={500_000}
              prefix="PKR"
              hint="Used only for the net liquid assets per share screen."
            />
          </div>
        </ToolPanel>

        <ToolPanel
          title="Income and market price"
          intro="The income screen uses total revenue, including other income. The price screen compares the market price with net liquid assets per share."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField
              id="shariah-revenue"
              label="Total revenue"
              value={revenue}
              set={setRevenue}
              step={500_000}
              prefix="PKR"
              hint="Gross revenue plus other income, as defined in the PSX methodology."
            />
            <NumberField
              id="shariah-noncompliant"
              label="Non-compliant income"
              value={nonCompliantIncome}
              set={setNonCompliantIncome}
              step={50_000}
              prefix="PKR"
              hint="Interest income and income from prohibited activities."
            />
            <NumberField
              id="shariah-price"
              label="Current share price"
              value={price}
              set={setPrice}
              step={0.5}
              prefix="PKR"
            />
          </div>
        </ToolPanel>

        <SourceNote
          sources={['psxShariah']}
          title="Screening criteria and source"
          intro="Checked 13 November 2026. The thresholds are the PSX financial screens under the SECP-approved methodology: debt below 33% of assets, non-compliant investments below 33%, non-compliant income below 5% of revenue, illiquid assets at least 25%, and price at or above net liquid assets per share."
          extra="PSX revises the Shariah-compliant list twice a year, on 15 May and 15 November. A company can pass this arithmetic and still be excluded by the business screen, and the index provider’s published list is the authoritative source."
        />

        {business === 'no' && (
          <WarningNote>
            The core business is not permissible, so the company fails the screen regardless of the
            financial ratios. No amount of balance-sheet compliance changes that.
          </WarningNote>
        )}

        <AssumptionNote>
          This is a screening tool, not a fatwa. It applies published thresholds to the figures you
          enter, and it cannot see the detail behind those figures. Confirm the result against the
          PSX Shariah-compliant securities list and the company’s own disclosures before acting.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Overall screen"
          headline={
            business === 'no'
              ? 'Fails the business screen'
              : result.overall
                ? 'Passes the financial screens'
                : `Fails ${failed} of ${result.screens.length} financial screens`
          }
          sub={
            business === 'no'
              ? 'The core activity is outside the permissible universe.'
              : result.overall
                ? 'All five published financial screens are satisfied on the figures entered.'
                : 'One or more published thresholds are not met, or the data needed for a screen is missing.'
          }
          rows={[
            {
              label: 'Business screen',
              value: business === 'yes' ? 'Pass' : 'Fail',
              accent: business === 'yes',
            },
            { label: 'Financial screens passed', value: `${passed} of ${result.screens.length}` },
            {
              label: 'Non-compliant income share',
              value: formatPct(result.incomeRatio),
            },
            {
              label: 'NLA per share',
              value: `PKR ${formatPKR2(result.nlaPerShare)}`,
            },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Debt to assets" value={formatPct(result.debtRatio)} />
          <MiniStat label="Illiquid assets" value={formatPct(result.illiquidRatio)} />
        </div>

        <div className="rounded-2xl border border-line bg-white/[0.018] p-5 md:p-6">
          <h2 className="font-sans text-base font-semibold text-ink">The financial screens</h2>
          <p className="mt-1 text-xs text-muted">
            Each threshold is the published PSX criterion, applied to the figures you entered.
          </p>

          <div className="mt-4 divide-y divide-line">
            {result.screens.map((screen) => {
              const ok = screen.available && screen.pass;
              const display = !screen.available
                ? 'Not available'
                : screen.key === 'nla'
                  ? `NLA PKR ${formatPKR2(screen.value)} · price PKR ${formatPKR2(screen.compareValue ?? 0)}`
                  : formatPct(screen.value);

              return (
                <div key={screen.key} className="flex items-start justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm text-ink">{screen.label}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                      {display} · {screen.threshold}
                    </p>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      ok
                        ? 'bg-green-400/10 text-green-300'
                        : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {ok ? (
                      <Check className="h-3 w-3" aria-hidden />
                    ) : (
                      <X className="h-3 w-3" aria-hidden />
                    )}
                    {ok ? 'Pass' : 'Fail'}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-3 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">
            Shares outstanding: {formatNumber(shares)}. Net liquid assets per share is total assets
            less illiquid assets and total liabilities, divided by shares.
          </p>
        </div>

        <ToolFooter
          calculatorName="Shariah Compliance Checker"
          disclaimer="This is a published-ratio screen applied to the figures you enter, not a religious ruling. It does not verify the business description, the accounting treatment or the source of every income line. Check the PSX Shariah-compliant securities list and consult a qualified adviser before relying on the result."
        />
      </div>
    </ToolGrid>
  );
}

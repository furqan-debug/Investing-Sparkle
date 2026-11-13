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
import { termDeposit, type Compounding, type DepositPayout } from '@/lib/savings';
import { bankDepositWht, policyRate } from '@/content/savings-rates';
import { formatDate, formatPKR, formatPKR2, formatPct } from '@/lib/format';

type FilerStatus = 'filer' | 'nonFiler';

/**
 * A bank term deposit. Banks set their own rates, so the rate is an input and
 * the SBP policy rate is only a labelled starting point. Withholding on bank
 * profit is 20% for a filer and 40% for a non-filer, higher than the NSS rate.
 */
export function BankDepositCalculator() {
  const [principal, setPrincipal] = useState(1_000_000);
  const [ratePct, setRatePct] = useState(Number((policyRate.rate * 100).toFixed(2)));
  const [months, setMonths] = useState(12);
  const [compounding, setCompounding] = useState<Compounding>('monthly');
  const [payout, setPayout] = useState<DepositPayout>('reinvest');
  const [status, setStatus] = useState<FilerStatus>('filer');

  const whtRate = status === 'filer' ? bankDepositWht.filer : bankDepositWht.nonFiler;

  const result = useMemo(
    () =>
      termDeposit({
        principal,
        rate: ratePct / 100,
        months,
        compounding,
        payout,
        whtRate,
      }),
    [principal, ratePct, months, compounding, payout, whtRate]
  );

  const periodsPerYear =
    compounding === 'monthly' ? 12 : compounding === 'quarterly' ? 4 : 1;
  const perPaymentGross = (principal * (ratePct / 100)) / periodsPerYear;
  const perPaymentNet = perPaymentGross * (1 - whtRate);

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The deposit"
          intro="A term deposit pays a fixed rate for a fixed period. Enter the rate your bank actually quoted: the policy rate below is only a benchmark, and every bank prices deposits differently."
        >
          <NumberField
            id="deposit-principal"
            label="Amount deposited"
            value={principal}
            set={setPrincipal}
            step={100_000}
            prefix="PKR"
            hint="The lump sum you place with the bank."
          />

          <NumberField
            id="deposit-rate"
            label="Profit rate"
            value={ratePct}
            set={setRatePct}
            step={0.05}
            prefix="%"
            hint={`Starts at the SBP policy rate benchmark of ${formatPct(
              policyRate.rate
            )} as on ${formatDate(policyRate.asOf)}. Replace it with your bank's quoted rate.`}
          />

          <NumberField
            id="deposit-months"
            label="Tenor"
            value={months}
            set={setMonths}
            step={1}
            prefix="Months"
            hint="The period the rate is locked for, in months."
          />

          <Segmented<Compounding>
            label="Profit credited"
            value={compounding}
            set={setCompounding}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'quarterly', label: 'Quarterly' },
              { value: 'annual', label: 'Annually' },
            ]}
            columns={3}
            hint="How often the bank adds profit to the deposit."
          />

          <Segmented<DepositPayout>
            label="What happens to the profit"
            value={payout}
            set={setPayout}
            options={[
              { value: 'reinvest', label: 'Reinvested' },
              { value: 'payout', label: 'Paid out' },
            ]}
            hint="Reinvested profit compounds. Paid-out profit leaves the principal flat."
          />

          <Segmented<FilerStatus>
            label="Tax status"
            value={status}
            set={setStatus}
            options={[
              { value: 'filer', label: 'Filer (20%)' },
              { value: 'nonFiler', label: 'Non-filer (40%)' },
            ]}
            hint="Section 151 clause (a) applies 20% or 40% to profit on a bank deposit."
          />
        </ToolPanel>

        <SourceNote
          sources={['sbpPolicy', 'whtCard']}
          title="Benchmark and tax"
          intro={`The policy rate is ${formatPct(policyRate.rate)} as on ${formatDate(
            policyRate.asOf
          )}. It is not a deposit rate: banks set their own, above or below it, and the rate on your statement is the one that matters.`}
          extra="Withholding on bank deposit profit is 20% for a filer and 40% for a non-filer under section 151 clause (a). That is higher than the 15% and 30% that applies to National Savings and other profit on debt."
        />

        {principal <= 0 && (
          <WarningNote>
            Enter an amount above zero. A deposit with no principal earns nothing, whatever the
            rate.
          </WarningNote>
        )}

        {ratePct <= 0 && (
          <WarningNote>
            Enter a rate above zero. The calculator will not invent a return the bank has not
            quoted.
          </WarningNote>
        )}

        <AssumptionNote>
          The rate stays fixed for the whole tenor and the bank credits profit on schedule. Real
          deposits may pay a lower rate on early withdrawal, step the rate up over longer tenors, or
          apply a minimum balance. Zakat at 2.5% may also be deducted where it applies.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Net at maturity"
          headline={`PKR ${formatPKR(result.maturity)}`}
          sub={`On PKR ${formatPKR(principal)} at ${formatPct(ratePct / 100)} for ${months} ${
            months === 1 ? 'month' : 'months'
          }, with profit ${payout === 'reinvest' ? 'reinvested' : 'paid out'} and ${formatPct(
            whtRate,
            0
          )} withholding.`}
          rows={[
            { label: 'Gross profit', value: `PKR ${formatPKR(result.grossProfit)}` },
            { label: 'Withholding tax', value: `PKR ${formatPKR(result.wht)}` },
            {
              label: 'Net profit',
              value: `PKR ${formatPKR(result.netProfit)}`,
              accent: true,
            },
            {
              label: 'Net effective annual',
              value: formatPct(result.netEffective),
            },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat
            label={payout === 'reinvest' ? 'First credit, gross' : 'Each payment, net'}
            value={`PKR ${formatPKR2(
              payout === 'reinvest' ? perPaymentGross : perPaymentNet
            )}`}
          />
          <MiniStat label="Principal returned" value={`PKR ${formatPKR(principal)}`} />
        </div>

        <Breakdown
          title="How the return is built"
          rows={[
            { label: 'Amount deposited', value: `PKR ${formatPKR(principal)}` },
            { label: 'Profit rate', value: formatPct(ratePct / 100) },
            {
              label: 'Tenor',
              value: `${months} ${months === 1 ? 'month' : 'months'}`,
            },
            {
              label: 'Profit credited',
              value: compounding === 'annual' ? 'Annually' : compounding === 'quarterly' ? 'Quarterly' : 'Monthly',
            },
            {
              label: 'Gross maturity value',
              value: `PKR ${formatPKR2(result.grossMaturity)}`,
            },
            {
              label: 'Gross profit',
              value: `PKR ${formatPKR2(result.grossProfit)}`,
            },
            {
              label: `Withholding at ${formatPct(whtRate, 0)}`,
              value: `PKR ${formatPKR2(result.wht)}`,
            },
            {
              label: 'Net profit',
              value: `PKR ${formatPKR2(result.netProfit)}`,
              strong: true,
              accent: true,
            },
            {
              label: 'Net maturity value',
              value: `PKR ${formatPKR2(result.maturity)}`,
            },
          ]}
          footer={
            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              {payout === 'reinvest'
                ? 'Profit is credited and left in the deposit, so tax is taken at each credit and the net balance compounds at the after-tax rate.'
                : 'Profit is paid out, so the principal stays flat and the tax comes off each payment. The net profit is the gross profit less withholding.'}
            </p>
          }
        />

        <Breakdown
          title="Gross versus net"
          rows={[
            {
              label: 'Gross effective annual',
              value: formatPct(result.grossEffective),
            },
            {
              label: 'Net effective annual',
              value: formatPct(result.netEffective),
              accent: true,
            },
            {
              label: 'Net simple annual',
              value: formatPct(result.netAnnualSimple),
            },
          ]}
          footer={
            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              The effective rate accounts for compounding within the tenor. The simple rate spreads
              the net profit evenly across the years, which is the figure to compare with a
              certificate that pays profit out.
            </p>
          }
        />

        <ToolFooter
          calculatorName="Bank Term Deposit Calculator"
          disclaimer="The rate is the figure you enter, with the SBP policy rate only as a labelled benchmark. Banks set their own deposit rates and can change them. The calculator assumes the rate stays fixed for the full tenor, profit is credited on schedule, and withholding is the only deduction. It ignores early withdrawal penalties, minimum balances, zakat and any bank-specific charges."
        />
      </div>
    </ToolGrid>
  );
}

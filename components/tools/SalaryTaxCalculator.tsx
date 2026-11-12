'use client';

import { useMemo, useState } from 'react';
import { ReceiptText, Wallet } from 'lucide-react';

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
import { salaryTax } from '@/lib/tax';
import { formatPKR, formatPct } from '@/lib/format';

/**
 * Salary tax for tax year 2026-27.
 *
 * Defaults are deliberately conservative: no credits, no deductions. The point
 * of the tool is to show the slab tax first, then let the visitor add the
 * deductions they can actually claim.
 */

type FilerStatus = 'filer' | 'nonFiler';

export function SalaryTaxCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(250_000);
  const [additionalIncome, setAdditionalIncome] = useState(0);
  const [exemptAllowances, setExemptAllowances] = useState(0);
  const [zakat, setZakat] = useState(0);
  const [donations, setDonations] = useState(0);
  const [pension, setPension] = useState(0);
  const [otherCredits, setOtherCredits] = useState(0);
  const [alreadyDeducted, setAlreadyDeducted] = useState(0);
  const [status, setStatus] = useState<FilerStatus>('filer');

  const result = useMemo(
    () =>
      salaryTax({
        monthlySalary,
        additionalIncome,
        exemptAllowances,
        zakat,
        donations,
        pensionContribution: pension,
        otherCredits,
        taxAlreadyDeducted: alreadyDeducted,
      }),
    [monthlySalary, additionalIncome, exemptAllowances, zakat, donations, pension, otherCredits, alreadyDeducted]
  );

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="Your salary"
          intro="Enter the annual figures from your salary certificate. If you are paid a bonus, add it to additional income."
        >
          <NumberField
            id="monthly-salary"
            label="Gross monthly salary"
            value={monthlySalary}
            set={setMonthlySalary}
            step={5_000}
            hint="Before tax and before any deductions your employer takes."
          />
          <NumberField
            id="additional-income"
            label="Additional annual income"
            value={additionalIncome}
            set={setAdditionalIncome}
            step={10_000}
            hint="Bonus, arrears, or other taxable salary received in the year."
          />
          <NumberField
            id="exempt-allowances"
            label="Exempt allowances"
            value={exemptAllowances}
            set={setExemptAllowances}
            step={10_000}
            hint="Only the portion your employer treats as exempt. If you are unsure, leave this at zero."
          />
          <Segmented
            label="Active Taxpayers List"
            value={status}
            set={setStatus}
            options={[
              { value: 'filer', label: 'Filer' },
              { value: 'nonFiler', label: 'Non-filer' },
            ]}
            hint="Salary tax itself does not change with filer status. It matters for the return, the ATL surcharge and most other tools."
          />
        </ToolPanel>

        <ToolPanel
          title="Deductions and credits"
          intro="These reduce tax only if you can support them. Leave a field at zero if it does not apply."
        >
          <NumberField
            id="zakat"
            label="Zakat paid"
            value={zakat}
            set={setZakat}
            step={5_000}
            hint="Zakat paid under the Zakat and Ushr Ordinance is deducted from taxable income."
          />
          <NumberField
            id="donations"
            label="Approved charitable donations"
            value={donations}
            set={setDonations}
            step={5_000}
            hint={`Deductible up to 30% of taxable income. Your cap here is PKR ${formatPKR(result.donationCap)}.`}
          />
          <NumberField
            id="pension"
            label="VPS or approved pension contribution"
            value={pension}
            set={setPension}
            step={10_000}
            hint="The credit is calculated at your average rate of tax, on the lower of your contribution or 20% of taxable income."
          />
          <NumberField
            id="other-credits"
            label="Other tax credits"
            value={otherCredits}
            set={setOtherCredits}
            step={5_000}
            hint="Life insurance, education or other credits you have already worked out. Enter the credit amount, not the payment."
          />
          <NumberField
            id="already-deducted"
            label="Tax already deducted"
            value={alreadyDeducted}
            set={setAlreadyDeducted}
            step={10_000}
            hint="Tax withheld by your employer so far this year. Used only to show the balance."
          />
        </ToolPanel>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Estimated tax for 2026-27"
          headline={`PKR ${formatPKR(result.taxPayable)}`}
          sub={`On PKR ${formatPKR(result.taxableIncome)} taxable income. About PKR ${formatPKR(result.monthlyTax)} a month, leaving PKR ${formatPKR(result.monthlyTakeHome)} of your gross salary.`}
          rows={[
            { label: 'Effective rate', value: formatPct(result.effectiveRate), accent: true },
            { label: 'Tax before credits', value: `PKR ${formatPKR(result.taxBeforeCredits)}` },
            { label: 'Deductions applied', value: `PKR ${formatPKR(result.zakatDeduction + result.donationDeduction)}` },
            { label: 'Credits applied', value: `PKR ${formatPKR(result.credits)}` },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-line bg-white/[0.02] px-3.5 py-3">
            <p className="mono-label flex items-center gap-1.5 text-[9px]">
              <Wallet className="h-3 w-3" aria-hidden /> Monthly take-home
            </p>
            <p className="num mt-1.5 text-sm text-ink">PKR {formatPKR(result.monthlyTakeHome)}</p>
          </div>
          <div className="rounded-xl border border-line bg-white/[0.02] px-3.5 py-3">
            <p className="mono-label flex items-center gap-1.5 text-[9px]">
              <ReceiptText className="h-3 w-3" aria-hidden /> Balance for the year
            </p>
            <p className="num mt-1.5 text-sm text-ink">
              {result.balance >= 0
                ? `PKR ${formatPKR(result.balance)} due`
                : `PKR ${formatPKR(Math.abs(result.balance))} refund`}
            </p>
          </div>
        </div>

        <Breakdown
          title="How the slabs add up"
          rows={[
            ...result.breakdown.map((line) => ({
              label: `${line.label} at ${formatPct(line.rate, 0)}`,
              value: `PKR ${formatPKR(line.tax)}`,
            })),
            { label: 'Tax before credits', value: `PKR ${formatPKR(result.taxBeforeCredits)}`, strong: true },
            ...(result.pensionCredit > 0
              ? [{ label: 'Pension credit', value: `- PKR ${formatPKR(result.pensionCredit)}` }]
              : []),
            ...(otherCredits > 0
              ? [{ label: 'Other credits', value: `- PKR ${formatPKR(result.credits - result.pensionCredit)}` }]
              : []),
            { label: 'Tax payable', value: `PKR ${formatPKR(result.taxPayable)}`, strong: true, accent: true },
          ]}
        />

        <SourceNote
          sources={['financeAct2026', 'ordinance', 'circular2']}
          extra="The 2026-27 salaried slabs run from 0% to 35% across eight bands. The 9% surcharge on salaried income above Rs 10 million has been withdrawn. A non-filer still faces the separate ATL surcharge when filing late."
        />

        <AssumptionNote>
          This is a planning estimate, not a return. It assumes salaried income, applies the
          published slab table, and treats zakat and approved donations as deductions and the
          pension contribution as a credit at your average rate. Your employer’s withholding may
          differ. Confirm the final figure with a tax professional or on IRIS.
        </AssumptionNote>

        <ToolFooter
          calculatorName="Salary Income Tax Calculator"
          disclaimer="We show the published 2026-27 arithmetic and its source. Tax law has exceptions for allowances, perquisites, multiple employers and foreign income that a calculator cannot capture."
        />
      </div>
    </ToolGrid>
  );
}

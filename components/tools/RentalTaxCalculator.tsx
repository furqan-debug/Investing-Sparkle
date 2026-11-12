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
  WarningNote,
} from './ToolUI';
import { rentalTax, type RentalOwner } from '@/lib/tax';
import { formatPKR, formatPct } from '@/lib/format';

/**
 * Rent tax for 2026-27.
 *
 * Two numbers matter and they are not the same: the amount the tenant withholds
 * under section 155, and the final liability on net rent after section 15A
 * deductions. The tool shows both and the difference between them.
 */

export function RentalTaxCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(100_000);
  const [owner, setOwner] = useState<RentalOwner>('individual');
  const [filer, setFiler] = useState(true);
  const [expenses, setExpenses] = useState(0);

  const result = useMemo(
    () => rentalTax({ monthlyRent, owner, filer, otherExpenses: expenses }),
    [monthlyRent, owner, filer, expenses]
  );

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The rent"
          intro="Use the rent agreed for one month, before the tenant deducts anything."
        >
          <NumberField
            id="monthly-rent"
            label="Monthly rent"
            value={monthlyRent}
            set={setMonthlyRent}
            step={5_000}
            hint={`Annual rent: PKR ${formatPKR(result.annualRent)}.`}
          />
          <Segmented
            label="Who owns the property"
            value={owner}
            set={setOwner}
            options={[
              { value: 'individual', label: 'Individual or AOP' },
              { value: 'company', label: 'Company' },
            ]}
            hint="A company pays a flat rate from the first rupee. Individuals and AOPs get the stepped table."
          />
          <Segmented
            label="Active Taxpayers List"
            value={filer ? 'filer' : 'nonFiler'}
            set={(value) => setFiler(value === 'filer')}
            options={[
              { value: 'filer', label: 'Filer' },
              { value: 'nonFiler', label: 'Non-filer' },
            ]}
            hint="A non-filer pays double the withholding on the same rent."
          />
        </ToolPanel>

        <ToolPanel
          title="Section 15A deductions"
          intro="These reduce the final tax you calculate when you file. They do not change what the tenant withholds."
        >
          <NumberField
            id="other-expenses"
            label="Other allowable expenses"
            value={expenses}
            set={setExpenses}
            step={5_000}
            hint="Property tax, insurance, ground rent, mortgage profit, legal fees and unrecovered rent. The 20% repairs allowance is added automatically."
          />
        </ToolPanel>

        <WarningNote>
          A private tenant is only required to deduct tax once the annual rent reaches Rs 1.5
          million. A company, government office or prescribed person deducts from the first rupee.
          If your tenant is a private individual below that threshold, treat the withholding figure
          as the tax you still need to provide for.
        </WarningNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Section 155 withholding"
          headline={`PKR ${formatPKR(result.withholding)}`}
          sub={`${formatPct(result.effectiveWithholdingRate)} of PKR ${formatPKR(result.annualRent)} annual rent. This is adjustable against your final tax, not an extra charge on top of it.`}
          rows={[
            { label: 'Rent kept each month', value: `PKR ${formatPKR(result.monthlyNetAfterWithholding)}`, accent: true },
            { label: 'Net rent after 15A', value: `PKR ${formatPKR(result.netRent)}` },
            { label: 'Estimated final tax', value: `PKR ${formatPKR(result.finalTaxEstimate)}` },
            {
              label: result.balance >= 0 ? 'Still to pay' : 'Refund due',
              value: `PKR ${formatPKR(Math.abs(result.balance))}`,
            },
          ]}
        />

        <Breakdown
          title="From gross rent to final tax"
          rows={[
            { label: 'Annual rent', value: `PKR ${formatPKR(result.annualRent)}`, strong: true },
            { label: 'Repairs allowance at 20%', value: `- PKR ${formatPKR(result.repairs)}` },
            { label: 'Other allowable expenses', value: `- PKR ${formatPKR(expenses)}` },
            { label: 'Net rent for section 15A', value: `PKR ${formatPKR(result.netRent)}`, strong: true },
            { label: 'Withholding under section 155', value: `PKR ${formatPKR(result.withholding)}` },
            { label: 'Estimated tax on net rent', value: `PKR ${formatPKR(result.finalTaxEstimate)}` },
            {
              label: result.balance >= 0 ? 'Balance payable' : 'Refund position',
              value: `PKR ${formatPKR(Math.abs(result.balance))}`,
              strong: true,
              accent: true,
            },
          ]}
        />

        <SourceNote
          sources={['whtCard', 'ordinance', 'financeAct2026']}
          extra="Section 155 rates for 2026-27 are unchanged from the previous year. The non-filer column doubles each band. Companies pay 15% as a filer and 30% as a non-filer, flat."
        />

        <AssumptionNote>
          The final tax estimate applies the non-salaried slab table to net rent on the assumption
          that rent is your only income. If you also earn a salary, your marginal rate on the same
          rent is usually lower. Add the rent to the salary calculator for a combined estimate.
        </AssumptionNote>

        <ToolFooter
          calculatorName="Rental Income Tax Calculator"
          disclaimer="Withholding is mechanical; the final liability depends on your whole return. Keep the tenant’s tax certificate, because it is your evidence for the credit."
        />
      </div>
    </ToolGrid>
  );
}

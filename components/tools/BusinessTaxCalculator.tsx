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
  ToggleRow,
  WarningNote,
} from './ToolUI';
import { businessTax, type BusinessEntity } from '@/lib/tax';
import { formatPKR, formatPct } from '@/lib/format';

/**
 * Non-salaried income tax for 2026-27.
 *
 * Three cases are covered because they produce three different answers:
 * a sole proprietor, an AOP, and a professional firm whose top rate is capped
 * at 40%. The export mode is kept separate because IT export receipts are often
 * taxed under a final withholding regime rather than the slab table.
 */

export function BusinessTaxCalculator() {
  const [profit, setProfit] = useState(3_000_000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [entity, setEntity] = useState<BusinessEntity>('individual');
  const [credits, setCredits] = useState(0);
  const [alreadyDeducted, setAlreadyDeducted] = useState(0);
  const [exportMode, setExportMode] = useState(false);
  const [exportReceipts, setExportReceipts] = useState(3_000_000);
  const [exportRate, setExportRate] = useState(1.25);

  const result = useMemo(
    () =>
      businessTax({
        profit,
        otherIncome,
        deductions,
        entity,
        otherCredits: credits,
        taxAlreadyDeducted: alreadyDeducted,
        exportMode,
        exportReceipts,
        exportRate: exportRate / 100,
      }),
    [profit, otherIncome, deductions, entity, credits, alreadyDeducted, exportMode, exportReceipts, exportRate]
  );

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="Who is being taxed"
          intro="The same profit is taxed differently depending on the structure and on whether the income is export receipts."
        >
          <Segmented
            label="Taxpayer"
            value={entity}
            set={setEntity}
            columns={3}
            options={[
              { value: 'individual', label: 'Sole trader' },
              { value: 'aop', label: 'AOP' },
              { value: 'professional', label: 'Professional firm' },
            ]}
            hint="An AOP is a partnership or association of persons. A professional firm that cannot incorporate has its top rate capped at 40%."
          />

          <ToggleRow
            label="Income is IT or IT-enabled export receipts"
            hint="Export receipts are often taxed under a final withholding regime, not the slab table. Turn this on to use a flat rate."
            checked={exportMode}
            set={setExportMode}
          />

          {exportMode ? (
            <>
              <NumberField
                id="export-receipts"
                label="Annual export receipts"
                value={exportReceipts}
                set={setExportReceipts}
                step={100_000}
                hint="The amount received in foreign exchange for exported services."
              />
              <NumberField
                id="export-rate"
                label="Final tax rate"
                value={exportRate}
                set={setExportRate}
                step={0.25}
                prefix="%"
                suffix="Editable"
                hint="Use the rate that applies to your registration, for example PSEB status. Confirm it with FBR or your tax adviser before relying on it."
              />
            </>
          ) : (
            <>
              <NumberField
                id="profit"
                label="Annual business profit"
                value={profit}
                set={setProfit}
                step={100_000}
                hint="Business income after allowed expenses. Profit, not turnover."
              />
              <NumberField
                id="other-income"
                label="Other taxable income"
                value={otherIncome}
                set={setOtherIncome}
                step={100_000}
                hint="Rent or other income taxed at normal rates. Do not include income already taxed at a fixed rate."
              />
              <NumberField
                id="deductions"
                label="Zakat and approved donations"
                value={deductions}
                set={setDeductions}
                step={25_000}
                hint="Deductible payments you can support. Donations are capped at 30% of taxable income."
              />
            </>
          )}
        </ToolPanel>

        {!exportMode && (
          <ToolPanel title="Adjustments" intro="Optional. Leave these at zero if they do not apply.">
            <NumberField
              id="credits"
              label="Other tax credits"
              value={credits}
              set={setCredits}
              step={10_000}
              hint="Credits you have already worked out, such as a pension contribution credit."
            />
            <NumberField
              id="paid"
              label="Tax already paid"
              value={alreadyDeducted}
              set={setAlreadyDeducted}
              step={25_000}
              hint="Advance tax or withholding already deducted during the year."
            />
          </ToolPanel>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow={exportMode ? 'Final tax on export receipts' : 'Estimated income tax'}
          headline={`PKR ${formatPKR(result.taxPayable)}`}
          sub={
            exportMode
              ? `${formatPct(exportRate / 100)} of PKR ${formatPKR(exportReceipts)} in export receipts.`
              : `On PKR ${formatPKR(result.taxableIncome)} taxable income. ${
                  result.surcharge > 0 ? 'A 10% surcharge applies above Rs 10 million.' : 'No surcharge at this income.'
                }`
          }
          rows={[
            { label: 'Effective rate', value: formatPct(result.effectiveRate), accent: true },
            ...(!exportMode
              ? [
                  { label: 'Tax on the slabs', value: `PKR ${formatPKR(result.taxBeforeSurcharge)}` },
                  { label: 'Surcharge', value: `PKR ${formatPKR(result.surcharge)}` },
                  { label: 'Credits', value: `PKR ${formatPKR(result.credits)}` },
                ]
              : [
                  { label: 'Taxable receipts', value: `PKR ${formatPKR(exportReceipts)}` },
                  { label: 'Rate used', value: formatPct(exportRate / 100) },
                ]),
          ]}
        />

        <Breakdown
          title={exportMode ? 'Final tax calculation' : 'How the slabs add up'}
          rows={
            exportMode
              ? [
                  { label: 'Export receipts', value: `PKR ${formatPKR(exportReceipts)}` },
                  { label: `Final tax at ${formatPct(exportRate / 100)}`, value: `PKR ${formatPKR(result.taxPayable)}`, strong: true },
                  { label: 'Already paid', value: `PKR ${formatPKR(alreadyDeducted)}` },
                  {
                    label: 'Balance',
                    value:
                      result.balance >= 0
                        ? `PKR ${formatPKR(result.balance)} due`
                        : `PKR ${formatPKR(Math.abs(result.balance))} refund`,
                    accent: true,
                    strong: true,
                  },
                ]
              : [
                  ...result.breakdown.map((line) => ({
                    label: `${line.label} at ${formatPct(line.rate, 0)}`,
                    value: `PKR ${formatPKR(line.tax)}`,
                  })),
                  { label: 'Tax before surcharge', value: `PKR ${formatPKR(result.taxBeforeSurcharge)}`, strong: true },
                  ...(result.surcharge > 0
                    ? [{ label: 'Section 4AB surcharge', value: `PKR ${formatPKR(result.surcharge)}` }]
                    : []),
                  { label: 'Tax before credits', value: `PKR ${formatPKR(result.taxBeforeCredits)}`, strong: true },
                  ...(result.credits > 0
                    ? [{ label: 'Credits', value: `- PKR ${formatPKR(result.credits)}` }]
                    : []),
                  { label: 'Tax payable', value: `PKR ${formatPKR(result.taxPayable)}`, strong: true, accent: true },
                  { label: 'Already paid', value: `PKR ${formatPKR(alreadyDeducted)}` },
                  {
                    label: 'Balance',
                    value:
                      result.balance >= 0
                        ? `PKR ${formatPKR(result.balance)} due`
                        : `PKR ${formatPKR(Math.abs(result.balance))} refund`,
                  },
                ]
          }
        />

        <SourceNote
          sources={['financeAct2026', 'ordinance', 'circular2']}
          extra="Non-salaried slabs run from 15% to 45%. The 10% surcharge applies above Rs 10 million. A professional firm that cannot incorporate is capped at 40%."
        />

        {exportMode ? (
          <WarningNote>
            The final tax rate for export receipts depends on registration and on the section that
            applies. The default is editable for that reason. This mode does not apply the slab
            table or the surcharge.
          </WarningNote>
        ) : (
          <AssumptionNote>
            This estimates tax on business profit. It does not calculate turnover tax, minimum tax,
            super tax, sales tax, or province-specific charges. If you also draw a salary, the
            allocation between salary and business income can change the answer, so confirm the
            split with a tax professional.
          </AssumptionNote>
        )}

        <ToolFooter
          calculatorName="Business & Freelancer Income Tax Calculator"
          disclaimer="A planning estimate using the published 2026-27 tables. Business tax has minimum-tax and turnover rules that depend on your full accounts."
        />
      </div>
    </ToolGrid>
  );
}

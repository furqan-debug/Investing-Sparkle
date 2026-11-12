'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  NumberField,
  Segmented,
  SelectField,
  SourceNote,
  ToolGrid,
  ToolPanel,
} from './ToolUI';
import { dividendRates, type DividendPayer } from '@/content/tax-rates';
import { dividendTax } from '@/lib/tax';
import { formatPKR, formatPct } from '@/lib/format';

/**
 * Dividend withholding tax.
 *
 * The payer type changes the rate, sometimes by a lot. IPPs pay less, debt
 * funds pay more, and a non-filer pays double in almost every column.
 */

export function DividendTaxCalculator() {
  const [grossDividend, setGrossDividend] = useState(50_000);
  const [payer, setPayer] = useState<DividendPayer>('listed');
  const [filer, setFiler] = useState(true);
  const [investmentCost, setInvestmentCost] = useState(1_000_000);

  const result = useMemo(
    () => dividendTax({ grossDividend, payer, filer, investmentCost }),
    [grossDividend, payer, filer, investmentCost]
  );

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The dividend"
          intro="Enter the gross amount declared by the company or fund, before any tax is taken off."
        >
          <NumberField
            id="gross-dividend"
            label="Gross dividend"
            value={grossDividend}
            set={setGrossDividend}
            step={1_000}
            hint="Cash dividend or the cash value of a bonus dividend."
          />
          <SelectField
            id="payer"
            label="Who paid the dividend"
            value={payer}
            set={(value) => setPayer(value as DividendPayer)}
            options={Object.entries(dividendRates).map(([value, row]) => ({
              value,
              label: row.label,
            }))}
            hint={result.note}
          />
          <Segmented
            label="Active Taxpayers List"
            value={filer ? 'filer' : 'nonFiler'}
            set={(value) => setFiler(value === 'filer')}
            options={[
              { value: 'filer', label: 'Filer' },
              { value: 'nonFiler', label: 'Non-filer' },
            ]}
            hint="Dividend tax is usually final, so the filer status you hold on the payment date is what counts."
          />
          <NumberField
            id="cost"
            label="What the holding cost you"
            value={investmentCost}
            set={setInvestmentCost}
            step={25_000}
            hint="Optional. Used only to show the net yield on your original cost."
          />
        </ToolPanel>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Withholding tax"
          headline={`PKR ${formatPKR(result.tax)}`}
          sub={`${formatPct(result.rate)} of a PKR ${formatPKR(grossDividend)} dividend. You keep PKR ${formatPKR(result.net)}.`}
          rows={[
            { label: 'Net dividend', value: `PKR ${formatPKR(result.net)}`, accent: true },
            { label: 'Net yield on cost', value: formatPct(result.yieldOnCost) },
            { label: 'Payer type', value: result.label },
            { label: 'Tax treatment', value: 'Usually final' },
          ]}
        />

        <Breakdown
          title="The calculation"
          rows={[
            { label: 'Gross dividend', value: `PKR ${formatPKR(grossDividend)}` },
            { label: `Tax at ${formatPct(result.rate)}`, value: `- PKR ${formatPKR(result.tax)}` },
            { label: 'Net received', value: `PKR ${formatPKR(result.net)}`, strong: true, accent: true },
            ...(investmentCost > 0
              ? [
                  { label: 'Original cost', value: `PKR ${formatPKR(investmentCost)}` },
                  { label: 'Net yield on cost', value: formatPct(result.yieldOnCost) },
                ]
              : []),
          ]}
        />

        <div className="rounded-2xl border border-line bg-white/[0.018] p-5">
          <p className="mono-label text-[10px]">Filer vs non-filer</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[26rem] text-left text-xs">
              <thead>
                <tr className="border-b border-line text-[10px] uppercase tracking-[0.12em] text-low">
                  <th className="pb-2 font-medium">Payer</th>
                  <th className="pb-2 text-right font-medium">Filer</th>
                  <th className="pb-2 text-right font-medium">Non-filer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {Object.entries(dividendRates).map(([key, row]) => (
                  <tr key={key} className={key === payer ? 'text-ink' : 'text-muted'}>
                    <td className="py-2 pr-3">{row.label}</td>
                    <td className="num py-2 text-right">{formatPct(row.filer, 1)}</td>
                    <td className="num py-2 text-right">{formatPct(row.nonFiler, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <SourceNote
          sources={['whtCard', 'financeAct2026', 'ordinance']}
          extra="Section 150 rates for tax year 2027. A dividend from an IPP is 7.5% for a filer. A debt fund is 25%. A non-filer pays roughly double in every column."
        />

        <AssumptionNote>
          Dividend withholding is generally a final tax, so there is usually no further tax on the
          amount. It still has to be reported in your return. Where a company pays a dividend out
          of exempt income or losses, a different rate can apply.
        </AssumptionNote>

        <ToolFooter
          calculatorName="Dividend Tax Calculator"
          disclaimer="Withholding rates depend on the payer and on your ATL status on the payment date. The company’s tax certificate is the definitive record."
        />
      </div>
    </ToolGrid>
  );
}

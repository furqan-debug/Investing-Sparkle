'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  DateField,
  NumberField,
  Segmented,
  SourceNote,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { securitiesCgt } from '@/lib/tax';
import { formatPKR, formatPct } from '@/lib/format';

/**
 * Capital gains tax on listed securities.
 *
 * The purchase date chooses the regime. That is the single most important
 * input, so it sits first and the result names the band it used.
 */

const TODAY = new Date().toISOString().slice(0, 10);

export function SecuritiesCgtCalculator() {
  const [cost, setCost] = useState(1_000_000);
  const [proceeds, setProceeds] = useState(1_500_000);
  const [purchaseDate, setPurchaseDate] = useState('2023-01-16');
  const [saleDate, setSaleDate] = useState(TODAY);
  const [filer, setFiler] = useState(true);

  const result = useMemo(
    () => securitiesCgt({ cost, proceeds, purchaseDate, saleDate, filer }),
    [cost, proceeds, purchaseDate, saleDate, filer]
  );

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The sale"
          intro="Enter the total cost of the shares and the total amount the sale brought in. The tax is on the gain, never on the full sale value."
        >
          <NumberField
            id="cost"
            label="What you paid"
            value={cost}
            set={setCost}
            step={10_000}
            hint="Total purchase cost, including brokerage if you are using your own records."
          />
          <NumberField
            id="proceeds"
            label="What you sold for"
            value={proceeds}
            set={setProceeds}
            step={10_000}
            hint="Gross sale value before the broker’s charges."
          />
          <DateField
            id="purchase-date"
            label="Date you bought"
            value={purchaseDate}
            set={setPurchaseDate}
            hint="This sets the rate. The sale date only decides which tax year the gain falls in."
          />
          <DateField id="sale-date" label="Date you sold" value={saleDate} set={setSaleDate} />
          <Segmented
            label="Active Taxpayers List"
            value={filer ? 'filer' : 'nonFiler'}
            set={(value) => setFiler(value === 'filer')}
            options={[
              { value: 'filer', label: 'Filer' },
              { value: 'nonFiler', label: 'Non-filer' },
            ]}
            hint="For shares bought on or after 1 July 2025 the rate is 15% for both. For earlier purchases the non-filer column is usually double."
          />
        </ToolPanel>

        <WarningNote>
          NCCPL computes the official gain from its own trade records and issues a certificate.
          Its cost basis can differ from yours, particularly where you bought in several lots or
          received bonus shares.
        </WarningNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Capital gains tax"
          headline={`PKR ${formatPKR(result.tax)}`}
          sub={`${formatPct(result.rate)} on a gain of PKR ${formatPKR(result.gain)}. ${result.label}.`}
          rows={[
            { label: 'Net after tax', value: `PKR ${formatPKR(result.netProceeds)}`, accent: true },
            { label: 'Return on cost', value: formatPct(result.returnPct) },
            {
              label: 'Holding period',
              value:
                result.holdingYears > 0
                  ? `${result.holdingYears.toFixed(1)} years`
                  : 'Same day',
            },
            {
              label: 'Annualised return',
              value: result.holdingYears > 0.05 ? formatPct(result.annualised) : 'n/a',
            },
          ]}
        />

        <Breakdown
          title="The calculation"
          rows={[
            { label: 'Sale proceeds', value: `PKR ${formatPKR(proceeds)}` },
            { label: 'Cost', value: `- PKR ${formatPKR(cost)}` },
            { label: 'Gain', value: `PKR ${formatPKR(result.gain)}`, strong: true },
            { label: `Rate applied`, value: formatPct(result.rate) },
            { label: 'Tax', value: `PKR ${formatPKR(result.tax)}`, strong: true, accent: true },
            { label: 'Net proceeds', value: `PKR ${formatPKR(result.netProceeds)}` },
          ]}
        />

        <div className="rounded-2xl border border-line bg-white/[0.018] p-5">
          <p className="mono-label text-[10px]">The rate table in one line</p>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted">
            <li>
              <span className="text-ink">Bought before 1 July 2013:</span> 0%.
            </li>
            <li>
              <span className="text-ink">1 July 2013 to 30 June 2022:</span> 12.5% filer, 25%
              non-filer, whatever the holding period.
            </li>
            <li>
              <span className="text-ink">1 July 2022 to 30 June 2024:</span> 15% falling to 0% over
              six years; the non-filer column is double.
            </li>
            <li>
              <span className="text-ink">1 July 2024 to 30 June 2025:</span> 15% filer, 30%
              non-filer, no holding-period relief.
            </li>
            <li>
              <span className="text-ink">On or after 1 July 2025:</span> 15% for both filers and
              non-filers.
            </li>
          </ul>
        </div>

        <SourceNote
          sources={['financeAct2026', 'ordinance', 'whtCard']}
          extra="The Finance Act 2026 removed the non-filer exemption in the Tenth Schedule for shares bought on or after 1 July 2025, which is why the two columns converge at 15%."
        />

        <AssumptionNote>
          This is a planning estimate. It ignores the small standard allowance NCCPL applies for
          costs, and it treats the whole gain as taxable. Mutual fund units can carry a different
          rate depending on the fund’s equity and debt mix, so check the fund’s tax note before
          relying on the figure.
        </AssumptionNote>

        <ToolFooter
          calculatorName="Capital Gains Tax Calculator for PSX Shares"
          disclaimer="NCCPL’s certificate is the figure that matters at filing. Use this to plan the sale, then reconcile with the certificate."
        />
      </div>
    </ToolGrid>
  );
}

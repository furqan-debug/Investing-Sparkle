'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  DateField,
  NumberField,
  Segmented,
  SelectField,
  SourceNote,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { propertyTransferTax } from '@/lib/tax';
import type { PropertyKind } from '@/content/tax-rates';
import { formatPKR, formatPct } from '@/lib/format';

/**
 * One property deal, three taxes.
 *
 * 236K is the buyer's advance tax. 236C is the seller's. CGT under section 37 is
 * on the gain. 236C is adjustable, so the tool credits it against the CGT
 * instead of adding the two together.
 */

const TODAY = new Date().toISOString().slice(0, 10);

export function PropertyTransferTaxCalculator() {
  const [declaredPrice, setDeclaredPrice] = useState(30_000_000);
  const [fbrValue, setFbrValue] = useState(34_000_000);
  const [buyerFiler, setBuyerFiler] = useState(true);
  const [sellerFiler, setSellerFiler] = useState(true);
  const [purchasePrice, setPurchasePrice] = useState(20_000_000);
  const [purchaseDate, setPurchaseDate] = useState('2022-05-01');
  const [saleDate, setSaleDate] = useState(TODAY);
  const [kind, setKind] = useState<PropertyKind>('plot');

  const result = useMemo(
    () =>
      propertyTransferTax({
        declaredPrice,
        fbrValue,
        buyerFiler,
        sellerFiler,
        purchasePrice,
        purchaseDate,
        saleDate,
        propertyKind: kind,
      }),
    [declaredPrice, fbrValue, buyerFiler, sellerFiler, purchasePrice, purchaseDate, saleDate, kind]
  );

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The deal"
          intro="Tax is charged on the higher of the price written in the deed and the FBR or DC notified value."
        >
          <NumberField
            id="declared-price"
            label="Declared sale price"
            value={declaredPrice}
            set={setDeclaredPrice}
            step={500_000}
          />
          <NumberField
            id="fbr-value"
            label="FBR or DC value"
            value={fbrValue}
            set={setFbrValue}
            step={500_000}
            hint="The official notified value for the property. Leave it equal to the price if you do not know it."
          />
          <div className="rounded-xl border border-line bg-[var(--bg-inset)] px-3.5 py-3">
            <p className="mono-label text-[9px]">Value used for tax</p>
            <p className="num mt-1.5 text-sm text-sparkle-300">PKR {formatPKR(result.base)}</p>
          </div>
        </ToolPanel>

        <ToolPanel title="Buyer and seller" intro="Both sides can be on different footing.">
          <Segmented
            label="Buyer status"
            value={buyerFiler ? 'filer' : 'nonFiler'}
            set={(value) => setBuyerFiler(value === 'filer')}
            options={[
              { value: 'filer', label: 'Filer' },
              { value: 'nonFiler', label: 'Non-filer' },
            ]}
            hint={`Buyer rate used: ${formatPct(result.buyerRate)}.`}
          />
          <Segmented
            label="Seller status"
            value={sellerFiler ? 'filer' : 'nonFiler'}
            set={(value) => setSellerFiler(value === 'filer')}
            options={[
              { value: 'filer', label: 'Filer' },
              { value: 'nonFiler', label: 'Non-filer' },
            ]}
            hint={`Seller rate used: ${formatPct(result.sellerRate)}.`}
          />
        </ToolPanel>

        <ToolPanel
          title="The seller’s gain"
          intro="Capital gains tax is on the profit, not on the sale value. The purchase date decides the rate."
        >
          <NumberField
            id="purchase-price"
            label="What the seller paid"
            value={purchasePrice}
            set={setPurchasePrice}
            step={500_000}
          />
          <DateField
            id="purchase-date"
            label="Date the property was acquired"
            value={purchaseDate}
            set={setPurchaseDate}
            hint="Property acquired on or after 1 July 2024 is on a flat 15% regime for filers."
          />
          <DateField id="sale-date" label="Date of sale" value={saleDate} set={setSaleDate} />
          <SelectField
            id="property-kind"
            label="Property type"
            value={kind}
            set={(value) => setKind(value as PropertyKind)}
            options={[
              { value: 'plot', label: 'Open plot' },
              { value: 'constructed', label: 'Constructed property' },
              { value: 'flat', label: 'Flat' },
            ]}
            hint="This only changes the rate for property acquired before 1 July 2024."
          />
        </ToolPanel>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Advance tax at transfer"
          headline={`PKR ${formatPKR(result.cashAtTransfer)}`}
          sub={`The seller’s section 236C deduction on a PKR ${formatPKR(result.base)} transaction. The buyer separately pays PKR ${formatPKR(result.buyerTax)} under section 236K.`}
          rows={[
            { label: 'Buyer 236K', value: `PKR ${formatPKR(result.buyerTax)}` },
            { label: 'Seller 236C', value: `PKR ${formatPKR(result.sellerTax)}`, accent: true },
            { label: 'CGT on the gain', value: `PKR ${formatPKR(result.cgtTax)}` },
            { label: '236C credited against CGT', value: `PKR ${formatPKR(result.credit)}` },
          ]}
        />

        <Breakdown
          title="Buyer and seller, side by side"
          rows={[
            { label: 'Tax base', value: `PKR ${formatPKR(result.base)}` },
            { label: `Buyer 236K at ${formatPct(result.buyerRate)}`, value: `PKR ${formatPKR(result.buyerTax)}` },
            { label: `Seller 236C at ${formatPct(result.sellerRate)}`, value: `PKR ${formatPKR(result.sellerTax)}` },
            { label: 'Gain', value: `PKR ${formatPKR(result.gain)}` },
            { label: `CGT at ${formatPct(result.cgtRate)}`, value: `PKR ${formatPKR(result.cgtTax)}` },
            { label: 'Less 236C credit', value: `- PKR ${formatPKR(result.credit)}` },
            { label: 'CGT still to pay', value: `PKR ${formatPKR(result.cgtBalance)}` },
            {
              label: 'Total seller cost',
              value: `PKR ${formatPKR(result.totalSellerCost)}`,
              strong: true,
              accent: true,
            },
          ]}
        />

        <div className="rounded-2xl border border-line bg-white/[0.018] p-5">
          <p className="mono-label text-[10px]">Why the two columns differ</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            236K and 236C are advance taxes on the transfer value. They are usually adjustable
            against your total tax for the year. CGT is the tax on the actual gain. Because 236C is
            credited against the CGT on the same sale, the extra cost after the transfer is the
            balance of CGT, not both amounts added together.
          </p>
          <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
            {result.cgtLabel}. The holding period is {result.holdingYears.toFixed(1)} years.
          </p>
        </div>

        <SourceNote
          sources={['financeAct2026', 'ordinance', 'salientFeatures']}
          extra="The enacted Finance Act 2026 sets 236K at 1.25% and 236C at 2.75% for filers. Budget papers quoted 1.5% for 236K before enactment. Non-filers pay 10.5%, 14.5% or 18.5% as buyers and 11.5% as sellers."
        />

        <WarningNote>
          Section 7E, the deemed-income tax on immovable property, was omitted by the Finance Act
          2026. Provincial stamp duty, registration charges and CVT are separate and not included
          here. Overseas Pakistanis with a NICOP or POC can pay the filer rate on both sections.
        </WarningNote>

        <AssumptionNote>
          A non-filer selling property acquired on or after 1 July 2024 is taxed at slab rates with a
          15% floor. The tool shows that floor, so the real figure can be higher. The CGT estimate
          also ignores the standard 25% reduction for government-allotted property and any
          exemption you may qualify for.
        </AssumptionNote>

        <ToolFooter
          calculatorName="Property Transfer Tax Calculator"
          disclaimer="Property tax depends on the deed value, the FBR value, the date of acquisition and both parties’ ATL status. Confirm the PSID figures on IRIS before transfer."
        />
      </div>
    </ToolGrid>
  );
}

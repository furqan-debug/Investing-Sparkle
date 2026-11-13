'use client';

import { useMemo, useState } from 'react';
import { ArrowDownUp } from 'lucide-react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  MiniStat,
  NumberField,
  SourceNote,
  ToolGrid,
  ToolPanel,
} from './ToolUI';
import { brokerageResult, psxChargeDefaults } from '@/lib/psx';
import { formatPKR, formatPKR2, formatPct } from '@/lib/format';

/**
 * The full cost of a round trip on the ready market.
 *
 * Defaults follow the PSX minimum brokerage scale and the exchange schedule of
 * charges, but every rate is editable: the commission is a contract between the
 * visitor and their broker, and sales tax depends on the province the broker is
 * registered in.
 */

export function PsxBrokerageCalculator() {
  const [buyPrice, setBuyPrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(110);
  const [shares, setShares] = useState(1_000);

  const [commissionPct, setCommissionPct] = useState(0.15);
  const [floorPaisa, setFloorPaisa] = useState(3);
  const [salesTaxPct, setSalesTaxPct] = useState(15);
  const [tradingFee, setTradingFee] = useState<number>(psxChargeDefaults.tradingFeePerLakh);
  const [regulatoryFee, setRegulatoryFee] = useState<number>(psxChargeDefaults.regulatoryFeePerLakh);
  const [secpLevy, setSecpLevy] = useState<number>(psxChargeDefaults.secpLevyPerLakh);

  const result = useMemo(
    () =>
      brokerageResult({
        buyPrice,
        sellPrice,
        shares,
        commissionPct: commissionPct / 100,
        commissionFloorPerShare: floorPaisa / 100,
        salesTaxPct: salesTaxPct / 100,
        tradingFeePerLakh: tradingFee,
        regulatoryFeePerLakh: regulatoryFee,
        secpLevyPerLakh: secpLevy,
      }),
    [buyPrice, sellPrice, shares, commissionPct, floorPaisa, salesTaxPct, tradingFee, regulatoryFee, secpLevy]
  );

  const profitable = result.netProfit >= 0;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The trade"
          intro="A buy and a sell of the same quantity. Prices are the ones you actually dealt at, not the screen price."
        >
          <NumberField
            id="buy-price"
            label="Buy price"
            value={buyPrice}
            set={setBuyPrice}
            step={0.5}
            prefix="PKR"
            hint="Per share, including the paisa."
          />
          <NumberField
            id="sell-price"
            label="Sell price"
            value={sellPrice}
            set={setSellPrice}
            step={0.5}
            prefix="PKR"
            hint="Leave this at your buy price to see the cost of going nowhere."
          />
          <NumberField
            id="shares"
            label="Number of shares"
            value={shares}
            set={setShares}
            step={100}
            prefix="Qty"
            hint="The tool charges the per-share commission floor when it is higher than the percentage."
          />
        </ToolPanel>

        <ToolPanel
          title="Your broker's rates"
          intro="The commission is negotiable and the sales tax depends on where your broker is registered. Check your contract note and put the real figures here."
        >
          <NumberField
            id="commission"
            label="Broker commission"
            value={commissionPct}
            set={setCommissionPct}
            step={0.05}
            prefix="%"
            suffix="Per side"
            hint="A common schedule is 0.15% or 3 paisa a share, whichever is higher. Your broker's tariff is the binding figure."
          />
          <NumberField
            id="floor"
            label="Commission floor per share"
            value={floorPaisa}
            set={setFloorPaisa}
            step={1}
            prefix="paisa"
            hint="Set to zero if your broker does not apply a per-share minimum."
          />
          <NumberField
            id="sales-tax"
            label="Sales tax on commission"
            value={salesTaxPct}
            set={setSalesTaxPct}
            step={1}
            prefix="%"
            hint="15% in Sindh, 16% in Punjab and Islamabad. It also applies to the exchange levies."
          />
        </ToolPanel>

        <ToolPanel
          title="Exchange and regulator levies"
          intro="These are set by PSX and SECP, not by your broker. They are small, but they are charged on both sides."
        >
          <NumberField
            id="trading-fee"
            label="PSX trading fee"
            value={tradingFee}
            set={setTradingFee}
            step={0.1}
            prefix="PKR"
            suffix="Per Rs 100,000"
            hint="Rs 3.50 per Rs 100,000 of traded value in the ready market."
          />
          <NumberField
            id="regulatory-fee"
            label="PSX regulatory fee"
            value={regulatoryFee}
            set={setRegulatoryFee}
            step={0.01}
            prefix="PKR"
            suffix="Per Rs 100,000"
            hint="Rs 0.62084 per Rs 100,000, covering the depository and clearing house levy."
          />
          <NumberField
            id="secp-levy"
            label="SECP levy"
            value={secpLevy}
            set={setSecpLevy}
            step={0.05}
            prefix="PKR"
            suffix="Per Rs 100,000"
            hint="Rs 0.65 per Rs 100,000 of traded value."
          />
        </ToolPanel>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow={profitable ? 'Net profit after charges' : 'Net loss after charges'}
          headline={`PKR ${formatPKR(Math.abs(result.netProfit))}`}
          sub={`Gross profit is PKR ${formatPKR(result.grossProfit)}. Charges take PKR ${formatPKR(
            result.totalCharges
          )}, which is ${formatPct(result.costPct)} of what you paid for the shares.`}
          rows={[
            { label: 'Return on cost', value: formatPct(result.netReturn), accent: true },
            { label: 'Total charges', value: `PKR ${formatPKR(result.totalCharges)}` },
            { label: 'Buy cost', value: `PKR ${formatPKR(result.buyCost)}` },
            { label: 'Sell proceeds', value: `PKR ${formatPKR(result.sellProceeds)}` },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Break-even sale price" value={`PKR ${formatPKR2(result.breakEvenPrice)}`} />
          <MiniStat label="Rise needed from buy" value={formatPct(result.riseToBreakEven)} />
        </div>

        <Breakdown
          title="Where the money goes"
          rows={[
            { label: 'Buy value', value: `PKR ${formatPKR(result.buy.value)}` },
            { label: 'Commission, buy', value: `PKR ${formatPKR(result.buy.commission)}` },
            {
              label: 'Sales tax on buy commission',
              value: `PKR ${formatPKR(result.buy.salesTaxOnCommission)}`,
            },
            { label: 'Levies, buy', value: `PKR ${formatPKR(result.buy.levies + result.buy.salesTaxOnLevies)}` },
            { label: 'Total buy cost', value: `PKR ${formatPKR(result.buyCost)}`, strong: true },
            { label: 'Sell value', value: `PKR ${formatPKR(result.sell.value)}` },
            { label: 'Commission, sell', value: `PKR ${formatPKR(result.sell.commission)}` },
            {
              label: 'Sales tax on sell commission',
              value: `PKR ${formatPKR(result.sell.salesTaxOnCommission)}`,
            },
            { label: 'Levies, sell', value: `PKR ${formatPKR(result.sell.levies + result.sell.salesTaxOnLevies)}` },
            { label: 'Net sell proceeds', value: `PKR ${formatPKR(result.sellProceeds)}`, strong: true },
            {
              label: 'Net profit',
              value: `PKR ${formatPKR(result.netProfit)}`,
              strong: true,
              accent: true,
            },
          ]}
          footer={
            <p className="mt-3 flex items-start gap-2 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              <ArrowDownUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" aria-hidden />
              <span>
                The break-even price is the sale price at which net proceeds exactly cover the buy
                cost, including the per-share commission floor.
              </span>
            </p>
          }
        />

        <SourceNote
          sources={['psxSchedule', 'psxRegulations', 'psxTradingInfo']}
          title="Rates and sources"
          intro="Checked 13 November 2026. Commission and sales tax are editable because they depend on your broker and province. Exchange levies come from the PSX schedule of charges."
          extra="Capital gains tax is not included here. On a sale at a profit, NCCPL collects section 37A CGT at 15% for filers on shares bought on or after 1 July 2025, and it is deducted before the cash reaches your account."
        />

        <AssumptionNote>
          This is an estimate of transaction cost, not a contract note. Some brokers quote an
          all-in commission that already includes the exchange levies, and some itemise CDC and
          NCCPL separately. If yours is all-in, set the levy fields to zero so the cost is not
          counted twice. Account maintenance fees and annual NCCPL charges are not part of a
          trade.
        </AssumptionNote>

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Charged per side" value={`PKR ${formatPKR(result.buy.total)}`} />
          <MiniStat label="Effective cost per side" value={formatPct(result.buy.value > 0 ? result.buy.total / result.buy.value : 0)} />
        </div>

        <ToolFooter
          calculatorName="PSX Brokerage & Trading Profit Calculator"
          disclaimer="We show the published levies and the arithmetic. Your broker's written tariff is the binding document, and capital gains tax is calculated separately on the profit."
        />
      </div>
    </ToolGrid>
  );
}

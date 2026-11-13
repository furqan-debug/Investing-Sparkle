'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  MiniStat,
  NumberField,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { dcf } from '@/lib/valuation';
import { formatNumber, formatPKR, formatPKR2, formatPct } from '@/lib/format';

/**
 * A discounted cash-flow model with the assumptions on the same screen as the
 * answer. The terminal value is separated from the forecast because it is
 * usually the largest and least reliable part of the result.
 */
export function DcfCalculator() {
  const [fcff, setFcff] = useState(10_000_000);
  const [growth, setGrowth] = useState(10);
  const [years, setYears] = useState(5);
  const [discountRate, setDiscountRate] = useState(14);
  const [terminalGrowth, setTerminalGrowth] = useState(5);
  const [netDebt, setNetDebt] = useState(2_000_000);
  const [shares, setShares] = useState(1_000_000);
  const [price, setPrice] = useState(120);

  const result = useMemo(
    () =>
      dcf({
        fcff,
        growth: growth / 100,
        years,
        discountRate: discountRate / 100,
        terminalGrowth: terminalGrowth / 100,
        netDebt,
        shares,
        price,
      }),
    [fcff, growth, years, discountRate, terminalGrowth, netDebt, shares, price]
  );

  const canShow = result.valid && result.valuePerShare > 0;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The cash flow"
          intro="Free cash flow to the firm is the cash the business produces before it pays lenders and shareholders. Enter the latest figure and the growth you expect."
        >
          <NumberField
            id="dcf-fcff"
            label="Free cash flow to the firm"
            value={fcff}
            set={setFcff}
            step={100_000}
            prefix="PKR"
            hint="Operating cash flow less capital expenditure, before interest. Use the latest full year."
          />
          <NumberField
            id="dcf-growth"
            label="Cash-flow growth a year"
            value={growth}
            set={setGrowth}
            step={0.5}
            prefix="%"
            hint="The growth applied during the explicit forecast. A high rate cannot last forever."
          />
          <NumberField
            id="dcf-years"
            label="Forecast years"
            value={years}
            set={setYears}
            min={1}
            step={1}
            prefix="Years"
            hint="The period you are willing to forecast company by company. Five years is common."
          />
          <NumberField
            id="dcf-discount"
            label="Discount rate"
            value={discountRate}
            set={setDiscountRate}
            step={0.5}
            prefix="%"
            hint="The return you require for the risk, or the company's weighted average cost of capital."
          />
          <NumberField
            id="dcf-terminal"
            label="Terminal growth"
            value={terminalGrowth}
            set={setTerminalGrowth}
            step={0.5}
            prefix="%"
            hint="The rate the cash flow grows at forever. It should not exceed long-run nominal growth in the economy."
          />
        </ToolPanel>

        <ToolPanel
          title="The balance sheet and the share"
          intro="Enterprise value belongs to both lenders and shareholders. Subtract net debt to get the equity value, then divide by the shares."
        >
          <NumberField
            id="dcf-net-debt"
            label="Net debt"
            value={netDebt}
            set={setNetDebt}
            min={-1_000_000_000_000}
            step={100_000}
            prefix="PKR"
            hint="Total debt minus cash. Enter a negative number if the company holds more cash than debt."
          />
          <NumberField
            id="dcf-shares"
            label="Shares outstanding"
            value={shares}
            set={setShares}
            step={100_000}
            prefix="Qty"
            hint="Use the diluted share count if options or convertible securities are material."
          />
          <NumberField
            id="dcf-price"
            label="Current share price"
            value={price}
            set={setPrice}
            step={0.5}
            prefix="PKR"
            hint="Used only to show the upside or downside and the margin of safety."
          />
        </ToolPanel>

        {!result.valid && (
          <WarningNote>
            The model needs positive free cash flow, a positive share count, and a discount rate above
            terminal growth. Check the inputs before reading the value.
          </WarningNote>
        )}

        {result.valid && result.equityValue <= 0 && (
          <WarningNote>
            Net debt is larger than the discounted enterprise value, so the equity is worth less than
            zero on these assumptions. The model is not a good fit for a highly leveraged company.
          </WarningNote>
        )}

        <AssumptionNote>
          A DCF is a set of assumptions, not a fact about the company. Small changes in the discount
          rate or terminal growth move the value a long way, and the terminal value often carries most
          of the answer. The model does not account for optionality, cycles or a change in the capital
          structure.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Intrinsic value per share"
          headline={canShow ? `PKR ${formatPKR2(result.valuePerShare)}` : 'Not available'}
          sub={
            canShow
              ? `At a ${discountRate}% discount rate and ${terminalGrowth}% terminal growth, on ${formatNumber(shares)} shares.`
              : 'The inputs do not produce a positive value per share.'
          }
          rows={[
            {
              label: 'Upside or downside',
              value: canShow ? formatPct(result.upside) : 'n/a',
              accent: canShow,
            },
            { label: 'Margin of safety', value: canShow ? formatPct(result.marginOfSafety) : 'n/a' },
            {
              label: 'Terminal value share',
              value: result.enterpriseValue > 0 ? formatPct(result.terminalShare) : 'n/a',
            },
            { label: 'Current market price', value: `PKR ${formatPKR2(price)}` },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="PV of forecast" value={`PKR ${formatPKR(result.pvExplicit)}`} />
          <MiniStat label="PV of terminal value" value={`PKR ${formatPKR(result.pvTerminal)}`} />
        </div>

        <Breakdown
          title="Value bridge"
          rows={[
            { label: 'PV of forecast cash flow', value: `PKR ${formatPKR(result.pvExplicit)}` },
            { label: 'PV of terminal value', value: `PKR ${formatPKR(result.pvTerminal)}` },
            { label: 'Enterprise value', value: `PKR ${formatPKR(result.enterpriseValue)}` },
            {
              label: netDebt >= 0 ? 'Less net debt' : 'Plus net cash',
              value: `PKR ${formatPKR(Math.abs(netDebt))}`,
            },
            { label: 'Equity value', value: `PKR ${formatPKR(result.equityValue)}` },
            { label: 'Shares outstanding', value: formatNumber(shares) },
            {
              label: 'Value per share',
              value: canShow ? `PKR ${formatPKR2(result.valuePerShare)}` : 'Not available',
              strong: true,
              accent: true,
            },
          ]}
        />

        {result.valid && (
          <Breakdown
            title="Forecast cash flow"
            rows={result.schedule.map((point) => ({
              label: `Year ${point.year}`,
              value: `PKR ${formatPKR(point.fcff)} · PV ${formatPKR(point.presentValue)}`,
            }))}
            footer={
              <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                Cash flow grows at {growth}% a year during the forecast. The terminal value uses the
                year {result.horizon} cash flow, grown once more at {terminalGrowth}%.
              </p>
            }
          />
        )}

        <ToolFooter
          calculatorName="Intrinsic Value (DCF) Calculator"
          disclaimer="This is a model, not a price target. The cash flow, growth, discount rate and terminal growth are your inputs, and the result is highly sensitive to each of them. It ignores optionality, cyclicality, transaction costs and taxes at the shareholder level."
        />
      </div>
    </ToolGrid>
  );
}

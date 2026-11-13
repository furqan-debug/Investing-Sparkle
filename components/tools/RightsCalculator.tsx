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
import { rightsIssue } from '@/lib/dividends';
import { formatNumber, formatPKR, formatPKR2, formatPct } from '@/lib/format';

/**
 * A rights issue, priced on the theoretical ex-rights basis. The rights have
 * value because the new shares are offered below the market price. Whether to
 * exercise is a separate question about the use of the proceeds.
 */
export function RightsCalculator() {
  const [existingShares, setExistingShares] = useState(1_000);
  const [price, setPrice] = useState(100);
  const [newShares, setNewShares] = useState(1);
  const [forExisting, setForExisting] = useState(4);
  const [subscription, setSubscription] = useState(80);

  const result = useMemo(
    () =>
      rightsIssue({
        existingShares,
        price,
        newShares,
        forExisting,
        subscription,
      }),
    [existingShares, price, newShares, forExisting, subscription]
  );

  const valid = existingShares > 0 && forExisting > 0 && newShares > 0;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The issue"
          intro="Enter the terms from the company’s rights notice: how many new shares you can buy, and at what price."
        >
          <NumberField
            id="rights-existing"
            label="Shares you already hold"
            value={existingShares}
            set={setExistingShares}
            step={100}
            prefix="Qty"
          />
          <NumberField
            id="rights-price"
            label="Current market price"
            value={price}
            set={setPrice}
            step={0.5}
            prefix="PKR"
            hint="The cum-rights price, before the shares go ex-rights."
          />

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              id="rights-new"
              label="New shares offered"
              value={newShares}
              set={setNewShares}
              step={1}
              prefix="Qty"
            />
            <NumberField
              id="rights-for"
              label="For every existing"
              value={forExisting}
              set={setForExisting}
              step={1}
              prefix="Qty"
              hint="A one for four issue means 1 new share for every 4 held."
            />
          </div>

          <NumberField
            id="rights-subscription"
            label="Subscription price"
            value={subscription}
            set={setSubscription}
            step={0.5}
            prefix="PKR"
            hint="The price you pay for each new share."
          />
        </ToolPanel>

        {!result.inTheMoney && valid && (
          <WarningNote>
            The subscription price is at or above the theoretical ex-rights price. On these terms the
            rights are out of the money, and exercising them would reduce the value of your holding.
          </WarningNote>
        )}

        <AssumptionNote>
          The theoretical ex-rights price assumes the market values the old and the new shares at the
          same price after the issue. The actual price can differ, and the company’s use of the
          proceeds is not in the arithmetic.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        {valid ? (
          <ResultPanel
            eyebrow="Theoretical ex-rights price"
            headline={`PKR ${formatPKR2(result.terp)}`}
            sub={`After ${formatNumber(result.entitled, 0)} new shares at PKR ${formatPKR2(subscription)} each, on ${formatNumber(existingShares)} shares held.`}
            rows={[
              { label: 'Subscription cost', value: `PKR ${formatPKR(result.subscriptionCost)}`, accent: true },
              { label: 'Value of the rights', value: `PKR ${formatPKR(result.totalRightsValue)}` },
              { label: 'Discount to market', value: formatPct(result.discount) },
              { label: 'Total shares after issue', value: formatNumber(result.totalShares, 0) },
            ]}
          />
        ) : (
          <WarningNote>
            Enter a positive number of existing shares, a positive ratio and at least one new share.
            Without them the issue cannot be priced.
          </WarningNote>
        )}

        {valid && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <MiniStat label="Rights per existing share" value={`PKR ${formatPKR2(result.valuePerExisting)}`} />
              <MiniStat label="Value per new share" value={`PKR ${formatPKR2(result.valuePerNew)}`} />
            </div>

            <Breakdown
              title="The calculation"
              rows={[
                { label: 'Existing holding value', value: `PKR ${formatPKR(result.existingValue)}` },
                { label: 'New shares', value: formatNumber(result.entitled, 0) },
                { label: 'Subscription cost', value: `PKR ${formatPKR(result.subscriptionCost)}` },
                { label: 'Total value after issue', value: `PKR ${formatPKR(result.totalValue)}` },
                { label: 'Total shares after issue', value: formatNumber(result.totalShares, 0) },
                { label: 'Theoretical ex-rights price', value: `PKR ${formatPKR2(result.terp)}`, strong: true, accent: true },
                { label: 'Rights value, total', value: `PKR ${formatPKR(result.totalRightsValue)}` },
              ]}
              footer={
                <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                  {result.inTheMoney
                    ? 'The rights have value because the subscription price is below the market price. The theoretical price falls by exactly the value of the rights, so the old shares are worth less on paper immediately after the issue.'
                    : 'The subscription price is at or above the theoretical ex-rights price, so the rights are out of the money. Exercising them would put more money into the company than the new shares are theoretically worth.'}
                </p>
              }
            />
          </>
        )}

        <ToolFooter
          calculatorName="Right Shares Calculator"
          disclaimer="This is the theoretical arithmetic, not a recommendation to subscribe. It ignores fees, taxes, the record date and the possibility that the market price moves before you decide. Read the company’s rights notice for the binding terms."
        />
      </div>
    </ToolGrid>
  );
}

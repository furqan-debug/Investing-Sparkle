'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  MiniStat,
  NumberField,
  Segmented,
  SelectField,
  SourceNote,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { nssProfit } from '@/lib/savings';
import { nssProducts, nssWht, NSS_EFFECTIVE } from '@/content/savings-rates';
import { formatDate, formatPKR, formatPKR2, formatPct } from '@/lib/format';

type FilerStatus = 'filer' | 'nonFiler';
type Tenor = '3' | '6' | '12';

/**
 * The five National Savings certificate families. Profit is paid monthly,
 * half-yearly or at maturity depending on the certificate, so the tool shows
 * both the payment and the total rather than one blended number.
 */
export function NssCalculator() {
  const [productId, setProductId] = useState('behbood');
  const [principal, setPrincipal] = useState(500_000);
  const [status, setStatus] = useState<FilerStatus>('filer');
  const [stscMonths, setStscMonths] = useState<Tenor>('12');

  const product = nssProducts.find((item) => item.id === productId) ?? nssProducts[0];
  const whtRate = status === 'filer' ? nssWht.filer : nssWht.nonFiler;

  const result = useMemo(
    () => nssProfit({ principal, product, whtRate, stscMonths: Number(stscMonths) }),
    [principal, product, whtRate, stscMonths]
  );

  const isMonthly = product.payout === 'monthly';
  const isHalfYearly = product.payout === 'half-yearly';
  const annualLabel =
    product.maturityFactor !== undefined ? 'Net effective annual' : 'Net annual return';
  const annualValue =
    product.maturityFactor !== undefined ? result.netAnnualEffective : result.netAnnualSimple;

  const yearly = useMemo(() => {
    if (!isMonthly) return [];
    const rows: { label: string; gross: number; net: number }[] = [];
    result.schedule.forEach((payment, index) => {
      const year = Math.floor(index / 12);
      if (!rows[year]) rows[year] = { label: `Year ${year + 1}`, gross: 0, net: 0 };
      rows[year].gross += payment.gross;
      rows[year].net += payment.net;
    });
    return rows;
  }, [isMonthly, result.schedule]);

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The certificate"
          intro="Choose the National Savings product, the amount and whether you are on the active taxpayer list. Rates are the official CDNS schedule."
        >
          <SelectField
            id="nss-product"
            label="Certificate"
            value={productId}
            set={setProductId}
            options={nssProducts.map((item) => ({ value: item.id, label: item.label }))}
            hint={product.note}
          />

          <NumberField
            id="nss-principal"
            label="Amount invested"
            value={principal}
            set={setPrincipal}
            step={50_000}
            prefix="PKR"
            hint="The minimum varies by certificate. The calculator uses the amount you enter."
          />

          {product.id === 'stsc' && (
            <Segmented<Tenor>
              label="Tenor"
              value={stscMonths}
              set={setStscMonths}
              options={[
                { value: '3', label: '3 months' },
                { value: '6', label: '6 months' },
                { value: '12', label: '12 months' },
              ]}
              columns={3}
              hint="The short-term certificate pays a different rate for each tenor."
            />
          )}

          <Segmented<FilerStatus>
            label="Tax status"
            value={status}
            set={setStatus}
            options={[
              { value: 'filer', label: 'Filer (15%)' },
              { value: 'nonFiler', label: 'Non-filer (30%)' },
            ]}
            hint="Withholding is deducted from each profit payment. A non-filer pays double."
          />
        </ToolPanel>

        <SourceNote
          sources={['cdnsRates', 'whtCard']}
          title="Rates and source"
          intro={`Official CDNS profit rates effective ${formatDate(NSS_EFFECTIVE)}. The same page states 15% filer and 30% non-filer withholding on NSS profit.`}
          extra="CDNS changes these rates by notification, not on a market schedule. Check the source before you invest, and remember that zakat at 2.5% may also be deducted where it applies."
        />

        {principal <= 0 && (
          <WarningNote>
            Enter an amount above zero. The certificate rates are fixed, but the profit still
            depends on the amount invested.
          </WarningNote>
        )}

        <AssumptionNote>
          The calculator assumes the certificate is held to maturity and the profit is not
          reinvested. Early encashment usually pays a lower rate or a penalty, and the actual
          deduction can include zakat as well as withholding tax.
        </AssumptionNote>
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow="Net profit after tax"
          headline={`PKR ${formatPKR(result.net)}`}
          sub={`${product.label} at ${formatPct(result.rate)} a year for ${
            result.years < 1
              ? `${Math.round(result.years * 12)} months`
              : `${result.years} ${result.years === 1 ? 'year' : 'years'}`
          }, after ${formatPct(whtRate, 0)} withholding.`}
          rows={[
            { label: 'Gross profit', value: `PKR ${formatPKR(result.gross)}` },
            { label: 'Withholding tax', value: `PKR ${formatPKR(result.wht)}` },
            {
              label: annualLabel,
              value: formatPct(annualValue),
              accent: true,
            },
            { label: 'Total cash received', value: `PKR ${formatPKR(result.totalReceived)}` },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat
            label={
              isMonthly ? 'Monthly profit, net' : isHalfYearly ? 'Each payment, net' : 'At maturity, net'
            }
            value={`PKR ${formatPKR(
              isMonthly ? result.monthlyNet : isHalfYearly ? result.perPaymentNet : result.net
            )}`}
          />
          <MiniStat label="Principal returned" value={`PKR ${formatPKR(principal)}`} />
        </div>

        <Breakdown
          title="How the profit is built"
          rows={[
            { label: 'Amount invested', value: `PKR ${formatPKR(principal)}` },
            { label: 'Annual profit rate', value: formatPct(result.rate) },
            {
              label: 'Term',
              value:
                result.years < 1
                  ? `${Math.round(result.years * 12)} months`
                  : `${result.years} ${result.years === 1 ? 'year' : 'years'}`,
            },
            { label: 'Gross profit', value: `PKR ${formatPKR(result.gross)}` },
            {
              label: `Withholding tax at ${formatPct(whtRate, 0)}`,
              value: `PKR ${formatPKR(result.wht)}`,
            },
            {
              label: 'Net profit',
              value: `PKR ${formatPKR(result.net)}`,
              strong: true,
              accent: true,
            },
            {
              label: 'Total cash received',
              value: `PKR ${formatPKR(result.totalReceived)}`,
            },
          ]}
          footer={
            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              The principal is returned at maturity. Total cash received is the principal plus the
              net profit, whether the profit arrives monthly, half-yearly or in one payment.
            </p>
          }
        />

        {isMonthly && yearly.length > 0 && (
          <Breakdown
            title="Profit by year"
            rows={yearly.map((row) => ({
              label: `${row.label}, net`,
              value: `PKR ${formatPKR(row.net)}`,
            }))}
            footer={
              <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                {result.payments} monthly payments of PKR {formatPKR2(result.perPaymentGross)} gross,
                or PKR {formatPKR2(result.perPaymentNet)} after tax.
              </p>
            }
          />
        )}

        {isHalfYearly && (
          <Breakdown
            title="Payment schedule"
            rows={result.schedule.map((payment, index) => ({
              label: `Payment ${index + 1}`,
              value: `PKR ${formatPKR2(payment.gross)} gross · PKR ${formatPKR2(payment.net)} net`,
            }))}
            footer={
              <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                The rate is 12.00% a year for the first five payments and 12.80% for the last one.
              </p>
            }
          />
        )}

        <ToolFooter
          calculatorName="National Savings (NSS) Profit Calculator"
          disclaimer="The rates are the official CDNS schedule at the date shown and can change by notification. The calculator assumes the certificate is held to maturity, that profit is paid out rather than reinvested, and that withholding is the only deduction. Early encashment, zakat and any product-specific rules are outside the arithmetic."
        />
      </div>
    </ToolGrid>
  );
}

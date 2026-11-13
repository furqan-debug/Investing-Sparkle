import type { NssProduct } from '@/content/savings-rates';

/**
 * Savings, T-bill and bond arithmetic.
 *
 * These are definitions, not forecasts. A withholding rate is applied where
 * the law applies it, a discount price is derived from the yield the visitor
 * enters, and a yield to maturity is solved from the price rather than
 * assumed. Every assumption is printed on the page.
 */

export type NssPayment = { label: string; gross: number; net: number };

export type NssResult = {
  years: number;
  rate: number;
  gross: number;
  wht: number;
  net: number;
  totalReceived: number;
  grossAnnual: number;
  netAnnualSimple: number;
  netAnnualEffective: number;
  monthlyNet: number;
  perPaymentGross: number;
  perPaymentNet: number;
  schedule: NssPayment[];
  payments: number;
};

/**
 * NSS profit for one certificate. Monthly and half-yearly products pay the
 * profit out, so the principal comes back separately at maturity. A cumulative
 * certificate compounds internally and pays once at the end.
 */
export function nssProfit({
  principal,
  product,
  whtRate,
  stscMonths = 12,
}: {
  principal: number;
  product: NssProduct;
  whtRate: number;
  stscMonths?: number;
}): NssResult {
  const p = Math.max(0, principal);
  const tax = Math.min(1, Math.max(0, whtRate));
  let years = product.years;
  let rate = product.rate;

  if (product.tenors && product.tenors.length > 0) {
    const tenor =
      product.tenors.find((option) => option.months === stscMonths) ??
      product.tenors[product.tenors.length - 1];
    years = tenor.months / 12;
    rate = tenor.rate;
  }

  const schedule: NssPayment[] = [];
  let gross = 0;

  if (product.payout === 'monthly') {
    const per = (p * rate) / 12;
    const count = Math.max(1, Math.round(years * 12));
    for (let month = 1; month <= count; month += 1) {
      schedule.push({ label: `Month ${month}`, gross: per, net: per * (1 - tax) });
    }
    gross = per * count;
  } else if (product.payout === 'half-yearly') {
    const rates =
      product.instalmentRates ??
      Array.from({ length: Math.round(years * 2) }, () => rate);
    rates.forEach((instalmentRate, index) => {
      const amount = (p * instalmentRate) / 2;
      schedule.push({
        label: `Payment ${index + 1}`,
        gross: amount,
        net: amount * (1 - tax),
      });
      gross += amount;
    });
  } else if (product.maturityFactor) {
    gross = p * (product.maturityFactor - 1);
    schedule.push({ label: 'At maturity', gross, net: gross * (1 - tax) });
  } else {
    gross = p * rate * years;
    schedule.push({ label: 'At maturity', gross, net: gross * (1 - tax) });
  }

  const wht = gross * tax;
  const net = gross - wht;
  const totalReceived = p + net;
  const first = schedule[0];

  return {
    years,
    rate,
    gross,
    wht,
    net,
    totalReceived,
    grossAnnual: p > 0 && years > 0 ? gross / p / years : 0,
    netAnnualSimple: p > 0 && years > 0 ? net / p / years : 0,
    netAnnualEffective:
      p > 0 && years > 0 && totalReceived > 0
        ? Math.pow(totalReceived / p, 1 / years) - 1
        : 0,
    monthlyNet: product.payout === 'monthly' ? ((p * rate) / 12) * (1 - tax) : 0,
    perPaymentGross: first ? first.gross : 0,
    perPaymentNet: first ? first.net : 0,
    schedule,
    payments: schedule.length,
  };
}

/** Days used for each tenor. Actual days move a little with the auction date. */
export const tbillDays: Record<number, number> = { 1: 30, 3: 91, 6: 182, 12: 365 };

export type TbillResult = {
  days: number;
  price: number;
  investment: number;
  gain: number;
  wht: number;
  netGain: number;
  netMaturity: number;
  grossAnnual: number;
  netAnnual: number;
  valid: boolean;
};

/**
 * A Treasury bill is bought at a discount and repaid at face value. The price
 * is the present value of the face amount at the cut-off yield, using a
 * 365-day year. The gain is profit on debt, so withholding applies.
 */
export function tbill({
  faceValue,
  yieldRate,
  months,
  whtRate,
}: {
  faceValue: number;
  yieldRate: number;
  months: number;
  whtRate: number;
}): TbillResult {
  const days = tbillDays[months] ?? 365;
  const face = Math.max(0, faceValue);
  const yieldPct = Math.max(0, yieldRate);
  const tax = Math.min(1, Math.max(0, whtRate));
  const price = 100 / (1 + (yieldPct * days) / 365);
  const investment = (face * price) / 100;
  const gain = face - investment;
  const wht = gain * tax;
  const netGain = gain - wht;

  return {
    days,
    price,
    investment,
    gain,
    wht,
    netGain,
    netMaturity: face - wht,
    grossAnnual: investment > 0 ? (gain / investment) * (365 / days) : 0,
    netAnnual: investment > 0 ? (netGain / investment) * (365 / days) : 0,
    valid: face > 0 && yieldPct > 0,
  };
}

export type CouponFrequency = 'annual' | 'semiannual';

export type BondResult = {
  /** Quoted clean price per 100 of face value. */
  clean: number;
  /** Cash for the clean price on the face value entered. */
  cleanAmount: number;
  /** Clean amount plus accrued interest, which is what the buyer pays. */
  dirtyAmount: number;
  accrued: number;
  ytm: number | null;
  currentYield: number;
  couponPayment: number;
  totalCoupons: number;
  wht: number;
  netProfit: number;
  netAnnual: number;
  periods: number;
  valid: boolean;
};

/**
 * Yield to maturity from a clean price, with accrued interest for a settlement
 * between coupon dates. The yield is solved by bisection: there is no closed
 * form once the first period is fractional.
 */
export function bondYtm({
  faceValue,
  couponRate,
  years,
  frequency,
  cleanPrice,
  daysSinceCoupon,
  whtRate,
}: {
  faceValue: number;
  couponRate: number;
  years: number;
  frequency: CouponFrequency;
  cleanPrice: number;
  daysSinceCoupon: number;
  whtRate: number;
}): BondResult {
  const f = frequency === 'semiannual' ? 2 : 1;
  const face = Math.max(0, faceValue);
  const coupon = Math.max(0, couponRate);
  const periods = Math.max(1, Math.round(years * f));
  const daysInPeriod = 365 / f;
  const elapsed = Math.min(daysInPeriod, Math.max(0, daysSinceCoupon));
  const couponPayment = (face * coupon) / f;
  const accrued = couponPayment * (elapsed / daysInPeriod);
  const clean = Math.max(0, cleanPrice);
  const cleanAmount = (face * clean) / 100;
  const dirtyAmount = cleanAmount + accrued;
  const remaining = 1 - elapsed / daysInPeriod;
  const tax = Math.min(1, Math.max(0, whtRate));

  const priceAt = (yieldRate: number) => {
    let pv = 0;
    for (let k = 1; k <= periods; k += 1) {
      pv += couponPayment / Math.pow(1 + yieldRate / f, k - 1 + remaining);
    }
    pv += face / Math.pow(1 + yieldRate / f, periods - 1 + remaining);
    return pv;
  };

  let ytm: number | null = null;
  if (dirtyAmount > 0) {
    let low = -0.9;
    let high = 2;
    let lowValue = priceAt(low) - dirtyAmount;
    let highValue = priceAt(high) - dirtyAmount;

    if (lowValue * highValue <= 0) {
      for (let i = 0; i < 200; i += 1) {
        const mid = (low + high) / 2;
        const midValue = priceAt(mid) - dirtyAmount;
        if (Math.abs(midValue) < 1e-7) {
          ytm = mid;
          break;
        }
        if (lowValue * midValue <= 0) {
          high = mid;
          highValue = midValue;
        } else {
          low = mid;
          lowValue = midValue;
        }
      }
      if (ytm === null) ytm = (low + high) / 2;
    }
  }

  const totalCoupons = couponPayment * periods;
  const wht = totalCoupons * tax;
  const netProfit = totalCoupons - wht + (face - dirtyAmount);

  return {
    clean,
    cleanAmount,
    dirtyAmount,
    accrued,
    ytm,
    currentYield: clean > 0 ? (couponPayment * f) / cleanAmount : 0,
    couponPayment,
    totalCoupons,
    wht,
    netProfit,
    netAnnual: dirtyAmount > 0 && years > 0 ? netProfit / dirtyAmount / years : 0,
    periods,
    valid: dirtyAmount > 0 && face > 0,
  };
}

export type Compounding = 'monthly' | 'quarterly' | 'annual';
export type DepositPayout = 'reinvest' | 'payout';

export type DepositResult = {
  grossMaturity: number;
  grossProfit: number;
  wht: number;
  netProfit: number;
  maturity: number;
  netAnnualSimple: number;
  netEffective: number;
  grossEffective: number;
  monthlyGross: number;
  monthlyNet: number;
  valid: boolean;
};

/**
 * A bank term deposit. When the profit is reinvested, tax is withheld as each
 * profit is credited, so the net balance compounds at the after-tax rate. When
 * it is paid out, the profit is simple and the tax comes off each payment.
 */
export function termDeposit({
  principal,
  rate,
  months,
  compounding,
  payout,
  whtRate,
}: {
  principal: number;
  rate: number;
  months: number;
  compounding: Compounding;
  payout: DepositPayout;
  whtRate: number;
}): DepositResult {
  const p = Math.max(0, principal);
  const r = Math.max(0, rate);
  const years = Math.max(0, months) / 12;
  const n = compounding === 'monthly' ? 12 : compounding === 'quarterly' ? 4 : 1;
  const tax = Math.min(1, Math.max(0, whtRate));

  // Reinvested profit compounds inside the deposit. Paid-out profit is simple:
  // the principal never grows, so there is nothing to compound.
  const grossProfit =
    payout === 'reinvest'
      ? p * Math.pow(1 + r / n, n * years) - p
      : p * r * years;
  const grossMaturity = p + grossProfit;

  const netProfit =
    payout === 'reinvest'
      ? p * Math.pow(1 + (r * (1 - tax)) / n, n * years) - p
      : grossProfit * (1 - tax);

  const wht = grossProfit - netProfit;
  const maturity = p + netProfit;

  return {
    grossMaturity,
    grossProfit,
    wht,
    netProfit,
    maturity,
    netAnnualSimple: p > 0 && years > 0 ? netProfit / p / years : 0,
    netEffective: p > 0 && years > 0 ? Math.pow(maturity / p, 1 / years) - 1 : 0,
    grossEffective: p > 0 && years > 0 ? Math.pow(grossMaturity / p, 1 / years) - 1 : 0,
    monthlyGross: (p * r) / 12,
    monthlyNet: ((p * r) / 12) * (1 - tax),
    valid: p > 0 && r > 0 && months > 0,
  };
}

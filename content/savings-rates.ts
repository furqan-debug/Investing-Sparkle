import type { SourceKey } from './tax-rates';

/**
 * National Savings and government-security figures.
 *
 * NSS rates are administrative: CDNS publishes a new schedule by notification,
 * not as a market feed. The figures below are the official schedule effective
 * 21 October 2026, checked on 13 November 2026. Treasury bill and PIB figures
 * are a fallback snapshot of the latest SBP auction results; the tools read the
 * live auction PDFs first and use these only if that read fails.
 *
 * Nothing here is estimated. If a rate is not on the CDNS page or in an SBP
 * auction result, it is not in this file.
 */

export const NSS_EFFECTIVE = '2026-10-21';
export const SAVINGS_VERIFIED = '2026-11-13';

export type NssPayout = 'monthly' | 'half-yearly' | 'maturity';

export type NssProduct = {
  id: string;
  label: string;
  /** Years to maturity for the standard certificate. */
  years: number;
  /** Annual profit rate as a decimal. */
  rate: number;
  payout: NssPayout;
  /** Per-instalment annual rates for a product whose rate changes over its life. */
  instalmentRates?: number[];
  /** Official maturity value per 100 invested, for cumulative certificates. */
  maturityFactor?: number;
  /** Tenor choices where one product has several. */
  tenors?: { months: number; rate: number }[];
  note: string;
  source: SourceKey;
};

/**
 * The five certificate families in the registry. Behbood, Pensioners and
 * Shuhada share one rate, so they are one option with a combined label.
 */
export const nssProducts: NssProduct[] = [
  {
    id: 'behbood',
    label: 'Behbood, Pensioners and Shuhada',
    years: 3,
    rate: 0.1296,
    payout: 'monthly',
    note: 'Rs 1,080 a month on every Rs 100,000. Profit is paid monthly and the principal is returned after three years. The certificate can be extended.',
    source: 'cdnsRates',
  },
  {
    id: 'ric',
    label: 'Regular Income Certificates',
    years: 5,
    rate: 0.1212,
    payout: 'monthly',
    note: 'Rs 1,010 a month on every Rs 100,000 for five years. Profit is paid monthly and the principal is returned at maturity.',
    source: 'cdnsRates',
  },
  {
    id: 'ssc',
    label: 'Special Savings Certificates',
    years: 3,
    rate: 0.12,
    payout: 'half-yearly',
    instalmentRates: [0.12, 0.12, 0.12, 0.12, 0.12, 0.128],
    note: 'Profit is paid every six months: 12.00% a year for the first five payments and 12.80% for the final one. On Rs 100,000 that is Rs 6,000 five times and Rs 6,400 at the end.',
    source: 'cdnsRates',
  },
  {
    id: 'dsc',
    label: 'Defence Savings Certificates',
    years: 10,
    rate: 0.1194,
    payout: 'maturity',
    maturityFactor: 3.15,
    note: 'A cumulative certificate. Rs 100,000 becomes Rs 315,000 after ten years, a total profit of 215%. The quoted annual rate is 11.94%; the maturity table is the authoritative figure.',
    source: 'cdnsRates',
  },
  {
    id: 'stsc',
    label: 'Short Term Savings Certificates',
    years: 1,
    rate: 0.1172,
    payout: 'maturity',
    tenors: [
      { months: 3, rate: 0.1112 },
      { months: 6, rate: 0.115 },
      { months: 12, rate: 0.1172 },
    ],
    note: 'Profit is paid at maturity. The rate depends on the tenor: 11.12% for three months, 11.50% for six months and 11.72% for twelve months.',
    source: 'cdnsRates',
  },
];

/** Section 151 withholding on NSS profit, as stated on the CDNS page. */
export const nssWht = { filer: 0.15, nonFiler: 0.3 };

/**
 * Section 151 withholding on bank deposit profit. This is the clause (a) rate
 * in the FBR withholding card: 20% for a filer and 40% for a non-filer, higher
 * than the 15%/30% that applies to NSS and to other profit on debt.
 */
export const bankDepositWht = { filer: 0.2, nonFiler: 0.4 };

/** Government securities held by an individual fall under the 15%/30% clause. */
export const securityWht = {
  individual: { filer: 0.15, nonFiler: 0.3 },
  company: { filer: 0.2, nonFiler: 0.4 },
};

export type TbillYield = { months: number; yield: number };

export type TbillSnapshot = {
  asOf: string;
  source: string;
  live: boolean;
  yields: TbillYield[];
};

/** Auction held 11 November 2026, settlement 12 November 2026. */
export const tbillFallback: TbillSnapshot = {
  asOf: '2026-11-11',
  source: 'SBP auction result, 11 November 2026',
  live: false,
  yields: [
    { months: 1, yield: 0.118838 },
    { months: 3, yield: 0.119999 },
    { months: 6, yield: 0.1219 },
    { months: 12, yield: 0.1241 },
  ],
};

export type PibBond = {
  years: number;
  coupon: number;
  price: number;
  yield: number;
};

export type PibSnapshot = {
  asOf: string;
  source: string;
  live: boolean;
  bonds: PibBond[];
};

/**
 * Fixed-rate PIB auction held 4 November 2026, settlement 5 November 2026.
 * Coupons are the rates on the securities in that auction. Zero-coupon 2-year
 * and 15-year bonds are excluded: their price and yield use a different
 * convention from the coupon-paying bonds.
 */
export const pibFallback: PibSnapshot = {
  asOf: '2026-11-04',
  source: 'SBP PIB auction result, 4 November 2026',
  live: false,
  bonds: [
    { years: 3, coupon: 0.12, price: 98.6375, yield: 0.12638 },
    { years: 5, coupon: 0.1225, price: 98.1366, yield: 0.128 },
    { years: 10, coupon: 0.125, price: 98.0928, yield: 0.1285 },
  ],
};

/**
 * The policy rate is a benchmark, not a deposit rate. Each bank sets its own
 * deposit rates, so the bank tool starts from this figure and asks the visitor
 * to replace it with the rate their bank quoted.
 */
export const policyRate = {
  rate: 0.12,
  asOf: '2026-11-13',
  source: 'sbpPolicy' as SourceKey,
  note: 'SBP policy rate 12.00% as on 13 November 2026. Banks price deposits above or below it, and the rate on your statement is the one that matters.',
};

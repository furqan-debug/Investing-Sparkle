/**
 * Pakistan tax figures for tax year 2026-27 (1 July 2026 to 30 June 2027).
 *
 * Every number here is either copied from, or derived from, a published FBR
 * document listed in `sources`. Nothing is estimated. Where two official-looking
 * documents disagree (the budget papers quoted 1.5% for section 236K before the
 * enacted rate settled at 1.25%), the enacted Finance Act figure is used and the
 * discrepancy is noted on the page.
 *
 * The figures are still a snapshot. Finance Acts change rates, and the FBR
 * issues clarifications during the year. Each tool shows the verified date and
 * a link to the source so a visitor can check before filing.
 */

export const TAX_YEAR = '2026-27';
export const TAX_YEAR_START = '2026-07-01';
export const TAX_YEAR_END = '2027-06-30';
export const VERIFIED_ON = '2026-11-13';

export type TaxSource = {
  label: string;
  url: string;
  note?: string;
};

export const taxSources = {
  financeAct2026: {
    label: 'Finance Act 2026',
    url: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
    note: 'The enacted law setting the 2026-27 rates.',
  },
  circular2: {
    label: 'FBR Circular No. 02 of 2026-27',
    url: 'https://download1.fbr.gov.pk/Docs/202698139527880CircularNo.2of2026-27.pdf',
    note: 'FBR explanation of the Finance Act 2026 amendments.',
  },
  whtCard: {
    label: 'FBR Withholding Tax Rate Card (tax year 2027)',
    url: 'https://download1.fbr.gov.pk/Docs/202681113864992WithholdingTaxRatesCard2027.pdf',
    note: 'Updated to 30 June 2026 as per the Finance Act 2026.',
  },
  ordinance: {
    label: 'Income Tax Ordinance 2001 (consolidated to 30 June 2026)',
    url: 'https://download1.fbr.gov.pk/Docs/2026724177725705IncomeTaxOrdinanace2001.pdf',
    note: 'Sections 15A, 37, 37A, 62, 63, 150, 155, 236C and 236K.',
  },
  salientFeatures: {
    label: 'FBR Budget 2026-27 salient features',
    url: 'https://fbr.gov.pk/Budget2026-27/SalientFeatures/Salient-Feature.pdf',
    note: 'Budget-stage summary. The enacted Finance Act prevails where figures differ.',
  },
  psxSchedule: {
    label: 'PSX Schedule of Charges (updated 18 December 2024)',
    url: 'https://www.psx.com.pk/psx/themes/psx/uploads/Schedule-of-Charges-Updated-as-on-December-18-2024.pdf',
    note: 'Trading fee, regulatory fee, SECP levy and the sales tax basis for the ready market.',
  },
  psxRegulations: {
    label: 'PSX Regulations (September 2026)',
    url: 'https://www.psx.com.pk/psx/themes/psx/uploads/PSX-Regulations-September-23-2026.pdf',
    note: 'Annexure III sets the standard range for brokerage commission. Regulation 19.3 sets the scrip-wise circuit breaker.',
  },
  psxTradingInfo: {
    label: 'PSX guide to opening an account',
    url: 'https://www.psx.com.pk/psx/resources-and-tools/investors/open-an-account-invest',
    note: 'PSX summary of the taxes and charges that apply to share trading.',
  },
  pbsCpi: {
    label: 'Pakistan Bureau of Statistics, price statistics',
    url: 'https://www.pbs.gov.pk/price-statistics/',
    note: 'Monthly CPI releases. The calculator does not bundle a CPI series; it uses the two index readings you enter.',
  },
} satisfies Record<string, TaxSource>;

export type SourceKey = keyof typeof taxSources;

/** Progressive slab with a fixed amount carried from the lower bands. */
export type Slab = {
  /** Income above this amount is taxed at `rate`. */
  above: number;
  /** Tax on all income up to `above`. */
  fixed: number;
  rate: number;
  /** Inclusive upper bound, or null for the top band. */
  upTo: number | null;
  source: SourceKey;
};

/**
 * Salaried individuals, Division I of Part I of the First Schedule.
 * Eight bands from 0% to 35%. The 9% surcharge on salaried income above
 * Rs 10 million was withdrawn from tax year 2027.
 */
export const salarySlabs: Slab[] = [
  { above: 0, fixed: 0, rate: 0, upTo: 600_000, source: 'financeAct2026' },
  { above: 600_000, fixed: 0, rate: 0.01, upTo: 1_200_000, source: 'financeAct2026' },
  { above: 1_200_000, fixed: 6_000, rate: 0.11, upTo: 2_200_000, source: 'financeAct2026' },
  { above: 2_200_000, fixed: 116_000, rate: 0.2, upTo: 3_200_000, source: 'financeAct2026' },
  { above: 3_200_000, fixed: 316_000, rate: 0.25, upTo: 4_100_000, source: 'financeAct2026' },
  { above: 4_100_000, fixed: 541_000, rate: 0.29, upTo: 5_600_000, source: 'financeAct2026' },
  { above: 5_600_000, fixed: 976_000, rate: 0.32, upTo: 7_000_000, source: 'financeAct2026' },
  { above: 7_000_000, fixed: 1_424_000, rate: 0.35, upTo: null, source: 'financeAct2026' },
];

/**
 * Non-salaried individuals and AOPs, Division I of Part I of the First Schedule.
 * Unchanged by the Finance Act 2026.
 */
export const nonSalarySlabs: Slab[] = [
  { above: 0, fixed: 0, rate: 0, upTo: 600_000, source: 'financeAct2026' },
  { above: 600_000, fixed: 0, rate: 0.15, upTo: 1_200_000, source: 'financeAct2026' },
  { above: 1_200_000, fixed: 90_000, rate: 0.2, upTo: 1_600_000, source: 'financeAct2026' },
  { above: 1_600_000, fixed: 170_000, rate: 0.3, upTo: 3_200_000, source: 'financeAct2026' },
  { above: 3_200_000, fixed: 650_000, rate: 0.4, upTo: 5_600_000, source: 'financeAct2026' },
  { above: 5_600_000, fixed: 1_610_000, rate: 0.45, upTo: null, source: 'financeAct2026' },
];

/** Section 4AB surcharge on non-salaried income above Rs 10 million. */
export const surcharge = {
  threshold: 10_000_000,
  rate: 0.1,
  note: 'The 9% salaried surcharge was withdrawn from tax year 2027. The 10% surcharge on non-salaried income above Rs 10 million remains.',
  source: 'financeAct2026' as SourceKey,
};

/** Section 155 withholding on rent, individuals and AOPs. */
export const rentalSlabsFiler: Slab[] = [
  { above: 0, fixed: 0, rate: 0, upTo: 300_000, source: 'whtCard' },
  { above: 300_000, fixed: 0, rate: 0.05, upTo: 600_000, source: 'whtCard' },
  { above: 600_000, fixed: 15_000, rate: 0.1, upTo: 2_000_000, source: 'whtCard' },
  { above: 2_000_000, fixed: 155_000, rate: 0.25, upTo: null, source: 'whtCard' },
];

/** Section 155, non-filers: the Tenth Schedule doubles every band. */
export const rentalSlabsNonFiler: Slab[] = [
  { above: 0, fixed: 0, rate: 0, upTo: 300_000, source: 'whtCard' },
  { above: 300_000, fixed: 0, rate: 0.1, upTo: 600_000, source: 'whtCard' },
  { above: 600_000, fixed: 30_000, rate: 0.2, upTo: 2_000_000, source: 'whtCard' },
  { above: 2_000_000, fixed: 310_000, rate: 0.5, upTo: null, source: 'whtCard' },
];

/** Section 155 flat rate where the recipient is a company. */
export const rentalCompany = { filer: 0.15, nonFiler: 0.3, source: 'whtCard' as SourceKey };

/** Section 15A deductions available to a landlord when filing. */
export const rentalDeductions = {
  repairsAllowance: 0.2,
  collectionAllowance: 0.04,
  note: 'A 20% repairs allowance needs no receipts. Collection and management costs are allowed up to 4% of rent. Property tax, insurance, ground rent and mortgage profit are also deductible when filing.',
  source: 'ordinance' as SourceKey,
};

/** Section 236K, advance tax collected from the buyer. */
export const propertyBuyerTax = {
  filer: 0.0125,
  nonFilerBands: [
    { upTo: 50_000_000, rate: 0.105 },
    { upTo: 100_000_000, rate: 0.145 },
    { upTo: null as number | null, rate: 0.185 },
  ],
  note: 'The enacted Finance Act 2026 rate is 1.25% for filers. Budget papers quoted 1.5% before enactment. Non-filers pay 10.5%, 14.5% or 18.5% by value. The separate late-filer tier was removed.',
  source: 'financeAct2026' as SourceKey,
};

/** Section 236C, advance tax collected from the seller. */
export const propertySellerTax = {
  filer: 0.0275,
  nonFiler: 0.115,
  note: 'A flat 2.75% for filers and 11.5% for non-filers, on the higher of the deed price and the FBR value. The late-filer tier was removed.',
  source: 'financeAct2026' as SourceKey,
};

export type PropertyKind = 'plot' | 'constructed' | 'flat';

/** Section 37 holding-period CGT for property acquired on or before 30 June 2024. */
export const propertyCgtOld: Record<PropertyKind, { maxYears: number; rate: number }[]> = {
  plot: [
    { maxYears: 1, rate: 0.15 },
    { maxYears: 2, rate: 0.125 },
    { maxYears: 3, rate: 0.1 },
    { maxYears: 4, rate: 0.075 },
    { maxYears: 5, rate: 0.05 },
    { maxYears: 6, rate: 0.025 },
    { maxYears: Infinity, rate: 0 },
  ],
  constructed: [
    { maxYears: 1, rate: 0.15 },
    { maxYears: 2, rate: 0.1 },
    { maxYears: 3, rate: 0.075 },
    { maxYears: 4, rate: 0.05 },
    { maxYears: Infinity, rate: 0 },
  ],
  flat: [
    { maxYears: 1, rate: 0.15 },
    { maxYears: 2, rate: 0.075 },
    { maxYears: Infinity, rate: 0 },
  ],
};

/** Section 37 CGT for property acquired on or after 1 July 2024. */
export const propertyCgtNew = {
  filer: 0.15,
  nonFilerMinimum: 0.15,
  cutover: '2024-07-01',
  note: 'A flat 15% for filers, whatever the holding period. A non-filer is taxed at slab rates with a 15% floor, so 15% is the minimum shown here.',
  source: 'financeAct2026' as SourceKey,
};

export type SecuritiesCgtBand = {
  from: string;
  to: string;
  /** null means the rate depends on the holding period. */
  rate: { filer: number; nonFiler: number } | null;
  holding?: { maxYears: number; filer: number; nonFiler: number }[];
  label: string;
};

/**
 * Division VII of Part I of the First Schedule, CGT on securities.
 * The purchase date decides the regime. The sale date decides the tax year.
 */
export const securitiesCgtBands: SecuritiesCgtBand[] = [
  {
    from: '0000-01-01',
    to: '2013-06-30',
    rate: { filer: 0, nonFiler: 0 },
    label: 'Bought before 1 July 2013',
  },
  {
    from: '2013-07-01',
    to: '2022-06-30',
    rate: { filer: 0.125, nonFiler: 0.25 },
    label: 'Bought 1 July 2013 to 30 June 2022',
  },
  {
    from: '2022-07-01',
    to: '2024-06-30',
    rate: null,
    label: 'Bought 1 July 2022 to 30 June 2024',
    holding: [
      { maxYears: 1, filer: 0.15, nonFiler: 0.3 },
      { maxYears: 2, filer: 0.125, nonFiler: 0.25 },
      { maxYears: 3, filer: 0.1, nonFiler: 0.2 },
      { maxYears: 4, filer: 0.075, nonFiler: 0.15 },
      { maxYears: 5, filer: 0.05, nonFiler: 0.1 },
      { maxYears: 6, filer: 0.025, nonFiler: 0.05 },
      { maxYears: Infinity, filer: 0, nonFiler: 0 },
    ],
  },
  {
    from: '2024-07-01',
    to: '2025-06-30',
    rate: { filer: 0.15, nonFiler: 0.3 },
    label: 'Bought 1 July 2024 to 30 June 2025',
  },
  {
    from: '2025-07-01',
    to: '9999-12-31',
    rate: { filer: 0.15, nonFiler: 0.15 },
    label: 'Bought on or after 1 July 2025',
  },
];

export type DividendPayer =
  | 'listed'
  | 'ipp'
  | 'reit'
  | 'equityFund'
  | 'debtFund'
  | 'spv'
  | 'lossCompany';

/** Section 150 dividend withholding rates, tax year 2027. */
export const dividendRates: Record<
  DividendPayer,
  { label: string; filer: number; nonFiler: number; note: string }
> = {
  listed: {
    label: 'Listed company or other payer',
    filer: 0.15,
    nonFiler: 0.3,
    note: 'The general rate for a dividend from a listed company.',
  },
  ipp: {
    label: 'Independent power producer (IPP)',
    filer: 0.075,
    nonFiler: 0.15,
    note: 'Dividends paid by an IPP carry a lower rate.',
  },
  reit: {
    label: 'REIT',
    filer: 0.15,
    nonFiler: 0.3,
    note: 'A REIT distributing to unit holders.',
  },
  equityFund: {
    label: 'Equity mutual fund',
    filer: 0.15,
    nonFiler: 0.3,
    note: 'Where most of the fund’s income comes from equities.',
  },
  debtFund: {
    label: 'Debt mutual fund',
    filer: 0.25,
    nonFiler: 0.5,
    note: 'Where 50% or more of the fund’s income comes from profit on debt.',
  },
  spv: {
    label: 'Dividend from a REIT special purpose vehicle',
    filer: 0.35,
    nonFiler: 0.7,
    note: 'The rate for a recipient other than a REIT scheme.',
  },
  lossCompany: {
    label: 'Company with exempt income or losses',
    filer: 0.25,
    nonFiler: 0.5,
    note: 'A company that pays no tax on its own income.',
  },
};

/** Section 60 and 61 deductions and section 63 pension credit. */
export const taxCredits = {
  zakat: {
    note: 'Zakat paid under the Zakat and Ushr Ordinance is deducted from taxable income.',
    source: 'ordinance' as SourceKey,
  },
  donations: {
    cap: 0.3,
    note: 'Approved charitable donations are deducted up to 30% of taxable income.',
    source: 'ordinance' as SourceKey,
  },
  pension: {
    contributionCap: 0.2,
    note: 'A contribution to an approved pension fund earns a credit at your average rate of tax, on the lower of the contribution or 20% of taxable income. The credit cannot exceed the tax payable.',
    source: 'ordinance' as SourceKey,
  },
};

/** Zakat is 2.5% of net zakatable wealth above nisab. */
export const zakatRate = 0.025;

/** Nisab weights. Gold 7.5 tola, silver 52.5 tola. */
export const nisabWeights = {
  goldTola: 7.5,
  silverTola: 52.5,
  gramsPerTola: 11.6638,
};

export function slabFor(income: number, slabs: Slab[]): Slab {
  const band = slabs.find((s) => s.upTo === null || income <= s.upTo);
  return band ?? slabs[slabs.length - 1];
}

/** Progressive tax with a mandatory-fixed-amount table. */
export function slabTax(income: number, slabs: Slab[]): number {
  if (!Number.isFinite(income) || income <= 0) return 0;
  const band = slabFor(income, slabs);
  const excess = Math.max(0, income - band.above);
  return band.fixed + excess * band.rate;
}

/** The marginal rate at a given income. */
export function marginalRate(income: number, slabs: Slab[]): number {
  return slabFor(income, slabs).rate;
}

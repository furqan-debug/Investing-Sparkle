/**
 * Tax arithmetic for the 2026-27 tools.
 *
 * Pure functions only, so the same numbers can be unit tested and reused by the
 * calculator components. Every function that applies a published table takes it
 * from `content/tax-rates.ts` rather than hardcoding a rate here.
 */

import {
  dividendRates,
  nonSalarySlabs,
  propertyBuyerTax,
  propertyCgtNew,
  propertyCgtOld,
  propertySellerTax,
  rentalCompany,
  rentalDeductions,
  rentalSlabsFiler,
  rentalSlabsNonFiler,
  salarySlabs,
  securitiesCgtBands,
  slabTax,
  surcharge,
  taxCredits,
  type DividendPayer,
  type PropertyKind,
  type Slab,
} from '@/content/tax-rates';

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function parseDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

/** Exact years between two ISO dates, using 365.2425 days a year. */
export function yearsBetween(fromIso: string, toIso: string): number {
  const from = parseDate(fromIso).getTime();
  const to = parseDate(toIso).getTime();
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) return 0;
  return (to - from) / (365.2425 * 24 * 60 * 60 * 1000);
}

export function effectiveRate(tax: number, income: number): number {
  return income > 0 ? tax / income : 0;
}

export type SlabLine = {
  label: string;
  taxable: number;
  rate: number;
  tax: number;
};

export function slabBreakdown(income: number, slabs: Slab[]): SlabLine[] {
  if (income <= 0) return [];

  return slabs
    .map((band, index) => {
      const upper = band.upTo ?? income;
      const lower = band.above;
      const taxable = Math.max(0, Math.min(income, upper) - lower);
      const tax = taxable * band.rate;

      return {
        label:
          band.upTo === null
            ? `Above ${formatShortPKR(lower)}`
            : `${formatShortPKR(lower)} to ${formatShortPKR(band.upTo)}`,
        taxable,
        rate: band.rate,
        tax,
      };
    })
    .filter((line) => line.taxable > 0);
}

function formatShortPKR(value: number): string {
  if (value >= 1_000_000) return `Rs ${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}m`;
  if (value >= 1_000) return `Rs ${(value / 1_000).toFixed(0)}k`;
  return `Rs ${value}`;
}

// ------------------------------------------------------------------ Salary tax

export type SalaryInput = {
  monthlySalary: number;
  additionalIncome: number;
  exemptAllowances: number;
  zakat: number;
  donations: number;
  pensionContribution: number;
  otherCredits: number;
  taxAlreadyDeducted: number;
};

export function salaryTax(input: SalaryInput) {
  const grossSalary = input.monthlySalary * 12 + input.additionalIncome;
  const beforeDeductions = Math.max(0, grossSalary - input.exemptAllowances);
  const zakatDeduction = clamp(input.zakat, 0, beforeDeductions);
  const afterZakat = beforeDeductions - zakatDeduction;
  const donationCap = afterZakat * taxCredits.donations.cap;
  const donationDeduction = clamp(input.donations, 0, donationCap);
  const taxableIncome = Math.max(0, afterZakat - donationDeduction);

  const taxBeforeCredits = slabTax(taxableIncome, salarySlabs);
  const averageRate = effectiveRate(taxBeforeCredits, taxableIncome);

  const pensionEligible = Math.min(
    Math.max(0, input.pensionContribution),
    taxableIncome * taxCredits.pension.contributionCap
  );
  const pensionCredit = pensionEligible * averageRate;
  const credits = clamp(pensionCredit + Math.max(0, input.otherCredits), 0, taxBeforeCredits);

  const taxPayable = Math.max(0, taxBeforeCredits - credits);
  const balance = taxPayable - Math.max(0, input.taxAlreadyDeducted);
  const monthlyTax = taxPayable / 12;

  return {
    grossSalary,
    beforeDeductions,
    zakatDeduction,
    donationCap,
    donationDeduction,
    taxableIncome,
    taxBeforeCredits,
    pensionEligible,
    pensionCredit,
    credits,
    taxPayable,
    monthlyTax,
    monthlyTakeHome: Math.max(0, input.monthlySalary - monthlyTax),
    effectiveRate: effectiveRate(taxPayable, grossSalary),
    balance,
    breakdown: slabBreakdown(taxableIncome, salarySlabs),
  };
}

// ---------------------------------------------------------------- Business tax

export type BusinessEntity = 'individual' | 'aop' | 'professional';

export type BusinessInput = {
  profit: number;
  otherIncome: number;
  deductions: number;
  entity: BusinessEntity;
  otherCredits: number;
  taxAlreadyDeducted: number;
  exportMode: boolean;
  exportReceipts: number;
  exportRate: number;
};

/** Professional firms cannot incorporate, so the top rate is capped at 40%. */
export function businessSlabs(entity: BusinessEntity): Slab[] {
  if (entity !== 'professional') return nonSalarySlabs;

  return nonSalarySlabs.map((band) =>
    band.upTo === null ? { ...band, rate: Math.min(band.rate, 0.4) } : band
  );
}

export function businessTax(input: BusinessInput) {
  if (input.exportMode) {
    const rate = clamp(input.exportRate, 0, 1);
    const tax = Math.max(0, input.exportReceipts) * rate;

    return {
      taxableIncome: Math.max(0, input.exportReceipts),
      taxBeforeSurcharge: tax,
      surcharge: 0,
      taxBeforeCredits: tax,
      credits: 0,
      taxPayable: tax,
      balance: tax - Math.max(0, input.taxAlreadyDeducted),
      effectiveRate: rate,
      breakdown: [] as SlabLine[],
      exportMode: true,
    };
  }

  const taxableIncome = Math.max(0, input.profit + input.otherIncome - input.deductions);
  const slabs = businessSlabs(input.entity);
  const taxBeforeSurcharge = slabTax(taxableIncome, slabs);
  const surchargeDue = taxableIncome > surcharge.threshold ? taxBeforeSurcharge * surcharge.rate : 0;
  const taxBeforeCredits = taxBeforeSurcharge + surchargeDue;
  const credits = clamp(Math.max(0, input.otherCredits), 0, taxBeforeCredits);
  const taxPayable = Math.max(0, taxBeforeCredits - credits);

  return {
    taxableIncome,
    taxBeforeSurcharge,
    surcharge: surchargeDue,
    taxBeforeCredits,
    credits,
    taxPayable,
    balance: taxPayable - Math.max(0, input.taxAlreadyDeducted),
    effectiveRate: effectiveRate(taxPayable, taxableIncome),
    breakdown: slabBreakdown(taxableIncome, slabs),
    exportMode: false,
  };
}

// ------------------------------------------------------------------ Rental tax

export type RentalOwner = 'individual' | 'company';

export type RentalInput = {
  monthlyRent: number;
  owner: RentalOwner;
  filer: boolean;
  otherExpenses: number;
};

export function rentalTax(input: RentalInput) {
  const annualRent = Math.max(0, input.monthlyRent) * 12;
  const slabs = input.filer ? rentalSlabsFiler : rentalSlabsNonFiler;

  const withholding =
    input.owner === 'company'
      ? annualRent * (input.filer ? rentalCompany.filer : rentalCompany.nonFiler)
      : slabTax(annualRent, slabs);

  const repairs = annualRent * rentalDeductions.repairsAllowance;
  const netRent = Math.max(0, annualRent - repairs - Math.max(0, input.otherExpenses));

  // Rental income is taxed at slab rates. Using the non-salary table is the
  // conservative case where rent is the only income; a salaried landlord will
  // usually face a lower marginal rate on the same rent.
  const finalTaxEstimate = slabTax(netRent, nonSalarySlabs);
  const balance = finalTaxEstimate - withholding;

  return {
    annualRent,
    withholding,
    repairs,
    netRent,
    finalTaxEstimate,
    balance,
    monthlyNetAfterWithholding: (annualRent - withholding) / 12,
    effectiveWithholdingRate: effectiveRate(withholding, annualRent),
  };
}

// --------------------------------------------------------------- Securities CGT

export type SecuritiesInput = {
  cost: number;
  proceeds: number;
  purchaseDate: string;
  saleDate: string;
  filer: boolean;
};

export function securitiesCgt(input: SecuritiesInput) {
  const gain = Math.max(0, input.proceeds - input.cost);
  const holdingYears = yearsBetween(input.purchaseDate, input.saleDate);
  const band =
    securitiesCgtBands.find(
      (b) => input.purchaseDate >= b.from && input.purchaseDate <= b.to
    ) ?? securitiesCgtBands[securitiesCgtBands.length - 1];

  let rate = 0;
  let label = band.label;

  if (band.rate) {
    rate = input.filer ? band.rate.filer : band.rate.nonFiler;
  } else if (band.holding) {
    const step =
      band.holding.find((h) => holdingYears <= h.maxYears) ??
      band.holding[band.holding.length - 1];
    rate = input.filer ? step.filer : step.nonFiler;
    label = `${band.label}, held ${holdingYears < 1 ? 'under a year' : `${Math.floor(holdingYears)} year${Math.floor(holdingYears) === 1 ? '' : 's'}`}`;
  }

  const tax = gain * rate;

  return {
    gain,
    holdingYears,
    rate,
    label,
    tax,
    netProceeds: input.proceeds - tax,
    returnPct: input.cost > 0 ? gain / input.cost : 0,
    annualised:
      input.cost > 0 && holdingYears > 0 && input.proceeds > 0
        ? Math.pow(input.proceeds / input.cost, 1 / holdingYears) - 1
        : 0,
  };
}

// ---------------------------------------------------------------- Dividend tax

export type DividendInput = {
  grossDividend: number;
  payer: DividendPayer;
  filer: boolean;
  investmentCost: number;
};

export function dividendTax(input: DividendInput) {
  const table = dividendRates[input.payer];
  const rate = input.filer ? table.filer : table.nonFiler;
  const tax = Math.max(0, input.grossDividend) * rate;
  const net = Math.max(0, input.grossDividend) - tax;

  return {
    rate,
    tax,
    net,
    yieldOnCost: input.investmentCost > 0 ? net / input.investmentCost : 0,
    label: table.label,
    note: table.note,
  };
}

// --------------------------------------------------------- Property transfer tax

export type PropertyInput = {
  declaredPrice: number;
  fbrValue: number;
  buyerFiler: boolean;
  sellerFiler: boolean;
  purchasePrice: number;
  purchaseDate: string;
  saleDate: string;
  propertyKind: PropertyKind;
};

export function propertyBuyerRate(value: number, filer: boolean): number {
  if (filer) return propertyBuyerTax.filer;
  const band =
    propertyBuyerTax.nonFilerBands.find((b) => b.upTo === null || value <= b.upTo) ??
    propertyBuyerTax.nonFilerBands[propertyBuyerTax.nonFilerBands.length - 1];
  return band.rate;
}

export function propertyCgtRate(
  purchaseDate: string,
  holdingYears: number,
  kind: PropertyKind,
  filer: boolean
): { rate: number; label: string } {
  if (purchaseDate >= propertyCgtNew.cutover) {
    return {
      rate: filer ? propertyCgtNew.filer : propertyCgtNew.nonFilerMinimum,
      label: filer
        ? 'Bought on or after 1 July 2024, flat 15% for filers'
        : 'Bought on or after 1 July 2024, 15% minimum for non-filers',
    };
  }

  const table = propertyCgtOld[kind];
  const step = table.find((s) => holdingYears <= s.maxYears) ?? table[table.length - 1];

  return {
    rate: step.rate,
    label: `${kind === 'plot' ? 'Open plot' : kind === 'flat' ? 'Flat' : 'Constructed property'}, held ${holdingYears < 1 ? 'under a year' : `${Math.floor(holdingYears)} year${Math.floor(holdingYears) === 1 ? '' : 's'}`}`,
  };
}

export function propertyTransferTax(input: PropertyInput) {
  const base = Math.max(0, input.declaredPrice, input.fbrValue);
  const buyerRate = propertyBuyerRate(base, input.buyerFiler);
  const buyerTax = base * buyerRate;
  const sellerRate = input.sellerFiler ? propertySellerTax.filer : propertySellerTax.nonFiler;
  const sellerTax = base * sellerRate;

  const gain = Math.max(0, base - input.purchasePrice);
  const holdingYears = yearsBetween(input.purchaseDate, input.saleDate);
  const cgt = propertyCgtRate(input.purchaseDate, holdingYears, input.propertyKind, input.sellerFiler);
  const cgtTax = gain * cgt.rate;

  // 236C is adjustable, so it is credited against the CGT rather than added to
  // it. The cash needed at transfer is the 236C; the remaining CGT is the extra.
  const credit = Math.min(sellerTax, cgtTax);
  const cgtBalance = Math.max(0, cgtTax - credit);

  return {
    base,
    buyerRate,
    buyerTax,
    sellerRate,
    sellerTax,
    gain,
    holdingYears,
    cgtRate: cgt.rate,
    cgtLabel: cgt.label,
    cgtTax,
    credit,
    cgtBalance,
    cashAtTransfer: sellerTax,
    totalSellerCost: sellerTax + cgtBalance,
  };
}

// ----------------------------------------------------------- Dividend purification

export type PurificationInput = {
  dividend: number;
  nonCompliantIncome: number;
  totalRevenue: number;
  directRatio: number | null;
};

export function purification(input: PurificationInput) {
  const ratio =
    input.directRatio !== null
      ? clamp(input.directRatio / 100, 0, 1)
      : input.totalRevenue > 0
        ? clamp(input.nonCompliantIncome / input.totalRevenue, 0, 1)
        : 0;

  const amount = Math.max(0, input.dividend) * ratio;

  return {
    ratio,
    amount,
    compliant: Math.max(0, input.dividend) - amount,
  };
}

export function nisabFromMetal(pricePerGram: number, metal: 'gold' | 'silver'): number {
  const tola = metal === 'gold' ? 7.5 : 52.5;
  return pricePerGram * tola * 11.6638;
}

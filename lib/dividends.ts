/**
 * Dividend and corporate action arithmetic.
 *
 * Nothing here forecasts a payout. A dividend, a bonus issue and a rights
 * issue are all events declared by the company, and the tools apply the
 * figures the visitor enters.
 */

export type DividendHolding = {
  shares: number;
  /** Annual dividend per share, in rupees. */
  dps: number;
};

/** Annual dividend income across several holdings, after withholding. */
export function dividendIncome({
  holdings,
  taxRate,
  payouts,
}: {
  holdings: DividendHolding[];
  taxRate: number;
  payouts: number;
}) {
  const gross = holdings.reduce(
    (sum, holding) => sum + Math.max(0, holding.shares) * Math.max(0, holding.dps),
    0
  );
  const rate = Math.min(1, Math.max(0, taxRate));
  const tax = gross * rate;
  const net = gross - tax;
  const perPayout = payouts > 0 ? net / payouts : 0;

  return {
    gross,
    tax,
    net,
    perPayout,
    monthly: net / 12,
    effectiveRate: gross > 0 ? tax / gross : 0,
  };
}

/** Dividend per share when the company declares a percentage of face value. */
export function dpsFromFaceValue(faceValue: number, percent: number): number {
  return (Math.max(0, faceValue) * Math.max(0, percent)) / 100;
}

/** Current yield, yield on original cost and annual income for a holding. */
export function dividendYield({
  price,
  dps,
  cost,
  shares,
}: {
  price: number;
  dps: number;
  cost: number;
  shares: number;
}) {
  const dividend = Math.max(0, dps);

  return {
    dps: dividend,
    currentYield: price > 0 ? dividend / price : 0,
    yieldOnCost: cost > 0 ? dividend / cost : 0,
    annualIncome: Math.max(0, shares) * dividend,
    incomePerShare: dividend,
  };
}

export type DripPoint = {
  year: number;
  shares: number;
  dividends: number;
  value: number;
};

/**
 * Dividends reinvested at the prevailing price, with the payout and the price
 * each growing at their own rate. The schedule records the value at the end of
 * each year, after that year's price growth.
 */
export function drip({
  shares,
  price,
  dps,
  dividendGrowth,
  priceGrowth,
  years,
  taxRate,
}: {
  shares: number;
  price: number;
  dps: number;
  dividendGrowth: number;
  priceGrowth: number;
  years: number;
  taxRate: number;
}) {
  let currentShares = Math.max(0, shares);
  let currentPrice = Math.max(0, price);
  let currentDps = Math.max(0, dps);
  const rate = Math.min(1, Math.max(0, taxRate));

  let totalDividends = 0;
  let totalReinvested = 0;
  const schedule: DripPoint[] = [];
  const horizon = Math.max(1, Math.round(years));

  for (let year = 1; year <= horizon; year += 1) {
    const gross = currentShares * currentDps;
    const net = gross * (1 - rate);
    const bought = currentPrice > 0 ? net / currentPrice : 0;

    totalDividends += gross;
    totalReinvested += net;
    currentShares += bought;

    currentPrice *= 1 + priceGrowth;
    currentDps *= 1 + dividendGrowth;

    schedule.push({
      year,
      shares: currentShares,
      dividends: gross,
      value: currentShares * currentPrice,
    });
  }

  const finalValue = currentShares * currentPrice;
  const cashValue = Math.max(0, shares) * currentPrice + totalReinvested;

  return {
    finalShares: currentShares,
    finalPrice: currentPrice,
    finalValue,
    totalDividends,
    totalReinvested,
    cashValue,
    advantage: finalValue - cashValue,
    finalAnnualIncome: currentShares * currentDps,
    initialAnnualIncome: Math.max(0, shares) * Math.max(0, dps),
    schedule,
  };
}

/**
 * Theoretical ex-rights price and the value of the rights. The arithmetic
 * assumes the market values the old and new shares at the same price after the
 * issue, which is the definition of a theoretical price.
 */
export function rightsIssue({
  existingShares,
  price,
  newShares,
  forExisting,
  subscription,
}: {
  existingShares: number;
  price: number;
  newShares: number;
  forExisting: number;
  subscription: number;
}) {
  const ratio = forExisting > 0 ? Math.max(0, newShares) / forExisting : 0;
  const entitled = Math.max(0, existingShares) * ratio;
  const totalShares = Math.max(0, existingShares) + entitled;
  const existingValue = Math.max(0, existingShares) * Math.max(0, price);
  const subscriptionCost = entitled * Math.max(0, subscription);
  const totalValue = existingValue + subscriptionCost;
  const terp = totalShares > 0 ? totalValue / totalShares : 0;
  const valuePerNew = terp - Math.max(0, subscription);
  const valuePerExisting = Math.max(0, price) - terp;
  const totalRightsValue = entitled * valuePerNew;

  return {
    ratio,
    entitled,
    totalShares,
    existingValue,
    subscriptionCost,
    totalValue,
    terp,
    valuePerNew,
    valuePerExisting,
    totalRightsValue,
    discount: price > 0 ? (price - subscription) / price : 0,
    inTheMoney: terp > subscription,
  };
}

/**
 * Bonus issue or split. `factor` is the number of shares after the event for
 * each share held before it: 1.2 for a one for five bonus, 2 for a two for one
 * split. The total value is unchanged by construction.
 */
export function corporateAction({
  shares,
  price,
  cost,
  factor,
}: {
  shares: number;
  price: number;
  cost: number;
  factor: number;
}) {
  const applied = factor > 0 ? factor : 1;
  const newShares = Math.max(0, shares) * applied;
  const adjustedPrice = Math.max(0, price) / applied;
  const totalCost = Math.max(0, shares) * Math.max(0, cost);
  const adjustedCost = newShares > 0 ? totalCost / newShares : 0;
  const valueBefore = Math.max(0, shares) * Math.max(0, price);

  return {
    factor: applied,
    newShares,
    adjustedPrice,
    adjustedCost,
    totalCost,
    valueBefore,
    valueAfter: newShares * adjustedPrice,
  };
}

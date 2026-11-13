/**
 * PSX trading arithmetic.
 *
 * Two kinds of number live here. The first is pure geometry: pivots,
 * Fibonacci levels, position sizing, averaging and risk to reward. Those are
 * definitions, not opinions, and they do not change with a Finance Act.
 *
 * The second is cost. A PSX trade carries a broker commission, provincial
 * sales tax on that commission, and three small exchange and regulator levies.
 * The defaults come from the PSX Schedule of Charges and the minimum brokerage
 * scale in Annexure III of the PSX Regulations, but the commission itself is a
 * commercial agreement between you and your broker. Every rate is therefore an
 * input, and the tool never pretends to know your contract note.
 */

/** Charges on one side of a trade. */
export type SideCharges = {
  /** Trade value, price multiplied by shares. */
  value: number;
  commission: number;
  salesTaxOnCommission: number;
  /** Exchange, depository and regulator levies, before sales tax. */
  levies: number;
  salesTaxOnLevies: number;
  total: number;
};

export type BrokerageInput = {
  buyPrice: number;
  sellPrice: number;
  shares: number;
  /** Broker commission as a decimal, e.g. 0.0015 for 0.15%. */
  commissionPct: number;
  /** Per-share commission floor in rupees, e.g. 0.03 for 3 paisa. */
  commissionFloorPerShare: number;
  /** Provincial sales tax as a decimal, applied to commission and levies. */
  salesTaxPct: number;
  /** PSX trading fee in rupees per Rs 100,000 of value. */
  tradingFeePerLakh: number;
  /** PSX regulatory fee in rupees per Rs 100,000 of value. */
  regulatoryFeePerLakh: number;
  /** SECP levy in rupees per Rs 100,000 of value. */
  secpLevyPerLakh: number;
};

export type BrokerageResult = {
  buy: SideCharges;
  sell: SideCharges;
  buyCost: number;
  sellProceeds: number;
  totalCharges: number;
  grossProfit: number;
  netProfit: number;
  netReturn: number;
  breakEvenPrice: number;
  riseToBreakEven: number;
  /** Charges as a share of the buy value, both sides combined. */
  costPct: number;
};

export const psxChargeDefaults = {
  commissionPct: 0.0015,
  commissionFloorPerShare: 0.03,
  salesTaxPct: 0.15,
  tradingFeePerLakh: 3.5,
  regulatoryFeePerLakh: 0.62084,
  secpLevyPerLakh: 0.65,
} as const;

/** One side of a trade at a given value and share count. */
export function sideCharges(
  value: number,
  shares: number,
  input: Pick<
    BrokerageInput,
    'commissionPct' | 'commissionFloorPerShare' | 'salesTaxPct' | 'tradingFeePerLakh' | 'regulatoryFeePerLakh' | 'secpLevyPerLakh'
  >
): SideCharges {
  const safeValue = Number.isFinite(value) && value > 0 ? value : 0;
  const safeShares = Number.isFinite(shares) && shares > 0 ? shares : 0;

  const proportional = safeValue * input.commissionPct;
  const floor = safeShares * input.commissionFloorPerShare;
  const commission = Math.max(proportional, floor);
  const salesTaxOnCommission = commission * input.salesTaxPct;

  const levies =
    (safeValue / 100_000) *
    (input.tradingFeePerLakh + input.regulatoryFeePerLakh + input.secpLevyPerLakh);
  const salesTaxOnLevies = levies * input.salesTaxPct;

  return {
    value: safeValue,
    commission,
    salesTaxOnCommission,
    levies,
    salesTaxOnLevies,
    total: commission + salesTaxOnCommission + levies + salesTaxOnLevies,
  };
}

/**
 * Full round trip. The break-even price is solved rather than approximated,
 * because the per-share commission floor makes the cost curve non-linear at
 * small trade sizes.
 */
export function brokerageResult(input: BrokerageInput): BrokerageResult {
  const shares = Math.max(0, Math.floor(input.shares || 0));
  const buyValue = Math.max(0, input.buyPrice) * shares;
  const sellValue = Math.max(0, input.sellPrice) * shares;

  const buy = sideCharges(buyValue, shares, input);
  const sell = sideCharges(sellValue, shares, input);

  const buyCost = buy.value + buy.total;
  const sellProceeds = Math.max(0, sell.value - sell.total);
  const grossProfit = sellValue - buyValue;
  const netProfit = sellProceeds - buyCost;
  const netReturn = buyCost > 0 ? netProfit / buyCost : 0;

  const breakEvenPrice =
    shares > 0 && buyCost > 0
      ? solveBreakEven(shares, buyCost, input)
      : 0;

  return {
    buy,
    sell,
    buyCost,
    sellProceeds,
    totalCharges: buy.total + sell.total,
    grossProfit,
    netProfit,
    netReturn,
    breakEvenPrice,
    riseToBreakEven: input.buyPrice > 0 ? breakEvenPrice / input.buyPrice - 1 : 0,
    costPct: buyValue > 0 ? (buy.total + sell.total) / buyValue : 0,
  };
}

/** Bisection on the sale price until net proceeds cover the buy cost. */
function solveBreakEven(shares: number, buyCost: number, input: BrokerageInput): number {
  const net = (price: number) => {
    const value = price * shares;
    return value - sideCharges(value, shares, input).total;
  };

  let low = 0;
  let high = Math.max(input.buyPrice * 5, 1);

  for (let i = 0; i < 80; i += 1) {
    const mid = (low + high) / 2;
    if (net(mid) < buyCost) low = mid;
    else high = mid;
  }

  return (low + high) / 2;
}

export type Lot = { price: number; shares: number };

/** Weighted average cost across any number of buys. */
export function averagePrice(lots: Lot[]): { shares: number; cost: number; average: number } {
  let shares = 0;
  let cost = 0;

  for (const lot of lots) {
    const qty = Math.max(0, lot.shares || 0);
    shares += qty;
    cost += Math.max(0, lot.price || 0) * qty;
  }

  return { shares, cost, average: shares > 0 ? cost / shares : 0 };
}

/**
 * Shares needed at `buyPrice` to move the average to `targetAverage`.
 * Returns null when the target is unreachable from the current position.
 */
export function sharesToTargetAverage({
  currentShares,
  currentAverage,
  buyPrice,
  targetAverage,
}: {
  currentShares: number;
  currentAverage: number;
  buyPrice: number;
  targetAverage: number;
}): number | null {
  if (currentShares <= 0 || buyPrice <= 0 || targetAverage <= 0) return null;

  const denominator = targetAverage - buyPrice;
  if (denominator === 0) return null;

  const required = (currentShares * (currentAverage - targetAverage)) / denominator;
  if (!Number.isFinite(required) || required <= 0) return null;

  return Math.ceil(required);
}

export type PositionSizeResult = {
  riskAmount: number;
  riskPerShare: number;
  shares: number;
  positionValue: number;
  actualRisk: number;
  accountPct: number;
  valid: boolean;
};

/** Fixed-fractional position sizing from an entry and a stop. */
export function positionSize({
  accountSize,
  riskPct,
  entry,
  stop,
}: {
  accountSize: number;
  riskPct: number;
  entry: number;
  stop: number;
}): PositionSizeResult {
  const riskAmount = Math.max(0, accountSize) * Math.max(0, riskPct);
  const riskPerShare = entry - stop;
  const valid = entry > 0 && riskPerShare > 0 && riskAmount > 0;

  const shares = valid ? Math.floor(riskAmount / riskPerShare) : 0;
  const positionValue = shares * Math.max(0, entry);
  const actualRisk = shares * Math.max(0, riskPerShare);

  return {
    riskAmount,
    riskPerShare: Math.max(0, riskPerShare),
    shares,
    positionValue,
    actualRisk,
    accountPct: accountSize > 0 ? positionValue / accountSize : 0,
    valid,
  };
}

export type RiskRewardResult = {
  riskPerShare: number;
  rewardPerShare: number;
  ratio: number;
  breakEvenWinRate: number;
  expectancy: number;
  totalRisk: number;
  totalReward: number;
  valid: boolean;
};

/** Risk to reward, the win rate it needs, and expectancy at your own hit rate. */
export function riskReward({
  entry,
  stop,
  target,
  winRate,
  shares,
}: {
  entry: number;
  stop: number;
  target: number;
  winRate: number;
  shares: number;
}): RiskRewardResult {
  const riskPerShare = entry - stop;
  const rewardPerShare = target - entry;
  const valid = entry > 0 && riskPerShare > 0 && rewardPerShare > 0;
  const ratio = valid ? rewardPerShare / riskPerShare : 0;
  const breakEvenWinRate = ratio > 0 ? 1 / (1 + ratio) : 0;
  const expectancy = valid ? winRate * ratio - (1 - winRate) : 0;
  const qty = Math.max(0, shares);

  return {
    riskPerShare: Math.max(0, riskPerShare),
    rewardPerShare: Math.max(0, rewardPerShare),
    ratio,
    breakEvenWinRate,
    expectancy,
    totalRisk: Math.max(0, riskPerShare) * qty,
    totalReward: Math.max(0, rewardPerShare) * qty,
    valid,
  };
}

export type PivotMethod = 'classic' | 'fibonacci' | 'camarilla' | 'woodie' | 'demark';

export type PivotSet = {
  pivot: number;
  r1: number;
  r2: number;
  r3: number;
  r4?: number;
  s1: number;
  s2: number;
  s3: number;
  s4?: number;
};

export const pivotMethodLabels: Record<PivotMethod, string> = {
  classic: 'Classic',
  fibonacci: 'Fibonacci',
  camarilla: 'Camarilla',
  woodie: 'Woodie',
  demark: 'DeMark',
};

/**
 * Five published pivot families from one session of prices. Camarilla and
 * DeMark use different definitions of the central price, which is why they
 * produce different levels from the same high, low and close.
 */
export function pivotLevels({
  high,
  low,
  close,
  open,
}: {
  high: number;
  low: number;
  close: number;
  open: number;
}): Record<PivotMethod, PivotSet> {
  const range = high - low;
  const classicPivot = (high + low + close) / 3;
  const woodiePivot = (high + low + 2 * close) / 4;

  const demarkX =
    close < open ? high + 2 * low + close : close > open ? 2 * high + low + close : high + low + 2 * close;
  const demarkPivot = demarkX / 4;

  return {
    classic: {
      pivot: classicPivot,
      r1: 2 * classicPivot - low,
      r2: classicPivot + range,
      r3: high + 2 * (classicPivot - low),
      s1: 2 * classicPivot - high,
      s2: classicPivot - range,
      s3: low - 2 * (high - classicPivot),
    },
    fibonacci: {
      pivot: classicPivot,
      r1: classicPivot + 0.382 * range,
      r2: classicPivot + 0.618 * range,
      r3: classicPivot + range,
      s1: classicPivot - 0.382 * range,
      s2: classicPivot - 0.618 * range,
      s3: classicPivot - range,
    },
    camarilla: {
      pivot: close,
      r1: close + (range * 1.1) / 12,
      r2: close + (range * 1.1) / 6,
      r3: close + (range * 1.1) / 4,
      r4: close + (range * 1.1) / 2,
      s1: close - (range * 1.1) / 12,
      s2: close - (range * 1.1) / 6,
      s3: close - (range * 1.1) / 4,
      s4: close - (range * 1.1) / 2,
    },
    woodie: {
      pivot: woodiePivot,
      r1: 2 * woodiePivot - low,
      r2: woodiePivot + range,
      r3: high + 2 * (woodiePivot - low),
      s1: 2 * woodiePivot - high,
      s2: woodiePivot - range,
      s3: low - 2 * (high - woodiePivot),
    },
    demark: {
      pivot: demarkPivot,
      r1: demarkX / 2 - low,
      r2: 0,
      r3: 0,
      s1: demarkX / 2 - high,
      s2: 0,
      s3: 0,
    },
  };
}

export const fibRatios = {
  retracement: [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1],
  extension: [1.272, 1.618, 2, 2.618],
} as const;

export type FibLevel = { ratio: number; price: number; kind: 'retracement' | 'extension' };

/**
 * Retracement and extension levels between a swing.
 *
 * `direction: 'up'` means the swing travelled from low to high, so levels are
 * measured down from the high. `direction: 'down'` measures up from the low.
 */
export function fibLevels({
  low,
  high,
  direction,
}: {
  low: number;
  high: number;
  direction: 'up' | 'down';
}): FibLevel[] {
  const range = high - low;
  const at = (ratio: number) => (direction === 'up' ? high - range * ratio : low + range * ratio);

  return [
    ...fibRatios.retracement.map((ratio) => ({
      ratio,
      price: at(ratio),
      kind: 'retracement' as const,
    })),
    ...fibRatios.extension.map((ratio) => ({
      ratio,
      price: at(ratio),
      kind: 'extension' as const,
    })),
  ];
}

export type CircuitLocks = {
  upper: number;
  lower: number;
  upperMove: number;
  lowerMove: number;
  range: number;
  appliedPct: number;
};

/**
 * Security-wise circuit breaker. The band is a percentage of the previous
 * close with a rupee floor, and the exchange rounds to the nearest paisa.
 */
export function circuitLocks({
  previousClose,
  bandPct,
  floorAmount,
}: {
  previousClose: number;
  bandPct: number;
  /** Minimum rupee move, e.g. 1 for the ready market or 2 for odd lots. */
  floorAmount: number;
}): CircuitLocks {
  const close = Math.max(0, previousClose);
  const pct = Math.max(0, bandPct);
  const move = Math.max(close * pct, Math.max(0, floorAmount));

  const round = (value: number) => Math.round(value * 100) / 100;
  const upper = round(Math.max(0, close + move));
  const lower = round(Math.max(0, close - move));

  return {
    upper,
    lower,
    upperMove: close > 0 ? upper / close - 1 : 0,
    lowerMove: close > 0 ? lower / close - 1 : 0,
    range: upper - lower,
    appliedPct: close > 0 ? move / close : 0,
  };
}

/**
 * Stock valuation arithmetic.
 *
 * Every number here is a definition or a model, not a price target. The inputs
 * come from the visitor, the formulas are standard, and the assumptions are
 * printed next to the result.
 */

export type DcfPoint = {
  year: number;
  fcff: number;
  discountFactor: number;
  presentValue: number;
};

/**
 * Free cash flow to the firm, discounted at the cost of capital, with a
 * growing perpetuity after the explicit forecast. Equity value is enterprise
 * value less net debt; a negative net debt means the company holds more cash
 * than it owes.
 */
export function dcf({
  fcff,
  growth,
  years,
  discountRate,
  terminalGrowth,
  netDebt,
  shares,
  price,
}: {
  fcff: number;
  growth: number;
  years: number;
  discountRate: number;
  terminalGrowth: number;
  netDebt: number;
  shares: number;
  price: number;
}) {
  const horizon = Math.max(1, Math.round(years));
  const base = Math.max(0, fcff);
  const rate = discountRate;
  const stable = terminalGrowth;
  const terminalValid = rate > stable;
  const valid = base > 0 && shares > 0 && terminalValid;

  let current = base;
  let pvExplicit = 0;
  const schedule: DcfPoint[] = [];

  for (let year = 1; year <= horizon; year += 1) {
    current *= 1 + growth;
    const discountFactor = 1 / Math.pow(1 + rate, year);
    const presentValue = current * discountFactor;
    pvExplicit += presentValue;
    schedule.push({ year, fcff: current, discountFactor, presentValue });
  }

  const terminalValue = terminalValid ? (current * (1 + stable)) / (rate - stable) : 0;
  const pvTerminal = terminalValue / Math.pow(1 + rate, horizon);
  const enterpriseValue = pvExplicit + pvTerminal;
  const equityValue = enterpriseValue - netDebt;
  const valuePerShare = shares > 0 ? equityValue / shares : 0;
  const upside = price > 0 ? valuePerShare / price - 1 : 0;
  const marginOfSafety = valuePerShare > 0 ? (valuePerShare - price) / valuePerShare : 0;

  return {
    valid,
    horizon,
    schedule,
    finalFcff: current,
    pvExplicit,
    terminalValue,
    pvTerminal,
    enterpriseValue,
    equityValue,
    valuePerShare,
    upside,
    marginOfSafety,
    terminalShare: enterpriseValue > 0 ? pvTerminal / enterpriseValue : 0,
  };
}

/**
 * Graham number: the geometric mean of 15 times earnings and 1.5 times book
 * value. It is a screening ceiling for a defensive investor, not a fair value
 * for every business.
 */
export function grahamNumber({
  eps,
  bookValue,
  price,
}: {
  eps: number;
  bookValue: number;
  price: number;
}) {
  const valid = eps > 0 && bookValue > 0;
  const earningsCeiling = 15 * Math.max(0, eps);
  const bookCeiling = 1.5 * Math.max(0, bookValue);
  const value = valid ? Math.sqrt(earningsCeiling * bookCeiling) : 0;
  const upside = price > 0 && value > 0 ? value / price - 1 : 0;
  const marginOfSafety = value > 0 ? (value - price) / value : 0;

  return {
    valid,
    value,
    earningsCeiling,
    bookCeiling,
    pe: price > 0 && eps > 0 ? price / eps : 0,
    pb: price > 0 && bookValue > 0 ? price / bookValue : 0,
    upside,
    marginOfSafety,
  };
}

/**
 * P/E, earnings yield, PEG and the price implied by a target multiple. Growth
 * is a percentage number, so a 15% growth rate is passed as 15 and PEG is P/E
 * divided by 15.
 */
export function peRatio({
  price,
  eps,
  growth,
  targetPe,
}: {
  price: number;
  eps: number;
  growth: number;
  targetPe: number;
}) {
  const valid = price > 0 && eps > 0;
  const pe = eps > 0 ? price / eps : 0;
  const earningsYield = price > 0 ? eps / price : 0;
  const peg = pe > 0 && growth > 0 ? pe / growth : 0;
  const fairValue = eps > 0 && targetPe > 0 ? eps * targetPe : 0;
  const upside = price > 0 && fairValue > 0 ? fairValue / price - 1 : 0;

  return {
    valid,
    pe,
    earningsYield,
    peg,
    fairValue,
    rangeLow: fairValue * 0.9,
    rangeHigh: fairValue * 1.1,
    upside,
    impliedGrowth: pe,
  };
}

export type DdmPoint = { year: number; dps: number; presentValue: number };

function twoStageValue({
  dps,
  requiredReturn,
  highGrowth,
  stableGrowth,
  years,
}: {
  dps: number;
  requiredReturn: number;
  highGrowth: number;
  stableGrowth: number;
  years: number;
}) {
  const horizon = Math.max(1, Math.round(years));
  let current = Math.max(0, dps);
  let pvExplicit = 0;
  const schedule: DdmPoint[] = [];

  for (let year = 1; year <= horizon; year += 1) {
    current *= 1 + highGrowth;
    const discountFactor = 1 / Math.pow(1 + requiredReturn, year);
    const presentValue = current * discountFactor;
    pvExplicit += presentValue;
    schedule.push({ year, dps: current, presentValue });
  }

  const terminalValue =
    requiredReturn > stableGrowth
      ? (current * (1 + stableGrowth)) / (requiredReturn - stableGrowth)
      : 0;
  const pvTerminal = terminalValue / Math.pow(1 + requiredReturn, horizon);

  return {
    value: pvExplicit + pvTerminal,
    pvExplicit,
    pvTerminal,
    terminalValue,
    finalDps: current,
    schedule,
    horizon,
  };
}

/**
 * Dividend discount value under Gordon growth and a two-stage model, plus the
 * return implied by the current price under each model. The implied two-stage
 * return is solved by bisection because there is no closed form.
 */
export function ddm({
  dps,
  price,
  requiredReturn,
  stableGrowth,
  highGrowth,
  years,
}: {
  dps: number;
  price: number;
  requiredReturn: number;
  stableGrowth: number;
  highGrowth: number;
  years: number;
}) {
  const dividend = Math.max(0, dps);
  const gordonValid = requiredReturn > stableGrowth && dividend > 0;
  const gordonValue = gordonValid
    ? (dividend * (1 + stableGrowth)) / (requiredReturn - stableGrowth)
    : 0;

  const two = twoStageValue({
    dps: dividend,
    requiredReturn,
    highGrowth,
    stableGrowth,
    years,
  });
  const twoStageValid = requiredReturn > stableGrowth && dividend > 0;
  const twoStage = twoStageValid ? two.value : 0;

  const gordonImplied =
    price > 0 && dividend > 0
      ? (dividend * (1 + stableGrowth)) / price + stableGrowth
      : null;

  let twoStageImplied: number | null = null;
  if (price > 0 && dividend > 0 && stableGrowth < 1.5) {
    let low = Math.max(stableGrowth + 0.0001, -0.9999);
    let high = 1.5;
    const at = (rate: number) =>
      twoStageValue({
        dps: dividend,
        requiredReturn: rate,
        highGrowth,
        stableGrowth,
        years,
      }).value - price;

    let lowValue = at(low);
    let highValue = at(high);

    if (lowValue * highValue <= 0) {
      for (let i = 0; i < 200; i += 1) {
        const mid = (low + high) / 2;
        const midValue = at(mid);
        if (Math.abs(midValue) < 0.001) {
          twoStageImplied = mid;
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
      if (twoStageImplied === null) twoStageImplied = (low + high) / 2;
    }
  }

  return {
    gordonValid,
    gordonValue,
    twoStageValid,
    twoStage,
    twoStageSchedule: two.schedule,
    twoStagePvExplicit: two.pvExplicit,
    twoStagePvTerminal: two.pvTerminal,
    terminalShare: two.value > 0 ? two.pvTerminal / two.value : 0,
    gordonImplied,
    twoStageImplied,
    dividendYield: price > 0 ? dividend / price : 0,
    upside: price > 0 && twoStage > 0 ? twoStage / price - 1 : 0,
    marginOfSafety: twoStage > 0 ? (twoStage - price) / twoStage : 0,
  };
}

export type ShariahKey = 'debt' | 'investments' | 'income' | 'illiquid' | 'nla';

export type ShariahScreen = {
  key: ShariahKey;
  label: string;
  threshold: string;
  /** Ratio for the four accounting screens, or NLA per share for the price screen. */
  value: number;
  /** Unit for the displayed value. */
  unit: 'pct' | 'pkr';
  /** The share price for the NLA screen, used to show the comparison. */
  compareValue?: number;
  available: boolean;
  pass: boolean;
};

/**
 * The five financial screens published by PSX under the SECP-approved
 * methodology, plus the business screen. The thresholds are not assumptions:
 * they are the published criteria, and the source is cited on the page.
 */
export function shariahScreen({
  businessPermissible,
  totalAssets,
  interestBearingDebt,
  nonCompliantInvestments,
  totalRevenue,
  nonCompliantIncome,
  illiquidAssets,
  totalLiabilities,
  shares,
  price,
}: {
  businessPermissible: boolean;
  totalAssets: number;
  interestBearingDebt: number;
  nonCompliantInvestments: number;
  totalRevenue: number;
  nonCompliantIncome: number;
  illiquidAssets: number;
  totalLiabilities: number;
  shares: number;
  price: number;
}) {
  const assets = Math.max(0, totalAssets);
  const revenue = Math.max(0, totalRevenue);
  const shareCount = Math.max(0, shares);

  const debtRatio = assets > 0 ? Math.max(0, interestBearingDebt) / assets : 0;
  const investmentRatio = assets > 0 ? Math.max(0, nonCompliantInvestments) / assets : 0;
  const incomeRatio = revenue > 0 ? Math.max(0, nonCompliantIncome) / revenue : 0;
  const illiquidRatio = assets > 0 ? Math.max(0, illiquidAssets) / assets : 0;
  const nlaPerShare =
    shareCount > 0 ? (assets - Math.max(0, illiquidAssets) - Math.max(0, totalLiabilities)) / shareCount : 0;

  const screens: ShariahScreen[] = [
    {
      key: 'debt',
      label: 'Interest-bearing debt to total assets',
      threshold: 'Below 33%',
      value: debtRatio,
      unit: 'pct',
      available: assets > 0,
      pass: assets > 0 && debtRatio < 0.33,
    },
    {
      key: 'investments',
      label: 'Non-compliant investments to total assets',
      threshold: 'Below 33%',
      value: investmentRatio,
      unit: 'pct',
      available: assets > 0,
      pass: assets > 0 && investmentRatio < 0.33,
    },
    {
      key: 'income',
      label: 'Non-compliant income to total revenue',
      threshold: 'Below 5%',
      value: incomeRatio,
      unit: 'pct',
      available: revenue > 0,
      pass: revenue > 0 && incomeRatio < 0.05,
    },
    {
      key: 'illiquid',
      label: 'Illiquid assets to total assets',
      threshold: 'At least 25%',
      value: illiquidRatio,
      unit: 'pct',
      available: assets > 0,
      pass: assets > 0 && illiquidRatio >= 0.25,
    },
    {
      key: 'nla',
      label: 'Price against net liquid assets per share',
      threshold: 'Price at or above NLA',
      value: nlaPerShare,
      unit: 'pkr',
      compareValue: price,
      available: assets > 0 && shareCount > 0 && price > 0,
      pass: assets > 0 && shareCount > 0 && price > 0 && price >= nlaPerShare,
    },
  ];

  return {
    screens,
    businessPass: businessPermissible,
    overall: businessPermissible && screens.every((screen) => screen.available && screen.pass),
    debtRatio,
    investmentRatio,
    incomeRatio,
    illiquidRatio,
    nlaPerShare,
    purificationRatio: incomeRatio,
    failed: screens.filter((screen) => !screen.available || !screen.pass).map((screen) => screen.label),
  };
}

export type StockInput = {
  id: string;
  name: string;
  price: number;
  eps: number;
  bookValue: number;
  dps: number;
};

export type StockRow = StockInput & {
  pe: number | null;
  pb: number | null;
  dividendYield: number | null;
  roe: number | null;
  earningsYield: number | null;
};

/** Four comparable ratios per stock. A negative EPS or book value makes the ratio null. */
export function compareStocks(stocks: StockInput[]) {
  const rows: StockRow[] = stocks.map((stock) => ({
    ...stock,
    pe: stock.price > 0 && stock.eps > 0 ? stock.price / stock.eps : null,
    pb: stock.price > 0 && stock.bookValue > 0 ? stock.price / stock.bookValue : null,
    dividendYield: stock.price > 0 ? stock.dps / stock.price : null,
    roe: stock.bookValue > 0 ? stock.eps / stock.bookValue : null,
    earningsYield: stock.price > 0 ? stock.eps / stock.price : null,
  }));

  const values = (key: 'pe' | 'pb' | 'dividendYield' | 'roe') =>
    rows.map((row) => row[key]).filter((value): value is number => value !== null);

  const lowest = (key: 'pe' | 'pb') => {
    const list = values(key);
    return list.length > 0 ? Math.min(...list) : null;
  };

  const highest = (key: 'dividendYield' | 'roe') => {
    const list = values(key);
    return list.length > 0 ? Math.max(...list) : null;
  };

  return {
    rows,
    best: {
      pe: lowest('pe'),
      pb: lowest('pb'),
      dividendYield: highest('dividendYield'),
      roe: highest('roe'),
    },
  };
}

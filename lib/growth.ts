/**
 * Return, growth and withdrawal arithmetic.
 *
 * Every function here is a definition, not a forecast. Rates are inputs, and
 * nothing is smoothed: XIRR in particular uses the exact dates you give it,
 * because money that arrives earlier is worth more than money that arrives
 * later.
 */

export type Compounding = 'annual' | 'quarterly' | 'monthly';

export function periodsPerYear(frequency: Compounding): number {
  return frequency === 'annual' ? 1 : frequency === 'quarterly' ? 4 : 12;
}

export type LumpsumResult = {
  futureValue: number;
  growth: number;
  multiple: number;
  realValue: number;
  realRate: number;
  schedule: { year: number; value: number }[];
};

/**
 * Future value of a single amount, compounded at the chosen frequency, with an
 * optional inflation adjustment for the real value.
 */
export function lumpsum({
  principal,
  annualRate,
  years,
  inflation,
  frequency,
}: {
  principal: number;
  annualRate: number;
  years: number;
  inflation: number;
  frequency: Compounding;
}): LumpsumResult {
  const p = Math.max(0, principal);
  const r = annualRate;
  const n = periodsPerYear(frequency);
  const t = Math.max(0, years);

  const futureValue = p * Math.pow(1 + r / n, n * t);
  const realValue = futureValue / Math.pow(1 + inflation, t);
  const realRate = (1 + r) / (1 + inflation) - 1;

  const schedule: { year: number; value: number }[] = [];
  const step = Math.max(1, Math.ceil(t / 8));
  for (let year = 0; year <= t; year += step) {
    schedule.push({ year, value: p * Math.pow(1 + r / n, n * year) });
  }
  if (schedule[schedule.length - 1]?.year !== t) {
    schedule.push({ year: t, value: futureValue });
  }

  return {
    futureValue,
    growth: futureValue - p,
    multiple: p > 0 ? futureValue / p : 0,
    realValue,
    realRate,
    schedule,
  };
}

/** Compound annual growth rate between two values. */
export function cagr({
  initial,
  final,
  years,
}: {
  initial: number;
  final: number;
  years: number;
}): { rate: number; totalReturn: number; multiple: number; valid: boolean } {
  const valid = initial > 0 && final > 0 && years > 0;
  const multiple = initial > 0 ? final / initial : 0;
  const rate = valid ? Math.pow(final / initial, 1 / years) - 1 : 0;

  return { rate, totalReturn: multiple - 1, multiple, valid };
}

/** Value after `years` at a constant compound rate. */
export function projectGrowth({
  initial,
  rate,
  years,
}: {
  initial: number;
  rate: number;
  years: number;
}): number {
  return Math.max(0, initial) * Math.pow(1 + rate, Math.max(0, years));
}

/** Exact doubling time at a compound rate. */
export function doublingTime(rate: number): number {
  if (rate <= -1) return Infinity;
  if (rate === 0) return Infinity;
  return Math.log(2) / Math.log(1 + rate);
}

/** The compound rate that doubles money in a given number of years. */
export function rateToDouble(years: number): number {
  if (years <= 0) return 0;
  return Math.pow(2, 1 / years) - 1;
}

export type Cashflow = { date: string; amount: number };

/**
 * Money-weighted return from dated cashflows. Negative amounts are money in,
 * positive amounts are money out. Solved by bisection on the NPV curve, which
 * is slower than Newton but does not diverge on awkward cashflow patterns.
 */
export function xirr(cashflows: Cashflow[]): number | null {
  const flows = cashflows
    .filter((flow) => Number.isFinite(flow.amount) && flow.amount !== 0 && flow.date)
    .map((flow) => ({ time: Date.parse(flow.date), amount: flow.amount }))
    .filter((flow) => Number.isFinite(flow.time))
    .sort((a, b) => a.time - b.time);

  if (flows.length < 2) return null;
  if (!flows.some((flow) => flow.amount < 0) || !flows.some((flow) => flow.amount > 0)) return null;

  const start = flows[0].time;
  const years = flows.map((flow) => (flow.time - start) / (365 * 24 * 60 * 60 * 1000));

  const npv = (rate: number) =>
    flows.reduce((sum, flow, index) => sum + flow.amount / Math.pow(1 + rate, years[index]), 0);

  let low = -0.9999;
  let high = 10;
  let lowValue = npv(low);
  let highValue = npv(high);

  if (lowValue * highValue > 0) return null;

  for (let i = 0; i < 200; i += 1) {
    const mid = (low + high) / 2;
    const midValue = npv(mid);
    if (Math.abs(midValue) < 0.01) return mid;
    if (lowValue * midValue <= 0) {
      high = mid;
      highValue = midValue;
    } else {
      low = mid;
      lowValue = midValue;
    }
  }

  return (low + high) / 2;
}

export type SwpResult = {
  monthsLasted: number;
  exhausted: boolean;
  totalWithdrawn: number;
  finalBalance: number;
  monthlyRate: number;
  schedule: { year: number; balance: number; withdrawn: number }[];
};

/**
 * Systematic withdrawals, month by month. The balance earns the monthly
 * equivalent of the annual rate before the withdrawal is taken.
 */
export function swp({
  corpus,
  annualRate,
  monthlyWithdrawal,
  years,
}: {
  corpus: number;
  annualRate: number;
  monthlyWithdrawal: number;
  years: number;
}): SwpResult {
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  const horizon = Math.max(1, Math.round(years * 12));
  const withdrawal = Math.max(0, monthlyWithdrawal);

  let balance = Math.max(0, corpus);
  let monthsLasted = 0;
  let totalWithdrawn = 0;
  const schedule: { year: number; balance: number; withdrawn: number }[] = [];

  for (let month = 1; month <= horizon; month += 1) {
    balance *= 1 + monthlyRate;
    const taken = Math.min(balance, withdrawal);
    balance -= taken;
    totalWithdrawn += taken;
    monthsLasted = month;

    if (month % 12 === 0 || month === horizon || balance <= 0) {
      schedule.push({ year: month / 12, balance, withdrawn: totalWithdrawn });
    }

    if (balance <= 0) break;
  }

  return {
    monthsLasted,
    exhausted: balance <= 0 && totalWithdrawn > 0,
    totalWithdrawn,
    finalBalance: Math.max(0, balance),
    monthlyRate,
    schedule,
  };
}

/**
 * The fixed monthly withdrawal that exactly exhausts the corpus at the horizon.
 * This is the inverse of the SWP simulation, solved in closed form.
 */
export function sustainableWithdrawal({
  corpus,
  annualRate,
  years,
}: {
  corpus: number;
  annualRate: number;
  years: number;
}): number {
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  const months = Math.max(1, Math.round(years * 12));
  if (monthlyRate <= 0) return Math.max(0, corpus) / months;

  return (Math.max(0, corpus) * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

/** What an amount becomes after inflation, and what a future amount is worth today. */
export function inflationAdjust({
  amount,
  rate,
  years,
}: {
  amount: number;
  rate: number;
  years: number;
}): { futureCost: number; todayValue: number; change: number } {
  const factor = Math.pow(1 + rate, Math.max(0, years));
  const futureCost = Math.max(0, amount) * factor;
  const todayValue = factor > 0 ? Math.max(0, amount) / factor : 0;

  return { futureCost, todayValue, change: factor - 1 };
}

/** Convert an amount between two CPI readings. */
export function cpiAdjust({
  amount,
  cpiStart,
  cpiEnd,
}: {
  amount: number;
  cpiStart: number;
  cpiEnd: number;
}): { equivalent: number; change: number; valid: boolean } {
  const valid = cpiStart > 0 && cpiEnd > 0;
  const equivalent = valid ? (Math.max(0, amount) * cpiEnd) / cpiStart : 0;

  return { equivalent, change: valid ? cpiEnd / cpiStart - 1 : 0, valid };
}

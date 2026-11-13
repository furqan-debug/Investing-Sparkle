/**
 * Free tools registry.
 *
 * Every calculator lives in exactly one category. `status: 'soon'` renders as a
 * disabled card and is excluded from the sitemap, so a tool only appears as
 * openable once it actually works. The phase field is for our own sequencing,
 * not for display.
 */

export type ToolStatus = 'live' | 'soon';

export type ToolCategory = {
  slug: string;
  name: string;
  /** One line used on category cards. */
  description: string;
  /** Longer intro for the category page. */
  intro: string;
  /** lucide-react icon name, mapped in the UI. */
  icon: string;
};

export type Tool = {
  slug: string;
  name: string;
  blurb: string;
  outcome: string;
  status: ToolStatus;
  category: string;
  featured?: boolean;
  /** Shown in the "Start here" strip on the tools hub. */
  essential?: boolean;
  phase?: number;
};

export const toolCategories: ToolCategory[] = [
  {
    slug: 'tax-zakat',
    name: 'Tax & Zakat',
    description: 'Salary, business, rent, capital gains, property, dividends and zakat.',
    intro:
      'Pakistan tax is not one rate. It depends on the kind of income, the date you bought, and whether your name is on the Active Taxpayers List. These tools use the 2026-27 Finance Act figures, show the working, and name the source.',
    icon: 'Landmark',
  },
  {
    slug: 'psx-trading',
    name: 'PSX Trading',
    description: 'Brokerage, position size, pivots, Fibonacci and daily price limits.',
    intro:
      'The arithmetic that decides whether a trade is worth taking: what it costs, how much you are risking, where the stop sits, and where the exchange will stop the price moving.',
    icon: 'ChartCandlestick',
  },
  {
    slug: 'returns-growth',
    name: 'Returns & Growth',
    description: 'SIP, lump sum, compounding, CAGR, XIRR, inflation and withdrawals.',
    intro:
      'Returns are easy to feel and hard to measure. These tools put contributions, dividends, inflation and time on the same page so the number you compare is the number that matters.',
    icon: 'TrendingUp',
  },
  {
    slug: 'dividends-corporate-actions',
    name: 'Dividends & Corporate Actions',
    description: 'Dividend income, yield, reinvestment, rights, bonus shares and splits.',
    intro:
      'A dividend is not free money and a bonus issue is not a gain. Work out what actually reaches your account, what a rights issue costs you, and what a split does to your average price.',
    icon: 'Coins',
  },
  {
    slug: 'stock-valuation',
    name: 'Stock Valuation',
    description: 'DCF, Graham number, P/E, dividend models and Shariah screening.',
    intro:
      'Price tells you what the market wants. Value tells you what the business earns. These tools estimate the second so you can judge the first, with the assumptions left visible.',
    icon: 'Scale',
  },
  {
    slug: 'savings-bonds',
    name: 'Savings, NSS & Bonds',
    description: 'National Savings, T-bills, PIBs, Sukuk and bank deposits after tax.',
    intro:
      'The return you are quoted is not the return you keep. Compare certificates, bills and deposits on after-tax profit, and see what a difference a filer status makes.',
    icon: 'Banknote',
  },
  {
    slug: 'planning-retirement',
    name: 'Planning & Retirement',
    description: 'Goals, retirement, VPS, gratuity, provident fund, EOBI and net worth.',
    intro:
      'A goal without a monthly number is a wish. These tools turn Hajj, a house, a child’s education or retirement into the amount you need to put away, and show what happens if you start later.',
    icon: 'Target',
  },
  {
    slug: 'loans-financing',
    name: 'Loans & Financing',
    description: 'Loan EMI, car finance and home finance at KIBOR-linked rates.',
    intro:
      'A monthly instalment hides the total cost. See the interest, the amortisation, and how much a KIBOR change adds over the life of a car or home finance facility.',
    icon: 'House',
  },
  {
    slug: 'gold-currency',
    name: 'Gold & Currency',
    description: 'Gold and silver value, tola conversions and PKR exchange rates.',
    intro:
      'Gold is quoted in dollars an ounce, sold in tolas, and held in grams. These tools convert between all three at the current Pakistan rate, with the feed and timestamp shown.',
    icon: 'Gem',
  },
];

export const tools: Tool[] = [
  // ---------------------------------------------------------------- Tax & Zakat
  {
    slug: 'salary-income-tax-calculator',
    name: 'Salary Income Tax Calculator 2026-27',
    blurb:
      'Monthly and annual salary tax under the Finance Act 2026 slabs, with zakat, donations and pension credits.',
    outcome: 'Annual tax, monthly take-home, effective rate and a slab-by-slab breakdown.',
    status: 'live',
    category: 'tax-zakat',
    featured: true,
    essential: true,
    phase: 1,
  },
  {
    slug: 'business-income-tax-calculator',
    name: 'Business & Freelancer Income Tax Calculator',
    blurb:
      'Tax for non-salaried individuals, sole proprietors, AOPs, professional firms and freelancers.',
    outcome: 'Slab tax, surcharge, professional-firm cap, and the balance still to pay.',
    status: 'live',
    category: 'tax-zakat',
    featured: true,
    phase: 1,
  },
  {
    slug: 'rental-income-tax-calculator',
    name: 'Rental Income Tax Calculator',
    blurb:
      'Tax on rent for individuals, AOPs and companies after Section 15A deductions and tenant withholding.',
    outcome: 'Tax withheld, net rent, estimated final liability and any refund due.',
    status: 'live',
    category: 'tax-zakat',
    phase: 1,
  },
  {
    slug: 'psx-capital-gains-tax-calculator',
    name: 'Capital Gains Tax Calculator for PSX Shares',
    blurb:
      'CGT on listed shares and mutual funds for filers and non-filers, set by purchase date and holding period.',
    outcome: 'The rate that applies, tax on the gain, and what you keep after NCCPL.',
    status: 'live',
    category: 'tax-zakat',
    featured: true,
    phase: 1,
  },
  {
    slug: 'dividend-tax-calculator',
    name: 'Dividend Tax Calculator',
    blurb:
      'Withholding tax on dividends from shares, IPPs, REITs and mutual funds, filer and non-filer.',
    outcome: 'Gross dividend, tax withheld, net received and yield on your cost.',
    status: 'live',
    category: 'tax-zakat',
    phase: 1,
  },
  {
    slug: 'property-transfer-tax-calculator',
    name: 'Property Transfer Tax Calculator',
    blurb:
      'Buyer and seller advance tax under Sections 236K and 236C, plus capital gains tax on the property.',
    outcome: 'Each side’s transfer tax, the CGT on the gain, and the total cost of selling.',
    status: 'live',
    category: 'tax-zakat',
    featured: true,
    phase: 1,
  },
  {
    slug: 'zakat-calculator',
    name: 'Zakat Calculator',
    blurb:
      'Zakat on cash, gold, silver, shares, mutual funds and business stock, with a live nisab estimate.',
    outcome: 'A full liability sheet with nisab status and the amount due at 2.5%.',
    status: 'live',
    category: 'tax-zakat',
    featured: true,
    essential: true,
    phase: 1,
  },
  {
    slug: 'dividend-purification-calculator',
    name: 'Dividend Purification Calculator',
    blurb:
      'The charity amount needed to purify dividends and gains from Shariah-compliant stocks.',
    outcome: 'The purification ratio, the amount to give, and the method in plain steps.',
    status: 'live',
    category: 'tax-zakat',
    phase: 1,
  },

  // ---------------------------------------------------------------- PSX Trading
  {
    slug: 'psx-brokerage-calculator',
    name: 'PSX Brokerage & Trading Profit Calculator',
    blurb:
      'Every fee on a PSX trade: commission, sales tax, PSX levies and SECP, then net profit.',
    outcome: 'Round-trip cost, net profit, break-even price and the move you need.',
    status: 'live',
    category: 'psx-trading',
    featured: true,
    phase: 2,
  },
  {
    slug: 'stock-average-price-calculator',
    name: 'Stock Average Price Calculator',
    blurb:
      'Average cost across multiple buys, plus the shares needed to reach a target average.',
    outcome: 'Weighted average cost and the capital required to average down or up.',
    status: 'live',
    category: 'psx-trading',
    phase: 2,
  },
  {
    slug: 'position-size-calculator',
    name: 'Position Size Calculator',
    blurb:
      'How many shares to buy from your account size, risk budget and stop-loss level.',
    outcome: 'Share quantity, capital at risk and the position value at your entry.',
    status: 'live',
    category: 'psx-trading',
    featured: true,
    phase: 2,
  },
  {
    slug: 'risk-reward-calculator',
    name: 'Risk Reward & Stop Loss Calculator',
    blurb:
      'Risk-to-reward ratio, stop and target prices, and the win rate the setup needs.',
    outcome: 'Reward per rupee risked and the minimum hit rate to break even.',
    status: 'live',
    category: 'psx-trading',
    phase: 2,
  },
  {
    slug: 'pivot-point-calculator',
    name: 'Pivot Point Calculator',
    blurb:
      'Classic, Fibonacci, Camarilla, Woodie and DeMark pivot levels from one day of prices.',
    outcome: 'Support and resistance levels for the next session, in one table.',
    status: 'live',
    category: 'psx-trading',
    phase: 2,
  },
  {
    slug: 'fibonacci-retracement-calculator',
    name: 'Fibonacci Retracement Calculator',
    blurb:
      'Retracement and extension levels between any swing high and swing low.',
    outcome: 'Every key Fibonacci level with the price and distance from the swing.',
    status: 'live',
    category: 'psx-trading',
    phase: 2,
  },
  {
    slug: 'psx-circuit-lock-calculator',
    name: 'PSX Upper & Lower Lock Calculator',
    blurb:
      'Daily circuit breaker limits for a PSX stock, calculated from the previous close.',
    outcome: 'Upper and lower lock prices and the rupee range for the session.',
    status: 'live',
    category: 'psx-trading',
    phase: 2,
  },

  // -------------------------------------------------------------- Returns & Growth
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    blurb:
      'What a fixed monthly investment becomes over time, including yearly step-ups.',
    outcome: 'Projected corpus, contributions, growth and the cost of starting late.',
    status: 'live',
    category: 'returns-growth',
    featured: true,
    essential: true,
  },
  {
    slug: 'lumpsum-calculator',
    name: 'Lumpsum Investment Calculator',
    blurb:
      'Future value of a one-time investment, before and after inflation.',
    outcome: 'Nominal value, real value and the growth split.',
    status: 'live',
    category: 'returns-growth',
  },
  {
    slug: 'compounding-calculator',
    name: 'Compounding Calculator',
    blurb:
      'Compounding on any schedule, with regular additions and a clear growth split.',
    outcome: 'Future value, total growth and how much came from contributions.',
    status: 'live',
    category: 'returns-growth',
    featured: true,
  },
  {
    slug: 'cagr-calculator',
    name: 'CAGR Calculator',
    blurb:
      'Compound annual growth rate between two values, or the future value from a target CAGR.',
    outcome: 'The annualised return and the years or value you need to get there.',
    status: 'live',
    category: 'returns-growth',
  },
  {
    slug: 'xirr-calculator',
    name: 'XIRR Calculator',
    blurb:
      'Annualised return on irregular buys, sells and dividends using exact dates.',
    outcome: 'Money-weighted return for a real portfolio, not a smoothed average.',
    status: 'live',
    category: 'returns-growth',
    featured: true,
  },
  {
    slug: 'psx-stock-return-calculator',
    name: 'PSX Stock Return Calculator',
    blurb:
      'What a historical lump sum or monthly investment in a PSX stock would be worth today.',
    outcome: 'Actual price history, total return and the annualised figure.',
    status: 'soon',
    category: 'returns-growth',
    phase: 3,
  },
  {
    slug: 'kse100-return-calculator',
    name: 'KSE-100 Return Calculator',
    blurb:
      'KSE-100 returns between two dates, annualised and adjusted for inflation.',
    outcome: 'Index return, real return and the purchasing power gained or lost.',
    status: 'soon',
    category: 'returns-growth',
    phase: 3,
  },
  {
    slug: 'inflation-calculator',
    name: 'Inflation Calculator Pakistan',
    blurb:
      'Move an amount forward at a chosen inflation rate, or convert between two CPI index readings.',
    outcome: 'Future cost, today’s value and the purchasing power change.',
    status: 'live',
    category: 'returns-growth',
  },
  {
    slug: 'rule-of-72-calculator',
    name: 'Rule of 72 Calculator',
    blurb:
      'How many years an investment takes to double at a given return, and the rate needed.',
    outcome: 'Doubling time and the return required to hit a target date.',
    status: 'live',
    category: 'returns-growth',
  },
  {
    slug: 'swp-calculator',
    name: 'SWP Calculator',
    blurb:
      'Systematic monthly withdrawals from an investment and how long the balance lasts.',
    outcome: 'Withdrawal schedule, balance path and the month the money runs out.',
    status: 'live',
    category: 'returns-growth',
  },
  {
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    blurb:
      'What a position actually returned, including dividends and costs rather than price alone.',
    outcome: 'Total return, annualised return and where the return came from.',
    status: 'live',
    category: 'returns-growth',
  },

  // ------------------------------------------- Dividends & Corporate Actions
  {
    slug: 'dividend-income-calculator',
    name: 'Dividend Income Calculator',
    blurb:
      'Net dividend income after withholding tax, per payout and across the year.',
    outcome: 'Gross, tax withheld and the cash that actually reaches your account.',
    status: 'live',
    category: 'dividends-corporate-actions',
    featured: true,
  },
  {
    slug: 'dividend-yield-calculator',
    name: 'Dividend Yield Calculator',
    blurb:
      'Dividend yield and yield on cost for any PSX stock from its latest annual payout.',
    outcome: 'Current yield, yield on your original cost and income per share.',
    status: 'live',
    category: 'dividends-corporate-actions',
  },
  {
    slug: 'drip-calculator',
    name: 'Dividend Reinvestment (DRIP) Calculator',
    blurb:
      'How reinvesting dividends and growing payouts compounds a PSX holding over time.',
    outcome: 'Share count, income growth and the value of reinvesting versus taking cash.',
    status: 'live',
    category: 'dividends-corporate-actions',
  },
  {
    slug: 'right-shares-calculator',
    name: 'Right Shares Calculator',
    blurb:
      'Theoretical ex-right price, subscription cost and the value of the rights.',
    outcome: 'Ex-right price, what the issue costs and whether the rights are worth taking.',
    status: 'live',
    category: 'dividends-corporate-actions',
  },
  {
    slug: 'bonus-split-calculator',
    name: 'Bonus Shares & Stock Split Calculator',
    blurb:
      'New share count, adjusted price and average cost after a bonus issue or split.',
    outcome: 'Share count, adjusted cost per share and the value that did not change.',
    status: 'live',
    category: 'dividends-corporate-actions',
  },

  // -------------------------------------------------------------- Stock Valuation
  {
    slug: 'dcf-calculator',
    name: 'Intrinsic Value (DCF) Calculator',
    blurb:
      'Discounted cash-flow value per share, with a margin of safety and editable assumptions.',
    outcome: 'Intrinsic value, the gap to price and the margin of safety.',
    status: 'live',
    category: 'stock-valuation',
    featured: true,
  },
  {
    slug: 'graham-number-calculator',
    name: 'Graham Number Calculator',
    blurb:
      'Benjamin Graham’s fair value from EPS and book value per share for PSX stocks.',
    outcome: 'The Graham number, the upside or downside, and the inputs used.',
    status: 'live',
    category: 'stock-valuation',
  },
  {
    slug: 'pe-ratio-calculator',
    name: 'P/E Ratio & Fair Price Calculator',
    blurb:
      'P/E, earnings yield, PEG ratio and the share price implied by a target P/E.',
    outcome: 'Where the stock trades, what growth it implies, and a target-price range.',
    status: 'live',
    category: 'stock-valuation',
  },
  {
    slug: 'dividend-discount-calculator',
    name: 'Dividend Discount Model Calculator',
    blurb:
      'Value dividend-paying PSX stocks with Gordon growth and a two-stage model.',
    outcome: 'Model value per share under both methods and the implied return.',
    status: 'live',
    category: 'stock-valuation',
  },
  {
    slug: 'shariah-compliance-checker',
    name: 'Shariah Compliance Checker',
    blurb:
      'Test a company against the published PSX Shariah screening financial ratios.',
    outcome: 'Pass or fail on each ratio, the non-compliant income share and what to do next.',
    status: 'live',
    category: 'stock-valuation',
    featured: true,
  },
  {
    slug: 'compare-psx-stocks',
    name: 'Compare PSX Stocks',
    blurb:
      'Compare two to four PSX stocks across price, returns, valuation, dividends and profitability.',
    outcome: 'A side-by-side table with the strongest and weakest metric for each stock.',
    status: 'live',
    category: 'stock-valuation',
  },

  // ------------------------------------------------------------ Savings & Bonds
  {
    slug: 'nss-profit-calculator',
    name: 'National Savings (NSS) Profit Calculator',
    blurb:
      'After-tax profit on Behbood, Defence, Regular Income, Special and Short Term certificates.',
    outcome: 'Maturity value, profit after tax and the effective annual return.',
    status: 'soon',
    category: 'savings-bonds',
    featured: true,
    phase: 6,
  },
  {
    slug: 't-bill-calculator',
    name: 'T-Bill Calculator',
    blurb:
      'Price, yield and after-tax profit on Pakistan Treasury Bills using recent auction yields.',
    outcome: 'The discounted price, the gain at maturity and the annualised yield.',
    status: 'soon',
    category: 'savings-bonds',
    phase: 6,
  },
  {
    slug: 'pib-bond-yield-calculator',
    name: 'PIB & Bond Yield Calculator',
    blurb:
      'Yield to maturity, price and coupon income on PIBs, Sukuk and TFCs.',
    outcome: 'YTM, clean and dirty price, and the income across the remaining life.',
    status: 'soon',
    category: 'savings-bonds',
    phase: 6,
  },
  {
    slug: 'bank-term-deposit-calculator',
    name: 'Bank Term Deposit Calculator',
    blurb:
      'Monthly or maturity profit on bank term deposits and savings accounts after withholding tax.',
    outcome: 'Profit after tax, maturity value and the effective annual rate.',
    status: 'soon',
    category: 'savings-bonds',
    phase: 6,
  },

  // --------------------------------------------------------- Planning & Retirement
  {
    slug: 'goal-planner',
    name: 'Goal Planner',
    blurb:
      'The monthly investment required to fund Hajj, a wedding, a car, a home or education.',
    outcome: 'Monthly saving needed, the gap at your current pace and the effect of inflation.',
    status: 'soon',
    category: 'planning-retirement',
    featured: true,
    phase: 7,
  },
  {
    slug: 'retirement-calculator',
    name: 'Retirement Calculator',
    blurb:
      'The total savings needed to retire and the monthly investment required to reach it.',
    outcome: 'Retirement corpus, monthly contribution and the shortfall at your current rate.',
    status: 'soon',
    category: 'planning-retirement',
    featured: true,
    phase: 7,
  },
  {
    slug: 'vps-pension-calculator',
    name: 'VPS Pension Calculator',
    blurb:
      'Voluntary Pension System growth, annual tax credit and the pension it can pay.',
    outcome: 'Projected balance, tax saved and a sustainable monthly pension.',
    status: 'soon',
    category: 'planning-retirement',
    phase: 7,
  },
  {
    slug: 'gratuity-calculator',
    name: 'Gratuity Calculator',
    blurb:
      'Gratuity from last drawn salary and years of service, including the tax-free limit.',
    outcome: 'Gratuity payable, the exempt portion and the tax on the excess.',
    status: 'soon',
    category: 'planning-retirement',
    phase: 7,
  },
  {
    slug: 'provident-fund-calculator',
    name: 'Provident Fund Calculator',
    blurb:
      'Projected provident fund balance from employee and employer contributions at retirement.',
    outcome: 'Balance at retirement, the split between contributions and profit.',
    status: 'soon',
    category: 'planning-retirement',
    phase: 7,
  },
  {
    slug: 'eobi-pension-calculator',
    name: 'EOBI Pension Calculator',
    blurb:
      'EOBI old-age pension, contribution history and eligibility in plain numbers.',
    outcome: 'Estimated monthly pension and the contributions behind it.',
    status: 'soon',
    category: 'planning-retirement',
    phase: 7,
  },
  {
    slug: 'net-worth-calculator',
    name: 'Net Worth Calculator',
    blurb:
      'Total assets minus liabilities, with an asset allocation breakdown.',
    outcome: 'Net worth, liquid vs illiquid assets and where your money sits.',
    status: 'soon',
    category: 'planning-retirement',
    phase: 7,
  },
  {
    slug: 'emergency-fund-calculator',
    name: 'Emergency Fund Calculator',
    blurb:
      'The cash cushion you need and how long it will take to build at your savings rate.',
    outcome: 'Target fund, months covered and a month-by-month build plan.',
    status: 'soon',
    category: 'planning-retirement',
    phase: 7,
  },
  {
    slug: 'risk-profile',
    name: 'Risk Profile Quiz',
    blurb:
      'Eight questions that tell you what kind of investor you are before you put money at risk.',
    outcome: 'Your risk profile, an asset allocation blueprint, and what both mean.',
    status: 'live',
    category: 'planning-retirement',
    essential: true,
  },

  // ------------------------------------------------------------- Loans & Financing
  {
    slug: 'loan-emi-calculator',
    name: 'Loan EMI Calculator',
    blurb:
      'Monthly instalment, total interest and a full amortisation schedule for any loan.',
    outcome: 'EMI, total cost, interest share and the year-by-year balance.',
    status: 'soon',
    category: 'loans-financing',
    featured: true,
    phase: 8,
  },
  {
    slug: 'car-financing-calculator',
    name: 'Car Financing Calculator',
    blurb:
      'Auto loan instalments from KIBOR plus spread, down payment and Takaful or insurance.',
    outcome: 'Monthly payment, total finance cost and the on-road price you can afford.',
    status: 'soon',
    category: 'loans-financing',
    phase: 8,
  },
  {
    slug: 'home-finance-calculator',
    name: 'Home Finance Calculator',
    blurb:
      'Instalments, borrowing eligibility and total cost for a KIBOR-linked mortgage.',
    outcome: 'Monthly payment, maximum finance and the cost of a rate change.',
    status: 'soon',
    category: 'loans-financing',
    phase: 8,
  },

  // ---------------------------------------------------------------- Gold & Currency
  {
    slug: 'gold-price-calculator',
    name: 'Gold Price Calculator',
    blurb:
      'Gold and silver value by tola, gram or ounce across karats at the live Pakistan rate.',
    outcome: 'Value by weight and karat, with the feed, timestamp and making charge.',
    status: 'soon',
    category: 'gold-currency',
    featured: true,
    phase: 8,
  },
  {
    slug: 'tola-gram-converter',
    name: 'Tola to Gram Converter',
    blurb:
      'Convert between tola, gram, masha, ratti and ounce without rounding surprises.',
    outcome: 'The exact weight in every unit, in one glance.',
    status: 'soon',
    category: 'gold-currency',
    phase: 8,
  },
  {
    slug: 'pkr-currency-converter',
    name: 'PKR Currency Converter',
    blurb:
      'Convert Pakistani rupees to and from foreign currencies at the current exchange rate.',
    outcome: 'The converted amount, the rate used and when it was last updated.',
    status: 'soon',
    category: 'gold-currency',
    phase: 8,
  },
];

export const liveTools = tools.filter((t) => t.status === 'live');

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getCategory(slug: string): ToolCategory | undefined {
  return toolCategories.find((c) => c.slug === slug);
}

export function toolsInCategory(slug: string): Tool[] {
  return tools.filter((t) => t.category === slug);
}

export function categoryCount(slug: string) {
  const all = toolsInCategory(slug);
  return { total: all.length, live: all.filter((t) => t.status === 'live').length };
}

export const essentialTools = tools.filter((t) => t.essential);

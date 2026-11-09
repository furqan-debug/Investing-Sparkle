import type { Article } from '../types';

/**
 * Analysis — how to evaluate a company rather than react to a price.
 *
 * These deliberately avoid naming specific PSX companies as buy or sell
 * candidates. Where a company type is described, it illustrates a method.
 */

export const analysisArticles: Article[] = [
  {
    slug: 'reading-a-pakistani-annual-report',
    title: "How to read a Pakistani annual report in 2027: a forensic guide",
    description:
      'Read a PSX company annual report in 2027 like an analyst: financial statements, related-party deals, audit opinions, cash flow and the traps every year.',
    category: 'Intermediate',
    publishedAt: '2027-02-21',
    updatedAt: '2027-02-21',
    readingMinutes: 11,
    author: 'Investing Sparkle',
    related: ['understanding-pe-roe-and-other-ratios', 'how-to-value-a-stock'],
    body: [
      {
        type: 'p',
        text: 'An annual report is the single best free document available to a retail investor, and almost nobody reads one properly. They have two hundred pages and a glossy cover, but the actual truth lives in far fewer pages than that.',
      },
      { type: 'h2', text: 'Read it backwards' },
      {
        type: 'p',
        text: 'The front of the report is decoration: photographs of buildings and a chairman’s message written by people whose bonuses depend on how it reads. The back is audited. Start with the auditor, then the statements, then the notes. Then go back and read the chairman telling the story, and you will understand which parts of it you can actually trust.',
      },
      { type: 'h2', text: "The auditor's report, in thirty seconds" },
      {
        type: 'p',
        text: 'You want one thing: an unqualified opinion. That means the auditors are satisfied the statements present a true and fair view.',
      },
      {
        type: 'p',
        text: 'Anything else deserves your full attention. A qualified opinion, an emphasis of matter, or a going-concern paragraph is the auditor telling you something specific in careful language. Read it twice.',
      },
      {
        type: 'callout',
        text: 'Check the key audit matters too. They name the areas the auditors found hardest to test, which is a free map of where the accounting risk sits.',
      },
      { type: 'h2', text: 'The three statements, and what each answers' },
      { type: 'h3', text: 'The profit and loss account' },
      {
        type: 'p',
        text: 'Did the company make money this year? Work down the lines. Revenue shows whether the business is growing. Gross profit shows pricing power. Operating profit shows cost control. Finance cost shows what its debt did to it, which is a live question in a high-rate environment.',
      },
      {
        type: 'p',
        text: 'Compare every line against the prior year, printed right alongside. A company whose revenue rose 20% while gross profit rose 4% is telling you something about margins before it says anything else.',
      },
      { type: 'h3', text: 'The balance sheet' },
      {
        type: 'p',
        text: 'What does the company own and what does it owe? For a beginner, debt is the line that matters most, especially short-term borrowings, which need refinancing soon at whatever interest rate happens to be prevailing then.',
      },
      {
        type: 'p',
        text: 'Also watch receivables and inventory relative to revenue. Revenue up 10% with receivables up 40% is a company booking sales it has not been paid for. That gap is where a lot of unpleasant surprises are manufactured.',
      },
      { type: 'h3', text: 'The cash flow statement' },
      {
        type: 'p',
        text: 'Did any actual money arrive? This is the statement most people skip and the one experienced investors open first. Profit is an opinion. Cash is a fact.',
      },
      {
        type: 'p',
        text: 'Compare cash from operations against reported profit. Healthy reported profits with weak operating cash is the single most reliable sign that the earnings are massaged and you want to know how before you invest.',
      },
      { type: 'h2', text: 'The notes are the actual document' },
      {
        type: 'p',
        text: 'Statements are summaries. The notes explain them, and they are where the real substance lives. Four you should find every single time:',
      },
      {
        type: 'ul',
        items: [
          'Related-party transactions: what the company buys from and sells to its directors’ and sponsors’ businesses, and on what terms.',
          'Contingencies and commitments: disputes, litigation, guarantees that never make the balance sheet but could.',
          'Composition of borrowings: how much, at what rate, and when they mature.',
          'Segment information: which part of the business actually earns the money, which is rarely the part the chairman talks most about.',
        ],
      },
      { type: 'h2', text: 'Pattern of ownership' },
      {
        type: 'p',
        text: 'PSX companies disclose their shareholding pattern. Who actually controls the company, how much of it sponsors hold, and how much really floats. A tiny free float means the price can lurch on modest volume. Good to know before you take a position you may want to exit quickly.',
      },
      { type: 'h2', text: 'The 30-minute speed read' },
      {
        type: 'ol',
        items: [
          'Auditor’s opinion and key audit matters, 5 minutes.',
          'P&L: revenue trend, gross margin, finance cost as a share of operating profit, 5 minutes.',
          'Balance sheet: debt against equity, receivable and inventory build-up, 5 minutes.',
          'Cash flow: operating cash versus net profit over three years, 5 minutes.',
          'Notes: related parties, contingencies, segments, 10 minutes.',
        ],
      },
      { type: 'h2', text: 'The 2027 twists you will actually hit' },
      {
        type: 'p',
        text: 'Recent PSX audits feature judgement calls on impairment, expected-credit-loss disclosures at banks and forward estimates. When an auditor stakes an entire key audit matter on one estimate, that is where management judgement has the most room to run. Read that section before anything else.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'The PDF version I downloaded has no audit opinion. Okay?',
      },
      {
        type: 'p',
        text: 'No. Every legitimate report carries a signed opinion. If yours is missing, it was probably stripped from an extract. Download the original from the PSX/SECP filing system instead.',
      },
      {
        type: 'h3',
        text: 'How do I know if related-party pricing is fair?',
      },
      {
        type: 'p',
        text: 'Compare margins on purchases from related parties versus independent suppliers, and related-party transaction volume against total revenue. Creeping related-party generosity is a governance red flag you do not argue with.',
      },
      {
        type: 'h3',
        text: 'What does a qualified opinion mean in practice?',
      },
      {
        type: 'p',
        text: 'The auditors could not sign off on some part of the picture: a number, a policy, or a disclosure. It is rarely the end of the world, but it is never ignored. Understand exactly what was disputed before you buy.',
      },
      { type: 'h2', text: 'What you are actually looking for' },
      {
        type: 'p',
        text: 'Not a verdict. You are building a portrait of a business precise enough that you could explain to a friend how it earns money, what stops it earning money, and what evidence would change your mind.',
      },
      {
        type: 'p',
        text: 'If you cannot do that in a paragraph after an honest read, you do not know the company well enough to own it. That is a perfectly good outcome of an afternoon, and it is the discipline most people never build.',
      },
    ],
  },

  {
    slug: 'understanding-pe-roe-and-other-ratios',
    title: 'P/E, ROE and the ratios that actually matter in 2027',
    description:
      'The five ratios that matter for PSX investors in 2027: P/E, ROE, D/E, dividend yield and payout ratio. How to read them without being lied to.',
    category: 'Intermediate',
    publishedAt: '2027-02-23',
    updatedAt: '2027-02-23',
    readingMinutes: 10,
    author: 'Investing Sparkle',
    related: ['reading-a-pakistani-annual-report', 'how-to-value-a-stock'],
    body: [
      {
        type: 'p',
        text: 'There are dozens of ratios. In practice you need about five to start, and understanding those five properly will do more for your decisions than a nodding acquaintance with twenty.',
      },
      {
        type: 'p',
        text: 'A ratio is a question, not a verdict. Each one below tells you where to look next.',
      },
      { type: 'h2', text: 'Price-to-earnings (P/E)' },
      {
        type: 'p',
        text: 'Share price divided by earnings per share. How many years of current earnings you are paying for.',
      },
      {
        type: 'p',
        text: 'A P/E of 8 means you pay eight times last year’s profit for the share. Whether that is cheap depends entirely on what happens next. A cyclical at the top of its cycle looks cheap on P/E precisely because its earnings are about to fall. One of the most reliable traps in the market.',
      },
      {
        type: 'p',
        text: 'Use it comparatively, never absolutely. Against the same company’s history, and against direct peers. A P/E in isolation is noise.',
      },
      {
        type: 'callout',
        text: 'A very low P/E is a question, not a bargain. The market is usually pricing in the fact that earnings are about to shrink. Your task is to find out what.',
      },
      { type: 'h2', text: 'Return on equity (ROE)' },
      {
        type: 'p',
        text: 'Net profit divided by shareholders’ equity. How efficiently the company turns owner money into profit. This is the closest thing to an overall quality score in ratios.',
      },
      {
        type: 'p',
        text: 'A business with a high ROE sustained across many years usually has something protecting it: brand, distribution, a licence, a cost advantage. One spectacular year means nothing.',
      },
      {
        type: 'p',
        text: 'The trap: ROE can be inflated with debt, because borrowing squeezes more profit out of a smaller equity ball. Always read ROE next to debt-to-equity or you will mistake leverage for quality.',
      },
      { type: 'h2', text: 'Debt-to-equity (D/E)' },
      {
        type: 'p',
        text: 'Total debt divided by shareholders’ equity. How much of the business is funded by the bank rather than by owners.',
      },
      {
        type: 'p',
        text: 'This matters extra in Pakistan, where policy rates have moved violently. A company comfortable with debt at one rate can find its profit entirely eaten by finance costs at the next. When rates rise, heavy debtors are hit twice: higher bills and a weaker economy.',
      },
      {
        type: 'p',
        text: 'What counts as high varies by industry. Compare within a sector, never across. A utility’s leverage is not a cement company’s leverage.',
      },
      { type: 'h2', text: 'Dividend yield' },
      {
        type: 'p',
        text: 'Annual dividend per share divided by price. What you are paid in cash for owning the stock today.',
      },
      {
        type: 'p',
        text: 'It disciplines you. A company paying real cash dividends year after year is generating real cash.',
      },
      {
        type: 'p',
        text: 'Watch the trap: a yield that suddenly looks generous usually means the price dropped in anticipation of a cut. Check payout ratio and ask if it is sustainable.',
      },
      { type: 'h2', text: 'The payout ratio: the dividend watchdog' },
      {
        type: 'p',
        text: 'Dividends per share over earnings per share. Under 60% means generous but affordable. Above 90% spells payout funded from reserves or fresh debt. PSX’s comfortable payers hover around 40-65%. Anything suddenly above that demands questions.',
      },
      { type: 'h2', text: 'How ratios shift in 2027' },
      {
        type: 'p',
        text: 'Inflation prints and SBP rate swings have been violent enough that every ratio must be read against its year. A 6x P/E at cyclical peak looks like a trap; the same 6x at trough earnings can be absurdly cheap. ROE in a high-rate world flatters leveraged banks and exposes plain-industrial balance sheets. Context first, verdict never first.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Is P/E the best single valuation tool?',
      },
      {
        type: 'p',
        text: 'It is the most convenient, not the wisest. Use it against the stock’s own average and versus exact peers. Never quote a P/E without also saying which period of earnings it uses.',
      },
      {
        type: 'h3',
        text: 'Is high ROE always attractive?',
      },
      {
        type: 'p',
        text: 'No. ROE boosted by leverage can make a mediocrity look like excellence. Pair it with D/E every time or you will overpay for borrowed performance.',
      },
      {
        type: 'h3',
        text: 'Do PEG ratios work?',
      },
      {
        type: 'p',
        text: 'They work on paper, except growth numbers in Pakistan are hard to forecast reliably. Take any precise PEG as an interesting conversation, not an answer.',
      },
      { type: 'h2', text: 'Reading them together' },
      {
        type: 'ul',
        items: [
          'High ROE and low debt, genuine quality. Find out why.',
          'High ROE and high debt, leverage posing as quality.',
          'Low P/E and falling earnings, likely a trap.',
          'High yield with payout near 100%, the dividend probably shrinks.',
        ],
      },
      { type: 'h2', text: 'What ratios cannot tell you' },
      {
        type: 'p',
        text: 'Whether management is honest. Whether the moat is shrinking. Whether regulation just made the product illegal. Ratios summarise history, in a format the company curated. They narrow the universe. They cannot finish the job for you.',
      },
    ],
  },

  {
    slug: 'how-to-value-a-stock',
    title: 'How to value a stock in 2027: earnings power, DCF-lite and relative valuation',
    description:
      'Valuing PSX stocks in 2027: earnings power, DCF-lite for Pakistani interest rates, relative multiples, and why margin of safety is non-negotiable.',
    category: 'Intermediate',
    publishedAt: '2027-02-25',
    updatedAt: '2027-02-25',
    readingMinutes: 11,
    author: 'Investing Sparkle',
    related: ['understanding-pe-roe-and-other-ratios', 'when-to-sell-a-stock'],
    body: [
      {
        type: 'p',
        text: 'People come to valuation wanting a number they can compare against the market price. That is not what valuation does. It is a way of writing down, in public, what you actually believe about a business.',
      },
      {
        type: 'p',
        text: 'The number it spits out is only as honest as the assumptions inside it. Its real value is forcing you to say out loud what has to be true for the stock to be worth owning.',
      },
      { type: 'h2', text: 'The one idea under every method' },
      {
        type: 'p',
        text: 'A business is worth all the cash it will generate for its owners, adjusted for the fact that cash arriving in ten years is worth less than cash arriving today. Every method is a rough approximation of that sentence, some crude, some elaborate.',
      },
      { type: 'h2', text: 'Method one: relative valuation' },
      {
        type: 'p',
        text: 'The most practical starting point. Compare this company with similar companies on P/E, EV/EBITDA, or price/book for banks. Build the peer set properly, then work out why your company trades where it does within that range.',
      },
      {
        type: 'p',
        text: 'Other things being equal, if it is cheaper than peers, either the market is wrong or it knows something you do not. Deciding which is the entire exercise.',
      },
      {
        type: 'p',
        text: 'Strength: anchored in actual prices. Weakness: if an entire sector is mispriced, relativity tells you nothing about that.',
      },
      { type: 'h2', text: 'Method two: dividend-based valuation' },
      {
        type: 'p',
        text: 'Pakistan rewards this one. You estimate the sustainable dividend stream, discount it at a rate reflecting the risk you are taking on, and compare it with the price.',
      },
      {
        type: 'p',
        text: 'The useful question inside the arithmetic is stark: can this company keep paying the dividend, and what do I need to believe to require only what I am offered?',
      },
      {
        type: 'callout',
        text: 'In a high-rate environment, your hurdle is honestly not zero. When safe instruments pay well, the equity bar rises. Any stock that cannot clear the government paper rate, risk-adjusted, is not an investment. It is a bet.',
      },
      { type: 'h2', text: 'Method three: earnings power' },
      {
        type: 'p',
        text: 'Instead of forecasting growth, estimate what the business earns in a normal year, not a boom, not a trough, and ask what you would pay for that stream. Particularly valuable for cyclical businesses, cement, steel, autos, fertiliser, where valuing on peak earnings is one of the most reliably expensive mistakes available.',
      },
      { type: 'h2', text: 'DCF-lite for Pakistani interest rates' },
      {
        type: 'p',
        text: 'You do not need a 40-tab spreadsheet. You do need a discount rate that respects reality. In 2027, a defensible hurdle is something like the risk-free rate plus a 7% to 10% equity premium, plus a company-specific risk charge for thin liquidity and execution history. If your hurdle fails to beat a T-bill, the stock is not a bargain. It is a bet you have not priced correctly.',
      },
      { type: 'h2', text: 'Relative valuation with the correct peer set' },
      {
        type: 'p',
        text: 'PSX has genuine peer groups in cement, fertiliser, autos, consumer and banks. Compare on forward multiples, not trailing ones, and ask whether the stock looks expensive because it is expensive or because the market knows something about the quality of those earnings.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Will my valuation ever be exactly right?',
      },
      {
        type: 'p',
        text: 'Almost never, and that is fine. Valuations discipline thinking, they do not replace it. A range with a wide margin of safety beats a precise point built on made-up inputs.',
      },
      {
        type: 'h3',
        text: 'What do I do with a loss-making company?',
      },
      {
        type: 'p',
        text: 'Shift to asset terms. Price/book for banks, replacement cost for industrials. Ask whether the business is worth more alive than dead before talking about multiples.',
      },
      {
        type: 'h3',
        text: 'Does the discount rate move with the policy rate?',
      },
      {
        type: 'p',
        text: 'Undeniably. When the risk-free rate moves, recompute; do not reuse last year’s model against a different world.',
      },
      { type: 'h2', text: 'Where beginners go wrong' },
      {
        type: 'ol',
        items: [
          'False precision from inputs you invented.',
          'Deciding you want the stock first, then building assumptions that justify it.',
          'Ignoring the balance sheet.',
          'Assuming everything stays the same next year.',
        ],
      },
      { type: 'h2', text: 'What to do with the answer' },
      {
        type: 'p',
        text: 'A range, not a number. If your numbers suggest the business is worth X to Y and the market sits well below X with margin to spare, you have found something worth real investigation. If it sits inside the range, it is not a clear buy. If it sits above, it is not a clear hold.',
      },
      {
        type: 'p',
        text: 'Insist on a margin of safety sized to the danger of your assumptions being wrong. That is humility with discipline, and it is the difference between investing and gambling at a good price.',
      },
    ],
  },

  {
    slug: 'reading-a-stock-chart-basics',
    title: 'Reading PSX charts in 2027: trend, volume, moving averages and RSI',
    description:
      'A clear 2027 guide to reading PSX stock charts: trendlines, volume confirmation, 50/200-day averages, RSI done right, and where PSX charts mislead.',
    category: 'Beginner',
    publishedAt: '2027-02-27',
    updatedAt: '2027-02-27',
    readingMinutes: 9,
    author: 'Investing Sparkle',
    related: ['fundamental-vs-technical-analysis-for-beginners', 'when-to-sell-a-stock'],
    body: [
      {
        type: 'p',
        text: 'A chart records what buyers and sellers actually did. That is genuinely useful information, and it is also the easiest thing in finance to over-interpret because humans see patterns in everything, including static.',
      },
      {
        type: 'p',
        text: 'Here is the small amount of chart reading worth learning, and a frank account of the rest.',
      },
      { type: 'h2', text: 'Trend, first, before anything else' },
      {
        type: 'p',
        text: 'Zoom out. Look at one year, then three, then a month. A stock making higher lows across a year lives in a different universe from one making lower highs, no matter what the last three days showed.',
      },
      { type: 'h2', text: 'Volume, which most people skip' },
      {
        type: 'p',
        text: 'Volume is conviction. Rise on heavy volume means many people just acted. The same rise on thin volume, most days in PSX, is almost nobody acting, and it can reverse without a second of notice.',
      },
      {
        type: 'p',
        text: 'This matters enormously on PSX, where many names trade thinly. Before you buy, look at average daily volume and ask honestly how long it would take to exit your position.',
      },
      {
        type: 'callout',
        text: 'If getting out of your intended position would take more than a few sessions, size it smaller. Liquidity is part of every size calculation.',
      },
      { type: 'h2', text: 'Moving averages' },
      {
        type: 'p',
        text: 'A moving average smooths the noise so direction shows through. 50-day and 200-day are the classic pair. A stock above a rising 200-day average is in an uptrend; one below a falling 200-day is in a downtrend. That is a description, not a prediction.',
      },
      {
        type: 'p',
        text: 'Take crossover signals with a grain of salt. They are universally known, universally traded, and often fail in choppy markets, which is most of Pakistani stocks, most of the time.',
      },
      { type: 'h2', text: 'RSI' },
      {
        type: 'p',
        text: 'Relative Strength Index, 0 to 100, tells you how fast and how far price has recently stretched. Over 70 is traditionally "overbought"; under 30, "oversold".',
      },
      {
        type: 'p',
        text: 'Use it as a note that a move has been fast, not as an alarm to bail. Strongly trending stocks sit above 70 for weeks. Traders who sell every reading of 70 spend a lot of time right before the market rips further.',
      },
      { type: 'h2', text: 'The PSX charting specifics you need in 2027' },
      {
        type: 'p',
        text: 'Most retail charts are followed on minute timeframes obsessing over noise. The honest approach: daily candles for anything real, higher timeframes for orientation, and abandoning intraday patterns in thinly traded names outright.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Can charts alone make money on PSX?',
      },
      {
        type: 'p',
        text: 'In liquid names over short windows, occasionally. Beyond a week, fundamentals dominate every chart. The patterns that survive are embedded inside a story about the underlying business.',
      },
      {
        type: 'h3',
        text: 'Which PSX chart signals are actually reliable?',
      },
      {
        type: 'p',
        text: 'Higher highs and higher lows across a quarter, with rising volume on the up legs. That catches the strongest PSX setups. Most other patterns are noise in a thin market.',
      },
      {
        type: 'h3',
        text: 'Daily or hourly charts?',
      },
      {
        type: 'p',
        text: 'Daily for real decisions, hourly to time entries inside a daily trend. Skip minute charts unless you have professionally trained reflexes and nothing else to do.',
      },
      { type: 'h2', text: 'What charts genuinely help with' },
      {
        type: 'ul',
        items: [
          'Avoiding buying into a vertical move that has already run.',
          'Setting your exit before you buy, when you can think.',
          'Checking liquidity for your exit.',
          'Distinguishing a company problem from a sector-wide move.',
        ],
      },
      { type: 'h2', text: 'What they cannot do' },
      {
        type: 'p',
        text: 'A chart knows nothing about whether the business is sound, whether the accounts are honest, or whether the debt is survivable. Not one of those is on it. Use fundamentals to decide what belongs in the portfolio, and charts to decide when and how much.',
      },
    ],
  },

  {
    slug: 'sector-analysis-pakistan',
    title: 'Sector analysis on PSX in 2027: what moves cement, banks, autos and fertiliser',
    description:
      'PSX sector analysis 2027: how to read cement, banking, auto, fertiliser and textile cycles, why sector exposure matters, and how to compare peers right.',
    category: 'Intermediate',
    publishedAt: '2027-03-01',
    updatedAt: '2027-03-01',
    readingMinutes: 11,
    author: 'Investing Sparkle',
    related: ['kse-100-vs-kmi-30-explained', 'how-to-build-your-first-psx-portfolio'],
    body: [
      {
        type: 'p',
        text: 'A single event, a policy rate change, a currency move, a commodity swing, helps some listed companies and hurts others. Two stocks on your screen that both "fell today" may have nothing in common except the red candle.',
      },
      {
        type: 'p',
        text: 'Sector analysis is the map that tells you which reaction belongs to which story.',
      },
      { type: 'h2', text: 'The four forces that move PSX sectors' },
      {
        type: 'ul',
        items: [
          'Interest rates: borrowing cost, consumer demand, and the base return every alternative investment must beat.',
          'The rupee: weaker benefits exporters, hurts importers and raiser of foreign debt.',
          'Commodity prices: oil, coal, cotton, and fertilisers grind margins everywhere.',
          'Government policy: subsidies, tariffs, duties, regulation, capable of repricing a whole sector overnight.',
        ],
      },
      { type: 'h2', text: 'How the same event splits the market' },
      { type: 'h3', text: 'When the rate goes up' },
      {
        type: 'p',
        text: 'Banks benefit from wider spreads on deposits and loans. Highly leveraged industrial companies suffer, because their finance bills rise and their customers who buy on credit hold back.',
      },
      {
        type: 'p',
        text: 'For Shariah-compliant portfolios, this is structural: the conventional bank sector, which usually benefits most from rising rates, is excluded entirely. That is a feature or a bug depending on the rate cycle, and it deserves explicit thought rather than silent acceptance.',
      },
      { type: 'h3', text: 'When the rupee weakens' },
      {
        type: 'p',
        text: 'Exporters receive more rupees for the same foreign-currency sale. Importers pay more for the same imported goods. Companies carrying foreign-currency debt watch the rupee figure of their obligations soar without one rupee physically changing hands.',
      },
      {
        type: 'p',
        text: 'This is why the borrowings note in the annual report matters so much. Two neighbours in the same sector can respond completely differently to one currency move because of how they financed themselves.',
      },
      { type: 'h3', text: 'When energy costs rise' },
      {
        type: 'p',
        text: 'Cement, steel and chemicals feel it instantly: energy is a large, direct input. Whether they pass costs on or absorb them is a question of market leadership, competitive structure and demand. The answer lives in the annual report’s margin history, not in a conference call.',
      },
      { type: 'h2', text: 'The five sector drivers that actually matter in 2027' },
      {
        type: 'ol',
        items: [
          'Rate sensitivity: banks vs leveraged industry.',
          'FX exposure: importers vs exporters.',
          'Commodity cycle: cement, steel and fertiliser follow global prices, not domestic sentiment.',
          'Fiscal and regulatory change: SECP circulars, duty shifts, subsidy tweaks.',
          'Input-cost inflation: logistics, machinery imports and raw materials pressing margins first.',
        ],
      },
      { type: 'h2', text: 'The cyclicals trap' },
      {
        type: 'p',
        text: 'A big slice of PSX is cyclical: cement, steel, autos, fertiliser, banking. Cyclical businesses look cheapest exactly when they should not be bought, on peak earnings near a cycle top, because the P/E denominator is temporarily inflated.',
      },
      {
        type: 'p',
        text: 'Ask what the company earns in an average year, not what it earned last year. Valuing a cyclical at the peak is how otherwise careful investors give back three years of gains.',
      },
      {
        type: 'callout',
        text: 'Identify the cycle before the multiple. Cyclical cheapness is usually a downcycle about to be born, not a bargain.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'How do I test a sector before buying a name inside it?',
      },
      {
        type: 'p',
        text: 'Three checks. Where is the sector in its cycle: expansion, peak, trough or turn? How different is the company from the sector: does it have pricing power, a niche, a moat? Does its balance sheet survive a bad quarter?',
      },
      {
        type: 'h3',
        text: 'Is textile worth considering in 2027?',
      },
      {
        type: 'p',
        text: 'Textiles remain central to Pakistani exports and always carry offshore pricing risk. Good operators are investable when the cycle turns, but the margins are razor-thin and the FX swings define who survives. Depth of research is required; never buy textiles as a casual idea.',
      },
      {
        type: 'h3',
        text: 'Which sector leads on rate cuts?',
      },
      {
        type: 'p',
        text: 'Rate cuts historically rotate money toward rate-sensitive and growth names: auto assemblers, consumer staples, and early-cycle industrials, not banks. The market prices sequence long before the press release.',
      },
      { type: 'h2', text: 'Using this practically' },
      {
        type: 'p',
        text: 'Before you add a position, write down what must happen in the world for it to do well, and what would sink it. Compare those notes against the ones for your existing holdings. If all of them hinge on the same assumption, you do not own a portfolio, you own an opinion about one variable.',
      },
    ],
  },
];

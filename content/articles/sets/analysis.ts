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
      'Read a PSX company annual report in 2027 like an analyst — financial statements, related-party deals, audit opinions, cash flow, and the traps every year.',
    category: 'Intermediate',
    publishedAt: '2027-02-21',
    updatedAt: '2027-02-21',
    readingMinutes: 11,
    author: 'Investing Sparkle',
    related: ['understanding-pe-roe-and-other-ratios', 'how-to-value-a-stock'],
    body: [
      {
        type: 'p',
        text: 'An annual report is the single most useful document available to a retail investor, and it is free. It is also two hundred pages long, which is why almost nobody reads one. The good news is that you do not need to read all of it, and the parts that matter most are not the parts the company wants you to look at.',
      },
      { type: 'h2', text: 'Read it backwards' },
      {
        type: 'p',
        text: "The front of the report is marketing: glossy photographs, a chairman's message, and a narrative written by people whose bonuses depend on how it reads. The back is audited. Start at the back.",
      },
      {
        type: 'p',
        text: "Specifically, start with the auditor's report, then the financial statements, then the notes to the accounts. Once you know what the numbers say, go forward and read the management commentary. You will find it a much more interesting document when you can see which parts of the story the numbers support.",
      },
      { type: 'h2', text: "The auditor's report, in thirty seconds" },
      {
        type: 'p',
        text: 'You are looking for one thing: whether the opinion is unqualified. An unqualified (sometimes called a clean) opinion means the auditors are satisfied the statements present a true and fair view.',
      },
      {
        type: 'p',
        text: 'Anything else deserves your full attention. A qualified opinion, an emphasis of matter, or a going-concern paragraph is the auditor telling you something specific in careful language. Read it twice, then read what the company says about it.',
      },
      {
        type: 'callout',
        text: 'Also check the key audit matters section. It names the areas the auditors found hardest to verify, which is a free list of where the accounting risk sits.',
      },
      { type: 'h2', text: 'The three statements, and what each answers' },
      { type: 'h3', text: 'The profit and loss account' },
      {
        type: 'p',
        text: 'Answers: did the company make money this year? Work down it rather than jumping to the bottom line. Revenue tells you whether the business is growing. Gross profit tells you whether it has pricing power. Operating profit tells you whether it controls its costs. Finance cost tells you what its debt is doing to it, a very live question for Pakistani companies in a high-rate environment.',
      },
      {
        type: 'p',
        text: 'Compare each line against the prior year, which is printed alongside. A company whose revenue grew 20% while gross profit grew 4% is telling you something important about its margins.',
      },
      { type: 'h3', text: 'The balance sheet' },
      {
        type: 'p',
        text: 'Answers: what does the company own, and what does it owe? The line that matters most for a beginner is debt, particularly short-term borrowings, which have to be refinanced soon and at whatever rate prevails then.',
      },
      {
        type: 'p',
        text: 'Also look at receivables and inventory relative to revenue. If revenue rose 10% but receivables rose 40%, the company may be booking sales it has not been paid for. That gap is where a surprising number of unpleasant surprises originate.',
      },
      { type: 'h3', text: 'The cash flow statement' },
      {
        type: 'p',
        text: 'Answers: did any actual money arrive? This is the statement most beginners skip and the one experienced investors read first, because profit is an accounting judgement and cash is not.',
      },
      {
        type: 'p',
        text: 'Compare cash generated from operations against reported profit. If a company reports healthy profits year after year while operating cash flow stays weak, something is wrong with the quality of those earnings, and you want to understand what before you invest.',
      },
      { type: 'h2', text: 'The notes are the actual document' },
      {
        type: 'p',
        text: 'The statements are summaries. The notes explain them, and they are where the substance lives. Four worth finding every time:',
      },
      {
        type: 'ul',
        items: [
          'Related-party transactions: what the company buys from and sells to businesses owned by its own directors or sponsors, and on what terms.',
          'Contingencies and commitments: tax disputes, litigation, and guarantees that do not appear on the balance sheet but could.',
          'The breakdown of borrowings: how much, at what rate, and when it matures.',
          'Segment information: which part of the business actually makes the money, which is often not the part the company talks about.',
        ],
      },
      { type: 'h2', text: 'Pattern of ownership' },
      {
        type: 'p',
        text: 'Listed Pakistani companies disclose their shareholding pattern. It tells you who controls the company, how much of it the sponsors hold, and how much genuinely floats. A very small free float means the price can move sharply on modest volume, worth knowing before you take a position you may want to exit.',
      },
      { type: 'h2', text: 'The 30-minute speed read' },
      {
        type: 'p',
        text: 'You do not have to read a 200-page annual report line by line. Here is the disciplined 30-minute route every busy investor should use for a first pass:',
      },
      {
        type: 'ol',
        items: [
          'Auditor’s opinion and key audit matters — 5 minutes.',
          'Profit and loss: revenue trend, gross margin, finance cost as % of operating profit — 5 minutes.',
          'Balance sheet: debt vs equity, receivable and inventory build-up — 5 minutes.',
          'Cash flow: compare operating cash to net profit over three years — 5 minutes.',
          'Notes: related-party deals, contingencies, segment contributions — 10 minutes.',
        ],
      },
      { type: 'h2', text: 'The 2027 twists you will actually hit' },
      {
        type: 'p',
        text: 'Recent Pakistani audits have highlighted judgement calls on impairment testing (or “ECL” disclosures at banks), inflation-adjustments, and forward-looking estimates. When the auditors spend an entire key audit matter on one estimate, that is where the management team might be quarterbacking. Read that matter first every single time.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'What if the auditor’s report is not embedded in the PDF?',
      },
      {
        type: 'p',
        text: 'Never accept a missing or altered auditor’s opinion. Some sketchier issuers strip it from extracts. If the PDF you downloaded shows no signed audit opinion on the first pages, download it from the PSX and SECP filings system directly.',
      },
      {
        type: 'h3',
        text: 'How do I check if related-party pricing is fair?',
      },
      {
        type: 'p',
        text: 'Compare the rates: the margin on goods bought from related parties vs third parties, and the volume of related-party transactions vs total revenue. A pattern of creeping related-party generosity is a governance red flag worth avoiding outright.',
      },
      {
        type: 'h3',
        text: 'What does a qualified opinion mean in practice?',
      },
      {
        type: 'p',
        text: 'It means the auditors could not sign off cleanly on the whole picture, with something specific disputed — a number, a classification, or a disclosure. It is not always a catastrophe, but it should stop you buying before you understand exactly what was disputed.',
      },
      { type: 'h2', text: 'What you are actually looking for' },
      {
        type: 'p',
        text: 'Not a verdict. You are building a description of the business precise enough that you could explain to someone else how it makes money, what could stop it, and what you would need to see to change your mind.',
      },
      {
        type: 'p',
        text: "If you cannot write that in a paragraph after reading the report, you do not understand the company well enough to own it yet. That is a perfectly good outcome for an afternoon's work, and knowing what you do not know is most of the discipline.",
      },
    ],
  },

  {
    slug: 'understanding-pe-roe-and-other-ratios',
    title: 'P/E, ROE and the ratios that actually matter in 2027',
    description:
      'The five ratios that matter for PSX investors in 2027 — P/E, ROE, D/E, dividend yield and payout ratio — how to read them and where they lie to you.',
    category: 'Intermediate',
    publishedAt: '2027-02-23',
    updatedAt: '2027-02-23',
    readingMinutes: 10,
    author: 'Investing Sparkle',
    related: ['reading-a-pakistani-annual-report', 'how-to-value-a-stock'],
    body: [
      {
        type: 'p',
        text: 'There are dozens of financial ratios. You need about four to start, and understanding those four properly will serve you better than a superficial acquaintance with twenty.',
      },
      {
        type: 'p',
        text: 'A ratio is a question, not an answer. Each one below tells you what to investigate next.',
      },
      { type: 'h2', text: 'Price-to-earnings (P/E)' },
      {
        type: 'p',
        text: 'Share price divided by earnings per share. It tells you how many years of current earnings you are paying for.',
      },
      {
        type: 'p',
        text: 'A P/E of 8 means you are paying eight times what the company earned last year. Whether that is cheap depends entirely on what happens to earnings next. A cyclical business at the top of its cycle can look cheap on a P/E precisely because its earnings are about to fall, and this is one of the most reliable traps in the market.',
      },
      {
        type: 'p',
        text: "Use it comparatively, never absolutely: against the company's own history, and against its direct peers. A P/E in isolation is not information.",
      },
      {
        type: 'callout',
        text: 'A very low P/E is a question, not a bargain. The market is usually pricing in something. Your job is to find out what, and then decide whether you disagree.',
      },
      { type: 'h2', text: 'Return on equity (ROE)' },
      {
        type: 'p',
        text: "Net profit divided by shareholders' equity. It measures how efficiently the owners' capital into profit, and it is arguably the single most informative ratio about business quality.",
      },
      {
        type: 'p',
        text: 'A business that consistently earns a high ROE over many years usually has something durable protecting it: a brand, a distribution network, a licence, a cost advantage. Consistency matters more than the peak. One spectacular year proves nothing.',
      },
      {
        type: 'p',
        text: 'The catch: ROE can be inflated by debt, because borrowing raises returns on a smaller equity base. Always read ROE alongside debt-to-equity, or you will mistake leverage for quality.',
      },
      { type: 'h2', text: 'Debt-to-equity (D/E)' },
      {
        type: 'p',
        text: "Total debt divided by shareholders' equity. How much of the business is funded by borrowing rather than by its owners.",
      },
      {
        type: 'p',
        text: 'This ratio carries particular weight in Pakistan, where interest rates have moved sharply and often. A company comfortable with heavy debt at one policy rate can find its entire profit consumed by finance costs at another. When rates rise, leveraged companies are hit twice: higher costs, and usually a weaker economy at the same time.',
      },
      {
        type: 'p',
        text: 'What counts as high varies by industry. Utilities and banks operate with structurally different balance sheets than consumer goods companies. Compare within a sector, never across.',
      },
      { type: 'h2', text: 'Dividend yield' },
      {
        type: 'p',
        text: "Annual dividend per share divided by share price. What you are paid, in cash, for owning the stock at today's price.",
      },
      {
        type: 'p',
        text: 'Dividend yields are a significant part of the return for many PSX investors, and they impose a useful discipline: a company paying real cash dividends year after year is generating real cash.',
      },
      {
        type: 'p',
        text: 'The trap is the yield that rises because the price fell. A yield that suddenly looks generous often means the market expects the dividend to be cut. Check the payout ratio (the share of earnings being paid out) and ask whether it is sustainable.',
      },
      { type: 'h2', text: 'The payout ratio: the dividend watchdog' },
      {
        type: 'p',
        text: 'Dividends per share divided by earnings per share. Under 60% means the dividend is generous but the company is still keeping enough back to fund the business. Above 90% means the dividend is running on fumes — the business has no margin for error and nearly everything earned is going straight out to shareholders. Most sustainable PSX dividend payers sit consistently at 40–65%; if a name suddenly exceeds that, investigate whether it has anything left to grow with.',
      },
      { type: 'h2', text: 'How ratios shift in 2027' },
      {
        type: 'p',
        text: 'Pakistan’s inflation print and the SBP’s policy rate trajectory have been violent enough that any ratio quoted must be anchored to the year. A P/E of 6x in a year of cyclical peak earnings looks like a value trap; the same 6x trough earnings can be absurdly attractive. ROE in a high-rate environment can flatter low-quality banks and hide debt-lapsing industrials. Always locate the ratio in its cycle context before you draw a conclusion.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Is P/E the best single valuation tool?',
      },
      {
        type: 'p',
        text: 'The most convenient, not the most complete. Use it against the company’s own history and direct peers — never in isolation. A cheap stock is genuinely cheap only if earnings quality is high enough to back the price.',
      },
      {
        type: 'h3',
        text: 'Is a high ROE always attractive?',
      },
      {
        type: 'p',
        text: 'No. Leverage boosts ROE by shrinking equity relative to profit. A bank earning 22% on equity on 90% equity financed with debt feels different from an industrial earning 22% on virtually no debt. Always pair ROE with leverage before judging quality.',
      },
      {
        type: 'h3',
        text: 'What about PEG ratios?',
      },
      {
        type: 'p',
        text: 'Useful in theory — P/E divided by expected earnings growth — but extremely sensitive to growth estimates, which nobody knows for certain in Pakistan. Treat any precise PEG as a conversation starter, not a verdict.',
      },
      { type: 'h2', text: 'Reading them together' },
      {
        type: 'p',
        text: 'No ratio means anything alone. The combinations are where understanding starts:',
      },
      {
        type: 'ul',
        items: [
          'High ROE with low debt: genuine quality. Worth understanding why the company earns it.',
          'High ROE with high debt: leverage doing the work, and fragile if rates rise.',
          'Low P/E with falling earnings: probably not cheap. This is a value trap.',
          'High dividend yield with a payout ratio near or above 100%: the dividend is likely to be cut.',
        ],
      },
      { type: 'h2', text: 'What ratios cannot tell you' },
      {
        type: 'p',
        text: 'Whether management is honest. Whether the competitive position is eroding. Whether a regulatory change is coming. Whether the accounting is aggressive.',
      },
      {
        type: 'p',
        text: 'Ratios summarise what already happened, in numbers the company chose how to present. They narrow the field of companies worth examining. The examining is still your job.',
      },
    ],
  },

  {
    slug: 'how-to-value-a-stock',
    title: 'How to value a stock in 2027: earnings power, DCF-lite and relative valuation',
    description:
      'Valuing PSX stocks in 2027 — earnings power valuation, DCF-lite for Pakistani interest rates, relative multiples, and why margin of safety is non-optional.',
    category: 'Intermediate',
    publishedAt: '2027-02-25',
    updatedAt: '2027-02-25',
    readingMinutes: 11,
    author: 'Investing Sparkle',
    related: ['understanding-pe-roe-and-other-ratios', 'when-to-sell-a-stock'],
    body: [
      {
        type: 'p',
        text: 'People come to valuation expecting a calculation that outputs a number, which they then compare to the market price to see whether to buy. That is not what valuation does, and treating it that way produces false confidence, the most expensive commodity in investing.',
      },
      {
        type: 'p',
        text: 'What valuation actually does is force you to state, in numbers, what you believe about a business. The output is only as good as those beliefs, and its real value is that it makes them explicit enough to be challenged, including by you, later, when things change.',
      },
      { type: 'h2', text: 'The only idea underneath all of it' },
      {
        type: 'p',
        text: 'A business is worth the cash it will generate for its owners over its remaining life, adjusted for the fact that money arriving in ten years is worth less to you than money arriving today.',
      },
      {
        type: 'p',
        text: 'Every valuation method is an approximation of that sentence. Some are elaborate, some are crude, and the crude ones are frequently more honest about their own uncertainty.',
      },
      { type: 'h2', text: 'Method one: relative valuation' },
      {
        type: 'p',
        text: 'The most practical starting point. You compare the company against similar companies on a common measure, usually P/E, sometimes price-to-book for banks, sometimes EV/EBITDA for capital-heavy businesses.',
      },
      {
        type: 'p',
        text: 'The procedure: identify genuine peers, calculate the multiple for each, find the range, and then ask why your company sits where it does within that range. The answer is the analysis. If a company trades at a discount to its peers, either the market is wrong or it is right, and articulating which requires you to know the business.',
      },
      {
        type: 'p',
        text: 'Strength: fast, and grounded in actual traded prices. Weakness: if the whole sector is mispriced, relative valuation tells you nothing about that.',
      },
      { type: 'h2', text: 'Method two: dividend-based valuation' },
      {
        type: 'p',
        text: 'Well suited to a market like PSX with many established dividend payers. You estimate the dividend stream and discount it back to today at a rate reflecting the risk you are taking.',
      },
      {
        type: 'p',
        text: 'The discipline is useful even when the arithmetic is rough, because it forces you to answer two questions directly: can this company keep paying this dividend, and what return do I require for the risk of finding out?',
      },
      {
        type: 'p',
        text: 'In Pakistan the required-return question is unavoidable, because the risk-free alternative is not theoretical. Government instruments have at times offered substantial yields. A stock has to be worth more than that alternative, after allowing for its risk, before it deserves your money.',
      },
      {
        type: 'callout',
        text: 'This is the underrated part of valuation in a high-rate environment: your hurdle is not zero. When safe instruments pay well, the bar an equity must clear rises accordingly.',
      },
      { type: 'h2', text: 'Method three: earnings power' },
      {
        type: 'p',
        text: 'Rather than forecasting growth, estimate what the business earns in a normal year (not a boom, not a trough) and ask what you would pay for that stream.',
      },
      {
        type: 'p',
        text: 'This suits cyclical businesses, which are common on PSX: cement, steel, autos, fertiliser. Valuing a cyclical on peak earnings is one of the most reliable ways to lose money, because the multiple and the earnings collapse together.',
      },
      { type: 'h2', text: 'DCF-lite for Pakistani interest rates' },
      {
        type: 'p',
        text: 'You do not need a 40-tab spreadsheet to value a stock, but you do need a discount rate that respects reality. Pakistan’s risk-free rate has touched double digits at points in the last few years, so equity risk premium demands a meaningful buffer. In 2027, a sensible hurdle looks like: risk-free + 7–10% equity premium + a company-specific risk add-on for illiquid, thinly traded names. Anything you model below that, you are claiming a guaranteed rate below a T-bill — trust me, the real market will not thank you for it.',
      },
      { type: 'h2', text: 'Relative valuation with the correct peer set' },
      {
        type: 'p',
        text: 'PSX has genuine sector peers in cement, fertiliser, banks, and textiles. Compare on forward metrics (P/E or EV/EBITDA on next-year estimates) to avoid the peak-earnings trap. If the stock looks expensive against its peers, the market might be paying for a moat you are not seeing — or it might just be wrong. Your job is to find out which before you buy.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Will my valuation ever be right?',
      },
      {
        type: 'p',
        text: 'Rarely exactly — and that is not the point. The purpose of a valuation is to discipline your thinking, not to replace it. A range of fair value with a wide margin of safety beats a single precise answer built on guesswork.',
      },
      {
        type: 'h3',
        text: 'How do I handle companies making losses?',
      },
      {
        type: 'p',
        text: 'Use asset-backed methods — price-to-book for PSX banks and insurance firms, or replacement cost for industrial plants. When the P&L is negative, your question shifts to: is this business worth more alive than liquidated?',
      },
      {
        type: 'h3',
        text: 'Does the required return change with the SBP policy rate?',
      },
      {
        type: 'p',
        text: 'Yes — when the risk-free rate moves, your hurdle moves with it. A stock you could buy at 16x in a 10% risk-free world is a different deal at an 18% risk-free world, and your valuation must be recomputed, not recycled.',
      },
      { type: 'h2', text: 'Where beginners go wrong' },
      {
        type: 'ol',
        items: [
          'Precision that the inputs do not support. A valuation accurate to two decimal places, built on a growth rate you guessed, is theatre.',
          'Deciding the conclusion first. If you want to own the stock, you will find assumptions that justify it. Build the valuation before you form the view, not after.',
          'Ignoring the balance sheet. A company with substantial debt is worth materially less to equity holders than the same operating business without it.',
          'Assuming today continues. Currency, interest rates, and commodity prices all move, and Pakistani companies are highly exposed to all three.',
        ],
      },
      { type: 'h2', text: 'What to do with the answer' },
      {
        type: 'p',
        text: 'Produce a range, not a number. If your work suggests the business is worth somewhere between X and Y, and the market price sits well below X, you have found something worth investigating further.',
      },
      {
        type: 'p',
        text: 'Then insist on a margin of safety: a gap between your estimate and the price you will pay, sized to your uncertainty. That gap is not timidity. It is the acknowledgement that some of your assumptions are wrong and you do not yet know which ones.',
      },
    ],
  },

  {
    slug: 'reading-a-stock-chart-basics',
    title: 'Reading PSX charts in 2027: trend, volume, moving averages and RSI',
    description:
      'A clear 2027 guide to reading PSX stock charts — trendlines, volume confirmation, 50/200-day averages, RSI done right, and where PSX charts mislead.',
    category: 'Beginner',
    publishedAt: '2027-02-27',
    updatedAt: '2027-02-27',
    readingMinutes: 9,
    author: 'Investing Sparkle',
    related: ['fundamental-vs-technical-analysis-for-beginners', 'when-to-sell-a-stock'],
    body: [
      {
        type: 'p',
        text: 'A price chart records what buyers and sellers have already done. That is genuinely useful information, and it is also the easiest thing in investing to over-interpret, because human beings are extraordinarily good at seeing patterns in noise.',
      },
      {
        type: 'p',
        text: 'Here is the small amount of chart reading that earns its place, and an honest account of what it cannot do.',
      },
      { type: 'h2', text: 'Trend, before anything else' },
      {
        type: 'p',
        text: 'Zoom out first. Look at one year and three years before you look at one week. A stock making progressively higher lows over a year is in a different situation from one making progressively lower highs, regardless of what the last few sessions did.',
      },
      {
        type: 'p',
        text: 'Most beginners do the opposite: they open the daily chart and start interpreting. The daily chart of an individual stock is mostly noise, and noise is where imagination fills the gaps.',
      },
      { type: 'h2', text: 'Volume, which most people ignore' },
      {
        type: 'p',
        text: 'Volume tells you how much conviction sits behind a move. A price rising on heavy volume means many participants are acting. The same rise on thin volume means very few are, and it is far easier to reverse.',
      },
      {
        type: 'p',
        text: 'This matters especially on PSX, where a meaningful number of listed companies trade thinly. In a low-volume stock, a modest order moves the price noticeably, chart patterns are far less reliable, and (the part people discover too late) exiting a position takes longer than entering it.',
      },
      {
        type: 'callout',
        text: 'Before you buy anything, look at its average daily traded volume and ask how many days it would take to sell your intended position without moving the price. If the answer is uncomfortable, size down.',
      },
      { type: 'h2', text: 'Moving averages' },
      {
        type: 'p',
        text: 'A moving average is the average closing price over a set number of sessions, plotted as a line. It removes day-to-day noise and shows direction.',
      },
      {
        type: 'p',
        text: 'The 50-day and 200-day are the conventional pair. Their main honest use is descriptive: a stock trading above a rising 200-day average is in an uptrend; one below a falling 200-day average is not. That is a description of the situation, not a prediction of the next move.',
      },
      {
        type: 'p',
        text: 'Treat crossover signals with scepticism. They are widely known, widely traded, and generate a great many false signals in choppy markets, which is most markets, most of the time.',
      },
      { type: 'h2', text: 'RSI' },
      {
        type: 'p',
        text: 'The Relative Strength Index measures the speed and size of recent price changes on a scale of 0 to 100. Conventionally, above 70 is called overbought and below 30 oversold.',
      },
      {
        type: 'p',
        text: 'The useful reading is narrower than the conventional one: RSI tells you a move has been fast, not that it is about to reverse. Strongly trending stocks stay above 70 for weeks, and traders who sell every reading of 70 spend a lot of time watching things go up without them.',
      },
      { type: 'h2', text: 'The PSX charting specifics you need in 2027' },
      {
        type: 'p',
        text: 'Most PSX retail traders fire off 1-minute charts during the open and learn nothing. The honest approach: daily candles for everything except intraday stalls, a minimum 50% of your attention on higher timeframes, and candlestick patterns only in liquid names (cement, banking, energy names with real overnight volume). Marginal PSX names 10% charts — treat them with suspicion.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Is technical analysis enough to make money on PSX?',
      },
      {
        type: 'p',
        text: 'In the very short run on actively traded names — maybe. Over any horizon beyond a week, fundamentals dominate. Charts help you spot behaviour at points of capitulation and euphoria, but a company with broken economics and a pretty chart is still a broken company.',
      },
      {
        type: 'h3',
        text: 'What are the most reliable PSX chart signals?',
      },
      {
        type: 'p',
        text: 'Honest answer: trend alignment (higher highs and higher lows over 3–6 months) with volume increasing on up moves — that is the cleanest signal you can take. Most other patterns are too noisy to bet on in isolation.',
      },
      {
        type: 'h3',
        text: 'Should I use 1-hour or daily charts?',
      },
      {
        type: 'p',
        text: 'Daily for position decisions, 1-hour to fine-tune entry and exit on an established daily trend. Most retail losses come from trading the noise on minute charts against every moving average available.',
      },
      { type: 'h2', text: 'What charts genuinely help with' },
      {
        type: 'ul',
        items: [
          'Avoiding buying into a vertical move that has already run a long way.',
          'Setting a level, before you buy, at which you will accept you were wrong.',
          'Checking liquidity, so you know you can exit.',
          'Seeing whether a fall is company-specific or the whole sector moving together.',
        ],
      },
      { type: 'h2', text: 'What they cannot do' },
      {
        type: 'p',
        text: 'A chart cannot tell you whether the business is sound, whether the accounts are honest, whether the debt is manageable, or whether the dividend is safe. It contains no information about any of those, and no amount of skilled interpretation will extract it.',
      },
      {
        type: 'p',
        text: 'Which is why we teach charts second. Decide what is worth owning using the business. Use the chart to be sensible about when and how much.',
      },
    ],
  },

  {
    slug: 'sector-analysis-pakistan',
    title: 'Sector analysis on PSX in 2027: what moves cement, banks, autos and fertiliser',
    description:
      'PSX sector analysis 2027 — how to read cement, banking, auto, fertiliser and textile cycles, why sector exposure matters, and how to compare peers correctly.',
    category: 'Intermediate',
    publishedAt: '2027-03-01',
    updatedAt: '2027-03-01',
    readingMinutes: 11,
    author: 'Investing Sparkle',
    related: ['kse-100-vs-kmi-30-explained', 'how-to-build-your-first-psx-portfolio'],
    body: [
      {
        type: 'p',
        text: 'A single piece of news (a change in the policy rate, a currency move, a shift in commodity prices) will help some listed companies and hurt others. If you hold five stocks and they all react the same way to the same news, you are less diversified than you think, whatever the number of holdings suggests.',
      },
      {
        type: 'p',
        text: 'Sector analysis is how you find that out before the market demonstrates it to you.',
      },
      { type: 'h2', text: "The main drivers in Pakistan's market" },
      {
        type: 'p',
        text: 'Four forces explain a great deal of what moves PSX sectors:',
      },
      {
        type: 'ul',
        items: [
          'Interest rates: the policy rate affects borrowing costs, consumer demand, and the relative attractiveness of holding equities at all.',
          'The exchange rate: a weaker rupee helps exporters and hurts importers, and it raises the local-currency cost of imported inputs and foreign debt.',
          'Commodity prices: oil, coal, cotton, and fertiliser inputs feed directly into the cost base of large parts of the market.',
          'Government policy: subsidies, tariffs, tax measures, and regulation can reprice an entire sector overnight.',
        ],
      },
      { type: 'h2', text: 'How the same event splits the market' },
      { type: 'h3', text: 'When interest rates rise' },
      {
        type: 'p',
        text: 'Banks generally benefit, because they earn more on the spread between what they pay depositors and what they charge borrowers. Highly leveraged companies suffer, because their finance costs rise directly. Consumer-facing businesses can suffer twice: once through their own borrowing costs, and again as customers who buy on credit hold back.',
      },
      {
        type: 'p',
        text: 'Note what this means for a Shariah-compliant portfolio: it excludes conventional banks entirely, so it does not have the sector that typically benefits most from rising rates. That is a structural characteristic to plan around, not a flaw.',
      },
      { type: 'h3', text: 'When the rupee weakens' },
      {
        type: 'p',
        text: 'Exporters (textiles most prominently) receive more rupees for the same foreign-currency sale. Importers pay more for the same input. Companies with foreign-currency debt see the rupee value of that debt rise, which can hit reported profits hard even when the underlying operations are unchanged.',
      },
      {
        type: 'p',
        text: 'This is why reading the borrowings note in an annual report matters. Two companies in the same sector can respond very differently to a currency move depending on how they financed themselves.',
      },
      { type: 'h3', text: 'When energy costs rise' },
      {
        type: 'p',
        text: 'Energy-intensive manufacturing (cement, steel, chemicals) sees margins compress unless it can pass costs on. Whether it can is a question about pricing power and competitive structure, which is exactly the sort of question the annual report and the segment note help you answer.',
      },
      { type: 'h2', text: 'The five sector drivers that actually matter in 2027' },
      {
        type: 'ol',
        items: [
          'Interest-rate sensitivity — banks love high rates, leveraged industries get crushed by them; rate decisions ripple instantly across the market.',
          'Exchange-rate exposure — rupee stability drives import-heavy sectors (autos, energy, consumer); exporters (textiles, IT services) benefit dramatically from a weaker rupee.',
          'Commodity cycles — cement, steel, and fertiliser march to global pricing, not domestic hope; watch the LME and commodity indices before the PSX moves.',
          'Regulatory and fiscal change — SECP circular changes, duty adjustments, and SBP lending caps can reprice half a sector in a single week.',
          'Input cost inflation — energy, freight and imported machinery costs can shift margins before any company delivers its numbers.',
        ],
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'How do I assess a sector before buying a stock in it?',
      },
      {
        type: 'p',
        text: 'Three checks: (1) where the sector is in its cycle — peak, expansion, trough, or recovery; (2) whether the company’s narrative is different from the sector’s; (3) whether the balance sheet can survive a bad quarter if the cycle turns against you.',
      },
      {
        type: 'h3',
        text: 'Is textile still a valid sector to consider in 2027?',
      },
      {
        type: 'p',
        text: 'Textiles have been the heart of Pakistan’s export story forever, and they remain high-beta. The difference between a great textile investment and a terrible one is timing and balance-sheet strength — the margin buffers are razor-thin and the FX swings are brutal.',
      },
      {
        type: 'h3',
        text: 'Which sector leads PSX during rate cuts?',
      },
      {
        type: 'p',
        text: 'Historically, rate cuts spark a rotation toward rate-sensitive beneficiaries: auto assemblers, high-multiple growth names, and some consumer staples — not banks. The sequencing is subtle and the market prices it in advance; you are always late to the headline.',
      },
      { type: 'h2', text: 'The cyclicals problem' },
      {
        type: 'p',
        text: 'A large share of PSX by market value sits in cyclical sectors: cement, steel, autos, fertiliser, banking. Cyclical businesses have a specific and counterintuitive trap: they look cheapest on a P/E basis at exactly the wrong moment.',
      },
      {
        type: 'p',
        text: 'At the top of a cycle, earnings are at their peak, so the P/E looks low. Then demand turns, earnings fall, and the multiple expands even as the price drops. Investors who bought on the low P/E find themselves holding a stock that is now expensive and falling.',
      },
      {
        type: 'callout',
        text: 'For cyclicals, ask what the company earns in an average year across a full cycle, not what it earned last year. Valuing a cyclical on peak earnings is one of the most consistently expensive mistakes available.',
      },
      { type: 'h2', text: 'Using this practically' },
      {
        type: 'p',
        text: 'Before adding a holding, write down what would have to happen in the world for it to do well, and what would have to happen for it to do badly. Then compare that against the same notes for everything you already own.',
      },
      {
        type: 'p',
        text: 'If the same sentence appears on every card ("a weaker rupee helps this"), you have concentration risk regardless of how many companies you hold. Real diversification means holding businesses that respond to different things, not simply holding more things.',
      },
    ],
  },
];

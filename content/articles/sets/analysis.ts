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
    title: "How to read a Pakistani company's annual report",
    description:
      'Where to look first in a 200-page document, what the three statements actually tell you, and the sections most people skip that matter most.',
    category: 'Intermediate',
    publishedAt: '2026-08-21',
    readingMinutes: 9,
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
    title: 'P/E, ROE, and the handful of ratios that actually matter',
    description:
      'Four ratios will carry a beginner most of the way. What each one measures, how to read it in a Pakistani context, and how each can mislead you.',
    category: 'Intermediate',
    publishedAt: '2026-08-21',
    readingMinutes: 8,
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
    title: 'How to work out what a stock is actually worth',
    description:
      'Valuation is not a formula that produces a price. It is a way of making your assumptions explicit enough to argue with.',
    category: 'Intermediate',
    publishedAt: '2026-08-22',
    readingMinutes: 9,
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
    title: 'Reading a stock chart without fooling yourself',
    description:
      'Trend, volume, moving averages, and RSI, the small set of chart tools worth learning, and the large set of ways charts mislead.',
    category: 'Beginner',
    publishedAt: '2026-08-22',
    readingMinutes: 7,
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
    title: 'Sector analysis: why the same news moves two stocks differently',
    description:
      'Pakistani listed companies cluster into a handful of sectors driven by very different forces. Knowing which force drives yours changes what you watch.',
    category: 'Intermediate',
    publishedAt: '2026-08-23',
    readingMinutes: 8,
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

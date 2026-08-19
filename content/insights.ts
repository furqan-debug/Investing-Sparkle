/**
 * Blog / Insights.
 *
 * Phase 1 ships five seed articles. Content is stored as structured blocks
 * rather than raw HTML so headings stay semantic, typography stays consistent,
 * and a CMS can replace this file later without touching the templates.
 *
 * IMPORTANT — these drafts deliberately avoid asserting specific brokerage
 * fees, tax rates, or regulatory thresholds, because those change and a wrong
 * number on a finance site is a trust problem, not a typo. Anywhere a concrete
 * current figure belongs, the text tells the reader to verify it at source.
 * Review each article before publishing and add live figures where you can
 * commit to keeping them current.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; text: string };

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: 'Beginner' | 'Intermediate' | 'Market Updates' | 'Advisory';
  publishedAt: string; // ISO date — the plan lists undated posts as a trust anti-pattern.
  updatedAt?: string;
  readingMinutes: number;
  author: string;
  draft?: boolean;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: 'how-to-open-a-cdc-account-in-pakistan',
    title: 'How to open a CDC account in Pakistan (step by step)',
    description:
      'A plain walkthrough of what a CDC account is, what documents you need, and the order the steps actually happen in.',
    category: 'Beginner',
    publishedAt: '2026-08-20',
    readingMinutes: 8,
    author: 'Investing Sparkle',
    body: [
      {
        type: 'p',
        text: 'Almost everyone who wants to start investing in Pakistan hits the same wall in the same week: they have decided to invest, they have the money ready, and then they discover that buying a share requires paperwork nobody has ever explained to them. Most people stall here. Some never restart.',
      },
      {
        type: 'p',
        text: 'This article walks through the process end to end, in the order it actually happens, so you know what is coming before you start.',
      },
      { type: 'h2', text: 'First, what a CDC account actually is' },
      {
        type: 'p',
        text: 'When you buy shares in Pakistan, you do not receive a paper certificate. Your ownership is recorded electronically by the Central Depository Company — the CDC. Think of the CDC as the registry that holds the record of who owns what, and your broker as the party that places trades on your instruction.',
      },
      {
        type: 'p',
        text: 'That separation matters more than it first appears. Your shares are recorded in your name in the depository system. Your broker executes orders; they are not where your ownership lives. Understanding this distinction is the first step toward understanding why you should never hand account credentials to anyone — including us.',
      },
      { type: 'h2', text: 'The two things you are actually opening' },
      {
        type: 'p',
        text: 'People say "open a CDC account" as shorthand, but there are two related things:',
      },
      {
        type: 'ul',
        items: [
          'A brokerage account — with a TREC-holder brokerage firm, which is what lets you place buy and sell orders.',
          'A depository account — where your shareholding is recorded. For most retail investors this is a sub-account opened through your broker, rather than a direct CDC investor account.',
        ],
      },
      {
        type: 'p',
        text: 'In practice, opening a brokerage account gets both set up together. You fill one set of forms and the broker handles the depository side.',
      },
      { type: 'h2', text: 'Documents to have ready' },
      {
        type: 'p',
        text: 'Requirements vary slightly between brokers, but you will almost always be asked for:',
      },
      {
        type: 'ul',
        items: [
          'Your CNIC — valid, not expired. An expired CNIC is the single most common reason applications stall.',
          'Proof of your bank account — a cheque copy, bank statement, or account maintenance certificate in your own name.',
          'Proof of address, if your CNIC address is not current.',
          'A recent photograph, and in many cases a specimen signature.',
          'Source-of-income declaration — salary slip, tax return, or business documentation.',
          'Your NTN, if you have one. Your tax filing status affects the rate at which tax is deducted on your investment income.',
        ],
      },
      {
        type: 'callout',
        text: 'Tax rules and withholding rates change between budgets. Confirm the current treatment with your broker or a tax professional rather than relying on any article — including this one.',
      },
      { type: 'h2', text: 'Choosing the broker before you fill anything in' },
      {
        type: 'p',
        text: 'Do this before the paperwork, not after. Switching brokers later is possible but tedious, and the differences between them are larger than most beginners expect.',
      },
      {
        type: 'p',
        text: 'What to compare: commission structure and any minimum per-trade charge, custody or maintenance fees, the quality of the trading platform you will actually use every week, research access, how quickly funds settle in and out, and — underrated — whether their support answers the phone.',
      },
      {
        type: 'p',
        text: 'A broker with a slightly higher commission and a platform that does not fail on a volatile day is usually the better deal for someone placing a handful of trades a month.',
      },
      { type: 'h2', text: 'The sequence, start to finish' },
      {
        type: 'ol',
        items: [
          'Shortlist two or three brokers and compare them on the points above.',
          'Request the account opening form — most brokers now offer a fully online process.',
          'Complete the KYC form and the account opening documentation.',
          'Submit your documents and complete identity verification.',
          'Wait for approval. This is typically a few working days, though it varies.',
          'Receive your account credentials and your depository sub-account details.',
          'Transfer funds into your trading account from your own bank account.',
          'Place your first order — small, deliberate, and for a company you can explain to someone else.',
        ],
      },
      { type: 'h2', text: 'What trips people up' },
      {
        type: 'ul',
        items: [
          'An expired CNIC. Check the date before you begin.',
          'A bank account in someone else’s name. It must be yours; third-party funding gets rejected.',
          'Mismatched details — a name spelled differently on the CNIC and the bank record will hold up verification.',
          'Not asking about the fee schedule in writing. Ask for it before you sign, not after your first statement.',
        ],
      },
      { type: 'h2', text: 'After the account is open' },
      {
        type: 'p',
        text: 'Having an account is not the same as being ready to invest. Before your first purchase, you want a view on what you are buying and why, how much of your total savings belongs in equities at all, and what would make you sell. If you do not have answers to those three, the account can wait a week.',
      },
      {
        type: 'p',
        text: 'That is the part we teach. The paperwork is administrative; the thinking is the actual skill.',
      },
    ],
  },

  {
    slug: 'kse-100-vs-kmi-30-explained',
    title: 'KSE-100 vs KMI-30: what the difference actually means for you',
    description:
      'Two headline indices, two different things being measured. What each one tracks, and which one is the right benchmark for your portfolio.',
    category: 'Beginner',
    publishedAt: '2026-08-20',
    readingMinutes: 7,
    author: 'Investing Sparkle',
    body: [
      {
        type: 'p',
        text: 'If you follow Pakistani market news for a week, you will hear two index names repeatedly: the KSE-100 and the KMI-30. Most coverage assumes you already know the difference. Here it is.',
      },
      { type: 'h2', text: 'What an index is doing' },
      {
        type: 'p',
        text: 'An index is a measuring instrument. It takes a defined set of companies, weights them by a stated rule, and reports the combined value as a single number. The number itself is meaningless in isolation — what matters is the direction and the rate of change, and what set of companies is being measured.',
      },
      { type: 'h2', text: 'The KSE-100' },
      {
        type: 'p',
        text: 'The KSE-100 is the Pakistan Stock Exchange’s benchmark index. It tracks 100 companies selected to represent the market broadly, including the largest company by market capitalisation from each sector, with the remainder selected on market capitalisation.',
      },
      {
        type: 'p',
        text: 'When a news report says "the market rose today," it almost always means the KSE-100 rose. It is the closest thing Pakistan has to a single number for how listed equities are doing.',
      },
      { type: 'h2', text: 'The KMI-30' },
      {
        type: 'p',
        text: 'The KMI-30 — the KSE Meezan Index — tracks 30 companies that pass Shariah screening. That screening covers both the nature of the business and its financial ratios: what the company does, how much interest-bearing debt it carries, how much of its income is non-compliant, and related tests.',
      },
      {
        type: 'p',
        text: 'The practical consequence is compositional. Conventional banks are excluded outright, since interest-based lending is the business itself. Companies carrying heavy interest-bearing debt can fail the ratio screens even when the underlying business is compliant. Screening is reviewed periodically, so constituents change.',
      },
      { type: 'h2', text: 'Why the difference shows up in returns' },
      {
        type: 'p',
        text: 'Because the two indices hold different companies in different proportions, they will not move identically. In periods when banking stocks lead the market, the KSE-100 tends to benefit and the KMI-30 does not participate in the same way. When leadership sits with sectors that pass screening, the gap can run the other direction.',
      },
      {
        type: 'p',
        text: 'Neither is "better." They measure different things.',
      },
      { type: 'h2', text: 'Which one is your benchmark' },
      {
        type: 'p',
        text: 'This is the part that actually affects your decisions. Your benchmark should match your investable universe.',
      },
      {
        type: 'ul',
        items: [
          'If you invest across the whole market, the KSE-100 is your reference point.',
          'If you invest only in Shariah-compliant companies, benchmarking against the KSE-100 will mislead you — you are measuring yourself against companies you would never buy. The KMI-30 is the honest comparison.',
        ],
      },
      {
        type: 'callout',
        text: 'A benchmark is not a target. It tells you whether your decisions added anything relative to simply owning the market you chose to operate in. That is a useful question to ask yourself once a year.',
      },
      { type: 'h2', text: 'A note on sector indices' },
      {
        type: 'p',
        text: 'PSX also publishes sector-level indices. These are more useful than they look: if your holding fell 4% on a day its entire sector fell 4%, you learned something different than if it fell 4% while the sector was flat. The first is a sector move. The second is about the company.',
      },
      {
        type: 'p',
        text: 'Getting into the habit of checking the sector before reacting to a price move will save you a meaningful number of bad decisions.',
      },
    ],
  },

  {
    slug: 'how-to-pick-a-psx-broker',
    title: 'How to pick a PSX broker: seven things to check',
    description:
      'The comparison most beginners skip, and the questions worth asking in writing before you open an account.',
    category: 'Beginner',
    publishedAt: '2026-08-20',
    readingMinutes: 7,
    author: 'Investing Sparkle',
    body: [
      {
        type: 'p',
        text: 'Most people choose a broker the way they choose a restaurant on a busy street: whichever one a friend mentioned. It works out often enough that nobody questions it. But the differences between brokers compound over years of investing, and the switching cost afterwards is real.',
      },
      {
        type: 'p',
        text: 'Here is the comparison worth doing first — it takes an afternoon.',
      },
      { type: 'h2', text: '1. Regulatory standing' },
      {
        type: 'p',
        text: 'The broker must be a TREC holder registered with the SECP and licensed to deal in securities. Verify this at source — on the PSX and SECP listings — rather than taking the firm’s word for it. This is a five-minute check that eliminates an entire category of risk.',
      },
      { type: 'h2', text: '2. The full fee schedule, in writing' },
      {
        type: 'p',
        text: 'Ask for the complete schedule before you sign, not the headline commission rate. What you want to see: commission per trade and whether a minimum charge applies, account maintenance or custody fees, CDC charges passed through to you, fund transfer charges, and any inactivity fee.',
      },
      {
        type: 'p',
        text: 'The minimum per-trade charge matters enormously if you invest modest amounts regularly. A flat minimum can quietly consume several percent of a small order — which is a large headwind to overcome before you have earned anything.',
      },
      { type: 'h2', text: '3. The platform you will actually use' },
      {
        type: 'p',
        text: 'Ask for a demo. You will be in this interface every week for years. Check whether it works properly on your phone, since that is where most Pakistani investors actually trade, and ask what happens on high-volume days — platform outages during volatility are not rare, and they occur precisely when you need access.',
      },
      { type: 'h2', text: '4. Settlement and withdrawal speed' },
      {
        type: 'p',
        text: 'How quickly can you get money in, and — more importantly — out? Ask specifically how long a withdrawal takes to reach your bank account. A firm that is slow or vague on withdrawals is telling you something.',
      },
      { type: 'h2', text: '5. Research, and who it serves' },
      {
        type: 'p',
        text: 'Many brokers publish research. Some of it is genuinely good. Read it with the structural conflict in mind: a firm that earns commission on your trading has an interest in you trading. That does not make the research wrong, but it does mean you should evaluate the reasoning rather than accept the conclusion.',
      },
      {
        type: 'callout',
        text: 'This is the same standard we ask you to hold us to. Evaluate the framework, not the person presenting it.',
      },
      { type: 'h2', text: '6. Support that answers' },
      {
        type: 'p',
        text: 'Before opening the account, call the support line with a real question. How long you wait, and whether the person can actually answer, is the most reliable preview you will get of what happens when something goes wrong with your money.',
      },
      { type: 'h2', text: '7. Account opening friction' },
      {
        type: 'p',
        text: 'Fully online opening, clear document requirements, and a stated turnaround time are all signs of an operation that has its processes in order. It is a weak signal on its own but a useful tiebreaker.',
      },
      { type: 'h2', text: 'What should not decide it' },
      {
        type: 'ul',
        items: [
          'A relationship manager who promises returns. Nobody can promise returns, and the promise itself is disqualifying.',
          'The lowest commission alone, if the platform is unreliable.',
          'A friend’s recommendation, unless your friend invests the way you intend to.',
          'Marketing that emphasises how much you could make rather than how the service works.',
        ],
      },
    ],
  },

  {
    slug: 'fundamental-vs-technical-analysis-for-beginners',
    title: 'Fundamental vs technical analysis: which one should a beginner learn first?',
    description:
      'Two different questions, often presented as rival camps. What each actually answers, and the order to learn them in.',
    category: 'Beginner',
    publishedAt: '2026-08-20',
    readingMinutes: 8,
    author: 'Investing Sparkle',
    body: [
      {
        type: 'p',
        text: 'Beginners are usually introduced to fundamental and technical analysis as opposing camps, each with adherents who think the other is wasting their time. That framing is unhelpful, because the two are not answering the same question.',
      },
      { type: 'h2', text: 'The two questions' },
      {
        type: 'p',
        text: 'Fundamental analysis asks: what is this business worth, and is the current price reasonable relative to that? It works from the company outward — revenue, margins, debt, competitive position, the quality of management, and what the sector is likely to do.',
      },
      {
        type: 'p',
        text: 'Technical analysis asks: what has price and volume been doing, and what does that pattern of behaviour suggest about supply and demand right now? It works from the chart, and it is largely indifferent to what the company does.',
      },
      {
        type: 'callout',
        text: 'Fundamental analysis is mostly about what to buy. Technical analysis is mostly about when. They are complements far more often than they are rivals.',
      },
      { type: 'h2', text: 'What fundamental analysis involves' },
      {
        type: 'p',
        text: 'In practice: reading the annual report, working through the income statement, balance sheet, and cash flow statement, and calculating a handful of ratios that let you compare this company against its own history and against its peers. Price-to-earnings, return on equity, debt-to-equity, and dividend yield will carry you a long way as a beginner.',
      },
      {
        type: 'p',
        text: 'The strength of this approach is that it gives you a reason to own something that you can state out loud. The weakness is that it tells you nothing about timing — a company can be genuinely undervalued and stay that way for years.',
      },
      { type: 'h2', text: 'What technical analysis involves' },
      {
        type: 'p',
        text: 'Reading price charts, identifying trend and range, and using a small number of indicators — moving averages, RSI, and volume are enough to start — to describe what buyers and sellers are currently doing.',
      },
      {
        type: 'p',
        text: 'Its strength is timing and, more usefully for beginners, risk discipline: it gives you a defined level at which your thesis is wrong, which is the foundation of position sizing. Its weakness is that a chart cannot tell you whether the underlying business is sound, and in thinly traded stocks the patterns are far less reliable than they appear.',
      },
      { type: 'h2', text: 'The order to learn them in' },
      {
        type: 'p',
        text: 'Fundamentals first. Three reasons.',
      },
      {
        type: 'ol',
        items: [
          'It teaches you what a business is, which is the actual thing you are buying. Without that, a chart is just a moving line.',
          'It matches the timeframe most retail investors should be operating on. If you are investing savings over years, entry timing matters far less than owning something worth owning.',
          'It is harder to fool yourself with. Charts are pattern-rich, and human beings find patterns in noise effortlessly. Financial statements are less accommodating of wishful thinking.',
        ],
      },
      {
        type: 'p',
        text: 'Then layer basic technicals on top — not to trade, but to avoid buying into a vertical move and to have a pre-decided level where you admit you were wrong.',
      },
      { type: 'h2', text: 'The failure mode to avoid' },
      {
        type: 'p',
        text: 'The common beginner path is to skip fundamentals entirely, learn a few indicators, and start trading short-term — because the charts look actionable and the feedback is immediate. It usually ends the same way: a series of small losses and commission costs, and no framework left behind to build on.',
      },
      {
        type: 'p',
        text: 'The slower path builds something that still works in five years.',
      },
    ],
  },

  {
    slug: 'five-common-psx-beginner-mistakes',
    title: 'The five mistakes that cost new PSX investors the most',
    description:
      'Not the obvious ones. These are the errors that look reasonable at the time and are only visible in hindsight.',
    category: 'Beginner',
    publishedAt: '2026-08-20',
    readingMinutes: 7,
    author: 'Investing Sparkle',
    body: [
      {
        type: 'p',
        text: 'Every one of these is a mistake made by someone sensible, acting in good faith, with real money. None of them look foolish in the moment. That is exactly what makes them expensive.',
      },
      { type: 'h2', text: '1. Acting on a tip you cannot evaluate' },
      {
        type: 'p',
        text: 'Someone in a WhatsApp group says a stock is about to move. Sometimes they are right, which is the problem — the occasional win teaches you to keep listening.',
      },
      {
        type: 'p',
        text: 'The structural issue is not accuracy. It is that a tip gives you an entry and nothing else. You do not know why to hold, when to sell, or what would mean the thesis has broken, because you never had a thesis. And the person who gave you the tip bears none of the loss.',
      },
      {
        type: 'p',
        text: 'The test: can you explain, in two sentences, why this company is worth owning? If not, you are not investing. You are relaying a message.',
      },
      { type: 'h2', text: '2. Putting money in that you will need soon' },
      {
        type: 'p',
        text: 'Equity investing needs time to work, and it needs you to be able to sit through drawdowns without selling. Money earmarked for a wedding, a tuition payment, or a medical fund cannot do that — because the market does not consult your calendar.',
      },
      {
        type: 'p',
        text: 'Before any of it goes into shares: an emergency fund covering several months of expenses, held in cash. It feels like an unproductive use of money. It is what makes the rest of the portfolio survivable.',
      },
      { type: 'h2', text: '3. Concentrating everything in one or two names' },
      {
        type: 'p',
        text: 'New investors often hold two or three stocks, usually in the same sector, usually because those were the names they had heard of. The upside feels good. The downside is that a single company-specific event — a regulatory change, a bad quarter, a governance failure — can take a large share of your savings with it.',
      },
      {
        type: 'p',
        text: 'Diversification does not require dozens of holdings. It requires that no single position can do disproportionate damage, and that your holdings are not all exposed to the same underlying risk.',
      },
      { type: 'h2', text: '4. Selling the good position and holding the bad one' },
      {
        type: 'p',
        text: 'This is one of the most consistently documented patterns in investor behaviour: people realise gains quickly and hold losses indefinitely, because selling at a loss means admitting the decision was wrong.',
      },
      {
        type: 'p',
        text: 'The market has no memory of what you paid. The only question that matters is whether you would buy this company today at this price. If the answer is no, your purchase price is not a reason to keep holding.',
      },
      {
        type: 'callout',
        text: 'Write down, at purchase, what would make you sell. A rule set in advance is far easier to follow than a judgement made while you are losing money.',
      },
      { type: 'h2', text: '5. Checking prices every day' },
      {
        type: 'p',
        text: 'It feels like diligence. It functions as a source of noise. Daily price movement in an individual stock is mostly random with respect to anything you care about over a five-year horizon, and watching it closely reliably produces the urge to act.',
      },
      {
        type: 'p',
        text: 'If your thesis is measured in years, review on a schedule — quarterly, when results are published, or when something specific changes about the business. Not continuously.',
      },
      { type: 'h2', text: 'What connects all five' },
      {
        type: 'p',
        text: 'Every one of these is a decision made without a framework. The tip, the timeline mismatch, the concentration, the asymmetric selling, the constant checking — each is what happens when there is no pre-existing rule, so the decision gets made by whatever you happen to be feeling.',
      },
      {
        type: 'p',
        text: 'Building that framework is learnable, and it is most of what we teach.',
      },
    ],
  },
];

export const categories = ['Beginner', 'Intermediate', 'Market Updates', 'Advisory'] as const;

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const publishedArticles = articles
  .filter((a) => !a.draft)
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

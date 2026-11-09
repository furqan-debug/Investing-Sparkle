import type { Article } from '../types';

/**
 * Practical — the mechanics of actually investing in Pakistan: building a
 * portfolio, dividends, zakat and tax, Shariah screening, and regular investing.
 *
 * Rules, rates, and thresholds change between budgets and between scholars.
 * These articles explain the mechanism and tell the reader where to verify the
 * current number rather than stating one that will quietly go stale.
 */

export const practicalArticles: Article[] = [
  {
    slug: 'shariah-compliant-investing-psx-guide',
    title: "Shariah-compliant investing on PSX in 2027: the complete beginner's guide",
    description:
      'What Shariah screening tests in 2027, why compliant stocks drop off the list, purification, the investable universe today, and how to structure a portfolio.',
    category: 'Beginner',
    publishedAt: '2027-01-27',
    updatedAt: '2027-01-27',
    readingMinutes: 12,
    author: 'Investing Sparkle',
    related: ['kse-100-vs-kmi-30-explained', 'zakat-on-shares-in-pakistan'],
    body: [
      {
        type: 'p',
        text: 'A lot of Pakistani investors want their holdings to be Shariah-compliant, and they are told to just "buy KMI-30 stocks". That is a starting point, not an understanding. Here is what screening actually tests, why it shifts, and what it means for the shape of your portfolio.',
      },
      { type: 'h2', text: 'Two screens, not one' },
      {
        type: 'p',
        text: 'Shariah screening for listed equities has two stages. A company has to pass both.',
      },
      { type: 'h3', text: 'The business screen' },
      {
        type: 'p',
        text: 'What does the company actually do? Core activities that are not permitted are excluded outright, no matter how well run the business looks. Conventional banking and insurance, alcohol, gambling, interest-based lending.',
      },
      {
        type: 'p',
        text: 'This one is binary. A conventional bank cannot become compliant by improving its ratios, because the lending is the problem.',
      },
      { type: 'h3', text: 'The financial screen' },
      {
        type: 'p',
        text: 'How is the company financed, and where does its money come from? This is the screen that surprises people. A business doing perfectly permissible work, making cement, selling food, can still fail because of its balance sheet.',
      },
      {
        type: 'p',
        text: 'The tests look at interest-bearing debt relative to total assets or market capitalisation, assets held in interest-bearing instruments, and income derived from non-compliant sources.',
      },
      {
        type: 'callout',
        text: 'The exact thresholds vary between screening authorities and are reviewed periodically. Check the current criteria with your screening source rather than trusting an article, even this one.',
      },
      { type: 'h2', text: 'Why a company can drop off the list' },
      {
        type: 'p',
        text: 'This is the part people prepare least for. A company compliant last quarter can fail this quarter simply because it took on new debt, or because its market cap fell, changing the ratio without the company doing anything at all.',
      },
      {
        type: 'p',
        text: 'Compliant investing is not a one-time filter. It needs periodic review. Decide in advance how often you will check your holdings against current screening, and what you will do when one fails.',
      },
      { type: 'h2', text: 'Purification' },
      {
        type: 'p',
        text: 'Compliant companies still earn small amounts from non-compliant sources, usually interest on bank deposits. The convention is to calculate your share of that income and give it away, without benefiting from it.',
      },
      {
        type: 'p',
        text: 'Many compliant companies publish a per-share purification figure. Multiply it by your holding and donate the result. It is usually small. Doing it consistently is the point.',
      },
      { type: 'h2', text: 'What this does to your portfolio' },
      {
        type: 'ul',
        items: [
          'No conventional banks, which removes a large, liquid, dividend-heavy chunk of the market, and the sector that benefits most when rates rise.',
          'A tilt away from heavily leveraged companies, because the debt ratio excludes them. Whether that is a fair objection to those companies, you get to decide.',
          'A smaller investable universe, which makes diversification take more effort.',
          'Different behaviour across a rate cycle, which is part of why KMI-30 and KSE-100 diverge.',
        ],
      },
      { type: 'h2', text: 'The investable universe in 2027' },
      {
        type: 'p',
        text: 'PSX lists hundreds of actively traded companies. At any given moment, only a minority pass both screens. The list you can actually use is small enough that every name deserves real research.',
      },
      {
        type: 'p',
        text: 'It has also grown over time as compliant listings have become more common, and it shifts without warning. If you rely on someone else’s list, you inherit their screening, their methodology, and their mistakes.',
      },
      { type: 'h2', text: 'FAQ' },
      {
        type: 'h3',
        text: 'Can I invest in Shariah mutual funds instead of picking stocks myself?',
      },
      {
        type: 'p',
        text: 'Yes, and for many investors that is the right answer. SECP-regulated Shariah mutual funds exist, they are screened, they handle the monitoring, and you pay a fee for it. If you do not want to track screening yourself, a compliant fund is a legitimate, honest way in.',
      },
      {
        type: 'h3',
        text: 'What happens if my company fails screening mid-year?',
      },
      {
        type: 'p',
        text: 'You are not forced to sell anything. The rule is about buying. But once a stock fails, holding it no longer counts as compliant investing, and many people purify the non-compliant portion and sell when reasonably possible.',
      },
      {
        type: 'h3',
        text: 'Does compliance mean the stock will rise?',
      },
      {
        type: 'p',
        text: 'No. Compliance filters what you own, not what it earns. Compliant companies can and do fall in value. The discipline does not replace research or risk management.',
      },
      { type: 'h2', text: 'Benchmark against the right thing' },
      {
        type: 'p',
        text: 'If you only own compliant names, comparing your returns with the KSE-100 means comparing against a market that includes stocks you would never buy. The KMI-30 is the honest reference.',
      },
      { type: 'h2', text: 'Where to get rulings' },
      {
        type: 'p',
        text: 'We teach the mechanics. We are not a religious authority, and questions of interpretation belong with a qualified scholar. Where scholars disagree, we say so instead of picking a side for you.',
      },
    ],
  },

  {
    slug: 'how-to-build-your-first-psx-portfolio',
    title: 'How to build your first PSX portfolio in 2027: a step-by-step playbook',
    description:
      'Build your first PSX portfolio in 2027: how many holdings, equal-weight sizing, worked rupee examples, sector caps, and the review habit that keeps it honest.',
    category: 'Beginner',
    publishedAt: '2027-01-29',
    updatedAt: '2027-01-29',
    readingMinutes: 12,
    author: 'Investing Sparkle',
    related: ['position-sizing-and-risk-management', 'sector-analysis-pakistan'],
    body: [
      {
        type: 'p',
        text: 'Most first portfolios are not built. They accumulate. A stock a friend mentioned, another from an article, a third because it had fallen and looked cheap. Six months later, what you have is a pile of positions with no plan and no shared purpose.',
      },
      {
        type: 'p',
        text: 'A portfolio is a set of decisions that fits together. Here is how to construct one on purpose.',
      },
      { type: 'h2', text: 'Before the first rupee goes in' },
      {
        type: 'ol',
        items: [
          'An emergency fund of three to six months of expenses, in cash, that you will not touch for this.',
          'No high-interest short-term debt outstanding. Paying that down is a guaranteed return.',
          'Money you do not need for at least three to five years.',
        ],
      },
      {
        type: 'p',
        text: 'If any of those is missing, the honest answer is that you are not ready to buy a single share yet. Starting anyway is how people end up panic-selling at the bottom of the cycle.',
      },
      { type: 'h2', text: 'How many holdings' },
      {
        type: 'p',
        text: 'Between eight and fifteen, in most cases.',
      },
      {
        type: 'p',
        text: 'Fewer than eight means one bad quarter can undo months of patience. More than fifteen means you cannot follow them all, which means you end up owning things you never bothered to research.',
      },
      { type: 'h2', text: 'Sizing positions' },
      {
        type: 'p',
        text: 'Equal weighting is the right place to begin. Ten holdings at 10% each. It requires no cleverness and it stops the one-position-goes-to-40% nightmare before it starts.',
      },
      { type: 'h3', text: 'A worked PKR 500,000 example' },
      {
        type: 'ul',
        items: [
          'Ten positions of roughly PKR 50,000 apiece.',
          'No single position above PKR 75,000 after it rises. Trim when it drifts past that.',
          'No sector above about 30% of the total. For most people that means at most three holdings from any one sector.',
        ],
      },
      {
        type: 'callout',
        text: 'Fees change the maths. If your broker charges a minimum per trade, a PKR 5,000 position may lose a meaningful percentage to costs before it has done anything. Fewer, slightly larger positions are often cheaper over a year.',
      },
      { type: 'h2', text: 'What goes in first' },
      {
        type: 'p',
        text: 'Not the most exciting company. The one you can explain to yourself in two sentences.',
      },
      {
        type: 'p',
        text: 'Look for a business with a clear, understandable model, several years of profits including at least one bad one, a dividend it can afford, manageable debt, and enough daily volume that you can actually sell it.',
      },
      {
        type: 'p',
        text: 'Those criteria will rule out most of what circulates in WhatsApp groups. That is a feature, not a bug.',
      },
      { type: 'h2', text: 'The 2027 playbook' },
      {
        type: 'ol',
        items: [
          'Fund your account and confirm your broker’s settlement cycle in writing.',
          'Build a watchlist of 15 to 25 liquid names you understand.',
          'Pick a core of 6 to 8 of them, across a couple of sectors, within your risk profile.',
          'Invest a fixed amount every month for 6 to 12 months. Equal weight, no lump sum.',
          'After two earnings seasons with your holdings, graduate to conviction sizing.',
          'Set your quarterly review date now.',
        ],
      },
      { type: 'h2', text: 'Sample structure for a PKR 1,000,000 first portfolio' },
      {
        type: 'ul',
        items: [
          '40% core: 4 to 5 quality, cash-generative names you hope to hold for years.',
          '30% cyclicals: 3 to 4 recovery names, sized smaller, with clear catalysts in sight.',
          '20% special situations, or a Shariah-compliant core if that is your constraint, capped and deliberate.',
          '10% cash for being solvent and patient through drawdowns.',
        ],
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Do I need a mutual fund instead?',
      },
      {
        type: 'p',
        text: 'A good mutual fund is genuinely sufficient for most investors: diversification, professional monitoring, and built-in discipline for a fee. Direct equity is for people who want to understand their holdings deeply. Many do both: a fund SIP for automation, direct positions for learning.',
      },
      {
        type: 'h3',
        text: 'When do I rotate a holding?',
      },
      {
        type: 'p',
        text: 'Add when the price falls and your thesis still holds. Rotate when the thesis breaks. Price alone is never a reason to change what you own.',
      },
      {
        type: 'h3',
        text: 'What is a realistic first-year expectation?',
      },
      {
        type: 'p',
        text: 'There is no honest number. You could be up, down, or flat in your first year. A disciplined first year is measured by whether you are still investing calmly after a bad quarter, not by a return figure.',
      },
      { type: 'h2', text: 'Write it down' },
      {
        type: 'p',
        text: 'For every holding, write down before you buy: why you are buying, what you expect, what would make you sell, and what weight it deserves. That document is the portfolio. The shares are just its current expression.',
      },
      { type: 'h2', text: 'Spread the entry over time' },
      {
        type: 'p',
        text: 'Do not put it all in on one day. Investing a fixed amount at regular intervals over six to twelve months is a reasonable structure for a first portfolio, and it spares you the regret of one unlucky entry.',
      },
      { type: 'h2', text: 'Reviewing' },
      {
        type: 'p',
        text: 'Quarterly, when results come out. Each review asks three questions of every holding. Has anything changed about the business? Is the position still near its target weight? Would I buy this today at this price?',
      },
    ],
  },

  {
    slug: 'dividends-in-pakistan-explained',
    title: 'Dividends in Pakistan in 2027: ex-dates, payout ratios and yields',
    description:
      'How dividends work on PSX in 2027: declaration vs ex-date vs book closure, bonus shares, payout ratios, why high yields can warn you, and the tax angle.',
    category: 'Beginner',
    publishedAt: '2027-02-01',
    updatedAt: '2027-02-01',
    readingMinutes: 10,
    author: 'Investing Sparkle',
    related: ['understanding-pe-roe-and-other-ratios', 'tax-on-stock-investing-pakistan'],
    body: [
      {
        type: 'p',
        text: 'Dividends are a big part of why people own PSX stocks, and the mechanics confuse almost everyone at first. Especially the dates, because they decide whether you actually receive a payment you were expecting.',
      },
      { type: 'h2', text: 'What a dividend is' },
      {
        type: 'p',
        text: 'A cash share of the company’s profits, paid to shareholders. The board decides the size, proposes it, and shareholders approve it. Nobody is entitled to a dividend, and every company can change, raise, cut, or skip it.',
      },
      { type: 'h2', text: 'The four dates that matter' },
      {
        type: 'ol',
        items: [
          'Declaration, the board announces a dividend and the dates below.',
          'Book closure, the period to fix the register of who owns the shares. You must be a recorded owner before this to qualify.',
          'Ex-dividend, anyone buying from this date does not get the upcoming dividend. Buy on or after it and the payment goes to the seller.',
          'Payment, the money actually reaches you.',
        ],
      },
      {
        type: 'callout',
        text: 'The gap between ex-dividend and payment can be weeks. People who buy the day before the ex-date expecting quick cash are routinely surprised.',
      },
      { type: 'h2', text: 'Why the price drops on the ex-date' },
      {
        type: 'p',
        text: 'On the ex-date, the share price typically falls by roughly the dividend amount. This is not a collapse in confidence. The company is paying out cash, so it is worth that much less.',
      },
      {
        type: 'p',
        text: 'Which is why buying purely for a dividend gains you nothing by itself. You get the dividend and the price falls by the same amount, and the whole exercise is only worthwhile because of tax.',
      },
      { type: 'h2', text: 'Bonus shares are not a dividend' },
      {
        type: 'p',
        text: 'A bonus issue gives you more shares instead of cash. Ten percent bonus on 100 shares gives you 10 more.',
      },
      {
        type: 'p',
        text: 'Your ownership of the company is exactly the same as before. Every shareholder got proportionally more pieces of the identical pie, and the price adjusts down accordingly. If a bonus is announced as a reward, read it as a change in the count, not a payment.',
      },
      { type: 'h2', text: 'Reading a dividend' },
      {
        type: 'p',
        text: "Two figures tell you whether it means something. The dividend yield is the annual dividend divided by the share price: what you earn in cash for owning the share today. The payout ratio is the dividend divided by earnings: how much of what the company earned gets handed out.",
      },
      {
        type: 'p',
        text: 'A payout ratio under 100% suggests it is affordable. Around or above 100% means the company is paying from reserves or new debt. That can limp along for a while; it cannot go on forever.',
      },
      { type: 'h2', text: 'When a high yield is a warning' },
      {
        type: 'p',
        text: 'Yield rises when the price falls. A suspiciously generous yield often means the market expects a cut and is pricing the share down. Before you jump in, check why the price fell. If earnings are deteriorating, the yield you are seeing is historical, not forward.',
      },
      { type: 'h2', text: 'How to spot a decent dividend payer' },
      {
        type: 'ol',
        items: [
          'A payout ratio consistently under 60-70%, so the dividend is covered by earnings.',
          'A track record of raising the payout, not just paying a flat amount.',
          'Strong, predictable free cash flow, since dividends are funded with cash, not accounting.',
          'No alarming dividend history of cuts across the last five years.',
        ],
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Are dividends guaranteed on PSX?',
      },
      {
        type: 'p',
        text: 'No. Dividends are discretionary: the board proposes them and shareholders approve them. Anyone implying a guaranteed dividend is selling you something.',
      },
      {
        type: 'h3',
        text: 'Do I pay tax on dividends in Pakistan?',
      },
      {
        type: 'p',
        text: 'Tax is deducted at source at the rate applicable to your filer status at the time the dividend is paid. The rate has historically been lower for filers. Non-filers face materially higher deductions. Verify the current rate directly with FBR.',
      },
      {
        type: 'h3',
        text: 'What if dividends never reach my bank account?',
      },
      {
        type: 'p',
        text: 'Almost always it is outdated bank details on the broker profile. Ask your broker to update them or approach PSX’s investor service centre directly.',
      },
      { type: 'h2', text: 'Tax and receipt' },
      {
        type: 'p',
        text: 'The dividend figures you receive already net out withholding tax. Your annual tax certificate from the broker is the document that makes filing the following year painless. Keep it.',
      },
    ],
  },

  {
    slug: 'zakat-on-shares-in-pakistan',
    title: 'Zakat on shares in Pakistan in 2027: the complete calculation',
    description:
      'How to calculate zakat on your PSX portfolio in 2027: trading vs long-term intent, zakat-per-share disclosure, what else counts as zakatable cash, Nisab.',
    category: 'Beginner',
    publishedAt: '2027-02-03',
    updatedAt: '2027-02-03',
    readingMinutes: 10,
    author: 'Investing Sparkle',
    related: ['shariah-compliant-investing-psx-guide', 'dividends-in-pakistan-explained'],
    body: [
      {
        type: 'p',
        text: 'Zakat on shares is the question every PSX investor eventually has to answer, and the answer depends on something most people never think about explicitly: why they hold the shares.',
      },
      {
        type: 'p',
        text: 'This explains the mechanics. It is not a religious ruling. For that, speak with a qualified scholar, especially if your situation is unusual.',
      },
      { type: 'h2', text: 'Intent changes the calculation' },
      { type: 'h3', text: 'Shares held for trading' },
      {
        type: 'p',
        text: 'If you bought to sell at a profit, the holding is treated like trade goods, and zakat is generally calculated on the full market value of the holding on your zakat date.',
      },
      {
        type: 'p',
        text: 'This is the simpler calc. Take the market value of the portfolio on the day and apply the zakat rate to it.',
      },
      { type: 'h3', text: 'Shares held as long-term investment' },
      {
        type: 'p',
        text: 'If you bought for dividends and long-term ownership of the business, a common view is that zakat is due on your proportional share of the company’s zakatable assets: cash, receivables and inventory, rather than its market capitalisation, because plant and machinery are not themselves zakatable.',
      },
      {
        type: 'p',
        text: 'It is more accurate and much harder to do by hand. Many Pakistani companies publish a per-share zakat figure so you do not have to. Check the annual report before doing it from scratch.',
      },
      {
        type: 'callout',
        text: 'If a company publishes a zakat-per-share figure, multiply it by your holding. It comes from the company’s own accounts and is far more accurate than anything you could estimate from outside.',
      },
      { type: 'h2', text: 'The bank-account trap nobody expects' },
      {
        type: 'p',
        text: 'For shares traded on the exchange, zakat is not automatically deducted for you. No broker collects it. The 2.5% deducted at source applies only to specific bank accounts on specific dates, not to your shareholding.',
      },
      {
        type: 'p',
        text: 'Idle cash in your brokerage account is zakatable too, and it is the piece people forget most often because it does not feel like savings sitting there.',
      },
      { type: 'h2', text: 'The practical middle path' },
      {
        type: 'p',
        text: 'Many investors simply calculate on the full market value of everything they hold. It errs on the side of giving slightly more, which most people are comfortable with. If your portfolio is large enough that the difference matters, that is exactly when you should ask a scholar, not default to whatever is easiest.',
      },
      { type: 'h2', text: 'Do not forget the rest of your assets' },
      {
        type: 'p',
        text: 'Zakat is on your overall zakatable wealth, not on the share portfolio alone. Include:',
      },
      {
        type: 'ul',
        items: [
          'Cash in the trading account, uninvested.',
          'Dividends you have received and still hold as cash.',
          'Cash in bank accounts and at home.',
          'Gold and silver.',
        ],
      },
      { type: 'h2', text: 'Nisab in 2027' },
      {
        type: 'p',
        text: 'The threshold is pegged to the value of gold or silver. Gold is the more common reference point in recent practice. Look up the gold rate on your zakat date, fix the nisab figure, and apply it consistently.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Is my portfolio zakatable if it is down this year?',
      },
      {
        type: 'p',
        text: 'If you hold for trading, yes, on current market value, so a down year means less zakat. If you hold long-term, the amount depends on the company’s accounts, not on the share price.',
      },
      {
        type: 'h3',
        text: 'Is business stock valued at cost or at market for zakat?',
      },
      {
        type: 'p',
        text: 'Most scholars hold stock-in-trade zakatable at its current market value on the zakat date, which is what drives the per-share figures good companies publish.',
      },
      {
        type: 'h3',
        text: 'Does my broker deduct zakat for me?',
      },
      {
        type: 'p',
        text: 'No. Never. The only deductions are for specified bank deposits and certain securities on specific dates. Your share portfolio is yours to calculate and give.',
      },
      { type: 'h2', text: 'Practical mechanics' },
      {
        type: 'ol',
        items: [
          'Fix a zakat date and keep it consistent. Many choose a date in Ramadan.',
          'On that date, download your holdings statement and total the market value.',
          'Add all cash across accounts.',
          'Subtract immediately due liabilities, per your chosen position.',
          'Check that the total exceeds nisab.',
          'Apply 2.5% and keep your working.',
        ],
      },
      {
        type: 'p',
        text: 'Write the working down once. Next year it takes minutes, and you remove the annual re-litigation of decisions you already made.',
      },
      { type: 'h2', text: 'A note on our role' },
      {
        type: 'p',
        text: 'We teach the arithmetic. Where scholars disagree, we tell you they disagree rather than handing you one answer and calling it a ruling.',
      },
    ],
  },

  {
    slug: 'tax-on-stock-investing-pakistan',
    title: 'Tax on stock investing in Pakistan (Finance Act 2026-27): the full guide',
    description:
      'Tax in Pakistan for share investors after the Finance Act 2026-27: capital gains, dividends, filer vs non-filer rates, ATL status, and how to keep records that make filing easy.',
    category: 'Beginner',
    publishedAt: '2027-02-05',
    updatedAt: '2027-02-05',
    readingMinutes: 10,
    author: 'Investing Sparkle',
    related: ['dividends-in-pakistan-explained', 'how-to-open-a-cdc-account-in-pakistan'],
    body: [
      {
        type: 'p',
        text: 'Tax on share income in Pakistan gets rewritten with every Finance Act. So this is about how the system works, not what the rate is this month. Anything that changes every year belongs at FBR or with your tax professional.',
      },
      { type: 'h2', text: 'The taxes that touch a share portfolio' },
      { type: 'h3', text: 'Capital gains tax' },
      {
        type: 'p',
        text: 'Paid on the gain when you sell for more than you paid. The exchange infrastructure collects it at source and reports it to you, so most of you will never compute it yourselves, but your contract notes will show it.',
      },
      {
        type: 'p',
        text: 'The treatment has historically varied by holding period and acquisition date. It is one of the most amended pieces of tax law there is, so never assume last year’s treatment still applies.',
      },
      { type: 'h3', text: 'Tax on dividends' },
      {
        type: 'p',
        text: 'Deducted before the money reaches you. What lands in your account is already net of it, which is why your bank shows a smaller figure than the declared amount.',
      },
      { type: 'h3', text: 'Withholding on transactions' },
      {
        type: 'p',
        text: 'Certain transaction charges also attract withholding. Read the contract notes instead of filing them unopened.',
      },
      { type: 'h2', text: 'Filer status is the biggest single factor' },
      {
        type: 'p',
        text: 'Rates differ sharply depending on whether your name appears on the Active Taxpayers List. For non-filers, rates on investment income have long been materially higher.',
      },
      {
        type: 'p',
        text: 'Getting onto the ATL is the best-return admin action almost any investor can take. One NTN and one filing, and every dividend and every sale gets lighter for good.',
      },
      {
        type: 'callout',
        text: 'If you are investing real money as a non-filer, the difference usually costs you more than any improvement you could ever make to your stock selection. Fix that first.',
      },
      { type: 'h2', text: 'Finance Act 2026-27: where things stand' },
      {
        type: 'p',
        text: 'Every recent Finance Act has tightened the screws: more documentation, more withholding, sharper penalties, and FBR has built the plain infrastructure to watch trading more closely than it ever has. Not advisory guesswork. Real enforcement. If you trade casually without keeping filer status current, you are in the file.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'How do I become a filer?',
      },
      {
        type: 'p',
        text: 'Apply for an NTN at the FBR online portal, then file your annual return. Your name appears on the ATL within days to weeks. It is cheaper than one week of sub-optimal returns.',
      },
      {
        type: 'h3',
        text: 'Can I use my broker’s tax certificate for filing?',
      },
      {
        type: 'p',
        text: 'Yes. It is the document designed for this purpose. Keep it, along with your contract notes, every year.',
      },
      {
        type: 'h3',
        text: 'Does long-term holding change my liability?',
      },
      {
        type: 'p',
        text: 'Historically yes, but the rules change with every budget. Look at the current Finance Act and speak with a tax professional for your specific position. Never pay on folklore.',
      },
      { type: 'h2', text: 'Records to keep' },
      {
        type: 'ul',
        items: [
          'Contract notes for every buy and sell.',
          'Annual brokerage statements.',
          'Dividend advices showing gross and net.',
          'The broker’s annual tax certificate.',
          'A spreadsheet of purchases: date, company, quantity, price, total cost.',
        ],
      },
      {
        type: 'p',
        text: 'That spreadsheet is ten minutes a month and saves you an entire afternoon at filing time. Start it with your first trade, not in year three.',
      },
      { type: 'h2', text: 'What we do not do' },
      {
        type: 'p',
        text: 'We are not tax advisors. We teach you what to keep and what to ask, so the conversation with your actual tax professional is short, cheap, and sane.',
      },
    ],
  },

  {
    slug: 'sip-investing-in-pakistan',
    title: 'SIP investing in Pakistan (2027): can monthly investing beat timing the market?',
    description:
      'Why monthly investing beats market timing for salaried Pakistani investors in 2027: rupee-cost averaging, the SIP vs lump sum maths, and how to set it up.',
    category: 'Beginner',
    publishedAt: '2027-02-07',
    updatedAt: '2027-02-07',
    readingMinutes: 9,
    author: 'Investing Sparkle',
    related: ['how-to-build-your-first-psx-portfolio', 'emergency-fund-before-investing'],
    body: [
      {
        type: 'p',
        text: 'Investing a fixed amount every month, often called a SIP or rupee-cost averaging, is the one approach that suits most salaried people. It is also badly explained in most places, so let’s do it properly.',
      },
      { type: 'h2', text: 'What it actually does' },
      {
        type: 'p',
        text: 'When you invest a fixed rupee amount regularly, you automatically buy more shares when prices are low and fewer when prices are high. Over time, your average purchase price ends up below the average price over the same period.',
      },
      {
        type: 'p',
        text: 'That is a real, arithmetic advantage. It is also a modest one, and honest people admit it.',
      },
      { type: 'h2', text: 'The real reason it works' },
      {
        type: 'p',
        text: 'It removes the decision.',
      },
      {
        type: 'p',
        text: 'The biggest destroyer of retail returns is not lazy stock picking. It is behaviour: buying after markets have already risen because it feels safe, and freezing after a crash because it feels dangerous.',
      },
      {
        type: 'p',
        text: 'A fixed monthly schedule takes the decision out of your hands at the exact moments your judgement is least reliable. That benefit beats the averaging maths by a wide margin.',
      },
      {
        type: 'callout',
        text: 'The month you least want to make your SIP is nearly always the month it does the most good. That feeling is the mechanism working. It is not a signal to stop.',
      },
      { type: 'h2', text: 'What it does not fix' },
      {
        type: 'ul',
        items: [
          'It does not save you from losing money on a bad business. Averaging down into something deteriorating is not a strategy.',
          'It does not beat investing a lump sum on average, if you happen to have one. Markets rise more often than they fall, and time is the engine of compounding.',
          'It does not choose the stocks for you. Averaging into a bad decision multiplies it.',
        ],
      },
      {
        type: 'p',
        text: 'The second point gets slurred over. Regular investing is optimal for someone earning a salary and investing as income arrives, not for someone sitting on a pile of cash.',
      },
      { type: 'h2', text: 'The 2027 maths of SIP vs lump sum' },
      {
        type: 'p',
        text: 'Your lump sum, on the first day of the best period in history, beats SIPs on average because time compounds harder than timing ever does. The catch is that almost nobody actually has the lump sum.',
      },
      {
        type: 'p',
        text: 'What most people have is a salary. For them, the choice is between SIPs from each pay, or floating in the brokerage account and buying at prices decided by their emotions. In that contest, SIPs win, and backtests rarely argue with a disciplined habit.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'How much should I invest monthly?',
      },
      {
        type: 'p',
        text: 'Start with an amount you would barely notice. PKR 5,000 to 20,000 for most people. Size does not matter. Consistency and not stopping during a bad year are what matter.',
      },
      {
        type: 'h3',
        text: 'Mutual funds or direct stocks for a SIP?',
      },
      {
        type: 'p',
        text: 'Both are fine. Funds automate it and diversify for you. Direct shares teach you to research and make decisions yourself. Many people do both: a fund for the bulk, some direct holdings for the learning.',
      },
      {
        type: 'h3',
        text: 'What do I do in a crash?',
      },
      {
        type: 'p',
        text: 'Keep going and do not look at it more than usual. Stopping in a crash is where money disappears, and no SIP has ever revived a portfolio abandoned in panic.',
      },
      { type: 'h2', text: 'Setting it up on PSX' },
      {
        type: 'p',
        text: 'There is no built-in auto-invest for individual stocks the way funds have it. You do it manually, so you design it to survive your own inconsistency.',
      },
      {
        type: 'ol',
        items: [
          'Pick an amount that survives a bad month, not a good one.',
          'Anchor it to the day your salary arrives.',
          'Set a recurring reminder in your phone. That is your only enforcement mechanism.',
          'Decide in advance what you buy: either top up to target weights or rotate by a fixed rule.',
          'Check cost per trade against your monthly sum. If charges eat a real share, invest quarterly instead.',
        ],
      },
      { type: 'h2', text: 'The rule that matters most' },
      {
        type: 'p',
        text: 'Do not stop when the market falls. That is the only time the strategy has an edge, and it is exactly when almost everyone abandons it. If you catch yourself wanting to pause during a decline, shrink the amount to something you will maintain through the whole drawdown, and keep paying in.',
      },
    ],
  },
];

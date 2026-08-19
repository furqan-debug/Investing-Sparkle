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
    title: 'Shariah-compliant investing on PSX: a complete beginner’s guide',
    description:
      'What the screening actually tests, why compliant companies drop off the list, how purification works, and what it means for your portfolio’s shape.',
    category: 'Beginner',
    publishedAt: '2026-08-23',
    readingMinutes: 10,
    author: 'Investing Sparkle',
    related: ['kse-100-vs-kmi-30-explained', 'zakat-on-shares-in-pakistan'],
    body: [
      {
        type: 'p',
        text: 'A large number of Pakistani investors want their investments to be Shariah-compliant, and are told simply to "buy KMI-30 stocks". That is a starting point, not an understanding. This article covers what compliance screening actually tests, why it changes, and what it does to the shape of a portfolio.',
      },
      { type: 'h2', text: 'Two screens, not one' },
      {
        type: 'p',
        text: 'Shariah screening for listed equities has two stages. A company must pass both.',
      },
      { type: 'h3', text: 'The business screen' },
      {
        type: 'p',
        text: 'This asks what the company actually does. Businesses whose core activity is impermissible are excluded outright, regardless of how well run or profitable they are. Conventional banking and insurance, alcohol, gambling, pork, and conventional interest-based lending fall here.',
      },
      {
        type: 'p',
        text: 'This screen is binary. A conventional bank cannot become compliant by improving its ratios, because the lending itself is the issue.',
      },
      { type: 'h3', text: 'The financial screen' },
      {
        type: 'p',
        text: 'This asks how the company is financed and where its income comes from, and it is the screen that surprises people. A company can do something entirely permissible — make cement, sell food, provide telecoms — and still fail, because of its balance sheet.',
      },
      {
        type: 'p',
        text: 'The tests generally cover the proportion of interest-bearing debt relative to total assets or market capitalisation, the proportion of assets held in interest-bearing instruments, and the proportion of total income derived from non-compliant sources.',
      },
      {
        type: 'callout',
        text: 'The exact thresholds vary between screening authorities and are reviewed periodically. Check the current criteria with your screening source rather than relying on a number quoted in an article — including this one.',
      },
      { type: 'h2', text: 'Why a company can drop off the list' },
      {
        type: 'p',
        text: 'This is the practical consequence people are least prepared for. A company that was compliant last quarter can fail the next screening because it took on debt, or because its market capitalisation fell — which changes the ratio without the company doing anything at all.',
      },
      {
        type: 'p',
        text: 'That means compliant investing is not a one-time filter. It requires periodic review. If you intend to invest this way, build a habit of checking your holdings against the current screening at a set interval, and decide in advance what you will do when one fails.',
      },
      { type: 'h2', text: 'Purification' },
      {
        type: 'p',
        text: 'Companies that pass the screens may still earn a small proportion of income from non-compliant sources — typically interest on bank deposits. The convention is that the investor purifies this by calculating their share of that income and donating it, without taking it as a benefit.',
      },
      {
        type: 'p',
        text: 'Many compliant companies publish a per-share purification figure in their annual report or on their website. Multiply by your shareholding, and give that amount away. It is usually small; the discipline of doing it is the point.',
      },
      { type: 'h2', text: 'What this does to your portfolio' },
      {
        type: 'p',
        text: 'Compliant screening does not just remove companies at random. It systematically removes a particular kind of company, and that has consequences worth planning around.',
      },
      {
        type: 'ul',
        items: [
          'No conventional banks. This removes a large, liquid, dividend-paying part of the market — and the sector that typically benefits most when interest rates rise.',
          'A tilt away from heavily leveraged companies, since the debt ratio screen excludes them. This is arguably a quality filter as much as a religious one.',
          'A smaller investable universe, which makes diversification take more deliberate effort.',
          'Different behaviour across the interest-rate cycle, which is why the KMI-30 and the KSE-100 diverge.',
        ],
      },
      { type: 'h2', text: 'Benchmark against the right thing' },
      {
        type: 'p',
        text: 'If you invest only in compliant companies, comparing your returns to the KSE-100 is comparing yourself against a market that includes companies you would never buy. The KMI-30 is the honest reference point.',
      },
      { type: 'h2', text: 'Where to get rulings' },
      {
        type: 'p',
        text: 'We teach the mechanics of screening — the ratios, the process, the practical review habit. We are not a religious authority, and questions of interpretation belong with a qualified scholar. Where a matter is contested between scholars, we say so rather than picking a side for you.',
      },
    ],
  },

  {
    slug: 'how-to-build-your-first-psx-portfolio',
    title: 'How to build your first PSX portfolio',
    description:
      'How many holdings, how to size them, what to buy first, and the order to do it in — with worked rupee examples.',
    category: 'Beginner',
    publishedAt: '2026-08-24',
    readingMinutes: 9,
    author: 'Investing Sparkle',
    related: ['position-sizing-and-risk-management', 'sector-analysis-pakistan'],
    body: [
      {
        type: 'p',
        text: 'Most first portfolios are not built. They accumulate — a stock someone mentioned, another from an article, a third because it fell and looked cheap. Six months later there is a collection of positions with no relationship to each other and no stated purpose.',
      },
      {
        type: 'p',
        text: 'A portfolio is a set of decisions that fit together. Here is how to construct one deliberately.',
      },
      { type: 'h2', text: 'Before the first rupee goes in' },
      {
        type: 'p',
        text: 'Three things must be true. None of them involve stocks.',
      },
      {
        type: 'ol',
        items: [
          'You have an emergency fund of three to six months of expenses, in cash, that you will not touch for this.',
          'You have no high-interest short-term debt outstanding. Paying that down is a guaranteed return; the market offers no such thing.',
          'The money you are investing is money you will not need for at least three to five years.',
        ],
      },
      {
        type: 'p',
        text: 'If any of these is not true, the honest answer is that you are not ready yet — and starting anyway is how people end up selling at the worst possible moment.',
      },
      { type: 'h2', text: 'How many holdings' },
      {
        type: 'p',
        text: 'For a first portfolio, somewhere between eight and fifteen is a sensible range.',
      },
      {
        type: 'p',
        text: 'Fewer than about eight and a single company-specific event — a governance failure, a regulatory change, a bad quarter — can do damage that takes years to recover. More than about fifteen and you cannot realistically follow them all, which means you own things you no longer understand.',
      },
      {
        type: 'p',
        text: 'Start at the lower end and add as you learn. It is easier to add a holding than to unwind an over-diversified portfolio you never had time to research.',
      },
      { type: 'h2', text: 'Sizing positions' },
      {
        type: 'p',
        text: 'The simplest approach, and a perfectly good one to begin with, is roughly equal weighting. Ten holdings, about 10% each. It requires no forecasting skill and it prevents the most common beginner error — one enormous position that determines your entire outcome.',
      },
      {
        type: 'p',
        text: 'A worked example with PKR 500,000:',
      },
      {
        type: 'ul',
        items: [
          'Ten holdings at roughly PKR 50,000 each.',
          'No single position above PKR 75,000, even after it rises — trim back when it drifts well past its target weight.',
          'No sector above about 30% of the total, which for most people means no more than three holdings from any one sector.',
        ],
      },
      {
        type: 'callout',
        text: 'Check the per-trade cost against your position size. If your broker charges a minimum per trade, a PKR 5,000 position can lose a painful percentage to costs before it has done anything. Fewer, larger positions are often cheaper than many small ones.',
      },
      { type: 'h2', text: 'What goes in first' },
      {
        type: 'p',
        text: 'Not the most exciting company. The most understandable one.',
      },
      {
        type: 'p',
        text: 'For a first holding, look for a business you can explain in two sentences, that has been profitable across several years including bad ones, that pays a dividend it can actually afford, that carries manageable debt, and that trades with enough daily volume that you could sell it without difficulty.',
      },
      {
        type: 'p',
        text: 'Those criteria will exclude most of what gets talked about in WhatsApp groups. That is a feature.',
      },
      { type: 'h2', text: 'Spread the entry over time' },
      {
        type: 'p',
        text: 'Do not deploy the whole amount on one day. Not because timing the market is impossible — though it is — but because entering gradually limits the damage of starting at an unlucky moment, and it gives you time to notice how you actually feel when a position falls.',
      },
      {
        type: 'p',
        text: 'Investing a fixed amount at regular intervals over six to twelve months is a reasonable structure for a first portfolio.',
      },
      { type: 'h2', text: 'Write it down' },
      {
        type: 'p',
        text: 'For every holding, record before you buy: why you are buying it, what you expect it to do, what would tell you the thesis is broken, and what weight it should hold.',
      },
      {
        type: 'p',
        text: 'This document is the portfolio. The shares are just its current expression. When a position falls 20%, the note is what lets you distinguish "the market is being irrational" from "I was wrong" — a distinction that is almost impossible to make honestly in the moment without it.',
      },
      { type: 'h2', text: 'Reviewing' },
      {
        type: 'p',
        text: 'Quarterly, or when results are published. Not daily.',
      },
      {
        type: 'p',
        text: 'At each review, ask three questions of each holding: has anything changed about the business, is the position still near its target weight, and would I buy this today at this price? The third question is the one that does the work.',
      },
    ],
  },

  {
    slug: 'dividends-in-pakistan-explained',
    title: 'Dividends in Pakistan: how they work and when you actually get paid',
    description:
      'Declaration, book closure, ex-dividend, and payment — plus bonus shares, what the payout ratio tells you, and why a high yield can be a warning.',
    category: 'Beginner',
    publishedAt: '2026-08-24',
    readingMinutes: 7,
    author: 'Investing Sparkle',
    related: ['understanding-pe-roe-and-other-ratios', 'tax-on-stock-investing-pakistan'],
    body: [
      {
        type: 'p',
        text: 'Dividends are a large part of the return for many PSX investors, and the mechanics confuse almost everyone at first — particularly the dates, which determine whether you actually receive a payment you were expecting.',
      },
      { type: 'h2', text: 'What a dividend is' },
      {
        type: 'p',
        text: 'A share of profit paid out in cash to shareholders. The company earns money, decides how much to reinvest in the business, and distributes some of the rest.',
      },
      {
        type: 'p',
        text: 'The decision is not automatic and not guaranteed. A dividend can be raised, cut, or skipped entirely, and companies do all three.',
      },
      { type: 'h2', text: 'The four dates that matter' },
      {
        type: 'ol',
        items: [
          'Declaration date — the board announces the dividend, its size, and the dates below.',
          'Book closure — the period during which the company fixes the register of who owns its shares. You must be a recorded holder before this to qualify.',
          'Ex-dividend date — from this date, buying the share no longer entitles you to the upcoming dividend. Buy on or after it and the payment goes to the seller.',
          'Payment date — when the money actually reaches you.',
        ],
      },
      {
        type: 'callout',
        text: 'The gap between ex-dividend and payment can be weeks. This surprises people who buy just before the ex-date expecting cash to arrive shortly afterwards.',
      },
      { type: 'h2', text: 'Why the price drops on the ex-date' },
      {
        type: 'p',
        text: 'On the ex-dividend date, the share price typically falls by roughly the dividend amount. This is not a sell-off. The company is about to pay out cash, so it is worth that much less; the value simply moves from the share price into your bank account.',
      },
      {
        type: 'p',
        text: 'Which is why buying purely to capture a dividend gains you nothing by itself. You receive the dividend and hold a share worth correspondingly less — and you may have created a tax event in the process.',
      },
      { type: 'h2', text: 'Bonus shares are not a dividend' },
      {
        type: 'p',
        text: 'A bonus issue gives you additional shares rather than cash. If you hold 100 shares and a 10% bonus is declared, you receive 10 more.',
      },
      {
        type: 'p',
        text: 'Your proportional ownership of the company is unchanged — every shareholder received the same proportional increase, and the share price adjusts down accordingly. You own more pieces of the same pie. No cash has been distributed, and the company has parted with nothing.',
      },
      {
        type: 'p',
        text: 'Bonus issues are frequently announced in language that implies a reward. Read them as a change in share count, not a payment.',
      },
      { type: 'h2', text: 'Reading a dividend' },
      {
        type: 'p',
        text: 'Two figures tell you whether a dividend is meaningful:',
      },
      {
        type: 'p',
        text: 'The dividend yield is the annual dividend divided by the share price — what you are paid for owning the share at today’s price. The payout ratio is the dividend divided by earnings — how much of what the company earned is being handed out.',
      },
      {
        type: 'p',
        text: 'A payout ratio comfortably below 100% suggests the dividend is affordable. A ratio at or above 100% means the company is paying out more than it earned, funded from reserves or borrowing. That can continue for a while. It cannot continue indefinitely.',
      },
      { type: 'h2', text: 'When a high yield is a warning' },
      {
        type: 'p',
        text: 'Yield rises when the price falls. So an unusually high yield often means the market expects the dividend to be cut, and is pricing the share accordingly.',
      },
      {
        type: 'p',
        text: 'Before being attracted by a high yield, check why the price fell. If the answer is that earnings are deteriorating, the yield you are looking at is historical, and the forward yield may be far lower — or zero.',
      },
      { type: 'h2', text: 'Tax and receipt' },
      {
        type: 'p',
        text: 'Tax is deducted from dividends at source in Pakistan, at a rate that has historically differed depending on whether you are on the Active Taxpayers List. Rates and rules change between budgets — confirm the current treatment with your broker or a tax professional rather than assuming last year’s number still applies.',
      },
      {
        type: 'p',
        text: 'Payment reaches the bank account registered with your broker. If dividends are not arriving, the cause is almost always outdated bank details on your account — check there first.',
      },
    ],
  },

  {
    slug: 'zakat-on-shares-in-pakistan',
    title: 'Zakat on shares: how to calculate it on an investment portfolio',
    description:
      'The two common approaches to calculating zakat on listed equities, how holding intent changes the answer, and what to do about dividends and cash.',
    category: 'Beginner',
    publishedAt: '2026-08-25',
    readingMinutes: 7,
    author: 'Investing Sparkle',
    related: ['shariah-compliant-investing-psx-guide', 'dividends-in-pakistan-explained'],
    body: [
      {
        type: 'p',
        text: 'Zakat on shares is a question almost every Pakistani investor eventually asks, and the answer depends on something people rarely think about explicitly: why you hold the shares.',
      },
      {
        type: 'p',
        text: 'This article explains the mechanics and the reasoning. It is not a religious ruling — for that, speak to a qualified scholar, particularly where your situation is unusual.',
      },
      { type: 'h2', text: 'Intent changes the calculation' },
      {
        type: 'p',
        text: 'Scholars generally distinguish between two purposes for holding shares, and the treatment differs.',
      },
      { type: 'h3', text: 'Shares held for trading' },
      {
        type: 'p',
        text: 'If you bought with the intention of selling for gain, the shares are treated much like trade goods. Zakat is generally calculated on the full market value of the holding on your zakat date.',
      },
      {
        type: 'p',
        text: 'This is the simpler calculation: take the market value of your portfolio on the day, and apply the zakat rate to it.',
      },
      { type: 'h3', text: 'Shares held as long-term investment' },
      {
        type: 'p',
        text: 'If you bought to hold for the dividend income and long-term ownership of the business, a common view is that zakat is due on your proportional share of the company’s zakatable assets — broadly its cash, receivables, and inventory — rather than on the full market value, because fixed assets like plant and machinery are not themselves zakatable.',
      },
      {
        type: 'p',
        text: 'This is more accurate and more work. Many Pakistani listed companies publish a zakat-per-share figure precisely to spare investors the calculation. Check the annual report or the company website before attempting it yourself.',
      },
      {
        type: 'callout',
        text: 'Where a company publishes a zakat-per-share figure, multiply it by your shareholding. It is calculated from the company’s own accounts and is far more accurate than anything you can estimate from outside.',
      },
      { type: 'h2', text: 'The practical middle path' },
      {
        type: 'p',
        text: 'Many investors, faced with a mixed portfolio and incomplete disclosure, calculate on full market value for everything. It is simpler, and it errs on the side of paying more rather than less — which most people are comfortable with.',
      },
      {
        type: 'p',
        text: 'If your portfolio is large enough that the difference is material, that is precisely when it is worth asking a scholar rather than defaulting.',
      },
      { type: 'h2', text: 'Do not forget the rest' },
      {
        type: 'p',
        text: 'Zakat is due on your overall zakatable wealth, not on the share portfolio in isolation. That includes:',
      },
      {
        type: 'ul',
        items: [
          'Cash sitting in your trading account, uninvested.',
          'Dividends received and still held as cash.',
          'Cash in bank accounts and at home.',
          'Gold and silver holdings.',
        ],
      },
      {
        type: 'p',
        text: 'Cash idle in a brokerage account is the one people most often overlook, because it does not feel like savings.',
      },
      { type: 'h2', text: 'Practical mechanics' },
      {
        type: 'ol',
        items: [
          'Fix a zakat date and keep it consistent year to year. Many people use a date in Ramadan.',
          'On that date, take a full statement of your holdings and their market value.',
          'Add cash balances, in the trading account and elsewhere.',
          'Subtract any immediately due liabilities, according to the position you follow.',
          'Check whether the total exceeds the nisab threshold, which is based on prevailing gold or silver prices and therefore changes each year.',
          'Apply the zakat rate and record the calculation.',
        ],
      },
      {
        type: 'p',
        text: 'Keep the working. Next year it takes a fraction of the time, and having last year’s method written down removes the annual re-litigation of decisions you already made.',
      },
      { type: 'h2', text: 'A note on our role' },
      {
        type: 'p',
        text: 'We teach the calculation, not the ruling. Where scholars differ — and on some of these points they do — we will tell you that they differ rather than presenting one position as settled.',
      },
    ],
  },

  {
    slug: 'tax-on-stock-investing-pakistan',
    title: 'Tax on stock investing in Pakistan: what applies and where to check',
    description:
      'The taxes that touch a share portfolio, why filer status matters so much, and how to keep records that make filing straightforward.',
    category: 'Beginner',
    publishedAt: '2026-08-25',
    readingMinutes: 7,
    author: 'Investing Sparkle',
    related: ['dividends-in-pakistan-explained', 'how-to-open-a-cdc-account-in-pakistan'],
    body: [
      {
        type: 'p',
        text: 'Tax on investment income in Pakistan changes with each Finance Act, sometimes substantially. So this article explains which taxes exist and how they work, and deliberately does not quote rates — a wrong number on a finance site is worse than no number.',
      },
      {
        type: 'p',
        text: 'For current rates, check the Federal Board of Revenue, ask your broker, or speak to a tax professional. Your broker deducts most of this at source and can tell you exactly what is being applied to your account.',
      },
      { type: 'h2', text: 'The taxes that touch a share portfolio' },
      { type: 'h3', text: 'Capital gains tax' },
      {
        type: 'p',
        text: 'Charged on the gain when you sell shares for more than you paid. In Pakistan this has historically been collected by the exchange infrastructure and reported to you, rather than being something you calculate yourself.',
      },
      {
        type: 'p',
        text: 'Rates have at various times depended on holding period and acquisition date. This is one of the most frequently amended areas of the tax code, so treat any figure you read anywhere as needing verification.',
      },
      { type: 'h3', text: 'Tax on dividends' },
      {
        type: 'p',
        text: 'Deducted at source before the money reaches you. The amount you receive is already net of it, which is why the dividend in your account is smaller than the declared amount.',
      },
      { type: 'h3', text: 'Withholding on transactions' },
      {
        type: 'p',
        text: 'Certain transaction-level withholdings may apply. Your broker’s contract notes show these, which is one reason to read them rather than filing them unopened.',
      },
      { type: 'h2', text: 'Filer status is the biggest single factor' },
      {
        type: 'p',
        text: 'Pakistan applies materially different rates depending on whether you appear on the Active Taxpayers List. For non-filers, rates on investment income have historically been substantially higher.',
      },
      {
        type: 'p',
        text: 'For most investors, getting onto the ATL is the highest-return administrative action available — the difference compounds across every dividend and every sale, year after year. It requires an NTN and filing a return.',
      },
      {
        type: 'callout',
        text: 'If you are investing meaningful amounts as a non-filer, the tax differential is likely costing you more than any realistic improvement in stock selection would gain you. Fix that first.',
      },
      { type: 'h2', text: 'Records to keep' },
      {
        type: 'p',
        text: 'Your broker provides most of this, but keep your own copies. Retrieving statements from a broker you have left is a genuinely unpleasant experience.',
      },
      {
        type: 'ul',
        items: [
          'Contract notes for every buy and sell.',
          'Annual account statements from your broker.',
          'Dividend advices, showing gross amount and tax deducted.',
          'The annual tax certificate your broker issues — this is the document that makes filing straightforward.',
          'A simple spreadsheet of purchases: date, company, quantity, price, and total cost including charges.',
        ],
      },
      {
        type: 'p',
        text: 'That last one takes two minutes per trade and saves hours at filing time. Start it with your first purchase, not in your third year when reconstructing it becomes an archaeology project.',
      },
      { type: 'h2', text: 'What we do not do' },
      {
        type: 'p',
        text: 'We are not tax advisors and we do not prepare returns. We teach you what to keep and what questions to ask, so the conversation with an actual tax professional is short and cheap rather than long and expensive.',
      },
    ],
  },

  {
    slug: 'sip-investing-in-pakistan',
    title: 'Investing a fixed amount every month: does it actually work?',
    description:
      'What regular investing does and does not achieve, why it suits most salaried investors, and how to set it up on PSX without an automatic mechanism.',
    category: 'Beginner',
    publishedAt: '2026-08-26',
    readingMinutes: 7,
    author: 'Investing Sparkle',
    related: ['how-to-build-your-first-psx-portfolio', 'emergency-fund-before-investing'],
    body: [
      {
        type: 'p',
        text: 'Investing a fixed amount at regular intervals — often called a systematic investment plan, or simply rupee-cost averaging — is the approach that suits most salaried people. It is also frequently oversold, so it is worth being precise about what it does.',
      },
      { type: 'h2', text: 'What it actually does' },
      {
        type: 'p',
        text: 'When you invest a fixed rupee amount regularly, you automatically buy more shares when prices are low and fewer when prices are high. Over time your average purchase price ends up below the average price over the period.',
      },
      {
        type: 'p',
        text: 'That is a real, arithmetic benefit. It is also a modest one, and it is not the main reason to do it.',
      },
      { type: 'h2', text: 'The real reason it works' },
      {
        type: 'p',
        text: 'It removes the decision.',
      },
      {
        type: 'p',
        text: 'The largest destroyer of retail returns is not poor stock selection. It is behaviour — buying after a long rise because it feels safe, and refusing to buy after a fall because it feels dangerous. Both instincts are backwards, and both are extremely strong.',
      },
      {
        type: 'p',
        text: 'A fixed schedule takes the decision out of your hands at exactly the moments your judgement is least reliable. That is worth far more than the averaging arithmetic.',
      },
      {
        type: 'callout',
        text: 'The month you least want to make your scheduled investment is usually the month it does the most good. That feeling is the mechanism working, not a signal to stop.',
      },
      { type: 'h2', text: 'What it does not do' },
      {
        type: 'ul',
        items: [
          'It does not protect you from loss. If you invest regularly into a business that deteriorates permanently, you simply buy more of something falling.',
          'It does not beat investing a lump sum on average, if you happen to have the lump sum. Markets rise more often than they fall, so earlier money usually has more time to work.',
          'It does not remove the need to choose what to buy. Averaging into a bad decision does not improve it.',
        ],
      },
      {
        type: 'p',
        text: 'The second point deserves emphasis, because it is often glossed over. Regular investing is optimal for someone earning a salary and investing as the money arrives — which is most people. It is not automatically optimal for someone sitting on cash.',
      },
      { type: 'h2', text: 'Setting it up on PSX' },
      {
        type: 'p',
        text: 'There is no automatic mechanism for individual shares of the kind mutual fund investors are used to. You do it manually, which means the structure has to survive your own inconsistency.',
      },
      {
        type: 'ol',
        items: [
          'Pick a fixed amount you can sustain in a bad month, not a good one. Consistency matters more than size.',
          'Pick a fixed date, tied to when your salary arrives.',
          'Set a recurring reminder. This is the entire enforcement mechanism, so do not skip it.',
          'Decide in advance what you are buying — either topping up existing holdings toward their target weights, or a set rotation.',
          'Check the cost per trade against your monthly amount. If fixed charges are eating a meaningful share, invest quarterly in larger amounts instead.',
        ],
      },
      { type: 'h2', text: 'The rule that matters most' },
      {
        type: 'p',
        text: 'Do not stop when the market falls. That is the only time this strategy has a real advantage, and it is precisely when almost everyone abandons it.',
      },
      {
        type: 'p',
        text: 'If you find yourself wanting to pause during a decline, the honest reading is usually that the amount is too large for your comfort. Reduce it to a level you will maintain through a bad year, and keep going.',
      },
    ],
  },
];

import type { Article } from '../types';

/**
 * Foundations — the entry-point articles for someone who has never bought a
 * share. These are the pages most new visitors land on from search, so they
 * carry more explanation and fewer assumptions than the rest of the archive.
 */

export const foundationArticles: Article[] = [
  {
    slug: 'how-to-open-a-cdc-account-in-pakistan',
    title: 'How to open a CDC account in Pakistan (step by step, 2027)',
    description:
      'A complete, up-to-date walkthrough of opening a CDC account in Pakistan: what a CDC sub-account is, what you need, and the mistakes to avoid in 2027.',
    category: 'Beginner',
    publishedAt: '2027-01-15',
    updatedAt: '2027-01-15',
    readingMinutes: 11,
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
        text: 'When you buy shares in Pakistan, you do not receive a paper certificate. Your ownership is recorded electronically by the Central Depository Company, the CDC. Think of the CDC as the registry that holds the record of who owns what, and your broker as the party that places trades on your instruction.',
      },
      {
        type: 'p',
        text: 'That separation matters more than it first appears. Your shares are recorded in your name in the depository system. Your broker executes orders; they are not where your ownership lives. Understanding this distinction is the first step toward understanding why you should never hand account credentials to anyone, including us.',
      },
      { type: 'h2', text: 'The two things you are actually opening' },
      {
        type: 'p',
        text: 'People say "open a CDC account" as shorthand, but there are two related things:',
      },
      {
        type: 'ul',
        items: [
          'A brokerage account, with a TREC-holder brokerage firm, which is what lets you place buy and sell orders.',
          'A depository account, where your shareholding is recorded. For most retail investors this is a sub-account opened through your broker, rather than a direct CDC investor account.',
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
          'Your CNIC, valid, not expired. An expired CNIC is the single most common reason applications stall.',
          'Proof of your bank account, a cheque copy, bank statement, or account maintenance certificate in your own name.',
          'Proof of address, if your CNIC address is not current.',
          'A recent photograph, and in many cases a specimen signature.',
          'Source-of-income declaration, salary slip, tax return, or business documentation.',
          'Your NTN, if you have one. Your tax filing status affects the rate at which tax is deducted on your investment income.',
        ],
      },
      {
        type: 'callout',
        text: 'Tax rules and withholding rates change between budgets. Confirm the current treatment with your broker or a tax professional rather than relying on any article, including this one.',
      },
      { type: 'h2', text: 'Choosing the broker before you fill anything in' },
      {
        type: 'p',
        text: 'Do this before the paperwork, not after. Switching brokers later is possible but tedious, and the differences between them are larger than most beginners expect.',
      },
      {
        type: 'p',
        text: 'What to compare: commission structure and any minimum per-trade charge, custody or maintenance fees, the quality of the trading platform you will actually use every week, research access, how quickly funds settle in and out, and (underrated) whether their support answers the phone.',
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
          'Request the account opening form, most brokers now offer a fully online process.',
          'Complete the KYC form and the account opening documentation.',
          'Submit your documents and complete identity verification.',
          'Wait for approval. This is typically a few working days, though it varies.',
          'Receive your account credentials and your depository sub-account details.',
          'Transfer funds into your trading account from your own bank account.',
          'Place your first order, small, deliberate, and for a company you can explain to someone else.',
        ],
      },
      { type: 'h2', text: 'What trips people up' },
      {
        type: 'ul',
        items: [
          'An expired CNIC. Check the date before you begin.',
          "A bank account in someone else's name. It must be yours; third-party funding gets rejected.",
          'Mismatched details, a name spelled differently on the CNIC and the bank record will hold up verification.',
          'Not asking about the fee schedule in writing. Ask for it before you sign, not after your first statement.',
        ],
      },
      { type: 'h2', text: 'What 2027 looks different' },
      {
        type: 'p',
        text: 'Account opening is now almost entirely online at the larger TREC-holder brokers, identity verification happens through NADRA’s digital checks, and the CDC’s investor-awareness drive has made the account opening window faster than it was two or three years ago. The fundamentals have not changed, the documents still matter, and the CNIC is still the thing that stops most applications.',
      },
      {
        type: 'ul',
        items: [
          'Fully online onboarding is now the norm at most banks-turned-brokers and independent TREC holders — no branch visits for most of the process.',
          'Biometric verification through the NADRA CNIC connection is mandatory for account opening.',
          'The minimum age for a trading account is 18, and minors can hold a guardian-linked CDC account.',
        ],
      },
      { type: 'h2', text: 'Caution: the charges nobody tells you about' },
      {
        type: 'p',
        text: 'Your brokerage statement will show a stack of small charges: PSX fees, SECP charges, CDC fees, exchange regulatory fees, GST on services, and your broker’s own commission. None of these is hidden exactly, but almost nobody reads them out loud before you sign. Ask for the complete charge sheet and an example of a net settlement on an actual buy order, in writing, so you understand what a trade really costs you.',
      },
      {
        type: 'p',
        text: 'In 2027 the tax side of trading is moving in exactly the direction it has been moving for years: more documentation, more traceability, more attention from the FBR. Your NTN and your filing status are not decorative — they change what you keep from every rupee of profit and every rupee of dividend.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'How much money do I need to open a CDC account?',
      },
      {
        type: 'p',
        text: 'There is no legal minimum in most cases, and your broker’s account opening charges are what they are. The real answer is about the minimum order size: PSX lot sizes and broker minimums mean a very small deposit can still work — but factor in round-trip costs, you should only deposit an amount you are content to leave in shares for a while.',
      },
      {
        type: 'h3',
        text: 'Can I open more than one CDC account?',
      },
      {
        type: 'p',
        text: 'A person can hold a depository account with multiple brokers, and many experienced investors do exactly that. What you cannot do is hold the same shares in two accounts under two names at once without records. Keep a clean main account for your core holdings and a smaller one if you want to ring-fence something specific.',
      },
      {
        type: 'h3',
        text: 'How long does CDC account opening take in 2027?',
      },
      {
        type: 'p',
        text: 'Typically a few working days for a complete application, sometimes sooner for digitally verified submissions and longer when documents are missing or inconsistent. The variable is never the paperwork — it is always whether the documents match each other.',
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
    title: 'KSE-100 vs KMI-30: which index should you actually follow in 2027?',
    description:
      'KSE-100 vs KMI-30 explained for Pakistani investors in 2027: what each index tracks, how returns differ, and which benchmark suits your portfolio.',
    category: 'Beginner',
    publishedAt: '2027-01-18',
    updatedAt: '2027-01-18',
    readingMinutes: 9,
    author: 'Investing Sparkle',
    body: [
      {
        type: 'p',
        text: 'If you follow Pakistani market news for a week, you will hear two index names repeatedly: the KSE-100 and the KMI-30. Most coverage assumes you already know the difference. Here it is.',
      },
      { type: 'h2', text: 'What an index is doing' },
      {
        type: 'p',
        text: 'An index is a measuring instrument. It takes a defined set of companies, weights them by a stated rule, and reports the combined value as a single number. The number itself is meaningless in isolation, what matters is the direction and the rate of change, and what set of companies is being measured.',
      },
      { type: 'h2', text: 'The KSE-100' },
      {
        type: 'p',
        text: "The KSE-100 is the Pakistan Stock Exchange's benchmark index. It tracks 100 companies selected to represent the market broadly, including the largest company by market capitalisation from each sector, with the remainder selected on market capitalisation.",
      },
      {
        type: 'p',
        text: 'When a news report says "the market rose today," it almost always means the KSE-100 rose. It is the closest thing Pakistan has to a single number for how listed equities are doing.',
      },
      { type: 'h2', text: 'The KMI-30' },
      {
        type: 'p',
        text: 'The KMI-30 (the KSE Meezan Index) tracks 30 companies that pass Shariah screening. That screening covers both the nature of the business and its financial ratios: what the company does, how much interest-bearing debt it carries, how much of its income is non-compliant, and related tests.',
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
          'If you invest only in Shariah-compliant companies, benchmarking against the KSE-100 will mislead you, you are measuring yourself against companies you would never buy. The KMI-30 is the honest comparison.',
        ],
      },
      {
        type: 'callout',
        text: 'A benchmark is not a target. It tells you whether your decisions added anything relative to simply owning the market you chose to operate in. That is a useful question to ask yourself once a year.',
      },
      { type: 'h2', text: 'PSX all-shares and free-float indices' },
      {
        type: 'p',
        text: 'The KSE-100 and KMI-30 are the most quoted, but they are not the only yardsticks. PSX publishes a broader market index and sub-indices, and the free-float versions adjust for shares actually available in the market rather than shares issued. For 2027, the all-shares universe tells you whether the market’s advance is broad-based or carried by a handful of index heavyweights — always check the breadth before assuming everything is rallying.',
      },
      { type: 'h2', text: 'The thing index marketing never tells you' },
      {
        type: 'p',
        text: 'Indices can be weighted by market capitalisation, free float, or sector caps, and different methodologies produce different answers. A KSE-100 point change and a KMI-30 point change are not a race; a point in each means different things because the baskets differ. Never compare your portfolio return against a price index when you should be using a total-return (dividend-adjusting) index.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Which index do mutual funds use as a benchmark?',
      },
      {
        type: 'p',
        text: 'Equity funds registered with the SECP benchmark themselves against indices they declare in their offering documents, very commonly the KSE-100 for conventional funds and the KMI-30 or all-share Shariah indices for Shariah funds. Check the latest fund factsheet — the benchmark is printed there, and it is the honest question to ask the distributor.',
      },
      {
        type: 'h3',
        text: 'Can the KMI-30 underperform the KSE-100 for years?',
      },
      {
        type: 'p',
        text: 'Yes, and it can also outperform for years. If banks and the conventional sectors lead the market, the KMI-30 lags. If PSX’s compliant leaders lead the market, the KMI-30 outpaces. The Shariah universe is smaller, more concentrated, and its returns will differ from the broad market by definition. Compare like with like.',
      },
      {
        type: 'h3',
        text: 'I invest only Shariah-compliant — do I still watch the KSE-100?',
      },
      {
        type: 'p',
        text: 'Yes, but as market context, not as your scoreboard. When an analyst says "the market is up 1.2%", they mean the KSE-100 — you still want to know whether the whole market moved, whether it was a banks-driven move, and what the Shariah names did. Do not use the KSE-100 as your benchmark.',
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
    title: 'How to pick a PSX broker in 2027: a checklist that actually decides',
    description:
      'How to pick the right PSX broker in 2027: SECP/PSX verification, the complete fee schedule in writing, platform quality, custody rules and red flags.',
    category: 'Beginner',
    publishedAt: '2027-01-20',
    updatedAt: '2027-01-20',
    readingMinutes: 9,
    author: 'Investing Sparkle',
    body: [
      {
        type: 'p',
        text: 'Most people choose a broker the way they choose a restaurant on a busy street: whichever one a friend mentioned. It works out often enough that nobody questions it. But the differences between brokers compound over years of investing, and the switching cost afterwards is real.',
      },
      {
        type: 'p',
        text: 'Here is the comparison worth doing first, it takes an afternoon.',
      },
      { type: 'h2', text: '1. Regulatory standing' },
      {
        type: 'p',
        text: "The broker must be a TREC holder registered with the SECP and licensed to deal in securities. Verify this at source (on the PSX and SECP listings) rather than taking the firm's word for it. This is a five-minute check that eliminates an entire category of risk.",
      },
      { type: 'h2', text: '2. The full fee schedule, in writing' },
      {
        type: 'p',
        text: 'Ask for the complete schedule before you sign, not the headline commission rate. What you want to see: commission per trade and whether a minimum charge applies, account maintenance or custody fees, CDC charges passed through to you, fund transfer charges, and any inactivity fee.',
      },
      {
        type: 'p',
        text: 'The minimum per-trade charge matters enormously if you invest modest amounts regularly. A flat minimum can quietly consume several percent of a small order, which is a large headwind to overcome before you have earned anything.',
      },
      { type: 'h2', text: '3. The platform you will actually use' },
      {
        type: 'p',
        text: 'Ask for a demo. You will be in this interface every week for years. Check whether it works properly on your phone, since that is where most Pakistani investors actually trade, and ask what happens on high-volume days, platform outages during volatility are not rare, and they occur precisely when you need access.',
      },
      { type: 'h2', text: '4. Settlement and withdrawal speed' },
      {
        type: 'p',
        text: 'How quickly can you get money in, and (more importantly) out? Ask specifically how long a withdrawal takes to reach your bank account. A firm that is slow or vague on withdrawals is telling you something.',
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
      { type: 'h2', text: '9. Custody and transfer out of the broker' },
      {
        type: 'p',
        text: 'Ask, in writing, how to move your shares to another broker or to a CDC investor account. The answer should be spelled out: the form, the fee, the timeline. A broker that makes it hard to leave your assets is telling you the business is built on friction — and it never improves after you are inside.',
      },
      { type: 'h2', text: '10. The deposit requirements of the 2027 account opening round' },
      {
        type: 'p',
        text: 'Regulatory requirements change. In 2027 the NADRA and SECP/PSX digital verification stack is stronger than it has ever been, mandatory TSS (transaction screening) is live at most large TREC holders, and brokers periodically tighten or loosen onboarding criteria mid-cycle. The one rule that does not change: if the fee schedule, the minimum age, or the verification requirement is not on paper from the firm — do not rely on anyone’s verbal claim, including ours. Ask for the sheet.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Is my broker required to be a TREC holder?',
      },
      {
        type: 'p',
        text: 'Yes. PSX trading access is held by TREC holders, and the broker must be registered with the SECP and any required exchanges. Check the SECP and PSX member listings for yourself before you fill anything in.',
      },
      {
        type: 'h3',
        text: 'What if a broker’s app crashes during market open?',
      },
      {
        type: 'p',
        text: 'It happens — PSX’s infamous high-volume days are a feature of a technology-hungry market. Ask the support line what alternatives exist, whether phone orders work, and whether the firm has an outage post-mortem habit. A broker that tells you "our servers handle it" without evidence is not being honest.',
      },
      {
        type: 'h3',
        text: 'Should a beginner trade through a bank-backed broker?',
      },
      {
        type: 'p',
        text: 'Bank-backed brokers have the custody advantage and often easier onboarding, but their platforms skew corporate. Independent TREC holders tend to be more nimble for retail. There is no universally right answer — pick on platform quality, fees, and how responsive support is when you test it, not on the brand on the door.',
      },
      { type: 'h2', text: 'What should not decide it' },
      {
        type: 'ul',
        items: [
          'A relationship manager who promises returns. Nobody can promise returns, and the promise itself is disqualifying.',
          'The lowest commission alone, if the platform is unreliable.',
          "A friend's recommendation, unless your friend invests the way you intend to.",
          'Marketing that emphasises how much you could make rather than how the service works.',
        ],
      },
    ],
  },

  {
    slug: 'fundamental-vs-technical-analysis-for-beginners',
    title: 'Fundamental vs technical analysis: the honest guide for 2027',
    description:
      'Fundamental vs technical analysis explained clearly for Pakistani beginners: what each tells you, which to learn first, and how to use both in 2027.',
    category: 'Beginner',
    publishedAt: '2027-01-22',
    updatedAt: '2027-01-22',
    readingMinutes: 10,
    author: 'Investing Sparkle',
    body: [
      {
        type: 'p',
        text: 'Beginners are usually introduced to fundamental and technical analysis as opposing camps, each with adherents who think the other is wasting their time. That framing is unhelpful, because the two are not answering the same question.',
      },
      { type: 'h2', text: 'The two questions' },
      {
        type: 'p',
        text: 'Fundamental analysis asks: what is this business worth, and is the current price reasonable relative to that? It works from the company outward, revenue, margins, debt, competitive position, the quality of management, and what the sector is likely to do.',
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
        text: 'The strength of this approach is that it gives you a reason to own something that you can state out loud. The weakness is that it tells you nothing about timing, a company can be genuinely undervalued and stay that way for years.',
      },
      { type: 'h2', text: 'What technical analysis involves' },
      {
        type: 'p',
        text: 'Reading price charts, identifying trend and range, and using a small number of indicators (moving averages, RSI, and volume are enough to start) to describe what buyers and sellers are currently doing.',
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
        text: 'Then layer basic technicals on top, not to trade, but to avoid buying into a vertical move and to have a pre-decided level where you admit you were wrong.',
      },
      { type: 'h2', text: 'Where hybrid investors go wrong' },
      {
        type: 'p',
        text: 'The hybrid failure mode is reading every indicator you can find, then buying because three of them "agreed". Agreement between three indicators built from the same price series is not confluence — it is the same data dressed up three ways. Confluence means the funda contradicts the chart, or that the chart is noisy while the funda screams quality, and deciding which side to weight. Have one framework you trust, not eight you check.',
      },
      { type: 'h2', text: 'How this plays out in 2027 in PSX specifically' },
      {
        type: 'p',
        text: 'The KSE-100 has been through a decade of gap-ups and consolidations, and the market remains more narrative-driven than most developed markets — large moves still start from a sector narrative. In 2027, with filings, disclosures, and sector analysis all searchable, the edge sits further upstream: reading the report before the crowd does. Technical levels matter more in the moments of capitulation and euphoria; fundamentals matter more between the two. The frameworks do not compete; they own different minutes of the tape.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Can I be a successful investor without technical analysis at all?',
      },
      {
        type: 'p',
        text: 'Yes. Buy-and-hold investors who never look at a chart are a fully legitimate operator type. You will miss obvious entry discipline, but you cannot lever yourself into reading the tape daily, and you will not be tempted to exit on an inflection that has not happened yet.',
      },
      {
        type: 'h3',
        text: 'How much do I need to know before my first trade?',
      },
      {
        type: 'p',
        text: 'You need to be able to (1) explain why you own the business, (2) state the roughly correct number of shares to take, and (3) articulate what would make you sell. If you cannot answer all three, the analysis is incomplete — whether or not it uses charts.',
      },
      {
        type: 'h3',
        text: 'Is technical analysis reliable in thinly traded PSX names?',
      },
      {
        type: 'p',
        text: 'Be sceptical. Indicators assume continuous, deep liquidity, and PSX has stocks where one large shareholder or a single mutual fund block can gap the price through your levels without a single trade cooking a pattern. Stick with large-cap names if you lean on charts — that liquidity constraint is a foundational piece of why your list matters.',
      },
      { type: 'h2', text: 'The failure mode to avoid' },
      {
        type: 'p',
        text: 'The common beginner path is to skip fundamentals entirely, learn a few indicators, and start trading short-term, because the charts look actionable and the feedback is immediate. It usually ends the same way: a series of small losses and commission costs, and no framework left behind to build on.',
      },
      {
        type: 'p',
        text: 'The slower path builds something that still works in five years.',
      },
    ],
  },

  {
    slug: 'five-common-psx-beginner-mistakes',
    title: 'The five costliest mistakes new PSX investors make in 2027',
    description:
      'The five mistakes that actually cost new Pakistani investors money in 2027 — tips you cannot verify, wrong timelines, and concentration — and how to avoid them.',
    category: 'Beginner',
    publishedAt: '2027-01-25',
    updatedAt: '2027-01-25',
    readingMinutes: 10,
    author: 'Investing Sparkle',
    body: [
      {
        type: 'p',
        text: 'Every one of these is a mistake made by someone sensible, acting in good faith, with real money. None of them look foolish in the moment. That is exactly what makes them expensive.',
      },
      { type: 'h2', text: '1. Acting on a tip you cannot evaluate' },
      {
        type: 'p',
        text: 'Someone in a WhatsApp group says a stock is about to move. Sometimes they are right, which is the problem, the occasional win teaches you to keep listening.',
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
        text: 'Equity investing needs time to work, and it needs you to be able to sit through drawdowns without selling. Money earmarked for a wedding, a tuition payment, or a medical fund cannot do that, because the market does not consult your calendar.',
      },
      {
        type: 'p',
        text: 'Before any of it goes into shares: an emergency fund covering several months of expenses, held in cash. It feels like an unproductive use of money. It is what makes the rest of the portfolio survivable.',
      },
      { type: 'h2', text: '3. Concentrating everything in one or two names' },
      {
        type: 'p',
        text: 'New investors often hold two or three stocks, usually in the same sector, usually because those were the names they had heard of. The upside feels good. The downside is that a single company-specific event (a regulatory change, a bad quarter, a governance failure) can take a large share of your savings with it.',
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
        text: 'If your thesis is measured in years, review on a schedule, quarterly, when results are published, or when something specific changes about the business. Not continuously.',
      },
      { type: 'h2', text: 'What changed in 2027 (and what did not)' },
      {
        type: 'p',
        text: 'The traps are the same ones they have always been, but the environment makes them cheaper to fall into and slower to climb out of. Two things are different in 2027: brokers now impose transaction screening by SECP/PSX rules on every trade, and the FBR treats trading income with increasing seriousness. The trades you used to make casually are now traceable, taxed, and monitored — the cost of a bad habit is no longer just the price you pay for it.',
      },
      { type: 'h2', text: 'The three poor habits that sneak in alongside the five' },
      {
        type: 'ol',
        items: [
          'Believing a free tip because it arrived in a familiar format. The design of WhatsApp messages is engineered to make the claim feel vetted. It is not vetted.',
          'Buying a stock because the chart looks cheap. A low price is not a low valuation — a stock can be trading at a third of its high and still be expensive.',
          'Treating your brokerage app like a bank balance. The cash is not a savings account — it is idle cash with an opportunity cost, and it belongs either in your portfolio or in a real deposit, not sat in the trading wallet for months.',
        ],
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'How much of my savings should be in the stock market?',
      },
      {
        type: 'p',
        text: 'There is no one right answer, and any article that gives you one is selling you something. Use this rough frame: money you need in less than three years does not belong in equities; money you can leave alone for five or more years may reasonably start with a portion of it invested; if you would lose sleep every month, it is too much.',
      },
      {
        type: 'h3',
        text: 'Are WhatsApp and Telegram investing groups all scams?',
      },
      {
        type: 'p',
        text: 'Most are not scams in the sense of theft; they are worse, they are bad habits with occasional wins. The person running the room seldom shows their whole record, they do not carry the loss when they are wrong, and you never built a framework. Either learn the framework or leave the group.',
      },
      {
        type: 'h3',
        text: 'What is the single best fix for all five mistakes?',
      },
      {
        type: 'p',
        text: 'Write down, before you buy, why you are buying, how much, what you will check and when, and what would make you sell. A quarter-page written plan, kept next to the terminal, is the one decision that makes these five mistakes almost impossible to repeat.',
      },
      { type: 'h2', text: 'What connects all five' },
      {
        type: 'p',
        text: 'Every one of these is a decision made without a framework. The tip, the timeline mismatch, the concentration, the asymmetric selling, the constant checking, each is what happens when there is no pre-existing rule, so the decision gets made by whatever you happen to be feeling.',
      },
      {
        type: 'p',
        text: 'Building that framework is learnable, and it is most of what we teach.',
      },
    ],
  },
];

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
        text: 'Almost everyone who decides to invest in Pakistan hits the same wall in the first week. The money is ready, and then the paperwork starts, and nobody has ever explained it to them in plain words. We see this stall people before they have bought a single share.',
      },
      {
        type: 'p',
        text: 'Here is the honest version. I will walk you through it start to finish, in the order it actually happens.',
      },
      { type: 'h2', text: 'First, what a CDC account actually is' },
      {
        type: 'p',
        text: 'When you buy shares in Pakistan, you do not get a paper certificate. Your ownership is recorded electronically with the Central Depository Company. Your broker places trades for you, but the trail of who owns what is kept by the CDC.',
      },
      {
        type: 'p',
        text: 'That separation matters for one simple reason. Your shares live in a system that runs on legal records, not on whether your broker likes you. Never hand your account credentials to anyone, including us.',
      },
      { type: 'h2', text: 'The two things people call "a CDC account"' },
      {
        type: 'ul',
        items: [
          'A brokerage account, with a TREC-holder brokerage firm, which is what lets you place buy and sell orders.',
          'A depository sub-account, opened in your name through your broker, where your shareholding lives.',
        ],
      },
      {
        type: 'p',
        text: 'Open one and the other comes with it. One set of forms, one verification flow, both accounts in your name.',
      },
      { type: 'h2', text: 'Documents to have ready' },
      {
        type: 'p',
        text: 'Broker requirements vary, but you will almost always be asked for:',
      },
      {
        type: 'ul',
        items: [
          'Your CNIC, valid and not expired. An expired CNIC is the most common reason applications stall.',
          'Proof of a bank account in your own name. A cheque copy or bank statement works.',
          'Proof of address, if the address on your CNIC is outdated.',
          'A recent photograph and, often, a specimen signature.',
          'A source of income declaration.',
          'Your NTN, if you have one. Your filing status affects how your investment income is taxed.',
        ],
      },
      {
        type: 'callout',
        text: 'Tax rates and withholding percentages change between budgets. Confirm the current treatment with your broker or a tax professional rather than trusting an article, even this one.',
      },
      { type: 'h2', text: 'Picking the broker before you fill anything in' },
      {
        type: 'p',
        text: 'Do this first, not after. Switching brokers later is possible but painful, and the difference between a good and bad broker compounds for years.',
      },
      {
        type: 'p',
        text: 'Compare commission structure, platform quality, how fast withdrawals reach your bank, and whether the support team actually answers. The cheapest broker on paper is rarely the best deal for someone placing a handful of trades a month.',
      },
      { type: 'h2', text: 'What 2027 looks different' },
      {
        type: 'p',
        text: 'Account opening is almost entirely online now. Identity verification runs through NADRA digital checks, and most of the larger TREC holders finish the process within a few working days.',
      },
      {
        type: 'ul',
        items: [
          'Fully online onboarding is the norm at the larger brokers and most bank-backed firms.',
          'Biometric verification through NADRA is mandatory for account opening.',
          'The minimum age for a trading account is 18. Minors can hold a guardian-linked CDC account.',
        ],
      },
      { type: 'h2', text: 'Caution: the charges nobody reads out' },
      {
        type: 'p',
        text: 'Your contract note will carry a stack of small charges: PSX fees, SECP fees, CDC charges, GST on services, and your broker commission. None of it is hidden exactly, but almost nobody hears them spelled out before signing.',
      },
      {
        type: 'p',
        text: 'Ask for a full charge sheet and an example of a net settlement on an actual trade before you deposit anything. In 2027, FBR is treating trading income with a seriousness it did not have five years ago. Your NTN and your filing status change what you keep from every rupee of profit and every rupee of dividend.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'How much money do I need to open a CDC account?',
      },
      {
        type: 'p',
        text: 'There is usually no legal minimum. The practical minimum we would suggest is whatever you are comfortable leaving for a year or two, because you need enough left after fees and PSX lot sizes to make the effort worth it.',
      },
      {
        type: 'h3',
        text: 'Can I open more than one CDC account?',
      },
      {
        type: 'p',
        text: 'Yes. Many serious investors hold accounts with more than one broker. What you cannot do is hold the same shares under two accounts in two names. Keep your main account for the core holdings and a small one only if there is a real reason for it.',
      },
      {
        type: 'h3',
        text: 'How long does CDC account opening take in 2027?',
      },
      {
        type: 'p',
        text: 'A few working days for a clean application. Longer when documents are missing or inconsistent. The paperwork is rarely what slows it down; the mismatches are.',
      },
      { type: 'h2', text: 'After the account is open' },
      {
        type: 'p',
        text: 'An account is not the same as being ready. Before your first buy, you want to know what you are buying, how much of your savings belongs in shares at all, and what would make you sell. If you cannot answer those three, wait a week.',
      },
      {
        type: 'p',
        text: 'The paperwork is not the skill. The thinking is. That is most of what we teach.',
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
        text: 'If you follow Pakistani markets for a month, the same two index names keep coming up: KSE-100 and KMI-30. Most coverage assumes you already know the difference. Here it is.',
      },
      { type: 'h2', text: 'What an index is doing' },
      {
        type: 'p',
        text: 'An index is a measuring stick. A fixed basket of companies, weighted by a rule, turned into one number. The number itself tells you nothing. What matters is the direction and the speed, and which companies sit inside the basket.',
      },
      { type: 'h2', text: 'The KSE-100' },
      {
        type: 'p',
        text: 'The KSE-100 is the PSX benchmark. One hundred names, chosen to represent the market broadly: the largest company from each sector, plus the next largest by market cap.',
      },
      {
        type: 'p',
        text: 'When someone says "the market rose today", this is almost always what they mean.',
      },
      { type: 'h2', text: 'The KMI-30' },
      {
        type: 'p',
        text: 'The KMI-30 tracks 30 companies that pass Shariah screening. The screening covers what the company does, how much interest-bearing debt it carries, how much of its income is compliant, and a few related tests.',
      },
      {
        type: 'p',
        text: 'The practical upshot: conventional banks are excluded completely, and heavy borrowers can fail the ratio screens even when their core business is fine. Constituents get reviewed periodically.',
      },
      { type: 'h2', text: 'Why the difference shows up in returns' },
      {
        type: 'p',
        text: 'Different companies, different weights. When banks lead the market, the KSE-100 benefits and the KMI-30 does not join in. When PSX’s compliant leaders lead, the gap flips. Neither is "better". They measure different worlds and they take different turns.',
      },
      { type: 'h2', text: 'PSX all-shares and free-float indices' },
      {
        type: 'p',
        text: 'Beyond the two headline indices, PSX publishes a broader all-shares index and sector-level indices. The all-shares number tells you whether the market’s strength is broad or carried by a few heavyweights. Always check breadth before you assume everything is rallying.',
      },
      { type: 'h2', text: 'The thing index marketing never says' },
      {
        type: 'p',
        text: 'Indices are weighted. Change the weighting and you change the answer. Compare your own performance only with indices that use the same methodology you do: price-return indices are not the same as total-return indices.',
      },
      { type: 'h2', text: 'Which one is your benchmark' },
      {
        type: 'p',
        text: 'Your benchmark should match your investable universe.',
      },
      {
        type: 'ul',
        items: [
          'If you invest across the market, the KSE-100 is your reference point.',
          'If your universe is Shariah-compliant, benchmark yourself against the KMI-30. Comparing against the KSE-100 means comparing your returns with companies you will never buy, which is pointless.',
        ],
      },
      {
        type: 'callout',
        text: 'A benchmark is not a target. It is a mirror. Use it once a year to find out whether your decisions added anything versus simply holding the market you chose.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Which benchmark do mutual funds use?',
      },
      {
        type: 'p',
        text: 'Whichever one is printed in their offering document. Conventional equity funds usually declare the KSE-100 as their benchmark; Shariah-compliant funds declare the KMI-30 or a Shariah all-share index. Ask the distributor, or read the latest factsheet.',
      },
      {
        type: 'h3',
        text: 'Can the KMI-30 lag the KSE-100 for years?',
      },
      {
        type: 'p',
        text: 'Yes, and it can lead for years too. The Shariah universe is smaller and more concentrated. It will perform differently from the broad market, by construction.',
      },
      {
        type: 'h3',
        text: 'I am Shariah-only. Should I still look at the KSE-100?',
      },
      {
        type: 'p',
        text: 'For context, yes. It tells you whether the whole market is moving. As a benchmark to judge your portfolio, no. That measures your performance against companies you have no intention of owning.',
      },
      { type: 'h2', text: 'A note on sector indices' },
      {
        type: 'p',
        text: 'If your stock fell 4% on a day its whole sector fell 4%, that is a sector move. If it fell 4% on a day the sector was flat, that is about the company. Sector indices are the fastest way to tell the two apart.',
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
        text: 'Most people pick a broker the way they pick a place to eat. A friend said it was good. It works out often enough that nobody questions it. But the differences between brokers add up over years, and switching mid-way is never painless.',
      },
      {
        type: 'p',
        text: 'Here is the afternoon well spent before you open an account.',
      },
      { type: 'h2', text: '1. Regulatory standing' },
      {
        type: 'p',
        text: 'The broker must be a TREC holder registered with the SECP. Verify it yourself on the PSX and SECP listings. Five minutes, eliminates an entire category of disaster.',
      },
      { type: 'h2', text: '2. The full fee schedule, in writing' },
      {
        type: 'p',
        text: 'Never settle for the headline commission rate. Ask for everything: commission per trade and whether a minimum applies, custody and maintenance charges, CDC pass-throughs, fund transfer fees, and any inactivity fee.',
      },
      {
        type: 'p',
        text: 'For someone who buys a handful of trades a month, a flat minimum per trade can eat a real percentage of small positions. Ask to see a worked example.',
      },
      { type: 'h2', text: '3. The platform you will be in every week' },
      {
        type: 'p',
        text: 'Ask for a demo. Most Pakistani investors trade on their phones more than on desktops. Check that the app actually works, and ask what happens on high-volume days, when everyone rushes the same orders.',
      },
      { type: 'h2', text: '4. Settlement and withdrawal speed' },
      {
        type: 'p',
        text: 'How fast can money get in, and more importantly, how fast does it come out? If a firm is slow or vague about withdrawals, that is the single loudest signal you will get before your money is inside.',
      },
      { type: 'h2', text: '5. Research, and who it serves' },
      {
        type: 'p',
        text: 'Broker research can be genuinely useful. Read it with the structural conflict in mind: the firm earns when you trade. That does not make it wrong, but it means you judge the reasoning, not the recommendation.',
      },
      {
        type: 'callout',
        text: 'Hold us to the same standard. Judge frameworks, not people.',
      },
      { type: 'h2', text: '6. Support that answers' },
      {
        type: 'p',
        text: 'Call support before you open the account with a real question. How long the wait is, and whether the person on the line can actually help you, tells you more about what happens when something goes wrong than any brochure.',
      },
      { type: 'h2', text: '7. Account opening friction' },
      {
        type: 'p',
        text: 'Fully online opening with clear requirements and a stated turnaround is a good sign the company runs properly. A weak signal, but a useful tiebreaker between otherwise identical options.',
      },
      { type: 'h2', text: '8. People who cannot promise returns' },
      {
        type: 'p',
        text: 'If a relationship manager promises returns of any kind, walk out. Nobody can promise returns, and the fact that they are making one is disqualifying.',
      },
      { type: 'h2', text: '9. Custody and how to leave' },
      {
        type: 'p',
        text: 'Ask in writing how you transfer shares to another broker or to a CDC investor account. A broker that makes leaving difficult is telling you the business model. Leaving should never be hard.',
      },
      { type: 'h2', text: '10. The 2027 account-opening bar' },
      {
        type: 'p',
        text: 'Verification is stricter than it was two years ago, and onboarding criteria tighten without notice. The one rule that never changes: if the fee schedule, the minimum age, or the verification requirement is not on paper from the firm itself, do not take anyone’s word for it. Ask for the sheet.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Is my broker required to be a TREC holder?',
      },
      {
        type: 'p',
        text: 'Yes, to trade on PSX. Check the SECP and PSX member lists before filling in a single form.',
      },
      {
        type: 'h3',
        text: 'What if the app crashes during the open?',
      },
      {
        type: 'p',
        text: 'It can and does on crowded days. Ask what the fallback is: phone orders, a second platform, a known outage policy. A firm that says "it never happens" without evidence is not being straight with you.',
      },
      {
        type: 'h3',
        text: 'Should I prefer a bank-backed broker?',
      },
      {
        type: 'p',
        text: 'Bank-backed brokers often feel easier for beginners. Independent TREC holders tend to be faster for retail traders. Pick on platform quality, fees and support, not on the name on the building.',
      },
      { type: 'h2', text: 'What should not decide it' },
      {
        type: 'ul',
        items: [
          'Anyone who promises returns.',
          'Commission alone, when the platform is unreliable.',
          'A friend’s recommendation that does not match how you invest.',
          'Marketing built around how much you could make, rather than how the service works.',
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
        text: 'Beginners meet fundamental and technical analysis as rival religions. They are not rivals and never were. They are two different tools answering two different questions.',
      },
      { type: 'h2', text: 'The two questions' },
      {
        type: 'p',
        text: 'Fundamental analysis asks what this business is worth, and whether the current price makes sense. It starts with the company and its numbers: revenue, margins, debt, competitive position, how the sector is likely to move.',
      },
      {
        type: 'p',
        text: 'Technical analysis asks what price and volume have been doing, and what that says about supply and demand right now. It starts with the chart and asks nothing about the company.',
      },
      {
        type: 'callout',
        text: 'Fundamentals mostly tell you what to buy. Technicals mostly tell you when. They work best together, not as competing beliefs.',
      },
      { type: 'h2', text: 'What fundamental analysis involves' },
      {
        type: 'p',
        text: 'Reading the annual report, working through the income statement, balance sheet and cash-flow statement, then a few ratios to compare the company with itself over time and against peers. P/E, return on equity, debt-to-equity and dividend yield will get you remarkably far.',
      },
      {
        type: 'p',
        text: 'Its strength is that it gives you a reason to own a stock you can say out loud. Its weakness is that it says nothing about timing. A genuinely cheap stock can stay cheap for years before the market agrees with you.',
      },
      { type: 'h2', text: 'What technical analysis involves' },
      {
        type: 'p',
        text: 'Reading charts, spotting trend and range, using a small toolkit (moving averages, RSI, volume) to understand what buyers and sellers are actually doing.',
      },
      {
        type: 'p',
        text: 'Its strength is timing and discipline, because it gives you a level at which you were wrong. Its weakness is that a chart cannot tell you whether a business is sound, and thinly traded stocks on PSX spit out misleading patterns constantly.',
      },
      { type: 'h2', text: 'The order to learn them in' },
      {
        type: 'ol',
        items: [
          'Fundamentals first, because they teach you what a company is, which is the thing you are buying.',
          'Fundamentals first, because most retail investors should be thinking in years, not weeks.',
          'Fundamentals first, because charts tempt you to see patterns that are just noise, while financial statements are very hard to fool yourself with.',
        ],
      },
      {
        type: 'p',
        text: 'Layer basic technicals on top afterwards. Not to trade, just to avoid buying into a vertical move and to have a pre-agreed level where you admit you were wrong.',
      },
      { type: 'h2', text: 'Where hybrid investors go wrong' },
      {
        type: 'p',
        text: 'The classic failure is reading ten indicators, then buying because three "agreed". Three indicators built from the same price series agreeing with each other is not confluence. It is the same data in three outfits.',
      },
      {
        type: 'p',
        text: 'Real confluence is when the fundamentals contradict the chart, or vice versa, and you decide which side to trust after thinking hard about both. One framework you trust beats eight you consult.',
      },
      { type: 'h2', text: 'How this plays out in 2027 on PSX' },
      {
        type: 'p',
        text: 'PSX remains more narrative-driven than deep markets. Big moves still start from sector stories, and the investors who read reports before the crowd still capture most of it. In 2027, with filings and disclosures far more searchable than five years ago, the edge is upstream of the tape: read the report first.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Can I skip technicals entirely?',
      },
      {
        type: 'p',
        text: 'Yes. Buy-and-hold investors never look at a chart and do fine. You will miss the odd entry discipline, but you also lose the temptation to sell on every wiggle.',
      },
      {
        type: 'h3',
        text: 'How much do I need to know before my first trade?',
      },
      {
        type: 'p',
        text: 'Enough to explain why you own the business, roughly how much you can buy, and what would make you sell. If you cannot say those three, the analysis is not finished, and neither is your trade.',
      },
      {
        type: 'h3',
        text: 'Are charts reliable in thinly traded PSX stocks?',
      },
      {
        type: 'p',
        text: 'Be careful. Indicators assume continuous deep liquidity, and PSX has names where one block deal gaps the price through your levels. Stick to liquid names if you lean on charts at all.',
      },
      { type: 'h2', text: 'The failure mode to avoid' },
      {
        type: 'p',
        text: 'The typical beginner path is to skip fundamentals, memorise a few indicators, and start trading short-term. It usually ends the same way: commission eaten alive, no framework left behind, and the conclusion that the market does not work for normal people.',
      },
      {
        type: 'p',
        text: 'The slow path builds something that still works in five years.',
      },
    ],
  },

  {
    slug: 'five-common-psx-beginner-mistakes',
    title: 'The five costliest mistakes new PSX investors make in 2027',
    description:
      'The five mistakes that actually cost new Pakistani investors money in 2027: tips you cannot verify, wrong timelines, and concentration. How to avoid them.',
    category: 'Beginner',
    publishedAt: '2027-01-25',
    updatedAt: '2027-01-25',
    readingMinutes: 10,
    author: 'Investing Sparkle',
    body: [
      {
        type: 'p',
        text: 'Every one of these mistakes is made by people who are trying hard, not by people who are stupid. That is what makes them expensive.',
      },
      { type: 'h2', text: '1. Acting on a tip you cannot evaluate' },
      {
        type: 'p',
        text: 'A WhatsApp message says a stock is about to move. Sometimes those people are right, which is the whole problem: the occasional win teaches you to keep listening.',
      },
      {
        type: 'p',
        text: 'The real issue is not accuracy. A tip gives you an entry and nothing else. You have no thesis, no holding period in mind, and no exit. The person who passed you the tip never loses when you lose.',
      },
      {
        type: 'p',
        text: 'The test: can you explain, in two sentences, why this company is worth owning? If not, you are not investing. You are forwarding a message.',
      },
      { type: 'h2', text: '2. Money you will need sooner than three years' },
      {
        type: 'p',
        text: 'Equities repay patience and punish urgency. Money for a wedding, a house move, or a semester’s fees cannot ride out a 25% drawdown, because the market does not check your calendar.',
      },
      {
        type: 'p',
        text: 'An emergency fund of three to six months of essential expenses comes first. It feels like dead money. It is what lets the rest of your portfolio survive the parts of the cycle that hurt.',
      },
      { type: 'h2', text: '3. Putting everything into one or two stocks' },
      {
        type: 'p',
        text: 'Two or three names, usually from the same sector, usually because those were the ones you had heard of. One bad quarter and your net worth discovers it the hard way.',
      },
      {
        type: 'p',
        text: 'Diversification does not demand a dozen holdings. It demands that no single event can do serious damage, and that your holdings are not all riding on one risk.',
      },
      { type: 'h2', text: '4. Selling the winner and holding the loser' },
      {
        type: 'p',
        text: 'One of the most reliably documented patterns in human behaviour: realise gains quickly, hold losses forever, because selling at a loss means admitting the call was wrong.',
      },
      {
        type: 'p',
        text: 'The market does not know what you paid. The question that matters is whether you would buy this company today at this price. If the answer is no, your purchase price is not a reason to keep holding.',
      },
      {
        type: 'callout',
        text: 'Write down, when you buy, what would make you sell. A rule decided in advance is nearly impossible to break mid-loss. A rule made in the moment is no rule at all.',
      },
      { type: 'h2', text: '5. Watching the ticker every day' },
      {
        type: 'p',
        text: 'It feels like attentiveness. In practice it is a machine for manufacturing urges. Daily price movement says almost nothing about a five-year outcome, and watching it closely makes you want to act on nothing.',
      },
      {
        type: 'p',
        text: 'Review on a schedule: quarterly, when results come out, or when something specific in the business changes. Not continuously.',
      },
      { type: 'h2', text: 'What changed in 2027 (and what did not)' },
      {
        type: 'p',
        text: 'The traps are identical to before, but the cost of falling in them has risen. PSX now screens and records every trade, and FBR tracks trading income with far more seriousness than it used to. Casual sloppiness is no longer cheap.',
      },
      { type: 'h2', text: 'The three habits that sneak in alongside those five' },
      {
        type: 'ol',
        items: [
          'Trusting a tip because it arrived neatly formatted. WhatsApp forwards are engineered to feel vetted. They are not.',
          'Buying because the chart looks "cheap". A low price is not a low valuation. A stock can trade at a third of its high and still be expensive.',
          'Treating your brokerage app like a bank balance. Idle cash there has an opportunity cost, and it is not zero.',
        ],
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'How much of my savings should be in shares?',
      },
      {
        type: 'p',
        text: 'Nobody can give you a number without knowing your income, debts, family situation and temperament. The useful frame: money you need within three years does not belong in equities. Money you can leave alone for five or more is the legitimate investing pot.',
      },
      {
        type: 'h3',
        text: 'Are all WhatsApp and Telegram stock groups scams?',
      },
      {
        type: 'p',
        text: 'Most are not scams in the plain sense. They are worse: bad advice with a few lucky wins. The admin rarely shows their full track record, and they never share your loss.',
      },
      {
        type: 'h3',
        text: 'What is the single most effective fix for all five?',
      },
      {
        type: 'p',
        text: 'Write down, before you buy, why you are buying, how much you can lose, what you will check, and what makes you sell. One page, kept by the terminal, and these five mistakes become very hard to repeat.',
      },
      { type: 'h2', text: 'What connects all five' },
      {
        type: 'p',
        text: 'Every one of these failures comes from investing without a plan. The tip, the mismatched timeline, the concentration, the asymmetrical selling, the constant watching. Each is what happens when there is no rule, so the decision gets made by whatever mood you are in.',
      },
      {
        type: 'p',
        text: 'Building the plan is learnable, and most of what we teach lives inside it.',
      },
    ],
  },
];

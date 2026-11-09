import type { Article } from '../types';

/**
 * Behaviour and risk — the part of investing that decides most outcomes and
 * gets the least attention. Also holds the advisory-category articles, which
 * explain what our services actually involve.
 */

export const behaviourArticles: Article[] = [
  {
    slug: 'emergency-fund-before-investing',
    title: 'Emergency fund before investing: the 2027 rule that decides the rest',
    description:
      'Why saving an emergency fund before you invest matters more in 2027: the maths of forced sales, how much to save, where to keep it, and how to build it.',
    category: 'Beginner',
    publishedAt: '2027-02-09',
    updatedAt: '2027-02-09',
    readingMinutes: 9,
    author: 'Investing Sparkle',
    related: ['how-to-build-your-first-psx-portfolio', 'sip-investing-in-pakistan'],
    body: [
      {
        type: 'p',
        text: 'Nobody signs up for a session on emergency funds. Everyone signs up for stock picking. Shame, because the emergency fund quietly decides whether the stock picking ever works.',
      },
      { type: 'h2', text: 'Why it matters more than the market' },
      {
        type: 'p',
        text: 'Imagine two investors who buy identical portfolios on the same day. Eighteen months later the market is down 20%. A normal rough patch, not an Armageddon.',
      },
      {
        type: 'p',
        text: 'The first investor has six months of expenses in cash. A bill arrives, a medical thing, a car thing, whatever it is. They pay it. The portfolio stays untouched. Two years later the market has recovered and they are ahead of where they started.',
      },
      {
        type: 'p',
        text: 'The second investor has no cushion. The same bill arrives. The only cash they can reach is in the portfolio, so they sell at a 20% loss to pay it. That loss is now locked in forever. Two years later the market recovers and they are not there for it.',
      },
      {
        type: 'p',
        text: 'Same market, same stocks, same two people. One behavioural difference decided everything, and it had nothing to do with investing.',
      },
      { type: 'h2', text: 'How much' },
      {
        type: 'p',
        text: 'Three to six months of essential expenses is the working number. Essential means rent, utilities, food, transport, school fees and loan payments, not every rupee you spend.',
      },
      {
        type: 'p',
        text: 'Lean toward six months if your income is irregular, if you are self-employed, or if you are the sole earner in the house. Three can be fine for a stable dual-income salaried household.',
      },
      {
        type: 'callout',
        text: 'Use your real expenses, not an estimate off the top of your head. Most people are surprised by the actual number, which is valuable information in itself.',
      },
      { type: 'h2', text: 'What 2027 looks like on the ground' },
      {
        type: 'p',
        text: 'Inflation has been persistent, rates have lurched from historic highs down again. Cash is no longer dead money, savings accounts actually pay something now. That removes the one excuse that used to be most tempting: "But cash earns nothing." It earns something again, just not as much as equities over long horizons, and that is fine. This is not an investment, it is a shock absorber.',
      },
      { type: 'h2', text: 'Where it should sit' },
      {
        type: 'p',
        text: 'Somewhere reachable within a day or two, at stable value. A savings account, current account, or a money market instrument you can redeem quickly. Not shares. The whole point is full value on a day you choose, sometimes in a week where everything else is falling.',
      },
      { type: 'h2', text: 'The objection, and the answer' },
      {
        type: 'p',
        text: 'When people object that holding cash drags returns, they are technically right and entirely missing the point. The emergency fund is not an investment. It is the thing that lets the investments be left alone. Its return is a series of forced sales that never happened, and that is worth more than the yield difference between it and an index fund.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Does the fund need to be in one account?',
      },
      {
        type: 'p',
        text: 'No. A current account for day-to-day, a savings account for returns, maybe some T-bills for the portion you will not touch for months. The only rule is: would you be able to use it within a day or two if you had to? If yes, the structure is fine.',
      },
      {
        type: 'h3',
        text: 'Is gold part of the emergency fund?',
      },
      {
        type: 'p',
        text: 'Not really. Gold moves, and your emergency money cannot move. Some people hold gold for wealth protection, separate from emergency cash. Do not confuse the two.',
      },
      {
        type: 'h3',
        text: 'How do I stop myself dipping in?',
      },
      {
        type: 'p',
        text: 'Label it. Literally. A separate account nickname like "Emergency only" on your phone makes it harder to spend casually. Most raids happen in the first tight week of a month. Awareness of that is most of the fix.',
      },
      { type: 'h2', text: 'Building one' },
      {
        type: 'p',
        text: 'Start with one month of essentials. That alone changes the dynamic. Then build toward three to six over time, treating it as a fixed transfer on salary day, because whatever is left at month-end gets spent, every time.',
      },
      { type: 'h2', text: 'The honest sequence' },
      {
        type: 'ol',
        items: [
          'One month in cash.',
          'Clear expensive short-term debt. That is a guaranteed return no market hands you.',
          'Build to three to six months.',
          'Then, and only then, start investing.',
        ],
      },
      {
        type: 'p',
        text: 'If you are still on step one, the honest suggestion is learn now, invest later. Learning costs nothing and compounds. Investing before this foundation exists is how people conclude most markets do not work for ordinary people, when really it was the sequence that failed them.',
      },
    ],
  },

  {
    slug: 'position-sizing-and-risk-management',
    title: 'Position sizing and risk management: the skill behind 2027 returns',
    description:
      'How much to risk per holding in 2027: position sizing rules, the arithmetic of losses, liquidity-adjusted sizing, and the one-page pre-trade framework.',
    category: 'Intermediate',
    publishedAt: '2027-02-11',
    updatedAt: '2027-02-11',
    readingMinutes: 11,
    author: 'Investing Sparkle',
    related: ['how-to-build-your-first-psx-portfolio', 'when-to-sell-a-stock'],
    body: [
      {
        type: 'p',
        text: 'Nearly all the attention in investing goes to what to buy. Nearly all the damage comes from how much.',
      },
      {
        type: 'p',
        text: 'You can be right about most of your holdings and still do badly if exactly one of them is bigger than the rest put together. You can also be wrong more than half the time and do fine, if your losses are small and your winners get to run.',
      },
      { type: 'h2', text: 'Start from what you do not know' },
      {
        type: 'p',
        text: 'How big a position deserves to be is a function of your uncertainty, not your enthusiasm. And enthusiasm is usually strongest exactly where knowledge is shallowest, because the complications you have not discovered cannot yet temper it.',
      },
      {
        type: 'p',
        text: 'A useful trick before sizing anything: write down the three things that would have to go wrong for this holding to lose half its value. If producing that list is not easy, you do not understand the business well enough to size it big.',
      },
      { type: 'h2', text: 'A practical framework' },
      {
        type: 'ul',
        items: [
          'Standard position: roughly equal weight. Ten ideas, about 10% each.',
          'Maximum: no single holding above roughly 15%, no matter how good it looks.',
          'Sector cap: no more than about 30% in one sector, however many companies you own inside it.',
          'Floor: big enough that fees do not eat a meaningful share, and big enough to matter if you are right.',
        ],
      },
      {
        type: 'p',
        text: 'These are not laws. They are defaults against the one failure that ruins beginners: a single position that decides the entire outcome.',
      },
      { type: 'h2', text: 'The 1-2% risk rule' },
      {
        type: 'p',
        text: 'A concrete tool worth stealing: never risk more than 1% to 2% of your portfolio on one idea. If a position goes to zero, that is your maximum pain. In 2027’s PSX, where gaps through stop levels are routine and liquidity is patchy, this rule is not optional. It is what keeps an ordinary person investing through a bad year.',
      },
      { type: 'h2', text: 'The arithmetic of losses' },
      {
        type: 'ul',
        items: [
          'Lose 10%, and you need about 11% to get back.',
          'Lose 25%, and you need about 33%.',
          'Lose 50%, and you need 100%.',
          'Lose 75%, and you need 300%.',
        ],
      },
      {
        type: 'p',
        text: 'Avoiding ruinous losses therefore buys you more than hunting big winners does. A portfolio that never suffers a catastrophic position does not need miracles from the survivors.',
      },
      {
        type: 'callout',
        text: 'Position sizing is what makes being wrong survivable. You will be wrong regularly. The only real question is whether it costs you a hard quarter or several years.',
      },
      { type: 'h2', text: 'Liquidity is part of size' },
      {
        type: 'p',
        text: 'PSX is shallower than most markets people imagine. Before sizing a position, look at the average daily traded volume and ask how many days you would need to sell your intended stake without moving the price against yourself.',
      },
      {
        type: 'p',
        text: 'If the answer is more than a few days, the position is too big, however attractive the company. A holding you cannot exit is not a position. It is a commitment.',
      },
      { type: 'h2', text: 'Letting winners grow, within limits' },
      {
        type: 'p',
        text: 'If something does well, it takes more of the portfolio automatically. Up to a point that is wonderful: it is what you wanted.',
      },
      {
        type: 'p',
        text: 'Past your cap, trim it back. It will feel wrong every time because you are selling the thing that is working. But 30% of your portfolio now decides the outcome by itself, and none of your reasons for diversifying have stopped applying.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Do I start a full position or add gradually?',
      },
      {
        type: 'p',
        text: 'Add gradually, especially on the first few. Buy a starter block, see whether the story holds after you own it, and add when you have earned the right to add.',
      },
      {
        type: 'h3',
        text: 'What about a stock that doubles?',
      },
      {
        type: 'p',
        text: 'Trimming it back to your cap crystallises gains and removes dependence on a single name. Celebrate it, keep the compounder if you believe in it, and stop one idea deciding your future.',
      },
      {
        type: 'h3',
        text: 'Is leverage ever okay?',
      },
      {
        type: 'p',
        text: 'Not for retail portfolios. Leverage turns ordinary volatility into a position-closing event. If an idea needs margin to be worth owning, it is not worth owning.',
      },
      { type: 'h2', text: 'What to write down before buying' },
      {
        type: 'ol',
        items: [
          'Target weight and the reasoning behind that size.',
          'The three things that would halve it.',
          'The level or event that proves you were wrong.',
          'The weight past which you trim.',
        ],
      },
      {
        type: 'p',
        text: 'Four lines, written before money is at stake, which is the only time you can look at the position clearly.',
      },
    ],
  },

  {
    slug: 'when-to-sell-a-stock',
    title: 'When to sell a stock (2027): the framework nobody teaches',
    description:
      'When to sell a PSX stock in 2027: the three valid reasons, four traps, tax implications of selling, and how to write your exit rules before you buy.',
    category: 'Intermediate',
    publishedAt: '2027-02-13',
    updatedAt: '2027-02-13',
    readingMinutes: 10,
    author: 'Investing Sparkle',
    related: ['position-sizing-and-risk-management', 'how-to-value-a-stock'],
    body: [
      {
        type: 'p',
        text: 'Every course teaches you what to buy. Almost nothing teaches you when to sell, which is strange, because selling is where most of the pain lives and where a lot of returns are actually decided.',
      },
      { type: 'h2', text: 'The principle everything follows from' },
      {
        type: 'p',
        text: 'The market has no memory of what you paid. Price history is your story, not the company’s.',
      },
      {
        type: 'p',
        text: 'The only question that matters: at today’s price, knowing what you know now, would you buy this stock? If the answer is no, what is keeping you in the trade is not conviction. It is the unwillingness to accept a decision went badly.',
      },
      { type: 'h2', text: 'Three valid reasons to sell' },
      { type: 'h3', text: '1. The thesis broke' },
      {
        type: 'p',
        text: 'You bought for reasons. One of them stopped being true. The moat eroded, the debt became unmanageable, management changed course, the regulation shifted under the business.',
      },
      {
        type: 'p',
        text: 'This is the cleanest reason there is, and only people who wrote the thesis down can tell the difference between it and "the price fell and I feel weak".',
      },
      { type: 'h3', text: '2. You found something clearly better' },
      {
        type: 'p',
        text: 'Capital is finite. If a materially better idea exists and you have no spare cash, funding it by selling your weakest position is rational. The new idea must be clearly better though, not just more exciting on a charts-for-an-afternoon basis.',
      },
      { type: 'h3', text: '3. The position outgrew its home' },
      {
        type: 'p',
        text: 'If a holding has risen past its target weight because of price alone, trim it back toward the cap. Not because you lost faith, because concentration does not care how well it has treated you so far.',
      },
      { type: 'h2', text: 'Four bad reasons' },
      { type: 'h3', text: '1. It went up' },
      {
        type: 'p',
        text: 'Selling purely for the gains means systematically pruning the things that are working. Long-term portfolio returns usually come from a few holdings that went far over many years, and every one of them felt "too high" multiple times along the way.',
      },
      { type: 'h3', text: '2. It went down' },
      {
        type: 'p',
        text: 'A falling price is information about sentiment, not necessarily about the business. Check the business. That is the entire discipline.',
      },
      { type: 'h3', text: '3. Waiting for break-even' },
      {
        type: 'p',
        text: '"I’ll sell when it returns to what I paid." Nobody noticing this is how they hand a broken thesis extra money in exchange for emotional relief. Your purchase price is not a rescue line.',
      },
      { type: 'h3', text: '4. Because someone else said so' },
      {
        type: 'p',
        text: 'If a tip was never good enough to buy on, it is never good enough to sell on. Tips are not a decision framework.',
      },
      {
        type: 'callout',
        text: 'People sell winners fast to lock in gains and hold losers forever to avoid admitting error. Precisely backwards, every time. Knowing this is most of the defence.',
      },
      { type: 'h2', text: 'Tax before you press the button' },
      {
        type: 'p',
        text: 'Every sale is a tax event. Timing matters: some positions are cheaper to close just after the year, some losses offset gains better realised in one tax year than another, and your filer status changes everything. Ask your tax professional with the current law, because every budget rewrites it. Do not hold a broken position just to delay the bill.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'What if it keeps falling after I sell?',
      },
      {
        type: 'p',
        text: 'Sometimes it does. That is survivable. Holding a loser because of purchase price is not a strategy, it is an anchor. Being wrong twice is preferable to being wrong indefinitely.',
      },
      {
        type: 'h3',
        text: 'Can I re-buy what I sold?',
      },
      {
        type: 'p',
        text: 'Of course, if the facts changed or the price returned to a level where the thesis makes sense again. Re-entering from a clean read is correct, not indecisive.',
      },
      {
        type: 'h3',
        text: 'What if I need the cash soon?',
      },
      {
        type: 'p',
        text: 'Sell. That is what these positions exist for, and any amount you might need within three years should not have been there in the first place. Your portfolio is not more important than your immediate needs.',
      },
      { type: 'h2', text: 'Decide before you own it' },
      {
        type: 'p',
        text: 'Write the sell conditions at purchase, when you have nothing at stake and can think clearly. Something like: "I exit if debt-to-equity crosses X, if the dividend is cut, if revenue has fallen for two consecutive periods, or if this position exceeds 15% of the portfolio."',
      },
      {
        type: 'p',
        text: 'When the moment arrives, you are following a rule you already chose, not making one up under pressure. That is the whole craft, and it is worth more than any additional analysis.',
      },
      { type: 'h2', text: 'On taxes and costs' },
      {
        type: 'p',
        text: 'Selling has friction: commission, potential capital-gains tax. Factor it in, but do not let it trap you in a broken position. Paying tax on a gain is a far better outcome than watching that gain evaporate to avoid it.',
      },
    ],
  },

  {
    slug: 'long-term-vs-day-trading-pakistan',
    title: "Long-term investing vs day trading in Pakistan 2027: the honest comparison",
    description:
      'Long-term investing vs day trading on PSX in 2027: real costs, tax on short-term gains, and why most salaried investors should not day trade.',
    category: 'Beginner',
    publishedAt: '2027-02-15',
    updatedAt: '2027-02-15',
    readingMinutes: 9,
    author: 'Investing Sparkle',
    related: ['five-common-psx-beginner-mistakes', 'reading-a-stock-chart-basics'],
    body: [
      {
        type: 'p',
        text: 'People use investing and trading as if they were the same activity. They are not. They need different skills, suit different temperaments, and carry wildly different odds.',
      },
      { type: 'h2', text: 'What each one actually is' },
      {
        type: 'p',
        text: 'Investing is buying a slice of a business because you believe it will be worth more over years, and collecting dividends while you wait. Your return comes from the business working.',
      },
      {
        type: 'p',
        text: 'Short-term trading means buying and selling to profit from price movement over days or weeks. Your return comes from other participants. Someone sells to you before it rises, or buys from you before it falls.',
      },
      { type: 'h2', text: 'The costs you pay before you earn anything' },
      {
        type: 'ul',
        items: [
          'Commission on every trade, both ways. A hundred round trips a year is two hundred commissions.',
          'Minimum per-trade charges hitting small positions hard.',
          'The spread, the silent cost that never shows up on a statement.',
          'Tax on realised gains, far more often than a long-term holder pays it.',
          'Slippage in thinly traded stocks, where your own order moves the price.',
        ],
      },
      {
        type: 'p',
        text: 'A day trader must clear all of that before earning a rupee. A long-term holder pays the fee twice, entering and exiting, maybe years apart.',
      },
      { type: 'h2', text: 'The 2027 cost landscape for short-term traders' },
      {
        type: 'p',
        text: 'Everything got more expensive for day trading in 2027. SECP and PSX screening pass through to every trade. Withholding touches transaction charges in practice. FBR is monitoring trading activity with new seriousness, and it is no longer possible to trade in an informal bubble.',
      },
      { type: 'h2', text: 'The Pakistani specifics' },
      {
        type: 'ul',
        items: [
          'PSX liquidity is concentrated. Many listed names trade thinly, so getting in and out quickly is expensive and sometimes impossible.',
          'Policy and currency announcements can reprice the entire market between one session and the next.',
          'Information does not reach everyone at the same time. If you heard it first as news, the market had it earlier.',
        ],
      },
      {
        type: 'callout',
        text: 'Ask yourself who is on the other side of your trade, and why you think you know something they do not. If you have no answer, you are the liquidity, not the edge.',
      },
      { type: 'h2', text: 'The time cost' },
      {
        type: 'p',
        text: 'Active trading means watching the market during market hours. For someone with a day job, that is two lives badly done, or one terribly neglected. Long-term investing asks for a few hours a quarter. That alone usually decides the question.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Is day trading ever viable here?',
      },
      {
        type: 'p',
        text: 'For professionals with real infrastructure, quant models and whole-day attention, certainly. For a salaried person doing this around lunch breaks, no, and anyone telling you otherwise is selling something.',
      },
      {
        type: 'h3',
        text: 'What about weekend pre-positioning?',
      },
      {
        type: 'p',
        text: 'The Monday open is chaotic enough that anything decided over a quiet weekend usually leaks away in the first hour. If that offends you, it is probably pointing you toward investing rather than trading.',
      },
      {
        type: 'h3',
        text: 'What about swing trading over days or weeks?',
      },
      {
        type: 'p',
        text: 'Swing trading is more workable than intraday, and still requires the same discipline plus the stomach to hold into weekends with news pending. Most casual swingers lose it on gaps, not decisions.',
      },
      { type: 'h2', text: 'Where we stand' },
      {
        type: 'p',
        text: 'We teach investing, because for overwhelmingly most people who come to us, active trading is the wrong activity for their time, their capital and their temperament. If you still want to try after understanding the costs, do it with an amount you can lose entirely, keep honest records, and compare the result to simply having bought and held. Most people who make that comparison carefully finish the year wishing they had.',
      },
    ],
  },

  {
    slug: 'how-to-survive-a-market-crash',
    title: 'How to survive a stock market crash in 2027: a pre-committed playbook',
    description:
      'Surviving PSX crashes in 2027: the order of operations when everything falls, why emergency funds matter more in volatile markets, and how to buy the dip wisely.',
    category: 'Intermediate',
    publishedAt: '2027-02-17',
    updatedAt: '2027-02-17',
    readingMinutes: 10,
    author: 'Investing Sparkle',
    related: ['emergency-fund-before-investing', 'when-to-sell-a-stock'],
    body: [
      {
        type: 'p',
        text: 'Read this now while prices are calm. The entire point is that a crash is the one moment you are least capable of thinking clearly, so the thinking has to be done beforehand.',
      },
      { type: 'h2', text: 'What normal looks like' },
      {
        type: 'p',
        text: 'Sharp declines are a recurring feature of equity markets, not an aberration. Any investor with a decade horizon should expect to live through several, including one or two genuinely nasty ones.',
      },
      {
        type: 'p',
        text: 'The first always feels like a special case. Sometimes the situation really is unprecedented. The response that works is the same response that worked before.',
      },
      { type: 'h2', text: 'What actually decides your outcome' },
      {
        type: 'p',
        text: 'Not whether you saw it coming, because nobody reliably does. Your outcome is decided by whether you were forced to sell.',
      },
      {
        type: 'p',
        text: 'If you can leave the portfolio alone, a crash is a paper loss. If you borrowed to invest, or needed the money soon, it becomes real in the worst way, at the worst price. That is why the emergency fund and the no-leverage rule exist: they buy you the right to do nothing.',
      },
      { type: 'h2', text: 'Crash playbook 2027: your actual checklist' },
      {
        type: 'ol',
        items: [
          'Do not open the app for 48 hours. Prices will seduce you into decisions you do not need to make yet.',
          'Confirm your emergency fund is intact and your next pay is secure. Both this week, on paper.',
          'For each holding, ask what changed in the business since the fall started. Price is not fact.',
          'If nothing changed, this is a discounted buying opportunity. Plan three staged buys four to six weeks apart.',
          'If the business genuinely broke, sell that position and only that one.',
          'Talk it through with whoever shares your household finances before acting.',
        ],
      },
      {
        type: 'callout',
        text: 'Write down today what you will do if your portfolio falls 30%. A decision made now in calm weather is worth more than a thousand in the moment.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'How long do PSX crashes usually last?',
      },
      {
        type: 'p',
        text: 'Most crashes last weeks to months, though deeper ones grind for longer. Your plan must work through both a V-shaped bounce and a slow, ugly grind.',
      },
      {
        type: 'h3',
        text: 'Should I just go to cash during one?',
      },
      {
        type: 'p',
        text: 'Almost never the right move. That is the classic beginner mistake: sell at the bottom, wait for "clarity", miss the recovery. If your emergency fund is intact, the answer is staying put or adding in stages.',
      },
      {
        type: 'h3',
        text: 'Is gold the right refuge instead of cash?',
      },
      {
        type: 'p',
        text: 'Gold is a hedge, not a rescue. Your crash hedge is the emergency fund and the discipline in your allocation. Chasing gold mid-crash usually locks in panic pricing at the worst moment.',
      },
      { type: 'h2', text: 'What to avoid' },
      {
        type: 'ul',
        items: [
          'Opening the app every hour. Nothing about the outcome improves by ten extra glances.',
          'Selling everything to "wait for clarity". Clarity arrives after the market moves, not before it.',
          'Averaging into a broken thesis. Bailing on you by dollar-cost is still bailing on you.',
          'Borrowing to catch the bottom.',
          'Listening to anyone who claims to have found the floor.',
        ],
      },
      { type: 'h2', text: 'The uncomfortable truth about buying' },
      {
        type: 'p',
        text: 'Declines are when future returns are highest. Everyone knows this and nobody acts on it, at least not until afterwards. The way to act on it is with a rule, not with willpower: something like, "If the market falls 20%, I will invest an extra fixed amount in three instalments a month apart." Written now, executed then.',
      },
      { type: 'h2', text: 'Afterwards' },
      {
        type: 'p',
        text: 'When it is over, write down what you did and what it felt like. That record is a better risk-tolerance assessment than any quiz, including ours, and it changes how you build the next portfolio.',
      },
      {
        type: 'p',
        text: 'If you discovered you could not sleep through it, hold a smaller equity allocation next time. That is not failure. An allocation you live with is worth more than one you abandon at the bottom.',
      },
    ],
  },

  {
    slug: 'what-happens-in-an-advisory-call',
    title: 'What actually happens in a Launchpad advisory call (2027)',
    description:
      'A transparent, step-by-step look at the Launchpad call in 2027: the intake, the framework teaching, what we will not do, and who should not book.',
    category: 'Advisory',
    publishedAt: '2027-02-19',
    updatedAt: '2027-02-19',
    readingMinutes: 7,
    author: 'Investing Sparkle',
    related: ['how-to-build-your-first-psx-portfolio', 'position-sizing-and-risk-management'],
    body: [
      {
        type: 'p',
        text: 'People are wary of paid financial calls in Pakistan for good reason. Most are sales pitches wearing a suit. So here is exactly what happens in ours, in order.',
      },
      { type: 'h2', text: 'Before the call' },
      {
        type: 'p',
        text: 'We send a short intake form, about ten minutes of work. It covers income stability, existing savings, debts, dependants, time horizon, whether you have an emergency fund, what you have owned before, and what you are actually trying to achieve.',
      },
      {
        type: 'p',
        text: 'The point is to avoid spending the first half of a paid hour on background. Fill it honestly. A plan built on a flattering snapshot of your finances is worthless.',
      },
      { type: 'h2', text: 'The first part: your life, not the market' },
      {
        type: 'p',
        text: 'The opening is about your circumstances. We look for the things that determine whether investing is appropriate at all right now.',
      },
      {
        type: 'p',
        text: 'Sometimes the call changes shape here. If you have no emergency fund or you are drowning in expensive debt, the highest-return action you could take is not a stock. Some people find that frustrating after paying for investment advice. It is still correct.',
      },
      { type: 'h2', text: 'The second part: risk, twice' },
      {
        type: 'p',
        text: 'We separate your capacity for risk, meaning horizon, income stability and how much of your total savings is involved, from your tolerance, which is behavioural and much harder to assess honestly.',
      },
      {
        type: 'p',
        text: 'We ask about specific past experiences rather than hypotheticals, because people reliably mispredict what they would do in a 30% drawdown.',
      },
      { type: 'h2', text: 'The third part: the framework' },
      {
        type: 'p',
        text: 'This is the teaching portion and it is where your money actually earns out.',
      },
      {
        type: 'p',
        text: 'We work through how to read a company: where to look in the annual report, which ratios matter and which ones lie, how to think about sector exposure, how to size positions. We use your actual stocks, not textbook examples.',
      },
      {
        type: 'p',
        text: 'You should leave able to do the next one without us. That is the deliverable.',
      },
      { type: 'h2', text: 'The fourth part: your questions' },
      {
        type: 'p',
        text: 'Whatever is on your mind. Holdings you are unsure about, something you read, a salesperson pushing a product at you, relatives with strong opinions about property and shares.',
      },
      { type: 'h2', text: 'Afterwards' },
      {
        type: 'p',
        text: 'Within a week you get a written plan: your risk profile and the reasoning behind it, a recommended allocation, position sizing rules, criteria for choosing holdings, a review schedule, and the specific things to do first.',
      },
      {
        type: 'p',
        text: 'It is written for you to act on alone. Nothing about it requires ongoing service to be useful.',
      },
      { type: 'h2', text: 'What changed in 2027 about our calls' },
      {
        type: 'p',
        text: 'The format has not moved, a written plan, your decisions, zero account access, but the toolkit has. We arrive with PSX data prepped against your actual tickers, so the worked examples are your stocks, not textbook ones. The plan is generated from your numbers, and the walkthrough is recorded so you can replay it.',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'h3',
        text: 'Do I need to be an active trader to book?',
      },
      {
        type: 'p',
        text: 'No. Most bookers are beginners who want the plan before they touch the market. This is not a desk for active day traders.',
      },
      {
        type: 'h3',
        text: 'What if the call feels off mid-way?',
      },
      {
        type: 'p',
        text: 'Stop it. A plan only helps if you can execute it. If the call is not engaging you, we hear it and make it good, or you do not have to pay. Our refund terms are clear before the session.',
      },
      {
        type: 'h3',
        text: 'What happens after the plan?',
      },
      {
        type: 'p',
        text: 'No upsell. If structure is actually warranted, we tell you honestly. If it is not, we tell you that too, and that part costs nothing extra.',
      },
      { type: 'h2', text: 'What we will not do' },
      {
        type: 'ul',
        items: [
          'Tell you which stocks to buy. Not in the call, not in the plan, ever.',
          'Take any access to your brokerage account.',
          'Place a trade for you.',
          'Hold your money at any point.',
          'Quote or promise a return.',
          'Push Membership or Guided Start if you do not need them.',
        ],
      },
      {
        type: 'callout',
        text: 'We are not SECP-licensed investment advisors. We teach, we guide in general terms, and every decision remains yours. That constraint is exactly why we can be direct about what we are.',
      },
      { type: 'h2', text: 'Who should not book one' },
      {
        type: 'p',
        text: 'If you want stock picks, you will be disappointed and you should not pay for this. If you are missing an emergency fund, start with our free material. The call only tells you the same thing, with a receipt.',
      },
      {
        type: 'p',
        text: 'If you want to genuinely understand what you are doing well enough to run your own portfolio for the next decade, this is precisely what the session is for.',
      },
    ],
  },
];

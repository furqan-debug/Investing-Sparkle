import type { Article } from '../types';

/**
 * Behaviour and risk — the part of investing that decides most outcomes and
 * gets the least attention. Also holds the advisory-category articles, which
 * explain what our services actually involve.
 */

export const behaviourArticles: Article[] = [
  {
    slug: 'emergency-fund-before-investing',
    title: 'Why the boring advice comes first: your emergency fund',
    description:
      'The least exciting financial step is the one that determines whether your investing survives contact with real life.',
    category: 'Beginner',
    publishedAt: '2026-08-26',
    readingMinutes: 6,
    author: 'Investing Sparkle',
    related: ['how-to-build-your-first-psx-portfolio', 'sip-investing-in-pakistan'],
    body: [
      {
        type: 'p',
        text: 'Nobody attends a session on emergency funds. Everybody attends the one on picking stocks. This is unfortunate, because the emergency fund determines whether the stock picking ever gets a chance to work.',
      },
      { type: 'h2', text: 'What actually goes wrong' },
      {
        type: 'p',
        text: 'Consider two investors who buy identical portfolios on the same day. Eighteen months later the market is down 20% — a routine occurrence, not a crisis.',
      },
      {
        type: 'p',
        text: 'The first has six months of expenses in cash. When a medical bill arrives, they pay it from savings. Their portfolio is untouched. Two years later the market has recovered and they are ahead.',
      },
      {
        type: 'p',
        text: 'The second has no emergency fund. The same bill arrives. Their only source of money is the portfolio, so they sell — at a 20% loss, at the worst possible moment, permanently converting a paper decline into a realised one. Two years later the market has recovered and they are not there for it.',
      },
      {
        type: 'p',
        text: 'Same analysis, same stocks, same market. Completely different outcome, decided entirely by something that has nothing to do with investing.',
      },
      { type: 'h2', text: 'How much' },
      {
        type: 'p',
        text: 'Three to six months of essential expenses is the usual guidance. Essential means rent, utilities, food, transport, school fees, medical, and loan payments — not your total spending.',
      },
      {
        type: 'p',
        text: 'Lean toward six months, or more, if your income is irregular, if you are self-employed, if you are the only earner, or if you support dependants. Three may be adequate for a dual-income household with stable salaried employment.',
      },
      {
        type: 'callout',
        text: 'Calculate it from your actual expenses, not an estimate. Most people are surprised by the real number — which is itself a useful thing to discover.',
      },
      { type: 'h2', text: 'Where it should sit' },
      {
        type: 'p',
        text: 'Somewhere you can reach within a day or two, where the value does not fluctuate. A savings account, or a liquid instrument you can redeem quickly.',
      },
      {
        type: 'p',
        text: 'Not in shares. The whole point is that it is available at full value on a day of your choosing, and shares offer no such guarantee — least of all during the kind of broad economic stress that also causes job losses.',
      },
      { type: 'h2', text: 'The objection, and the answer' },
      {
        type: 'p',
        text: 'The common objection is that cash earns less than equities, so a large emergency fund is a drag on returns. Arithmetically this is true and it misses the point.',
      },
      {
        type: 'p',
        text: 'The emergency fund is not an investment. It is what allows the investments to be left alone. Its return is measured in forced sales that did not happen — and that return is far larger than the yield differential, because a forced sale during a decline can cost years of progress.',
      },
      { type: 'h2', text: 'Building one' },
      {
        type: 'p',
        text: 'If you have nothing, start with one month. It is achievable, and it already removes the most common category of emergency borrowing.',
      },
      {
        type: 'p',
        text: 'Then build toward three, then six. Treat it as a fixed monthly transfer on the day your salary arrives, not as whatever happens to be left at month end. There is rarely anything left at month end.',
      },
      { type: 'h2', text: 'The honest sequence' },
      {
        type: 'ol',
        items: [
          'One month of expenses in cash.',
          'Clear high-interest short-term debt — a guaranteed return no market can promise.',
          'Build to three to six months of expenses.',
          'Then, and only then, start investing.',
        ],
      },
      {
        type: 'p',
        text: 'If you are at step one, our honest advice is to learn now and invest later. The learning costs nothing and compounds. Investing before the foundation is set is how people conclude the market does not work for ordinary people — when what actually failed was the sequence.',
      },
    ],
  },

  {
    slug: 'position-sizing-and-risk-management',
    title: 'Position sizing: the skill that matters more than stock picking',
    description:
      'How much to put in any single holding, why the answer depends on what you do not know, and how to survive being wrong.',
    category: 'Intermediate',
    publishedAt: '2026-08-27',
    readingMinutes: 8,
    author: 'Investing Sparkle',
    related: ['how-to-build-your-first-psx-portfolio', 'when-to-sell-a-stock'],
    body: [
      {
        type: 'p',
        text: 'Almost all the attention in investing goes to what to buy. Almost all the damage comes from how much.',
      },
      {
        type: 'p',
        text: 'You can be right about most of your holdings and still do badly, if the one you were wrong about was three times the size of the others. And you can be wrong more often than you are right and do perfectly well, if your losses are small and your winners are allowed to run.',
      },
      { type: 'h2', text: 'Start from what you do not know' },
      {
        type: 'p',
        text: 'The right size for a position is a function of your uncertainty, not your enthusiasm. In practice the two feel identical — conviction is usually strongest where knowledge is shallowest, because complications you have not yet discovered cannot temper it.',
      },
      {
        type: 'p',
        text: 'A useful discipline: before sizing, write down the three things that would have to go wrong for this holding to lose half its value. If that list is hard to produce, you do not understand the business well enough to take a large position in it.',
      },
      { type: 'h2', text: 'A practical framework' },
      {
        type: 'p',
        text: 'For a portfolio you are building yourself, without leverage:',
      },
      {
        type: 'ul',
        items: [
          'A standard position: roughly equal weight. Ten holdings, about 10% each.',
          'A maximum: no single holding above about 15% of the portfolio, however good it looks.',
          'A sector cap: no more than about 30% in any one sector, since sector risk is real risk however many companies you spread it across.',
          'A minimum: large enough that transaction costs do not consume a meaningful share, and large enough to matter if you are right.',
        ],
      },
      {
        type: 'p',
        text: 'These are not laws. They are defaults that prevent the specific failure that ruins beginners — one enormous position that determines the entire outcome.',
      },
      { type: 'h2', text: 'The arithmetic of losses' },
      {
        type: 'p',
        text: 'Losses and gains are not symmetric, and the asymmetry gets worse the deeper the hole:',
      },
      {
        type: 'ul',
        items: [
          'Lose 10%, and you need about 11% to get back to even.',
          'Lose 25%, and you need about 33%.',
          'Lose 50%, and you need 100% — you must double your money simply to return to where you started.',
          'Lose 75%, and you need 300%.',
        ],
      },
      {
        type: 'p',
        text: 'This is why avoiding large losses matters more than capturing large gains. A portfolio that never suffers a catastrophic single-position loss does not need spectacular winners to do well.',
      },
      {
        type: 'callout',
        text: 'Position sizing is how you make sure that being wrong is survivable. You will be wrong regularly. The only question is whether it costs you a bad quarter or several years.',
      },
      { type: 'h2', text: 'Liquidity is part of size' },
      {
        type: 'p',
        text: 'A consideration that matters more on PSX than in deeper markets. Before sizing a position, look at the average daily traded volume and ask how many days it would take to sell your intended holding without moving the price against yourself.',
      },
      {
        type: 'p',
        text: 'If the answer is more than a few days, the position is too large — regardless of how attractive the company is. A holding you cannot exit is not really a position; it is a commitment.',
      },
      { type: 'h2', text: 'Letting winners grow, within limits' },
      {
        type: 'p',
        text: 'If a holding does well, it becomes a larger share of the portfolio by simple arithmetic. Up to a point that is fine — it is what you wanted to happen.',
      },
      {
        type: 'p',
        text: 'Past your maximum, trim it back. This feels wrong every single time, because you are selling the thing that is working. But a position that has grown to 30% of your portfolio now determines your outcome by itself, and the reasons you diversified in the first place have not stopped applying.',
      },
      { type: 'h2', text: 'What to write down before buying' },
      {
        type: 'ol',
        items: [
          'The target weight, and why this size rather than a larger one.',
          'The three things that would have to go wrong for it to halve.',
          'The level or event at which you would accept the thesis is broken.',
          'The maximum weight past which you will trim.',
        ],
      },
      {
        type: 'p',
        text: 'Four lines, written before you have any money at stake — which is the only time you can think about the position clearly.',
      },
    ],
  },

  {
    slug: 'when-to-sell-a-stock',
    title: 'When to sell: the decision nobody teaches',
    description:
      'Three good reasons to sell, four bad ones, and why your purchase price is irrelevant to the decision.',
    category: 'Intermediate',
    publishedAt: '2026-08-27',
    readingMinutes: 8,
    author: 'Investing Sparkle',
    related: ['position-sizing-and-risk-management', 'how-to-value-a-stock'],
    body: [
      {
        type: 'p',
        text: 'Every course teaches you what to buy. Almost none teach you when to sell, which is strange, because selling is where most of the emotional difficulty lives and where a great deal of the return is decided.',
      },
      { type: 'h2', text: 'The principle everything follows from' },
      {
        type: 'p',
        text: 'The market has no memory of what you paid. Your purchase price is a fact about your history, not about the company.',
      },
      {
        type: 'p',
        text: 'The only question that matters is: knowing what I know today, at today’s price, would I buy this? If the answer is no, the reason you own it is not investment. It is reluctance to acknowledge a decision.',
      },
      { type: 'h2', text: 'Three good reasons to sell' },
      { type: 'h3', text: '1. The thesis broke' },
      {
        type: 'p',
        text: 'You bought for specific reasons. One of them has stopped being true — the competitive advantage eroded, the debt became unmanageable, management changed and the new team is doing something different, the regulatory environment shifted.',
      },
      {
        type: 'p',
        text: 'This is the cleanest reason to sell, and it is only available to people who wrote down the thesis at purchase. Without that note, "the thesis broke" is indistinguishable from "the price fell and I am uncomfortable".',
      },
      { type: 'h3', text: '2. You found something clearly better' },
      {
        type: 'p',
        text: 'Capital is finite. If a materially better opportunity exists and you have no cash, funding it by selling your weakest holding is rational.',
      },
      {
        type: 'p',
        text: 'The test is that the new idea must be clearly better, not marginally more exciting. Frequent switching between roughly equivalent ideas is a reliable way to convert a decent portfolio into transaction costs.',
      },
      { type: 'h3', text: '3. The position outgrew its place' },
      {
        type: 'p',
        text: 'A holding that has risen until it dominates the portfolio should be trimmed back toward its target weight. Not because you have lost faith, but because concentration risk does not care how well the position has done so far.',
      },
      { type: 'h2', text: 'Four bad reasons to sell' },
      { type: 'h3', text: '1. It went up' },
      {
        type: 'p',
        text: 'Selling purely because a holding has risen means systematically disposing of the things that are working. Long-term returns in most portfolios come from a small number of holdings that did very well over a long period — and every one of them looked like it had "run too far" at some point.',
      },
      { type: 'h3', text: '2. It went down' },
      {
        type: 'p',
        text: 'A falling price is information about sentiment. It may or may not be information about the business. Check which before acting, and check it against your written thesis rather than against how you feel.',
      },
      { type: 'h3', text: '3. To get back to what you paid' },
      {
        type: 'p',
        text: 'Waiting to "break even" before selling is the purest form of letting your purchase price make the decision. The company does not know what you paid, and the price at which you become willing to sell says nothing about what the business is worth.',
      },
      { type: 'h3', text: '4. Someone told you to' },
      {
        type: 'p',
        text: 'If a tip was not a good enough reason to buy, it is not a good enough reason to sell.',
      },
      {
        type: 'callout',
        text: 'The reliable pattern across investor behaviour: people sell winners quickly to lock in a gain, and hold losers indefinitely to avoid admitting an error. It is precisely backwards, and knowing that is most of the defence against it.',
      },
      { type: 'h2', text: 'Decide before you own it' },
      {
        type: 'p',
        text: 'The practical solution is to write the sell conditions at the moment you buy, when you have no money at stake and can think clearly.',
      },
      {
        type: 'p',
        text: 'Something as simple as: "I will sell if debt-to-equity exceeds X, if the dividend is cut, if the segment that drives profit stops growing for two consecutive years, or if this exceeds 15% of the portfolio."',
      },
      {
        type: 'p',
        text: 'Then, when the moment arrives, you are following a decision you already made rather than making one under pressure. That is the entire technique, and it is worth more than any amount of additional analysis.',
      },
      { type: 'h2', text: 'On taxes and costs' },
      {
        type: 'p',
        text: 'Selling has costs — commission, and potentially capital gains tax. Factor them in, but do not let them hold you in a broken position. Paying tax on a gain is a better outcome than watching the gain disappear to avoid it.',
      },
    ],
  },

  {
    slug: 'long-term-vs-day-trading-pakistan',
    title: 'Long-term investing vs day trading in Pakistan’s context',
    description:
      'Why the two are different activities with different skill requirements, and an honest account of what short-term trading costs before it earns anything.',
    category: 'Beginner',
    publishedAt: '2026-08-28',
    readingMinutes: 7,
    author: 'Investing Sparkle',
    related: ['five-common-psx-beginner-mistakes', 'reading-a-stock-chart-basics'],
    body: [
      {
        type: 'p',
        text: 'People use "investing" and "trading" interchangeably. They are different activities, requiring different skills, suited to different people, with very different odds. Choosing between them deliberately is more important than being good at either.',
      },
      { type: 'h2', text: 'What each one actually is' },
      {
        type: 'p',
        text: 'Investing means buying part of a business because you believe it will be worth more over years, and being paid dividends while you wait. Your return comes from the business performing.',
      },
      {
        type: 'p',
        text: 'Short-term trading means buying and selling to profit from price movement over days or weeks. Your return comes from other participants — someone sells you something that then rises, or buys something from you that then falls. It is closer to a competitive game than to ownership.',
      },
      { type: 'h2', text: 'The costs you pay before you earn anything' },
      {
        type: 'p',
        text: 'This is the part that is systematically underweighted, and it is arithmetic rather than opinion.',
      },
      {
        type: 'ul',
        items: [
          'Commission on every trade, in both directions. A trader placing a hundred round trips a year pays two hundred commissions.',
          'Any minimum per-trade charge, which hits smaller positions disproportionately.',
          'The spread between the buy and sell price, which is a real cost even though it appears on no statement.',
          'Tax on realised gains, incurred far more frequently than by a long-term holder.',
          'Slippage in thinly traded stocks, where your own order moves the price against you.',
        ],
      },
      {
        type: 'p',
        text: 'A trader must overcome all of that before earning a single rupee. A long-term holder pays the commission twice — once on entry, once on exit, potentially years apart.',
      },
      { type: 'h2', text: 'The Pakistani specifics' },
      {
        type: 'p',
        text: 'Several features of PSX make short-term trading harder here than the general case:',
      },
      {
        type: 'ul',
        items: [
          'Liquidity is concentrated. Many listed companies trade thinly, so entering and exiting quickly is costly and sometimes not possible at the price you see.',
          'The market can be news-driven in ways that are difficult to anticipate — policy announcements, currency moves, and external developments can reprice the market between sessions.',
          'Information does not reach everyone simultaneously, which disadvantages whoever is furthest from the source. If you are reading about it, you are not first.',
        ],
      },
      {
        type: 'callout',
        text: 'A useful question before you start trading: who is on the other side of this trade, and why do I think I know something they do not? If you have no answer, you are the liquidity, not the edge.',
      },
      { type: 'h2', text: 'The time cost' },
      {
        type: 'p',
        text: 'Active trading requires watching the market during trading hours. For someone with a job, that means either doing it badly around other commitments, or doing it properly and doing their job badly.',
      },
      {
        type: 'p',
        text: 'Long-term investing requires a few hours a quarter. For most working people, that difference alone settles the question.',
      },
      { type: 'h2', text: 'Where we stand' },
      {
        type: 'p',
        text: 'We teach investing. Not because trading is illegitimate — it is a real discipline that some people do well — but because for the overwhelming majority of the people who come to us, it is the wrong activity for their circumstances, their available time, and their capital.',
      },
      {
        type: 'p',
        text: 'If after understanding the costs you still want to trade actively, do it with a small, defined portion of your money that you can lose without it affecting your life, keep records honestly, and measure your results against simply having held. Most people who do that measurement carefully reach the same conclusion within a year.',
      },
    ],
  },

  {
    slug: 'how-to-survive-a-market-crash',
    title: 'How to survive a market crash: a framework decided in advance',
    description:
      'What to do when everything falls at once — written for you to read now, calmly, so that the decisions already exist when you need them.',
    category: 'Intermediate',
    publishedAt: '2026-08-28',
    readingMinutes: 8,
    author: 'Investing Sparkle',
    related: ['emergency-fund-before-investing', 'when-to-sell-a-stock'],
    body: [
      {
        type: 'p',
        text: 'Read this now, while nothing is falling. That is the entire point of it — a crash is precisely when you are least capable of thinking clearly, so the thinking has to be done beforehand.',
      },
      { type: 'h2', text: 'What normal looks like' },
      {
        type: 'p',
        text: 'Substantial declines are a recurring feature of equity markets, not an aberration. Any investor with a multi-decade horizon should expect to live through several, including some severe ones.',
      },
      {
        type: 'p',
        text: 'This matters because the first one always feels like a special case — like this time something is structurally different. Sometimes something is. The response is still the same.',
      },
      { type: 'h2', text: 'What actually determines your outcome' },
      {
        type: 'p',
        text: 'Not whether you predicted it. Nobody reliably does. What determines your outcome is whether you are forced to sell.',
      },
      {
        type: 'p',
        text: 'An investor who can leave their portfolio alone experiences a decline as a temporary paper loss. An investor who needs the money — because there is no emergency fund, or because they borrowed to invest — converts that paper loss into a permanent one at the worst available price.',
      },
      {
        type: 'p',
        text: 'Which is why the emergency fund and the no-leverage rule are not conservative fussiness. They are what buys you the ability to do nothing.',
      },
      { type: 'h2', text: 'The order of operations during a decline' },
      {
        type: 'ol',
        items: [
          'Do nothing for a week. No selling, no buying, no changes. The urge to act is at its strongest and your judgement at its weakest in the first days.',
          'Check your actual situation. Is your emergency fund intact? Is your income secure? Do you need any of this money in the next three years? This is a factual review, not an emotional one.',
          'Read your written thesis for each holding. Has anything changed about the businesses, or only about their prices? These are different questions and the distinction is everything.',
          'Sell only where the thesis is genuinely broken. Not because a price fell — because a fact you relied on stopped being true.',
          'If you have cash and your emergency fund is intact, consider buying — gradually, into your existing plan, not in a single decisive move.',
        ],
      },
      {
        type: 'callout',
        text: 'Write down, today, what you will do if your portfolio falls 30%. A decision made now, in calm conditions, is worth far more than one made in the moment — and it is the only way to find out whether your allocation is one you can actually live with.',
      },
      { type: 'h2', text: 'What to avoid' },
      {
        type: 'ul',
        items: [
          'Checking prices constantly. It changes nothing except your stress level, and stress is what produces the sale.',
          'Selling everything to "wait for clarity". Clarity arrives after the recovery, not before it. People who exit rarely re-enter in time.',
          'Doubling down on a single falling position to average down. Averaging into a broken thesis is how a small mistake becomes a large one.',
          'Borrowing to buy the dip. Leverage is what turns a survivable decline into a permanent loss.',
          'Taking advice from anyone who claims to know where the bottom is.',
        ],
      },
      { type: 'h2', text: 'The uncomfortable truth about buying' },
      {
        type: 'p',
        text: 'Declines are when future returns are highest, because you are paying less for the same businesses. Everyone accepts this in principle and almost nobody acts on it, because it requires buying at the moment it feels most dangerous.',
      },
      {
        type: 'p',
        text: 'The practical solution is a rule, not resolve. Something like: "If the market falls 20%, I will invest an additional fixed amount, in three instalments a month apart." Written now, executed then, without a fresh judgement required at the time.',
      },
      { type: 'h2', text: 'Afterwards' },
      {
        type: 'p',
        text: 'When it is over, write down what you actually did and how you actually felt. That record is the most accurate risk-tolerance assessment you will ever have — far better than any quiz, including ours.',
      },
      {
        type: 'p',
        text: 'If you discovered you could not sleep, the honest response is to hold a smaller equity allocation. That is not failure. An allocation you can hold through a decline beats a theoretically optimal one you abandon at the bottom.',
      },
    ],
  },

  {
    slug: 'what-happens-in-an-advisory-call',
    title: 'What actually happens in a one-on-one advisory call',
    description:
      'A step-by-step account of the Launchpad session — what we ask, what you receive, and what we will refuse to do.',
    category: 'Advisory',
    publishedAt: '2026-08-29',
    readingMinutes: 6,
    author: 'Investing Sparkle',
    related: ['how-to-build-your-first-psx-portfolio', 'position-sizing-and-risk-management'],
    body: [
      {
        type: 'p',
        text: 'People are reasonably wary of paying for a financial call in Pakistan, because the format is usually a sales pitch with a fee attached. So here is exactly what happens in ours, in order.',
      },
      { type: 'h2', text: 'Before the call' },
      {
        type: 'p',
        text: 'We send a short intake form, around ten minutes of work. It asks about your income stability, existing savings, debts, dependants, time horizon, whether you have an emergency fund, what you have invested in before, and what you are actually trying to achieve.',
      },
      {
        type: 'p',
        text: 'The purpose is to avoid spending the first half of a paid session on background questions. Fill it in honestly — a plan built on a flattering version of your finances is worth nothing.',
      },
      { type: 'h2', text: 'The first part: your situation, not the market' },
      {
        type: 'p',
        text: 'The opening portion of the call is about your circumstances. We work through the intake answers, and we are looking for the things that determine whether investing is appropriate at all right now.',
      },
      {
        type: 'p',
        text: 'This is where some calls take an unexpected turn. If you have no emergency fund, or you are carrying expensive short-term debt, we will tell you that the highest-return action available to you is not a stock. Some people find that frustrating, having paid for investment advice. It is still the correct answer.',
      },
      { type: 'h2', text: 'The second part: risk, in both senses' },
      {
        type: 'p',
        text: 'We separate your capacity for risk — your horizon, income stability, and how much of your total savings is involved — from your tolerance for it, which is behavioural and much harder to assess honestly.',
      },
      {
        type: 'p',
        text: 'We ask about specific past reactions rather than hypotheticals, because what people say they would do in a 30% decline and what they actually did in one are frequently different things.',
      },
      { type: 'h2', text: 'The third part: the framework' },
      {
        type: 'p',
        text: 'This is the teaching portion, and it is the part that makes the session worth more than a recommendation would be.',
      },
      {
        type: 'p',
        text: 'We work through how to evaluate a company — what to read in the annual report, which ratios matter and what each one can hide, how to think about sector exposure, and how to size a position relative to what you do not know. We use real examples so it is concrete.',
      },
      {
        type: 'p',
        text: 'You should leave able to repeat the process without us. That is the deliverable.',
      },
      { type: 'h2', text: 'The fourth part: your questions' },
      {
        type: 'p',
        text: 'Whatever you brought. Existing holdings you are unsure about, something you read, a broker who is pushing you toward a product, or a family member with strong opinions about property versus shares.',
      },
      { type: 'h2', text: 'Afterwards' },
      {
        type: 'p',
        text: 'Within a week you receive a written plan: your risk profile with the reasoning, a recommended asset allocation, portfolio structure and position sizing rules, a shortlist of criteria for selecting holdings, a review schedule, and the specific things you should do first.',
      },
      {
        type: 'p',
        text: 'It is written so that you can act on it alone. There is no follow-on service required to make it useful.',
      },
      { type: 'h2', text: 'What we will not do' },
      {
        type: 'ul',
        items: [
          'Tell you which stocks to buy. Not in the call, not in the written plan, not if you ask directly.',
          'Take any access to your brokerage account.',
          'Place a trade for you.',
          'Hold your money at any point.',
          'Promise a return, or estimate one.',
          'Push you toward Guided Start or Membership if the honest answer is that you do not need them.',
        ],
      },
      {
        type: 'callout',
        text: 'We are not SECP-licensed investment advisors. We provide education and general guidance, and every decision and execution remains yours. That constraint is why we can be straightforward about what we are.',
      },
      { type: 'h2', text: 'Who should not book one' },
      {
        type: 'p',
        text: 'If you want stock picks, this will disappoint you and you should not pay for it. If you have no emergency fund, start with our free material — we will only tell you the same thing, and charge you for it.',
      },
      {
        type: 'p',
        text: 'If you want to understand what you are doing well enough to run your own portfolio confidently, this is exactly what the session is for.',
      },
    ],
  },
];

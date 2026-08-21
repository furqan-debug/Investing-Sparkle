/**
 * Worked examples.
 *
 * IMPORTANT — these are illustrative scenarios, not real clients, and every
 * page that renders them says so prominently and repeatedly.
 *
 * The reasoning: a case study describing a real person's finances and results
 * is either a privacy problem or, if invented, a fabricated record dressed as
 * evidence. Both are worse than useless for a business whose entire pitch is
 * that it will not manufacture social proof.
 *
 * What these do instead is show the method — the same reasoning we would apply
 * in a Launchpad call, worked through on situations that are common enough to
 * be recognisable. That is genuinely useful and it claims nothing untrue.
 *
 * When you have real client outcomes and written permission to publish them,
 * add them as a separate, clearly-labelled section — never by quietly
 * relabelling these.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  /** One-line description of the situation. */
  summary: string;
  situation: { label: string; value: string }[];
  /** The question the person is actually asking. */
  question: string;
  /** How the framework works through it, in order. */
  reasoning: { heading: string; body: string[] }[];
  /** The conclusion, stated as reasoning rather than as a recommendation. */
  outcome: string[];
  /** What this example is meant to demonstrate. */
  lesson: string;
};

export const caseStudyDisclaimer =
  'These are illustrative scenarios written to show how the framework is applied. They are not real clients, not records of actual results, and not investment recommendations. The figures are chosen to make the reasoning clear.';

export const caseStudies: CaseStudy[] = [
  {
    slug: 'salaried-professional-starting-out',
    title: 'The salaried professional with savings and no plan',
    summary:
      'Steady income, money accumulating in a bank account, and a growing sense of falling behind.',
    situation: [
      { label: 'Age', value: 'Early thirties' },
      { label: 'Income', value: 'Stable salary, dual-income household' },
      { label: 'Savings', value: 'PKR 1,200,000 in a bank account' },
      { label: 'Emergency fund', value: 'None separated out' },
      { label: 'Debt', value: 'A car loan, no credit card balance' },
      { label: 'Experience', value: 'Has never bought a share' },
    ],
    question:
      '“I have savings sitting in the bank losing value to inflation. Everyone says I should invest. Where do I start, and how much should I put in?”',
    reasoning: [
      {
        heading: 'First: the money is not all available',
        body: [
          'The instinct here is to treat the PKR 1,200,000 as the amount to invest. It is not. Before any of it goes into equities, part of it has to become an emergency fund, and in this case none has been separated out.',
          'Working from actual essential expenses rather than an estimate, a household like this typically needs somewhere between four and six months set aside. Call it PKR 400,000 held in cash, deliberately not invested.',
          'That leaves roughly PKR 800,000 as investable, and the figure matters less than the fact that it was arrived at rather than assumed.',
        ],
      },
      {
        heading: 'Second: does the debt change the answer?',
        body: [
          'A car loan is usually at a rate low enough that clearing it early is not obviously better than investing. High-interest short-term debt would be a different matter. Paying that down is a guaranteed return, and no equity market offers a guarantee of anything.',
          'The test is simple: compare the interest rate on the debt against what you can realistically expect from investing, and remember that the debt return is certain while the investment return is not.',
        ],
      },
      {
        heading: 'Third: capacity and tolerance are different questions',
        body: [
          'Capacity here is genuinely high: stable dual income, a long horizon, no dependants requiring the capital soon. On paper this person can take substantial equity risk.',
          'Tolerance is unknown, because they have never held a falling position with real money in it. This is the gap that produces damage: high capacity plus untested tolerance regularly produces someone who invests aggressively and then sells at the first serious decline.',
          'The response is not to invest less overall. It is to phase the entry, so the first real drawdown happens while only part of the money is committed.',
        ],
      },
      {
        heading: 'Fourth: structure before selection',
        body: [
          'The portfolio structure gets decided before any company is considered. Roughly ten holdings, approximately equal weight, no single position beyond about 15%, no sector beyond about 30%.',
          'For PKR 800,000, that means positions of around PKR 80,000 each, comfortably above the level where a fixed per-trade charge consumes a painful share.',
          'Entry spread over roughly nine months rather than deployed at once, in tranches tied to when salary arrives.',
        ],
      },
    ],
    outcome: [
      'The plan that comes out of this is unglamorous: separate PKR 400,000 as an emergency fund, invest the rest gradually across about ten holdings over three quarters, and review quarterly against a written thesis for each position.',
      'No stocks are named. What is specified are the criteria: profitable across several years including bad ones, manageable debt, a dividend the company can afford, and enough daily volume to exit without difficulty.',
      'The person leaves able to apply those criteria to any company on the exchange, which is the actual deliverable.',
    ],
    lesson:
      'Most of the value in a first plan comes from decisions that are not about stocks at all: how much is genuinely investable, over what period it goes in, and how large any single position is allowed to be.',
  },

  {
    slug: 'restarting-after-losses',
    title: 'Restarting after losing money on tips',
    summary:
      'Two years of acting on WhatsApp recommendations, a portfolio down significantly, and no idea what to keep.',
    situation: [
      { label: 'Experience', value: 'Two years, entirely tip-driven' },
      { label: 'Portfolio', value: 'Six holdings, roughly PKR 600,000 invested' },
      { label: 'Position', value: 'Down meaningfully overall' },
      { label: 'Concentration', value: 'Two positions are more than half the total' },
      { label: 'Records', value: 'No record of why anything was bought' },
      { label: 'Emergency fund', value: 'Roughly two months of expenses' },
    ],
    question:
      '“I have lost money on almost everything I bought. Should I sell it all and start again, or wait to get back to what I paid?”',
    reasoning: [
      {
        heading: 'The question contains the mistake',
        body: [
          '“Wait to get back to what I paid” is the purchase price making the decision. The market has no memory of what anyone paid, and the price at which someone becomes willing to sell says nothing whatsoever about what the business is worth.',
          "Replacing that question with a better one is most of the work here: for each holding, knowing what I know now, at today's price, would I buy this?",
        ],
      },
      {
        heading: 'The missing records are the real problem',
        body: [
          'With no written thesis for any position, there is no way to distinguish “this fell because the market is being irrational” from “this fell because I was wrong”. Those require completely different responses, and without notes the distinction collapses into how the person feels about each stock.',
          'So the first exercise is retrospective: for each of the six holdings, write down now what the company does, how it makes money, what its debt looks like, and whether it is profitable. Not what it has done for the price. What the business is.',
        ],
      },
      {
        heading: 'Three of the six will not survive the exercise',
        body: [
          'Typically, in a portfolio assembled from tips, a couple of holdings turn out to be reasonable businesses bought without understanding, a couple are marginal, and at least one is something the person cannot describe at all.',
          'The ones that cannot be described go, regardless of whether they are up or down. Not as punishment, because holding something you cannot evaluate means you will have no idea what to do next time it moves.',
        ],
      },
      {
        heading: 'Concentration is the more urgent risk',
        body: [
          'Two positions exceeding half the portfolio is the more pressing issue than any individual holding being down. A single company-specific event could do damage that takes years to recover, and the arithmetic of losses is unforgiving: a 50% loss requires a 100% gain simply to return to level.',
          'Reducing those two toward a normal weight is the first structural change, and it is separate from the question of whether either is a good business.',
        ],
      },
      {
        heading: 'The emergency fund is the actual priority',
        body: [
          'Two months of expenses is thin. It means any unexpected cost forces a sale, at whatever price the market happens to offer that week, which is precisely how a temporary paper loss becomes a permanent one.',
          'In this situation the honest advice is that building the emergency fund to five or six months takes precedence over any new investing. That is not what someone wanting to recover losses wants to hear.',
        ],
      },
    ],
    outcome: [
      'The plan is: write a thesis for each existing holding, exit the ones that cannot be described, trim the two oversized positions toward target weight, and direct the proceeds and new savings into completing the emergency fund before adding anything.',
      'Selling at a loss is treated as recognising a decision already made rather than as taking a loss. The loss occurred when the position fell, not when it was sold.',
      'New investing resumes only once the emergency fund is complete, with written theses from the first purchase onward.',
    ],
    lesson:
      'Recovering from tip-driven losses is rarely about picking better stocks next time. It is about installing the record-keeping and position-sizing that make the next mistake survivable.',
  },

  {
    slug: 'shariah-compliant-portfolio',
    title: 'Building a portfolio that must stay Shariah-compliant',
    summary:
      'A clear religious constraint, and the practical consequences most people are not warned about.',
    situation: [
      { label: 'Requirement', value: 'Strictly Shariah-compliant holdings only' },
      { label: 'Investable', value: 'PKR 2,000,000, emergency fund already in place' },
      { label: 'Horizon', value: 'Fifteen years or more' },
      { label: 'Income', value: 'Business income, somewhat variable' },
      { label: 'Experience', value: 'Has held mutual funds, never individual shares' },
    ],
    question:
      '“I only want compliant investments. Do I just buy the KMI-30 companies and leave it?”',
    reasoning: [
      {
        heading: 'Compliance is not a one-time filter',
        body: [
          'The most important thing to establish early is that screening is periodic, not permanent. A company that passes today can fail at the next review, sometimes without doing anything, because a fall in its market capitalisation changes a ratio.',
          'So the plan needs a stated review cadence and a decision made in advance about what happens when a holding fails: how quickly to exit, and how to handle the income earned while it was non-compliant.',
        ],
      },
      {
        heading: 'What the screening removes, structurally',
        body: [
          'Excluding conventional banks removes a large, liquid, dividend-paying part of the market, and the sector that typically benefits most when interest rates rise. That is a real characteristic of a compliant portfolio, not a minor omission.',
          'The debt-ratio screen also tilts the portfolio away from heavily leveraged companies. Arguably that is a quality filter as much as a religious one, but it means the portfolio will behave differently across the rate cycle, and the person should expect that rather than be surprised by it.',
        ],
      },
      {
        heading: 'The universe is smaller, so diversification takes more work',
        body: [
          'With a reduced set of eligible companies, reaching ten to fifteen holdings across genuinely different sectors requires deliberate effort. It is easy to end up with a compliant portfolio that is heavily concentrated in two or three sectors simply because those are what passed.',
          'The discipline is to check sector exposure explicitly rather than assuming that a list of compliant names is automatically diversified.',
        ],
      },
      {
        heading: 'Variable income changes the entry plan',
        body: [
          'Business income that fluctuates argues for a larger cash buffer and a more flexible contribution schedule than a salaried person would need. A fixed monthly amount that cannot be sustained in a bad quarter gets abandoned, which defeats the purpose.',
          'Better to set a lower baseline contribution that survives a poor month, with discretionary additions in good ones.',
        ],
      },
      {
        heading: 'Purification, planned rather than improvised',
        body: [
          'Even compliant companies may earn a small proportion of non-compliant income. Many publish a per-share purification figure. The plan specifies checking it annually, calculating the amount, and giving it away, as a scheduled task, not something remembered occasionally.',
        ],
      },
    ],
    outcome: [
      'The plan specifies a compliant universe with a stated screening source, a semi-annual compliance review with a pre-agreed exit process, an explicit sector-exposure check rather than an assumption of diversification, a sustainable baseline contribution suited to variable income, and an annual purification calculation.',
      'Benchmarking is set against the KMI-30 rather than the KSE-100, because measuring a compliant portfolio against a market containing companies it would never buy produces a misleading picture.',
      'No specific companies are named. The screening criteria and the review process are what the person takes away.',
    ],
    lesson:
      'A religious constraint is a portfolio-construction constraint. Handled deliberately, it is entirely workable. The failure mode is treating "buy compliant stocks" as the whole plan and not noticing the concentration and review obligations it creates.',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

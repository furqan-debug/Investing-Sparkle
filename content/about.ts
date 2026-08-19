/** About-page content: story, mission, vision, values, and the home-page copy. */

/*
 * There are deliberately no founder profiles on this site.
 *
 * The trust argument is carried by what the company will and will not do —
 * public pricing, the "we never touch your money" position, and an honest
 * account of the SECP licensing status — rather than by personal bios. Do not
 * reintroduce a team section, headshots, or named instructor blocks.
 */

export const story = [
  'Investing Sparkle started in May 2025, out of a frustration two of us kept running into: friends and family in Pakistan who wanted to invest, had the savings to do it, and kept losing money anyway — not because they were careless, but because the only guidance available to them came from a WhatsApp group or a broker with a stake in their trades.',
  'What was missing was not information. There is plenty of that. What was missing was sequence — nobody was showing people what to learn first, what to learn next, and how the pieces connect into a decision you can defend.',
  'So we built the thing we wished existed: structured education that starts from zero, and personal guidance for the people who want a plan built with them rather than sold to them. Both are designed around one rule we do not bend — your money stays in your account, and every decision stays yours.',
  'We are still early. We would rather say that plainly than dress it up.',
];

export const mission =
  'To equip every Pakistani investor with the knowledge to understand and manage their own money in the stock market — replacing rumors with structured, personal guidance.';

export const vision =
  'A Pakistan where investing in PSX is a normal financial habit, not an intimidating or exclusive one.';

export const values = [
  {
    title: 'Independence over dependency',
    detail:
      'Every service is built with an end point. Success is you graduating from us, not renewing forever.',
  },
  {
    title: 'Transparency in everything',
    detail:
      'Public pricing, a stated philosophy, and an honest account of what we are not licensed to do.',
  },
  {
    title: 'Learning first, guidance second',
    detail:
      'Knowledge is the product. Advisory exists to apply it to your situation, not to replace it.',
  },
  {
    title: 'Your money, your control',
    detail:
      'We never hold funds, never execute trades, and never ask for access to your account.',
  },
];

/** The four problems the site exists to answer — used on the Home page. */
export const problems = [
  {
    title: 'WhatsApp tips, no accountability',
    detail:
      'Most Pakistani retail investors act on tips they cannot verify, from people who bear none of the loss.',
  },
  {
    title: 'No structured path',
    detail:
      'YouTube videos are scattered across a hundred channels. Nobody shows you the sequence to learn them in.',
  },
  {
    title: 'Broker conflict of interest',
    detail:
      'Advice from someone who earns on your trades is not advice. It is a sales pitch with a chart attached.',
  },
  {
    title: 'Investing feels exclusive',
    detail:
      'It should not be. The industry acts like PSX belongs to a club you were not invited to join.',
  },
];

/** The client journey shown on the Home page. */
export const journey = [
  {
    step: '01',
    title: 'Learn',
    detail: 'Start with the free tools and sessions. Cost you nothing, and most people start here.',
    href: '/learn',
  },
  {
    step: '02',
    title: 'Get a plan',
    detail: 'Book a Launchpad Advisory Call and leave with a written plan built around your goals.',
    href: '/services/launchpad',
  },
  {
    step: '03',
    title: 'Get set up',
    detail: 'Guided Start walks you through brokerage setup and your first investments.',
    href: '/services/guided-start',
  },
  {
    step: '04',
    title: 'Stay on track',
    detail: 'Sparkle Membership gives you periodic accountability — entirely optional.',
    href: '/services/sparkle-membership',
  },
];

export const journeyNote =
  'Most people stop at step 1 or 2 — that’s the point. We’re built to make you independent, not dependent on us.';

import { refundPolicy } from './site';
import { whatsappMessages } from './whatsapp';
import type { Testimonial } from './bootcamp';
import { clientTestimonials } from './testimonials';

/**
 * The three advisory tiers.
 *
 * Every tier is deliberately designed with an end point. The plan's framing:
 * success looks like a client graduating from us, not renewing forever. The
 * `endState` field carries that on each card so it never gets edited away.
 */

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  price: string;
  priceNote?: string;
  summary: string;
  whatItIs: string;
  bestFor: string;
  duration: string;
  includes: string[];
  excludes: string[];
  endState: string;
  refund: string;
  ctaLabel: string;
  whatsappMessage: string;

  /* --- Detail-page fields (used by /services/[slug]) --- */

  /** Two or three paragraphs expanding on what the service is really for. */
  detail: string[];
  /** Honest fit signals — the "not for you" list filters out mismatched buyers. */
  rightForYou: string[];
  notForYou: string[];
  /** Stage-by-stage walkthrough of the engagement. */
  steps: { step: string; title: string; detail: string }[];
  /** What you hold at the end. */
  deliverables: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'launchpad',
    name: 'Launchpad Advisory Call',
    shortName: 'Launchpad',
    price: 'PKR 5,000',
    priceNote: 'One-time',
    summary: 'A single 1-on-1 session that leaves you with a written plan you can execute yourself.',
    whatItIs: 'One-time 1-on-1 advisory call',
    bestFor: 'Beginners who want a clear plan to execute themselves',
    duration: '60–90 minute session, plus 1 week for your written plan',
    includes: [
      'A structured risk-profile assessment before the call',
      'A 60–90 minute one-on-one session with a founder',
      'A personalized written investment plan, delivered within a week',
      'Coaching on the fundamentals behind every recommendation in your plan',
      'Answers to your specific questions about your own situation',
    ],
    excludes: [
      'We do not pick stocks for you',
      'We do not open or operate your brokerage account',
      'We do not execute trades or hold your funds',
      'Ongoing follow-up is not included — that is the Membership',
    ],
    endState:
      'You leave with a plan and the reasoning behind it. Most people need nothing further from us.',
    refund: refundPolicy.launchpad,
    ctaLabel: 'Book via WhatsApp',
    whatsappMessage: whatsappMessages.launchpad,

    detail: [
      'The Launchpad call exists for a specific situation: you have money to invest, you are reasonably intelligent about most things, and you have no idea where to start with PSX — and every source of guidance available to you has an interest in what you decide.',
      'It is one session, one written plan, and no ongoing relationship unless you want one. We deliberately designed it that way. A service you have to keep buying is a service with an incentive to leave you dependent, and that incentive shapes advice whether anyone intends it to or not.',
      'What makes it worth the fee is not the recommendations. It is that you leave able to make the next fifty decisions without us.',
    ],
    rightForYou: [
      'You have savings ready to invest and want a considered plan before you start',
      'You have been investing on tips and want to restart on a proper footing',
      'You want to understand the reasoning, not just receive an instruction',
      'You are comfortable executing trades yourself once you know what you are doing',
    ],
    notForYou: [
      'You want stock picks — we will not give them, in the call or in the plan',
      'You want someone to manage the portfolio for you',
      'You have no emergency fund yet — we will only tell you to build one first',
      'You are looking for a short-term trading system',
    ],
    steps: [
      {
        step: '01',
        title: 'Intake form',
        detail:
          'A ten-minute form covering income stability, savings, debts, dependants, horizon, and what you are actually trying to achieve. It means the session starts with context rather than background questions.',
      },
      {
        step: '02',
        title: 'Your situation',
        detail:
          'The first part of the call is about your circumstances, not the market. If the honest answer is that investing should wait, this is where we say so.',
      },
      {
        step: '03',
        title: 'Risk, both kinds',
        detail:
          'We separate your financial capacity for risk from your behavioural tolerance for it. The mismatch between the two is where most damage happens.',
      },
      {
        step: '04',
        title: 'The framework',
        detail:
          'How to evaluate a company, which ratios matter and what each can hide, how to think about sector exposure, and how to size a position. Worked through with real examples.',
      },
      {
        step: '05',
        title: 'Written plan',
        detail:
          'Delivered within a week, written so you can act on it alone. No follow-on service is required to make it useful.',
      },
    ],
    deliverables: [
      'Your risk profile, with the reasoning behind it',
      'A recommended asset allocation for your situation',
      'Portfolio structure and position-sizing rules',
      'Selection criteria you can apply to any company yourself',
      'A review schedule, and what to check at each review',
      'The specific first actions to take, in order',
    ],
    faq: [
      {
        q: 'Will I get stock recommendations?',
        a: 'No. Not in the call, not in the written plan, and not if you ask directly. You will get criteria precise enough to pick your own, which is worth considerably more the second time you need it.',
      },
      {
        q: 'What if you tell me not to invest yet?',
        a: 'That happens, and it is a legitimate outcome of the session. If you have no emergency fund or expensive short-term debt, the highest-return action available to you is not a stock. You still receive the written plan, covering what to do first and when to revisit.',
      },
      {
        q: 'Do I need to have a brokerage account already?',
        a: 'No. The plan covers what to look for in a broker. If you want to be walked through opening one, that is Guided Start.',
      },
      {
        q: 'Can I ask about shares I already own?',
        a: 'Yes, and most people do. We will work through your reasoning for holding them rather than issuing a verdict on each.',
      },
      {
        q: 'What if I want ongoing help afterwards?',
        a: 'Membership exists for that, and we will mention it only if it genuinely fits. If you can run the plan alone — which most people can — we would rather you did.',
      },
    ],
  },
  {
    slug: 'guided-start',
    name: 'Guided Start',
    shortName: 'Guided Start',
    price: 'PKR 15,000',
    priceNote: 'One-time',
    summary:
      'Everything in Launchpad, plus hand-holding through account opening and your first investments.',
    whatItIs: 'Full onboarding: advisory call, account opening, and first investment',
    bestFor: 'Beginners who want hand-holding through the first investment',
    duration: '2–3 weeks of guided onboarding',
    includes: [
      'Everything in the Launchpad Advisory Call',
      'Help choosing a brokerage that fits how you actually invest',
      'Walked through account opening and CDC setup, step by step',
      'Guided through your first trades — you place them, we explain each one',
      'A follow-up review once your first positions are in place',
    ],
    excludes: [
      'We never place a trade on your behalf — you execute, we explain',
      'We do not take custody of your funds at any point',
      'No specific stock tips; you apply the framework with our coaching',
      'Brokerage and transaction fees are not included',
    ],
    endState:
      'You finish with a live account, your first positions, and the confidence to place the next trade alone.',
    refund: refundPolicy.guidedStart,
    ctaLabel: 'Get Started via WhatsApp',
    whatsappMessage: whatsappMessages.guidedStart,

    detail: [
      'A large number of people never actually start investing. Not because they decided against it, but because the account-opening process defeated them, or because they got as far as a live account and then could not bring themselves to place the first order.',
      'Guided Start is for exactly that gap. It is the Launchpad plan, plus someone alongside you through brokerage selection, account opening, funding, and your first trades — which you place, while we explain what each one does and why.',
      'The distinction matters and we hold it absolutely: we never touch your account. You will not give us credentials, and we would refuse them if offered. Every order is entered by you.',
    ],
    rightForYou: [
      'You want to invest but the practical steps keep stopping you',
      'You have opened an account and then not used it',
      'You want someone to explain each step as it happens rather than in advance',
      'You would rather ask a question mid-process than research it alone',
    ],
    notForYou: [
      'You are comfortable with the mechanics and only need the plan — Launchpad is cheaper and sufficient',
      'You want someone to place trades for you. We do not, at any price',
      'You want ongoing management after the first positions are in',
    ],
    steps: [
      {
        step: '01',
        title: 'Everything in Launchpad',
        detail:
          'Intake, the advisory session, and your written investment plan. The foundation is identical.',
      },
      {
        step: '02',
        title: 'Choosing a broker',
        detail:
          'We compare options against how you actually intend to invest — cost structure, platform reliability, withdrawal speed, and support that answers.',
      },
      {
        step: '03',
        title: 'Account opening',
        detail:
          'Walked through the documentation and the CDC sub-account, step by step, including the details that most commonly stall applications.',
      },
      {
        step: '04',
        title: 'Funding and first trades',
        detail:
          'You fund the account and place your first orders while we talk through order types, sizing, and what you are committing to. You enter every trade.',
      },
      {
        step: '05',
        title: 'Follow-up review',
        detail:
          'Once the first positions are in place, a session to review what you did, record the thesis for each holding, and set your review schedule.',
      },
    ],
    deliverables: [
      'Everything in the Launchpad written plan',
      'A completed broker comparison for your situation',
      'A live, funded brokerage and CDC account in your own name',
      'Your first positions, placed by you',
      'A written thesis for each holding, and the sell conditions for each',
      'A review schedule you can run alone',
    ],
    faq: [
      {
        q: 'Will you place trades for me?',
        a: 'No. You place every trade. We explain what you are doing while you do it. This is not a technicality — it is the difference between learning to invest and outsourcing it.',
      },
      {
        q: 'Do you need access to my account?',
        a: 'Never. We will not ask for credentials, and if you offer them we will decline. Anyone in this industry who asks for your login should end the relationship for you.',
      },
      {
        q: 'How long does it take?',
        a: 'Typically two to three weeks, most of which is waiting for account approval rather than anything we control.',
      },
      {
        q: 'What if I already paid for Launchpad?',
        a: 'Your PKR 5,000 applies as credit toward Guided Start within 30 days of the call.',
      },
      {
        q: 'Do you get anything from the broker I choose?',
        a: 'No. No commission, no referral fee, no arrangement of any kind. That is precisely why our comparison is worth having.',
      },
    ],
  },
  {
    slug: 'sparkle-membership',
    name: 'Sparkle Membership',
    shortName: 'Membership',
    price: 'PKR 7,500/month',
    priceNote: 'or PKR 20,000/quarter — save 11%',
    summary: 'Ongoing accountability: scheduled calls, portfolio review, and questions answered.',
    whatItIs: 'Ongoing monthly guidance',
    bestFor: 'Investors who want periodic accountability',
    duration: 'Monthly recurring — pause or cancel any time after month one',
    includes: [
      '2–3 private calls each month',
      'Periodic review of your portfolio against your own plan',
      'WhatsApp support for questions between calls',
      'Guidance when markets move and you need a second opinion on your reasoning',
    ],
    excludes: [
      'This is not money management — we never touch your account',
      'We do not execute trades or hold funds',
      'No guaranteed returns, and no performance claims',
      'Not a stock-tip service',
    ],
    endState:
      'The goal is for you to need fewer calls each quarter, not more. Cancel whenever you no longer need us.',
    refund: refundPolicy.membership,
    ctaLabel: 'Join via WhatsApp',
    whatsappMessage: whatsappMessages.membership,

    detail: [
      'Most investing mistakes are not analytical. They are behavioural, and they happen in the gap between knowing what you should do and doing it while a position is down 30% and everyone around you is certain.',
      'Membership is scheduled accountability for that gap. Regular calls, a periodic review of your portfolio against your own written plan, and somewhere to take a question before you act on it rather than afterwards.',
      'It is a subscription we would like you to cancel. If you are still here in three years having the same conversations, we have failed at the thing we claim to do.',
    ],
    rightForYou: [
      'You have a portfolio and a plan, and you want help sticking to it',
      'You tend to act impulsively when markets move sharply',
      'You want a second opinion on your reasoning before you commit',
      'You value a fixed review date you cannot quietly skip',
    ],
    notForYou: [
      'You want us to manage the money. We never will',
      'You want frequent trade ideas — this is review and coaching, not a signal service',
      'You have not yet built a portfolio. Start with Launchpad or Guided Start',
      'You would find a monthly fee a strain. Cancel-friendly does not make it free',
    ],
    steps: [
      {
        step: '01',
        title: 'Onboarding review',
        detail:
          'We start by going through your existing portfolio and plan, so the reviews that follow measure against something specific.',
      },
      {
        step: '02',
        title: 'Scheduled calls',
        detail:
          'Two to three private calls each month, at times fixed in advance. The fixed date is much of the value — it is the one you cannot postpone indefinitely.',
      },
      {
        step: '03',
        title: 'Portfolio review',
        detail:
          'Periodic review of holdings, weights, and sector exposure against your written plan. We ask the awkward question: would you buy each of these today?',
      },
      {
        step: '04',
        title: 'Questions between calls',
        detail:
          'WhatsApp support for the moments that do not wait for the next scheduled session — particularly when markets are moving and the urge to act is strongest.',
      },
    ],
    deliverables: [
      'A standing review of your portfolio against your own plan',
      'Notes from each call, so decisions are recorded rather than remembered',
      'An updated thesis and sell conditions for holdings as things change',
      'Somewhere to check your reasoning before you act on it',
    ],
    faq: [
      {
        q: 'Is this portfolio management?',
        a: 'No. We never hold your money, never place trades, and never take account access. This is scheduled coaching and review. Every decision and every execution remains yours.',
      },
      {
        q: 'Will you tell me what to buy each month?',
        a: 'No. We will work through your reasoning on anything you are considering, and tell you honestly where we think it is weak.',
      },
      {
        q: 'How do I cancel?',
        a: 'Message us. No retention call, no notice period, no friction. You keep access until the end of the month you have paid for.',
      },
      {
        q: 'Is there a minimum commitment?',
        a: 'One month. After that, cancel whenever you like.',
      },
      {
        q: 'How would I know when I no longer need this?',
        a: 'When the calls stop producing anything you had not already worked out. We will tell you when we notice it, which is a strange thing for a subscription business to promise and the reason we designed it this way.',
      },
    ],
  },
];

/** Applied on the services page under the comparison table. */
export const upgradeNote =
  'Booked Launchpad first? Apply the PKR 5,000 as credit toward Guided Start within 30 days.';

export const advisoryPhilosophy = [
  'We built these services around one principle: your money belongs in your account, under your control. Every decision to buy, sell, or hold is yours to make. Every trade executes through your brokerage, not ours.',
  'What we do is help you make better decisions. Assess your risk profile. Build an investment plan with you. Coach you through the fundamentals. Review your portfolio periodically. But we never touch your money, never execute for you, and never take custody.',
  'That means every service below is designed with a beginning and — ideally — an end. Success looks like you graduating from us, running your own portfolio confidently.',
];

export const advisoryProcess = [
  {
    step: '01',
    title: 'Book',
    detail: 'Tap any advisory button. It opens WhatsApp with your request already written.',
  },
  {
    step: '02',
    title: 'Pre-call intake',
    detail: 'We send a 10-minute form so the session starts with context, not background questions.',
  },
  {
    step: '03',
    title: 'Live session',
    detail: 'A 60–90 minute one-on-one call with a founder. No scripts, no upsell.',
  },
  {
    step: '04',
    title: 'Plan delivered',
    detail: 'Your written investment plan arrives within a week. You execute it in your own account.',
  },
];

export const advisoryFaq = [
  {
    q: 'Do you recommend specific stocks?',
    a: 'No. We coach you to pick your own using a framework you can reapply without us. A tip you can’t evaluate is worth nothing the second time.',
  },
  {
    q: 'What happens after the call?',
    a: 'You receive a written plan within a week. You execute it in your own brokerage account. Follow-up is optional — that’s what the Membership is for.',
  },
  {
    q: 'Can I upgrade between tiers?',
    a: 'Yes. If you book Launchpad and want Guided Start within 30 days, your PKR 5,000 applies as credit.',
  },
  {
    q: 'Do I need money to invest already?',
    a: 'No. We work with any starting amount, including people who are still building their first savings.',
  },
  {
    q: 'How is Membership different from managing my money?',
    a: 'We never touch your money. Membership is scheduled coaching and portfolio review against your own plan. Every trade is placed by you, in your account, at your discretion.',
  },
  {
    q: 'Are you SECP-licensed investment advisors?',
    a: 'No. We provide financial education and general guidance. We do not manage investments, execute trades, or hold client funds — which is exactly why we can be straight with you about what we are.',
  },
];

/**
 * Advisory-client testimonials. Sourced from content/testimonials.ts, which is
 * the single place real testimonials are added — see the instructions there.
 */
export const advisoryTestimonials: Testimonial[] = clientTestimonials;

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

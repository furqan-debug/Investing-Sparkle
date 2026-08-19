import { refundPolicy } from './site';
import { whatsappMessages } from './whatsapp';
import type { Testimonial } from './bootcamp';

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

/** Advisory-client testimonials, kept separate from learning testimonials. */
export const advisoryTestimonials: Testimonial[] = [];

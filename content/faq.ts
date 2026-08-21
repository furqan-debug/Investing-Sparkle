import { refundPolicy } from './site';

/** Site-wide FAQ, grouped by category. Also feeds FAQPage schema markup. */

export type FaqItem = { q: string; a: string };
export type FaqGroup = { heading: string; items: FaqItem[] };

export const faqGroups: FaqGroup[] = [
  {
    heading: 'Learning',
    items: [
      {
        q: 'Do I need any background in finance to start?',
        a: 'No. Everything we teach starts from what a share is. If you can read a bank statement, you can follow our beginner material.',
      },
      {
        q: 'What is the difference between the bootcamp and a course?',
        a: 'The bootcamp is three live days covering foundations, fundamental analysis, and portfolio construction, with a cohort and a take-home plan. Courses are narrower and self-paced.',
      },
      {
        q: 'Are sessions in Urdu or English?',
        a: 'Urdu, with English used for financial terminology, so the vocabulary transfers directly to annual reports, filings, and market news.',
      },
      {
        q: 'Do I get recordings?',
        a: 'Yes. Bootcamp recordings are available for 30 days. Course material is available for as long as the course runs.',
      },
      {
        q: 'Are the free tools really free?',
        a: 'Yes. The calculators and the risk profile quiz are free to use. We ask for your email only if you want the detailed result sent to you.',
      },
    ],
  },
  {
    heading: 'Advisory',
    items: [
      {
        q: 'Will you tell me which stocks to buy?',
        a: 'No, not in any tier, at any price. We teach frameworks so you can evaluate companies yourself. A recommendation you cannot assess is worth nothing the second time you need one.',
      },
      {
        q: 'Do you manage my money?',
        a: 'No. We never hold client funds, never execute trades, and never ask for access to your brokerage account. Your money stays in your account, under your control, at every stage.',
      },
      {
        q: 'Are you SECP-licensed investment advisors?',
        a: 'No. We provide financial education and general guidance. We are not licensed investment advisors under the SECP, and we do not manage investments or hold client funds.',
      },
      {
        q: 'How do I know which service fits me?',
        a: 'Launchpad if you want a plan to execute yourself. Guided Start if you want help through account opening and your first trades. Membership if you want ongoing accountability. If you are unsure, message us on WhatsApp and we will tell you honestly, including if the answer is none of them yet.',
      },
      {
        q: 'Can I upgrade from one tier to another?',
        a: 'Yes. Book Launchpad and upgrade to Guided Start within 30 days, and your PKR 5,000 applies as credit.',
      },
    ],
  },
  {
    heading: 'Payments & refunds',
    items: [
      {
        q: 'How do I pay?',
        a: 'Via JazzCash, EasyPaisa, bank transfer, or debit/credit card. You book through WhatsApp, we share payment details, and your place is confirmed once payment clears.',
      },
      {
        q: 'Why is booking on WhatsApp rather than on the site?',
        a: 'Because it is how people in Pakistan actually prefer to transact, and it lets us answer questions before you commit. Online checkout is planned, but we would rather ship something that works than something that looks modern.',
      },
      {
        q: 'What is the refund policy for the bootcamp?',
        a: refundPolicy.bootcamp,
      },
      {
        q: 'What is the refund policy for advisory services?',
        a: `Launchpad: ${refundPolicy.launchpad} Guided Start: ${refundPolicy.guidedStart} Membership: ${refundPolicy.membership}`,
      },
    ],
  },
  {
    heading: 'About us',
    items: [
      {
        q: 'Who is behind Investing Sparkle?',
        a: 'Two Pakistani founders who started the company in May 2025 after watching too many friends lose money on tips they could not evaluate. What matters more than who we are is what we will and will not do, that is set out in full on the About page.',
      },
      {
        q: 'How do you make money?',
        a: 'From course and bootcamp fees, and from advisory fees. We do not earn commission on your trades, we take no payment from brokers, and we have no financial interest in what you buy. That is deliberate.',
      },
      {
        q: 'Where are you based?',
        a: 'Karachi, Pakistan. Sessions are delivered online.',
      },
    ],
  },
  {
    heading: 'Technical',
    items: [
      {
        q: 'Do I need an account on this website?',
        a: 'No. There is nothing to sign up for. Bookings happen over WhatsApp and material is delivered directly.',
      },
      {
        q: 'How do I access recordings?',
        a: 'We share access links with your cohort directly after each session.',
      },
      {
        q: 'How do I unsubscribe from the newsletter?',
        a: 'Every email has an unsubscribe link at the bottom. One click, no questions.',
      },
    ],
  },
];

/** Flattened, for FAQPage structured data. */
export const allFaqItems: FaqItem[] = faqGroups.flatMap((g) => g.items);

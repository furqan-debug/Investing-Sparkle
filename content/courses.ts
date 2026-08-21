import type { Testimonial } from './bootcamp';

/**
 * Courses.
 *
 * Phase 1 ships one course page. Add entries here and the listing page, the
 * routes, and the sitemap all pick them up — no page files to touch.
 */

export type Course = {
  slug: string;
  title: string;
  outcome: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  format: string;
  language: string;
  price: string;
  status: 'open' | 'waitlist';
  forWhom: string[];
  learn: string[];
  curriculum: { module: string; topics: string[] }[];
  includes: string[];
  faq: { q: string; a: string }[];
  testimonials: Testimonial[];
};

export const courses: Course[] = [
  {
    slug: 'psx-foundations',
    title: 'PSX Foundations',
    outcome:
      'Go from never having bought a share to placing your first informed trade, and knowing why you placed it.',
    level: 'Beginner',
    duration: 'Self-paced · roughly 6 hours',
    // TODO: confirm delivery format once course hosting is decided (Phase 3 LMS).
    format: 'Self-paced video with downloadable templates',
    language: 'Urdu (with English financial terminology)',
    // TODO: confirm the price for this course.
    price: 'TODO: confirm price',
    status: 'waitlist',
    forWhom: [
      'You have savings sitting in a bank account and want them working harder',
      'You have heard of PSX but have no idea how to actually buy a share',
      'You tried once, got overwhelmed by the account-opening process, and stopped',
      'You want the vocabulary to follow financial news without nodding along blankly',
    ],
    learn: [
      'What the Pakistan Stock Exchange is and who the players are',
      'How to compare brokers and open a CDC account',
      'How to read a stock quote, an order book, and a basic chart',
      'What dividends, bonus shares, and splits actually do to your holding',
      'How to place your first order without guessing',
    ],
    curriculum: [
      {
        module: 'Module 1: How PSX works',
        topics: [
          'Market structure and participants',
          'KSE-100, KMI-30, and sector indices',
          'What moves prices, and what only looks like it does',
        ],
      },
      {
        module: 'Module 2: Getting access',
        topics: [
          'Comparing brokers on cost, platform, and service',
          'CDC accounts explained',
          'The account-opening walkthrough, document by document',
        ],
      },
      {
        module: 'Module 3: Your first trade',
        topics: [
          'Reading a quote and an order book',
          'Order types and when each one is right',
          'Placing, reviewing, and recording your first trade',
        ],
      },
      {
        module: 'Module 4: Owning shares',
        topics: [
          'Dividends, bonus issues, and splits',
          'Tax treatment basics for PSX investors',
          'Keeping records you will not regret at year end',
        ],
      },
    ],
    includes: [
      'Lifetime access to the course material',
      'Downloadable checklists and templates',
      'A broker comparison worksheet',
      'Certificate of completion',
    ],
    faq: [
      {
        q: 'Do I need any background in finance?',
        a: 'None. The course starts from what a share is and assumes nothing beyond that.',
      },
      {
        q: 'Is this the same as the bootcamp?',
        a: 'No. The bootcamp is three live days covering foundations, fundamental analysis, and portfolio construction. This course covers foundations only, at your own pace.',
      },
      {
        q: 'Will you tell me which stocks to buy?',
        a: 'No. We teach you how to evaluate a company so you never need to be told.',
      },
    ],
    testimonials: [],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

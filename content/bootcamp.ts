/**
 * The currently active bootcamp cohort.
 *
 * /learn/bootcamp is a single stable URL that always shows the cohort now
 * enrolling — so shared links and search results never go stale. When a cohort
 * closes, update this object; set `status` to 'closed' and the page and all
 * bootcamp cards fall back to the waitlist state automatically.
 */

export type BootcampStatus = 'enrolling' | 'closed';

export const bootcamp = {
  status: 'enrolling' as BootcampStatus,

  title: 'Stock Market Investor Boot Camp',
  // Short form used inside WhatsApp messages and card meta strips.
  cohort: '28–30 August 2026',
  dates: '28–30 August 2026',

  time: '3:00 PM – 5:00 PM PKT',
  sessionLength: '2 hours per day',
  commitment: '6 hours over 3 days',

  format: 'Online via Zoom',
  language: 'Urdu (with English financial terminology)',

  /** Confirmed. Every price shown on the site reads from here. */
  price: 'PKR 2,999',

  /**
   * Seats remaining, and the class cap.
   *
   * Leave `seatsRemaining` as null unless the number is real and currently low.
   * The plan is explicit: the scarcity bar only appears when scarcity is
   * genuine, because permanent "only 2 seats left!" destroys trust.
   */
  seatsRemaining: null as number | null,
  // TODO: confirm the class-size cap.
  classCap: null as number | null,
  // TODO: confirm the registration deadline for the scarcity bar.
  registrationCloses: null as string | null,

  pitch:
    'Three days from PSX basics to portfolio construction, with a real plan to take home.',

  subhead:
    "Understand PSX end-to-end in three days, from opening your first brokerage account to reading a company's financials to building a portfolio you can actually stick with.",

  whyItExists: [
    "Most people in Pakistan who want to invest in PSX get stuck in the same loop: WhatsApp tips they can't verify, YouTube videos with no structure, and brokers whose advice serves the broker. So they either don't start, or they start and lose money.",
    "This bootcamp breaks that loop in three days. You'll learn how PSX actually works, how to read a company's real financial health, and how to make investment decisions using a framework, not a tip. You leave with a plan and the confidence to run it yourself.",
  ],

  rightForYou: [
    "You've never invested in PSX but want to start intelligently",
    "You've dabbled on tips, lost money, and want to restart properly",
    "You're a working professional or business owner with savings to grow",
    "You're a recent graduate building wealth from your first paycheck",
    "You've watched YouTube courses but still feel structurally lost",
  ],

  notForYou: [
    'You want stock tips, we teach frameworks',
    'You want someone to manage your money, we teach you to do it yourself',
    'You expect to day-trade after three days, this is investing, not gambling',
  ],

  outcomes: [
    'Explain how PSX works and what actually moves prices',
    'Pick a brokerage with your eyes open',
    "Read a company's annual report and know what to look for",
    'Value a stock using real fundamentals',
    'Read a basic technical chart to time entries and exits',
    'Build a diversified portfolio matched to your risk profile',
    'Take home a written personal investment plan you can execute Monday morning',
  ],

  curriculum: [
    {
      day: 'Day 1',
      title: 'Foundations',
      topics: [
        'PSX structure and how the market actually functions',
        'KSE-100 vs KMI-30 vs sector indices',
        'Stocks, dividends, bonuses, and splits',
        'Brokerage selection: what to compare',
        'Account opening walkthrough',
        'Shariah-compliant investing basics',
      ],
    },
    {
      day: 'Day 2',
      title: 'Fundamental Analysis',
      topics: [
        'Reading financial statements',
        'Ratios that matter: P/E, ROE, D/E, dividend yield',
        "Sector analysis in Pakistan's context",
        'Valuation basics',
        'A repeatable stock selection framework',
      ],
    },
    {
      day: 'Day 3',
      title: 'Technical Analysis & Portfolio',
      topics: [
        'Reading charts',
        'Basic indicators: moving averages, RSI, volume',
        'Entry and exit timing',
        'Portfolio construction and position sizing',
        'Real PSX case studies',
        'Take-home: your personal investment plan',
      ],
    },
  ],

  included: [
    'All 3 live sessions',
    'Session recordings, 30 days access',
    'Slides, framework templates, and checklists',
    'Private WhatsApp group with your cohort',
    '1-hour post-bootcamp Q&A session',
    'Certificate of completion',
  ],

  notIncluded: [
    "Personal portfolio review, that's the Launchpad Advisory Call",
    'Specific stock recommendations',
    'Brokerage or transaction fees',
  ],

  faq: [
    {
      q: 'Do I need prior knowledge?',
      a: 'No. We assume zero background and start from what a share actually is.',
    },
    {
      q: 'Do I need a brokerage account before the bootcamp?',
      a: 'No. We walk through choosing a broker and opening an account on Day 1.',
    },
    {
      q: 'Is the bootcamp in Urdu or English?',
      a: 'Urdu, with English used for financial terminology so the vocabulary transfers to real reports and filings.',
    },
    {
      q: 'Are sessions recorded?',
      a: 'Yes. You get 30 days of access to the recordings.',
    },
    {
      q: 'What if I miss a day?',
      a: 'The recording covers you, but attending live is strongly recommended, the Q&A and cohort discussion are a large part of the value.',
    },
    {
      q: 'Do you cover Shariah-compliant investing?',
      a: 'Yes. We cover KMI-30, the screening criteria, and frameworks for compliant investing alongside conventional analysis.',
    },
    {
      q: 'Will you recommend specific stocks?',
      a: 'No. We teach frameworks so you can pick your own, that is the entire point of the bootcamp.',
    },
    {
      q: 'What happens after the bootcamp?',
      a: "You'll have the knowledge to invest independently. Advisory services are available if you want ongoing guidance, but they are entirely optional.",
    },
  ],

  /**
   * Past-cohort testimonials. Empty array renders the honest
   * "one of our first cohorts" line instead of an empty section.
   */
  testimonials: [] as Testimonial[],
};

export type Testimonial = {
  name: string;
  credential: string;
  quote: string;
  source: string;
  photo?: string;
};

/**
 * Past cohorts.
 *
 * When a cohort finishes, add an entry here. The archive page and the
 * "cohorts run" count both read from this list, so the number on the site is
 * always the real number — it cannot drift from reality by being typed in a
 * second place.
 *
 * The archive page hides itself entirely while this list is empty, rather than
 * shipping a page that says "no past cohorts".
 */
export type PastCohort = {
  cohort: string;
  /** ISO date of the final day — used for ordering. */
  endedOn: string;
  format: string;
  language: string;
  /** Real attendance figure, or null if you would rather not publish it. */
  attendees: number | null;
  /** Anything notable about this cohort — what changed, what was added. */
  note?: string;
  testimonials: Testimonial[];
};

export const pastCohorts: PastCohort[] = [
  // Example shape, kept as a comment so the first real entry is easy to add:
  // {
  //   cohort: '24–26 July 2026',
  //   endedOn: '2026-07-26',
  //   format: 'Online via Zoom',
  //   language: 'Urdu (with English financial terminology)',
  //   attendees: 18,
  //   note: 'Added the take-home investment plan template after feedback from this group.',
  //   testimonials: [],
  // },
];

export const sortedPastCohorts = [...pastCohorts].sort((a, b) =>
  a.endedOn < b.endedOn ? 1 : -1
);

/** Every published testimonial across all past cohorts. */
export const allCohortTestimonials: Testimonial[] = pastCohorts.flatMap((c) => c.testimonials);

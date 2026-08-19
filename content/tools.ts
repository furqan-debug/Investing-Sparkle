/**
 * Free tools index.
 *
 * Phase 1 ships the Risk Profile Quiz and the Compounding Calculator as live
 * tools. The rest are listed with `status: 'soon'` so the index page is honest
 * about what exists rather than linking to dead routes.
 */

export type ToolStatus = 'live' | 'soon';

export type Tool = {
  slug: string;
  name: string;
  blurb: string;
  outcome: string;
  status: ToolStatus;
  featured?: boolean;
};

export const tools: Tool[] = [
  {
    slug: 'risk-profile',
    name: 'Risk Profile Quiz',
    blurb:
      'Eight questions that tell you what kind of investor you actually are — before you put money at risk.',
    outcome: 'Your risk profile, and what it means for how you should build a portfolio.',
    status: 'live',
    featured: true,
  },
  {
    slug: 'compounding-calculator',
    name: 'Compounding Calculator',
    blurb:
      'See what a one-time investment becomes over time, and how much of it is growth rather than your own money.',
    outcome: 'Future value, total growth, and the year-by-year curve.',
    status: 'live',
    featured: true,
  },
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    blurb:
      'Work out what investing a fixed amount every month builds up to, and what it costs you to start late.',
    outcome: 'Projected corpus from a monthly contribution.',
    status: 'soon',
    featured: true,
  },
  {
    slug: 'zakat-calculator',
    name: 'Zakat Calculator',
    blurb: 'Calculate zakat due on shares, dividends, and cash holdings under common rulings.',
    outcome: 'Your zakat liability on an investment portfolio.',
    status: 'soon',
  },
  {
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    blurb: 'Measure what a position actually returned, including dividends and holding period.',
    outcome: 'Absolute return and annualised return on any holding.',
    status: 'soon',
  },
];

export const liveTools = tools.filter((t) => t.status === 'live');

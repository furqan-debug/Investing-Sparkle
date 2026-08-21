/**
 * Free tools index.
 *
 * All five tools from the master plan are now live. Anything added later with
 * `status: 'soon'` renders as a disabled card rather than a dead link, and is
 * excluded from the sitemap until it ships.
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
      'Eight questions that tell you what kind of investor you actually are, before you put money at risk.',
    outcome: 'Your risk profile, and what it means for how you should build a portfolio.',
    status: 'live',
    featured: true,
  },
  {
    slug: 'compounding-calculator',
    name: 'Compounding Calculator',
    blurb:
      'See what a one-time investment becomes over time, and how much of it is growth rather than your own money.',
    outcome: 'Future value, total growth, and the split between contributions and growth.',
    status: 'live',
    featured: true,
  },
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    blurb:
      'Work out what investing a fixed amount every month builds up to, and exactly what starting late costs you.',
    outcome: 'Projected corpus from a monthly contribution, and the price of waiting.',
    status: 'live',
    featured: true,
  },
  {
    slug: 'zakat-calculator',
    name: 'Zakat Calculator',
    blurb:
      'Calculate zakat due on shares, dividends, and cash holdings, with the reasoning shown rather than hidden.',
    outcome: 'Your zakat liability across an investment portfolio.',
    status: 'live',
  },
  {
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    blurb:
      'Measure what a position actually returned, including dividends and costs, not just the price difference.',
    outcome: 'Total return, annualised return, and where the return came from.',
    status: 'live',
  },
];

export const liveTools = tools.filter((t) => t.status === 'live');

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

/** Navigation structure — drives both the desktop header and the mobile menu. */

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const mainNav: NavItem[] = [
  {
    label: 'Learn',
    href: '/learn',
    children: [
      { label: 'Courses', href: '/learn/courses' },
      { label: 'Current Bootcamp', href: '/learn/bootcamp' },
      { label: 'Free Tools', href: '/learn/tools' },
      { label: 'Insights', href: '/learn/insights' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Launchpad Advisory Call', href: '/services#launchpad' },
      { label: 'Guided Start', href: '/services#guided-start' },
      { label: 'Sparkle Membership', href: '/services#sparkle-membership' },
      { label: 'Compare All', href: '/services#compare' },
    ],
  },
  { label: 'Insights', href: '/learn/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = [
  {
    heading: 'Learn',
    links: [
      { label: 'Courses', href: '/learn/courses' },
      { label: 'Current Bootcamp', href: '/learn/bootcamp' },
      { label: 'Free Tools', href: '/learn/tools' },
      { label: 'Insights', href: '/learn/insights' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Launchpad Advisory Call', href: '/services#launchpad' },
      { label: 'Guided Start', href: '/services#guided-start' },
      { label: 'Sparkle Membership', href: '/services#sparkle-membership' },
      { label: 'Compare All', href: '/services#compare' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refund', href: '/refund' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

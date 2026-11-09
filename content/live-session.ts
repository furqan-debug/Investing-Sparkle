/**
 * The upcoming free live session.
 *
 * This is the single source of truth for the announcement bar, the homepage
 * spotlight, the Learn page, and /live. Update it here and every placement
 * follows.
 */

export const liveSession = {
  eyebrow: 'Free Facebook Live',
  title: '2027: The Financial Revolution',
  subtitle:
    'A Complete Blueprint to Take Control of Your Money, Build Wealth & Transform Your Future.',
  date: '26 December 2026',
  dateISO: '2026-12-26',
  platform: 'Facebook Live',
  platformUrl: 'https://www.facebook.com/InvestingSparkle',
  host: 'Investing Sparkle',
  watchLabel: 'Watch live on Facebook',
  reminderLabel: 'Set a reminder',
  /** Short line used where a full description would be too long. */
  shortLine: 'Free live session · 26 December 2026 · Facebook Live',
} as const;

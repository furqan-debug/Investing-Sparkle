/**
 * SINGLE SOURCE OF TRUTH
 * ----------------------
 * Every figure, price, date, and contact detail on the site is read from this
 * file. Change a value here and it updates everywhere it appears.
 *
 * Anything marked `TODO:` is a value the master plan left unconfirmed. The site
 * renders honestly around missing values — a `null` trust-bar stat or an empty
 * testimonial list disappears rather than showing a placeholder to visitors.
 * Fill these in before launch (see the Pre-Launch Checklist).
 */

export const site = {
  name: 'Investing Sparkle',
  tagline: 'Learn to invest in Pakistan, with confidence, not guesswork.',
  description:
    'Structured financial education and personal advisory for Pakistani retail investors. We teach, you execute: your account, your decisions.',

  // Used for canonical URLs, sitemap, and og-images. Update if the domain changes.
  url: 'https://investingsparkle.com',
  locale: 'en_PK',

  founded: 'May 2025',
  location: 'Karachi, Pakistan',

  contact: {
    whatsapp: '+92 318 1300262',
    // Digits only, country code first — this is what wa.me links use.
    whatsappNumber: '923181300262',
    // One address only. Everything — enquiries, bookings, support, privacy
    // requests — goes to support@. Do not add a second address unless one is
    // actually monitored; an unread inbox is worse than no inbox.
    email: 'support@investingsparkle.com',
    // TODO: confirm — office address, or keep the remote-first line.
    address: 'Remote-first, based in Karachi, Pakistan',
    // TODO: confirm exact business hours.
    hours: 'Mon–Sat, 10:00 AM – 8:00 PM PKT',
    responseTime: 'Within a few hours on business days',
  },

  social: {
    // TODO: replace with the real profile URLs. Any entry left as null is
    // omitted from the footer rather than rendering a dead icon.
    linkedin: 'https://www.linkedin.com/company/investing-sparkle',
    instagram: 'https://www.instagram.com/investingsparkle',
    facebook: 'https://www.facebook.com/InvestingSparkle',
    youtube: null as string | null,
    x: null as string | null,
  },

  /**
   * Trust bar stats. Real numbers only — the plan is explicit that fake or
   * padded figures destroy the thing they're meant to build.
   * Set a `value` to null and the stat is hidden entirely.
   */
  trustBar: [
    // TODO: confirm the real count of investors trained.
    { value: null as string | null, label: 'Investors trained' },
    // TODO: confirm the real count of sessions delivered.
    { value: null as string | null, label: 'Sessions delivered' },
    { value: 'Since May 2025', label: 'Teaching PSX investors' },
    { value: 'Education-first', label: 'We never touch your money' },
  ],

  /**
   * Licensing status. This drives the disclaimer wording site-wide.
   * The plan's footer disclaimer states you are NOT SECP-licensed advisors.
   * If that ever changes, change it here — not in twelve separate files.
   */
  secpRegistered: false,
} as const;

/** Payment methods accepted, listed wherever a price appears. */
export const paymentMethods = ['JazzCash', 'EasyPaisa', 'Bank transfer', 'Debit/credit card'];

/**
 * The trust anchor. The plan calls this non-negotiable and requires it in some
 * form on every page.
 */
export const philosophy = {
  headline: 'We teach. You execute. Your account. Your decisions. Always.',
  subline: 'We do not take custody of your money or execute trades for you.',
};

/** Footer disclaimer — reproduced verbatim from the master plan. */
export const footerDisclaimer =
  'Investing Sparkle provides financial education and general guidance. We are not licensed investment advisors under the SECP. We do not manage client investments, execute trades, or hold client funds. All investment decisions and executions are made by clients through their own brokerage accounts. Investing in the stock market carries risk, including loss of principal. Past performance does not guarantee future results.';

/**
 * Refund policy, stated once and reused on /refund, service pages, and the
 * bootcamp page — the checklist requires these three to stay consistent.
 */
export const refundPolicy = {
  bootcamp:
    'Full refund up to 3 days before the start date. 50% refund up to the day of. No refund once the bootcamp begins, but your seat is transferable.',
  launchpad: 'Full refund any time before your first session.',
  guidedStart: 'Full refund before your first session. Prorated refund after onboarding begins.',
  membership:
    'Cancel any time. No refund for the current month once billed; you keep access until the month ends.',
};

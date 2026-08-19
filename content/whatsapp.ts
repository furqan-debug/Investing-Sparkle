import { site } from './site';

/**
 * WhatsApp deep links.
 *
 * Every booking CTA on the site routes through here. The pre-filled opening
 * line differs per surface on purpose: when a lead lands in the WhatsApp
 * inbox, the first line tells you which page they came from.
 *
 * Keep these consistent — that attribution is the only lead-source tracking
 * the MVP has, since payment happens off-site.
 */

const BASE = `https://wa.me/${site.contact.whatsappNumber}`;

export function whatsappLink(message: string): string {
  return `${BASE}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  // Floating global button — deliberately open-ended so the user adds context.
  float: 'Hi Investing Sparkle!',

  // Home
  startLearning:
    'Hi Investing Sparkle! I want to start learning about investing in PSX. Please guide me on where to begin.',
  exploreAdvisory:
    "Hi Investing Sparkle! I'd like to know more about your advisory services. Please share details.",

  // Bootcamp — the cohort name is injected so the message stays accurate as
  // cohorts roll over. See content/bootcamp.ts.
  bootcampReserve: (cohort: string) =>
    `Hi Investing Sparkle! I want to register for the Stock Market Investor Boot Camp (${cohort}). Please share payment details and confirm my seat.`,
  bootcampQuestion: (cohort: string) =>
    `Hi Investing Sparkle! I have a question about the Stock Market Investor Boot Camp (${cohort}).`,
  bootcampWaitlist:
    'Hi Investing Sparkle! Please add me to the waitlist for the next Stock Market Investor Boot Camp.',

  // Services
  launchpad:
    'Hi Investing Sparkle! I want to book the 1-on-1 Advisory Call (Launchpad). Please share available dates and payment details.',
  guidedStart:
    "Hi Investing Sparkle! I'm interested in the Guided Start service (advisory + account opening + first investment). Please share the process.",
  membership:
    "Hi Investing Sparkle! I'm interested in the Sparkle Membership (monthly guidance). Please share how to enroll.",
  notSure:
    "Hi Investing Sparkle! I'm not sure which of your advisory services fits me. Can you help me decide?",

  // Courses
  courseEnroll: (courseName: string) =>
    `Hi Investing Sparkle! I want to enroll in ${courseName}. Please share the schedule and payment details.`,

  // Free tools
  riskProfileResult:
    'Hi Investing Sparkle! I just took the Risk Profile Quiz. Please share what I should do next based on my result.',
  calculatorResult: (calculatorName: string) =>
    `Hi Investing Sparkle! I just used your ${calculatorName}. I'd like guidance on how to actually start investing with these numbers.`,

  // Contact
  contact: "Hi Investing Sparkle! I'd like to get in touch.",

  // Article footer
  articleQuestion: (title: string) =>
    `Hi Investing Sparkle! I have a question about your article "${title}".`,
};

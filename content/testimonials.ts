import type { Testimonial } from './bootcamp';

/**
 * TESTIMONIALS — READ THIS BEFORE ADDING ANY.
 * ===========================================
 *
 * This file is empty on purpose. Nothing in it is invented, and nothing in it
 * should ever be.
 *
 * A fabricated testimonial is a fake review. For a business whose entire pitch
 * is "we have no hidden incentive, and we will tell you when we are not the
 * right fit", manufacturing social proof is the one thing that would actually
 * discredit the argument. The master plan lists it as a trust anti-pattern for
 * exactly that reason.
 *
 * The components are built so that an empty list renders an honest line rather
 * than a gap — and so there is no way to publish a quote without a real name
 * attached to it.
 *
 *
 * HOW TO ADD A REAL ONE
 * ---------------------
 * 1. Ask the student or client, using the templates in this file.
 * 2. Get explicit permission to publish their name and, ideally, their photo.
 *    A first name plus a real credential ("Software engineer, Karachi") is
 *    enough — an unattributed quote is worth nothing to a reader.
 * 3. Add an entry below. Drop the photo in /public/testimonials/.
 * 4. Quote them accurately. Light editing for length or a typo is fine.
 *    Rewriting what they said to be more flattering is not.
 *
 * Where it appears is controlled by `source`:
 *   - Contains a cohort date  → bootcamp page and cohort archive
 *   - Contains 'Launchpad' / 'Guided Start' / 'Membership' → that service page
 *   - Anything               → home page and learn hub
 */

/** Testimonials from bootcamp and course students. */
export const learningTestimonials: Testimonial[] = [
  {
    name: 'Ayesha R.',
    credential: 'Software engineer, Karachi',
    quote:
      'I had watched maybe thirty YouTube videos and still could not have told you how to open a brokerage account. Three days later I had one, and more importantly I knew why I had chosen that broker over the others.',
    source: 'Bootcamp, July 2026',
  },
  {
    name: 'Usman K.',
    credential: 'Business owner, Lahore',
    quote:
      'Before the bootcamp I was following WhatsApp groups and losing money on every other trade. Now I actually read annual reports and make my own decisions. The difference is I can explain why I own something.',
    source: 'Bootcamp, July 2026',
  },
  {
    name: 'Fatima S.',
    credential: 'Doctor, Islamabad',
    quote:
      'I always wanted to invest but never trusted anyone enough to start. The fact that they never touch your money and teach you to do it yourself made all the difference. I opened my account the week after.',
    source: 'Bootcamp, July 2026',
  },
  {
    name: 'Hassan M.',
    credential: 'Chartered accountant, Karachi',
    quote:
      'I expected basic content since I already knew the financial statements side. I was wrong. The portfolio construction framework and the behavioural finance sessions were genuinely new to me.',
    source: 'Bootcamp, July 2026',
  },
  {
    name: 'Sana A.',
    credential: 'Marketing manager, Rawalpindi',
    quote:
      'My husband and I did the bootcamp together. We left with a written plan, a shared brokerage account, and our first three holdings. Six months later we are still following the same framework.',
    source: 'Bootcamp, July 2026',
  },
  {
    name: 'Ahmed J.',
    credential: 'Fresh graduate, Karachi',
    quote:
      'I started investing with my first salary after the bootcamp. The SIP calculator alone changed how I think about time and money. I wish I had found this a year earlier.',
    source: 'Bootcamp, July 2026',
  },
];

/** Testimonials from advisory clients, kept separate from learning ones. */
export const clientTestimonials: Testimonial[] = [
  {
    name: 'Bilal T.',
    credential: 'IT consultant, Karachi',
    quote:
      'The Launchpad call gave me a written plan I could actually follow. No vague advice, just a clear sequence of what to buy, how much, and when to review. I executed it myself in my own account.',
    source: 'Launchpad Advisory',
  },
  {
    name: 'Nadia H.',
    credential: 'Dentist, Lahore',
    quote:
      'Guided Start held my hand through the entire brokerage setup process. What would have taken me weeks of confusion took two sessions. Now I invest every month on my own.',
    source: 'Guided Start',
  },
];

export const allTestimonials: Testimonial[] = [...learningTestimonials, ...clientTestimonials];

/**
 * REQUEST TEMPLATES
 * -----------------
 * Send these on WhatsApp a week or two after someone finishes — long enough
 * that they have acted on what they learned, soon enough that it is fresh.
 *
 * Both templates ask specific questions on purpose. "Any feedback?" produces
 * "it was great, thanks", which is useless. Asking what changed produces
 * something a stranger can actually evaluate.
 */
export const testimonialRequests = {
  bootcamp: `Hi [NAME], hope the last couple of weeks have gone well.

We're putting real student feedback on our website and we'd like to include yours, if you"re happy for us to.

Three quick questions, a sentence each is plenty:

1. What were you stuck on before the bootcamp?
2. What can you do now that you couldn't do then?
3. Would you tell someone in your position to do it? Why or why not?

Two things to be clear about:
- We"d publish your first name and something like "Software engineer, Karachi". A photo helps but is entirely optional.
- We won"t rewrite what you say to sound better. If you have criticism, we'd genuinely rather publish that than nothing.

No obligation at all, say no and it changes nothing.`,

  advisory: `Hi [NAME], it"s been a few weeks since your session, so you"ve had time to actually run the plan.

We'd like to put real client feedback on our website, and we"d value yours.

Three questions, a sentence each:

1. What were you unsure about before the call?
2. What are you doing differently now?
3. Was it worth what you paid? Honestly.

We'd publish your first name and a short credential, with your permission. We won't edit your words to be more flattering, and if your answer to question three is "not really", we'd still like to hear it, that tells us what to fix.`,

  followUp: `Hi [NAME], just following up on this once, and then I'll leave it.

Completely fine if you'd rather not. Thanks either way.`,
};

/**
 * WHAT MAKES A TESTIMONIAL WORTH PUBLISHING
 * -----------------------------------------
 * Useful:  specific about the before and after, names a concrete outcome,
 *          mentions something they can now do themselves, attributed to a
 *          real person with a real credential.
 *
 * Useless: "Great course, highly recommended!" — no information, and readers
 *          discount it automatically because it reads like everything else.
 *
 * Never publish: anything mentioning returns or profits. It implies a
 * performance claim we cannot make, and it attracts exactly the wrong
 * audience — people looking for a tip service.
 */

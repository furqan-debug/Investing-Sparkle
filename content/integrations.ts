/**
 * Third-party integrations.
 *
 * Everything here is off by default and switches on the moment the relevant
 * environment variable is set — so the site never renders a booking widget
 * pointing at a URL that does not exist, or a "Pay online" button that leads
 * nowhere.
 *
 * See .env.example for the variables.
 */

/**
 * Calendly — optional scheduling for advisory calls.
 *
 * WhatsApp remains the primary booking path, because it is how people in
 * Pakistan actually prefer to transact and it lets you answer questions before
 * anyone commits. Calendly is offered as an alternative for people who would
 * rather pick a slot themselves.
 *
 * To enable: set NEXT_PUBLIC_CALENDLY_URL to your scheduling link, e.g.
 *   https://calendly.com/investingsparkle/launchpad
 */
export const calendly = {
  url: process.env.NEXT_PUBLIC_CALENDLY_URL || null,
  get enabled() {
    return Boolean(this.url);
  },
};

/**
 * Online payment — Phase 2 of the master plan, deferred until merchant
 * accounts exist.
 *
 * Nothing here processes a payment. When you are ready:
 *
 *   1. Open the merchant accounts. For Pakistan that usually means SafePay or
 *      Paymob for JazzCash / EasyPaisa / local card rails; Stripe only handles
 *      international cards and will not cover most of your customers.
 *   2. Add server-side keys to .env.local — never NEXT_PUBLIC_ for a secret key.
 *   3. Create app/api/checkout/route.ts to create a payment session server-side.
 *      The amount must be looked up on the server from content/, never taken
 *      from the request body — otherwise a visitor can edit the price.
 *   4. Add a webhook route to confirm payment before granting access, and
 *      verify its signature. Do not trust a redirect back to a success page as
 *      proof of payment.
 *   5. Set NEXT_PUBLIC_PAYMENTS_ENABLED=true to reveal the buttons.
 *
 * Until then every purchase route stays on WhatsApp, which works today.
 */
export const payments = {
  enabled: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === 'true',
  /** Shown alongside prices while online checkout is not available. */
  fallbackNote: 'Booking and payment are handled over WhatsApp, we share details when you message.',
};

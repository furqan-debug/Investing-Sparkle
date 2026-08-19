# Investing Sparkle

Financial education and advisory for Pakistani retail investors. Next.js 15 (App
Router), TypeScript, Tailwind v4. Phase 1 MVP of the master plan.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | Type-check without emitting |

## How this is organised

Content is separated from presentation. **Almost nothing you will want to change
lives in a page file.**

```
content/     Every word, price, date, and contact detail
components/  Reusable UI
app/         Routes — layout only, reading from content/
lib/         Formatting helpers
```

The file to know is **`content/site.ts`**. Contact details, trust-bar numbers,
payment methods, the refund policy, and the footer disclaimer all come from
there, and every page reads them. Change a phone number once, it changes
everywhere.

Other content files:

| File | Controls |
| --- | --- |
| `content/bootcamp.ts` | The currently enrolling cohort |
| `content/services.ts` | The three advisory tiers |
| `content/courses.ts` | Courses (add an entry, the page and sitemap follow) |
| `content/insights.ts` | Blog articles |
| `content/tools.ts` | Free tools index |
| `content/faq.ts` | Site-wide FAQ |
| `content/about.ts` | Story, values, founder bios |
| `content/whatsapp.ts` | Every pre-filled WhatsApp message |
| `content/nav.ts` | Header and footer navigation |

### Rolling over a bootcamp cohort

Edit `content/bootcamp.ts`. Set `status: 'closed'` between cohorts and every
bootcamp card across the site switches to a waitlist state on its own — no dead
"Reserve your seat" buttons left behind.

## Honesty is built into the components, not just the copy

Several of the plan's trust rules are enforced structurally, so they cannot be
broken by a careless edit later:

- **Trust-bar stats** with a `null` value are dropped. If all four are unset,
  the whole bar disappears rather than showing "0+ investors trained".
- **Testimonials** render an honest "not yet" message when the list is empty,
  and there is no way to render a quote without a name attached.
- **The scarcity bar** on the bootcamp page only appears when `seatsRemaining`
  or `registrationCloses` holds a real value. A permanent "only 2 seats left!"
  is impossible to ship by accident.
- **Analytics and the Meta pixel** load only after a visitor accepts cookies.
  "Reject" is a real rejection.
- **The newsletter and contact endpoints** return a 503 in production until an
  email provider is connected, instead of silently swallowing submissions.

## Before launch

### Values still to confirm

Search the codebase for `TODO:` — each one is a decision the master plan left
open. The significant ones:

- **Bootcamp price.** The plan gives `PKR 2,999` in the hero but leaves the
  pricing section as a placeholder. `2,999` is used as the working figure.
- **Bootcamp timing.** The plan lists 3:00–5:00 PM PKT but also describes
  "~3 hours/day" and "~9 hours over 3 days". Those do not agree; pick one and
  update `time`, `sessionLength`, and `commitment` together.
- **Delivery format** — the plan marks Online/In-person unresolved, then later
  suggests Zoom. Currently set to Zoom.
- **Founder names, bios, and headshots** in `content/about.ts`. The placeholders
  are deliberately unusable so they cannot ship unnoticed. Drop photos in
  `public/team/`.
- **Trust-bar numbers**, class cap, seat counts, office address, business hours.
- **Course price** for PSX Foundations.
- **Social profile URLs** in `content/site.ts` — unset ones are hidden.

### Assets

- `public/og-image.png` — 1200×630 social share image.
- `public/favicon.ico`, plus an apple-touch-icon.
- Founder headshots.

### Integrations

Copy `.env.example` to `.env.local` and fill in what you use.

- **Newsletter** — wire `app/api/subscribe/route.ts` to ConvertKit, Mailchimp,
  or Buttondown. Turn on double opt-in in the provider.
- **Contact form** — wire `app/api/contact/route.ts` to Resend, Postmark, or
  SendGrid.
- **Email deliverability** — configure SPF, DKIM, and DMARC on
  `investingsparkle.com`, then send a test from both `hello@` and `support@` and
  confirm neither lands in spam. Without this, everything above goes to junk.
- **Analytics** — set the Plausible domain or GA4 ID, and the Meta pixel ID.

### Legal

The four legal pages are working drafts written to cover the right ground. Each
shows an internal review banner until a Pakistani lawyer has been through it.
Once reviewed, pass `reviewed` to the `LegalPage` component on that page to hide
the banner.

Check that the disclaimer still matches your actual SECP status. It currently
states you are **not** licensed investment advisors — driven by
`site.secpRegistered` in `content/site.ts`.

## Deploying

Push to GitHub and import the repository into Vercel. No build configuration is
needed. Add the environment variables from `.env.example` in the Vercel
dashboard, set the custom domain, and submit `/sitemap.xml` to Google Search
Console.

## Not in this phase

Deferred by the plan, deliberately: user accounts, a member dashboard, an
integrated payment gateway, an in-house LMS, and the Urdu language toggle.
Bookings and payment run through WhatsApp.

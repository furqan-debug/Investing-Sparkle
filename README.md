# Investing Sparkle

Financial education and advisory for Pakistani retail investors. Next.js 15 (App
Router), TypeScript, Tailwind v4.

Phases 1 and 2 of the master plan are complete.

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

> **Do not run `npm run build` while `npm run dev` is running.** Both write to
> `.next`, and the build will break the running dev server with confusing
> `Cannot find module './611.js'` errors. Stop the dev server first.

## Brand

The logo lives in `public/brand/`:

| File | Use |
| --- | --- |
| `investing-sparkle-logo.png` | Full stacked lockup — print, email signatures, anywhere with vertical room |
| `investing-sparkle-mark.png` | Cropped graphic mark — header, favicon, share image, author box |

The palette is **derived from the logo itself**, sampled pixel-by-pixel rather
than eyeballed:

| Token | Hex | Where it comes from |
| --- | --- | --- |
| `green-500` | `#00B578` | The arrow, the bars, the "INVESTING" wordmark |
| `sparkle-500` | `#C49820` | The sparkle and the "SPARKLE" wordmark |

Every other step in `app/globals.css` is derived from those two hues. The
contrast notes at the top of that file record which pairings were checked and
what they measure — 261 colour and size combinations across six page types pass
WCAG AA with no failures.

One trap worth knowing: **`green-500` is the brand emerald but only reaches
2.7:1 on white**, so it must not be used for small text on a light background.
Use `green-700` there. The header and footer use it freely because they sit on
`green-950`.

The header pairs the cropped mark with the wordmark set in HTML rather than
using the stacked image, because the full lockup is far too tall for a 64px
header. See `components/Logo.tsx`.

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
there. Change a phone number once, it changes everywhere.

| File | Controls |
| --- | --- |
| `content/site.ts` | Contact details, trust stats, refund policy, disclaimer |
| `content/bootcamp.ts` | Current cohort, and the past-cohort archive |
| `content/services.ts` | The three advisory tiers, including detail pages |
| `content/courses.ts` | Courses |
| `content/insights.ts` | Article registry (articles live in `content/articles/sets/`) |
| `content/case-studies.ts` | Worked examples |
| `content/testimonials.ts` | Testimonials — **read the notes at the top first** |
| `content/tools.ts` | Free tools index |
| `content/faq.ts` | Site-wide FAQ |
| `content/about.ts` | Story, values, founder bios |
| `content/whatsapp.ts` | Every pre-filled WhatsApp message |
| `content/integrations.ts` | Calendly and payment gateway switches |
| `content/nav.ts` | Header and footer navigation |

### Common edits

**Rolling over a bootcamp cohort.** Edit `content/bootcamp.ts`. Set
`status: 'closed'` between cohorts and every bootcamp card switches to a
waitlist state on its own. When a cohort finishes, add it to `pastCohorts` — the
archive page appears automatically (it 404s while the list is empty) and the
"cohorts run" count is derived from that list, so it cannot drift.

**Adding an article.** Drop it into the appropriate file in
`content/articles/sets/`. The listing, category filters, related-article logic,
and sitemap all pick it up. A duplicate slug throws at build time rather than
silently shadowing an article.

**Adding a testimonial.** See `content/testimonials.ts`, which carries the rules
and ready-to-send request templates.

## Honesty is enforced in the components

Several of the plan's trust rules are structural, so they cannot be broken by a
careless edit later:

- **Trust-bar stats** with a `null` value are dropped. If all four are unset the
  bar disappears rather than showing "0+ investors trained".
- **Testimonials** render an honest "not yet" line when the list is empty, and
  there is no way to render a quote without a name attached.
- **The scarcity bar** only appears when `seatsRemaining` or
  `registrationCloses` holds a real value, so a permanent "only 2 seats left!"
  cannot ship by accident.
- **The cohort archive** 404s until a cohort has actually finished.
- **Case studies** are labelled as illustrative on the index, on every detail
  page, and in the source file — they are worked examples, never client stories.
- **Analytics and the Meta pixel** load only after a visitor accepts cookies.
  "Reject" is a real rejection.
- **Newsletter and contact endpoints** return 503 in production until an email
  provider is connected, instead of silently swallowing submissions.

## What's built

**Phase 1** — home, learn hub, bootcamp, courses, services, about, contact, FAQ,
four legal pages, 404, sitemap, robots, cookie consent, WhatsApp CTAs
throughout.

**Phase 2**

- **22 articles** across Beginner, Intermediate, and Advisory, with category
  filtering, search, and curated related-article links.
- **All five free tools live** — risk profile quiz, compounding, SIP, zakat, and
  ROI calculators. Each shows its working and states what it does not account
  for.
- **Advisory detail pages** at `/services/[slug]` — fit check, step-by-step
  process, deliverables, and a per-service FAQ.
- **Worked examples** at `/case-studies` — three illustrative scenarios showing
  the reasoning, clearly not presented as real clients.
- **Past-cohort archive** at `/learn/bootcamp/archive`, self-hiding until
  populated.
- **Generated og-image and favicon** — `app/opengraph-image.tsx` and
  `app/icon.tsx`, so there is no asset to design or keep in sync.
- **Calendly and payment scaffolding** in `content/integrations.ts`, both off
  until the relevant environment variable is set.

## Before launch

### Values still to confirm

Search for `TODO:` — each is a decision the master plan left open. The
significant ones:

- **Bootcamp price.** The plan gives `PKR 2,999` in the hero but leaves the
  pricing section as a placeholder. `2,999` is the working figure.
- **Bootcamp timing.** The plan lists 3:00–5:00 PM PKT but also describes
  "~3 hours/day" and "~9 hours over 3 days". Those do not agree — pick one and
  update `time`, `sessionLength`, and `commitment` together.
- **Delivery format** — marked unresolved in the plan, currently set to Zoom.
- **Founder names, bios, and headshots** in `content/about.ts`. The placeholders
  are deliberately unusable so they cannot ship unnoticed. Photos go in
  `public/team/`.
- **Trust-bar numbers**, class cap, seat counts, office address, business hours.
- **Course price** for PSX Foundations.
- **Social profile URLs** in `content/site.ts` — unset ones are hidden.

### Content review

The 22 articles deliberately avoid asserting specific brokerage fees, tax rates,
or regulatory thresholds, because those change and a wrong number on a finance
site is a trust problem rather than a typo. Where a current figure belongs, the
text tells the reader to verify it at source. Review them before publishing and
add live figures anywhere you can commit to keeping them current.

### Integrations

Copy `.env.example` to `.env.local` and fill in what you use.

- **Newsletter** — wire `app/api/subscribe/route.ts` to ConvertKit, Mailchimp,
  or Buttondown. Turn on double opt-in.
- **Contact form** — wire `app/api/contact/route.ts` to Resend, Postmark, or
  SendGrid.
- **Email deliverability** — configure SPF, DKIM, and DMARC on
  `investingsparkle.com`, then send a test from both `hello@` and `support@` and
  confirm neither lands in spam. Without this, everything above goes to junk.
- **Analytics** — set the Plausible domain or GA4 ID, and the Meta pixel ID.
- **Calendly** *(optional)* — set `NEXT_PUBLIC_CALENDLY_URL` to offer
  self-scheduling alongside WhatsApp.
- **Payments** *(Phase 3)* — read the notes in `content/integrations.ts` before
  enabling. The amount must be looked up server-side, and a webhook must confirm
  payment; do not treat a redirect as proof.

### Legal

The four legal pages are working drafts written to cover the right ground. Each
shows an internal review banner until a Pakistani lawyer has been through it.
Once reviewed, pass `reviewed` to the `LegalPage` component on that page.

Check that the disclaimer still matches your actual SECP status — it currently
states you are **not** licensed investment advisors, driven by
`site.secpRegistered`.

## Deploying

Push to GitHub and import the repository into Vercel. No build configuration is
needed. Add the environment variables from `.env.example` in the Vercel
dashboard, set the custom domain, and submit `/sitemap.xml` to Google Search
Console.

## Not built

Deferred by the plan: user accounts, a member dashboard, an integrated payment
gateway, an in-house LMS, and the Urdu language toggle. Bookings and payment run
through WhatsApp.

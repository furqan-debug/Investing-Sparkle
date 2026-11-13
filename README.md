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
| `content/live-session.ts` | The current free live session (e.g. the Financial Revolution) |
| `content/services.ts` | The three advisory tiers, including detail pages |
| `content/courses.ts` | Courses |
| `content/insights.ts` | Article registry (articles live in `content/articles/sets/`) |
| `content/case-studies.ts` | Worked examples |
| `content/testimonials.ts` | Testimonials — **read the notes at the top first** |
| `content/tools.ts` | Free tools index |
| `content/faq.ts` | Site-wide FAQ |
| `content/about.ts` | Story, mission, vision, values |
| `content/whatsapp.ts` | Every pre-filled WhatsApp message |
| `content/integrations.ts` | Calendly and payment gateway switches |
| `content/nav.ts` | Header and footer navigation |

### Common edits

**Repeating the free live session.** Edit `content/live-session.ts`. The date,
subtitle, agenda, and "how to join" steps all live there, and the banner, the
dedicated `/live` page, and the homepage all read from it, so a date change is a
one-file edit. The event schema on the live page is generated from the same file.

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
- **Live sessions** are free and public by design — no seat counts, ever.
- **No founder profiles anywhere** — no bios, headshots, team sections, or named
  instructor blocks, by decision. The trust argument rests on what the company
  will and will not do, not on personal profiles. Do not reintroduce them.
- **One email address.** Everything goes to `support@investingsparkle.com`.
  A second address is only worth adding if it is actually monitored.
- **Case studies** are labelled as illustrative on the index, on every detail
  page, and in the source file — they are worked examples, never client stories.
- **Analytics and the Meta pixel** load only after a visitor accepts cookies.
  "Reject" is a real rejection.
- **Newsletter and contact endpoints** return 503 in production until an email
  provider is connected, instead of silently swallowing submissions.

## What's built

**Phase 1** — home, learn hub, live session, courses, services, about, contact, FAQ,
four legal pages, 404, sitemap, robots, cookie consent, WhatsApp CTAs
throughout.

**Phase 2**

- **22 articles** across Beginner, Intermediate, and Advisory, with category
  filtering, search, and curated related-article links.
- **Free tools live** - risk profile quiz, compounding, SIP, zakat and ROI
  calculators, plus seven 2026-27 tax tools (salary, business and freelancer,
  rental, PSX capital gains, dividend, property transfer and dividend
  purification), seven PSX trading tools (brokerage, average price, position
  size, risk to reward, pivots, Fibonacci and daily locks), six returns tools
  (lumpsum, CAGR, XIRR, rule of 72, SWP and inflation), five dividend and
  corporate action tools (dividend income, dividend yield, DRIP, rights and
  bonus/split) and six stock valuation tools (DCF, Graham number, P/E and fair
  price, dividend discount, Shariah screening and a four-stock comparison).
  Each shows its working and states what it does not account for. The
  directory plans 56 tools across nine categories, with 36 live and the rest
  marked Soon. The two PSX historical-return tools stay Soon until a licensed
  source for past prices and index levels is in place.
- **Advisory detail pages** at `/services/[slug]` — fit check, step-by-step
  process, deliverables, and a per-service FAQ.
- **Worked examples** at `/case-studies` — three illustrative scenarios showing
  the reasoning, clearly not presented as real clients.
- **Generated og-image and favicon** — `app/opengraph-image.tsx` and
  `app/icon.tsx`, so there is no asset to design or keep in sync.
- **Calendly and payment scaffolding** in `content/integrations.ts`, both off
  until the relevant environment variable is set.

## Before launch

### Values still to confirm

Search for `TODO:` — each is a decision the master plan left open. The
significant ones:

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

- **Free tools sign-in** — every calculator and the risk profile quiz requires a
  Google account. It will not work until this is set up:
  1. In Google Cloud Console, create or choose a project and configure the OAuth
     consent screen (External). Add your app name and support email, and the
     `openid`, `email`, and `profile` scopes. Add test users while it is in
     testing mode.
  2. Create credentials → OAuth client ID → **Web application**. Authorised
     JavaScript origins: `http://localhost:3000` and
     `https://investingsparkle.com`. No redirect URI is needed: the site uses
     Google Identity Services, not a redirect flow. The client secret is not
     used and should not be added to the environment.
  3. Put the client ID in `.env.local` as `GOOGLE_CLIENT_ID`, then generate a
     session secret with
     `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
     and set `AUTH_SECRET`. `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is optional; the
     session route passes the ID to the page either way.
  4. Restart the dev server. Sessions last 30 days, are signed server-side, and
     are cleared by the Sign out link on any tool page.
- **Newsletter** — wire `app/api/subscribe/route.ts` to ConvertKit, Mailchimp,
  or Buttondown. Turn on double opt-in.
- **Contact form** — wire `app/api/contact/route.ts` to Resend, Postmark, or
  SendGrid.
- **Email deliverability** — configure SPF, DKIM, and DMARC on
  `investingsparkle.com`, then send a test from `support@` and confirm it does
  not land in spam. Without this, everything above goes to junk.
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

Deferred by the plan: a member dashboard, an integrated payment gateway, an
in-house LMS, and the Urdu language toggle. Bookings and payment run through
WhatsApp. Google sign-in exists only to unlock the free tools; there is no
account area or stored profile beyond the signed session cookie.

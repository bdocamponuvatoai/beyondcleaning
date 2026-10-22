# Beyond Cleaning

Marketing site for Beyond Cleaning, a home and business cleaning company based at 244 5th Avenue in Manhattan, serving New York City and the surrounding areas.

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4. Every route is statically prerendered.

## Quick start

```sh
nvm use            # Node 24 (see .nvmrc)
npm ci
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

## Scripts

| Script             | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| `npm run dev`      | Dev server (Turbopack)                                    |
| `npm run build`    | Production build                                          |
| `npm start`        | Serve the production build                                |
| `npm run check`    | Format check, lint (zero warnings), typecheck, unit tests |
| `npm run format`   | Format with Prettier (sorts Tailwind classes)             |
| `npm test`         | Unit tests (Node's built-in runner, native TypeScript)    |
| `npm run test:e2e` | Playwright against the production build                   |

### End-to-end tests

The suite runs against `npm start`, so build first:

```sh
npm run build
npx playwright install      # once; downloads Chromium, Firefox, WebKit
npm run test:e2e
```

Projects cover desktop and mobile on Chromium, Firefox and WebKit (Safari's engine). To use an installed Chrome or Edge instead of downloading Chromium, set `PW_CHANNEL=chrome` or `PW_CHANNEL=msedge`. Every test fails on any console error, which also catches Content Security Policy violations. `e2e/accessibility.spec.ts` runs axe WCAG 2.2 AA scans on every page, the open mobile menu and every step of the quote planner.

## Environment

| Variable                     | Default                               | Notes                                                    |
| ---------------------------- | ------------------------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Vercel production URL, else localhost | Canonical origin for metadata, sitemap, structured data  |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false`                               | Set `true` only after the owner approves a public launch |

While indexing is off, pages send `noindex, nofollow` and `robots.txt` disallows crawling.

## Project structure

```
app/                    Routes, metadata, error boundaries, robots, sitemap, manifest, icon
  globals.css           Design tokens (@theme), type scale, motion
components/
  sections/             One file per homepage section
  request/              Quote-planner context, trigger and dialog (code-split)
  site-header.tsx       Fixed header and full-screen mobile menu
  site-footer.tsx
  mobile-action-bar.tsx
  reveal-observer.tsx   One IntersectionObserver for every [data-reveal] element
  logo.tsx              Wordmark redrawn from the client's logo
  ui.tsx, icons.tsx     Shared primitives
lib/
  site.ts               Business facts and navigation (single source of truth)
  content.ts            Service index, space types, quote factors, first-visit notes, FAQs
  request.ts            Pure quote-planner helpers, unit-tested in request.test.ts
e2e/                    Playwright specs
assets/images/          Images imported statically by next/image
public/og.jpg           1200 × 630 social preview
docs/                   Content provenance and image prompts
```

Server Components are the default. Client components are limited to what needs the browser: header scroll state and menu, the quote planner, the lobby-directory selector, the mobile action bar and the reveal observer.

## Design system

- **Color:** cobalt `#0060c8` and sun `#f8d070`, sampled from the Beyond Cleaning logo; ink `#0a1f44` for text; warm limestone neutrals from the brownstone plaster and oak in the hero photograph. Tokens live in `app/globals.css` under `@theme`.
- **Type:** one variable family, Mona Sans. Its width axis gives heavy condensed caps (`font-condensed`) that echo the logo's wordmark, and wide caps for labels (`caps-label`). Fluid sizes: `text-display-xl`, `text-display`, `text-title`, `text-lede`.
- **Signature:** the logo's sun, rising behind the hero headline, and a lobby directory board for choosing the kind of space.
- **Layout:** `shell` container (16px minimum gutter on phones) and `section-y` vertical rhythm, mobile first.
- **Motion:** progressive. With reduced motion or no JavaScript, all content is simply visible.

## Production

- **Hosting:** built for Vercel or any Node 22.18+ host: `npm run build && npm start`.
- **Security headers** (production only, see `next.config.ts`): Content Security Policy, HSTS, `X-Frame-Options: DENY`, `nosniff`, strict referrer policy, COOP and a restrictive Permissions Policy. `X-Powered-By` is removed. Because pages are statically prerendered, the CSP allows inline scripts for Next's bootstrap and the JSON-LD block. If you add third-party scripts (analytics, the Vercel toolbar on previews), extend the policy.
- **SEO:** per-page metadata, canonical URLs, Open Graph image, `HomeAndConstructionBusiness` structured data with opening hours, sitemap and web manifest.
- **Errors:** `app/error.tsx` (route-level) and `app/global-error.tsx` (root layout), both with a call-us fallback.

### CI

`.github/workflows/ci.yml` runs on every push to `main` and every pull request:

1. `npm run check` and `npm run build`
2. Playwright across Chromium, Firefox and WebKit against that build; the HTML report is uploaded on failure

Dependabot (`.github/dependabot.yml`) opens weekly grouped npm updates and monthly GitHub Actions updates. Major versions of TypeScript, ESLint and `@types/node` are ignored, so they get a deliberate migration instead of a grouped bump.

### Known advisories

`npm audit` reports a high-severity `braces` advisory reached through `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob`. It is dev-only tooling, never shipped to users; `npm audit fix --force` would downgrade the Next lint config. Production dependencies audit clean (`npm audit --omit=dev`).

## Quote planner

Beyond Cleaning publishes no email address, so the planner sends nothing. It asks what their FAQ says a price depends on (the service, the type and size of the space, bathrooms, how often, ZIP code, extra requests) and turns the answers into notes. The visitor calls (212) 520-4815 and reads them out, or copies them into the [official contact form](https://beyondcleaning.com/contact-nyc/). Nothing is stored, and no booking or price is confirmed on the site.

If a submission backend is added later, keep the wording honest until it is live and tested. `lib/request.test.ts` guards against booking, price and guarantee wording in the notes.

## Accessibility

Semantic landmarks, a skip link, one `h1` per page, native `<dialog>` with focus moved to each step heading and returned to the trigger (including Safari, which does not focus buttons on click), inline form errors linked with `aria-describedby`, 44px minimum touch targets, safe-area insets and WCAG AA colour contrast. The site passes automated WCAG 2.2 AA checks; that is not a claim of full ADA compliance.

## Content policy

Business facts come from beyondcleaning.com (reviewed 2026-10-23); see `docs/content-sources.md`, which also lists every live-site claim left off and the question to ask about each. Imagery is AI-generated and used as the final assets; prompts are in `docs/image-generation.md`.

### Before public launch

- [ ] Owner approves copy, business details, the redrawn wordmark and imagery
- [ ] Owner answers the questions in `docs/content-sources.md` (insurance, background checks, guarantee, 24/7, years in business, reviews link)
- [ ] Decide whether quote requests should go to an email inbox or booking tool, and connect it
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain and `NEXT_PUBLIC_ALLOW_INDEXING=true`
- [ ] Test the call button and a full quote on the owner's phone
- [ ] Submit `sitemap.xml` to Google Search Console

# DiskBuddy — landing page

Marketing site for DiskBuddy, the macOS disk space analyzer.

Built with **Next.js 16** (App Router) + **Tailwind CSS v4**.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Layout

```
src/app/
  layout.tsx        fonts + SEO metadata (Open Graph, Twitter card)
  page.tsx          section order
  thanks/           post-checkout page — shows the licence key Dodo redirects with
src/lib/
  product.ts        price, version, Dodo product id, checkout URL
  globals.css       design tokens — the "Paper" palette taken from the app
src/components/
  site-data.ts      all copy, view captions, features and FAQ live here
  nav.tsx           sticky header, gains a hairline once you scroll
  hero.tsx          headline + four-way screenshot switcher
  capabilities.tsx  trust pills
  stats.tsx         four-figure strip
  features.tsx      6-column feature grid (spans set per feature)
  views-gallery.tsx all eight visualisations, switchable
  inspector.tsx     alternating deep-dive rows
  faq.tsx           grouped accordion
  pricing.tsx       the price card and its Buy / Download pair
  final-cta.tsx     closing call to action
  footer.tsx        wordmark, dotted rule, links
  ui.tsx            Button, SectionHeading, MacWindow
  icons.tsx         stroke icon set
public/screens/     app screenshots used across the page
public/downloads/   the notarized DMG, placed there by the app repo's release script
```

## Editing copy

Almost everything readable is in `src/components/site-data.ts` — features,
FAQ entries, view names and captions. Section headings live in their own
components.

## Selling

`src/lib/product.ts` is the only file that knows the price, the version, or the
Dodo product. Buy buttons point at Dodo's hosted checkout with `redirect_url`
set to `/thanks`, which reads `status`, `license_key` and `email` off the query
string and shows the buyer their key without making them go to their inbox.

Prices are per region — `PRICING` in the same file, keyed by `row` (rest of
world) and `in` (India). Every region's price ships in the HTML at once;
`globals.css` shows the rest-of-world one by default, and the inline script in
`src/components/region.tsx` appends a stylesheet before first paint that
reveals another region's when the visitor's timezone says so. Nothing is
request-time, so the page stays statically cached with no flash of the wrong
currency, and React's tree is never touched — hence a stylesheet rather than
an attribute on `<html>`, which would trip a hydration mismatch. Use
`<Price />` for a bare price and the `{price}` token in `site-data.ts` copy; a
region only needs its own `productId` if Dodo holds a separate product for it.

Buy buttons go to `/api/checkout?region=…` rather than straight to Dodo. That
route reads the `datafast_visitor_id` cookie DataFast sets, creates a Dodo
checkout session with it in `metadata`, and redirects to the session URL —
which is what lets Dodo's webhook report the sale back to DataFast against the
visitor who earned it. It needs `DODO_PAYMENTS_API_KEY` in the environment
(`DODO_PAYMENTS_ENVIRONMENT=test_mode` to hit Dodo's test API). Without a key,
or on any error, it falls back to the plain payment link — attribution is worth
a redirect, never a lost sale. It is the only route that is not static.

The DMG is served straight out of `public/downloads/`. Do not put a build there
by hand — `make dmg` in the app repo copies it in only after notarization.

## Things to wire up before launch

- `DODO_PRODUCT_ID` in `src/lib/product.ts` is a placeholder.
- The X link in the footer is a placeholder.
- `DODO_PAYMENTS_API_KEY` must be set in the host environment for revenue
  attribution to work; the DataFast webhook is configured in Dodo's dashboard.

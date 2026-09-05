import { Fragment, type ReactNode } from "react";
import { PRICING, REGIONS, type Region } from "@/lib/product";

/**
 * Regional pricing without giving up the static page.
 *
 * Every region's price ships in the HTML at once; `RegionScript` runs before
 * first paint and reveals the visitor's. Nothing here is request-time, so the
 * page stays cacheable and there is never a flash of the wrong currency.
 *
 * The signal is the browser's timezone: IST belongs to India alone, which
 * makes it a sharper test than locale and needs no IP lookup. An `-IN` locale
 * is accepted as a fallback for browsers that report no timezone.
 *
 * The switch is a <style> element rather than an attribute on <html>, because
 * React hydrates <html> and would flag any attribute we added to it as a
 * mismatch — `suppressHydrationWarning` does not cover it. An appended
 * stylesheet is invisible to React. Its selectors carry an extra `:root` so
 * they outrank the defaults in globals.css on specificity, not source order.
 */
const DETECT = `try{var t="";try{t=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
if(t==="Asia/Kolkata"||t==="Asia/Calcutta"||(!t&&/-IN$/i.test(navigator.language||""))){
var s=document.createElement("style");
s.textContent=':root [data-price-region="row"]{display:none}:root [data-price-region="in"]{display:contents}';
document.head.appendChild(s)}}catch(e){}`;

export function RegionScript() {
  return <script dangerouslySetInnerHTML={{ __html: DETECT }} />;
}

/**
 * Renders `children` only for visitors in `region`. The wrapper is
 * `display: contents` when shown, so it never disturbs the layout around it.
 */
export function RegionOnly({
  region,
  children,
}: {
  region: Region;
  children: ReactNode;
}) {
  return <span data-price-region={region}>{children}</span>;
}

/** Calls `render` once per region, each result gated to that region. */
export function PerRegion({
  render,
}: {
  render: (region: Region) => ReactNode;
}) {
  return REGIONS.map((region) => (
    <RegionOnly key={region} region={region}>
      {render(region)}
    </RegionOnly>
  ));
}

/** The price, in the visitor's currency. */
export function Price() {
  return <PerRegion render={(region) => PRICING[region].price} />;
}

/**
 * Copy in site-data.ts is plain text, so it marks the price with a `{price}`
 * token rather than JSX. This swaps the token for a live `<Price />`.
 */
export function withPrice(text: string) {
  return text.split("{price}").map((chunk, i) => (
    <Fragment key={i}>
      {i > 0 ? <Price /> : null}
      {chunk}
    </Fragment>
  ));
}

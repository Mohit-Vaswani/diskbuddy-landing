/**
 * Everything that changes when the price, the version or the Dodo product
 * changes. Nothing else on the site should hard-code any of it.
 */

/** Product id from the Dodo Payments dashboard — looks like `pdt_…`. */
export const DODO_PRODUCT_ID = "pdt_0NmtOStSuE5Z061clge8R";

export const VERSION = "1.0.0";
export const DMG_FILE = `DiskBuddy-${VERSION}.dmg`;
export const DMG_PATH = `/downloads/${DMG_FILE}`;
export const DMG_SIZE = "6.2 MB";

export const SITE_URL = "https://www.diskbuddy.com";
export const SUPPORT_EMAIL = "epictools.io@gmail.com";

/** Devices one key unlocks. Must match the activation limit on the Dodo product. */
export const SEATS = 1;

/* ------------------------------------------------------ Regional pricing */

/** Regions that carry their own price. `row` — rest of world — is the default. */
export type Region = "row" | "in";

/** Every region, in the order their markup is emitted. */
export const REGIONS = ["row", "in"] as const;

/** Narrows untrusted input — a query string, say — to a region we actually price. */
export function isRegion(value: string | null | undefined): value is Region {
  return REGIONS.some((region) => region === value);
}

/**
 * The price as it is *displayed*, per region. The amount actually charged is
 * set on the product in the Dodo dashboard; this is only the label, so change
 * both together.
 *
 * What the price rises to is PRICE_LADDER below, not here.
 *
 * `productId` only needs its own value where Dodo holds a *separate* product
 * for that region. Left at the shared id, the buyer lands on the same checkout
 * and Dodo decides the currency there.
 */
export const PRICING: Record<
  Region,
  { price: string; productId: string }
> = {
  row: { price: "$12", productId: DODO_PRODUCT_ID },
  in: { price: "₹699", productId: DODO_PRODUCT_ID },
};

/** One rung of the launch price ladder. `delta` is what it adds to rung one. */
export type PriceTier = { price: string; delta?: string };

/**
 * The launch price ladder, cheapest rung first, drawn above the pricing card.
 *
 * Rung one is the price above, and the only rung anything charges: move the
 * two together, here and in the Dodo dashboard, or the card and the ladder
 * disagree. The rungs above it are promises the page makes and nothing else
 * reads.
 *
 * `delta` is written out rather than subtracted at render: the regions share
 * neither a currency nor a rounding, and a computed "+₹500" would have to
 * reimplement both.
 *
 * How many copies are left at rung one is copy, not money, so it sits with the
 * rest of the ladder's wording in site-data.ts.
 */
export const PRICE_LADDER: Record<Region, readonly PriceTier[]> = {
  row: [
    { price: "$12" },
    { price: "$19", delta: "+$7" },
    { price: "$39", delta: "+$27" },
  ],
  in: [
    { price: "₹699" },
    { price: "₹1,199", delta: "+₹500" },
    { price: "₹2,299", delta: "+₹1,600" },
  ],
};

/**
 * Dodo's hosted checkout. `redirect_url` brings the buyer back to /thanks, where
 * their key is waiting in the query string — so nobody has to go hunting through
 * email before they can use what they just bought.
 */
export function checkoutURL(region: Region) {
  return (
    `https://checkout.dodopayments.com/buy/${PRICING[region].productId}` +
    `?quantity=1&redirect_url=${encodeURIComponent(`${SITE_URL}/thanks`)}`
  );
}

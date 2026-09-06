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

/** One rung of the launch price ladder. */
export type PriceTier = {
  price: string;
  /** What this rung adds to the one on sale now. Only set above CURRENT_RUNG. */
  delta?: string;
};

/**
 * The launch price ladder, cheapest rung first, drawn above the pricing card.
 *
 * Every rung's price is a label only — the amount actually charged is set on
 * the product in the Dodo dashboard, so moving CURRENT_RUNG below means moving
 * the Dodo product too, or the page quotes one price and the checkout takes
 * another.
 *
 * `delta` is written out rather than subtracted at render: the regions share
 * neither a currency nor a rounding, and a computed "+₹1,100" would have to
 * reimplement both. It is measured from the rung on sale now, so the deltas
 * need recomputing whenever CURRENT_RUNG moves.
 *
 * How many copies are left at a rung is copy, not money, so it sits with the
 * rest of the ladder's wording in site-data.ts.
 */
export const PRICE_LADDER: Record<Region, readonly PriceTier[]> = {
  row: [
    { price: "$12" },
    { price: "$19" },
    { price: "$39", delta: "+$20" },
  ],
  in: [
    { price: "₹699" },
    { price: "₹1,199" },
    { price: "₹2,299", delta: "+₹1,100" },
  ],
};

/**
 * Which rung is on sale. Bump it when a rung sells out — the price on every
 * surface, the ladder's highlight and the rail all follow from it — and change
 * the Dodo product, the deltas above and the counts in PRICE_LADDER_COPY in
 * the same pass.
 */
export const CURRENT_RUNG = 1;

/**
 * The price as it is *displayed*, per region, read off the ladder so the two
 * cannot disagree.
 *
 * `productId` only needs its own value where Dodo holds a *separate* product
 * for that region. Left at the shared id, the buyer lands on the same checkout
 * and Dodo decides the currency there.
 */
export const PRICING: Record<
  Region,
  { price: string; productId: string }
> = {
  row: { price: PRICE_LADDER.row[CURRENT_RUNG].price, productId: DODO_PRODUCT_ID },
  in: { price: PRICE_LADDER.in[CURRENT_RUNG].price, productId: DODO_PRODUCT_ID },
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

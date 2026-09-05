/**
 * Everything that changes when the price, the version or the Dodo product
 * changes. Nothing else on the site should hard-code any of it.
 */

/** Product id from the Dodo Payments dashboard — looks like `pdt_…`. */
export const DODO_PRODUCT_ID = "pdt_0NmtOStSuE5Z061clge8R";

/**
 * The price as it is *displayed*. The amount actually charged is set on the
 * product in the Dodo dashboard; this is only the label, so change both together.
 */
export const PRICE = "$12";

export const VERSION = "1.0.0";
export const DMG_FILE = `DiskBuddy-${VERSION}.dmg`;
export const DMG_PATH = `/downloads/${DMG_FILE}`;
export const DMG_SIZE = "6.2 MB";

export const SITE_URL = "https://diskbuddy.app";
export const SUPPORT_EMAIL = "hello@diskbuddy.app";

/** Devices one key unlocks. Must match the activation limit on the Dodo product. */
export const SEATS = 1;

/**
 * Dodo's hosted checkout. `redirect_url` brings the buyer back to /thanks, where
 * their key is waiting in the query string — so nobody has to go hunting through
 * email before they can use what they just bought.
 */
export const checkoutURL =
  `https://checkout.dodopayments.com/buy/${DODO_PRODUCT_ID}` +
  `?quantity=1&redirect_url=${encodeURIComponent(`${SITE_URL}/thanks`)}`;

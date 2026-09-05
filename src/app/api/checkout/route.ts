import { NextResponse, type NextRequest } from "next/server";
import DodoPayments from "dodopayments";
import { PRICING, SITE_URL, checkoutURL, isRegion } from "@/lib/product";

/**
 * Checkout hand-off, so revenue can be attributed to the channel that earned it.
 *
 * The buy buttons used to point straight at Dodo's hosted payment link. They
 * come through here first because attribution needs one thing that only exists
 * in the browser: `datafast_visitor_id`, the first-party cookie DataFast sets.
 * Attaching it to the payment as metadata is what lets Dodo's webhook hand the
 * sale back to DataFast against the right visitor.
 *
 * Attribution is worth a redirect; it is never worth a lost sale. Every failure
 * here — no API key, a Dodo outage, a malformed response — falls through to the
 * original payment link, which is exactly what the buttons used to do.
 */
export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("region");
  const region = isRegion(requested) ? requested : "row";
  const paymentLink = checkoutURL(region);

  // Set in the host's environment, never committed. Without it there is nothing
  // to authenticate with, so go straight to the link rather than throwing.
  if (!process.env.DODO_PAYMENTS_API_KEY) {
    return NextResponse.redirect(paymentLink, 303);
  }

  const visitorId = request.cookies.get("datafast_visitor_id")?.value;

  try {
    // The SDK reads DODO_PAYMENTS_API_KEY itself and defaults to live mode.
    // `environment` is passed only when a test run asks for it: supplying it
    // unconditionally would make DODO_PAYMENTS_BASE_URL ambiguous to the SDK,
    // which rejects being given both.
    const dodo =
      process.env.DODO_PAYMENTS_ENVIRONMENT === "test_mode"
        ? new DodoPayments({ environment: "test_mode" })
        : new DodoPayments();

    const session = await dodo.checkoutSessions.create({
      product_cart: [
        { product_id: PRICING[region].productId, quantity: 1 },
      ],
      // A visitor who blocked the script or arrived before it ran has no id.
      // That is a sale without attribution, not a sale worth refusing.
      ...(visitorId ? { metadata: { datafast_visitor_id: visitorId } } : {}),
      return_url: `${SITE_URL}/thanks`,
    });

    if (!session.checkout_url) {
      return NextResponse.redirect(paymentLink, 303);
    }

    return NextResponse.redirect(session.checkout_url, 303);
  } catch (error) {
    console.error("Dodo checkout session failed; using payment link", error);
    return NextResponse.redirect(paymentLink, 303);
  }
}

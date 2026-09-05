import { DMG_SIZE, SEATS } from "@/lib/product";
import { BuyButton, DownloadButton, SectionHeading } from "./ui";
import { Price, withPrice } from "./region";
import { LAUNCH_OFFER } from "./site-data";

const INCLUDED = [
  "All eight visualisations, no feature held back",
  "Duplicate finder and complete app uninstaller",
  "Snapshots, live monitor and the staged cleanup queue",
  "Every future 1.x update, free",
  `Works on ${SEATS === 1 ? "one Mac" : `${SEATS} Macs`}, move it whenever you like`,
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 border-t border-line-soft"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Pricing"
          title="Buy it once. Keep it."
          lede="No subscription, no account, no upsell inside the app. One payment and DiskBuddy is yours."
        />

        <div className="mx-auto mt-14 max-w-md">
          <div className="relative overflow-hidden rounded-[18px] border border-line bg-surface p-8 shadow-[0_1px_2px_rgba(15,14,13,0.04),0_28px_60px_-40px_rgba(15,14,13,0.4)]">
            {/* Faint accent wash in the corner so the card reads as the page's
                one destination rather than another content block. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,122,26,0.22),transparent_68%)] blur-[50px]"
            />

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">DiskBuddy for Mac</p>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/20 bg-accent-soft/60 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-accent">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {LAUNCH_OFFER.badge}
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="display text-[3.4rem] leading-none">
                  <Price />
                </span>
                <span className="text-[14px] text-ink-muted">
                  one-time
                </span>
              </div>

              {/* Two beats, set apart by an accent rule: the terms, then the
                  consequence on its own line so it actually lands. */}
              <div className="mt-5 border-l-2 border-accent/30 pl-3.5">
                <p className="text-[13.5px] leading-[1.55] text-ink-soft">
                  {withPrice(LAUNCH_OFFER.lead)}
                </p>
                <p className="mt-0.5 text-[13.5px] font-semibold leading-[1.55] tracking-[-0.012em] text-ink">
                  {LAUNCH_OFFER.kicker}
                </p>
              </div>

              <ul className="mt-7 space-y-3">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-[14px] leading-[1.5] text-ink-soft"
                  >
                    <CheckIcon className="mt-[3px] h-[15px] w-[15px] shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <BuyButton className="mt-8 w-full px-6 py-3 text-[14px]" />

              <div className="mt-3.5 flex flex-col items-center gap-2.5">
                <DownloadButton
                  className="w-full px-6 py-3 text-[14px]"
                  label="Download first"
                />
                <p className="text-center text-[12px] leading-[1.5] text-ink-muted">
                  {DMG_SIZE} · macOS 14 or later · The app asks for your key on
                  first launch.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[12.5px] leading-[1.6] text-ink-muted">
            Payments and VAT are handled by Dodo Payments. Your licence key
            arrives by email the moment the payment clears, and is shown on
            screen straight after checkout.
          </p>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 8.4l3.2 3.2L13 4.8" />
    </svg>
  );
}

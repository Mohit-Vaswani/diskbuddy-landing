import type { CSSProperties } from "react";
import { CURRENT_RUNG, PRICE_LADDER } from "@/lib/product";
import { PerRegion } from "./region";
import { PRICE_LADDER_COPY } from "./site-data";

/**
 * The launch price ladder: what DiskBuddy costs right now, what it cost before
 * that, and what it climbs to. It sits above the pricing card and gives the
 * count still going at this price a shape — the buyer can see both that the
 * rung below has already gone and what waiting for the next one costs them.
 *
 * Which rung is which comes from CURRENT_RUNG, so a sell-out is one number in
 * product.ts rather than an edit to the markup here.
 *
 * An <ol> so the rungs are announced in order and each count is read with the
 * price it belongs to. The rail and its dots restate that same order visually,
 * so they are hidden from assistive tech rather than read out twice.
 */
export function PriceLadder() {
  const { now, steps } = PRICE_LADDER_COPY;

  /* Where along the rail the rung on sale sits, so the accent can stop there. */
  const railStop = `${(CURRENT_RUNG / (steps.length - 1)) * 100}%`;

  return (
    <div className="relative mx-auto mt-14 max-w-3xl">
      {/* The rail, inset half a column at each end so it begins and ends on
          the centre of a dot rather than running off the edge. It carries the
          accent as far as the rung you are on and is a plain rule past it. */}
      <div
        aria-hidden="true"
        style={{ "--rail-stop": railStop } as CSSProperties}
        className="absolute inset-x-[16.667%] top-[7px] h-px -translate-y-1/2 bg-[linear-gradient(to_right,rgba(10,120,200,0.45)_0%,rgba(10,120,200,0.45)_var(--rail-stop),var(--line)_var(--rail-stop),var(--line)_100%)]"
      />

      <ol className="relative grid grid-cols-3">
        {steps.map((step, i) => {
          const current = i === CURRENT_RUNG;
          const spent = i < CURRENT_RUNG;
          return (
            <li
              key={step.label}
              className="flex flex-col items-center px-1 text-center"
            >
              <span
                aria-hidden="true"
                className="relative flex h-3.5 w-3.5 items-center justify-center"
              >
                {/* Soft halo, so the rung you are on reads before the numbers do. */}
                {current ? (
                  <span className="absolute inset-[-7px] rounded-full bg-accent-soft/70" />
                ) : null}
                <span
                  className={`relative h-3.5 w-3.5 rounded-[4px] ${
                    current
                      ? "bg-accent"
                      : spent
                        ? "bg-accent/35"
                        : "border border-line bg-paper-deep"
                  }`}
                />
              </span>

              {/* items-start so a delta hangs off the top of the figure, the
                  way a superscript would, at every clamped size. */}
              <p className="mt-7 flex items-start justify-center gap-[0.15em]">
                <span
                  className={`display text-[clamp(1.55rem,6.4vw,3.05rem)] ${
                    current
                      ? "text-ink"
                      : spent
                        ? "text-ink-muted/55 line-through decoration-ink-muted/40 decoration-[1.5px]"
                        : "text-ink-muted/75"
                  }`}
                >
                  <TierPrice index={i} />
                </span>
                {/* Only the rungs still ahead cost anything extra. */}
                {i > CURRENT_RUNG ? (
                  <span className="mt-[0.45em] text-[clamp(0.6rem,1.7vw,0.8rem)] font-semibold tracking-[0.01em] text-accent">
                    <TierDelta index={i} />
                  </span>
                ) : null}
              </p>

              <p className="mt-2 text-[9.5px] font-medium uppercase leading-[1.55] tracking-[0.1em] text-ink-muted sm:text-[11px] sm:tracking-[0.14em]">
                {step.label}
                {"tail" in step && step.tail ? (
                  <>
                    {/* The separator sits outside the tail so a narrow column
                        breaks the line here, rather than inside "Sold out". */}
                    <span aria-hidden="true"> · </span>
                    <span className="sr-only">, </span>
                    <span
                      className={`whitespace-nowrap ${
                        current
                          ? "font-semibold text-accent"
                          : "text-ink-muted/70"
                      }`}
                    >
                      {step.tail}
                    </span>
                  </>
                ) : null}
              </p>

              {/* nowrap, and let the pill overhang its column a little on a
                  narrow screen: the rungs either side are empty at this height. */}
              {current ? (
                <span className="mt-3.5 inline-flex items-center whitespace-nowrap rounded-full bg-accent px-3 py-1.5 text-[9.5px] font-semibold uppercase leading-none tracking-[0.09em] text-white shadow-[0_8px_20px_-10px_rgba(10,120,200,0.7)] sm:px-3.5 sm:text-[10.5px] sm:tracking-[0.12em]">
                  {now}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** A rung's price, in the visitor's currency. */
function TierPrice({ index }: { index: number }) {
  return <PerRegion render={(region) => PRICE_LADDER[region][index].price} />;
}

/** What that rung adds to the price on sale now, in the visitor's currency. */
function TierDelta({ index }: { index: number }) {
  return <PerRegion render={(region) => PRICE_LADDER[region][index].delta} />;
}

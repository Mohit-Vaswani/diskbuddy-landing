import { CAPABILITIES, OFFLINE_PROMISE } from "./site-data";
import { ShieldIcon } from "./icons";

/**
 * The trust row directly under the hero screenshot. It leads with the offline
 * promise, because "will this thing read my whole drive and phone home?" is the
 * question standing between a visitor and the download button.
 */
export function Capabilities() {
  return (
    <section className="border-y border-line-soft bg-paper-deep/40">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-[13px] border border-line bg-surface text-accent shadow-[0_1px_2px_rgba(15,14,13,0.04)]">
            <ShieldIcon className="h-[21px] w-[21px]" />
          </span>
          <h2 className="display mt-5 text-[clamp(1.35rem,3vw,1.75rem)] text-balance">
            {OFFLINE_PROMISE.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-[1.65] text-ink-soft text-pretty">
            {OFFLINE_PROMISE.body}
          </p>
        </div>

        <p className="mt-12 text-center text-[12.5px] text-ink-muted">
          Built for the way macOS actually stores things
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
          {CAPABILITIES.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[12.5px] text-ink-soft"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

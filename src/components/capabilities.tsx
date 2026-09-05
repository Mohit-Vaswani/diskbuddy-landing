import { CAPABILITIES } from "./site-data";

/** The quiet trust row that sits directly under the hero screenshot. */
export function Capabilities() {
  return (
    <section className="border-y border-line-soft bg-paper-deep/40">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <p className="text-center text-[12.5px] text-ink-muted">
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

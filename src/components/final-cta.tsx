import { BuyButton, DownloadButton } from "./ui";
import { Price } from "./region";

export function FinalCta() {
  return (
    <section
      id="download"
      className="relative scroll-mt-24 overflow-hidden border-t border-line-soft bg-paper-deep/40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,122,26,0.24),rgba(255,168,96,0.14)_45%,transparent_72%)] blur-[70px]"
      />

      <div className="relative mx-auto max-w-2xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="display text-[clamp(2.1rem,4.6vw,3.2rem)] text-balance">
          Find out where
          <br className="hidden sm:block" /> your disk actually went.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15.5px] leading-[1.62] text-ink-soft text-pretty">
          One scan, and the folder quietly holding thirty gigabytes stops being
          a mystery.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <BuyButton className="px-6 py-3 text-[14px]" />
            <DownloadButton className="px-6 py-3 text-[14px]" />
          </div>
          <p className="text-[12.5px] text-ink-muted">
            <Price /> once · macOS 14 or later · Apple silicon &amp; Intel
          </p>
        </div>
      </div>
    </section>
  );
}

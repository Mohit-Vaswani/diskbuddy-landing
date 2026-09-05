"use client";

import Image from "next/image";
import { useState } from "react";
import { VIEWS } from "./site-data";
import { SectionHeading } from "./ui";

export function ViewsGallery() {
  const [active, setActive] = useState<(typeof VIEWS)[number]["id"]>(
    VIEWS[0].id,
  );
  const current = VIEWS.find((view) => view.id === active)!;

  return (
    <section
      id="views"
      className="scroll-mt-24 border-y border-line-soft bg-paper-deep/40"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="One scan, eight readings"
          title="The same data, whichever way you think."
          lede="Some people find the big folder by area, some by ranking, some by date. DiskBuddy scans once and renders it eight ways - switching is instant, no re-scan."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[236px_1fr] lg:gap-10">
          {/* Rail of view names, doubling as the caption for each. */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Visualisations"
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {VIEWS.map((view) => {
              const selected = view.id === active;
              return (
                <button
                  key={view.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="views-panel"
                  onClick={() => setActive(view.id)}
                  className={`shrink-0 rounded-xl border px-4 py-3 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:w-full ${
                    selected
                      ? "border-ink/15 bg-surface shadow-[0_8px_24px_-18px_rgba(15,14,13,0.5)]"
                      : "border-transparent hover:bg-surface/60"
                  }`}
                >
                  <span
                    className={`block text-[14px] font-medium tracking-[-0.015em] ${
                      selected ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {view.name}
                  </span>
                  <span
                    className={`mt-0.5 hidden text-[12px] leading-snug lg:block ${
                      selected ? "text-ink-muted" : "text-ink-muted/70"
                    }`}
                  >
                    {view.caption}
                  </span>
                </button>
              );
            })}
          </div>

          <figure
            id="views-panel"
            className="self-start overflow-hidden rounded-[14px] border border-line bg-surface shadow-[0_1px_2px_rgba(15,14,13,0.05),0_28px_60px_-40px_rgba(15,14,13,0.45)]"
          >
            <div className="flex items-center gap-1.5 border-b border-line-soft bg-paper-deep/70 px-3.5 py-2.5">
              <span className="h-[9px] w-[9px] rounded-full bg-dot-red" />
              <span className="h-[9px] w-[9px] rounded-full bg-dot-amber" />
              <span className="h-[9px] w-[9px] rounded-full bg-dot-green" />
              <figcaption className="ml-2 text-[12px] text-ink-muted">
                {current.name}
              </figcaption>
            </div>
            <div className="relative aspect-[2940/1846]">
              {VIEWS.map((view) => (
                <Image
                  key={view.id}
                  src={view.src}
                  alt={view.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className={`object-cover transition-opacity duration-500 ${
                    view.id === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

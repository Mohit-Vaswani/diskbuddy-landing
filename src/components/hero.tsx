"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { HERO_ROTATE_MS, HERO_VIEWS, VIEWS } from "./site-data";
import { BuyButton, DownloadButton } from "./ui";
import { AppleIcon } from "./icons";
import { Price } from "./region";

const TABS = HERO_VIEWS.map(
  (id) => VIEWS.find((view) => view.id === id)!,
);

export function Hero() {
  const [index, setIndex] = useState(0);
  /** Autoplay runs until you pick a tab yourself; hovering just pauses it. */
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);

  const current = TABS[index];
  const running = autoplay && !paused;

  // Motion-averse visitors get a static hero — no rotation, no fill sweep.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAutoplay(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setIndex((i) => (i + 1) % TABS.length),
      HERO_ROTATE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [running, index]);

  const select = useCallback((i: number) => {
    setIndex(i);
    setAutoplay(false);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Orange wash behind the hero — a wide bed of accent light whose core
          sits under the screenshot, so the window reads as lit from behind
          rather than pasted onto white. Spans the whole section; the section
          clips it, so the 165vw width never opens a scrollbar. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[210px] h-[1020px] w-[min(2200px,165vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,122,26,0.34),rgba(255,146,62,0.24)_34%,rgba(255,180,124,0.15)_56%,transparent_74%)] blur-[90px]" />
        <div className="absolute left-[4%] top-[430px] h-[520px] w-[min(680px,52vw)] rounded-full bg-[radial-gradient(circle,rgba(255,152,64,0.28),transparent_70%)] blur-[80px]" />
        <div className="absolute right-[2%] top-[380px] h-[520px] w-[min(680px,52vw)] rounded-full bg-[radial-gradient(circle,rgba(255,118,28,0.28),transparent_70%)] blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
        <div className="text-center">
          <p className="rise mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[12.5px] text-ink-soft backdrop-blur-sm">
            <AppleIcon className="h-3.5 w-3.5 opacity-70" />
            Native for macOS · Apple silicon &amp; Intel
          </p>

          {/* Sized off the viewport so the line never wraps, down to 320px. */}
          <h1 className="display rise whitespace-nowrap text-[clamp(1.35rem,5.6vw,4.3rem)] [animation-delay:60ms]">
            Visualize your Mac Storage
          </h1>

          <p className="rise mx-auto mt-7 max-w-xl text-[16.5px] leading-[1.62] text-ink-soft text-pretty [animation-delay:120ms]">
            DiskBuddy scans your drive in seconds and maps it eight different
            ways — so the 34 GB you forgot about stops hiding three folders
            deep.
          </p>

          <div className="rise mt-9 flex flex-col items-center gap-3.5 [animation-delay:180ms]">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <BuyButton className="px-6 py-3 text-[14px]" />
              <DownloadButton className="px-6 py-3 text-[14px]" />
            </div>
            <p className="text-[12.5px] text-ink-muted">
              <Price /> once · macOS 14 or later · No subscription
            </p>
          </div>
        </div>

        {/* ---- View switcher ------------------------------------------- */}
        <div
          role="tablist"
          aria-label="Choose a visualisation"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="rise mt-14 flex flex-wrap items-center justify-center gap-2 [animation-delay:240ms]"
        >
          {TABS.map((tab, i) => {
            const selected = i === index;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="hero-screenshot"
                onClick={() => select(i)}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-[-0.01em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected
                    ? "border-ink bg-ink text-paper shadow-[0_6px_16px_-8px_rgba(15,14,13,0.6)]"
                    : "border-line bg-surface/70 text-ink-soft backdrop-blur-sm hover:border-ink/25 hover:text-ink"
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        <p
          className="mt-4 text-center text-[13px] text-ink-muted"
          aria-live="polite"
        >
          {current.caption}
        </p>

        {/* ---- Screenshot ---------------------------------------------- */}
        <div
          id="hero-screenshot"
          className="rise mt-9 [perspective:2200px] [animation-delay:300ms]"
        >
          <figure className="mx-auto max-w-5xl overflow-hidden rounded-[16px] border border-line bg-surface shadow-[0_2px_4px_rgba(15,14,13,0.04),0_40px_80px_-40px_rgba(15,14,13,0.45)] [transform:rotateX(4deg)] [transform-origin:top_center]">
            <div className="flex items-center gap-1.5 border-b border-line-soft bg-paper-deep/70 px-4 py-2.5">
              <span className="h-[9px] w-[9px] rounded-full bg-dot-red" />
              <span className="h-[9px] w-[9px] rounded-full bg-dot-amber" />
              <span className="h-[9px] w-[9px] rounded-full bg-dot-green" />
            </div>

            {/* All four are mounted and cross-faded so switching a tab never
                shows a loading gap or shifts the layout. */}
            <div className="relative aspect-[2940/1846]">
              {TABS.map((tab, i) => (
                <Image
                  key={tab.id}
                  src={tab.src}
                  alt={tab.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1100px) 100vw, 1024px"
                  className={`object-cover transition-opacity duration-500 ${
                    i === index ? "opacity-100" : "opacity-0"
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

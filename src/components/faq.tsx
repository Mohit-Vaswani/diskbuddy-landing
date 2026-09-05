"use client";

import { useState } from "react";
import { FAQ_GROUPS } from "./site-data";
import { SectionHeading } from "./ui";
import { ChevronIcon } from "./icons";
import { withPrice } from "./region";
import { SUPPORT_EMAIL } from "@/lib/product";

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line-soft">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-4 text-left transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="text-[14.5px] font-medium tracking-[-0.012em]">
          {q}
        </span>
        <ChevronIcon
          className={`h-4 w-4 shrink-0 text-ink-muted transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Grid-rows trick: animates to the answer's real height without
          measuring it in JS. */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-10 text-[14px] leading-[1.68] text-ink-soft text-pretty">
            {withPrice(a)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section
      id="faq"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
    >
      <SectionHeading
        title="Frequently asked questions"
        lede="Quick answers about scanning, safety, and what DiskBuddy does with your data."
      />

      <div className="mx-auto mt-14 max-w-2xl space-y-12">
        {FAQ_GROUPS.map((group) => (
          <div key={group.heading}>
            <h3 className="mb-2 text-center text-[13.5px] font-semibold tracking-[-0.01em]">
              {group.heading}
            </h3>
            <div>
              {group.items.map((item) => (
                <Item key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-[13px] text-ink-muted">
        Still stuck?{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent"
        >
          Email the team
        </a>
        .
      </p>
    </section>
  );
}

import Image from "next/image";
import { FEATURES, type Feature } from "./site-data";
import { SectionHeading } from "./ui";
import {
  AppsIcon,
  BoltIcon,
  BroomIcon,
  CalendarIcon,
  DuplicateIcon,
  SnapshotIcon,
} from "./icons";

const ICONS = {
  duplicate: DuplicateIcon,
  apps: AppsIcon,
  calendar: CalendarIcon,
  snapshot: SnapshotIcon,
  broom: BroomIcon,
  bolt: BoltIcon,
} as const;

const SPANS = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  6: "lg:col-span-6",
} as const;

function IconChip({ feature }: { feature: Feature }) {
  const Icon = ICONS[feature.icon];
  return (
    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-line bg-paper text-accent">
      <Icon />
    </span>
  );
}

const CARD =
  "group relative overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:border-ink/15 hover:shadow-[0_16px_40px_-28px_rgba(15,14,13,0.4)]";

/** The full-width closing card — icon and copy side by side, no screenshot. */
function WideCard({ feature }: { feature: Feature }) {
  return (
    <article className={`${CARD} ${SPANS[6]} flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8`}>
      <IconChip feature={feature} />
      <div className="sm:flex sm:flex-1 sm:items-baseline sm:gap-8">
        <h3 className="shrink-0 text-[16.5px] font-semibold tracking-[-0.018em] sm:w-64">
          {feature.title}
        </h3>
        <p className="mt-2.5 text-[14px] leading-[1.65] text-ink-soft text-pretty sm:mt-0">
          {feature.body}
        </p>
      </div>
    </article>
  );
}

function Card({ feature }: { feature: Feature }) {
  return (
    <article className={`${CARD} ${SPANS[feature.span]} flex flex-col`}>
      {feature.image ? (
        // A miniature of the window frame used elsewhere on the page, so the
        // whole app is legible in the card rather than an arbitrary crop.
        <div className="border-b border-line-soft bg-paper-deep/60 p-5 pb-0 sm:p-6 sm:pb-0">
          <div className="overflow-hidden rounded-t-lg border border-b-0 border-line bg-surface shadow-[0_-1px_0_rgba(255,255,255,0.6)_inset,0_18px_36px_-26px_rgba(15,14,13,0.5)]">
            <div className="flex items-center gap-1 border-b border-line-soft bg-paper-deep/70 px-2.5 py-1.5">
              <span className="h-[6px] w-[6px] rounded-full bg-dot-red" />
              <span className="h-[6px] w-[6px] rounded-full bg-dot-amber" />
              <span className="h-[6px] w-[6px] rounded-full bg-dot-green" />
            </div>
            <Image
              src={feature.image.src}
              alt={feature.image.alt}
              width={2940}
              height={1846}
              sizes="(max-width: 1024px) 100vw, 520px"
              className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
            />
          </div>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <IconChip feature={feature} />
        <h3 className="mt-5 text-[16.5px] font-semibold tracking-[-0.018em]">
          {feature.title}
        </h3>
        <p className="mt-2.5 text-[14px] leading-[1.65] text-ink-soft text-pretty">
          {feature.body}
        </p>
      </div>
    </article>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-28"
    >
      <SectionHeading
        eyebrow="What it does"
        title="Reclaiming space shouldn't be guesswork."
        lede="Find the weight, understand why it's there, and clear it without wondering what you just deleted."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-6">
        {FEATURES.map((feature) =>
          feature.span === 6 ? (
            <WideCard key={feature.title} feature={feature} />
          ) : (
            <Card key={feature.title} feature={feature} />
          ),
        )}
      </div>
    </section>
  );
}

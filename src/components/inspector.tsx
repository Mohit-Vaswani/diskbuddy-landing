import { MacWindow } from "./ui";
import { ArrowIcon } from "./icons";

type Row = {
  eyebrow: string;
  title: string;
  lede: string;
  points: { title: string; body: string }[];
  image: { src: string; alt: string };
  /** Screenshot on the left instead of the right. */
  flipped?: boolean;
};

const ROWS: Row[] = [
  {
    eyebrow: "The inspector",
    title: "Click anything. Learn everything about it.",
    lede:
      "The right-hand panel follows your selection everywhere - through the treemap, the folder grid, the ranked list. It answers the question you actually have: is this safe to delete?",
    points: [
      {
        title: "Size on disk, not just size",
        body: "Logical size, real size on disk, and exactly how many gigabytes APFS compression is saving you, three numbers most tools collapse into one.",
      },
      {
        title: "Largest inside, always ranked",
        body: "Select any folder and the ten heaviest things within it appear immediately, weighted bars and all. Drill until you hit the actual file.",
      },
      {
        title: "Reveal, Quick Look, Focus",
        body: "Jump to Finder, peek at the contents without opening an app, or re-root the whole visualisation on the selection and keep digging.",
      },
    ],
    image: {
      src: "/screens/folders.jpeg",
      alt: "DiskBuddy folder grid with the inspector panel open on Documents, showing size on disk, compression savings and the largest items inside.",
    },
  },
  {
    eyebrow: "Monitor",
    title: "Watch the machine while you clean it.",
    lede:
      "Freeing space is only half the story. The Monitor tab keeps CPU, memory, network and free space in view, with the processes actually doing the work ranked underneath.",
    points: [
      {
        title: "Free space, live",
        body: "The storage meter updates as you empty things out, so you can see the drive recover instead of re-checking Finder.",
      },
      {
        title: "Find the process, not just the file",
        body: "When something is quietly writing gigabytes, the ranked process list tells you which app to go and quit.",
      },
    ],
    image: {
      src: "/screens/monitor.png",
      alt: "DiskBuddy Monitor tab showing live CPU, memory, network and storage panels above a ranked process list.",
    },
    flipped: true,
  },
];

function DeepDiveRow({ row }: { row: Row }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className={row.flipped ? "lg:order-2" : undefined}>
        <p className="eyebrow mb-4">{row.eyebrow}</p>
        <h2 className="display text-[clamp(1.9rem,3.8vw,2.75rem)] text-balance">
          {row.title}
        </h2>
        <p className="mt-5 text-[15.5px] leading-[1.65] text-ink-soft text-pretty">
          {row.lede}
        </p>

        <dl className="mt-9 space-y-7">
          {row.points.map((point) => (
            <div key={point.title} className="flex gap-3.5">
              <span className="mt-[3px] shrink-0 text-accent">
                <ArrowIcon className="h-[17px] w-[17px]" />
              </span>
              <div>
                <dt className="text-[14.5px] font-semibold tracking-[-0.015em]">
                  {point.title}
                </dt>
                <dd className="mt-1.5 text-[14px] leading-[1.65] text-ink-soft text-pretty">
                  {point.body}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <MacWindow
        src={row.image.src}
        alt={row.image.alt}
        sizes="(max-width: 1024px) 100vw, 560px"
        className={row.flipped ? "lg:order-1 lg:-rotate-[0.4deg]" : "lg:rotate-[0.4deg]"}
      />
    </div>
  );
}

export function Inspector() {
  return (
    <section className="mx-auto max-w-6xl space-y-24 px-5 py-20 sm:px-8 sm:py-28 sm:space-y-32">
      {ROWS.map((row) => (
        <DeepDiveRow key={row.eyebrow} row={row} />
      ))}
    </section>
  );
}

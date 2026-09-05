/** Every string on the page lives here so copy edits never touch layout code. */

import { SEATS, SUPPORT_EMAIL } from "@/lib/product";

export const VIEWS = [
  {
    id: "treemap",
    name: "Treemap",
    caption: "Every file as a rectangle, sized by bytes",
    src: "/screens/treemap.jpeg",
    alt: "DiskBuddy treemap view showing a 119 GB home folder broken into nested coloured rectangles.",
  },
  {
    id: "folders",
    name: "Folders",
    caption: "Browse folder by folder, sized as you go",
    src: "/screens/folders.jpeg",
    alt: "DiskBuddy folder grid showing Library, Downloads and Documents as pastel folder cards with sizes.",
  },
  {
    id: "sunburst",
    name: "Sunburst",
    caption: "Rings radiating out from the scan root",
    src: "/screens/sunburst.png",
    alt: "DiskBuddy sunburst chart with concentric rings representing folder depth.",
  },
  {
    id: "flame",
    name: "Flame",
    caption: "Depth top to bottom, size left to right",
    src: "/screens/flame.png",
    alt: "DiskBuddy flame graph stacking folder depth from the scan root downward.",
  },
  {
    id: "bubbles",
    name: "Bubbles",
    caption: "Nested bubbles, one per folder",
    src: "/screens/bubbles.png",
    alt: "DiskBuddy bubble chart with nested circles for each folder in the home directory.",
  },
  {
    id: "mindmap",
    name: "Mind Map",
    caption: "Branches from the root, sized by weight",
    src: "/screens/mindmap.png",
    alt: "DiskBuddy mind map radiating labelled branches from a central 118 GB node.",
  },
  {
    id: "top-sizes",
    name: "Top Sizes",
    caption: "The biggest items, ranked",
    src: "/screens/top-sizes.png",
    alt: "DiskBuddy ranked list of the largest folders with file counts and percentage of scan.",
  },
  {
    id: "age-map",
    name: "Age Map",
    caption: "Where your bytes sit on a timeline",
    src: "/screens/age-map.png",
    alt: "DiskBuddy age map with a bytes-by-age breakdown and a last-modified month heatmap.",
  },
] as const;

/** The four views promoted to the hero switcher. */
export const HERO_VIEWS = ["treemap", "folders", "mindmap", "bubbles"] as const;

/** How long each hero view holds before the switcher advances, in ms. */
export const HERO_ROTATE_MS = 3000;

export const CAPABILITIES = [
  "Apple silicon & Intel",
  "APFS aware",
  "External volumes",
  "Time Machine snapshots",
  "Sandboxed",
  "No account required",
];

export type Feature = {
  title: string;
  body: string;
  icon: "duplicate" | "apps" | "calendar" | "snapshot" | "broom" | "bolt";
  image?: { src: string; alt: string };
  /** Columns to occupy in the 6-column feature grid. */
  span: 2 | 3 | 6;
};

export const FEATURES: Feature[] = [
  {
    title: "Uninstall apps and their leftovers",
    body:
      "Every app is listed with its true footprint — bundle plus the caches, preferences, HTTP storage and logs it scattered across your Library. Uninstall Completely takes the whole set, not just the icon you dragged to the Trash.",
    icon: "apps",
    span: 3,
    image: {
      src: "/screens/applications.png",
      alt: "DiskBuddy Applications tab showing Xcode's 4.03 GB footprint and its fourteen associated support files.",
    },
  },
  {
    title: "Find what's old, not just what's big",
    body:
      "The Age Map splits your bytes by last-modified date and surfaces Big & Untouched — large files you haven't opened in over a year. Stage the whole set for cleanup in one click.",
    icon: "calendar",
    span: 3,
    image: {
      src: "/screens/age-map.png",
      alt: "DiskBuddy Age Map with a bytes-by-age chart and a Big & Untouched list of files older than a year.",
    },
  },
  {
    title: "Duplicates, by content",
    body:
      "Byte-for-byte matching finds real duplicates across every folder you scan — not just files that happen to share a name.",
    icon: "duplicate",
    span: 2,
  },
  {
    title: "Quick Wins, ready on arrival",
    body:
      "Downloads, caches and logs, iOS Simulators, node_modules, build artifacts and Xcode DerivedData are totalled the moment a scan lands.",
    icon: "bolt",
    span: 2,
  },
  {
    title: "Snapshots you can compare",
    body:
      "Keep the result of a past scan and hold it against today's to see exactly which folders grew while you weren't looking.",
    icon: "snapshot",
    span: 2,
  },
  {
    title: "Nothing leaves without you",
    body:
      "Items go to a staged cleanup list first. You review the whole set, then decide — DiskBuddy never deletes in the background.",
    icon: "broom",
    span: 6,
  },
];

export const FAQ_GROUPS = [
  {
    heading: "General",
    items: [
      {
        q: "What does DiskBuddy actually do?",
        a: "It scans a drive or folder and maps every byte, then gives you eight ways to look at the result — treemap, folders, sunburst, flame, bubbles, mind map, top sizes and age map. From there you can inspect anything, reveal it in Finder, Quick Look it, or stage it for cleanup.",
      },
      {
        q: "How fast is a scan?",
        a: "A 118 GB home folder holding roughly two million files takes about ten seconds on Apple silicon. Scanning is incremental, so the visualisations start filling in while the walk is still running.",
      },
      {
        q: "Can I scan external and network drives?",
        a: "Yes. Scan your full Mac, your home folder, or point DiskBuddy at any folder or mounted volume — external SSDs and network shares included.",
      },
      {
        q: "What does the inspector tell me?",
        a: "For any selection: size on disk versus logical size, how much APFS compression saved you, file and folder counts, its share of the parent, created and modified dates, and a ranked list of the largest things inside.",
      },
    ],
  },
  {
    heading: "Privacy & safety",
    items: [
      {
        q: "Does DiskBuddy send anything off my Mac?",
        a: "No. Scanning, hashing and duplicate matching all happen locally. There's no account, no sync, and no analytics pipeline — the app has no reason to talk to a server.",
      },
      {
        q: "Can it delete something I still need?",
        a: "Not on its own. Add to Cleanup stages an item on a list you review before anything is removed, and system-critical paths are excluded from staging in the first place.",
      },
      {
        q: "What are Snapshots for?",
        a: "Snapshots keep the result of a past scan so you can compare it against today's and see exactly which folders grew — useful when a drive fills up and you want to know what changed.",
      },
    ],
  },
  {
    heading: "Buying & licensing",
    items: [
      {
        q: "How much is it?",
        // `{price}` is swapped for the visitor's currency when rendered.
        a: "{price}, paid once. There is no subscription and no account to make — you get a licence key, and every 1.x update is included.",
      },
      {
        q: "How do I activate it?",
        a: "Buy, and your key appears on screen straight after checkout as well as in your email. Open DiskBuddy, paste the key into the first screen, press Activate, and you are done.",
      },
      {
        q: "How many Macs does one key cover?",
        a:
          SEATS === 1
            ? "One at a time. If you move to a new Mac, open Settings on the old one and choose Deactivate This Mac — that frees the key to activate somewhere else."
            : `Up to ${SEATS}. Settings has a Deactivate This Mac button when you need to move a seat.`,
      },
      {
        q: "Does it need to be online?",
        a: "Only to activate. After that DiskBuddy re-checks the key in the background when it can, and keeps working for two weeks without ever reaching the internet — so a flight or a bad café Wi-Fi never locks you out.",
      },
      {
        q: "I lost my key.",
        a: `Email ${SUPPORT_EMAIL} from the address you bought with and we will send it again.`,
      },
    ],
  },
] as const;

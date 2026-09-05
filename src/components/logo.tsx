/**
 * The wordmark. The glyph echoes the storage donut in DiskBuddy's sidebar —
 * an almost-full ring, deliberately left open at the top-right.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle
          cx="10"
          cy="10"
          r="7.25"
          stroke="var(--line)"
          strokeWidth="2.6"
        />
        <path
          d="M10 2.75a7.25 7.25 0 1 1-5.13 12.37"
          stroke="var(--accent)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="10" cy="10" r="1.9" fill="var(--ink)" />
      </svg>
      <span className="text-[15px] font-semibold tracking-[-0.02em]">
        DiskBuddy
      </span>
    </span>
  );
}

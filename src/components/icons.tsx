type IconProps = { className?: string };

const base = "h-[18px] w-[18px]";

/** Stroke icons, 24px grid, matching the app's toolbar weight. */

export function TreemapIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <rect x="3" y="3" width="10" height="11" rx="1.5" />
        <rect x="15" y="3" width="6" height="6" rx="1.5" />
        <rect x="15" y="11" width="6" height="10" rx="1.5" />
        <rect x="3" y="16" width="10" height="5" rx="1.5" />
      </g>
    </svg>
  );
}

export function SunburstIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.9 2.9M15.5 15.5l2.9 2.9M18.4 5.6l-2.9 2.9M8.5 15.5l-2.9 2.9" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function BubblesIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6">
        <circle cx="9" cy="10" r="5.5" />
        <circle cx="17.5" cy="7" r="3" />
        <circle cx="16.5" cy="16.5" r="4" />
      </g>
    </svg>
  );
}

export function CalendarIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
      </g>
    </svg>
  );
}

export function DuplicateIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="12" height="12" rx="2" />
        <path d="M8.5 20.5h10a2 2 0 0 0 2-2v-10" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function AppsIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
        <path d="M9 12h6M12 9v6" />
      </g>
    </svg>
  );
}

export function SnapshotIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1" />
        <path d="M20.5 3.5V9H15" strokeLinejoin="round" />
        <path d="M12 7.5V12l3 2" />
      </g>
    </svg>
  );
}

export function BroomIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20.5c2.5-1.2 3.4-3.4 3.4-6.1h6.9c0 2.7.9 4.9 3.4 6.1z" />
        <path d="M10.8 14.4 14.3 4a2 2 0 0 1 3.8 1.3l-3 9.1" />
      </g>
    </svg>
  );
}

export function BoltIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M13.5 2.5 4.8 13.2a.6.6 0 0 0 .47.98H11l-.5 7.32 8.7-10.7a.6.6 0 0 0-.47-.98H13z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AppleIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.4 12.7c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.6-1.9-1.5-.2-3 .9-3.7.9s-2-.9-3.2-.8c-1.7 0-3.2 1-4 2.5-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8s1.9.8 3.2.7c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.4-.9-2.4-3.9zM14.1 5.3c.7-.8 1.1-1.9 1-3-1 0-2.2.6-2.9 1.5-.6.7-1.2 1.9-1 3 1.1 0 2.2-.6 2.9-1.5z" />
    </svg>
  );
}

export function ChevronIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

import Link from "next/link";
import { Logo } from "./logo";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#views", label: "Views" },
  { href: "#faq", label: "FAQ" },
  { href: "#download", label: "Download" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            href="https://x.com"
            aria-label="DiskBuddy on X"
            className="text-ink-muted transition-colors hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M17.3 3h3.3l-7.2 8.3L22 21h-6.7l-5.2-6.8L4.1 21H.8l7.7-8.8L.4 3h6.8l4.7 6.2zm-1.2 16h1.8L7.9 4.8H6z" />
            </svg>
          </Link>
        </div>

        <div className="rule-dotted my-7" />

        <div className="flex flex-col-reverse items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-[12.5px] text-ink-muted">
            © {new Date().getFullYear()} DiskBuddy
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12.5px] text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

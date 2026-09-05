"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DMG_FILE, DMG_PATH, SUPPORT_EMAIL } from "@/lib/product";
import { AppleIcon } from "@/components/icons";
import { Button } from "@/components/ui";

const STEPS = [
  "Open the DMG and drag DiskBuddy to Applications.",
  "Launch it. The first screen asks for a licence key.",
  "Paste the key above and press Activate. That is it.",
];

export function ThanksContent() {
  const params = useSearchParams();
  // Dodo appends these to redirect_url once checkout finishes.
  const status = params.get("status");
  const licenseKey = params.get("license_key");
  const email = params.get("email");

  const failed = status !== null && status !== "succeeded" && status !== "active";

  if (failed) {
    return (
      <Shell title="That payment didn't go through">
        <p className="mt-5 text-[15px] leading-[1.65] text-ink-soft">
          Nothing was charged. Head back to the pricing card and try again, or
          email us and we will sort it out with you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/#pricing">Back to pricing</Button>
          <Button href={`mailto:${SUPPORT_EMAIL}`} variant="ghost">
            Email support
          </Button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell title="You're in. Thank you.">
      <p className="mt-5 text-[15px] leading-[1.65] text-ink-soft">
        {email
          ? `A copy of your licence key is on its way to ${email}.`
          : "A copy of your licence key is on its way to your inbox."}
      </p>

      {licenseKey ? (
        <KeyBox value={licenseKey} />
      ) : (
        <p className="mt-7 rounded-[12px] border border-line bg-paper-deep/50 px-5 py-4 text-[13.5px] leading-[1.6] text-ink-soft">
          Your key is in the confirmation email - it usually lands within a
          minute. If it hasn&apos;t shown up, check spam, then email{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-accent underline underline-offset-2"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      )}

      <div className="mt-8">
        <Button
          href={DMG_PATH}
          download={DMG_FILE}
          className="px-6 py-3 text-[14px]"
        >
          <AppleIcon className="h-[15px] w-[15px] -mt-px opacity-90" />
          Download DiskBuddy
        </Button>
      </div>

      <ol className="mx-auto mt-12 max-w-sm space-y-3.5 text-left">
        {STEPS.map((step, i) => (
          <li key={step} className="flex gap-3.5">
            <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-[12px] font-medium text-ink-soft">
              {i + 1}
            </span>
            <span className="text-[14px] leading-[1.55] text-ink-soft">
              {step}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-12 text-[12.5px] text-ink-muted">
        Anything at all -{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-accent underline underline-offset-2"
        >
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
    </Shell>
  );
}

/** The key, big and selectable, with a copy button that confirms itself. */
function KeyBox({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard denied (insecure context, or the user said no). The key is
      // still right there to select by hand, so there is nothing to report.
    }
  };

  return (
    <div className="mt-7">
      <p className="eyebrow mb-3">Your licence key</p>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row">
        <code className="flex-1 select-all rounded-[11px] border border-line bg-paper-deep/60 px-4 py-3.5 font-mono text-[14px] tracking-[0.02em] text-ink">
          {value}
        </code>
        <button
          type="button"
          onClick={copy}
          className="rounded-[11px] border border-line bg-surface px-5 py-3.5 text-[13.5px] font-medium text-ink transition-colors hover:border-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-28"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function Shell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="grain relative flex min-h-screen flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[min(1400px,140vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(56,170,248,0.26),rgba(120,200,252,0.14)_44%,transparent_72%)] blur-[80px]"
      />

      <div className="relative mx-auto w-full max-w-lg px-5 py-20 text-center sm:px-8 sm:py-28">
        <Link
          href="/"
          className="text-[13px] text-ink-muted transition-colors hover:text-ink"
        >
          ← DiskBuddy
        </Link>
        <h1 className="display mt-8 text-[clamp(1.9rem,5vw,2.7rem)] text-balance">
          {title}
        </h1>
        {children}
      </div>
    </main>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { ThanksContent } from "./thanks-content";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your DiskBuddy licence key and download.",
  // Nothing here is worth indexing, and the URL can carry a licence key.
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-[14px] text-ink-muted">Loading your licence…</p>
        </main>
      }
    >
      <ThanksContent />
    </Suspense>
  );
}

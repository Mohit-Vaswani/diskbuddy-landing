import Image from "next/image";
import { TWEETS } from "./site-data";
import { SectionHeading } from "./ui";
import { VerifiedIcon, XIcon } from "./icons";

/**
 * Launch-thread replies, rendered as tweet cards rather than embedded via
 * X's widget script: the embed drags in third-party JS, ignores the site's
 * type, and lays out at its own width. Each card links back to the original
 * status so the quote stays checkable.
 */
function TweetCard({ tweet }: { tweet: (typeof TWEETS)[number] }) {
  return (
    <a
      href={`https://x.com/${tweet.handle}/status/${tweet.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group mb-5 flex break-inside-avoid flex-col rounded-[14px] border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(15,14,13,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_1px_2px_rgba(15,14,13,0.05),0_14px_28px_-20px_rgba(15,14,13,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="flex items-center gap-3">
        <Image
          src={tweet.avatar}
          alt=""
          width={80}
          height={80}
          sizes="40px"
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate text-[13.5px] font-semibold tracking-[-0.012em]">
              {tweet.name}
            </span>
            <VerifiedIcon className="h-[14px] w-[14px] shrink-0 text-accent-bright" />
          </div>
          <span className="block truncate text-[12.5px] text-ink-muted">
            @{tweet.handle}
          </span>
        </div>
        <XIcon className="h-[15px] w-[15px] shrink-0 text-ink-muted transition-colors group-hover:text-ink" />
      </div>

      <p className="mt-3.5 text-[14.5px] leading-[1.6] text-ink text-pretty">
        {tweet.text}
      </p>

      <span className="mt-3 text-[12px] text-ink-muted">{tweet.date}</span>
    </a>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-y border-line-soft bg-paper-deep/40"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="From the launch thread"
          title="What people are saying"
          lede="DiskBuddy went up on X and the replies started coming in. Every card links to the original tweet."
        />

        {/* CSS columns rather than a grid: the cards are uneven heights and
            masonry keeps the last row from leaving a hole. */}
        <div className="mx-auto mt-14 max-w-5xl columns-1 gap-5 sm:columns-2 lg:columns-3">
          {TWEETS.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </div>
    </section>
  );
}

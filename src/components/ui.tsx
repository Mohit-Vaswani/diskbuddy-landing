import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { AppleIcon } from "./icons";
import { DMG_FILE, DMG_PATH } from "@/lib/product";
import { PerRegion } from "./region";

/* -------------------------------------------------------------- Buttons */

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "solid" | "ghost";
};

/** Shared so the plain-anchor buy button looks identical to the Link one. */
function buttonClass(variant: "solid" | "ghost", className: string) {
  const styles =
    variant === "solid"
      ? "bg-accent text-white shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_8px_20px_-8px_rgba(10,120,200,0.55)] hover:bg-[#0862a5] active:translate-y-px"
      : "bg-surface/80 text-ink border border-line hover:border-ink/25 hover:bg-surface";

  return `group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-medium tracking-[-0.01em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${styles} ${className}`;
}

export function Button({
  variant = "solid",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
    </Link>
  );
}

export function DownloadButton({
  className = "",
  label = "Download for Mac",
  variant = "ghost",
}: {
  className?: string;
  label?: string;
  variant?: "solid" | "ghost";
}) {
  return (
    <Button
      href={DMG_PATH}
      download={DMG_FILE}
      variant={variant}
      className={className}
    >
      <AppleIcon className="h-[15px] w-[15px] -mt-px opacity-90" />
      {label}
    </Button>
  );
}

/**
 * Sends the visitor to Dodo's hosted checkout by way of /api/checkout, which
 * attaches the DataFast visitor cookie to the payment before handing off. It is
 * a full navigation rather than a popup so the payment page owns the whole
 * viewport on mobile.
 *
 * A plain <a>, deliberately: next/link would prefetch this route and mint a
 * checkout session for every button that merely scrolled into view. `nofollow`
 * keeps crawlers from doing the same.
 *
 * One button is emitted per region, because a region may check out against its
 * own Dodo product, and CSS shows only the visitor's.
 */
export function BuyButton({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <PerRegion
      render={(region) => (
        <a
          href={`/api/checkout?region=${region}`}
          rel="nofollow"
          className={buttonClass("solid", className)}
        >
          {label ?? "Buy DiskBuddy"}
        </a>
      )}
    />
  );
}

/* ------------------------------------------------------- Section heading */

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="display text-[clamp(2rem,4.2vw,3.05rem)] text-balance">
        {title}
      </h2>
      {lede ? (
        <p className="mt-5 text-[15.5px] leading-[1.65] text-ink-soft text-pretty">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------ Mac window */

/**
 * Chrome around a screenshot. `priority` is passed through for the hero shot
 * so the largest-contentful image isn't lazy-loaded.
 */
export function MacWindow({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 1100px) 100vw, 1080px",
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[14px] border border-line bg-surface shadow-[0_1px_2px_rgba(15,14,13,0.05),0_18px_40px_-24px_rgba(15,14,13,0.35)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line-soft bg-paper-deep/70 px-3.5 py-2.5">
        <span className="h-[9px] w-[9px] rounded-full bg-dot-red" />
        <span className="h-[9px] w-[9px] rounded-full bg-dot-amber" />
        <span className="h-[9px] w-[9px] rounded-full bg-dot-green" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={2940}
        height={1846}
        priority={priority}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </figure>
  );
}

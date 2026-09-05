import Image from "next/image";

/**
 * The wordmark: the app's own icon beside the name.
 *
 * The icon is a full-bleed square with an almost-black ground and no alpha, so
 * it is rounded here to read as a macOS app icon rather than a dark block sat
 * on the paper. Shared by the header and the footer, so the mark is the same
 * in both.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo-mark.png"
        // The wordmark next to it already names the product, so the icon is
        // decorative and an alt would just be read out twice.
        alt=""
        width={26}
        height={26}
        priority
        className="shrink-0 rounded-[7px]"
      />
      <span className="text-[17px] font-semibold tracking-[-0.02em]">
        DiskBuddy
      </span>
    </span>
  );
}

import Image from "next/image";
import type { CSSProperties } from "react";

type Props = {
  /** Fixed aspect ratio, e.g. "7 / 8". Box size never depends on the image → zero layout shift. */
  ratio: string;
  /** Alt text. Also the accessible name of the placeholder until a real `src` is supplied. */
  alt: string;
  /** Short caption shown inside the placeholder. */
  label: string;
  /** Swap in the real image later; the wrapper keeps the exact same box. */
  src?: string;
  className?: string;
  rounded?: string;
  priority?: boolean;
};

export function ImageSlot({ ratio, alt, label, src, className = "", rounded = "rounded-[10px]", priority }: Props) {
  const style: CSSProperties = { aspectRatio: ratio };
  return (
    <div
      className={`relative w-full overflow-hidden ${rounded} ${className}`}
      style={style}
      {...(src ? {} : { role: "img", "aria-label": alt })}
      data-image-slot={src ? "filled" : "placeholder"}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" priority={priority} />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#e3f0ed_0_10px,#d6e9e5_10px_20px)] p-2 text-center text-[11px] font-semibold uppercase tracking-wide text-teal-800/70">
          {label}
        </div>
      )}
    </div>
  );
}

import Image from "next/image";
import { getSlot } from "@/config/site";
import { resolveImage } from "@/lib/images";

type Props = {
  /** Slot id from IMAGE_SLOTS in src/config/site.ts. */
  slot: string;
  className?: string;
  rounded?: string;
  priority?: boolean;
};

/**
 * Fixed-ratio box (width/height from the slot), so size never depends on the image => zero layout shift.
 * Shows public/images/<slot.file> if it exists at build time, else a dashed placeholder.
 */
export function ImageSlot({ slot, className = "", rounded = "rounded-[10px]", priority }: Props) {
  const def = getSlot(slot);
  const src = resolveImage(def.file);
  return (
    <div
      className={`relative w-full overflow-hidden ${rounded} ${className}`}
      style={{ aspectRatio: `${def.width} / ${def.height}` }}
      {...(src ? {} : { role: "img", "aria-label": def.alt })}
      data-image-slot={src ? "filled" : "placeholder"}
      data-slot-id={def.id}
    >
      {src ? (
        <Image src={src} alt={def.alt} fill sizes={def.sizes} quality={def.quality} className="object-cover" style={{ objectPosition: def.position }} priority={priority} />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#e3f0ed_0_10px,#d6e9e5_10px_20px)] p-2 text-center text-[11px] font-semibold uppercase tracking-wide text-teal-800/70">
          {def.label}
        </div>
      )}
    </div>
  );
}

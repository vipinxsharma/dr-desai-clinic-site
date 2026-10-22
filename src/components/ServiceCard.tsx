import type { Service } from "@/config/site";
import { ImageSlot } from "./ImageSlot";

/** Image-card variant keeps a fixed 175:68 image box; text-only variant has no image box. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-[10px] border border-line bg-white" data-service={service.slug}>
      {service.imageSlot && <ImageSlot slot={service.imageSlot} rounded="rounded-none" />}
      <h3 className={`px-4 text-[17px] font-bold leading-snug text-ink ${service.imageSlot ? "py-4" : "flex flex-1 items-center py-5"}`}>{service.name}</h3>
    </li>
  );
}

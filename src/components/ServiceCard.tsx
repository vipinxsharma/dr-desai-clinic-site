import { SERVICE_DESCRIPTIONS } from "@/config/service-descriptions";
import { SIZES_CARD_3, type Service } from "@/config/site";
import { ImageSlot } from "./ImageSlot";

/** Fixed 175:68 image box + title + one-sentence description. `cols={3}` is the Home featured grid. */
export function ServiceCard({ service, cols = 4 }: { service: Service; cols?: 3 | 4 }) {
  const description = SERVICE_DESCRIPTIONS[service.slug]?.description;
  return (
    <li className="fx-card flex flex-col overflow-hidden rounded-[10px] border border-line bg-white" data-service={service.slug}>
      {service.imageSlot && <ImageSlot slot={service.imageSlot} rounded="rounded-none" className="fx-img" sizes={cols === 3 ? SIZES_CARD_3 : undefined} />}
      <div className="flex flex-1 flex-col px-4 py-4">
        <h3 className="text-[17px] font-bold leading-snug text-ink lg:text-[18px]">{service.name}</h3>
        {description && <p className="mt-2 text-copy text-body">{description}</p>}
      </div>
    </li>
  );
}

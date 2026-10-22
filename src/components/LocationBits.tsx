import type { Location } from "@/config/site";
import { directionsHref, PLACEHOLDERS, telHref, waLocationHref } from "@/config/site";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";
import { Ph } from "./Ph";

/** Mon-Sat line, plus the Sunday line from config (placeholder / appointment note / nothing). */
export function Timings({ loc }: { loc: Location }) {
  return (
    <div className="text-[16px] leading-[1.7] text-body" data-timings={loc.slug}>
      <p>
        {loc.weekly.days}: {loc.weekly.text}
      </p>
      {loc.sunday.status === "unconfirmed" && (
        <p>
          Sunday: <Ph>{PLACEHOLDERS.sunday}</Ph>
        </p>
      )}
      {loc.sunday.status === "appointment" && <p>Sunday: {loc.sunday.text}</p>}
    </div>
  );
}

const btn = "inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-2 py-2.5 text-[15px] sm:gap-2 sm:px-4 sm:text-[16px] font-bold transition-colors";

/** Get Directions (maps search URL), Call (tel), Book on WhatsApp (prefilled with THIS location's name). */
export function LocationActions({ loc }: { loc: Location }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2" data-location-actions={loc.slug}>
      <a href={waLocationHref(loc)} target="_blank" rel="noopener noreferrer" className={`${btn} col-span-2 border border-teal-800 bg-teal-800 text-white hover:bg-teal-950`} data-cta="whatsapp">
        <WhatsAppIcon className="h-[18px] w-[18px]" />
        Book on WhatsApp
      </a>
      <a href={directionsHref(loc)} target="_blank" rel="noopener noreferrer" className={`${btn} border border-teal-800 bg-white text-teal-800 hover:bg-teal-50`} data-cta="directions">
        <PinIcon className="h-[18px] w-[18px]" />
        Get Directions
      </a>
      <a href={telHref} className={`${btn} border border-teal-800 bg-white text-teal-800 hover:bg-teal-50`} data-cta="call">
        <PhoneIcon className="h-[18px] w-[18px]" />
        Call
      </a>
    </div>
  );
}

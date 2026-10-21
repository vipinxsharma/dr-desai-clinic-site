import { telHref, WA_GENERAL } from "@/config/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/** Mobile-only sticky call / WhatsApp bar. */
export function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-line bg-white p-2 shadow-[0_-4px_12px_rgba(0,0,0,.08)] md:hidden" data-sticky-bar>
      <a href={telHref} className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-800 py-3 text-[16px] font-bold text-white">
        <PhoneIcon className="h-[18px] w-[18px]" /> Call
      </a>
      <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md border border-teal-800 bg-white py-3 text-[16px] font-bold text-teal-800">
        <WhatsAppIcon className="h-[18px] w-[18px]" /> WhatsApp
      </a>
    </div>
  );
}

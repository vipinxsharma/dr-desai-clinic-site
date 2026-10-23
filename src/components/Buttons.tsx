import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { telHref, WA_GENERAL } from "@/config/site";

type V = "solid" | "outline" | "white" | "outline-light";
const styles: Record<V, string> = {
  solid: "bg-teal-800 text-white hover:bg-teal-950 border border-teal-800",
  outline: "bg-white text-teal-800 border border-teal-800 hover:bg-teal-50",
  white: "bg-white text-ink border border-white hover:bg-teal-50",
  "outline-light": "bg-transparent text-white border border-white hover:bg-white/10",
};
const base = "fx-btn inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[16px] font-bold transition-colors";

export function CallButton({ variant = "solid", label = "Call Clinic", className = "" }: { variant?: V; label?: string; className?: string }) {
  return (
    <a href={telHref} className={`${base} ${styles[variant]} ${className}`} data-cta="call">
      <PhoneIcon className="h-[18px] w-[18px]" />
      {label}
    </a>
  );
}

export function WhatsAppButton({ variant = "outline", label = "WhatsApp", href = WA_GENERAL, className = "" }: { variant?: V; label?: string; href?: string; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles[variant]} ${className}`} data-cta="whatsapp">
      <WhatsAppIcon className="h-[18px] w-[18px]" />
      {label}
    </a>
  );
}

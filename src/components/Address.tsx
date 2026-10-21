import { ADDRESS } from "@/config/site";

/** "Opp. Runwal Bliss main gate" is the key landmark: largest + boldest line everywhere. */
export function Address({ tone = "light", size = "md" }: { tone?: "light" | "dark"; size?: "md" | "lg" }) {
  const landmark = size === "lg" ? "text-[22px] sm:text-[26px]" : "text-[19px] sm:text-[21px]";
  return (
    <address className="not-italic leading-snug" data-address>
      <span className={`block font-extrabold ${landmark} ${tone === "dark" ? "text-white" : "text-ink"}`}>{ADDRESS.landmark}</span>
      <span className={`mt-1 block text-[15px] ${tone === "dark" ? "text-teal-50/85" : "text-body"}`}>{ADDRESS.line}</span>
      <span className={`block text-[15px] ${tone === "dark" ? "text-teal-50/85" : "text-body"}`}>
        {ADDRESS.area} – {ADDRESS.postalCode}
      </span>
    </address>
  );
}

import { MAIN } from "@/config/site";

/** All address lines share one body size and weight (no emphasised first line). */
export function Address({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <address className={`not-italic text-[16px] font-normal leading-[1.6] ${tone === "dark" ? "text-teal-50/85" : "text-body"}`} data-address>
      {MAIN.address.lines.map((line) => (
        <span key={line} className="block">{line}</span>
      ))}
    </address>
  );
}

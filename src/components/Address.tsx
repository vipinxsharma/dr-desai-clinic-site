import { MAIN } from "@/config/site";

/** "Opp. Runwal Bliss main gate" is the key landmark: largest + boldest line everywhere. */
export function Address({ tone = "light", size = "md" }: { tone?: "light" | "dark"; size?: "md" | "lg" }) {
  const landmark = size === "lg" ? "text-[22px] sm:text-[26px]" : "text-[19px] sm:text-[21px]";
  const [first, ...rest] = MAIN.address.lines;
  const sub = tone === "dark" ? "text-teal-50/85" : "text-body";
  return (
    <address className="not-italic leading-snug" data-address>
      <span className={`block font-extrabold ${landmark} ${tone === "dark" ? "text-white" : "text-ink"}`}>{first}</span>
      {rest.map((line, i) => (
        <span key={line} className={`block text-[15px] ${i === 0 ? "mt-1" : ""} ${sub}`}>{line}</span>
      ))}
    </address>
  );
}

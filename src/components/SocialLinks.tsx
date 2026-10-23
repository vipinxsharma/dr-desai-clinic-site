import { SOCIAL } from "@/config/site";
import { FacebookIcon, InstagramIcon } from "./Icons";

const ICONS = { instagram: InstagramIcon, facebook: FacebookIcon } as const;

/** The two confirmed social links (config: SOCIAL). Opens in a new tab. */
export function SocialLinks({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const look = tone === "dark" ? "border-white/25 text-white hover:bg-white/10" : "border-teal-800 text-teal-800 hover:bg-teal-50";
  return (
    <ul className={`flex gap-3 ${className}`} data-social-links>
      {SOCIAL.map((s) => {
        const Icon = ICONS[s.id];
        return (
          <li key={s.id}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={`fx-lift flex h-10 w-10 items-center justify-center rounded-md border ${look}`}>
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

import Link from "next/link";
import { NAV, PHONE, SITE, SOCIAL, telHref } from "@/config/site";
import { Address } from "./Address";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "./Icons";

const ICONS = { instagram: InstagramIcon, facebook: FacebookIcon, youtube: YouTubeIcon } as const;

export function Footer() {
  return (
    <footer className="on-dark bg-teal-950 text-teal-50">
      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-9 sm:px-9 md:pb-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[18px] font-bold text-white">{SITE.clinicName}</p>
            <Address tone="dark" />
            <p className="mt-3 text-[16px]">
              <a href={telHref} className="hover:underline">{PHONE.display}</a>
            </p>
            {/* TODO(social): placeholder handles live in src/config/site.ts → SOCIAL. Swap before launch. */}
            <ul className="mt-4 flex gap-3" aria-label="Social media">
              {SOCIAL.map((s) => {
                const Icon = ICONS[s.id];
                return (
                  <li key={s.id}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" aria-label={`${SITE.clinicName} on ${s.label}`} className="flex h-10 w-10 items-center justify-center rounded-md border border-white/25 text-white hover:bg-white/10" data-social-placeholder={s.confirmed ? undefined : "true"}>
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[18px] font-bold text-white">Quick Links</p>
            <ul className="space-y-1.5 text-[16px]">
              {NAV.map((n) => (
                <li key={n.href}><Link href={n.href} className="hover:underline">{n.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-5 text-[15px] text-teal-50/70">
          © 2026 {SITE.clinicName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

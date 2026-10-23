import Link from "next/link";
import { EMAIL, NAV, PHONE, SITE, telHref } from "@/config/site";
import { Address } from "./Address";
import { CopyEmailButton } from "./CopyEmailButton";
import { EmailLink } from "./EmailLink";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="on-dark bg-teal-950 text-teal-50">
      <div className="container-page pb-24 pt-9 md:pb-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[18px] font-bold text-white">{SITE.clinicName}</p>
            <Address tone="dark" />
            <p className="mt-3 text-[16px]">
              <a href={telHref} className="hover:underline">{PHONE.display}</a>
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[16px]">
              <EmailLink className="hover:underline">{EMAIL}</EmailLink>
              <CopyEmailButton tone="dark" size="sm" />
            </p>
            <SocialLinks className="mt-4" />
          </div>
          <div>
            <p className="mb-3 text-[18px] font-bold text-white">Quick Links</p>
            <ul className="space-y-1.5 text-[16px]">
              {NAV.map((n) => (
                <li key={n.href}><Link href={n.href} className="inline-block transition-transform hover:translate-x-1 hover:underline">{n.label}</Link></li>
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

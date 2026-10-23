import Link from "next/link";
import { EMAIL, mailtoHref, NAV, PHONE, SITE, telHref } from "@/config/site";
import { Address } from "./Address";
import { CopyEmailButton } from "./CopyEmailButton";
import { SocialLinks } from "./SocialLinks";

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
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[16px]">
              <a href={mailtoHref} className="hover:underline">{EMAIL}</a>
              <CopyEmailButton tone="dark" size="sm" />
            </p>
            <SocialLinks className="mt-4" />
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

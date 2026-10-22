import Image from "next/image";
import Link from "next/link";
import { getSlot, MMC, PLACEHOLDERS, PHONE, SITE, telHref } from "@/config/site";
import { resolveImage } from "@/lib/images";
import { Ph } from "./Ph";
import { Nav } from "./Nav";
import { CallButton } from "./Buttons";
import { MailIcon, PhoneIcon } from "./Icons";

export function Header() {
  const logoSlot = getSlot("logo");
  const logoSrc = resolveImage(logoSlot.file);
  return (
    <header>
      <div className="on-dark bg-teal-950 text-[15px] text-teal-50">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-5 py-3 sm:px-9">
          <p>
            {SITE.qualifications} <span className="mx-1.5">|</span> Reg. No. {MMC.number}
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a href={telHref} className="inline-flex items-center gap-1.5 hover:underline">
              <PhoneIcon className="h-4 w-4" />
              {PHONE.display}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MailIcon className="h-4 w-4" />
              <Ph>{PLACEHOLDERS.email}</Ph>
            </span>
          </p>
        </div>
      </div>
      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-3 sm:px-9">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.clinicName} – home`}>
              {/* Logo slot: fixed 52px square. Uses public/images/brand/logo.png when present, else the "D" placeholder. */}
              <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-line bg-white text-[26px] font-black text-teal-800 shadow-sm" data-logo-slot={logoSrc ? "filled" : "placeholder"}>
                {logoSrc ? <Image src={logoSrc} alt={logoSlot.alt} width={52} height={52} className="h-full w-full object-contain" priority /> : <span aria-hidden="true">D</span>}
              </span>
              <span className="text-[17px] font-extrabold leading-tight text-ink sm:text-[19px]">{SITE.clinicName}</span>
            </Link>
            <div className="sm:text-right">
              <p className="text-[17px] font-bold leading-tight text-ink">{SITE.doctorName}</p>
              <p className="text-[14px] leading-tight text-body">{SITE.doctorTitle}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4">
            <Nav />
            <CallButton className="hidden shrink-0 sm:inline-flex" />
          </div>
        </div>
      </div>
    </header>
  );
}

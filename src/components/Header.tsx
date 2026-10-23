import Image from "next/image";
import Link from "next/link";
import { EMAIL, getSlot, MMC, PHONE, SITE, telHref } from "@/config/site";
import { resolveImage } from "@/lib/images";
import { EmailLink } from "./EmailLink";
import { MobileNav } from "./MobileNav";
import { Nav } from "./Nav";
import { CallButton } from "./Buttons";
import { MailIcon, PhoneIcon } from "./Icons";

export function Header() {
  const logoSlot = getSlot("logo");
  const logoSrc = resolveImage(logoSlot.file);
  return (
    <>
      {/* Contact strip. Mobile: phone + email only (credentials live in the menu and hero). */}
      <div className="on-dark bg-teal-950 text-[13px] text-teal-50 md:text-[15px]">
        <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 md:py-3">
          <p className="hidden md:block">
            {SITE.qualifications} <span className="mx-1.5">|</span> Reg. No. {MMC.number}
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href={telHref} className="inline-flex min-h-[32px] items-center gap-1.5 hover:underline">
              <PhoneIcon className="h-4 w-4" />
              {PHONE.display}
            </a>
            <EmailLink className="inline-flex min-h-[32px] items-center gap-1.5 hover:underline">
              <MailIcon className="h-4 w-4" />
              {EMAIL}
            </EmailLink>
          </p>
        </div>
      </div>

      {/* Main bar: sticky on mobile so the menu button is always reachable. */}
      <header className="sticky top-0 z-40 border-b border-line bg-white md:static">
        <div className="container-page flex items-center gap-3 py-2.5 md:py-3">
          <Link href="/" className="flex min-w-0 flex-1 items-center gap-3 rounded-md md:flex-none" aria-label={`${SITE.clinicName} – home`}>
            {/* Logo slot: fixed 52px square. Uses public/images/brand/logo.png when present, else the "D" placeholder. */}
            <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-line bg-white text-[26px] font-black text-teal-800 shadow-sm" data-logo-slot={logoSrc ? "filled" : "placeholder"}>
              {logoSrc ? <Image src={logoSrc} alt={logoSlot.alt} width={52} height={52} sizes={logoSlot.sizes} quality={logoSlot.quality} className="h-full w-full object-contain" priority /> : <span aria-hidden="true">D</span>}
            </span>
            <span className="text-[16px] font-extrabold leading-tight text-ink sm:text-[18px] lg:text-[20px]">{SITE.clinicName}</span>
          </Link>
          <div className="hidden text-right md:ml-auto md:block">
            <p className="text-[17px] font-bold leading-tight text-ink lg:text-[18px]">{SITE.doctorName}</p>
            <p className="text-[14px] leading-tight text-body lg:text-[15px]">{SITE.doctorTitle}</p>
          </div>
          <MobileNav logoSrc={logoSrc} logoAlt={logoSlot.alt} />
        </div>
        <div className="hidden border-t border-line md:block">
          <div className="container-page flex items-center justify-between gap-4 py-2.5">
            <Nav />
            <CallButton className="shrink-0" />
          </div>
        </div>
      </header>
    </>
  );
}

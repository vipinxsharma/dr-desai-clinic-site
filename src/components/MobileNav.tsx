"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MMC, NAV, SITE, WA_GENERAL } from "@/config/site";
import { CallButton, WhatsAppButton } from "./Buttons";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Hamburger + full-screen overlay menu for screens below md (768px).
 * Accessible: button with aria-expanded / aria-controls, dialog semantics, focus moves in and is trapped,
 * Esc closes, focus returns to the button, body scroll is locked while open, closes on navigation / resize.
 * The panel stays in the HTML (hidden) so the links exist for crawlers.
 */
export function MobileNav({ logoSrc, logoAlt }: { logoSrc?: string; logoAlt: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const button = buttonRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (mq.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      document.body.style.overflow = prevOverflow;
      button?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-white text-teal-800"
        data-menu-button
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        hidden={!open}
        className={`on-dark fixed inset-0 z-[70] flex-col overflow-y-auto bg-teal-950 text-white ${open ? "flex" : "hidden"}`}
        data-menu-panel
      >
        <div className="flex items-center gap-3 px-5 py-3">
          <Link href="/" onClick={() => setOpen(false)} className="flex min-w-0 flex-1 items-center gap-3" aria-label={`${SITE.clinicName} – home`}>
            <span className="relative flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white text-[22px] font-black text-teal-800">
              {logoSrc ? <Image src={logoSrc} alt={logoAlt} width={44} height={44} sizes="100px" quality={85} className="h-full w-full object-contain" /> : <span aria-hidden="true">D</span>}
            </span>
            <span className="text-[16px] font-extrabold leading-tight">{SITE.clinicName}</span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/30 text-white"
            data-menu-close
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Main" className="mt-2 px-5">
          <ul>
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="border-b border-white/10">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-[56px] items-center text-[22px] font-bold ${active ? "text-mint" : "text-white"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto px-5 pb-8 pt-8">
          <p className="text-[17px] font-bold">{SITE.doctorName}</p>
          <p className="text-[15px] text-teal-50/80">{SITE.doctorTitle}</p>
          <p className="mt-1 text-[14px] text-teal-50/70">
            {SITE.qualifications} · Reg. No. {MMC.number}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <CallButton variant="white" />
            <WhatsAppButton variant="outline-light" label="WhatsApp" href={WA_GENERAL} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import type { MouseEvent, ReactNode } from "react";
import { gmailComposeLink, mailtoHref } from "@/config/site";

type Win = Pick<Window, "matchMedia" | "open">;

/**
 * On desktop-like devices (hover + fine pointer) open Gmail compose in a new tab instead of the OS mail app.
 * Touch devices (and no-JS) keep the plain mail link. Returns true when it took over the click.
 */
export function openGmailOnDesktop(e: Pick<MouseEvent, "preventDefault" | "metaKey" | "ctrlKey" | "shiftKey" | "altKey">, win: Win = window) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false; // let modified clicks behave natively
  if (!win.matchMedia("(hover: hover) and (pointer: fine)").matches) return false;
  e.preventDefault();
  win.open(gmailComposeLink(), "_blank", "noopener,noreferrer");
  return true;
}

/** A real, focusable link (href = shared mailtoHref) that upgrades to Gmail compose on desktop. */
export function EmailLink({ children, className = "", ariaLabel }: { children?: ReactNode; className?: string; ariaLabel?: string }) {
  return (
    <a href={mailtoHref} onClick={(e) => openGmailOnDesktop(e)} aria-label={ariaLabel} className={className} data-email-link>
      {children}
    </a>
  );
}

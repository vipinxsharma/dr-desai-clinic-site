import fs from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EmailLink, openGmailOnDesktop } from "@/components/EmailLink";
import { Address } from "@/components/Address";
import { EMAIL, EMAIL_SUBJECT, gmailComposeLink, mailtoHref, MAIN } from "@/config/site";

const ev = (over: Partial<Record<"metaKey" | "ctrlKey" | "shiftKey" | "altKey", boolean>> = {}) => ({ preventDefault: vi.fn(), metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, ...over });
const win = (matches: boolean) => ({ matchMedia: vi.fn(() => ({ matches }) as MediaQueryList), open: vi.fn() });

describe("gmailComposeLink", () => {
  it("is exactly the requested URL, built from the shared constants", () => {
    expect(gmailComposeLink()).toBe("https://mail.google.com/mail/?view=cm&fs=1&to=samruddh24@gmail.com&su=Appointment%20enquiry");
    const u = new URL(gmailComposeLink());
    expect(u.searchParams.get("to")).toBe(EMAIL);
    expect(u.searchParams.get("su")).toBe(EMAIL_SUBJECT);
    expect(u.searchParams.get("view")).toBe("cm");
    expect(u.searchParams.get("fs")).toBe("1");
  });

  it("mailto href is unchanged", () => {
    expect(mailtoHref).toBe("mailto:samruddh24@gmail.com?subject=Appointment%20enquiry");
  });
});

describe("EmailLink", () => {
  it("renders a real focusable link with the mailto href (works without JS)", () => {
    const html = renderToStaticMarkup(createElement(EmailLink, { ariaLabel: `Email us at ${EMAIL}` }, "Email us"));
    expect(html).toContain(`<a href="${mailtoHref}"`);
    expect(html).toContain("Email us");
    expect(html).not.toContain("tabindex");
    expect(html).not.toContain('role="button"');
  });

  it("desktop (hover + fine pointer): prevents default and opens Gmail compose in a new tab, noopener,noreferrer", () => {
    const e = ev(); const w = win(true);
    expect(openGmailOnDesktop(e, w)).toBe(true);
    expect(w.matchMedia).toHaveBeenCalledWith("(hover: hover) and (pointer: fine)");
    expect(e.preventDefault).toHaveBeenCalled();
    expect(w.open).toHaveBeenCalledWith(gmailComposeLink(), "_blank", "noopener,noreferrer");
  });

  it("touch device: does nothing special (normal mailto)", () => {
    const e = ev(); const w = win(false);
    expect(openGmailOnDesktop(e, w)).toBe(false);
    expect(e.preventDefault).not.toHaveBeenCalled();
    expect(w.open).not.toHaveBeenCalled();
  });

  it("modified clicks keep native behaviour", () => {
    for (const k of ["metaKey", "ctrlKey", "shiftKey", "altKey"] as const) {
      const e = ev({ [k]: true }); const w = win(true);
      expect(openGmailOnDesktop(e, w)).toBe(false);
      expect(e.preventDefault).not.toHaveBeenCalled();
    }
  });
});

describe("address text", () => {
  it("renders every address line at the same size and weight (no emphasised first line)", () => {
    const html = renderToStaticMarkup(createElement(Address, {}));
    const spans = [...html.matchAll(/<span([^>]*)>/g)].map((m) => m[1]);
    expect(spans).toHaveLength(MAIN.address.lines.length);
    expect(new Set(spans).size).toBe(1); // identical classes on every line
    expect(html).not.toMatch(/font-(bold|extrabold|semibold|black)|text-\[(1[7-9]|2\d)px\]|sm:text-/);
    for (const line of MAIN.address.lines) expect(html).toContain(line);
  });

  it("Address has no size variants and no other page emphasises address lines", () => {
    expect(fs.readFileSync("src/components/Address.tsx", "utf8")).not.toMatch(/size\??:|size=|extrabold/);
  });
});

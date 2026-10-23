import fs from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { MobileNav } from "@/components/MobileNav";
import { NAV } from "@/config/site";

const html = renderToStaticMarkup(createElement(MobileNav, { logoAlt: "Logo" }));

describe("mobile hamburger menu", () => {
  it("has an accessible toggle: button, aria-expanded=false, aria-controls pointing at the panel", () => {
    expect(html).toMatch(/<button[^>]*type="button"[^>]*aria-expanded="false"[^>]*aria-controls="mobile-menu"[^>]*aria-label="Open menu"/);
    expect(html).toContain('id="mobile-menu"');
    expect(html).toContain("h-11 w-11"); // 44px target
  });

  it("panel is a hidden modal dialog with every nav link and a Close button", () => {
    const panel = html.slice(html.indexOf('id="mobile-menu"'));
    expect(panel).toContain('role="dialog"');
    expect(panel).toContain('aria-modal="true"');
    expect(panel).toMatch(/^[^>]*hidden=""/);
    for (const n of NAV) expect(panel).toContain(`href="${n.href}"`);
    expect(panel).toContain('aria-label="Close menu"');
    expect(panel).toContain("min-h-[56px]");
  });

  it("is only used below md; header keeps inline desktop nav and a sticky mobile bar", () => {
    expect(html.startsWith('<div class="md:hidden">')).toBe(true);
    const header = fs.readFileSync("src/components/Header.tsx", "utf8");
    expect(header).toContain("<MobileNav");
    expect(header).toMatch(/hidden[^"]*md:block/);
    expect(header).toMatch(/sticky top-0[^"]*md:static/);
  });
});

describe("layout system", () => {
  const css = fs.readFileSync("src/app/globals.css", "utf8");
  it("defines the fluid container, type scale and hides the sticky bar behind the open menu", () => {
    expect(css).toContain("@utility container-page");
    for (const u of ["text-display", "text-title", "text-h2", "text-lead", "text-copy"]) expect(css).toContain(`@utility ${u}`);
    expect(css).toMatch(/\[data-menu-panel\]:not\(\[hidden\]\)\) \[data-sticky-bar\]/);
  });

  it("no page hard-codes the old 1200px boxed container", () => {
    for (const f of ["src/app/page.tsx", "src/app/about/page.tsx", "src/app/services/page.tsx", "src/app/contact/page.tsx", "src/components/Header.tsx", "src/components/Footer.tsx"]) {
      expect(fs.readFileSync(f, "utf8"), f).not.toContain("max-w-[1200px]");
    }
  });
});

describe("menu overlay stays full-screen", () => {
  const header = fs.readFileSync("src/components/Header.tsx", "utf8");
  it("no ancestor of the fixed overlay creates a containing block (backdrop-filter, filter, transform, will-change, contain)", () => {
    const tag = /<header\b[^>]*className="([^"]*)"/.exec(header)![1];
    expect(tag).not.toMatch(/backdrop-|filter|transform|translate|scale|rotate|will-change|contain/);
    // The frosted blur is allowed only on a sibling background layer.
    expect(header).toMatch(/absolute inset-0 -z-10[^"]*backdrop-blur/);
  });
});

import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";
import { EMAIL, mailtoHref, SOCIAL } from "@/config/site";

const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const read = (f: string) => fs.readFileSync(f, "utf8");

describe("social links", () => {
  it("are exactly Instagram and Facebook with the confirmed URLs", () => {
    expect(SOCIAL).toHaveLength(2);
    expect(SOCIAL.map((s) => [s.id, s.label, s.href])).toEqual([
      ["instagram", "Instagram", "https://www.instagram.com/fat.docdiaries"],
      ["facebook", "Facebook", "https://www.facebook.com/share/1F41VxgMqf/"],
    ]);
    expect(SOCIAL.map((s) => new URL(s.href).hostname)).toEqual(["www.instagram.com", "www.facebook.com"]);
  });

  it("no other social platform appears anywhere in src", () => {
    for (const f of walk("src")) expect(read(f), f).not.toMatch(/(youtube|youtu|linkedin|twitter|tiktok|pinterest|snapchat|threads)\.(com|be|net)|\bx\.com|YouTubeIcon|LinkedInIcon|TwitterIcon/i);
  });

  it("render as new-tab links with aria-labels and rel noopener noreferrer", () => {
    const html = renderToStaticMarkup(createElement(SocialLinks, {}));
    const anchors = [...html.matchAll(/<a [^>]*>/g)].map((m) => m[0]);
    expect(anchors).toHaveLength(2);
    expect(anchors[0]).toContain('aria-label="Instagram"');
    expect(anchors[1]).toContain('aria-label="Facebook"');
    for (const a of anchors) {
      expect(a).toContain('target="_blank"');
      expect(a).toContain('rel="noopener noreferrer"');
    }
  });

  it("footer shows both icons and the mailto email", () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(html).toContain("https://www.instagram.com/fat.docdiaries");
    expect(html).toContain("https://www.facebook.com/share/1F41VxgMqf/");
    expect(html).toContain(`href="${mailtoHref}"`);
    expect(html).toContain(EMAIL);
  });

  it("Contact page and Header use SocialLinks / mailto from config", () => {
    const contact = read("src/app/contact/page.tsx");
    expect(contact).toContain("<SocialLinks");
    expect(contact).toContain("<EmailLink");
    expect(read("src/components/Header.tsx")).toContain("<EmailLink");
    expect(read("src/components/Header.tsx")).not.toMatch(/SocialLinks/); // header has no social icons
  });
});

describe("email", () => {
  it("matches the confirmed address and is a mailto link", () => {
    expect(EMAIL).toBe("samruddh24@gmail.com");
    expect(mailtoHref).toBe("mailto:samruddh24@gmail.com?subject=Appointment%20enquiry");
  });

  it("no email placeholder or Ph component remains", () => {
    for (const f of walk("src")) expect(read(f), f).not.toMatch(/CLINIC EMAIL|PLACEHOLDERS|<Ph[ >]|data-placeholder/);
    expect(fs.existsSync("src/components/Ph.tsx")).toBe(false);
  });

  it("email is hard-coded only in config", () => {
    for (const f of walk("src")) if (!f.endsWith("config/site.ts")) expect(read(f), f).not.toContain(EMAIL);
  });
});

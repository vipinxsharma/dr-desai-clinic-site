import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RESOURCES, resourcesVisible, type Resources } from "@/config/resources";
import { buildNav, LOCATIONS, NAV } from "@/config/site";
import { ResourcesView } from "@/components/ResourcesView";
import sitemap from "@/app/sitemap";

const empty: Resources = { showWhenEmpty: false, videos: [], articles: [], gallery: [], documents: [] };
const render = (r: Resources) => renderToStaticMarkup(createElement(ResourcesView, { resources: r }));
const labels = (r: Resources) => buildNav(r).map((n) => n.label);

describe("resources", () => {
  it("ships empty and hidden", () => {
    expect(RESOURCES).toEqual(empty);
    expect(resourcesVisible(RESOURCES)).toBe(false);
    expect(NAV.map((n) => n.label)).not.toContain("Resources");
    expect(sitemap().map((s) => s.url.endsWith("/resources")).some(Boolean)).toBe(false);
  });

  it("empty and hidden: no menu item, page not visible", () => {
    expect(resourcesVisible(empty)).toBe(false);
    expect(labels(empty)).toEqual(["Home", "About", "Services", "Contact & Visit Us"]);
    expect(fs.readFileSync("src/app/resources/page.tsx", "utf8")).toContain("if (!resourcesVisible(RESOURCES)) notFound()");
  });

  it("empty and forced: menu item right after Contact & Visit Us, one coming-soon line with Call and WhatsApp", () => {
    const r = { ...empty, showWhenEmpty: true };
    expect(resourcesVisible(r)).toBe(true);
    expect(labels(r)).toEqual(["Home", "About", "Services", "Contact & Visit Us", "Resources"]);
    const html = render(r);
    expect(html).toContain("Resources are coming soon. For any question, call or WhatsApp the clinic.");
    expect(html).toContain('data-cta="call"');
    expect(html).toContain('data-cta="whatsapp"');
    expect(html).not.toContain("<h2");
  });

  it("with items: menu item shown, only non-empty sections render", () => {
    const r: Resources = { ...empty, videos: [{ title: "Intro", url: "https://example.com/v" }], documents: [{ title: "Diet chart", url: "https://example.com/d.pdf" }] };
    expect(labels(r).at(-1)).toBe("Resources");
    const html = render(r);
    expect(html).toContain(">Videos<");
    expect(html).toContain(">Documents<");
    expect(html).not.toContain(">Articles<");
    expect(html).not.toContain(">Gallery<");
    expect(html).not.toContain("coming soon");
  });
});

describe("Powai timing", () => {
  it("is 3:00 pm to 4:00 pm and the old time appears nowhere in src, tests data or README", () => {
    expect(LOCATIONS.powai.weekly.text).toBe("3:00 pm to 4:00 pm");
    expect(LOCATIONS.powai.weekly.slots).toEqual([{ opens: "15:00", closes: "16:00" }]);
    const walk = (d: string): string[] => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`]));
    const old = [/4:00 pm to 5:30/, /opens: "16:00"/, /"17:30"/, /5:30 pm/];
    for (const f of [...walk("src"), "README.md"]) {
      const t = fs.readFileSync(f, "utf8");
      for (const re of old) expect(t, `${f} ${re}`).not.toMatch(re);
    }
  });
});

import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { GET as llms } from "@/app/llms.txt/route";
import { SITE } from "@/config/site";

const HOST = "https://www.drdesaihealthclinic.com";
// Built from parts so this test file never matches its own guard.
const WRONG = ["drdesai", "clinic"].join("");

const walk = (dir: string): string[] =>
  fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])) : [];
const TEXT = /\.(ts|tsx|js|mjs|css|json|txt|md|xml|html|svg)$/;

describe("site host is a single constant", () => {
  it("SITE.url is the www host, no trailing slash, no env override", () => {
    expect(SITE.url).toBe(HOST);
    expect(SITE.url.endsWith("/")).toBe(false);
    for (const f of walk("src")) expect(fs.readFileSync(f, "utf8"), f).not.toMatch(/NEXT_PUBLIC_SITE_URL/);
  });

  it(`the string "${WRONG}" appears nowhere in src, public or config`, () => {
    for (const f of [...walk("src"), ...walk("public").filter((p) => TEXT.test(p))]) {
      expect(fs.readFileSync(f, "utf8").toLowerCase(), f).not.toContain(WRONG);
    }
    expect(fs.readFileSync("README.md", "utf8").toLowerCase()).not.toContain(WRONG);
  });

  it("no hard-coded copy of the host outside config/site.ts", () => {
    for (const f of walk("src")) if (!f.endsWith(path.join("config", "site.ts"))) expect(fs.readFileSync(f, "utf8"), f).not.toContain("drdesaihealthclinic");
  });
});

describe("generated files read the host from SITE.url", () => {
  it("robots.txt points at the real sitemap and keeps allow-all (no noindex)", () => {
    const r = robots();
    expect(r.sitemap).toBe(`${HOST}/sitemap.xml`);
    expect(r.rules).toEqual([{ userAgent: "*", allow: "/" }]);
  });

  it("sitemap lists exactly the 4 pages on the real host, same URL style, no /resources", () => {
    const urls = sitemap().map((s) => s.url);
    expect(urls).toEqual([HOST, `${HOST}/about`, `${HOST}/services`, `${HOST}/contact`]);
    expect(urls.some((u) => u.includes("resources"))).toBe(false);
  });

  it("llms.txt links use the real host", async () => {
    const body = await llms().text();
    const links = [...body.matchAll(/\]\((https?:[^)]+)\)/g)].map((m) => m[1]);
    expect(links).toEqual([`${HOST}/`, `${HOST}/about`, `${HOST}/services`, `${HOST}/contact`]);
    expect(body.toLowerCase()).not.toContain(WRONG);
  });
});

import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { SERVICE_DESCRIPTIONS } from "@/config/service-descriptions";
import { HOME_SERVICES, SERVICES } from "@/config/site";

const words = (s: string) => s.trim().split(/\s+/).length;
const BANNED = /\b(best|100\s?%|cure[sd]?|guarantee[sd]?|testimonials?|permanent(ly)?|miracle|proven)\b/i;
const DRUGS = /\b(metformin|insulin glargine|glimepiride|semaglutide|ozempic|mg|mcg|units?)\b/i;

describe("service descriptions", () => {
  it("covers every service exactly once", () => {
    expect(Object.keys(SERVICE_DESCRIPTIONS).sort()).toEqual(SERVICES.map((s) => s.slug).sort());
  });

  for (const [slug, d] of Object.entries(SERVICE_DESCRIPTIONS)) {
    it(slug, () => {
      const n = words(d.description);
      expect(n).toBeGreaterThanOrEqual(15);
      expect(n).toBeLessThanOrEqual(22);
      expect(d.description.endsWith(".")).toBe(true);
      expect(d.description.match(/\./g)!.length).toBe(1); // one sentence
      expect(d.description).not.toMatch(BANNED);
      expect(d.description).not.toMatch(DRUGS);
      expect(d.description).not.toMatch(/\d/); // no stats, doses or promised numbers
      expect(d.needsDoctorReview).toBe(true);
    });
  }

  it("Home features six services that exist", () => {
    expect(HOME_SERVICES).toHaveLength(6);
    for (const s of HOME_SERVICES) expect(SERVICE_DESCRIPTIONS[s.slug]).toBeDefined();
  });
});

describe("FAQ is gone", () => {
  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
  it("no faq mentions in src (code, llms.txt route, sitemap)", () => {
    for (const f of walk("src")) expect(fs.readFileSync(f, "utf8"), f).not.toMatch(/faq/i);
  });
  it("review flags are never rendered by the service card", () => {
    expect(fs.readFileSync("src/components/ServiceCard.tsx", "utf8")).not.toMatch(/needsDoctorReview/);
  });
});

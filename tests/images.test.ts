import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { getSlot, IMAGE_SLOTS, SERVICES } from "@/config/site";
import { ImageSlot } from "@/components/ImageSlot";
import { resolveImage } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

describe("image slot registry", () => {
  it("has unique ids and files, all under public/images, with alt text and sane sizes", () => {
    expect(new Set(IMAGE_SLOTS.map((s) => s.id)).size).toBe(IMAGE_SLOTS.length);
    expect(new Set(IMAGE_SLOTS.map((s) => s.file)).size).toBe(IMAGE_SLOTS.length);
    for (const s of IMAGE_SLOTS) {
      expect(s.file).not.toMatch(/^\/|\.\./);
      expect(s.alt.length).toBeGreaterThan(5);
      expect(s.width).toBeGreaterThan(0);
      expect(s.height).toBeGreaterThan(0);
      expect(s.position.length).toBeGreaterThan(0);
    }
  });

  it("every service imageSlot exists", () => {
    for (const svc of SERVICES) if (svc.imageSlot) expect(() => getSlot(svc.imageSlot!)).not.toThrow();
  });

  it("folders for every slot exist in the repo", () => {
    for (const s of IMAGE_SLOTS) expect(fs.existsSync(path.join("public", "images", path.dirname(s.file)))).toBe(true);
  });
});

describe("resolveImage (build-time lookup)", () => {
  it("returns undefined for a missing file and never throws", () => {
    expect(resolveImage("doctor/definitely-missing.jpg")).toBeUndefined();
    expect(resolveImage("x.jpg", "/nonexistent/root")).toBeUndefined();
  });

  it("finds a dropped file by exact name or another common extension, with zero code change", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "imgs-"));
    fs.mkdirSync(path.join(root, "public", "images", "doctor"), { recursive: true });
    expect(resolveImage("doctor/hero-doctor.jpg", root)).toBeUndefined();
    fs.writeFileSync(path.join(root, "public", "images", "doctor", "hero-doctor.png"), "x");
    expect(resolveImage("doctor/hero-doctor.jpg", root)).toBe("/images/doctor/hero-doctor.png");
    fs.writeFileSync(path.join(root, "public", "images", "doctor", "hero-doctor.jpg"), "x");
    expect(resolveImage("doctor/hero-doctor.jpg", root)).toBe("/images/doctor/hero-doctor.jpg");
  });
});

describe("ImageSlot rendering", () => {
  it("keeps a dashed placeholder with fixed ratio when the file is missing", () => {
    const html = renderToStaticMarkup(createElement(ImageSlot, { slot: "home-hero" }));
    expect(html).toContain('data-image-slot="placeholder"');
    expect(html).toContain("aspect-ratio:540 / 618");
    expect(html).toContain('role="img"');
  });

  it("renders the image when the file exists, in the same fixed box", () => {
    const html = renderToStaticMarkup(createElement(ImageSlot, { slot: "svc-hypertension" }));
    expect(html).toContain('data-image-slot="filled"');
    expect(html).toContain("aspect-ratio:525 / 204");
    expect(html).toContain("object-position:center top");
  });

  it("OG metadata only appears when the share image exists", () => {
    const m = pageMetadata({ title: "T", description: "D", path: "/" });
    const hasFile = resolveImage(getSlot("og-share").file) !== undefined;
    expect(Boolean(m.openGraph && "images" in m.openGraph)).toBe(hasFile);
  });
});

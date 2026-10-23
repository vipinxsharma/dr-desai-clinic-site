import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as Icons from "@/components/Icons";

const css = fs.readFileSync("src/app/globals.css", "utf8");
const MARK = "@media (prefers-reduced-motion: no-preference) {";

describe("motion is gated by prefers-reduced-motion", () => {
  it("every keyframe and animation lives inside the no-preference block", () => {
    const at = css.indexOf(MARK);
    expect(at).toBeGreaterThan(0);
    const before = css.slice(0, at);
    expect(before).not.toMatch(/@keyframes|animation(-name)?\s*:/);
    const after = css.slice(at);
    for (const k of ["fx-fade-up", "fx-pop", "fx-float", "fx-glow-drift", "fx-shimmer", "fx-shine", "fx-pulse", "fx-slide-up", "fx-menu-in", "fx-progress", "fx-check", "fx-wiggle"]) {
      expect(after).toContain(`@keyframes ${k}`);
    }
  });

  it("scroll reveal and progress bar are progressive enhancements (@supports), no JS", () => {
    expect(css).toContain("@supports (animation-timeline: view())");
    expect(css).toContain("@supports (animation-timeline: scroll())");
    expect(css).toMatch(/\.fx-progress\s*\{\s*display:\s*none/);
  });

  it("animates only compositor-friendly properties", () => {
    const frames = [...css.matchAll(/@keyframes [\w-]+ \{([\s\S]*?)\n  \}/g)].map((m) => m[1]);
    expect(frames.length).toBeGreaterThanOrEqual(12);
    const props = new Set(frames.flatMap((f) => [...f.matchAll(/([a-z-]+)\s*:/g)].map((m) => m[1])));
    for (const p of props) expect(["opacity", "translate", "transform", "scale", "rotate", "box-shadow", "background-position"]).toContain(p);
  });
});

describe("icons", () => {
  const all = Object.entries(Icons);
  it("come from Lucide / Font Awesome 6 and render decorative svgs", () => {
    expect(fs.readFileSync("src/components/Icons.tsx", "utf8")).toMatch(/from "lucide-react"[\s\S]*from "react-icons\/fa6"/);
    expect(all.length).toBeGreaterThanOrEqual(25);
    for (const [name, Icon] of all) {
      const html = renderToStaticMarkup(createElement(Icon as React.ComponentType<{ className?: string }>, { className: "h-4 w-4" }));
      expect(html, name).toContain("<svg");
      expect(html, name).toContain('aria-hidden="true"');
    }
  });

  it("no hand-drawn inline svgs remain in components or pages", () => {
    for (const f of fs.readdirSync("src/components")) expect(fs.readFileSync(`src/components/${f}`, "utf8"), f).not.toContain("<svg");
  });
});

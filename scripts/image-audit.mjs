// Usage: node scripts/image-audit.mjs <baseUrl>
// Measures every rendered image slot at 390/768/1280/1920 (DPR 1 and 2): rendered CSS width, the
// srcset candidate the browser picked, the bitmap width actually served, and quality.
// Rule: served width >= min(2 x rendered width, source width). Exits 1 if any slot fails.
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const widths = [390, 768, 1280, 1920];
const pages = ["/", "/about", "/services"];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const rows = [];
let bad = 0;

for (const dpr of [1, 2]) {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr });
    const page = await ctx.newPage();
    const seen = new Set();
    for (const path of pages) {
      await page.goto(base + path, { waitUntil: "load" });
      // Scroll through the page so lazy images load.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
      });
      await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
      const found = await page.evaluate(async () => {
        const out = [];
        const grab = async (id, img) => {
          if (!img) return;
          const r = img.getBoundingClientRect();
          const src = img.currentSrc;
          const orig = new URL(src).searchParams.get("url");
          const probe = new Image();
          probe.src = orig;
          await probe.decode().catch(() => {});
          // img.naturalWidth is density-adjusted by srcset/sizes; decode the real served bitmap instead.
          const bmp = await createImageBitmap(await (await fetch(src)).blob());
          out.push({ id, rendered: Math.round(r.width * 10) / 10, src, natural: bmp.width, source: probe.naturalWidth });
        };
        for (const el of document.querySelectorAll("[data-slot-id][data-image-slot=filled]")) await grab(el.dataset.slotId, el.querySelector("img"));
        await grab("logo", document.querySelector("[data-logo-slot=filled] img"));
        return out;
      });
      for (const f of found) {
        if (seen.has(f.id)) continue;
        seen.add(f.id);
        const u = new URL(f.src, base);
        const q = u.searchParams.get("q");
        const need = Math.min(Math.ceil(2 * f.rendered), f.source);
        const ok = f.natural >= need;
        if (!ok) bad++;
        rows.push({ vw: w, dpr, id: f.id, rendered: f.rendered, requested: u.searchParams.get("w"), served: f.natural, source: f.source, q, ok });
      }
    }
    await ctx.close();
  }
}
await browser.close();
console.log("| viewport | DPR | slot | rendered px | requested w | served px | source px | q | ok |\n|---|---|---|---|---|---|---|---|---|");
for (const r of rows) console.log(`| ${r.vw} | ${r.dpr} | ${r.id} | ${r.rendered} | ${r.requested} | ${r.served} | ${r.source} | ${r.q} | ${r.ok ? "yes" : "NO"} |`);
process.exit(bad ? 1 : 0);

// Usage: node scripts/screenshots.mjs <baseUrl> <outDir>. Fails on horizontal scroll.
import { chromium } from "playwright";
const [base = "http://localhost:3000", out = "screenshots"] = process.argv.slice(2);
const pages = { home: "/", about: "/about", services: "/services", contact: "/contact" };
const sizes = { 1280: 900, 390: 844 };
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
let bad = 0;
for (const [w, h] of Object.entries(sizes)) {
  const ctx = await browser.newContext({ viewport: { width: +w, height: h } });
  const page = await ctx.newPage();
  for (const [name, path] of Object.entries(pages)) {
    await page.goto(base + path, { waitUntil: "load" });
    // Scroll through so lazy-loaded images are fetched before the full-page screenshot.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
    const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    const ok = sw <= cw;
    if (!ok) bad++;
    console.log(`${w}px ${name}: scrollWidth=${sw} clientWidth=${cw} ${ok ? "OK" : "HORIZONTAL SCROLL"}`);
    await page.screenshot({ path: `${out}/${name}-${w}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();
process.exit(bad ? 1 : 0);

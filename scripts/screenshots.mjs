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
    const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    const ok = sw <= cw;
    if (!ok) bad++;
    console.log(`${w}px ${name}: scrollWidth=${sw} clientWidth=${cw} ${ok ? "OK" : "HORIZONTAL SCROLL"}`);
    await page.screenshot({ path: `${out}/${name}-${w}.png`, fullPage: true });
    if (name === "contact") {
      // FAQ: first item open, rest closed.
      await page.locator("[data-faq-item] summary").first().click();
      await page.locator("section[aria-labelledby=faq-heading]").screenshot({ path: `${out}/contact-faq-${w}.png` });
    }
  }
  await ctx.close();
}
await browser.close();
process.exit(bad ? 1 : 0);

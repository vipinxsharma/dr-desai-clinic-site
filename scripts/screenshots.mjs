// Usage: node scripts/screenshots.mjs <baseUrl> <outDir>. Fails on horizontal scroll.
import { chromium } from "playwright";
const [base = "http://localhost:3000", out = "screenshots"] = process.argv.slice(2);
const pages = { home: "/", about: "/about", services: "/services", contact: "/contact" };
const sizes = { 1920: 1080, 1280: 900, 768: 1024, 390: 844 };
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
let bad = 0;
for (const [w, h] of Object.entries(sizes)) {
  const ctx = await browser.newContext({ viewport: { width: +w, height: h }, reducedMotion: "reduce" }); // deterministic captures
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

// Mobile menu behaviour (hamburger overlay): open, aria state, Esc closes, focus returns, desktop has no hamburger.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "load" });
  const btn = page.locator("[data-menu-button]");
  const check = (name, ok) => { console.log(`menu: ${name} ${ok ? "OK" : "FAIL"}`); if (!ok) bad++; };
  check("closed by default", (await btn.getAttribute("aria-expanded")) === "false" && !(await page.locator("[data-menu-panel]").isVisible()));
  await btn.click();
  await page.waitForTimeout(150);
  check("opens + aria-expanded", (await btn.getAttribute("aria-expanded")) === "true" && (await page.locator("[data-menu-panel]").isVisible()));
  check("focus moves to Close", await page.evaluate(() => document.activeElement?.hasAttribute("data-menu-close")));
  check("body scroll locked", (await page.evaluate(() => document.body.style.overflow)) === "hidden");
  await page.screenshot({ path: `${out}/menu-390.png` });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(150);
  check("Esc closes", !(await page.locator("[data-menu-panel]").isVisible()) && (await btn.getAttribute("aria-expanded")) === "false");
  check("focus returns to hamburger", await page.evaluate(() => document.activeElement?.hasAttribute("data-menu-button")));
  await btn.click();
  await page.locator("[data-menu-panel] a", { hasText: "Services" }).first().click();
  await page.waitForURL("**/services");
  check("link navigates and closes menu", !(await page.locator("[data-menu-panel]").isVisible()));
  await ctx.close();
  const desk = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const dp = await desk.newPage();
  await dp.goto(base + "/", { waitUntil: "load" });
  check("desktop: no hamburger, inline nav visible", !(await dp.locator("[data-menu-button]").isVisible()) && (await dp.locator("header nav a:visible", { hasText: "Contact & Visit Us" }).count()) === 1);
  await desk.close();
}

// Motion: with motion allowed, everything revealed on scroll ends fully visible; with reduced motion nothing animates.
{
  const check = (name, ok) => { console.log(`motion: ${name} ${ok ? "OK" : "FAIL"}`); if (!ok) bad++; };
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  for (const path of Object.values(pages)) {
    await page.goto(base + path, { waitUntil: "load" });
    await page.waitForTimeout(1300);
    check(`${path} hero/entrance children visible after load`, await page.evaluate(() => [...document.querySelectorAll(".fx-in > *")].every((e) => +getComputedStyle(e).opacity > 0.99)));
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000); // html has smooth scrolling, let it settle
    const hidden = await page.evaluate(() => [...document.querySelectorAll(".fx-reveal, .fx-grid > *")].filter((e) => +getComputedStyle(e).opacity < 0.99).length);
    check(`${path} scroll-reveals all end visible (hidden=${hidden})`, hidden === 0);
  }
  await page.goto(base + "/", { waitUntil: "load" });
  check("progress bar present", await page.evaluate(() => !!document.querySelector(".fx-progress")));
  await ctx.close();
  const rm = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const rp = await rm.newPage();
  await rp.goto(base + "/", { waitUntil: "load" });
  check("reduced motion: no animations running", await rp.evaluate(() => document.getAnimations().filter((a) => !(a instanceof CSSTransition)).length === 0));
  check("reduced motion: progress bar hidden", await rp.evaluate(() => getComputedStyle(document.querySelector(".fx-progress")).display === "none"));
  await rm.close();
}
await browser.close();
process.exit(bad ? 1 : 0);

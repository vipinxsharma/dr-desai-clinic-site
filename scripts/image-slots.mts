// Prints every image slot with live filled/empty status: npm run images:table
// Folder layout and filenames come from IMAGE_SLOTS in src/config/site.ts (single source).
import fs from "node:fs";
import path from "node:path";
import { IMAGE_SLOTS } from "../src/config/site.ts";

const EXTS = [".jpg", ".jpeg", ".png", ".webp"];
const exists = (file: string) => {
  const base = file.replace(/\.[^./]+$/, "");
  return [file, ...EXTS.map((e) => base + e)].some((f) => fs.existsSync(path.join("public", "images", f)));
};
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

const rows = IMAGE_SLOTS.map((s) => {
  const g = gcd(s.width, s.height);
  return [s.page, s.name, `public/images/${path.dirname(s.file)}/`, path.basename(s.file), `${s.width} x ${s.height}`, `${s.width / g}:${s.height / g}`, exists(s.file) ? "filled" : "empty"];
});
const head = ["Page", "Slot", "Folder", "Filename", "Pixels", "Ratio", "Status"];
const md = [head, head.map(() => "---"), ...rows].map((r) => `| ${r.join(" | ")} |`).join("\n");
console.log(md);

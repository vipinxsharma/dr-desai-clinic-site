#!/usr/bin/env node
/**
 * Fails (exit 1) if any phone-like number other than the single approved clinic
 * number appears in shipped source. Runs in `prebuild` and CI via tests/phone.test.ts.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

export const ALLOWED = new Set(["918830531546", "8830531546"]);
// Maharashtra Medical Council registration number (config MMC.number). 10 digits but NOT a phone number.
export const ALLOWED_NON_PHONE = new Set(["2016040659"]);
const BUILT = process.argv.includes("--built");
const SCAN_DIRS = BUILT ? [".next/server/app"] : ["src", "public"];
const EXTS = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".txt", ".md", ".json", ".html", ".xml", ".svg", ".body", ".rsc", ".segment"]);

/** Digit groups that look like phone numbers (>=10 digits, only single space/hyphen separators). */
const PHONE_RE = /(?<![\w.#/-])\+?\d(?:[ -]?\d){9,}(?![\w.])/g;

export function stripNoise(text) {
  // SVG path data and numeric attributes are long digit runs, not phone numbers.
  return text
    .replace(/\b(d|points|viewBox|transform)=("[^"]*"|'[^']*'|\{`[^`]*`\})/g, "")
    // Same attributes inside the escaped RSC/JSON payload: \"points\":\"3 11 22 ...\"
    .replace(/\\*"(?:d|points|viewBox|transform)\\*"\s*:\s*\\*"[^"\\]*\\*"/g, "")
    .replace(/https?:\/\/\S+/g, (u) => (u.includes("wa.me/") ? u : ""));
}

export function findPhoneNumbers(text) {
  const cleaned = stripNoise(text);
  const hits = [];
  for (const m of cleaned.matchAll(PHONE_RE)) {
    const digits = m[0].replace(/\D/g, "");
    if (!ALLOWED.has(digits) && !ALLOWED_NON_PHONE.has(digits)) hits.push(m[0].trim());
  }
  // wa.me links must use the approved number exactly.
  for (const m of text.matchAll(/wa\.me\/(\d+)/g)) if (!ALLOWED.has(m[1])) hits.push(`wa.me/${m[1]}`);
  for (const m of text.matchAll(/tel:\+?([\d\s-]+)/g)) {
    const d = m[1].replace(/\D/g, "");
    if (d && !ALLOWED.has(d)) hits.push(`tel:${m[1].trim()}`);
  }
  return hits;
}

function walk(dir, out = []) {
  let entries = [];
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXTS.has(extname(p))) out.push(p);
  }
  return out;
}

export function scan(root = ".") {
  const problems = [];
  for (const dir of SCAN_DIRS) {
    for (const file of walk(join(root, dir))) {
      for (const hit of findPhoneNumbers(readFileSync(file, "utf8"))) problems.push(`${file}: ${hit}`);
    }
  }
  return problems;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const problems = scan();
  if (problems.length) {
    console.error("Unapproved phone number(s) found. Only +91 88305 31546 is allowed:\n" + problems.map((p) => " - " + p).join("\n"));
    process.exit(1);
  }
  console.log("check-phone: OK (only the approved number is present)");
}

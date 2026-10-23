import fs from "node:fs";
import path from "node:path";

const EXTS = [".jpg", ".jpeg", ".png", ".webp"];

/**
 * Build-time lookup (server only). Returns the public URL if the file (or the same name with another
 * common image extension) exists under public/images, else undefined. Never throws, so a missing
 * file can never break the build; the slot just keeps its dashed placeholder.
 */
export function resolveImage(file: string, root: string = process.cwd()): string | undefined {
  try {
    const dir = path.join(root, "public", "images");
    const base = file.replace(/\.[^./]+$/, "");
    for (const candidate of [file, ...EXTS.map((e) => base + e)]) {
      const full = path.join(dir, candidate);
      if (fs.existsSync(full) && fs.statSync(full).isFile()) return `/images/${candidate}`;
    }
  } catch {
    /* fall through to placeholder */
  }
  return undefined;
}

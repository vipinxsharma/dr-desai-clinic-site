import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV.map((n) => ({
    url: `${SITE.url}${n.href === "/" ? "" : n.href}`,
    changeFrequency: "monthly",
    priority: n.href === "/" ? 1 : 0.8,
  }));
}

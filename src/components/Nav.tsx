"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/config/site";

export function Nav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="flex flex-wrap gap-x-5 gap-y-1 text-[16px] font-bold sm:gap-x-6">
      {NAV.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`py-1 ${active ? "text-teal-800" : "text-ink hover:text-teal-800"}`}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

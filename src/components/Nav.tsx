"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/config/site";

export function Nav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="flex flex-wrap gap-x-6 gap-y-1 text-[16px] font-bold lg:gap-x-8 lg:text-[17px]">
      {NAV.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`inline-flex min-h-[44px] items-center ${active ? "text-teal-800" : "text-ink hover:text-teal-800"}`}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

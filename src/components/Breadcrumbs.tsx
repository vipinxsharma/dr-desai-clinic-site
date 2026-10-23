import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export function Breadcrumbs({ trail, visible = false }: { trail: { name: string; path: string }[]; visible?: boolean }) {
  return (
    <>
      {visible && <nav aria-label="Breadcrumb" className="container-page pt-4 text-[14px] text-body">
        <ol className="flex flex-wrap gap-1.5">
          {trail.map((c, i) => (
            <li key={c.path} className="flex gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === trail.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path} className="text-teal-800 hover:underline">{c.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>}
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

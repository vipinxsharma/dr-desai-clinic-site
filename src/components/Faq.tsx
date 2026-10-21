import type { Faq as FaqItem } from "@/config/faqs";
import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/seo";

/** Visible Q&A. The same data feeds FAQPage JSON-LD so markup always mirrors the page. */
export function FaqSection({ faqs, title = "Frequently asked questions", cream = false }: { faqs: FaqItem[]; title?: string; cream?: boolean }) {
  return (
    <section className={`${cream ? "bg-cream" : "bg-white"} py-12`} aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[760px] px-5 sm:px-9">
        <h2 id="faq-heading" className="mb-6 text-center text-[24px] font-bold text-ink">{title}</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-[10px] border border-line bg-white p-4 open:bg-note/60">
              <summary className="cursor-pointer list-none text-[17px] font-bold text-ink marker:hidden">
                <h3 className="inline">{f.q}</h3>
              </summary>
              <p className="mt-2 text-[16px] leading-relaxed text-body">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}

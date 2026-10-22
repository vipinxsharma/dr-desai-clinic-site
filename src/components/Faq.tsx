import type { Faq as FaqItem } from "@/config/faqs";
import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/seo";

/**
 * Accessible accordion on native <details>/<summary>: keyboard operable, closed by default,
 * answers are in the server-rendered HTML. The same data feeds FAQPage JSON-LD.
 * `needsDoctorReview` / `kind` are internal and never rendered.
 */
export function FaqSection({ faqs, title = "Frequently asked questions", cream = false }: { faqs: FaqItem[]; title?: string; cream?: boolean }) {
  return (
    <section className={`${cream ? "bg-cream" : "bg-white"} py-12`} aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[760px] px-5 sm:px-9">
        <h2 id="faq-heading" className="mb-6 text-center text-[24px] font-bold text-ink">{title}</h2>
        <div className="space-y-2" data-faq-list>
          {faqs.map((f) => (
            <details key={f.q} className="group border border-line bg-white open:border-teal-800" data-faq-item>
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-left [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
                <h3 className="text-[17px] font-bold leading-snug text-ink">{f.q}</h3>
                <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center bg-teal-800 text-[20px] font-bold leading-none text-white">
                  <span className="transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="border-t border-line px-4 py-3 text-[16px] leading-[1.7] text-body">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}

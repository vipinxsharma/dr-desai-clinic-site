import Link from "next/link";
import { CallButton, WhatsAppButton } from "@/components/Buttons";
import { PHONE, WA_GENERAL } from "@/config/site";

/** Dark closing band: main clinic number only (CallButton / WA_GENERAL). No form. */
export function ClosingCta({ id = "cta-heading", title = "Ready to book your visit?", showContactLink = false }: { id?: string; title?: string; showContactLink?: boolean }) {
  return (
    <section className="on-dark bg-teal-800 py-12 text-center text-white" aria-labelledby={id}>
      <div className="container-page !max-w-[860px]">
        <h2 id={id} className="fx-reveal text-h2 font-bold">{title}</h2>
        <p className="mt-2 text-lead text-teal-50/90">Call or WhatsApp {PHONE.display}. Every enquiry goes straight to the clinic.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <CallButton variant="white" className="fx-pulse" />
          <WhatsAppButton variant="outline-light" label="WhatsApp Us" href={WA_GENERAL} />
        </div>
        {showContactLink && (
          <p className="mt-5">
            <Link href="/contact" className="text-[17px] font-bold text-mint hover:underline">Contact &amp; Visit Us</Link>
          </p>
        )}
      </div>
    </section>
  );
}

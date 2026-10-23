import { Address } from "@/components/Address";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationActions, Timings } from "@/components/LocationBits";
import { SocialLinks } from "@/components/SocialLinks";
import { BRANCHES, EMAIL, FEES, MAIN, MAP, mailtoHref, PHONE, telHref } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Visit Us | Clinic in Kanjurmarg East, Mumbai",
  description: "Visit Dr. Desai's Health Clinic and Diabetes Center opposite Runwal Bliss main gate, Kanjurmarg East. Timings, map, call, WhatsApp, plus Nahar Medical Center and Powai Polyclinic.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Contact & Visit Us", path: "/contact" }]} />
      <section className="bg-cream py-10" aria-labelledby="contact-h1">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-9">
          <h1 id="contact-h1" className="text-center text-[26px] font-bold">Contact &amp; Visit Us</h1>
          <p className="mt-2 text-center text-[17px] text-body">Call or WhatsApp directly. Every enquiry goes straight to the clinic, no booking form or portal.</p>

          {/* MAIN CLINIC */}
          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" data-location="main">
            <div className="rounded-[10px] border border-line bg-white p-5">
              <h2 className="mb-3 text-[18px] font-bold">{MAIN.name}</h2>
              <Address size="lg" />
              <h3 className="mt-5 text-[17px] font-bold">Timings</h3>
              <Timings loc={MAIN} />
              <p className="mt-2 text-[16px] leading-[1.7] text-body">Consultation fee: {FEES.first} first visit, {FEES.followUp} follow-up.</p>
              <p className="mt-4 text-[16px] text-body">Phone: <a href={telHref} className="font-bold text-teal-800 hover:underline">{PHONE.display}</a></p>
              <p className="mt-1 text-[16px] text-body">Email: <a href={mailtoHref} className="font-bold text-teal-800 hover:underline">{EMAIL}</a></p>
              <SocialLinks tone="light" className="mt-3" />
              <LocationActions loc={MAIN} />
            </div>
            <div className="overflow-hidden rounded-[10px] border border-line bg-white">
              <div className="relative h-full min-h-[280px] w-full" style={{ aspectRatio: "4 / 3" }}>
                <iframe title={MAP.title} src={MAP.embedUrl(MAIN)} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              </div>
            </div>
          </div>

          {/* OTHER LOCATIONS */}
          <h2 className="mt-10 text-[20px] font-bold">Also consults at</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {BRANCHES.map((b, i) => (
              <li key={b.slug} className="flex flex-col overflow-hidden rounded-[10px] border border-line bg-white" data-location={b.slug}>
                <div className="relative w-full" style={{ aspectRatio: "213 / 88" }}>
                  <iframe title={`Map showing ${b.name}, ${b.place}, Mumbai`} src={MAP.embedUrl(b)} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="mb-1 inline-block w-fit rounded-full bg-teal-950 px-2.5 py-0.5 text-[13px] font-bold text-mint">0{i + 1}</span>
                  <h3 className="text-[18px] font-bold leading-snug">{b.name}</h3>
                  <address className="mt-1 not-italic text-[16px] leading-[1.6] text-body">
                    {b.address.lines.map((l) => <span key={l} className="block">{l}</span>)}
                  </address>
                  <h4 className="mt-3 text-[16px] font-bold">Timings</h4>
                  <Timings loc={b} />
                  <p className="mt-2 text-[16px] leading-[1.6] text-body">Fee {b.fee} · {b.distance}</p>
                  <div className="mt-auto"><LocationActions loc={b} /></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

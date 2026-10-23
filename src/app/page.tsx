import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";
import { CallButton, WhatsAppButton } from "@/components/Buttons";
import { ServiceCard } from "@/components/ServiceCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChatIcon, ClipboardIcon, CompassIcon, MedicalCrossIcon, StethoscopeIcon } from "@/components/Icons";
import { ALL_LOCATIONS, EXPERIENCE, FEES, HOME_SERVICES, MAIN, MMC, PHONE, SITE, WA_GENERAL } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Diabetes Doctor in Kanjurmarg East, Mumbai | Dr. Samruddha Desai",
  description: "Dr. Samruddha Desai, Consultant Physician & Diabetologist in Kanjurmarg East, Mumbai. Diabetes, thyroid, BP and general physician care opposite Runwal Bliss main gate.",
  path: "/",
});

const WHY = [
  { n: "01", Icon: StethoscopeIcon, title: "Clear Diagnosis", text: "Careful history-taking and relevant tests to reach an accurate diagnosis, explained in plain language." },
  { n: "02", Icon: ChatIcon, title: "Patient Communication", text: "Every diagnosis and treatment option explained clearly, so you understand the why, not just the what." },
  { n: "03", Icon: CompassIcon, title: "Personalized Chronic Care", text: "Diabetes care plans built around your daily routine, diet and work schedule." },
  { n: "04", Icon: ClipboardIcon, title: "Consistent Follow-up", text: "Structured follow-up visits and a written plan, so your care continues beyond a single consultation." },
];

const FACTS = [
  { k: "Qualification", v: "MBBS, FCPS Medicine, CCGDM" },
  { k: "Registration", v: `${MMC.council}, Reg. No. ${MMC.number}` },
  { k: "Focus areas", v: "Diabetes" },
  { k: "Clinic since", v: "2026" },
];

const GLANCE = [
  { value: EXPERIENCE.years, label: EXPERIENCE.text },
  { value: String(ALL_LOCATIONS.length), label: "clinics in Mumbai" },
  { value: MAIN.weekly.daysShort, label: "consultations" },
  { value: "MMC registered", label: `Reg. No. ${MMC.number}` },
];

const STEPS = [
  { n: "1", title: "Call or WhatsApp to book. Walk-ins are also seen.", text: <>Every enquiry goes straight to the clinic, with no booking form or portal. Call or WhatsApp <span className="whitespace-nowrap">{PHONE.display}</span>.</> },
  { n: "2", title: "Consultation with clear explanations", text: "Careful history-taking and relevant tests, with every diagnosis and treatment option explained in plain language." },
  { n: "3", title: "A written plan and a follow-up date", text: "You leave with a written plan, and structured follow-up visits keep your care going beyond a single consultation." },
];

export default function HomePage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", path: "/" }]} />
      {/* HERO */}
      <section className="on-dark relative overflow-hidden bg-teal-950 text-white" aria-labelledby="hero-heading">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,#0f5a50_0%,transparent_70%)]" />
        <div className="container-page relative grid items-center gap-8 py-12 md:grid-cols-[1fr_220px] md:py-14 lg:grid-cols-[1fr_250px]">
          <div className="order-2 md:order-1">
            <p className="inline-flex max-w-full items-start gap-2 rounded-full bg-white/10 px-4 py-2 text-[14px] font-bold uppercase tracking-wide text-mint sm:text-[15px]">
              <MedicalCrossIcon className="mt-0.5 shrink-0" />
              Diabetes &amp; General Medicine Clinic · Kanjurmarg (East)
            </p>
            <p className="mt-5 text-[18px] font-bold uppercase text-mint lg:text-[20px]">{SITE.doctorName}</p>
            <p className="mt-3 text-[16px] font-bold">MBBS <span className="mx-1.5">|</span> FCPS Medicine <span className="mx-1.5">|</span> CCGDM</p>
            <h1 id="hero-heading" className="mt-4 text-display font-bold">
              Expert diabetes &amp; general medicine care, <span className="text-mint-strong">built around you</span>
            </h1>
            <p className="mt-4 max-w-[600px] text-lead text-teal-50/90">
              Consultant Physician and Diabetologist, {EXPERIENCE.years} {EXPERIENCE.text}. Clear diagnosis, honest explanations, and a treatment plan that fits your daily life, not the other way around.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CallButton variant="white" />
              <WhatsAppButton variant="outline-light" label="WhatsApp Us" href={WA_GENERAL} />
            </div>
            <p className="mt-4 text-[16px] text-mint">Consultation fee: {FEES.first} (first visit), {FEES.followUp} (follow-up)</p>
          </div>
          <div className="order-1 mx-auto w-[210px] md:order-2 md:w-full md:max-w-none">
            <ImageSlot slot="home-hero" rounded="rounded-[12px]" className="border-[4px] border-white shadow-xl" priority />
          </div>
        </div>
      </section>

      {/* ABOUT THE DOCTOR */}
      <section className="bg-white py-12" aria-labelledby="about-heading">
        <div className="container-page grid gap-8 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[15px] font-bold uppercase tracking-wide text-teal-800">About the doctor</p>
            <h2 id="about-heading" className="mt-1 text-h2 font-bold">{SITE.doctorName}</h2>
            <p className="mt-3 max-w-[640px] text-lead text-body">
              MBBS, FCPS Medicine (Rajawadi Hospital, Mumbai), CCGDM (PHFI Chennai). Registered with the Maharashtra Medical Council (MMC), Reg. No. {MMC.number}. Practises general medicine with a focus on diabetes care.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            {FACTS.map((f) => (
              <div key={f.k} className="min-h-[130px] rounded-[10px] border border-line bg-white p-4">
                <dt className="text-[18px] font-bold text-ink">{f.k}</dt>
                <dd className="mt-1 text-[16px] text-body">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* TAGLINE BAND */}
      <section className="on-dark bg-teal-800 py-9 text-center text-white" aria-label="Our approach">
        <p className="container-page text-center text-h2 font-bold !max-w-[980px]">
          Every plan is <span className="text-mint">built around you</span>: your routine, your food, your work, your follow-up.
        </p>
      </section>

      {/* SERVICES */}
      <section className="bg-cream py-12" aria-labelledby="services-heading">
        <div className="container-page">
          <p className="text-center text-[15px] font-bold uppercase tracking-wide text-teal-800">Services</p>
          <h2 id="services-heading" className="mt-1 text-center text-h2 font-bold">What we treat</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_SERVICES.map((s) => <ServiceCard key={s.slug} service={s} cols={3} />)}
          </ul>
          <p className="mt-6 text-center">
            <Link href="/services" className="text-[17px] font-bold text-teal-800 hover:underline">See all services →</Link>
          </p>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="border-y border-line bg-white py-8" aria-labelledby="glance-heading">
        <div className="container-page">
          <h2 id="glance-heading" className="sr-only">At a glance</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 text-center lg:grid-cols-4" data-glance>
            {GLANCE.map((g) => (
              <li key={g.value} className="px-2">
                <p className="text-h2 font-extrabold text-teal-800">{g.value}</p>
                <p className="mt-1 text-[15px] leading-snug text-body">{g.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-white py-12" aria-labelledby="why-heading">
        <div className="container-page">
          <p className="text-center text-[15px] font-bold uppercase tracking-wide text-teal-800">Why choose Dr. Desai</p>
          <h2 id="why-heading" className="mt-1 text-center text-h2 font-bold">Care Built On Clarity &amp; Consistency</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ n, Icon, title, text }) => (
              <li key={n} className="rounded-[10px] border border-line bg-white p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-800 text-white"><Icon className="h-[18px] w-[18px]" /></span>
                <span className="mt-1 inline-block rounded-full bg-teal-950 px-2.5 py-0.5 text-[13px] font-bold text-mint">{n}</span>
                <h3 className="mt-1 text-[18px] font-bold">{title}</h3>
                <p className="mt-1 text-copy text-body">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW A VISIT WORKS */}
      <section className="bg-cream py-12" aria-labelledby="visit-heading">
        <div className="container-page">
          <p className="text-center text-[15px] font-bold uppercase tracking-wide text-teal-800">Your visit</p>
          <h2 id="visit-heading" className="mt-1 text-center text-h2 font-bold">How a visit works</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3" data-visit-steps>
            {STEPS.map((st) => (
              <li key={st.n} className="rounded-[10px] border border-line bg-white p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-950 text-[17px] font-bold text-mint" aria-hidden="true">{st.n}</span>
                <h3 className="mt-2 text-[18px] font-bold leading-snug lg:text-[19px]"><span className="sr-only">Step {st.n}: </span>{st.title}</h3>
                <p className="mt-1 text-copy text-body">{st.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-[17px] font-bold text-ink">
            Consultation fee at the main clinic: {FEES.first} first visit, {FEES.followUp} follow-up.
          </p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="on-dark bg-teal-800 py-12 text-center text-white" aria-labelledby="cta-heading">
        <div className="container-page !max-w-[860px]">
          <h2 id="cta-heading" className="text-h2 font-bold">Ready to book your visit?</h2>
          <p className="mt-2 text-lead text-teal-50/90">Call or WhatsApp {PHONE.display}. Every enquiry goes straight to the clinic.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CallButton variant="white" />
            <WhatsAppButton variant="outline-light" label="WhatsApp Us" href={WA_GENERAL} />
          </div>
        </div>
      </section>
    </>
  );
}

import { ImageSlot } from "@/components/ImageSlot";
import { FaqSection } from "@/components/Faq";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/Buttons";
import { BuildingIcon, CalendarIcon, CapIcon, ClockIcon, ScrollIcon } from "@/components/Icons";
import { ABOUT_FAQS } from "@/config/faqs";
import { MMC, SITE } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Dr. Samruddha Desai | Diabetologist & Physician Mumbai",
  description: "Meet Dr. Samruddha Desai, Consultant Physician & Diabetologist (MBBS, FCPS Medicine, CCGDM) practising general medicine and diabetes care in Kanjurmarg East, Mumbai.",
  path: "/about",
});

export default function AboutPage() {
  const cards = [
    { Icon: CapIcon, k: "Qualifications", v: <>MBBS, FCPS Medicine, CCGDM</> },
    { Icon: BuildingIcon, k: "Registration", v: <>{MMC.council}, Reg. No. {MMC.number}</> },
    { Icon: ClockIcon, k: "Experience", v: <>6 years in internal medicine &amp; diabetology</> },
    { Icon: CalendarIcon, k: "Clinic established", v: <>2026</> },
    { Icon: ScrollIcon, k: "Currently pursuing", v: <>Certification Course in Diabetes, Royal College of Physicians (UK)</> },
  ];
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <section className="on-dark relative overflow-hidden bg-teal-950 py-10 text-center text-white" aria-labelledby="about-h1">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,#0f5a50_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-9">
          <p className="text-[15px] font-bold uppercase tracking-wide text-mint">About</p>
          <h1 id="about-h1" className="mt-1 text-[26px] font-bold">{SITE.doctorName}</h1>
          <p className="mt-1 text-[17px] font-bold text-teal-50/90">{SITE.doctorTitle} · Kanjurmarg (East), Mumbai</p>
        </div>
      </section>

      <section className="bg-cream py-10">
        <div className="mx-auto max-w-[1008px] px-5 sm:px-9">
          <div className="grid gap-6 md:grid-cols-[160px_1fr]">
            <div className="mx-auto w-[160px]">
              <ImageSlot ratio="132 / 135" alt={`${SITE.doctorName} at the consulting desk`} label="Doctor photo" rounded="rounded-[10px]" className="border-[4px] border-teal-800" priority />
            </div>
            <div>
              <h2 className="text-[20px] font-bold">A clinic built around clear, patient-first care</h2>
              <p className="mt-3 text-[17px] leading-[1.8] text-body">
                Consultant Physician and Diabetologist, MBBS, FCPS Medicine (Rajawadi Hospital, Mumbai), CCGDM (PHFI Chennai). 6 years in internal medicine, with a focus on diabetes management. Registered with the Maharashtra Medical Council (MMC), Reg. No. {MMC.number}.
              </p>
              <p className="mt-3 text-[17px] leading-[1.8] text-body">
                Consults at {SITE.clinicName}, focused on clear explanations and treatment plans built around each patient&apos;s daily routine.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["Diabetes", "General Medicine"].map((t) => (
                  <li key={t} className="rounded-md border border-line bg-white px-3 py-1.5 text-[16px] font-bold text-teal-800">{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ Icon, k, v }) => (
              <li key={k} className="rounded-[10px] border border-line bg-white p-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-800 text-white"><Icon className="h-4 w-4" /></span>
                <h3 className="mt-2 text-[17px] font-bold leading-snug">{k}</h3>
                <p className="mt-1 text-[16px] leading-[1.6] text-body">{v}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-[10px] border border-line bg-note p-5">
            <h2 className="text-[18px] font-bold">Our approach</h2>
            <p className="mt-2 text-[16px] leading-[1.8] text-body">
              Every visit starts with a careful history and relevant tests, not a rushed prescription. Diagnosis and treatment choices are explained in plain language, and chronic conditions like diabetes are managed with a plan that fits daily routine, diet and work, reviewed and adjusted at each follow-up.
            </p>
          </div>
          <div className="mt-6 flex justify-center"><CallButton /></div>
        </div>
      </section>
      <FaqSection faqs={ABOUT_FAQS} />
    </>
  );
}

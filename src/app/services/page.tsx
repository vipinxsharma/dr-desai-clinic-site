import { ImageSlot } from "@/components/ImageSlot";
import { ServiceCard } from "@/components/ServiceCard";
import { FaqSection } from "@/components/Faq";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SERVICES_FAQS } from "@/config/faqs";
import { SERVICES } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Diabetes, Thyroid & General Medicine Services | Kanjurmarg East",
  description: "Diabetes management, gestational diabetes, hypertension, thyroid, ECG, lab tests, injections and preventive check-ups with a general physician in Kanjurmarg East, Mumbai.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <section className="bg-cream py-8" aria-labelledby="services-h1">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-9">
          <ImageSlot ratio="740 / 163" alt="Doctor checking a patient's blood pressure" label="Services banner photo" rounded="rounded-[12px]" priority />
          <h1 id="services-h1" className="mt-8 text-center text-[26px] font-bold">Services &amp; Areas of Expertise</h1>
          <p className="mt-2 text-center text-[17px] text-body">Everything the clinic treats and offers, in one place.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </ul>
          <div className="mt-6 rounded-[10px] border border-line bg-note px-5 py-4 text-center">
            <h2 className="text-[18px] font-bold">Personalized nutrition guidance</h2>
            <p className="mt-1 text-[17px] leading-[1.7] text-body">Our in-clinic dietitian and nutritionist work with Dr. Desai to build diet plans tailored to each patient, rather than a one-size-fits-all chart.</p>
          </div>
        </div>
      </section>
      <FaqSection faqs={SERVICES_FAQS} />
    </>
  );
}

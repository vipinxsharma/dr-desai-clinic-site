import { ImageSlot } from "@/components/ImageSlot";
import { ServiceCard } from "@/components/ServiceCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
        <div className="container-page">
          <ImageSlot slot="services-banner" className="fx-reveal" rounded="rounded-[12px]" priority />
          <h1 id="services-h1" className="fx-reveal mt-8 text-center text-title font-bold">Services &amp; Areas of Expertise</h1>
          <p className="mt-2 text-center text-lead text-body">Everything the clinic treats and offers, in one place.</p>
          <ul className="fx-grid mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </ul>
          <div className="fx-reveal mt-6 rounded-[10px] border border-line bg-note px-5 py-4 text-center">
            <h2 className="text-[18px] font-bold">Personalized nutrition guidance</h2>
            <p className="mt-1 text-lead text-body">Our in-clinic dietitian and nutritionist work with Dr. Desai to build diet plans tailored to each patient, rather than a one-size-fits-all chart.</p>
          </div>
        </div>
      </section>
    </>
  );
}

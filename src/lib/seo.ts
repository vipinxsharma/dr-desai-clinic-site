import type { Metadata } from "next";
import { ADDRESS, PHONE, SITE, SOCIAL, TIMINGS } from "@/config/site";
import type { Faq } from "@/config/faqs";

export function pageMetadata(opts: { title: string; description: string; path: string }): Metadata {
  const url = `${SITE.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.clinicName,
      locale: "en_IN",
      type: "website",
    },
  };
}

const clinicId = `${SITE.url}/#clinic`;
const doctorId = `${SITE.url}/#physician`;
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function clinicSchema() {
  const confirmedSocial = SOCIAL.filter((s) => s.confirmed).map((s) => s.href);
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": clinicId,
    name: SITE.clinicName,
    url: SITE.url,
    telephone: PHONE.tel,
    medicalSpecialty: ["https://schema.org/Endocrine", "https://schema.org/PrimaryCare"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${ADDRESS.line}, ${ADDRESS.landmark}`,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    areaServed: ["Kanjurmarg", "Kanjurmarg East", "Mumbai"],
    openingHoursSpecification: TIMINGS.schema.map((t) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS,
      opens: t.opens,
      closes: t.closes,
    })),
    employee: { "@id": doctorId },
    // sameAs only once real handles are confirmed in src/config/site.ts
    ...(confirmedSocial.length ? { sameAs: confirmedSocial } : {}),
  };
}

export function physicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": doctorId,
    name: SITE.doctorName,
    jobTitle: SITE.doctorTitle,
    url: `${SITE.url}/about`,
    telephone: PHONE.tel,
    medicalSpecialty: ["https://schema.org/Endocrine", "https://schema.org/PrimaryCare"],
    worksFor: { "@id": clinicId },
    knowsAbout: ["Diabetes", "Gestational diabetes", "Hypertension", "Thyroid disorders", "General medicine"],
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path}`,
    })),
  };
}

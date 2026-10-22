import type { Metadata } from "next";
import { BRANCHES, MAIN, MMC, PHONE, SITE, SOCIAL, type Location } from "@/config/site";
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

function postalAddress(loc: Location) {
  const a = loc.address;
  return {
    "@type": "PostalAddress",
    streetAddress: a.street,
    addressLocality: a.city,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  };
}

function hoursSpec(loc: Location) {
  return loc.weekly.slots.map((t) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: DAYS,
    opens: t.opens,
    closes: t.closes,
  }));
}

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
    address: postalAddress(MAIN),
    areaServed: ["Kanjurmarg", "Kanjurmarg East", "Mumbai"],
    openingHoursSpecification: hoursSpec(MAIN),
    employee: { "@id": doctorId },
    // sameAs only once real handles are confirmed in src/config/site.ts
    ...(confirmedSocial.length ? { sameAs: confirmedSocial } : {}),
  };
}

function workLocation(loc: Location) {
  return {
    "@type": "Place",
    name: loc.name,
    address: postalAddress(loc),
    openingHoursSpecification: hoursSpec(loc),
    // Sunday by appointment is a text note, never openingHours.
    ...(loc.sunday.status === "appointment" ? { description: `Sunday: ${loc.sunday.text}.` } : {}),
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
    identifier: {
      "@type": "PropertyValue",
      name: "Maharashtra Medical Council registration number",
      value: MMC.number,
    },
    medicalSpecialty: ["https://schema.org/Endocrine", "https://schema.org/PrimaryCare"],
    worksFor: { "@id": clinicId },
    workLocation: BRANCHES.map(workLocation),
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

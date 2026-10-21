/**
 * Single source of truth for every fact shown on the site.
 * Anything marked PLACEHOLDER is intentionally unknown: it renders as a dashed
 * placeholder in the UI and is NEVER emitted into JSON-LD / llms.txt.
 */

export const SITE = {
  // TODO(domain): confirm production domain; canonical, sitemap and schema derive from this.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.drdesaiclinic.in").replace(/\/$/, ""),
  clinicName: "Dr. Desai's Health Clinic and Diabetes Center",
  doctorName: "Dr. Samruddha Desai",
  doctorTitle: "Consultant Physician & Diabetologist",
  qualifications: "MBBS, FCPS Medicine, CCGDM",
  locale: "en-IN",
} as const;

/** The ONE phone number. Enforced by scripts/check-phone.mjs + tests/phone.test.ts. */
export const PHONE = {
  display: "+91 88305 31546",
  tel: "+918830531546",
  whatsapp: "918830531546",
} as const;

export const ADDRESS = {
  landmark: "Opp. Runwal Bliss main gate",
  line: "1/5, Jerry Villa, Gomes Colony",
  area: "Kanjurmarg (East), Mumbai",
  locality: "Kanjurmarg East",
  city: "Mumbai",
  region: "Maharashtra",
  postalCode: "400042",
  country: "IN",
} as const;

export const TIMINGS = {
  monSat: "Monday to Saturday: 9:30–11:30 am & 8:00–10:00 pm",
  // Schema-safe structured hours (Mon–Sat only; Sunday unknown).
  schema: [
    { opens: "09:30", closes: "11:30" },
    { opens: "20:00", closes: "22:00" },
  ],
} as const;

export const FEES = { first: "₹500", followUp: "₹300" } as const;

/** Unknown facts. UI shows a dashed placeholder; never put these in schema. */
export const PLACEHOLDERS = {
  mmc: "MMC REGISTRATION NUMBER",
  email: "CLINIC EMAIL",
  sunday: "Closed / timing",
} as const;

export const MAP = {
  title: "Map showing Dr. Desai's Health Clinic and Diabetes Center, opposite Runwal Bliss, Kanjurmarg East, Mumbai",
  embedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Opp. Runwal Bliss main gate, Kanjurmarg East, Mumbai 400042") +
    "&output=embed",
  openUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Opp. Runwal Bliss main gate, Kanjurmarg East, Mumbai 400042"),
} as const;

export type Branch = {
  slug: string;
  name: string;
  fee: string;
  distance: string;
};

/** Addresses and timings for these are unknown → dashed placeholders. */
export const BRANCHES: Branch[] = [
  { slug: "nahar", name: "Nahar Medical Center", fee: "₹1,100", distance: "~6 km from clinic" },
  { slug: "powai", name: "Powai Polyclinic & Hospital", fee: "₹500", distance: "~3 km from clinic" },
];

/**
 * SOCIAL LINKS — PLACEHOLDERS.
 * TODO(social): swap each href for the real handle once confirmed, then set
 * `confirmed: true`. Only confirmed links are allowed into JSON-LD `sameAs`.
 */
export const SOCIAL = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/", confirmed: false },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/", confirmed: false },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/", confirmed: false },
] as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact & Visit Us" },
] as const;

export const telHref = `tel:${PHONE.tel}`;

export function waHref(message: string) {
  return `https://wa.me/${PHONE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WA_GENERAL = waHref(`Hello ${SITE.doctorName}, I would like to book an appointment.`);

export function waBranchHref(branchName: string) {
  return waHref(`Hello ${SITE.doctorName}, I would like to book an appointment at ${branchName}.`);
}

export type Service = { slug: string; name: string; image?: { alt: string } };

export const SERVICES: Service[] = [
  { slug: "diabetes", name: "Diabetes Management & Insulin Therapy", image: { alt: "Glucometer and insulin pen for diabetes management" } },
  { slug: "gdm", name: "Gestational Diabetes (GDM)", image: { alt: "Pregnant woman checking blood sugar for gestational diabetes" } },
  { slug: "hypertension", name: "Hypertension & Cardiovascular Risk Management", image: { alt: "Blood pressure monitor for hypertension care" } },
  { slug: "thyroid", name: "Thyroid and Hormonal Disorders Consultation", image: { alt: "Thyroid and hormonal disorder consultation" } },
  { slug: "nebulization", name: "Nebulization", image: { alt: "Nebulizer mask for respiratory treatment" } },
  { slug: "general", name: "General Physician Consultation", image: { alt: "Stethoscope and notes for general physician consultation" } },
  { slug: "iv-im", name: "IV / IM Injections & IV Drips", image: { alt: "Nurse preparing an injection" } },
  { slug: "weight", name: "Weight Loss Management & Injections", image: { alt: "Measuring tape for weight loss management" } },
  { slug: "infectious", name: "Infectious Diseases & Fever Management" },
  { slug: "respiratory", name: "Respiratory Diseases" },
  { slug: "preventive", name: "Preventive Health Check-ups" },
  { slug: "fitness", name: "Medical Fitness Certificates & Pre-operative Evaluation" },
  { slug: "ecg", name: "ECG" },
  { slug: "lab", name: "Laboratory Services" },
  { slug: "home-sample", name: "Home Blood Sample Collection" },
];

export const HOME_SERVICES = SERVICES.filter((s) => ["diabetes", "gdm", "hypertension", "general"].includes(s.slug));

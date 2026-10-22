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

/** Maharashtra Medical Council registration. Defined once; shown in header, Home, About; in Physician JSON-LD. */
export const MMC = {
  council: "Maharashtra Medical Council",
  number: "2016040659",
} as const;

/** The ONE phone number. Enforced by scripts/check-phone.mjs + tests/phone.test.ts. */
export const PHONE = {
  display: "+91 88305 31546",
  tel: "+918830531546",
  whatsapp: "918830531546",
} as const;

export const FEES = { first: "₹500", followUp: "₹300" } as const;

/** Unknown facts. UI shows a dashed placeholder; never put these in schema. */
export const PLACEHOLDERS = {
  email: "CLINIC EMAIL",
  sunday: "Closed / timing",
} as const;

export type Slot = { opens: string; closes: string };

export type Location = {
  slug: "main" | "nahar" | "powai";
  name: string;
  /** Short place label for copy, e.g. "Powai". */
  place: string;
  address: {
    /** Key landmark; only the main clinic has one rendered as the big bold line. */
    landmark?: string;
    /** Display lines, top to bottom. */
    lines: readonly string[];
    street: string;
    locality: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    /** Single-line form; also the Google Maps search text. */
    oneLine: string;
  };
  weekly: {
    days: string;
    /** Human text, e.g. "9:30 am to 11:30 am and 8:00 pm to 10:00 pm". */
    text: string;
    /** Machine hours for Mon-Sat (JSON-LD openingHoursSpecification). */
    slots: readonly Slot[];
  };
  sunday: { status: "unconfirmed" } | { status: "appointment"; text: string } | { status: "none" };
  /** TODO(confirm): fee + distance carried over from the mockup, not re-verified with the clinic. */
  fee?: string;
  distance?: string;
};

export const LOCATIONS: Record<Location["slug"], Location> = {
  main: {
    slug: "main",
    name: "Dr. Desai's Health Clinic and Diabetes Center",
    place: "Kanjurmarg",
    address: {
      landmark: "Opp. Runwal Bliss main gate",
      lines: ["Opp. Runwal Bliss main gate", "1/5, Jerry Villa, Gomes Colony", "Kanjurmarg (East), Mumbai – 400042"],
      street: "1/5, Jerry Villa, Gomes Colony, Opp. Runwal Bliss main gate, Kanjurmarg (East)",
      locality: "Kanjurmarg East",
      city: "Mumbai",
      region: "Maharashtra",
      postalCode: "400042",
      country: "IN",
      oneLine: "1/5, Jerry Villa, Gomes Colony, Opp. Runwal Bliss main gate, Kanjurmarg (East), Mumbai 400042",
    },
    weekly: {
      days: "Monday to Saturday",
      text: "9:30 am to 11:30 am and 8:00 pm to 10:00 pm",
      slots: [
        { opens: "09:30", closes: "11:30" },
        { opens: "20:00", closes: "22:00" },
      ],
    },
    // Sunday not confirmed → dashed placeholder in UI, absent from schema.
    sunday: { status: "unconfirmed" },
  },
  nahar: {
    slug: "nahar",
    name: "Nahar Medical Center",
    place: "Chandivali",
    address: {
      lines: ["Nahar Amrit Shakti, off Saki Vihar Road", "Chandivali, Andheri East, Mumbai 400072"],
      street: "Nahar Amrit Shakti, off Saki Vihar Road, Chandivali, Andheri East",
      locality: "Chandivali",
      city: "Mumbai",
      region: "Maharashtra",
      postalCode: "400072",
      country: "IN",
      oneLine: "Nahar Amrit Shakti, off Saki Vihar Road, Chandivali, Andheri East, Mumbai 400072",
    },
    weekly: {
      days: "Monday to Saturday",
      text: "12:00 pm to 2:00 pm and 6:00 pm to 7:30 pm",
      slots: [
        { opens: "12:00", closes: "14:00" },
        { opens: "18:00", closes: "19:30" },
      ],
    },
    sunday: { status: "appointment", text: "By appointment only, 11:00 am to 1:00 pm" },
    // TODO(confirm): fee and distance from the mockup.
    fee: "₹1,100",
    distance: "~6 km from clinic",
  },
  powai: {
    slug: "powai",
    name: "Powai Polyclinic & Hospital",
    place: "Powai",
    address: {
      lines: ["19/A, Opp. I.I.T. Main Gate Rd, near South Indian Bank", "Powai, Mumbai, Maharashtra 400076"],
      street: "19/A, Opp. I.I.T. Main Gate Rd, near South Indian Bank",
      locality: "Powai",
      city: "Mumbai",
      region: "Maharashtra",
      postalCode: "400076",
      country: "IN",
      oneLine: "19/A, Opp. I.I.T. Main Gate Rd, near South Indian Bank, Powai, Mumbai, Maharashtra 400076",
    },
    weekly: {
      days: "Monday to Saturday",
      text: "4:00 pm to 5:30 pm",
      slots: [{ opens: "16:00", closes: "17:30" }],
    },
    sunday: { status: "none" },
    // TODO(confirm): fee and distance from the mockup.
    fee: "₹500",
    distance: "~3 km from clinic",
  },
};

export const MAIN = LOCATIONS.main;
/** Display order on Contact & Visit Us (matches the mockup: 01 Nahar, 02 Powai). */
export const BRANCHES: Location[] = [LOCATIONS.nahar, LOCATIONS.powai];
export const ALL_LOCATIONS: Location[] = [LOCATIONS.main, ...BRANCHES];

/** Google Maps search URL from an address. No API key needed. */
export function directionsHref(loc: Location) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(loc.address.oneLine);
}

export const MAP = {
  title: "Map showing Dr. Desai's Health Clinic and Diabetes Center, opposite Runwal Bliss, Kanjurmarg East, Mumbai",
  embedUrl: (loc: Location) => "https://www.google.com/maps?q=" + encodeURIComponent(loc.address.oneLine) + "&output=embed",
};

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

/** Prefilled WhatsApp booking message naming THAT location. */
export function waLocationHref(loc: Location) {
  return waHref(`Hi, I would like to book an appointment at ${loc.name}.`);
}

/**
 * IMAGE SLOTS: single registry. Every slot has a fixed size/ratio, so adding the file never shifts layout.
 * Drop the file at public/images/<file> (exact name; .jpg/.jpeg/.png/.webp variants of the same name also work).
 * Missing file => dashed placeholder, build never fails. No code change needed.
 * `position` is the crop point inside the fixed box (object-position); tune per image.
 */
export type ImageSlotDef = {
  id: string;
  page: string;
  name: string;
  /** Short caption inside the dashed placeholder. */
  label: string;
  /** Path under public/images/. */
  file: string;
  /** Recommended upload size in pixels. Ratio is always width / height. */
  width: number;
  height: number;
  position: string;
  alt: string;
};

export const IMAGE_SLOTS: ImageSlotDef[] = [
  { id: "home-hero", page: "Home", name: "Hero doctor photo", label: "Doctor photo", file: "doctor/hero-doctor.jpg", width: 540, height: 618, position: "center", alt: `Portrait of ${SITE.doctorName}, ${SITE.doctorTitle}` },
  { id: "about-doctor", page: "About", name: "About doctor photo", label: "Doctor photo", file: "doctor/about-doctor.jpg", width: 396, height: 405, position: "center", alt: `${SITE.doctorName} at the consulting desk` },
  { id: "services-banner", page: "Services", name: "Services banner", label: "Services banner photo", file: "banners/services-banner.jpg", width: 1480, height: 326, position: "center", alt: "Doctor checking a patient's blood pressure" },
  { id: "svc-diabetes", page: "Home, Services", name: "Service card: Diabetes Management & Insulin Therapy", label: "Diabetes", file: "services/diabetes-management.jpg", width: 525, height: 204, position: "center", alt: "Glucometer and insulin pen for diabetes management" },
  { id: "svc-gdm", page: "Home, Services", name: "Service card: Gestational Diabetes (GDM)", label: "Gestational", file: "services/gestational-diabetes.jpg", width: 525, height: 204, position: "center", alt: "Pregnant woman checking blood sugar for gestational diabetes" },
  { id: "svc-hypertension", page: "Home, Services", name: "Service card: Hypertension & Cardiovascular Risk", label: "Hypertension", file: "services/hypertension.jpg", width: 525, height: 204, position: "center top", alt: "Blood pressure monitor for hypertension care" },
  { id: "svc-thyroid", page: "Services", name: "Service card: Thyroid and Hormonal Disorders", label: "Thyroid", file: "services/thyroid.jpg", width: 525, height: 204, position: "center 62%", alt: "Thyroid and hormonal disorder consultation" },
  { id: "svc-nebulization", page: "Services", name: "Service card: Nebulization", label: "Nebulization", file: "services/nebulization.jpg", width: 525, height: 204, position: "center", alt: "Nebulizer mask for respiratory treatment" },
  { id: "svc-general", page: "Home, Services", name: "Service card: General Physician Consultation", label: "General", file: "services/general-physician.jpg", width: 525, height: 204, position: "center 12%", alt: "Stethoscope and notes for general physician consultation" },
  { id: "svc-iv-im", page: "Services", name: "Service card: IV / IM Injections & IV Drips", label: "IV / IM", file: "services/iv-im-injections.jpg", width: 525, height: 204, position: "center 0%", alt: "Nurse preparing an injection" },
  { id: "svc-weight", page: "Services", name: "Service card: Weight Loss Management & Injections", label: "Weight loss", file: "services/weight-loss.jpg", width: 525, height: 204, position: "center 55%", alt: "Measuring tape for weight loss management" },
  { id: "logo", page: "All (header)", name: "Logo", label: "Logo", file: "brand/logo.png", width: 156, height: 156, position: "center", alt: `${SITE.clinicName} logo` },
  { id: "favicon", page: "All (browser tab)", name: "Favicon", label: "Favicon", file: "brand/favicon.png", width: 512, height: 512, position: "center", alt: `${SITE.clinicName} icon` },
  { id: "og-share", page: "All (social share / OG)", name: "OG share image", label: "Share image", file: "og/share.jpg", width: 1200, height: 630, position: "center", alt: `${SITE.clinicName}, Kanjurmarg East, Mumbai` },
];

export type ImageSlotId = (typeof IMAGE_SLOTS)[number]["id"];

export function getSlot(id: string): ImageSlotDef {
  const slot = IMAGE_SLOTS.find((s) => s.id === id);
  if (!slot) throw new Error(`Unknown image slot: ${id}`);
  return slot;
}

/** Branch locations use live Google Maps embeds (no image slots). */
export type Service = { slug: string; name: string; /** Image slot id; absent = text-only card. */ imageSlot?: string };

export const SERVICES: Service[] = [
  { slug: "diabetes", name: "Diabetes Management & Insulin Therapy", imageSlot: "svc-diabetes" },
  { slug: "gdm", name: "Gestational Diabetes (GDM)", imageSlot: "svc-gdm" },
  { slug: "hypertension", name: "Hypertension & Cardiovascular Risk Management", imageSlot: "svc-hypertension" },
  { slug: "thyroid", name: "Thyroid and Hormonal Disorders Consultation", imageSlot: "svc-thyroid" },
  { slug: "nebulization", name: "Nebulization", imageSlot: "svc-nebulization" },
  { slug: "general", name: "General Physician Consultation", imageSlot: "svc-general" },
  { slug: "iv-im", name: "IV / IM Injections & IV Drips", imageSlot: "svc-iv-im" },
  { slug: "weight", name: "Weight Loss Management & Injections", imageSlot: "svc-weight" },
  { slug: "infectious", name: "Infectious Diseases & Fever Management" },
  { slug: "respiratory", name: "Respiratory Diseases" },
  { slug: "preventive", name: "Preventive Health Check-ups" },
  { slug: "fitness", name: "Medical Fitness Certificates & Pre-operative Evaluation" },
  { slug: "ecg", name: "ECG" },
  { slug: "lab", name: "Laboratory Services" },
  { slug: "home-sample", name: "Home Blood Sample Collection" },
];

export const HOME_SERVICES = SERVICES.filter((s) => ["diabetes", "gdm", "hypertension", "general"].includes(s.slug));

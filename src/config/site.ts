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

export type Service = { slug: string; name: string; image?: { alt: string; src?: string; position?: string } };

export const SERVICES: Service[] = [
  { slug: "diabetes", name: "Diabetes Management & Insulin Therapy", image: { alt: "Glucometer and insulin pen for diabetes management" } },
  { slug: "gdm", name: "Gestational Diabetes (GDM)", image: { alt: "Pregnant woman checking blood sugar for gestational diabetes" } },
  { slug: "hypertension", name: "Hypertension & Cardiovascular Risk Management", image: { alt: "Blood pressure monitor for hypertension care", src: "/images/services/hypertension.jpg", position: "center top" } },
  { slug: "thyroid", name: "Thyroid and Hormonal Disorders Consultation", image: { alt: "Thyroid and hormonal disorder consultation", src: "/images/services/thyroid.jpg", position: "center 62%" } },
  { slug: "nebulization", name: "Nebulization", image: { alt: "Nebulizer mask for respiratory treatment" } },
  { slug: "general", name: "General Physician Consultation", image: { alt: "Stethoscope and notes for general physician consultation", src: "/images/services/general-physician.jpg", position: "center 12%" } },
  { slug: "iv-im", name: "IV / IM Injections & IV Drips", image: { alt: "Nurse preparing an injection", src: "/images/services/iv-im-injections.jpg", position: "center 0%" } },
  { slug: "weight", name: "Weight Loss Management & Injections", image: { alt: "Measuring tape for weight loss management", src: "/images/services/weight-loss.jpg", position: "center 55%" } },
  { slug: "infectious", name: "Infectious Diseases & Fever Management" },
  { slug: "respiratory", name: "Respiratory Diseases" },
  { slug: "preventive", name: "Preventive Health Check-ups" },
  { slug: "fitness", name: "Medical Fitness Certificates & Pre-operative Evaluation" },
  { slug: "ecg", name: "ECG" },
  { slug: "lab", name: "Laboratory Services" },
  { slug: "home-sample", name: "Home Blood Sample Collection" },
];

export const HOME_SERVICES = SERVICES.filter((s) => ["diabetes", "gdm", "hypertension", "general"].includes(s.slug));

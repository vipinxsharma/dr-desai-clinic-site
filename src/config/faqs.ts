import { FEES, LOCATIONS, MMC, PHONE, SITE } from "./site";

/**
 * Single source for the visible FAQ accordion AND the FAQPage JSON-LD.
 * - kind 'fact': answers use ONLY confirmed data from site.ts. Never invent policies.
 * - kind 'medical': general education only; needsDoctorReview must stay true until the doctor signs off.
 * `needsDoctorReview` is internal: never rendered, never in schema.
 */
export type Faq = {
  q: string;
  a: string;
  kind: "fact" | "medical";
  needsDoctorReview: boolean;
};

const { main, nahar, powai } = LOCATIONS;
const call = `call or WhatsApp ${PHONE.display}`;
const fact = (q: string, a: string): Faq => ({ q, a, kind: "fact", needsDoctorReview: false });
const medical = (q: string, a: string): Faq => ({ q, a, kind: "medical", needsDoctorReview: true });

const mainTimings = `${main.weekly.days}, ${main.weekly.text}`;

const Q_TIMINGS = fact(
  "What are the clinic timings in Kanjurmarg East?",
  `The Kanjurmarg clinic is open ${mainTimings}. Sunday timing is not confirmed yet, so please ${call} to check before you visit. Timings for the Powai and Chandivali locations are listed on the Contact & Visit Us page.`,
);

const Q_OTHER_LOCATIONS = fact(
  "Where else does Dr. Desai consult?",
  `Besides the Kanjurmarg clinic, Dr. Desai consults at ${powai.name} near the I.I.T. main gate in ${powai.place}, and at ${nahar.name} in ${nahar.place}, Andheri East. Each location has its own timings, a Get Directions link and a Book on WhatsApp button on the Contact & Visit Us page.`,
);

const Q_FEES = fact(
  "What is the consultation fee?",
  `The consultation fee at the Kanjurmarg clinic is ${FEES.first} for a first visit and ${FEES.followUp} for a follow-up visit. Fees at the other locations may differ, so please ${call} to confirm before you go. Booking is by phone or WhatsApp only; there is no online booking calendar.`,
);

export const HOME_FAQS: Faq[] = [
  fact(
    "Which diabetes doctor can I consult in Kanjurmarg?",
    `${SITE.doctorName}, a ${SITE.doctorTitle} (${SITE.qualifications}), consults at ${SITE.clinicName} in Kanjurmarg (East), opposite the Runwal Bliss main gate. Care covers diabetes, blood pressure, thyroid and general medicine. To book a visit, ${call}.`,
  ),
  fact(
    "Where is the clinic located?",
    `The clinic is at ${main.address.lines[1]}, Kanjurmarg (East), Mumbai ${main.address.postalCode}, ${main.address.landmark!.replace("Opp.", "opposite the")}. Use the Runwal Bliss gate as your landmark, since the society itself is large. The Contact & Visit Us page has a map and a Get Directions link.`,
  ),
  Q_FEES,
  fact(
    "How do I book an appointment?",
    `You can book by calling or sending a WhatsApp message to ${PHONE.display}. There is no online booking calendar or form, so every request goes straight to the clinic. Tell the team which location you prefer, and ask them to confirm an available time before you travel.`,
  ),
  Q_TIMINGS,
  Q_OTHER_LOCATIONS,
];

export const ABOUT_FAQS: Faq[] = [
  fact(
    "What are Dr. Samruddha Desai's qualifications?",
    `${SITE.doctorName} holds an MBBS and FCPS Medicine (Rajawadi Hospital, Mumbai), plus a CCGDM from PHFI Chennai, with 6 years in internal medicine and diabetology. Dr. Desai is registered with the ${MMC.council}, registration number ${MMC.number}, and is currently pursuing a diabetes certification course with the Royal College of Physicians (UK).`,
  ),
  medical(
    "What does a Consultant Physician & Diabetologist treat?",
    "A consultant physician looks after general medical problems such as fever, infections, blood pressure and thyroid conditions, while a diabetologist focuses on diabetes and related health concerns. Dr. Desai combines both roles. This is general information only; the doctor advises on any diagnosis or treatment after examination and reports.",
  ),
  fact(
    "Is Dr. Desai a general physician in Kanjurmarg East?",
    `Yes. ${SITE.doctorName} practises general medicine with a focus on diabetes care at ${SITE.clinicName} in Kanjurmarg East, Mumbai, opposite the Runwal Bliss main gate. To book a visit, ${call}. There is no online booking calendar.`,
  ),
  fact(
    "Where can I meet Dr. Desai?",
    `Dr. Desai consults at three locations in Mumbai: the main clinic in Kanjurmarg (East), ${powai.name} in ${powai.place}, and ${nahar.name} in ${nahar.place}. Timings differ by location and are listed on the Contact & Visit Us page. Please ${call} to confirm the right place and time for you.`,
  ),
];

export const SERVICES_FAQS: Faq[] = [
  fact(
    "Which diabetes services are available in Kanjurmarg East?",
    `The clinic offers diabetes management and insulin therapy, gestational diabetes (GDM) care, and thyroid and hormonal consultation. It also provides hypertension care, weight loss management and preventive health check-ups. The full list is on this page. Please ${call} to ask whether a service suits your need.`,
  ),
  fact(
    "Does the clinic offer ECG and lab tests?",
    `Yes, ECG, laboratory services and home blood sample collection are listed among the clinic's services. Availability can depend on the location and the day, so please ${call} to confirm before you visit. There is no online booking calendar; the team will confirm a time with you directly.`,
  ),
  fact(
    "Can I get a medical fitness certificate?",
    `Yes, the clinic lists medical fitness certificates and pre-operative evaluation among its services. Please ${call} to ask what you need to bring and when to come, since requirements can differ from case to case. The doctor will advise after examination and reports.`,
  ),
  fact(
    "Is there dietitian support?",
    `Yes, an in-clinic dietitian and nutritionist work with Dr. Desai to build diet plans tailored to each patient, rather than a one-size-fits-all chart. To ask how nutrition guidance fits your care, ${call}. Booking is by phone or WhatsApp only, with no online calendar.`,
  ),
  Q_FEES,
];

export const CONTACT_FAQS: Faq[] = [
  fact(
    "What are the clinic timings in Kanjurmarg East?",
    `The Kanjurmarg clinic is open ${mainTimings}; Sunday is not confirmed. ${powai.name} is open ${powai.weekly.days}, ${powai.weekly.text}. ${nahar.name} is open ${nahar.weekly.days}, ${nahar.weekly.text}, and on Sunday by appointment only, 11:00 am to 1:00 pm.`,
  ),
  fact(
    "How do I reach the clinic?",
    `Look for the Runwal Bliss main gate in Kanjurmarg (East), Mumbai ${main.address.postalCode}; the clinic is opposite it, at ${main.address.lines[1]}. Use the map and Get Directions link on this page. If you cannot find it, ${call} and the team will guide you.`,
  ),
  fact(
    "Does Dr. Desai consult at other locations?",
    `Yes. Dr. Desai also consults at ${nahar.name} in ${nahar.place} and ${powai.name} in ${powai.place}. Each location card on this page shows the address, timings and a Book on WhatsApp button that mentions that location by name, so your message reaches the clinic with the right place already filled in.`,
  ),
  fact(
    "Can I book an appointment on WhatsApp?",
    `Yes. Use the Book on WhatsApp button on any location card, or message ${PHONE.display} directly. You can also call the same number. There is no online booking calendar, so the clinic confirms your time by phone or WhatsApp. Please mention the location you want to visit.`,
  ),
  Q_FEES,
];

export const ALL_FAQ_SETS = { HOME_FAQS, ABOUT_FAQS, SERVICES_FAQS, CONTACT_FAQS };

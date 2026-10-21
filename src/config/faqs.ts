import { ADDRESS, FEES, PHONE, SITE } from "./site";

export type Faq = { q: string; a: string };

const where = `${ADDRESS.landmark}, ${ADDRESS.line}, ${ADDRESS.area} – ${ADDRESS.postalCode}`;

export const HOME_FAQS: Faq[] = [
  {
    q: "Which diabetes doctor can I consult in Kanjurmarg?",
    a: `${SITE.doctorName} is a Consultant Physician & Diabetologist (${SITE.qualifications}) who sees patients at ${SITE.clinicName}, ${ADDRESS.landmark}, Kanjurmarg East, Mumbai. Care focuses on clear diagnosis, honest explanations and a plan that fits your daily life.`,
  },
  {
    q: "Where is the clinic located?",
    a: `${where}. The clinic is directly opposite the main gate of Runwal Bliss.`,
  },
  {
    q: "What is the consultation fee?",
    a: `The consultation fee at the Kanjurmarg clinic is ${FEES.first} for the first visit and ${FEES.followUp} for a follow-up.`,
  },
  {
    q: "How do I book an appointment?",
    a: `Call ${PHONE.display} or message the clinic on WhatsApp on the same number. There is no online form; every enquiry goes straight to the clinic.`,
  },
];

export const ABOUT_FAQS: Faq[] = [
  {
    q: `What are Dr. Samruddha Desai's qualifications?`,
    a: `${SITE.doctorName} holds an MBBS, FCPS Medicine (Rajawadi Hospital, Mumbai) and a CCGDM (PHFI Chennai), with 6 years in internal medicine and diabetology.`,
  },
  {
    q: "What does a Consultant Physician & Diabetologist treat?",
    a: "A consultant physician manages general medical conditions such as fever, infections, blood pressure and thyroid problems. A diabetologist focuses on diabetes, including type 2 diabetes, insulin therapy and gestational diabetes.",
  },
  {
    q: "Is Dr. Desai a general physician in Kanjurmarg East?",
    a: `Yes. ${SITE.doctorName} practises general medicine with a focus on diabetes care at ${SITE.clinicName}, Kanjurmarg East, Mumbai.`,
  },
];

export const SERVICES_FAQS: Faq[] = [
  {
    q: "Which diabetes services are available in Kanjurmarg East?",
    a: "The clinic offers diabetes management and insulin therapy, gestational diabetes (GDM) care, thyroid and hormonal consultation, weight loss management, and preventive health check-ups.",
  },
  {
    q: "Does the clinic offer ECG and lab tests?",
    a: "Yes. ECG, laboratory services and home blood sample collection are available.",
  },
  {
    q: "Can I get a medical fitness certificate?",
    a: "Yes. The clinic provides medical fitness certificates and pre-operative evaluation.",
  },
  {
    q: "Is there dietitian support?",
    a: "An in-clinic dietitian and nutritionist work with Dr. Desai to build diet plans tailored to each patient.",
  },
];

export const CONTACT_FAQS: Faq[] = [
  {
    q: "What are the clinic timings in Kanjurmarg East?",
    a: "Monday to Saturday, 9:30–11:30 am and 8:00–10:00 pm. Please call or WhatsApp to confirm before visiting at other times.",
  },
  {
    q: "How do I reach the clinic?",
    a: `Look for ${ADDRESS.landmark}, Kanjurmarg (East), Mumbai – ${ADDRESS.postalCode}. The clinic is at ${ADDRESS.line}. Use the map on this page for directions.`,
  },
  {
    q: "Does Dr. Desai consult at other locations?",
    a: "Yes. Dr. Desai also consults at Nahar Medical Center and Powai Polyclinic & Hospital. Use the Book Appointment button on each location card to message the clinic on WhatsApp.",
  },
  {
    q: "Can I book an appointment on WhatsApp?",
    a: `Yes. Message ${PHONE.display} on WhatsApp or call the same number.`,
  },
];

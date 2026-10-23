/**
 * One-sentence service descriptions (15-22 words each), shown on Services and the Home preview.
 * Own wording, plain English. `needsDoctorReview` is internal: never rendered, never in schema.
 * Keys are SERVICES slugs from site.ts.
 */
export type ServiceDescription = { description: string; needsDoctorReview: boolean };

const d = (description: string): ServiceDescription => ({ description, needsDoctorReview: true });

export const SERVICE_DESCRIPTIONS: Record<string, ServiceDescription> = {
  diabetes: d("Ongoing care for people living with diabetes, including help with insulin therapy, with regular reviews so your plan fits your daily routine."),
  gdm: d("Care and monitoring for diabetes that appears during pregnancy, explained clearly so you know what each check and step is for."),
  hypertension: d("Checks and guidance for high blood pressure and related heart health risks, with a clear plan you can follow at home."),
  thyroid: d("Assessment and follow-up for thyroid and other hormonal concerns, with clear explanations of your tests and what they mean for you."),
  nebulization: d("Nebulizer treatment given at the clinic for people with breathing difficulty, as advised by the doctor after examination."),
  general: d("A consultation for everyday medical concerns such as fever, aches and infections, with a careful history and a plain explanation."),
  "iv-im": d("Injections and IV drips given at the clinic when the doctor advises them after examining you and reviewing your reports."),
  weight: d("Guidance on healthy weight management, including injections where the doctor considers them suitable, alongside diet and lifestyle advice."),
  infectious: d("Assessment and treatment advice for fever and common infections, with tests where needed and clear instructions for looking after yourself at home."),
  respiratory: d("Evaluation of cough, breathlessness and other breathing problems, with tests where needed and a plan explained in plain language."),
  preventive: d("Routine health check-ups that review your general health and risk factors, so you and the doctor can discuss them together."),
  fitness: d("Medical fitness certificates and pre-operative evaluation after examination, with the tests the doctor feels are needed for your situation."),
  ecg: d("An ECG records your heart's electrical activity at the clinic, and the doctor explains the tracing to you afterwards."),
  lab: d("Blood and other laboratory tests arranged through the clinic, with results reviewed and explained by the doctor at your follow-up."),
  "home-sample": d("Blood samples collected at your home for tests the doctor has advised, so you do not need to travel to the clinic."),
};

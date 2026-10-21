import { ADDRESS, FEES, PHONE, SITE, TIMINGS } from "@/config/site";

export const dynamic = "force-static";

/** llms.txt: plain-text summary for AI crawlers. Confirmed facts only (no placeholders). */
export function GET() {
  const body = `# ${SITE.clinicName}

> ${SITE.doctorName}, ${SITE.doctorTitle} (${SITE.qualifications}). Diabetes and general medicine clinic in Kanjurmarg East, Mumbai.

## Clinic
- Address: ${ADDRESS.landmark}, ${ADDRESS.line}, ${ADDRESS.area} – ${ADDRESS.postalCode}
- Phone / WhatsApp: ${PHONE.display}
- Timings: ${TIMINGS.monSat}
- Consultation fee: ${FEES.first} first visit, ${FEES.followUp} follow-up

## Pages
- [Home](${SITE.url}/): Diabetes doctor in Kanjurmarg East, Mumbai
- [About](${SITE.url}/about): Doctor qualifications and approach
- [Services](${SITE.url}/services): Diabetes, GDM, hypertension, thyroid, ECG, lab and more
- [Contact & Visit Us](${SITE.url}/contact): Map, timings, call, WhatsApp and other consulting locations
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

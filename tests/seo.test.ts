import { describe, expect, it } from "vitest";
import { ABOUT_FAQS, CONTACT_FAQS, HOME_FAQS, SERVICES_FAQS } from "@/config/faqs";
import { BRANCHES, PHONE, PLACEHOLDERS, SOCIAL, waBranchHref } from "@/config/site";
import { breadcrumbSchema, clinicSchema, faqSchema, pageMetadata, physicianSchema } from "@/lib/seo";

const all = JSON.stringify([clinicSchema(), physicianSchema(), faqSchema(HOME_FAQS), breadcrumbSchema([{ name: "Home", path: "/" }])]);

describe("schema", () => {
  it("clinic schema has the single phone and the landmark address", () => {
    const c = clinicSchema();
    expect(c.telephone).toBe(PHONE.tel);
    expect(c.address.streetAddress).toContain("Opp. Runwal Bliss main gate");
    expect(c["@type"]).toContain("MedicalClinic");
  });

  it("omits social links until handles are confirmed", () => {
    expect(SOCIAL.every((s) => !s.confirmed)).toBe(true);
    expect(clinicSchema()).not.toHaveProperty("sameAs");
    for (const s of SOCIAL) expect(all).not.toContain(s.href);
  });

  it("keeps unconfirmed placeholders out of schema", () => {
    for (const p of Object.values(PLACEHOLDERS)) expect(all).not.toContain(p);
    expect(all).not.toMatch(/email|registration|Nahar|Powai/i);
    expect(JSON.stringify(clinicSchema())).not.toMatch(/Sunday/);
  });

  it("FAQ schema mirrors visible FAQs and every page has FAQs", () => {
    for (const f of [HOME_FAQS, ABOUT_FAQS, SERVICES_FAQS, CONTACT_FAQS]) {
      expect(f.length).toBeGreaterThanOrEqual(3);
      expect(faqSchema(f).mainEntity).toHaveLength(f.length);
    }
  });
});

describe("metadata + links", () => {
  it("sets title, description and canonical", () => {
    const m = pageMetadata({ title: "T", description: "D", path: "/about" });
    expect(m.alternates?.canonical).toMatch(/\/about$/);
    expect(m.title).toBe("T");
    expect(m.description).toBe("D");
  });

  it("branch WhatsApp links prefill the location name", () => {
    for (const b of BRANCHES) {
      const text = decodeURIComponent(new URL(waBranchHref(b.name)).searchParams.get("text") ?? "");
      expect(text).toContain(b.name);
    }
  });
});

import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ALL_FAQ_SETS } from "@/config/faqs";
import { FaqSection } from "@/components/Faq";
import { faqSchema } from "@/lib/seo";

const words = (s: string) => s.trim().split(/\s+/).length;
const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const BANNED = /\b(best|100\s?%|cure[sd]?|guarantee[sd]?|testimonial|permanent(ly)?|miracle)\b/i;
const DRUGS = /\b(metformin|insulin glargine|glimepiride|semaglutide|ozempic|mg|mcg|units?)\b/i;

describe("FAQ data rules", () => {
  for (const [name, faqs] of Object.entries(ALL_FAQ_SETS)) {
    describe(name, () => {
      for (const f of faqs) {
        it(f.q, () => {
          const n = words(f.a);
          expect(n).toBeGreaterThanOrEqual(40);
          expect(n).toBeLessThanOrEqual(70);
          expect(f.a).not.toMatch(BANNED);
          expect(f.a).not.toMatch(/\d+\s?%/);
          if (f.kind === "medical") {
            expect(f.needsDoctorReview).toBe(true);
            expect(f.a).not.toMatch(DRUGS);
            expect(f.a).toMatch(/doctor advises[^.]*after examination and reports\.$/);
          } else {
            expect(f.needsDoctorReview).toBe(false);
            expect(f.a).not.toMatch(/walk-?in|insurance|turnaround|credit card|UPI|cash only/i);
          }
        });
      }
    });
  }
});

describe("accordion UI and FAQPage JSON-LD never differ", () => {
  for (const [name, faqs] of Object.entries(ALL_FAQ_SETS)) {
    it(name, () => {
      const html = renderToStaticMarkup(createElement(FaqSection, { faqs }));

      // JSON-LD equals the data file.
      const ld = /<script type="application\/ld\+json">(.*?)<\/script>/s.exec(html)?.[1] ?? "";
      const parsed = JSON.parse(ld.replace(/\\u003c/g, "<"));
      expect(parsed).toEqual(faqSchema(faqs));

      // Every visible question + answer in the server HTML equals the JSON-LD entry, in order.
      const items = [...html.matchAll(/<details[^>]*data-faq-item[^>]*>(.*?)<\/details>/gs)].map((m) => m[1]);
      expect(items).toHaveLength(parsed.mainEntity.length);
      items.forEach((item, i) => {
        const q = decode(/<h3[^>]*>(.*?)<\/h3>/s.exec(item)![1]);
        const a = decode(/<p[^>]*>(.*?)<\/p>/s.exec(item)![1]);
        expect(q).toBe(parsed.mainEntity[i].name);
        expect(a).toBe(parsed.mainEntity[i].acceptedAnswer.text);
      });
    });
  }

  it("is closed by default, accessible, and hides internal flags", () => {
    const html = renderToStaticMarkup(createElement(FaqSection, { faqs: ALL_FAQ_SETS.CONTACT_FAQS }));
    expect(html).not.toMatch(/<details[^>]*\sopen(?=[\s>=])/);
    expect(html).toContain("<summary");
    expect(html).toContain("min-h-[44px]");
    expect(html).not.toMatch(/needsDoctorReview|doctor review|"kind"/i);
    expect(JSON.stringify(faqSchema(ALL_FAQ_SETS.ABOUT_FAQS))).not.toMatch(/needsDoctorReview|kind/);
  });
});

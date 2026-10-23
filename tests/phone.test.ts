import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs script, no types
import { ALLOWED_NON_PHONE, findPhoneNumbers, scan } from "../scripts/check-phone.mjs";
import { ALL_LOCATIONS, MMC, PHONE, telHref, waLocationHref, WA_GENERAL } from "@/config/site";

describe("single phone number rule", () => {
  it("shipped source contains only +91 88305 31546", () => {
    expect(scan(".")).toEqual([]);
  });

  it("detector accepts the approved number in every format", () => {
    expect(findPhoneNumbers("+91 88305 31546")).toEqual([]);
    expect(findPhoneNumbers("tel:+918830531546")).toEqual([]);
    expect(findPhoneNumbers("https://wa.me/918830531546?text=hi")).toEqual([]);
  });

  it("detector fails on any other number", () => {
    expect(findPhoneNumbers("Call +91 98765 43210").length).toBeGreaterThan(0);
    expect(findPhoneNumbers("tel:+919999999999").length).toBeGreaterThan(0);
    expect(findPhoneNumbers("https://wa.me/919999999999").length).toBeGreaterThan(0);
    expect(findPhoneNumbers("022-2345-6789").length).toBeGreaterThan(0);
  });

  it("does not flag pincode, SVG path data or years", () => {
    expect(findPhoneNumbers("Mumbai – 400042, © 2026")).toEqual([]);
    expect(findPhoneNumbers('<path d="M10 20 30 40 50 60 70 80 90 100" />')).toEqual([]);
    // Icon geometry inside the escaped RSC payload (lucide polygon points).
    expect(findPhoneNumbers('{\\"polygon\\",{\\"points\\":\\"3 11 22 2 13 21 11 13 3 11\\",\\"key\\":\\"x\\"}')).toEqual([]);
    expect(findPhoneNumbers('<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>')).toEqual([]);
  });

  it("allows only the MMC registration number as a non-phone 10-digit value", () => {
    expect([...ALLOWED_NON_PHONE]).toEqual(Array.of(MMC.number));
    expect(findPhoneNumbers(`Reg. No. ${MMC.number}`)).toEqual([]);
    expect(findPhoneNumbers("Reg. No. 2016040658").length).toBeGreaterThan(0);
  });

  it("all links use the approved number", () => {
    expect(telHref).toBe("tel:+918830531546");
    expect(WA_GENERAL).toContain(`wa.me/${PHONE.whatsapp}`);
    for (const l of ALL_LOCATIONS) expect(waLocationHref(l)).toContain(`wa.me/${PHONE.whatsapp}`);
  });
});

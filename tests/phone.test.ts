import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs script, no types
import { findPhoneNumbers, scan } from "../scripts/check-phone.mjs";
import { PHONE, telHref, waBranchHref, WA_GENERAL } from "@/config/site";

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
    const other = ["+91", "78755", "64799"].join(" ");
    expect(findPhoneNumbers(`Call ${other}`).length).toBeGreaterThan(0);
    expect(findPhoneNumbers("tel:+919999999999").length).toBeGreaterThan(0);
    expect(findPhoneNumbers("https://wa.me/919999999999").length).toBeGreaterThan(0);
    expect(findPhoneNumbers("022-2345-6789").length).toBeGreaterThan(0);
  });

  it("does not flag pincode, SVG path data or years", () => {
    expect(findPhoneNumbers("Mumbai – 400042, © 2026")).toEqual([]);
    expect(findPhoneNumbers('<path d="M10 20 30 40 50 60 70 80 90 100" />')).toEqual([]);
  });

  it("all links use the approved number", () => {
    expect(telHref).toBe("tel:+918830531546");
    expect(WA_GENERAL).toContain(`wa.me/${PHONE.whatsapp}`);
    expect(waBranchHref("Nahar Medical Center")).toContain(`wa.me/${PHONE.whatsapp}`);
  });
});

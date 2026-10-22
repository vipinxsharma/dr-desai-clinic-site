import { describe, expect, it } from "vitest";
import { ALL_LOCATIONS, directionsHref, LOCATIONS, MMC, waLocationHref } from "@/config/site";

describe("locations (single source of truth)", () => {
  it("has the three confirmed locations", () => {
    expect(ALL_LOCATIONS.map((l) => l.name)).toEqual([
      "Dr. Desai's Health Clinic and Diabetes Center",
      "Nahar Medical Center",
      "Powai Polyclinic & Hospital",
    ]);
    expect(LOCATIONS.main.address.oneLine).toBe("1/5, Jerry Villa, Gomes Colony, Opp. Runwal Bliss main gate, Kanjurmarg (East), Mumbai 400042");
    expect(LOCATIONS.powai.address.oneLine).toBe("19/A, Opp. I.I.T. Main Gate Rd, near South Indian Bank, Powai, Mumbai, Maharashtra 400076");
    expect(LOCATIONS.nahar.address.oneLine).toBe("Nahar Amrit Shakti, off Saki Vihar Road, Chandivali, Andheri East, Mumbai 400072");
    expect(LOCATIONS.main.weekly.text).toBe("9:30 am to 11:30 am and 8:00 pm to 10:00 pm");
    expect(LOCATIONS.powai.weekly.text).toBe("4:00 pm to 5:30 pm");
    expect(LOCATIONS.nahar.weekly.text).toBe("12:00 pm to 2:00 pm and 6:00 pm to 7:30 pm");
    expect(LOCATIONS.nahar.sunday).toEqual({ status: "appointment", text: "By appointment only, 11:00 am to 1:00 pm" });
    expect(LOCATIONS.main.sunday.status).toBe("unconfirmed");
  });

  it("keeps carried-over fees and distances", () => {
    expect([LOCATIONS.nahar.fee, LOCATIONS.nahar.distance]).toEqual(["₹1,100", "~6 km from clinic"]);
    expect([LOCATIONS.powai.fee, LOCATIONS.powai.distance]).toEqual(["₹500", "~3 km from clinic"]);
  });

  it("builds directions from the address with no API key", () => {
    for (const l of ALL_LOCATIONS) {
      const u = new URL(directionsHref(l));
      expect(u.hostname).toBe("www.google.com");
      expect(u.searchParams.get("query")).toBe(l.address.oneLine);
      expect(u.searchParams.has("key")).toBe(false);
    }
  });

  it("WhatsApp message names THAT location, URL-encoded", () => {
    for (const l of ALL_LOCATIONS) {
      const href = waLocationHref(l);
      expect(href).toContain(encodeURIComponent(`Hi, I would like to book an appointment at ${l.name}.`));
      expect(new URL(href).searchParams.get("text")).toBe(`Hi, I would like to book an appointment at ${l.name}.`);
    }
  });

  it("MMC number is defined once", () => {
    expect(MMC.number).toBe("2016040659");
  });
});

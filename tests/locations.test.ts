import { describe, expect, it } from "vitest";
import { ALL_LOCATIONS, directionsHref, LOCATIONS, MAP, MMC, waLocationHref } from "@/config/site";

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
    expect(LOCATIONS.main.sunday).toEqual({ status: "none" });
    expect(LOCATIONS.powai.sunday).toEqual({ status: "none" });
  });

  it("keeps carried-over fees and distances", () => {
    expect([LOCATIONS.nahar.fee, LOCATIONS.nahar.distance]).toEqual(["₹1,100", "~6 km from clinic"]);
    expect([LOCATIONS.powai.fee, LOCATIONS.powai.distance]).toEqual(["₹500", "~3 km from clinic"]);
  });

  it("builds directions from the address with no API key", () => {
    for (const l of ALL_LOCATIONS) {
      const u = new URL(directionsHref({ ...l, mapsUrl: undefined })); // fallback path
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

  it("every location yields a Get Directions href and an iframe src, never empty", () => {
    for (const l of ALL_LOCATIONS) {
      for (const u of [directionsHref(l), MAP.embedUrl(l)]) {
        expect(u.length).toBeGreaterThan(20);
        expect(new URL(u).protocol).toBe("https:");
      }
    }
  });

  it("optional mapsUrl / mapsEmbedSrc override the address-based fallback", () => {
    const withLinks = { ...LOCATIONS.powai, mapsUrl: "https://maps.app.goo.gl/example", mapsEmbedSrc: "https://www.google.com/maps/embed?pb=example" };
    expect(directionsHref(withLinks)).toBe("https://maps.app.goo.gl/example");
    expect(MAP.embedUrl(withLinks)).toBe("https://www.google.com/maps/embed?pb=example");
    // Fallback stays in code for a location without these fields.
    const bare = { ...LOCATIONS.powai, mapsUrl: undefined, mapsEmbedSrc: undefined };
    expect(directionsHref(bare)).toContain("google.com/maps/search");
    expect(MAP.embedUrl(bare)).toContain("output=embed");
  });

  it("real Google Maps links: short links, embed pb URLs, each with its own place name, all different", () => {
    for (const l of ALL_LOCATIONS) {
      expect(l.mapsUrl?.startsWith("https://maps.app.goo.gl/")).toBe(true);
      expect(l.mapsEmbedSrc?.startsWith("https://www.google.com/maps/embed?pb=")).toBe(true);
      expect(directionsHref(l)).toBe(l.mapsUrl);
      expect(MAP.embedUrl(l)).toBe(l.mapsEmbedSrc);
    }
    expect(LOCATIONS.main.mapsEmbedSrc).toContain("Dr.%20Desai's");
    expect(LOCATIONS.nahar.mapsEmbedSrc).toContain("Nahar%20Medical%20Center");
    expect(LOCATIONS.powai.mapsEmbedSrc).toContain("Powai%20Polyclinic");
    expect(new Set(ALL_LOCATIONS.map((l) => l.mapsUrl)).size).toBe(3);
    expect(new Set(ALL_LOCATIONS.map((l) => l.mapsEmbedSrc)).size).toBe(3);
    expect(LOCATIONS.main.geo).toEqual({ latitude: 19.1326889, longitude: 72.9363187 });
  });

  it("only the Kanjurmarg clinic is bookable", () => {
    expect(ALL_LOCATIONS.filter((l) => l.bookable).map((l) => l.slug)).toEqual(["main"]);
  });

  it("MMC number is defined once", () => {
    expect(MMC.number).toBe("2016040659");
  });
});

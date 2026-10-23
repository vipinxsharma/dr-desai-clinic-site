import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSlot, SITE } from "@/config/site";
import { resolveImage } from "@/lib/images";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyBar } from "@/components/StickyBar";
import { JsonLd } from "@/components/JsonLd";
import { clinicSchema, physicianSchema } from "@/lib/seo";

const favicon = resolveImage(getSlot("favicon").file);

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.clinicName} | Diabetologist in Kanjurmarg East, Mumbai`, template: `%s | ${SITE.doctorName}` },
  description: `${SITE.doctorName}, ${SITE.doctorTitle}, at ${SITE.clinicName}, Kanjurmarg East, Mumbai.`,
  authors: [{ name: SITE.doctorName }],
  ...(favicon ? { icons: { icon: favicon } } : {}),
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#083b34" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-white focus:p-3">Skip to content</a>
        <div className="fx-progress" aria-hidden="true" />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBar />
        <JsonLd data={[clinicSchema(), physicianSchema()]} />
      </body>
    </html>
  );
}

# Dr. Desai's Health Clinic and Diabetes Center

Next.js (App Router) + Tailwind CSS site for Dr. Samruddha Desai, Consultant Physician & Diabetologist, Kanjurmarg East, Mumbai.

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint && npm run typecheck && npm test && npm run build
node scripts/screenshots.mjs http://localhost:3000 screenshots   # 1280px + 390px, fails on horizontal scroll
```

## Where to edit
All facts live in `src/config/site.ts` (phone, MMC number, `LOCATIONS` with addresses/timings, services, **social placeholders**) and `src/config/service-descriptions.ts` (short service copy; `needsDoctorReview` flags are internal, never shown).

## Open placeholders (do not invent)
Clinic email. It renders as dashed `[...]` via `<Ph>` and are kept out of JSON-LD and `llms.txt`.

## TODO before launch
- `SITE.url`: confirm production domain (or set `NEXT_PUBLIC_SITE_URL`); canonical, sitemap, schema derive from it.
- `SOCIAL`: swap placeholder Instagram / Facebook / YouTube links, set `confirmed: true` (only then added to schema `sameAs`).
- Drop real photos into `<ImageSlot src=...>`; boxes are fixed-ratio so there is no layout shift.

## One phone number rule
Only `+91 88305 31546` is allowed. `scripts/check-phone.mjs` runs in `prebuild`, in tests, and in CI against built HTML.

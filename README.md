# Dr. Desai's Health Clinic and Diabetes Center

Next.js (App Router) + Tailwind CSS site for Dr. Samruddha Desai, Consultant Physician & Diabetologist, Kanjurmarg East, Mumbai.

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint && npm run typecheck && npm test && npm run build
node scripts/screenshots.mjs http://localhost:3000 screenshots   # 1280px + 390px, fails on horizontal scroll
```

## Where to edit
All facts live in `src/config/site.ts` (phone, MMC number, `LOCATIONS` with addresses/timings, services, `EMAIL`, `SOCIAL`) and `src/config/service-descriptions.ts` (short service copy; `needsDoctorReview` flags are internal, never shown).

## Open placeholders
None. Email and the two social links (Instagram, Facebook) are confirmed in `src/config/site.ts`.

## TODO before launch
- `SITE.url` (`src/config/site.ts`) is the single source for the site host (`https://www.drdesaihealthclinic.com`); canonical, og:url, sitemap, robots, JSON-LD and llms.txt derive from it. No env override.
- Drop real photos into `<ImageSlot src=...>`; boxes are fixed-ratio so there is no layout shift.

## One phone number rule
Only `+91 88305 31546` is allowed. `scripts/check-phone.mjs` runs in `prebuild`, in tests, and in CI against built HTML.

## Resources
`src/config/resources.ts` holds `RESOURCES` with four lists (`videos`, `articles`, `gallery`, `documents`), all empty by default.
- Add an item: push an object into the matching list, e.g. `videos: [{ title: "Managing diabetes at work", url: "https://...", description: "optional" }]`. Gallery items are `{ src, alt, caption? }`.
- With at least one item, the "Resources" menu item (header, footer, mobile menu), the `/resources` page and the sitemap entry appear automatically, and only non-empty sections render.
- All lists empty and `showWhenEmpty: false` (default): no menu item, `/resources` returns 404, not in the sitemap.
- Set `showWhenEmpty: true` to show the menu item and a "coming soon" page with Call / WhatsApp buttons while the lists are still empty.

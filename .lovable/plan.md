## What Seema does

Seema General Contracting & Industrial Services Co. — Saudi specialist in **structural rehabilitation**: concrete & steel repair, process piping, **carbon-fiber composite reinforcement**, and **epoxy coatings for corrosive environments**. Current site is a dated WordPress build (slider + a few sections). Brand: royal blue + green accent, "SEEMA / General Contracting" logo in a green ellipse.

## Goals

1. Modern, premium **industrial-engineering** aesthetic (Hilti / Sika / BASF Construction tier).
2. Multi-page TanStack route architecture with proper per-page SEO.
3. Real generated imagery (refineries, carbon-fiber wrapping, epoxy, structural repair).
4. Reuse the official Seema logo from the live site.
5. **Bilingual English + Arabic with full RTL support** and a language toggle.

## Design direction

- **Palette:** deep navy primary, steel-gray surfaces, safety-green accent (match existing logo green), white bg + dark mode. All tokens in `oklch` in `src/styles.css`.
- **Typography:**
  - English: Inter (body) + Space Grotesk (headings)
  - Arabic: **IBM Plex Sans Arabic** (body + headings) — loaded via Google Fonts, applied automatically when `lang="ar"` / `dir="rtl"` is active.
- **Motion:** subtle fade/translate on scroll. No flashy carousels — clean full-bleed hero.
- **Layout primitives:** Hero, SectionHeading, ServiceCard, ProjectCard, ClientLogoStrip, StatStrip, CTASection.

## Bilingual / RTL plan

- **i18n library:** `react-i18next` + `i18next` (lightweight, SSR-friendly, no backend needed).
- **Translation files:** `src/i18n/en.json` and `src/i18n/ar.json` — all UI copy keyed (nav, hero, services, mission/vision/goal, contact, footer).
- **Language toggle:** button in `SiteHeader` ("EN" / "العربية"). Selection persisted in `localStorage`.
- **RTL:** when Arabic is selected, set `<html lang="ar" dir="rtl">` from a small effect in `__root.tsx`. Use Tailwind's logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`, `text-start`, `text-end`) so layouts flip cleanly. Mirror chevrons/arrows via `rtl:rotate-180`.
- **Fonts:** apply `font-arabic` class (IBM Plex Sans Arabic) on `<html>` when `lang="ar"`; otherwise the default Inter/Space Grotesk stack.
- **Per-route SEO:** each route's `head()` reads the active language and emits localized `title` / `description` / `og:title` / `og:description`.

## Routes (`src/routes/`)

- `index.tsx` — Hero, value props, services overview, featured projects, clients strip, CTA
- `about.tsx` — Welcome copy, Mission / Vision / Goal, values
- `services.tsx` — Carbon Fiber Reinforcement, Concrete Repair, Steel Rehabilitation, Process Piping Repair, Epoxy Coating, Inspection & Assessment
- `projects.tsx` — Project gallery with categories
- `clients.tsx` — Client logos + partnership statement
- `contact.tsx` — Contact form (visual only, no backend), address, embedded map

Each route gets unique localized `head()` metadata. Shared `<SiteHeader>` and `<SiteFooter>` mounted around `<Outlet />` in `__root.tsx`.

## Assets

**Reused from official site → `src/assets/`:**

- `seema-logo.png` (downloaded from seema.sa.com)

**Generated (premium for hero, standard/fast for thumbnails) → `src/assets/`:**

- Hero: dramatic refinery / petrochemical plant at dusk
- Service tiles: carbon-fiber wrap on concrete column · epoxy coating on pipe · steel structure rehab · concrete crack injection · process piping inspection · structural assessment
- About: engineers in PPE on industrial site
- Project covers (3–4)
- 16:9 OG share image for the home route

Service icons use Lucide where appropriate (HardHat, Wrench, Shield, Layers, Droplet, Gauge).

## Implementation steps

1. Install deps: `react-i18next`, `i18next`, `i18next-browser-languagedetector`.
2. Extend `src/styles.css` — navy / steel / safety-green tokens in oklch (light + dark); add `.font-arabic` utility binding IBM Plex Sans Arabic.
3. Create `src/i18n/index.ts`, `src/i18n/en.json`, `src/i18n/ar.json` with all UI copy.
4. Wire language + dir effect in `__root.tsx`; load Google Fonts for Inter, Space Grotesk, IBM Plex Sans Arabic.
5. Build `SiteHeader` (with logo, nav, language toggle) and `SiteFooter`.
6. Build reusable section components.
7. Fetch the Seema logo into `src/assets/`.
8. Generate hero + service + about imagery via `imagegen`.
9. Build the 6 route files with localized `head()` and content pulled via `useTranslation`.
10. Replace the placeholder `src/routes/index.tsx`.
11. Verify EN ↔ AR toggle: text swaps, layout flips to RTL, fonts switch.

## Out of scope (call out)

- Contact form is visual only. Wiring real email / storage needs Lovable Cloud — separate ask.
- No CMS; content is hardcoded in translation files. Admin-editable content = follow-up requiring Lovable Cloud.
- Arabic copy is translated from the English source; final wording should be reviewed by a native speaker before launch.

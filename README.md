# SapiHive Bilingual — Next.js App Router

English `/en` and Arabic `/ar` with RTL, locale-aware navigation, services and page placeholders. This is a **separate copy**, not a destructive update to your older SapiHive project.

## Start

```bash
pnpm install
pnpm dev
```
Open `http://localhost:3000` (redirects to `/en`) or `http://localhost:3000/ar`.

## Where things live

- `src/app/[locale]/...` — localized page routes
- `src/i18n/config.ts` — locale options and localized paths
- `src/i18n/dictionaries.ts` — UI strings, page summaries and section text in both languages
- `src/i18n/services.ts` — Arabic localized service details, while canonical service slugs remain English
- `src/proxy.ts` — redirect from root and set request locale used by root `<html lang dir>`
- `src/components/layout/Header.tsx` — bilingual nav, dropdown and language switch
- `src/features/hero` and `src/features/intro-loader` — shared 3D/animation feature folders; advanced approved cinematic animation is still TODO
- `public/models/hive` — approved A1 clear-glass model assets to be built later

## Notes

- Content was translated for scaffold purposes and should be reviewed by the brand team before publication.
- Existing service slugs are stable for both locales (`/en/services/hive-tech`, `/ar/services/hive-tech`).
- Source logo has **not** been recreated; add approved logo files under `public/images/brand`.
- `src/app/loading.tsx` was intentionally not used as the branded intro: `IntroLoader` is a separate custom component.
- `pnpm build` requires package installation. No build validation was performed in this environment.
- No `output: 'export'` configured, because current locale routing uses `src/proxy.ts` for proper document `lang`/`dir`.

## Safe adoption

Please do **not** extract this ZIP over your older working project. First make a Git commit / backup, then compare or move the bilingual files into a new branch.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## How to talk to the user

- Always answer in **English**.
- Use simple, everyday words. Short sentences. Avoid jargon; if a technical term is needed, explain it in one line.
- Keep answers easy to scan so they take little effort to read: lead with the result, then short bullets. No long paragraphs, no walls of text.
- Give only what's needed to understand and decide. Skip details the user didn't ask for.

## Project

Personal portfolio + blog for Daniel Cueto, live at https://dcueto.me (custom domain via `CNAME`). Static site built with **Astro 4** (static output, no SSR adapter), with **MDX** content, **React** islands and **SCSS**. Bilingual: English (`en`) and Spanish (`es`).

## Commands

```bash
npm run dev       # dev server, exposed on the LAN (--host)
npm start         # dev server, localhost only
npm run build     # astro check (type-check .astro/.ts + content schemas) then astro build → dist/
npm run preview   # serve the built dist/
```

There is no test suite and no linter. `npm run build` is the verification step: `astro check` fails on TypeScript errors and on content frontmatter that doesn't match the Zod schemas.

Env vars (in `.env`, gitignored): `PUBLIC_EMAILJS_APIKEY`, `PUBLIC_EMAILJS_SERVICE_ID`, `PUBLIC_EMAILJS_TEMPLATE_ID` — used client-side by `ContactForm.astro` to POST to the EmailJS REST API. The `PUBLIC_` prefix means they're inlined into the browser bundle.

## Architecture

### i18n and routing
- Locales are configured in `astro.config.mjs` (`i18nConfig`: default `en`, `prefixDefaultLocale: true`, `es` falls back to `en`) **and** duplicated as the `Locale` type / `locales` array in `src/services/routing.ts`. Adding a locale means touching both, plus `src/i18n/<locale>.json`, `src/utils/i18n.ts` and the `language` enum in every content schema.
- Every route lives under `src/pages/[locale]/` and uses `getStaticPaths()` to emit one page per locale. There is no root page: `/` is a `redirects` entry in `astro.config.mjs` (status 301, so the generated meta refresh is instant — 302 would add a 2s delay).
- UI strings come from `src/i18n/{en,es}.json` via the custom helpers in `src/utils/i18n.ts`: `getTranslationValue(locale, 'dot.path.key')` for strings and `getTranslationArray` for arrays (each throws if used on the wrong type). `astro-i18next` is installed as an integration but the code uses these custom helpers, not i18next. `replacePlaceholders` / `Trans.astro` are marked by the author as not working correctly.
- `generateLink()` in `routing.ts` builds locale-prefixed links to `blog` / `projects` entries.

### Content collections (`src/content/config.ts`)
Four collections: `blog`, `projects`, `experience`, `education`. Content is organized as `src/content/<collection>/<locale>/...`, but the locale is determined by the **`language` frontmatter field** (pages filter with `getCollection(name, e => e.data.language === locale)`), not by the folder. Detail pages (`[locale]/projects/[...path].astro`, `[locale]/blog/[...path].astro`) build their URLs from the entry `slug`, which is set explicitly in frontmatter — slugs must be unique across both languages (e.g. projects use `en-…` prefixes).
- `blog.translated_post` and `related_posts` are `reference('blog')` fields pointing to another entry's slug.
- `projects` require `image`; images live next to the MDX in an `images/` folder and are referenced with relative paths so Astro's `image()` helper optimizes them.
- `experience` and `education` are MDX entries consumed as data on the home page (`[locale]/index.astro`), which assembles all sections (Hero, latest articles, projects, work experience, education, contact).

### Components
- `src/components/{portfolio,shared,blog}/{astro,react}/` — Astro components for static markup; React (`.tsx` + co-located `.scss`) only for interactive islands, hydrated with `client:idle` / `client:visible` (SideNav, BurgerMenuButton, CarouselSimple, WorkExperience tabs).
- Cross-island state uses **nanostores** (`src/stores/sidenav.ts`, read in React via `@nanostores/react`).
- MDX: `astro-auto-import` makes `Image` (from `mdxComponents/`) and `YouTube` (from `astro-embed`) available in every MDX file without imports. `mdxComponents.ts` maps HTML tags (`p`, `h1`, `img`) to custom components.
- `BaseLayout.astro` holds the global shell: SEO (`astro-seo`), nav bar, side nav, command/modal navigator, theme switching (`ShiftThemeMode` / `shiftThemeMode.ts`), footer. Global styles: `src/styles/` (`reset.css`, `global.css`, SCSS `_variables` / `_mixins`).

### Path aliases (`tsconfig.json`)
`@components/*`, `@mdxComponents/*`, `@layouts/*`, `@utils/*`, `@i18n/*`, `@services/*`, `@stores/*`, `@public/*`. TypeScript runs in Astro's `strict` preset.

### Static assets
`public/` is served as-is: the CV PDF at `public/docs/CV_Daniel-Cueto_en.pdf`, plus logo/favicon and images not processed by Astro.

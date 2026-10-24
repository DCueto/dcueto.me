# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## How to talk to the user

- Always answer in **English**.
- Use simple, everyday words. Short sentences. Avoid jargon; if a technical term is needed, explain it in one line.
- Keep answers easy to scan so they take little effort to read: lead with the result, then short bullets. No long paragraphs, no walls of text.
- Give only what's needed to understand and decide. Skip details the user didn't ask for.

## Project

Personal portfolio + blog for Daniel Cueto, live at https://dcueto.me (custom domain via `CNAME`). Static site built with **Astro 7** (static output, no SSR adapter), with **MDX** content, **React** islands and **SCSS**. Bilingual: English (`en`) and Spanish (`es`).

## Commands

```bash
pnpm install      # package manager is pnpm (pinned in package.json "packageManager"); never use npm
pnpm dev          # dev server, exposed on the LAN (--host). Needs Node >= 22.23.4 (Astro 7)
pnpm start        # dev server, localhost only
pnpm build        # astro check (type-check .astro/.ts + content schemas) then astro build → dist/
pnpm preview      # serve the built dist/ (runs in background; stop with `pnpm astro preview stop`)
```

There is no test suite and no linter. `pnpm build` is the verification step: `astro check` fails on TypeScript errors and on content frontmatter that doesn't match the Zod schemas.

pnpm settings live in `pnpm-workspace.yaml`: dependency install scripts are blocked unless listed in `allowBuilds` (a new one fails `pnpm install` with `ERR_PNPM_IGNORED_BUILDS` — review its script before allowing it), and `trustPolicy: no-downgrade` is on.

Env vars (in `.env`, gitignored): `PUBLIC_EMAILJS_APIKEY`, `PUBLIC_EMAILJS_SERVICE_ID`, `PUBLIC_EMAILJS_TEMPLATE_ID` — used client-side by `ContactForm.astro` to POST to the EmailJS REST API. The `PUBLIC_` prefix means they're inlined into the browser bundle.

## Architecture

### i18n and routing
- Locales are configured in `src/i18n/config.mjs` (`i18nConfig`, imported by `astro.config.mjs` and by site code — never import `astro.config.mjs` from `src/`, it bundles the whole build toolchain: default `en`, `prefixDefaultLocale: true`, no `fallback` — it made every `[locale]` route conflict with itself) **and** duplicated as the `Locale` type / `locales` array in `src/services/routing.ts`. Adding a locale means touching both, plus `src/i18n/<locale>.json`, `src/utils/i18n.ts` and the `language` enum in every content schema.
- Every route lives under `src/pages/[locale]/` and uses `getStaticPaths()` to emit one page per locale. There is no root page: `/` is a `redirects` entry in `astro.config.mjs` (status 301, so the generated meta refresh is instant — 302 would add a 2s delay).
- UI strings come from `src/i18n/{en,es}.json` via the custom helpers in `src/utils/i18n.ts`: `getTranslationValue(locale, 'dot.path.key')` for strings and `getTranslationArray` for arrays (each throws if used on the wrong type). `replacePlaceholders` / `Trans.astro` are marked by the author as not working correctly.
- `generateLink()` in `routing.ts` builds locale-prefixed links to `blog` / `projects` entries.

### Content collections (`src/content.config.ts`)
Four collections: `blog`, `projects`, `experience`, `education`. Content is organized as `src/content/<collection>/<locale>/...`, but the locale is determined by the **`language` frontmatter field** (pages filter with `getCollection(name, e => e.data.language === locale)`), not by the folder. Each collection uses a `glob()` loader over `src/content/<collection>/**/*.mdx`; the glob loader uses the frontmatter `slug` as the entry `id` (there is no `entry.slug`; render with `render(entry)` from `astro:content`). Zod is imported from `astro/zod`. Detail pages (`[locale]/projects/[...path].astro`, `[locale]/blog/[...path].astro`) build their URLs from `entry.id`, which comes from the `slug` set explicitly in frontmatter — slugs must be unique across both languages (e.g. projects use `en-…` prefixes).
- `blog.translated_post` and `related_posts` are `reference('blog')` fields pointing to another entry's id (= its frontmatter `slug`).
- Frontmatter is parsed by a strict YAML parser: in multi-line quoted strings (e.g. `content:` in `experience`), the closing quote must be indented more than the key.
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

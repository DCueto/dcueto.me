import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";

export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  routing: {
    prefixDefaultLocale: true
  },
  fallback: {
    es: 'en'
  }
}

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  i18n: i18nConfig
});
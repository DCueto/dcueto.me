import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import astroI18next from "astro-i18next";
import AutoImport from 'astro-auto-import';

export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  routing: {
    prefixDefaultLocale: true
  },
  fallback: {
    es: 'en'
  }
};

export const markdownConfig = {
  syntaxHighlight: 'shiki',
  shikiConfig: {
    // Choose from Shiki's built-in themes (or add your own)
    // https://shiki.style/themes
    // theme: 'github-dark',
    // Alternatively, provide multiple themes
    // See note below for using dual light/dark themes
    themes: {
      light: 'snazzy-light',
      dark: 'github-dark',
    },
    // Disable the default colors
    // https://shiki.style/guide/dual-themes#without-default-color
    // (Added in v4.12.0)
    // defaultColor: false,
    // Add custom languages
    // Note: Shiki has countless langs built-in, including .astro!
    // https://shiki.style/languages
    // langs: ['css', 'html', 'js', 'ts', 'tsx', 'jsx', 'json', 'yaml', 'markdown', 'mdx', 'astro', 'scss', 'swift'],
    // Enable word wrap to prevent horizontal scrolling
    // wrap: true,
    // Add custom transformers: https://shiki.style/guide/transformers
    // Find common transformers: https://shiki.style/packages/transformers
    transformers: [],
  },
  // remarkPlugins: [],
  // rehypePlugins: [],
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    astroI18next(), 
    AutoImport({
      imports: [
        "./src/components/shared/astro/mdxComponents/Image.astro",
        // import { YouTube } from 'astro-embed'
        { "astro-embed": ["YouTube"] },
      ],
    }),
    mdx(), 
  ],
  i18n: i18nConfig,
  markdown: markdownConfig
});

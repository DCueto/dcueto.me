// Shared by astro.config.mjs and site code. Keep this file free of imports:
// importing astro.config.mjs from site code would bundle the whole build toolchain.
export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  routing: {
    prefixDefaultLocale: true
  },
};

import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

export default defineConfig({
  // experimental: {
  //   actions: true,
  // },
  output: 'hybrid', //hibajavítás miatt kikommentelve
  adapter: netlify(), //hibajavítás miatt kikommentelve
  i18n: {
    defaultLocale: 'hu',
    locales: ['hu', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [react()],
  site: 'https://voluble-crumble-cbe048.netlify.app',
});

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import path from 'path';
import sitemap from '@astrojs/sitemap';
import db from '@astrojs/db';

export default defineConfig({
  output: 'static',
  adapter: netlify(),
  i18n: {
    defaultLocale: 'hu',
    locales: ['hu', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // markdown: {
  //   remarkPlugins: [remarkReadingTime, fixImagePaths], // Hozzáadtuk a fixImagePaths plugint
  // },
  integrations: [
    react(),
    db(),
    sitemap({
      filter: (page) =>
        page !== 'https://bandha.works/adatvedelmi-tajekoztato/' &&
        page !== 'https://bandha.works/en/adatvedelmi-tajekoztato/' &&
        page !== 'https://bandha.works/404',
    }),
  ],
  site: 'https://bandha.works/',
  // redirects: {
  //   '/en/linktr': '/linktr?lang=en',
  // },
  vite: {
    resolve: {
      alias: {
        '/src/images': path.resolve('./src/images'),
      },
    },
  },
  // Hozzáadjuk az explicit képkezelési konfigurációt
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Sharp-specifikus konfiguráció, ha szükséges
      },
    },
  },
});

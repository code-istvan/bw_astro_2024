import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import path from 'path';
import sitemap from '@astrojs/sitemap';

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
    sitemap({
      filter: (page) =>
        page !== 'https://bandha.works/adatvedelmi-tajekoztato/' &&
        page !== 'https://bandha.works/en/adatvedelmi-tajekoztato/',
    }),
  ],
  site: 'https://bandha.works/',
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

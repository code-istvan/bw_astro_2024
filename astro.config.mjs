import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import path from 'path';

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
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [react()],
  site: 'https://voluble-crumble-cbe048.netlify.app',
  vite: {
    resolve: {
      alias: {
        // Ez segít a képútvonalak feloldásában
        '@images': path.resolve('./src/images'),
      },
    },
  },
  // Explicit képkezelési konfiguráció
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});

// import { defineConfig } from 'astro/config';
// import { remarkReadingTime } from './remark-reading-time.mjs';
// import react from '@astrojs/react';
// import netlify from '@astrojs/netlify';

// export default defineConfig({
//   output: 'static',
//   adapter: netlify(),
//   i18n: {
//     defaultLocale: 'hu',
//     locales: ['hu', 'en'],
//     routing: {
//       prefixDefaultLocale: false,
//     },
//   },
//   markdown: {
//     remarkPlugins: [remarkReadingTime],
//   },
//   integrations: [react()],
//   site: 'https://voluble-crumble-cbe048.netlify.app',
// });

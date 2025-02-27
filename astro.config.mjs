import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import path from 'path'; // Add this import

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
        '/src/images': path.resolve('./src/images'),
      },
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

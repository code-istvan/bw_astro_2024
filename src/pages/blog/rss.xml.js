import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Bandha Works Jógaiskola | Blog',
    description: 'Astanga jóga blog',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./posts/**/*.md')),
    customData: `<language>hu-hu</language>`,
  });
}

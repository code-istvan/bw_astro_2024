// import rss, { pagesGlobToRssItems } from '@astrojs/rss';

// const allPosts = await pagesGlobToRssItems(import.meta.glob('./*.md')),

// const postImportResult = import.meta.glob('./blog/**/*.md', { eager: true });
// const posts = allPosts(Object.values(postImportResult));

// export const get = () =>
//   rss({
//     stylesheet: '/rss/styles.xsl',
//     title: 'My Astro Blog',
//     description: 'A humble Astronaut’s guide to the stars',
//     site: import.meta.env.SITE,
//     items: posts.map((post) => ({
//       link: post.url,
//       title: post.frontmatter.title,
//       pubDate: post.frontmatter.date,
//       description: post.frontmatter.description,
//       customData: `
//         <author>${post.frontmatter.author}</author>
//       `,
//     })),
//   });

// import rss, { pagesGlobToRssItems } from '@astrojs/rss';

// export async function GET(context) {
//   const blog = import.meta.glob('./*.md');
//   const posts = Object.values(blog);
//   console.log(await pagesGlobToRssItems(import.meta.glob('/blog/*.md')));

//   console.log(posts);
//   return rss({
//     title: 'Buzz’s Blog',
//     description: 'A humble Astronaut’s guide to the stars',
//     site: context.site,
//     // items: await pagesGlobToRssItems(import.meta.glob('./*.md')),
//     items: posts.map((post) => ({
//       pubDate: post.date,
//     })),
//   });
// }

// import rss, { pagesGlobToRssItems } from '@astrojs/rss';

// export async function GET(context) {
//   return rss({
//     title: 'Bandha Works Jógaiskola | Blog',
//     description: 'Astanga jóga blog',
//     site: context.site,
// items: await pagesGlobToRssItems(import.meta.glob('/**/*.md')),
//     customData: `<language>hu-hu</language>`,
//   });
// }

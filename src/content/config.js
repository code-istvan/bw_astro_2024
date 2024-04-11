import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    published: z.boolean(),
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    tags: z.string().array().optional(),
    date: z.coerce.date().optional(),
    thumbnail: z.string().optional(),
    thumbnailMobile: z.string().optional(),
    content: z.string(),
  }),
});

export const collections = {
  posts: posts,
};

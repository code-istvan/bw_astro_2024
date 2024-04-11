import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    // description: z.string(),
    date: z.coerce.date(),
    // updatedDate: z.coerce.date().optional(),
    // featuredImage: z.string().optional(),
    // tags: z.string().array().optional(),
    // author: z.string(),
    // isFeatured: z.boolean(),
  }),
});

export const collections = {
  posts: posts,
};

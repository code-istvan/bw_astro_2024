import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    published: z.boolean(),
    title: z.string(),
    description: z.string(),
    author: z.string(),
    tags: z.string().array().optional(),
    date: z.coerce.date(),
    // date: z.coerce.date().optional(),
    image: z.string().optional(),
    imageMobil: z.string().optional(),
    // content: z.string(),
  }),
});

const schedulCollection = defineCollection({
  type: 'content',
  schema: z.object({
    classId: z.string(),
    class: z.string(),
    shortDescription: z.string().optional(),
    signup: z.string().optional(),
  }),
});

export const collections = {
  blog: postsCollection,
  schedule: schedulCollection,
};

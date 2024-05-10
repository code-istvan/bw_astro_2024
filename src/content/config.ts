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

const classesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    classId: z.string(),
    class: z.string(),
    shortDescription: z.string().optional(),
    signup: z.string().optional(),
  }),
});

const customDatesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    customDate: z.string(),
  }),
});

export const collections = {
  blog: postsCollection,
  schedule: classesCollection,
  customDates: customDatesCollection,
};

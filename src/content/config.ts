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

const scheduleCollection = defineCollection({
  type: 'data',
  schema: z.object({
    published: z.boolean(),
    fullmoon: z.boolean(),
    newmoon: z.boolean(),
    ekadashi: z.boolean(),
    date: z.coerce.date(),
    class: z.string(),
    teacher: z.string(),
    classTime: z.string(),
  }),
});

// const classesCollection = defineCollection({
//   type: 'data',
//   schema: z.object({
//     classId: z.string(),
//     class: z.string(),
//     shortDescription: z.string().optional(),
//     signup: z.string().optional(),
//   }),
// });

// const customDatesCollection = defineCollection({
//   type: 'data',
//   schema: z.object({
//     customTime: z.string(),
//   }),
// });

export const collections = {
  blog: postsCollection,
  schedule: scheduleCollection,
  // customDates: customDatesCollection,
};

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
    class2: z.string().optional(),
    teacher2: z.string().optional(),
    classTime2: z.string().optional(),
    class3: z.string().optional(),
    teacher3: z.string().optional(),
    classTime3: z.string().optional(),
    class4: z.string().optional(),
    teacher4: z.string().optional(),
    classTime4: z.string().optional(),
  }),
});

const classesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    classId: z.string(),
    class: z.string(),
  }),
});

const teachersCollection = defineCollection({
  type: 'data',
  schema: z.object({
    teacherId: z.string(),
    teacher: z.string(),
  }),
});

const customTimesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    customTime: z.string(),
  }),
});

export const collections = {
  blog: postsCollection,
  schedule: scheduleCollection,
  customTimes: customTimesCollection,
  classes: classesCollection,
  teachers: teachersCollection,
};

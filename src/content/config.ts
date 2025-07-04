import { defineCollection, z } from 'astro:content';

const authorsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string().optional(),
    authorimage: z.string(),
  }),
});

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    published: z.boolean(),
    language: z.enum(['Hungarian', 'English']),
    title: z.string(),
    description: z.string(),
    author: z.string(),
    tags: z.string().array().optional(),
    date: z.coerce.date(),
    image: z.string().optional(),
    imageMobil: z.string().optional(),
    canonical: z.string().optional(),
    canonicalLanguage: z.enum(['Hungarian', 'English']).optional(),
    titleBackground: z.boolean().optional(),
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
    teacher: z.string().optional(),
    classTime: z.string().optional(),
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
    classHu: z.string(),
    classEn: z.string(),
    classDetailHu: z.string().regex(/.*/, {
      message: 'HTML content allowed',
    }),
    classDetailEn: z.string().regex(/.*/, {
      message: 'HTML content allowed',
    }),
    classSignUpUrl: z.string().optional(),
  }),
});

const teachersCollection = defineCollection({
  type: 'data',
  schema: z.object({
    published: z.boolean(),
    teacherOrder: z.number().optional(),
    teacherId: z.string(),
    teacher: z.string(),
    teacherLink: z.string().optional(),
    teacherImage: z.string().optional(),
    huTeacherFullName: z.string().optional(),
    enTeacherFullName: z.string().optional(),
    huTeacherStyle: z.string().optional(),
    enTeacherStyle: z.string().optional(),
    huTeacherTitle: z.string().optional(),
    enTeacherTitle: z.string().optional(),
    offTheMat: z.boolean().optional(),
    huOffTheMatTitle: z.string().optional(),
    enOffTheMatTitle: z.string().optional(),
    offTheMatLink: z.string().optional(),
  }),
});

const customTimesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    customTime: z.string(),
  }),
});

const eventsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    published: z.boolean(),
    featured: z.boolean(),
    eventType: z.string().optional(),
    eventid: z.string(),
    date: z.coerce.date(),
    title: z.string(),
    titleEnglish: z.string().optional(),
    eventimage: z.string().optional().optional(),
    shortdescription: z.string().optional(),
    shortdescriptionEnglish: z.string().optional(),
    eventlink: z.string().optional(),
    eventlinkEnglish: z.string().optional(),
    eventApplicationLink: z.string().optional(),
    teacher: z.string(),
  }),
});

const coursesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    published: z.boolean(),
    featured: z.boolean(),
    courseFull: z.boolean(),
    courseType: z.enum(['Ashtanga beginner', 'Mysore-course']),
    courseId: z.string(),
    date: z.coerce.date(),
    title: z.string(),
    titleEnglish: z.string(),
    days: z.string(),
    daysEnglish: z.string(),
    duration: z.string(),
    durationEnglish: z.string(),
    teacher: z.string(),
    courseLink: z.string(),
    note: z.string().optional(),
    noteEnglish: z.string().optional(),
  }),
});

const imageGalleryCollection = defineCollection({
  type: 'data',
  schema: z.object({
    published: z.boolean(),
    year: z.number(),
    titleHu: z.string(),
    titleEn: z.string(),
    fileName: z.string(),
    sourceUrl: z.string(),
    highlighted: z.boolean(),
    tags: z.string().array(),
  }),
});

export const collections = {
  blog: postsCollection,
  authors: authorsCollection,
  schedule: scheduleCollection,
  customTimes: customTimesCollection,
  classes: classesCollection,
  teachers: teachersCollection,
  events: eventsCollection,
  courses: coursesCollection,
  imageGallery: imageGalleryCollection,
};

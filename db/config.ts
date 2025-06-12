import { defineDb, defineTable, column } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    fullname: column.text(),
    alias: column.text({ unique: true }),
    email: column.text({ unique: true }),
    password: column.text(),
    special_question: column.text({ multiline: true }),
    special_answer: column.text({ multiline: true }),
  },
});

export default defineDb({
  tables: { User },
});

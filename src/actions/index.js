import { Resend } from 'resend';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  contact: defineAction({
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      comment: z.string(),
    }),
    accept: 'form',
    handler: async ({ name, email, comment }) => {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Bandha Works Shala <shala@bandha.works>',
          to: email,
          subject: `Üzeneted megérkezett hozzánk`,
          html: `Hello, <br> <br> You have a new message`,
        });
        console.log(email, name, comment);
        console.log(data, error);
        return { ok: true };
      } catch (error) {}
    },
  }),
};

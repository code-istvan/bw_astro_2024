import { Resend } from 'resend';
import { defineAction } from 'astro:actions';

const resend = new Resend('re_Mgdv8fRS_4YVeamZsLfCmXnAP4Lrgayfz');

export const server = {
  contact: defineAction({
    // accept: 'form',
    handler: async ({}) => {
      try {
        const { data, error } = await emails.send({
          from: 'Istvan <your@email.com>',
          to: 'bandha.works@gmail.com',
          subject: `New message from from)`,
          html: `Hello, <br> <br> You have a new message`,
        });
        return { ok: true };
      } catch (error) {}
    },
  }),
};

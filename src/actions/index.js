import { Resend } from 'resend';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const emailTemplates = {
  hu: {
    subject: 'Üzeneted megérkezett hozzánk',
    content: (name, comment) => `
      <p>Kedves ${name},</p>

      <p>Köszönjük, hogy felvetted velünk a kapcsolatot!</p>
      <p>Az üzeneted tartalma:</p>
      <blockquote>${comment}</blockquote>
      <p>Csapatunk az elkövetkező munkanapokon - általában 24-48 órán belül - feldolgozza az üzeneted, hamarosan válaszolunk.</p>
      <p>Namasté,<br>Bandha Works Shala</p>
    `,
  },
  en: {
    subject: 'We received your message',
    content: (name, comment) => `
      <p>Dear ${name},</p>

      <p>Thank you for reaching out to us!</p>
      <p>Your message:</p>
      <blockquote>${comment}</blockquote>
      <p>Our team will process your message within 1-2 business days and get back to you soon.</p>
      <p>Namasté,<br>The Bandha Works Shala</p>
    `,
  },
};

export const server = {
  contact: defineAction({
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      comment: z.string(),
      language: z.string().default('hu').optional(),
    }),
    accept: 'json',
    handler: async ({ name, email, comment, language = 'hu' }) => {
      try {
        const emailTemplate = emailTemplates[language] || emailTemplates.hu;

        const { data, error } = await resend.emails.send({
          from: 'Bandha Works Shala <shala@bandha.works>',
          to: email,
          subject: emailTemplate.subject,
          html: emailTemplate.content(name, comment),
        });

        if (error) {
          throw new Error(error.message);
        }

        return { data: { ok: true } };
      } catch (error) {
        console.error('Email küldési hiba:', error);
        return { data: { ok: false } };
      }
    },
  }),
  // contact2: defineAction({
  //   input: z.object({
  //     name: z.string(),
  //     email: z.string().email(),
  //     comment: z.string(),
  //     language: z.string().default('hu').optional(),
  //   }),
  //   accept: 'json',
  //   handler: async ({ name, email, comment, language = 'hu' }) => {
  //     try {
  //       const emailTemplate = emailTemplates[language] || emailTemplates.hu;

  //       const { data, error } = await resend.emails.send({
  //         from: 'Bandha Works Shala <shala@bandha.works>',
  //         to: email,
  //         subject: emailTemplate.subject,
  //         html: emailTemplate.content(name, comment),
  //       });

  //       if (error) {
  //         throw new Error(error.message);
  //       }

  //       return { data: { ok: true } };
  //     } catch (error) {
  //       console.error('Email küldési hiba:', error);
  //       return { data: { ok: false } };
  //     }
  //   },
  // }),
};

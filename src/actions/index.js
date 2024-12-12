import { Resend } from 'resend';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { kapcsolatEmailTemplate } from './templates/kapcsolatEmailTemplate';
import { contactEmailTemplate } from './templates/contactEmailTemplate';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const emailTemplates = {
  hu: kapcsolatEmailTemplate,
  en: contactEmailTemplate,
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

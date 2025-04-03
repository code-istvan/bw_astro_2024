import { Resend } from 'resend';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { kapcsolatEmailTemplate } from './templates/kapcsolatEmailTemplate';
import { contactEmailTemplate } from './templates/contactEmailTemplate';
import { hirlevelEmailTemplate } from './templates/hirlevelEmailTemplate';
import { newsletterEmailTemplate } from './templates/newsletterEmailTemplate';
import { mysoreHuEmailTemplate } from './templates/mysoreHuEmailTemplate';
import { mysoreEnEmailTemplate } from './templates/mysoreEnEmailTemplate';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const emailTemplates = {
  hu: kapcsolatEmailTemplate,
  en: contactEmailTemplate,
};

const newsEmailTemplates = {
  hu: hirlevelEmailTemplate,
  en: newsletterEmailTemplate,
};

const mysoreEmailTemplates = {
  hu: mysoreHuEmailTemplate,
  en: mysoreEnEmailTemplate,
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

  //MysoreForm
  mysoreform: defineAction({
    input: z.object({
      familyName: z.string(),
      givenName: z.string(),
      email: z.string().email(),
      experience: z.string(),
      experienceLevel: z.string(),
      language: z.string().default('hu').optional(),
    }),
    accept: 'json',
    handler: async ({ familyName, givenName, email, experience, experienceLevel, language = 'hu' }) => {
      try {
        const mysoreEmailTemplate = mysoreEmailTemplates[language] || mysoreEmailTemplates.hu;

        // Kombinált név a teljes névhez
        const fullName = `${familyName} ${givenName}`;

        const { data, error } = await resend.emails.send({
          from: 'Bandha Works Shala <shala@bandha.works>',
          to: email,
          subject: mysoreEmailTemplate.subject,
          html: mysoreEmailTemplate.content(fullName, experience, experienceLevel),
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

  //Newsletter
  newsletter: defineAction({
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      language: z.string().default('hu').optional(),
    }),
    accept: 'json',
    handler: async ({ name, email, language = 'hu' }) => {
      try {
        const newsEmailTemplate = newsEmailTemplates[language] || newsEmailTemplates.hu;

        const { data, error } = await resend.emails.send({
          from: 'Bandha Works Shala <shala@bandha.works>',
          to: email,
          subject: newsEmailTemplate.subject,
          html: newsEmailTemplate.content(name, email),
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
};

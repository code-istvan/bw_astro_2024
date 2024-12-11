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
    accept: 'json', // Pontosítjuk az elfogadott formátumot
    handler: async ({ name, email, comment }) => {
      try {
        const emailContent = `
          <p>Kedves ${name},</p>

          <p>Köszönjük, hogy felvetted velünk a kapcsolatot!</p>
          <p>Az üzeneted tartalma:</p>
          <blockquote>${comment}</blockquote>
          <p>Csapatunk az elkövetkező munkanapokon - általában 24-48 órán belül - feldolgozza az üzeneted, hamarosan válaszolunk.</p>
          <p>Namasté,<br>Bandha Works Shala csapata</p>
        `;
        const { data, error } = await resend.emails.send({
          from: 'Bandha Works Shala <shala@bandha.works>',
          to: email,
          subject: 'Üzeneted megérkezett hozzánk',
          html: emailContent,
        });

        if (error) {
          throw new Error(error.message);
        }
        return { data: { ok: true } }; // Pontosítjuk a visszatérési formátumot
      } catch (error) {
        console.error('Email küldési hiba:', error);
        return { data: { ok: false } }; // Hibás állapotban is küldünk választ
      }
    },
  }),
};

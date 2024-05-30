import { defineAction, z, ActionError } from 'astro:actions';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: import.meta.env.PUBLIC_MAILCHIMP_API_KEY,
  server: import.meta.env.PUBLIC_MAILCHIMP_SERVER_PREFIX,
});

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const server = {
  mailchimp: defineAction({
    accept: 'form',
    input: contactFormSchema,
    handler: async ({ name, email }) => {
      try {
        const contactValidation = contactFormSchema.safeParse({
          name,
          email,
        });
        await mailchimp.lists.addListMember(import.meta.env.PUBLIC_MAILCHIMP_LIST_ID, {
          email_address: subscriptionData.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: subscriptionData.name,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return new ActionError({ code, message });
      }
    },
  }),
};

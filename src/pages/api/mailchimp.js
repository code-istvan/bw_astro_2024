import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: import.meta.env.PUBLIC_MAILCHIMP_API_KEY,
  server: import.meta.env.PUBLIC_MAILCHIMP_SERVER_PREFIX,
});

export const POST = async ({ request }) => {
  console.log(request);
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  await mailchimp.lists.addListMember(import.meta.env.PUBLIC_MAILCHIMP_LIST_ID, {
    email_address: subscriptionData.email,
    status: 'subscribed',
    merge_fields: {
      FNAME: subscriptionData.name,
    },
  });
  return new Response(
    JSON.stringify({
      message: 'Your name was: ' + name,
    }),
    {
      status: 200,
    }
  );
};

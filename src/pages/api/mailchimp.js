import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: import.meta.env.PUBLIC_MAILCHIMP_API_KEY,
  server: import.meta.env.PUBLIC_MAILCHIMP_SERVER_PREFIX,
});

export const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    console.log('formData', formData);

    const name = formData.get('name');
    const email = formData.get('email');

    console.log(name, email);

    const response = await mailchimp.lists.addListMember(import.meta.env.PUBLIC_MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name,
      },
    });
    console.log(response.ok);
    return new Response(JSON.stringify({}), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      {
        status: 500,
      }
    );
  }
};

export const POST = async ({ request }) => {
  const body = await request.json();
  const name = body.name;
  return new Response(
    JSON.stringify({
      message: 'Your name was: ' + name,
    }),
    {
      status: 200,
    }
  );

  return new Response(null, { status: 400 });
};

import { actions } from 'astro:actions';

export const submitNewsletter = async (event: Event, language: 'hu' | 'en') => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const name = formData.get('name') as string | null;
  const email = formData.get('email') as string | null;

  if (!name || !email || !language) {
    console.error('Hiányzó kötelező mezők.');
    return;
  }

  const successPath = language === 'en' ? '/en/feliratkozas-sikeres/' : '/feliratkozas-sikeres/';
  const errorPath = language === 'en' ? '/en/feliratkozas-sikertelen/' : '/feliratkozas-sikertelen/';

  try {
    await fetch('/', {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error('Netlify form beküldés hiba:', error);
  }

  try {
    const response = await actions.newsletter({ name, email, language });
    if (response.data?.data?.ok) {
      window.location.href = successPath;
    } else {
      window.location.href = errorPath;
    }
  } catch (error) {
    console.error('Hiba történt:', error);
    window.location.href = errorPath;
  }
};

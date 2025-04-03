import { actions } from 'astro:actions';

export const submitMysore = async (event: Event, language: 'hu' | 'en') => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const familyName = formData.get('family-name') as string | null;
  const givenName = formData.get('given-name') as string | null;
  const email = formData.get('email') as string | null;
  const experience = formData.get('experience') as string | null;
  const experienceLevel = formData.get('experienceLevel') as string | null;

  if (!familyName || !givenName || !email || !experience || !experienceLevel || !language) {
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
    const response = await actions.mysoreform({ familyName, givenName, email, experience, experienceLevel, language });
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

import { actions } from 'astro:actions';

export const submitNewsletter = async (
  event: React.FormEvent<HTMLFormElement>,
  setLoading,
  setCheckboxClass,
  isChecked
) => {
  event.preventDefault();
  setLoading(true);

  if (!isChecked) {
    setCheckboxClass('red'); // Ha nincs bejelölve, váltson "red"-re
    setLoading(false);
    return;
  }

  const formData = new FormData(event.target as HTMLFormElement);
  const name = formData.get('name') as string | null;
  const email = formData.get('email') as string | null;
  const language = formData.get('language') as string | null;

  if (!name || !email || !language) {
    console.error('Hiányzó kötelező mezők.');
    setLoading(false);
    return;
  }

  // Meghatározza az átirányítási útvonalakat a `language` alapján
  const successPath = language === 'en' ? '/feliratkozas-sikeres/' : '/en/feliratkozas-sikeres/';
  const errorPath = language === 'en' ? '/feliratkozas-sikertelen/' : '/en/feliratkozas-sikertelen/';

  // 1. Küldés Netlify felé
  try {
    await fetch('/', {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error('Netlify form beküldés hiba:', error);
  }

  // 2. Email küldés
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
  } finally {
    setLoading(false);
  }
};

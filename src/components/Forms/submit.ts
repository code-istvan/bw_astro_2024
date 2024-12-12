import { actions } from 'astro:actions';

export const submit = async (event: React.FormEvent<HTMLFormElement>, setLoading, setCheckboxClass, isChecked) => {
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
  const comment = formData.get('comments') as string | null;
  const language = formData.get('language') as string | null;

  if (!name || !email || !comment || !language) {
    console.error('Hiányzó kötelező mezők.');
    setLoading(false);
    return;
  }

  // 1. Küldés Netlify felé
  //   try {
  //     await fetch('/', {
  //       method: 'POST',
  //       body: formData,
  //     });
  //   } catch (error) {
  //     console.error('Netlify form beküldés hiba:', error);
  //   }

  // 2. Email küldés
  try {
    const response = await actions.contact({ name, email, comment, language });

    if (response.data?.data?.ok) {
      window.location.href = '/uzenet-elkuldve/';
    } else {
      window.location.href = '/uzenetkuldes-sikertelen/';
    }
  } catch (error) {
    console.error('Hiba történt:', error);
    window.location.href = '/uzenetkuldes-sikertelen/';
  } finally {
    setLoading(false);
  }
};

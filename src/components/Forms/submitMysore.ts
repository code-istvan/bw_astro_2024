import { actions } from 'astro:actions';

export const submitMysore = async (
  event: React.FormEvent<HTMLFormElement>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckboxClass: React.Dispatch<React.SetStateAction<string>>,
  isChecked: boolean,
  experienceLevel: string
) => {
  // event.preventDefault();
  setLoading(true);

  // Ellenőrizd, hogy a checkbox be van-e jelölve
  if (!isChecked) {
    setCheckboxClass('red');
    setLoading(false);
    return;
  }

  // Ellenőrizd, hogy a tapasztalati szint ki van-e választva
  if (!experienceLevel) {
    alert('Kérjük, válassz tapasztalati szintet!');
    setLoading(false);
    return;
  }

  const formData = new FormData(event.target as HTMLFormElement);
  const familyName = formData.get('familyname') as string | null;
  const surName = formData.get('surnamename') as string | null;
  const email = formData.get('email') as string | null;
  const email2 = formData.get('email2') as string | null;
  const comment = formData.get('comments') as string | null;
  const language = formData.get('language') as string | null;

  if (!familyName || !surName || !email || !email2 || !comment || !language) {
    console.error('Hiányzó kötelező mezők.');
    setLoading(false);
    return;
  }

  // Ellenőrizd, hogy a két email mező egyezik-e
  if (email !== email2) {
    alert('A két email cím nem egyezik!');
    setLoading(false);
    return;
  }

  // Tapasztalati szint hozzáadása a formData-hoz
  formData.append('experienceLevel', experienceLevel);

  const successPath = language === 'en' ? '/en/uzenet-elkuldve/' : '/uzenet-elkuldve/';
  const errorPath = language === 'en' ? '/en/uzenetkuldes-sikertelen/' : '/uzenetkuldes-sikertelen/';

  // 1. Küldés Netlify felé
  // try {
  //   await fetch('/', {
  //     method: 'POST',
  //     body: formData,
  //   });
  // } catch (error) {
  //   console.error('Netlify form beküldés hiba:', error);
  // }

  // 2. Email küldés
  try {
    const response = await actions.mysoreform({
      familyName,
      surName,
      email,
      comment,
      experienceLevel,
      language,
    });

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

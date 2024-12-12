import React, { useState } from 'react';
import { TextArea } from './TextArea/TextArea';
import { Checkbox } from './Checkbox/CheckBox';
import { Input } from './Input/Input';
import { submit } from './submit';
import { actions } from 'astro:actions';

export const KapcsolatForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkboxClass, setCheckboxClass] = useState('orange'); // Alapértelmezett osztály

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // if (!isChecked) {
    //   setCheckboxClass('red'); // Ha nincs bejelölve, váltson "red"-re
    //   setLoading(false);
    //   return;
    // }

    await submit(event, setLoading, setCheckboxClass, isChecked);
    // const formData = new FormData(event.target as HTMLFormElement);
    // const name = formData.get('name') as string | null;
    // const email = formData.get('email') as string | null;
    // const comment = formData.get('comments') as string | null;
    // const language = formData.get('language') as string | null;

    // if (!name || !email || !comment || !language) {
    //   console.error('Hiányzó kötelező mezők.');
    //   setLoading(false);
    //   return;
    // }

    // // 1. Küldés Netlify felé
    // try {
    //   await fetch('/', {
    //     method: 'POST',
    //     body: formData,
    //   });
    // } catch (error) {
    //   console.error('Netlify form beküldés hiba:', error);
    // }

    // // 2. Email küldés
    // try {
    //   const response = await actions.contact({ name, email, comment, language });

    //   if (response.data?.data?.ok) {
    //     window.location.href = '/uzenet-elkuldve/';
    //   } else {
    //     window.location.href = '/uzenetkuldes-sikertelen/';
    //   }
    // } catch (error) {
    //   console.error('Hiba történt:', error);
    //   window.location.href = '/uzenetkuldes-sikertelen/';
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    setCheckboxClass(isChecked ? 'orange' : 'red'); // Állapot szerinti osztály
  };

  return (
    <form
      name="contact bandhaworks 2025"
      onSubmit={handleSubmit}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="POST"
    >
      <input type="hidden" name="form-name" value="contact bandhaworks 2025" />
      <input type="hidden" name="language" value="hu" /> {/* Nyelv rögzítése */}
      <div hidden>
        <input name="bot-field" />
      </div>
      {/* Mezők */}
      <div className="row gap-1 mb-10px">
        <div className="col-12-xs col-6-md">
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Név"
            pattern="^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$"
            required
          />
        </div>
        <div className="col-12-xs col-6-md">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            required
          />
        </div>
      </div>
      <div className="row">
        <TextArea name="comments" placeholder="Üzenet" rows={5} required />
      </div>
      {/* Checkbox */}
      <Checkbox
        id="terms"
        name="terms"
        label={
          <>
            Megismertem és elfogadom az{' '}
            <a
              href="/adatvedelmi-tajekoztato/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-enhanced link-orange"
            >
              adatvédelmi tájékoztatót
            </a>
            , hozzájárulok nevem és email címem kezeléséhez.
          </>
        }
        checked={isChecked}
        className={checkboxClass}
        onChange={handleCheckboxChange}
      />
      <div className="row mt-20px mb-40px">
        <button type="submit" disabled={loading} className="btn btn--full-width-mobile btn--secondary--solid">
          {loading ? 'Küldés...' : 'Küldés'}
        </button>
      </div>
    </form>
  );
};

// EZ most működik de túl van bonyolítva

// import React, { useState } from 'react';
// import { TextArea } from './TextArea/TextArea';
// import { Checkbox } from './Checkbox/CheckBox';
// import { Input } from './Input/Input';
// import { actions } from 'astro:actions';

// export const KapcsolatForm = ({ language = 'hu' }) => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [checkboxClass, setCheckboxClass] = useState('orange'); // Alapértelmezett osztály

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!isChecked) {
//       setCheckboxClass('red'); // Ha nincs bejelölve, váltson "red"-re
//       setLoading(false);
//       return;
//     }

//     const formData = new FormData(event.target as HTMLFormElement);

//     const name = formData.get('name') as string | null;
//     const email = formData.get('email') as string | null;
//     const comment = formData.get('comments') as string | null;

//     if (!name || !email || !comment) {
//       console.error('Hiányzó kötelező mezők.');
//       setLoading(false);
//       return;
//     }

//     // 1. Küldés Netlify felé
//     try {
//       await fetch('/', {
//         method: 'POST',
//         body: formData,
//       });
//     } catch (error) {
//       console.error('Netlify form beküldés hiba:', error);
//     }

//     try {
//       const response = await actions.contact({ name, email, comment, language });

//       if (response.data?.data?.ok) {
//         window.location.href = language === 'hu' ? '/uzenet-elkuldve/' : '/message-sent/';
//       } else {
//         window.location.href = language === 'hu' ? '/uzenetkuldes-sikertelen/' : '/message-failed/';
//       }
//     } catch (error) {
//       console.error('Hiba történt:', error);
//       window.location.href = language === 'hu' ? '/uzenetkuldes-sikertelen/' : '/message-failed/';
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const isChecked = e.target.checked;
//     setIsChecked(isChecked);
//     setCheckboxClass(isChecked ? 'orange' : 'red'); // Állapot szerinti osztály
//   };

//   return (
//     <form
//       name="contact bandhaworks 2025"
//       onSubmit={handleSubmit}
//       data-netlify="true"
//       data-netlify-honeypot="bot-field"
//       method="POST"
//     >
//       <input type="hidden" name="form-name" value="contact bandhaworks 2025" />
//       <div hidden>
//         <input name="bot-field" />
//       </div>

//       {/* Mezők */}
//       <div className="row gap-1 mb-10px">
//         <div className="col-12-xs col-6-md">
//           <Input
//             id="name"
//             type="text"
//             name="name"
//             placeholder={language === 'hu' ? 'Név' : 'Name'}
//             pattern="^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$"
//             required
//           />
//         </div>
//         <div className="col-12-xs col-6-md">
//           <Input
//             id="email"
//             type="email"
//             name="email"
//             placeholder={language === 'hu' ? 'Email' : 'Email'}
//             pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
//             required
//           />
//         </div>
//       </div>
//       <div className="row">
//         <TextArea name="comments" placeholder={language === 'hu' ? 'Üzenet' : 'Message'} rows={5} required />
//       </div>

//       {/* Checkbox */}
//       <Checkbox
//         id="terms"
//         name="terms"
//         label={
//           language === 'hu' ? (
//             <>
//               Megismertem és elfogadom az{' '}
//               <a
//                 href="/adatvedelmi-tajekoztato/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="link-enhanced link-orange"
//               >
//                 adatvédelmi tájékoztatót
//               </a>
//               , hozzájárulok nevem és email címem kezeléséhez.
//             </>
//           ) : (
//             <>
//               I have read and agree to the{' '}
//               <a
//                 href="/privacy-policy/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="link-enhanced link-orange"
//               >
//                 privacy policy
//               </a>
//               , and consent to the processing of my name and email address.
//             </>
//           )
//         }
//         checked={isChecked}
//         className={checkboxClass} // Dinamikus osztály
//         onChange={handleCheckboxChange}
//       />

//       <div className="row mt-20px mb-40px">
//         <button type="submit" disabled={loading} className="btn btn--full-width-mobile btn--secondary--solid">
//           {loading ? (language === 'hu' ? 'Küldés...' : 'Sending...') : language === 'hu' ? 'Küldés' : 'Send'}
//         </button>
//       </div>
//     </form>
//   );
// };

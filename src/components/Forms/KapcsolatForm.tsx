import React, { useState } from 'react';
import { TextArea } from './TextArea/TextArea';
import { Checkbox } from './Checkbox/CheckBox';
import { Input } from './Input/Input';
import { actions } from 'astro:actions';

export const KapcsolatForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);

    // Safely extract form data and ensure it's a string
    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const comment = formData.get('comments') as string | null;

    if (!name || !email || !comment) {
      console.error('Missing required fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await actions.contact({ name, email, comment });

      if (response.data?.data?.ok) {
        window.location.href = '/uzenet-elkuldve/';
      } else {
        window.location.href = '/uzenetkuldes-sikertelen/';
      }
    } catch (error) {
      window.location.href = '/uzenetkuldes-sikertelen/';
    } finally {
      setLoading(false);
    }
  };

  return (
    <form name="contact bandhaworks 2025" onSubmit={handleSubmit} data-netlify="true" data-netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="contact bandhaworks 2025" />
      <div hidden>
        <input name="bot-field" />
      </div>
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
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            required
          />
        </div>
      </div>
      <div className="row">
        <TextArea name="comments" placeholder="Üzenet" rows={5} required />
      </div>
      <div className="row mt-20px">
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
          onChange={(e) => setIsChecked(e.target.checked)}
          className="orange"
        />
      </div>
      <div className="row mt-20px mb-40px">
        <button
          type="submit"
          disabled={!isChecked || loading}
          className="btn btn--full-width-mobile btn--secondary--solid"
        >
          {loading ? 'Küldés...' : 'Küldés'}
        </button>
      </div>
    </form>
  );
};

// import React, { useState } from 'react';
// import { TextArea } from './TextArea/TextArea';
// import { Checkbox } from './Checkbox/CheckBox';
// import { Input } from './Input/Input';
// import { actions } from 'astro:actions';

// interface ContactResponseData {
//   ok: boolean;
// }

// export const KapcsolatForm = () => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);
//     setErrorMessage('');
//     setSuccessMessage('');

//     const formData = new FormData(event.target as HTMLFormElement);
//     const name = formData.get('name')?.toString() || '';
//     const email = formData.get('email')?.toString() || '';
//     const comment = formData.get('comments')?.toString() || '';

//     try {
//       const response = await actions.contact({
//         name,
//         email,
//         comment,
//       });

//       const result = response.data?.data as ContactResponseData;

//       if (result?.ok) {
//         // setSuccessMessage('Az üzeneted sikeresen megérkezett!');
//         window.location.href = '/uzenet-elkuldve/';
//       } else {
//         // throw new Error('Az üzenet küldése nem sikerült.');
//         window.location.href = '/uzenetkuldes-sikertelen/';
//       }
//     } catch (error) {
//       // setErrorMessage('Hiba történt az üzenet küldésekor.');
//       window.location.href = '/uzenetkuldes-sikertelen/';
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form name="contact bandhaworks 2025" onSubmit={handleSubmit} data-netlify="true" data-netlify-honeypot="bot-field">
//       <input type="hidden" name="form-name" value="contact bandhaworks 2025" />
//       <div hidden>
//         <input name="bot-field" />
//       </div>
//       <div className="row gap-1 mb-10px">
//         <div className="col-12-xs col-6-md">
//           <Input
//             id="name"
//             type="text"
//             name="name"
//             placeholder="Név"
//             pattern="^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$"
//             required
//           />
//         </div>
//         <div className="col-12-xs col-6-md">
//           <Input
//             id="email"
//             type="email"
//             name="email"
//             placeholder="Email"
//             pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
//             required
//           />
//         </div>
//       </div>
//       <div className="row">
//         <TextArea name="comments" placeholder="Üzenet" rows={5} required />
//       </div>
//       <div className="row mt-20px">
//         <Checkbox
//           id="terms"
//           name="terms"
//           label={
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
//           }
//           checked={isChecked}
//           onChange={(e) => setIsChecked(e.target.checked)}
//           className="orange"
//         />
//       </div>
//       <div className="row mt-20px mb-40px">
//         <button
//           type="submit"
//           disabled={!isChecked || loading}
//           className="btn btn--full-width-mobile btn--secondary--solid"
//         >
//           {loading ? 'Küldés...' : 'Küldés'}
//         </button>
//       </div>
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       {successMessage && <div className="success-message">{successMessage}</div>}
//     </form>
//   );
// };

// import React, { useState } from 'react';
// import { TextArea } from './TextArea/TextArea';
// import { Checkbox } from './Checkbox/CheckBox';
// import { Input } from './Input/Input';
// import { actions } from 'astro:actions';

// export const KapcsolatForm = () => {
//   const [isChecked, setIsChecked] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log('submit');
//     const formData = new FormData();
//     formData.append('name', 'Ferran');
//     formData.append('email', 'bandha.works@gmail.com');
//     formData.append('comment', 'Hello');
//     const response = await actions.contact(formData);
//     console.log(response);
//     if (response.data.ok) {
//       window.location.href = '/uzenet-elkuldve/';
//     }
//   };

//   return (
//     <form
//       name="contact bandhaworks 2025"
//       action="/message-sent"
//       onSubmit={(event) => handleSubmit(event)}
//       // method="post"
//       data-netlify="true"
//       data-netlify-honeypot="bot-field"
//     >
//       <input type="hidden" name="form-name" value="contact bandhaworks 2025" />
//       <div hidden>
//         <input name="bot-field" />
//       </div>
//       <div className="row gap-1 mt-20px mb-16px">
//         <div className="col-12-xs col-6-md">
//           <Input
//             id="name"
//             type="text"
//             name="name"
//             placeholder="Név"
//             pattern="^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$"
//             required
//           />
//         </div>
//         <div className="col-12-xs col-6-md">
//           <Input
//             id="email"
//             type="email"
//             name="email"
//             placeholder="Email"
//             pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
//             required
//           />
//         </div>
//       </div>
//       <div className="row">
//         <TextArea name="comments" placeholder="Üzenet" rows={5} required />
//       </div>
//       <div className="row mt-20px">
//         <Checkbox
//           id="terms"
//           name="terms"
//           label={
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
//           }
//           checked={isChecked}
//           onChange={(e) => setIsChecked(e.target.checked)}
//           className="orange"
//         />
//       </div>
//       <div className="row mt-20px">
//         <button type="submit" disabled={!isChecked} className="btn btn--full-width-mobile btn--secondary--solid">
//           Küldés
//         </button>
//       </div>
//     </form>
//   );
// };

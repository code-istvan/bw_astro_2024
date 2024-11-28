import React, { useState } from 'react';
import { TextArea } from './TextArea/TextArea';
import { Checkbox } from './Checkbox/CheckBox';
import { Input } from './Input/Input';
import { actions } from 'astro:actions';
import './_kapcsolatForm.scss';

type ContactFormData = {
  name: string;
  email: string;
  comments: string;
};

export const KapcsolatForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');

    // Ideiglenesen erőltetett típus a hibák elkerülése érdekében
    const formData: ContactFormData = {
      name: 'Ferran',
      email: 'fbuireu@gmail.com',
      comments: 'Hello',
    };

    // Típus kikapcsolása, hogy átmenetileg működjön
    const response = await actions.contact(formData as any);

    console.log(response);
  };

  return (
    <form
      name="contact bandhaworks 2025"
      // action="/message-sent"
      onSubmit={(event) => handleSubmit(event)}
      // method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact bandhaworks 2025" />
      <div hidden>
        <input name="bot-field" />
      </div>
      <div className="row gap-1 mb-12px">
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
        <button type="submit" disabled={!isChecked} className="btn btn--full-width-mobile btn--secondary--solid">
          Küldés
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

// export const KapcsolatForm = () => {
//   const [isChecked, setIsChecked] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log('submit');
//     const response = await actions.contact({ name: 'Ferran', email: 'fbuireu@gmail.com', comments: 'Hello' });
//     console.log(response);
//   };

//   return (
//     <form
//       name="contact bandhaworks 2025"
//       // action="/message-sent"
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

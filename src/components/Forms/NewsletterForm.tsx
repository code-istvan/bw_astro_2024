import React, { useState } from 'react';
import { Checkbox } from './Checkbox/CheckBox';
import { Input } from './Input/Input';
import { Patterns } from './patterns';

export const NewsletterForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true); // Név validáció állapota
  const [isEmailValid, setIsEmailValid] = useState(true); // Email validáció állapota

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Ellenőrizzük, hogy minden mező valid-e
    if (!isNameValid || !isEmailValid || !isChecked) {
      alert('Kérjük, javítsd ki a hibás mezőket, és fogadd el a feltételeket!');
      return;
    }

    // Valid form submission (Netlify kezeli a beküldést)
    alert('Successfully subscribed to the newsletter!');
  };

  return (
    <form
      name="feliratkozas hirlevelre"
      action="/feliratkozas-sikeres/"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="feliratkozas hirlevelre" />
      <div hidden>
        <input name="bot-field" />
      </div>
      <div className="row gap-1 mt-20px mb-20px">
        <div className="col-12-xs col-6-md">
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Név"
            pattern={Patterns.name} // Közös minta a patterns.ts-ből
            onValidate={(isValid) => setIsNameValid(isValid)} // Validációs callback
          />
          {!isNameValid && <p className="error-text">Please enter a valid name!</p>}
        </div>
        <div className="col-12-xs col-6-md">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            pattern={Patterns.email} // Közös minta a patterns.ts-ből
            onValidate={(isValid) => setIsEmailValid(isValid)} // Validációs callback
          />
          {!isEmailValid && <p className="error-text">Please enter a valid email address!</p>}
        </div>
      </div>
      <div className="row mt-20px">
        <Checkbox
          id="terms"
          name="terms"
          label={
            <>
              I have read and accept{' '}
              <a
                href="/en/adatvedelmi-tajekoztato/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-enhanced link-orange"
              >
                the privacy policy
              </a>
              , I consent to the processing of my name and email address.
            </>
          }
          required
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className={isChecked ? 'orange' : 'red'} // Checkbox állapot szerinti szín
        />
      </div>
      <div className="row mt-20px">
        <button
          type="submit"
          disabled={!isNameValid || !isEmailValid || !isChecked} // Beküldés csak valid mezők esetén
          className="btn btn--full-width-mobile btn--secondary--solid"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};

// import React, { useState } from 'react';
// import { Checkbox } from './Checkbox/CheckBox';
// import { Input } from './Input/Input';

// export const NewsletterForm = () => {
//   const [isChecked, setIsChecked] = useState(false);

//   return (
//     <form
//       name="feliratkozas hirlevelre"
//       action="/feliratkozas-sikeres/"
//       method="post"
//       data-netlify="true"
//       data-netlify-honeypot="bot-field"
//     >
//       <input type="hidden" name="form-name" value="feliratkozas hirlevelre" />
//       <div hidden>
//         <input name="bot-field" />
//       </div>
//       <div className="row gap-1 mt-20px mb-20px">
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
//           required
//           checked={isChecked}
//           onChange={(e) => setIsChecked(e.target.checked)}
//           className="orange"
//         />
//       </div>
//       <div className="row mt-20px">
//         {/* <button type="submit" disabled={!isChecked} className="btn btn--full-width-mobile btn--secondary--solid">
//           Feliratkozás
//         </button> */}
//         <button type="submit" className="btn btn--full-width-mobile btn--secondary--solid">
//           Feliratkozás
//         </button>
//       </div>
//     </form>
//   );
// };

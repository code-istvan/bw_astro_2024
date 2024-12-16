import React, { useState } from 'react';
import { TextArea } from './TextArea/TextArea';
import { Checkbox } from './Checkbox/CheckBox';
import { Input } from './Input/Input';
import { submit } from './submit';
import { Patterns } from './patterns.ts'; // Importáljuk a közös regex mintákat

export const ContactForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkboxClass, setCheckboxClass] = useState('orange');
  const [isNameValid, setIsNameValid] = useState(true); // Name validation state
  const [isEmailValid, setIsEmailValid] = useState(true); // Email validation state

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    setCheckboxClass(isChecked ? 'orange' : 'red');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if all fields are valid
    if (!isNameValid || !isEmailValid) {
      alert('Please correct the errors in the form.');
      return;
    }

    setLoading(true);
    await submit(event, setLoading, setCheckboxClass, isChecked);
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
      <input type="hidden" name="language" value="en" /> {/* Language setting */}
      <div hidden>
        <input name="bot-field" />
      </div>
      {/* Fields */}
      <div className="row gap-1 mb-10px">
        <div className="col-12-xs col-6-md">
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            pattern={Patterns.name} // Name validation regex
            onValidate={(isValid) => setIsNameValid(isValid)} // Validation callback
          />
        </div>
        <div className="col-12-xs col-6-md">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            pattern={Patterns.email} // Email validation regex
            onValidate={(isValid) => setIsEmailValid(isValid)} // Validation callback
          />
        </div>
      </div>
      <div className="row">
        <TextArea name="comments" placeholder="Message" rows={5} required />
      </div>
      {/* Checkbox */}
      <Checkbox
        id="terms"
        name="terms"
        label={
          <>
            I have read and accept the{' '}
            <a
              href="/en/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-enhanced link-orange"
            >
              privacy policy
            </a>
            , and consent to the processing of my name and email address.
          </>
        }
        checked={isChecked}
        className={checkboxClass}
        onChange={handleCheckboxChange}
      />
      <div className="row mt-20px mb-40px">
        <button type="submit" disabled={loading} className="btn btn--full-width-mobile btn--secondary--solid">
          {loading ? 'Send...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

// import React, { useState } from 'react';
// import { TextArea } from './TextArea/TextArea';
// import { Checkbox } from './Checkbox/CheckBox';
// import { Input } from './Input/Input';
// import { submit } from './submit';

// export const ContactForm = () => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [checkboxClass, setCheckboxClass] = useState('orange'); // Alapértelmezett osztály

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     await submit(event, setLoading, setCheckboxClass, isChecked);
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
//       <input type="hidden" name="language" value="en" /> {/* Nyelv rögzítése */}
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
//             placeholder="Name"
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
//             pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
//             required
//           />
//         </div>
//       </div>
//       <div className="row">
//         <TextArea name="comments" placeholder="Message" rows={5} required />
//       </div>
//       {/* Checkbox */}
//       <Checkbox
//         id="terms"
//         name="terms"
//         label={
//           <>
//             I have read and accept the{' '}
//             <a
//               href="/en/privacy-policy/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="link-enhanced link-orange"
//             >
//               privacy policy
//             </a>
//             , and consent to the processing of my name and email address.
//           </>
//         }
//         checked={isChecked}
//         className={checkboxClass}
//         onChange={handleCheckboxChange}
//       />
//       <div className="row mt-20px mb-40px">
//         <button type="submit" disabled={loading} className="btn btn--full-width-mobile btn--secondary--solid">
//           {loading ? 'Send...' : 'Send'}
//         </button>
//       </div>
//     </form>
//   );
// };

// import React, { useState } from 'react';
// import { Checkbox } from './Checkbox/CheckBox';
// import { Input } from './Input/Input';
// import { submitNewsletter } from './submitNewsletter';
// import { Patterns } from './patterns';

// export const NewsletterForm = () => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [checkboxClass, setCheckboxClass] = useState('orange'); // Alapértelmezett osztály
//   const [isNameValid, setIsNameValid] = useState(true); // Név validáció állapota
//   const [isEmailValid, setIsEmailValid] = useState(true); // Email validáció állapota

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     // Ellenőrizzük, hogy minden mező valid-e
//     if (!isNameValid || !isEmailValid) {
//       alert('Please correct the invalid field!');
//       return;
//     }

//     setLoading(true);
//     await submitNewsletter(event, setLoading, setCheckboxClass, isChecked);
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const isChecked = e.target.checked;
//     setIsChecked(isChecked);
//     setCheckboxClass(isChecked ? 'orange' : 'red'); // Állapot szerinti osztály
//   };

//   return (
//     <form
//       name="newsletter-form"
//       onSubmit={handleSubmit}
//       data-netlify="true"
//       data-netlify-honeypot="bot-field"
//       method="POST"
//     >
//       <input type="hidden" name="form-name" value="newsletter-form" />
//       <input type="hidden" name="language" value="en" />
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
//             pattern={Patterns.name} // Közös minta a patterns.ts-ből
//             onValidate={(isValid) => setIsNameValid(isValid)} // Validációs callback
//           />
//         </div>
//         <div className="col-12-xs col-6-md">
//           <Input
//             id="email"
//             type="email"
//             name="email"
//             placeholder="Email"
//             pattern={Patterns.email} // Közös minta a patterns.ts-ből
//             onValidate={(isValid) => setIsEmailValid(isValid)} // Validációs callback
//           />
//         </div>
//       </div>

//       <Checkbox
//         id="terms"
//         name="terms"
//         label={
//           <>
//             I have read and accept the{' '}
//             <a
//               href="/en/adatvedelmi-tajekoztato/"
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
//         <button type="submit" disabled={loading} className="btn btn--width-full-mobile btn--secondary--solid">
//           {loading ? 'Send...' : 'Send'}
//         </button>
//       </div>
//     </form>
//   );
// };

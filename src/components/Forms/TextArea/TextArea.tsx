// import React from 'react';
// import './_textArea.scss';

// type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// export const TextArea = ({ placeholder, id, className, name, rows, required, ...props }: TextAreaProps) => {
//   return (
//     <div className={`textarea-wrapper ${className || ''}`.trim()}>
//       {/* A label csak a hozzáférhetőségi kapcsolatot szolgálja */}
//       {id && <label htmlFor={id} className="textarea-label"></label>}
//       <textarea
//         id={id}
//         name={name}
//         rows={rows}
//         placeholder={placeholder}
//         required={required}
//         className="textarea"
//         {...props} // További attribútumok, például `onChange` vagy `defaultValue`
//       />
//     </div>
//   );
// };

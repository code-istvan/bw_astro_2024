import React, { useState } from 'react';
import './_input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  placeholder: string;
  id?: string;
  className?: string;
  pattern?: string;
  onValidate?: (isValid: boolean) => void; // Opcionális callback validációhoz
}

export const Input = ({
  type,
  name,
  placeholder,
  id,
  className = 'normal',
  pattern,
  onValidate,
  ...props
}: InputProps) => {
  const [hasError, setHasError] = useState(false); // Hibás állapot

  // Validáció blur eseménykor
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = pattern ? new RegExp(pattern) : null;

    if (regex && !regex.test(value)) {
      setHasError(true);
      onValidate?.(false); // Validáció eredmény továbbítása
    } else {
      setHasError(false);
      onValidate?.(true);
    }
  };

  return (
    <div className={`custom-input ${hasError ? 'red' : className}`.trim()}>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className="input"
        onBlur={handleBlur} // Blur eseménykezelő
        {...props}
      />
    </div>
  );
};

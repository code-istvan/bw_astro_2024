import React from 'react';
import './_checkbox.scss';

type CheckboxProps = {
  id: string;
  name?: string;
  label?: React.ReactNode; // Lehetővé teszi, hogy HTML-t is átadjunk a label helyett
  checked?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export const Checkbox = ({
  id,
  name,
  label,
  checked = false,
  className = 'orange', // Alapértelmezett osztály: orange
  onChange,
  required = false,
}: CheckboxProps) => {
  return (
    <div className={`custom-checkbox ${className}`.trim()}>
      <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} required={required} />
      <label htmlFor={id}>
        {label && <p>{label}</p>} {/* p tag-ben jelenik meg a label */}
      </label>
    </div>
  );
};

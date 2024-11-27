import React from 'react';
import './_checkbox.scss';

type CheckboxProps = {
  id: string;
  label?: React.ReactNode; // Lehetővé teszi, hogy HTML-t is átadjunk a label helyett
  checked?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ id, label, checked = false, className, onChange }: CheckboxProps) => {
  return (
    <div className={`custom-checkbox ${className || ''}`.trim()}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>
        {label && <p>{label}</p>} {/* p tag-ben jelenik meg a label */}
      </label>
    </div>
  );
};

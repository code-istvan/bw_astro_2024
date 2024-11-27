import './_input.scss';

interface InputProps {
  type: string;
  name?: string;
  placeholder: string;
  id?: string;
  className?: string;
  required?: boolean | string;
  pattern?: string;
}

export const Input = ({ type, name, placeholder, id, className, required = false, pattern }: InputProps) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={id || name} className="input-label">
        <input
          type={type}
          name={name}
          id={id || name}
          placeholder={placeholder}
          className={`input ${className || ''}`.trim()}
          required={required === 'required' || required === true} // Támogatja string és boolean értékeket
          pattern={pattern}
        />
      </label>
    </div>
  );
};

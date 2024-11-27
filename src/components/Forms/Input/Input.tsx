import './_input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name?: string;
  placeholder: string;
  id?: string;
  className?: string;
}

export const Input = ({ type, name, placeholder, id, className, required, pattern, ...props }: InputProps) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={id || undefined} className="input-label">
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className={`input ${className || ''}`.trim()}
          required={!!required}
          pattern={pattern}
          {...props}
        />
      </label>
    </div>
  );
};

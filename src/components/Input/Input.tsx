import './_input.scss';

interface InputProps {
  type: string;
  placeholder: string;
  id: string;
  className?: string;
}

export const Input = ({ type, placeholder, id, className }: InputProps) => {
  return (
    <label htmlFor={id}>
      <input type={type} id={id} placeholder={placeholder} className={`input ${className || ''}`.trim()} />
    </label>
  );
};

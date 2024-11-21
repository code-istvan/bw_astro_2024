interface InputProps {
  type: string;
  placeholder: string;
  id: string;
}

export const Input = ({ type, placeholder, id }: InputProps) => {
  return (
    <label htmlFor={id}>
      <input type={type} id={id} placeholder={placeholder} />
    </label>
  );
};

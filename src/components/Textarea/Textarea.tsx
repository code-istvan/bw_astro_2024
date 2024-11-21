type InputProps = HTMLTextAreaElement & {};

export const Textarea = ({ placeholder, id }: InputProps) => {
  return (
    <label htmlFor={id}>
      <textarea id={id} placeholder={placeholder} />
    </label>
  );
};

interface TextareaProps {
  label?: string;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void | React.ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea = ({ label, placeholder, error, errorText, onChange }: TextareaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-bold">{label}</div>
      <div className="rounded-xl border border-solid border-border focus-within:border-primary">
        <textarea
          placeholder={placeholder}
          className="scrollbar min-h-36 w-full resize-none rounded-xl p-5"
          onChange={onChange}
        ></textarea>
      </div>
      {error && <span className="text-sm text-red-600">{errorText}</span>}
    </div>
  );
};

export default Textarea;

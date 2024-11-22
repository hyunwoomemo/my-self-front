interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string | number | readonly string[] | undefined;
  disabled?: boolean;
  icon?: JSX.Element;
  custom?: "sub" | "maaaa";
  align?: string;
  error?: boolean;
  errorText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | (() => void);
  maxLength?: number;
  name?: string;
  style?: React.CSSProperties;
}

const Input = ({
  label,
  placeholder,
  type,
  value,
  disabled,
  icon,
  custom,
  align,
  error,
  errorText,
  onChange,
  maxLength,
  name,
  ...res
}: InputProps) => {
  const typeClass = () => {
    switch (custom) {
      case "sub":
        return "";
      default:
        return "";
    }
  };

  if (label) {
    return (
      <div className="flex flex-col gap-1">
        <div className={`${disabled ? "text-disabledText" : undefined}`}>{label}</div>
        <div
          className={`rounded-xl border border-solid border-border ${disabled ? "bg-disabled" : undefined} ${typeClass()} ${icon ? "flex items-center gap-2" : undefined} focus-within:border-primary`}
        >
          {icon && <div className="p-5 pr-0 text-2xl">{icon}</div>}
          <input
            type={type}
            className={`w-full rounded-xl p-5 ${icon ? "pl-0" : undefined} ${align ? `text-${align}` : undefined} ${disabled ? "text-disabledText" : undefined}`}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            value={value}
            maxLength={maxLength}
            {...res}
          />
        </div>
        {error && <span className="text-sm text-red-600">{errorText}</span>}
      </div>
    );
  }
  return (
    <div
      className={`flex-1 rounded-xl border border-solid border-border ${disabled ? "bg-disabled" : undefined} ${typeClass()} ${icon ? "flex items-center gap-1" : undefined} focus-within:border-primary`}
      {...res}
    >
      {icon && <div className={`p-5 pr-0 text-2xl ${align ? `text-${align}` : undefined}`}>{icon}</div>}
      <input
        type={type}
        className="w-full rounded-xl p-5 disabled:text-textGray"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        maxLength={maxLength}
      />
      {error && <span className="text-sm text-red-600">{errorText}</span>}
    </div>
  );
};

export default Input;

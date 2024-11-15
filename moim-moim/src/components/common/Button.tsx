"use client";
import { de } from "date-fns/locale";
import { MdCheck } from "react-icons/md";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  custom?: "label" | "full" | "flex";
  title: string;
  value?: boolean;
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void | (() => void);
  flex?: boolean;
  disabled?: boolean;
  textSize?: string;
}

const Button = ({ type, custom, title, value, onClick, flex, disabled, textSize }: ButtonProps) => {
  const btnClassType = () => {
    switch (custom) {
      case "label":
        return `bg-layOutBg border-solid border border-border px-3 py-1 rounded-[7px] ${value ? "bg-semiPrimary border-semiPrimary" : "bg-white"} w-fit`;
      case "full":
        return `w-full`;
      case "flex":
        return "flex-1";
    }
  };

  const btnTextClassType = () => {
    switch (custom) {
      case "label":
        return `${disabled ? "text-disabledText" : "text-text"}`;
      case "full":
        return "text-lg";
    }
  };

  return (
    <button
      type={type}
      className={`min-w-20 rounded-xl p-5 ${disabled ? "bg-disabled" : "bg-primary"} ${btnClassType()} `}
      onClick={onClick}
      disabled={disabled}
    >
      {value ? (
        <div className="flex items-center gap-2">
          <MdCheck />
          <span className={btnTextClassType()}>{title}</span>
        </div>
      ) : (
        <span className={`${disabled ? "text-disabledText" : "text-white"} text-${textSize} ${btnTextClassType()} `}>
          {title}
        </span>
      )}
    </button>
  );
};

export default Button;

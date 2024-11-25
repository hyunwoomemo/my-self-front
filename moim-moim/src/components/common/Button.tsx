"use client";
import { de } from "date-fns/locale";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCheck } from "react-icons/md";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  custom?: "label" | "full";
  title: string;
  on?: boolean;
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void | (() => void);
  flex?: boolean;
  disabled?: boolean;
  textSize?: string;
  isLoading?: boolean;
}

const Button = ({ type, custom, title, onClick, flex, disabled, textSize, on, children, isLoading }: ButtonProps) => {
  const btnClassType = () => {
    switch (custom) {
      case "label":
        return `bg-layOutBg border-solid border border-border px-3 py-1 rounded-[6px] ${on ? "bg-semiPrimary border-semiPrimary" : "bg-white"}  w-fit`;
      case "full":
        return `w-full`;
    }
  };

  const btnTextClassType = () => {
    switch (custom) {
      case "label":
        return `${disabled ? "text-disabledText" : "text-text"}`;
      case "full":
        return `text-lg ${disabled ? "text-disabledText" : "text-white"}`;
      default:
        return `text-white`;
    }
  };
  
  return (
    <button
      type={type}
      className={`min-w-20 rounded-xl p-5 ${disabled ? "bg-disabled" : "bg-primary"} ${flex ? "flex-1" : undefined} ${btnClassType()} `}
      onClick={onClick}
      disabled={disabled}
    >
      {children && (
        <div className="flex items-center justify-center gap-2">
          {isLoading && <AiOutlineLoading3Quarters className={`mr-3 h-5 w-5 animate-spin ${btnTextClassType()}`}></AiOutlineLoading3Quarters>}
          <span className={` ${disabled ? "text-disabledText" : undefined} text-${textSize} ${btnTextClassType()} `}>
            {children}
          </span>
        </div>
      )}
      {on ? (
        <div className="flex items-center gap-2">
          <MdCheck />
          <span className={btnTextClassType()}>{title}</span>
        </div>
      ) : (
        <span className={` ${disabled ? "text-disabledText" : undefined} text-${textSize} ${btnTextClassType()} `}>
          {title}
        </span>
      )}
    </button>
  );
};

export default Button;

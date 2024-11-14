"use client";
import { MdCheck } from "react-icons/md";

interface ButtonProps {
  type?: string;
  custom?: "label" | "full";
  title: string;
  value?: boolean;
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void | (() => void);
  flex?: boolean;
  disabled?: boolean;
}

const Button = ({ type, custom, title, value, onClick, flex, disabled }: ButtonProps) => {
  const btnClassType = () => {
    switch (custom) {
      case "label":
        return `bg-layOutBg border-solid border border-border px-3 py-1 rounded-[7px] ${value ? "bg-semiPrimary border-semiPrimary" : "bg-white"} w-fit`;

      case "full":
        return `w-full`;
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
      className={`min-w-20 rounded-xl p-5 ${btnClassType()} ${flex ? "flex-1" : undefined} ${disabled ? "bg-disabled" : "bg-primary"} ${custom === "full" ? "w-full" : undefined}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value ? (
        <div className="flex items-center gap-2">
          <MdCheck />
          <span className={btnTextClassType()}>{title}</span>
        </div>
      ) : (
        <span
          className={`${btnTextClassType()} ${disabled ? "text-disabledText" : !(custom === "label") ? "text-white" : "text-text"}`}
        >
          {title}
        </span>
      )}
    </button>
  );
};

export default Button;

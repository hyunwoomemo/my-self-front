"use client";
import { MdCheck } from "react-icons/md";

interface ButtonProps {
  type: "label" | "full" | "default";
  title: string;
  value: boolean;
  onClick: () => void;
}

const Button = ({ type, title, value, onClick }: ButtonProps) => {
  const btnClassType = () => {
    switch (type) {
      case "label":
        return `border-solid border border-border px-3 py-1 rounded-lg ${value ? "bg-semiPrimary border-semiPrimary" : "bg-layOutBg"} w-fit`;
    }
  };

  const btnTextClassType = () => {
    switch (type) {
      case "label":
        return ``;
    }
  };

  const handleClick = () => {
    onClick();
  };

  return (
    <button className={btnClassType()} onClick={handleClick}>
      {value ? (
        <div className="flex items-center gap-2">
          <MdCheck />
          <span className={btnTextClassType()}>{title}</span>
        </div>
      ) : (
        <span className={btnTextClassType()}>{title}</span>
      )}
    </button>
  );
};

export default Button;

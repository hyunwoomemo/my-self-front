"use client";

import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

interface CehckboxProps {
  label: string;
  checked: boolean;
  setChecked: () => void;
}

const Checkbox = ({ label, checked, setChecked }: CehckboxProps) => {
  return (
    <div className="flex items-center gap-1 pt-8 text-textGray">
      <input type="checkbox" className="checkbox" id="checkbox" checked={checked} onChange={setChecked} />

      <label htmlFor="checkbox" className={"flex items-center gap-1"}>
        {checked ? (
          <IoCheckmarkCircleSharp size={24} color="#0da0c5" />
        ) : (
          <IoCheckmarkCircleOutline size={24} color="#929292" />
        )}
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;

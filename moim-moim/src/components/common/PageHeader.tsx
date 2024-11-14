"use client";

import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
import Hr from "./Hr";

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  const router = useRouter();
  return (
    <>
      <button className="flex items-center gap-3 p-6 text-xl" onClick={() => router.back()}>
        <FaAngleLeft />
        <span className="text-xl font-bold">{title}</span>
      </button>
      <Hr />
    </>
  );
};

export default PageHeader;

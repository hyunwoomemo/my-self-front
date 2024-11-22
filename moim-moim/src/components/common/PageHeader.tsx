"use client";

import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
import Hr from "./Hr";

interface PageHeaderProps {
  title: string;
  icon?: JSX.Element;
  link?: string;
  hr?: boolean;
}

const PageHeader = ({ title, icon, link, hr }: PageHeaderProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between gap-2 p-6 w_sm:p-4">
        <button
          className="flex items-center gap-3 text-xl"
          onClick={() => router.back()}
          style={{ width: "calc(100% - 2.5rem)" }}
        >
          <FaAngleLeft />
          <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-left font-bold w_lg:text-xl">
            {title}
          </span>
        </button>
        {icon && link && <button onClick={() => router.push(link)}>{icon}</button>}
      </div>
      {hr && <Hr />}
    </>
  );
};

export default PageHeader;

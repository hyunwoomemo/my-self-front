import { FaChevronDown, FaBell, FaMagnifyingGlass, FaRegCalendar, FaChevronUp } from "react-icons/fa6";
import { BsPencil } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { myInfoProps } from "@/app/client-layout";

const Header = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const router = useRouter();
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;

  useEffect(() => {
    console.log("isShow", isShow);
    const handleClick = (e) => {
      e.stopPropagation();
      setIsShow(false);
    };

    if (isShow) window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [isShow]);

  const handleClickArea = (e) => {
    e.stopPropagation();
    setIsShow(!isShow);
  };
  return (
    <div className="flex justify-between p-6 pb-4">
      <div className="relative">
        <div className="flex cursor-pointer items-center gap-2" onClick={handleClickArea}>
          <span className="text-xl font-bold">{myInfo?.addresses[0]?.region_3depth_name}</span>
          {isShow ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isShow && (
          <div className="absolute -left-4 top-[calc(100%+0.5rem)] z-10 flex flex-col rounded-lg bg-white shadow-[0_3px_10px_0_rgba(0,0,0,0.1)]">
            <div className="flex min-w-32 flex-col">
              <div className="cursor-pointer border-b border-solid border-border p-3 text-center first:rounded-t-lg hover:bg-lightPrimary">
                논현 2동
              </div>
              <div className="cursor-pointer border-b border-solid border-border p-3 text-center">논현 2동</div>
            </div>
            <div
              className="flex cursor-pointer items-center justify-center gap-2 rounded-b-lg bg-surface p-1"
              onClick={() => router.push("/area")}
            >
              <BsPencil size={10} />
              <span>편집</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-6 text-2xl">
        <FaMagnifyingGlass />
        <FaBell />
        <FaRegCalendar />
      </div>
    </div>
  );
};

export default Header;

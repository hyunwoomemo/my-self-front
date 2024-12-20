import { FaChevronDown, FaBell, FaMagnifyingGlass, FaRegCalendar, FaChevronUp } from "react-icons/fa6";
import { BsPencil } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { myInfoProps } from "@/app/client-layout";
import { useSocket } from "@/hooks/useSocket";
import { revalidateContents } from "@/utils/revalidateTag";

const Header = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const router = useRouter();
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const { joinArea } = useSocket();

  useEffect(() => {
    revalidateContents("myInfo");
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      e.stopPropagation();
      setIsShow(false);
    };

    if (isShow) window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [isShow]);

  useEffect(() => {
    if (myInfo?.addresses[0]) {
      localStorage.setItem("address", JSON.stringify(myInfo?.addresses[0]));
    } else {
      localStorage.removeItem("address");
    }
  }, [myInfo?.addresses?.[0]]);

  const handleClickArea = (e) => {
    e.stopPropagation();
    setIsShow(!isShow);
  };

  const handleJoin = (index) => {
    joinArea(myInfo.addresses[index].address_code);
    localStorage.setItem("address", JSON.stringify(myInfo.addresses[index]));
  };
  return (
    <div className="flex justify-between p-6 pb-4">
      <div className="relative">
        <div className="flex cursor-pointer items-center gap-2" onClick={handleClickArea}>
          <span className="text-xl font-bold">
            {localStorage.getItem("address")
              ? JSON.parse(localStorage.getItem("address")).region_3depth_name
              : myInfo?.addresses[0].region_3depth_name}
          </span>
          {isShow ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isShow && (
          <div className="absolute -left-4 top-[calc(100%+0.5rem)] z-10 flex flex-col rounded-lg border border-solid border-border bg-white shadow-[0_3px_10px_0_rgba(0,0,0,0.1)]">
            <div className="flex min-w-32 flex-col">
              {myInfo?.addresses.map((v, i) => {
                return (
                  <div
                    key={v.address_code}
                    className="cursor-pointer border-b border-solid border-border p-3 text-center first:rounded-t-lg hover:bg-lightPrimary"
                    onClick={() => handleJoin(i)}
                  >
                    {v.region_3depth_name}
                  </div>
                );
              })}
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

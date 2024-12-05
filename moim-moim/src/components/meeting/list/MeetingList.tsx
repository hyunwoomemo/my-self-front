import { PiUsersThree, PiUsersLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { useAtomValue } from "jotai";
import { listAtom } from "@/store/meeting/list/atom";
import moment from "moment";
import "moment/locale/ko";
import { getListProps, useSocket } from "@/hooks/useSocket";
import { loadingAtom } from "@/store/common/atom";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserInfo } from "@/actions/user/getUserInfo";
import { accountApi } from "@/app/api";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { myInfoProps } from "@/app/client-layout";

moment.locale("ko");

const MeetingList = () => {
  const loading = useAtomValue(loadingAtom);
  const data = useAtomValue(listAtom) as getListProps[];
  const { enterMeeting } = useSocket();
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;

  // const activeStatus = (date) => {
  //   console.log("🍻", date)
  // }

  const handleEnterMeeting = (data) => {
    console.log("data???", data);
    enterMeeting({ region_code: "A02", meetings_id: data.id, users_id: myInfo?.id, type: data.type });
  };

  if (loading) {
    return <Loader />;
  }

  // console.log("lodaing", loading, data);

  return (
    <>
      {/* {data ? ( */}
      {data?.map((v) => (
        <div
          key={v.id}
          className="flex cursor-pointer items-center gap-4 border-b border-solid border-surface pb-5"
          onClick={() => handleEnterMeeting(v)}
        >
          {/* <Image src={} alt={} /> */}
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--point)] text-7xl text-white w_sm:h-20 w_sm:w-20 w_sm:text-6xl">
            <PiUsersThree />
          </div>
          <div className="flex max-w-[calc(100%-7rem)] flex-1 flex-col justify-between gap-3 w_sm:max-w-[calc(100%-6rem)]">
            <div className="flex flex-col">
              <h3 className="w-full truncate text-[1.1rem] font-bold" title={v.name}>
                {v.name}
              </h3>
              <h5 className="w-full truncate text-sm text-[var(--textGray)]" title={v.description}>
                {v.description}
              </h5>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center justify-center gap-2">
                <div className="rounded-3xl bg-[var(--darkSurface)] px-3 py-[0.15rem] text-xs">
                  {" "}
                  {v.category1_name}/{v.category2_name}
                </div>
                <div className="font-thin text-[var(--textGray)]">·</div>
                {/* <span className="text-xs text-[var(--point)]">{activeStatus(v.last_active_time)}</span> */}
              </div>
              <div className="flex gap-1">
                <div className="flex items-center">
                  <CiHeart className="text-2xl" />
                  <span>7</span>
                </div>
                <div className="font-thin text-[var(--textGray)]">·</div>
                <div className="flex items-center gap-1">
                  <PiUsersLight className="text-2xl" />
                  <span>{v.userCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* ) : (
        <Empty
          text={`현재 개설된 모임방이 없습니다.
          관심사를 함께 할 수 있는 모임방을 만들어볼까요?`}
        />
      )} */}
    </>
  );
};

export default MeetingList;

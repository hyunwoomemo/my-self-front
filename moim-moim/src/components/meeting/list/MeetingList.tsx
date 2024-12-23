import { PiUsersThree, PiUsersLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { useAtomValue } from "jotai";
import { listAtom, myListAtom } from "@/store/meeting/list/atom";
import moment from "moment";
import "moment/locale/ko";
import { getListProps, useSocket } from "@/hooks/useSocket";
import { loadingAtom } from "@/store/common/atom";
import { Loader } from "@/components/common/Loader";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { myInfoProps } from "@/app/client-layout";
import Dot from "@/components/common/Dot";
import Empty from "@/components/common/Empty";

const MeetingList = () => {
  const loading = useAtomValue(loadingAtom);
  const data = useAtomValue(listAtom) as getListProps[];
  const { enterMeeting } = useSocket();
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const currentRegion = JSON.parse(localStorage.getItem("address"))?.address_code;
  const myList = useAtomValue(myListAtom);
  console.log("myList", myList);

  const activeStatus = (time) => {
    if (moment().subtract(10, "minutes").format("LLLL") < moment(time).format("LLLL")) {
      return "방금 대화";
    } else if (moment().subtract(30, "minutes").format("LLLL") < moment(time).format("LLLL")) {
      return "30분 전";
    } else {
      return "1시간 전";
    }
  };
  const handleEnterMeeting = (data) => {
    enterMeeting({ region_code: currentRegion, meetings_id: data.id, users_id: myInfo.user_id, type: data.type });
  };

  if (loading) {
    return <Loader />;
  }

  if (data && data.length === 0) {
    return <Empty text="<span>개설된 모임방이 없어요. <br />관심있는 모임방을 만들어 볼까요?</span>" />;
  }

  return (
    <>
      {data?.map((v) => (
        <div
          key={v.id}
          className="flex cursor-pointer items-center gap-4 border-b border-solid border-surface pb-5"
          onClick={() => handleEnterMeeting(v)}
        >
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--point)] text-7xl text-white w_sm:h-20 w_sm:w-20 w_sm:text-6xl">
            <PiUsersThree />
          </div>
          <div className="flex max-w-[calc(100%-7rem)] flex-1 flex-col justify-between gap-3 w_sm:max-w-[calc(100%-6rem)]">
            <div className="flex flex-col">
              <div className="flex gap-2">
                <h3 className="w-fit truncate text-[1.1rem] font-bold" title={v.name}>
                  {v.name}
                </h3>
                {myList?.some((m) => m.id === v.id) && (
                  <span className="rounded-full rounded-bl-none bg-point px-2 py-1 text-xs text-white">참여중</span>
                )}
              </div>

              <h5 className="w-full truncate text-sm text-[var(--textGray)]" title={v.description}>
                {v.description}
              </h5>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center justify-center gap-2">
                <div className="rounded-3xl bg-[var(--darkSurface)] px-3 py-[0.15rem] text-xs">
                  {v.category1_name}/{v.category2_name}
                </div>
                <Dot />
                <span className="text-xs">
                  {moment(v.event_date).format("YY년 MM월 DD일")} {moment(v.event_date).format("HH시 mm분")}
                </span>
                {v.last_active_time && (
                  <>
                    <Dot />
                    <span className="text-xs text-[var(--point)]">{activeStatus(v.last_active_time)}</span>
                  </>
                )}
              </div>
              <div className="flex gap-1">
                <div className="flex items-center">
                  <CiHeart className="text-2xl" />
                  <span>{v.likeCount}</span>
                </div>
                <Dot />
                <div className="flex items-center gap-1">
                  <PiUsersLight className="text-2xl" />
                  <span className={`${v.userCount === v.max_members ? "text-red" : "text-text"}`}>
                    {v.userCount}
                    {v.max_members === -1 ? undefined : `/${v.max_members}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MeetingList;

"use client";

import { getListProps, useSocket } from "@/hooks/useSocket";
import { currentMeetingAtom } from "@/store/meeting/currentMeeting/atom";
import { listAtom } from "@/store/meeting/list/atom";
import { messagesAtom } from "@/store/meeting/messages/atom";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import moment from "moment";
import { HiArrowSmallDown } from "react-icons/hi2";
import { loadingAtom } from "@/store/common/atom";
import Loader from "@/components/common/Loader";
import { activeAtom } from "@/store/meeting/active/atom";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { myInfoProps } from "@/app/client-layout";
import Empty from "@/components/common/Empty";
import { meetingDataAtom } from "@/store/meeting/data/atom";

const Contents = ({ id, scrollRef, msgRef, contentsRef }) => {
  const data = useAtomValue(listAtom) as getListProps[];
  const [currentMeeting, setCurrentMeeting] = useAtom(currentMeetingAtom);
  const { enterMeeting, socket } = useSocket();
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;

  const messages = useAtomValue(messagesAtom);

  const loading = useAtomValue(loadingAtom);
  const activeData = useAtomValue(activeAtom);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (msgRef?.current?.offsetTop - 500 > contentsRef?.current.scrollTop + contentsRef?.current?.offsetHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView();
    }
  }, [msgRef.current]);

  useEffect(() => {
    if (currentMeeting) return;
    const controller = new AbortController();

    // 새로고침 했을 때만 !!
    if (data) {
      const target = data.find((v) => {
        return v.id === Number(id);
      });
      const type = target?.type;
      //   console.log("!!", target);
      if (type && myInfo) {
        enterMeeting({ region_code: "RC003", meetings_id: Number(id), users_id: myInfo.user_id, type: type });
      }
    }

    return () => controller.abort();
  }, [currentMeeting, data]);

  useEffect(() => {
    console.log("방 입장");
    return () => {
      if (currentMeeting) {
        setCurrentMeeting(-1);
        console.log("방 떠남");
        socket?.emit("leaveMeeting", { region_code: "RC003", meetings_id: Number(id) });
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        setIsVisible(!isVisible);
      }
    });

    if (msgRef.current) {
      observer.observe(msgRef.current);
    }

    return () => {
      if (msgRef.current) {
        observer.unobserve(msgRef.current);
      }
    };
  }, [msgRef.current]);

  const handleToBottom = () => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView();
    }
  };

  //메시지가 없을 때
  if (!messages) return;
  // console.log(
  //   "sdsd??sss",

  const getUnReadCount = (data) => {
    // console.log("🔔", data, activeData);

    // 읽어야할 사람들
    const users = (data.users || "")
      .split(",") //string을 ","로 구분하여 배열로 만들어서
      .map((v) => Number(v)) //string을 Number로 바꾸고,
      .filter((v) => v !== myInfo.user_id); // 나 아닌 것들만 추출

    const unReadCount = users.reduce((result, cur) => {
      // console.log("activeData", activeData, cur, data); // 내가 활용할 수 있는 데이터들

      const curr = activeData?.find((v) => v.users_id === cur); //전체 인원 중에서 읽어야할 사람을 추출해서

      if (moment(curr?.last_active_time).isBefore(data.created_at)) {
        result = result + 1;
      } //비교해서 맞으면 카운트 1

      return result;
    }, 0);

    return unReadCount;
  };

  // console.log("messages", messages);

  if (loading) {
    return <Loader />;
  }
  if (!messages) return <Empty text="불러올 메시지가 없습니다." />;
  return (
    <>
      <div className="p-4">
        <div className="w-full rounded-3xl bg-[rgba(95,125,143,0.3)] p-1 text-center text-sm font-thin text-white">
          모임 방이 개설되었어요.
        </div>
        <div className="flex flex-col-reverse gap-2">
          {/* {Object.entries(messages).map(([key, msg]) => {
          return ( */}
          {/* <div key={key} className={`flex flex-col gap-2`}> */}

          {messages?.list?.map((v) => {
            return (
              <div key={v.id} className={`flex flex-col gap-2`}>
                {myInfo.user_id !== v.users_id && v.nick && v.admin !== 1 && <div className="mt-2">{v.nickname}</div>}
                {/* {myInfo.user_id !== v.users_id && <div>{v.users_nickname}</div>} */}
                <div
                  className={`flex w-full items-end gap-1 ${myInfo.user_id === v.users_id ? "flex-row-reverse self-end" : undefined}`}
                >
                  {v.admin === 1 ? (
                    <div className="w-full rounded-3xl bg-[rgba(95,125,143,0.3)] p-1 text-center text-sm font-thin text-white">
                      {v.contents}
                    </div>
                  ) : (
                    <div
                      className={`w-fit max-w-[70%] whitespace-pre-wrap rounded-3xl p-3 ${myInfo.user_id === v.users_id ? "self-end rounded-br-none bg-semiPrimary text-right" : "rounded-bl-none bg-white"}`}
                    >
                      {v.contents}
                    </div>
                  )}
                  {v.time && v.admin !== 1 && (
                    <span className="pb-1 text-[9px] text-textGray">{moment(v.created_at).format("HH:mm")}</span>
                  )}
                  {/* <span className="pb-1 text-[9px] text-textGray">{moment(v.created_at).format("HH:mm")}</span> */}

                  {v.admin !== 1 && getUnReadCount(v) !== 0 && (
                    <span className="pb-1 text-[9px] text-point">{getUnReadCount(v)}</span>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={scrollRef}></div>
        </div>
        <div ref={msgRef}></div>
        {isVisible && (
          <div
            className="fixed bottom-56 left-1/2 z-40 flex h-10 w-10 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md shadow-gray-300"
            onClick={handleToBottom}
          >
            <HiArrowSmallDown size={20} />
          </div>
        )}
      </div>
    </>
  );
};

export default Contents;

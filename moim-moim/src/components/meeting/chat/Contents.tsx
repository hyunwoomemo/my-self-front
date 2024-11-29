"use client";

import { getListProps, useSocket } from "@/hooks/useSocket";
import { currentMeetingAtom } from "@/store/meeting/currentMeeting/atom";
import { listAtom } from "@/store/meeting/list/atom";
import { messagesAtom } from "@/store/meeting/messages/atom";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import { HiArrowSmallDown } from "react-icons/hi2";
import { loadingAtom } from "@/store/common/atom";
import Loader from "@/components/common/Loader";
import { activeAtom } from "@/store/meeting/active/atom";

const Contents = ({ id, isVisible, userInfo }) => {
  const data = useAtomValue(listAtom) as getListProps[];
  const messages = useAtomValue(messagesAtom);
  const [currentMeeting, setCurrentMeeting] = useAtom(currentMeetingAtom);
  const { enterMeeting, socket } = useSocket();
  const [groupMsg, setGroupMsg] = useState({});

  const msgRef = useRef();
  const loading = useAtomValue(loadingAtom);
  const activeData = useAtomValue(activeAtom);

  //메시지 보내고 받을때마다 스크롤 맨 아래로
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView();
    }
  }, [messages]);
  useEffect(() => {
    setTimeout(() => {
      if (msgRef.current) {
        msgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 10);
  }, []);

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
      if (type) {
        enterMeeting({ region_code: "A02", meetings_id: Number(id), users_id: 125, type: type });
      }
    }

    return () => controller.abort();
  }, [currentMeeting, data]);

  useEffect(() => {
    console.log("방 입장");
    return () => {
      // alert(Date.now());
      if (currentMeeting) {
        setCurrentMeeting(-1);
        console.log("방 떠남");
        socket?.emit("leaveMeeting", { region_code: "A02", meetings_id: Number(id) });
      }
    };
  }, []);

  //정렬

  //메시지가 없을 때
  if (!messages) return;
  // console.log(
  //   "sdsd??sss",

  const getUnReadCount = (data) => {
    // console.log("activeData", activeData, data);

    // 읽어야할 사람들
    const users = (data.users || "")
      .split(",") //string을 ","로 구분하여 배열로 만들어서
      .map((v) => Number(v)) //string을 Number로 바꾸고,
      .filter((v) => v !== userInfo.id); // 나 아닌 것들만 추출

    const unReadCount = users.reduce((result, cur) => {
      // console.log("activeData", activeData, cur, data); // 내가 활용할 수 있는 데이터들
      if (data.users_id === cur) return; //내가 쓴 글은 패스

      const curr = activeData?.find((v) => v.users_id === cur); //전체 인원 중에서 읽어야할 사람을 추출해서

      if (moment(curr?.last_active_time).isBefore(data.created_at)) result += 1; //비교해서 맞으면 카운트 1
      return result;
    }, 0);

    return unReadCount;
  };

  console.log("messages", messages);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex flex-col-reverse gap-2 p-4">
        {/* {Object.entries(messages).map(([key, msg]) => {
          return ( */}
        {/* <div key={key} className={`flex flex-col gap-2`}> */}
        {messages?.list?.map((v) => {
          return (
            <div key={v.id} className={`flex flex-col gap-2`}>
              {userInfo?.id !== v.users_id && v.nick && <div>{v.nickname}</div>}
              {/* {userInfo?.id !== v.users_id && <div>{v.users_nickname}</div>} */}
              <div
                className={`flex max-w-[70%] items-end gap-1 ${userInfo?.id === v.users_id ? "flex-row-reverse self-end" : undefined}`}
              >
                <div
                  className={`w-fit whitespace-pre-wrap rounded-lg p-3 ${userInfo?.id === v.users_id ? "self-end rounded-br-none bg-lightPrimary" : "rounded-bl-none bg-surface"}`}
                >
                  {v.contents}
                </div>
                {v.time && (
                  <span className="pb-1 text-[9px] text-textGray">{moment(v.created_at).format("HH:mm")}</span>
                )}
                {/* <span className="pb-1 text-[9px] text-textGray">{moment(v.created_at).format("HH:mm")}</span> */}

                <span className="pb-1 text-[9px] text-point">{getUnReadCount(v) || 0}</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* );
        })} */}
      {/* </div> */}
      <div ref={msgRef}></div>
      {isVisible && (
        <div className="fixed bottom-40 left-1/2 z-40 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md shadow-gray-300">
          <HiArrowSmallDown size={20} />
        </div>
      )}
    </>
  );
};

export default Contents;

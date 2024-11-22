"use client";

import { accountApi } from "@/app/api";
import { getListProps, useSocket } from "@/hooks/useSocket";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { currentMeetingAtom } from "@/store/meeting/currentMeeting/atom";
import { listAtom } from "@/store/meeting/list/atom";
import { messagesAtom } from "@/store/meeting/messages/atom";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import moment from "moment";
import { HiArrowSmallDown } from "react-icons/hi2";

const Contents = ({ id, isVisible }) => {
  const data = useAtomValue(listAtom) as getListProps[];
  const messages = useAtomValue(messagesAtom);
  const [currentMeeting, setCurrentMeeting] = useAtom(currentMeetingAtom);
  const [myInfo, setMyInfo] = useAtom(myInfoAtom);
  const { enterMeeting, socket } = useSocket();

  const msgRef = useRef();
  msgRef.current?.scrollIntoView();

  useEffect(() => {
    accountApi.myInfo().then((res) => {
      setMyInfo(res.data.data);
    });
  }, []); //이건 어디에서 써줘야 하나?

  useEffect(() => {
    if (currentMeeting) return;
    const controller = new AbortController();

    // 새로고침 했을 때만 !!
    if (data) {
      const target = data.find((v) => {
        // console.log(typeof id, typeof v.id);
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
        socket?.emit("leaveMeeting", Number(id));
      }
    };
  }, []);

  //메시지가 없을 때
  if (!messages || (messages && Object.keys(messages).length === 0)) return;

  return (
    <>
      <div className="flex flex-col-reverse gap-2 p-4">
        {messages.list.map((v) => {
          return (
            <div
              key={v.id}
              className={`flex items-end gap-2 ${myInfo?.id === v.users_id ? "flex-row-reverse self-end" : undefined}`}
            >
              <div
                className={`w-fit whitespace-pre-wrap rounded-lg p-3 ${myInfo?.id === v.users_id ? "bg-lightPrimary self-end rounded-br-none" : "rounded-bl-none bg-surface"}`}
              >
                {v.contents}
              </div>
              <span className="pb-1 text-[9px] text-textGray">{moment(v.created_at).format("HH:mm")}</span>
            </div>
          );
        })}
      </div>
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

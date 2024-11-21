"use client";

import { getListProps, useSocket } from "@/hooks/useSocket";
import { currentMeetingAtom } from "@/store/meeting/currentMeeting/atom";
import { listAtom } from "@/store/meeting/list/atom";
import { messagesAtom } from "@/store/meeting/messages/atom";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

const Contents = ({ id }) => {
  const data = useAtomValue(listAtom) as getListProps[];
  const messages = useAtomValue(messagesAtom);
  const currentMeeting = useAtomValue(currentMeetingAtom);

  console.log("!!!", id, currentMeeting);
  const { enterMeeting } = useSocket();

  useEffect(() => {
    if (currentMeeting) return;
    console.log("currentMeeting", currentMeeting);
    // 새로고침 했을 때만 !!
    if (data) {
      const target = data.find((v) => {
        console.log(typeof id, typeof v.id);
        return v.id === Number(id);
      });
      const type = target?.type;
      console.log("!!", target);
      if (type) {
        enterMeeting({ region_code: "A02", meetings_id: Number(id), users_id: 125, type: type });
      }
    }
  }, [currentMeeting]);

  if (!messages || (messages && Object.keys(messages).length === 0)) return;
  return (
    <>
      {messages.list.map((v) => {
        return <div key={v.id}>{v.contents}</div>;
      })}
    </>
  );
};

export default Contents;

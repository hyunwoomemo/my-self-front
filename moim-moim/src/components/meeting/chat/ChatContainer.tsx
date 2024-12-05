"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MeetingHeader from "./MeetingHeader";
import Contents from "./Contents";
import InputBar from "./InputBar";
import Loader from "@/components/common/Loader";
import { msgApi } from "@/app/api";
import { useAtom, useAtomValue } from "jotai";
import { messagesAtom } from "@/store/meeting/messages/atom";
import { MessagesValue } from "@/hooks/useSocket";
import { GroupedData } from "@/utils/group";
import Empty from "@/components/common/Empty";

const ChatContainer = ({ id }) => {
  const scrollRef = useRef(null);
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [messages, setMessages] = useAtom(messagesAtom);
  const isEnd = messages?.total <= messages?.list.length;
  const msgRef = useRef(null);
  const contentsRef = useRef(null);

  const moreMsgs = useCallback(async () => {
    console.log("messagesmessages", messages);
    setIsFetch(true);
    try {
      const res = await msgApi.getMoreMessage(id, messages.list.length);

      if (res.DATA.list) {
        setTimeout(() => {
          setIsFetch(false);
        }, 300);
      }
      const data = res.DATA.list;
      setMessages((prev) => {
        return { ...prev, list: GroupedData([...prev.list, ...data]).reverse() };
      });
    } catch (e) {
      console.log("moreMsgs error: ", e);
    }
  }, [messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isEnd && !isFetch) {
          moreMsgs(); //채팅창 처음 켰을 때(아래로 내렸을 때만 실행)
        }
      },
      { threshold: 0.5, rootMargin: "0px" },
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, [scrollRef.current, isFetch, isEnd, moreMsgs]);

  return (
    <>
      <div className="scrollbar flex-1 overflow-y-auto" ref={contentsRef}>
        <MeetingHeader />
        <Contents msgRef={msgRef} scrollRef={scrollRef} id={id} contentsRef={contentsRef} />
      </div>
      <InputBar msgRef={msgRef} id={id} />
    </>
  );
};

export default ChatContainer;

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MeetingHeader from "./MeetingHeader";
import Contents from "./Contents";
import InputBar from "./InputBar";
import { moimApi } from "@/app/api";
import { useAtom } from "jotai";
import { messagesAtom } from "@/store/meeting/messages/atom";
import { GroupedData } from "@/utils/group";

const ChatContainer = ({ id }) => {
  const scrollRef = useRef(null);
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [messages, setMessages] = useAtom(messagesAtom);
  const isEnd = messages?.total <= messages?.list?.length;
  const lastMsgRef = useRef(null);
  const contentsRef = useRef(null);
  const [isReply, setIsReply] = useState({});

  const handleReply = (id) => {
    setIsReply({
      [id]: true,
    });
  };
  const moreMsgs = useCallback(async () => {
    console.log("messagesmessages", messages);
    setIsFetch(true);
    try {
      const res = await moimApi.getMoreMessage(id, messages.list.length);

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
        if (entries[0].isIntersecting && !isEnd && !isFetch && !messages.end) {
          console.log("🎀entries", entries);
          moreMsgs();
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
      <div className="scrollbar flex-1 overflow-y-auto bg-[rgba(13,160,197,0.1)]" ref={contentsRef}>
        <MeetingHeader />
        <Contents
          lastMsgRef={lastMsgRef}
          scrollRef={scrollRef}
          id={id}
          contentsRef={contentsRef}
          handleReply={handleReply}
        />
      </div>
      <InputBar lastMsgRef={lastMsgRef} id={id} isReply={isReply} setIsReply={setIsReply} />
    </>
  );
};

export default ChatContainer;

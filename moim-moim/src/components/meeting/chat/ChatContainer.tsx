"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MeetingHeader from "./MeetingHeader";
import Contents from "./Contents";
import InputBar from "./InputBar";
import { accountApi } from "@/app/api";
import { useSetAtom } from "jotai";
import { myInfoAtom } from "@/store/account/myInfo/atom";

const ChatContainer = ({ id }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const scrollRef = useRef();
  const setMyInfo = useSetAtom(myInfoAtom);

  useEffect(() => {
    accountApi.myInfo().then((res) => {
      setMyInfo(res.data.data);
    });
  }, []); //이건 어디에서 써줘야 하나?

  const handleScroll = useCallback(() => {
    const scrollbar = scrollRef.current;
    if (scrollbar) {
      console.log("scrollY", scrollbar.scrollTop);
    }
  }, []);

  useEffect(() => {
    const scrollbar = scrollRef.current;
    if (scrollbar) {
      scrollbar.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollbar) {
        scrollbar.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <>
      <div ref={scrollRef} className="scrollbar flex-1 overflow-y-auto">
        <MeetingHeader />
        <Contents id={id} isVisible={isVisible} />
      </div>
      <InputBar id={id} />
    </>
  );
};

export default ChatContainer;

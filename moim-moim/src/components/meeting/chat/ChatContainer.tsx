"use client";

import { throttle } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import MeetingHeader from "./MeetingHeader";
import Contents from "./Contents";
import InputBar from "./InputBar";

const ChatContainer = ({ id }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const THROTTLE_WAIT = 300;

  //   const handleScroll = throttle(() => {
  //     const { scrollY, innerHeight } = window;
  //     console.log("scrollY", scrollY, "innerHeight", innerHeight);
  //     setIsVisible(scrollY > 499);
  //   }, THROTTLE_WAIT);
  const handleScroll = () => {
    console.log("scrollY", window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <div className="scrollbar flex-1 overflow-y-auto">
        <MeetingHeader />
        <Contents id={id} isVisible={isVisible} />
      </div>
      <InputBar id={id} />
    </>
  );
};

export default ChatContainer;

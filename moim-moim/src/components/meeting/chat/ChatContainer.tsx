"use client";

import { useRef, useState } from "react";
import MeetingHeader from "./MeetingHeader";
import Contents from "./Contents";
import InputBar from "./InputBar";

const ChatContainer = ({ id, userInfo }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const scrollRef = useRef();

  return (
    <>
      <div ref={scrollRef} className="scrollbar flex-1 overflow-y-auto">
        <MeetingHeader />
        <Contents id={id} isVisible={isVisible} userInfo={userInfo} />
      </div>
      <InputBar id={id} />
    </>
  );
};

export default ChatContainer;

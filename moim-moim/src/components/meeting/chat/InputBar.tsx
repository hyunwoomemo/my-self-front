"use client";

import { myInfoProps } from "@/app/client-layout";
import Button from "@/components/common/Button";
import { ActiveDataProps, useSocket } from "@/hooks/useSocket";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { messagesAtom, typingAtom } from "@/store/meeting/messages/atom";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { TbPhoto } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { activeAtom } from "@/store/meeting/active/atom";

const InputBar = ({ id, lastMsgRef, isReply, setIsReply }) => {
  const [contents, setContents] = useState<string>("");
  const [currentMsg, setCurrentMsg] = useState("");
  const { sendMessage } = useSocket();
  const [rows, setRows] = useState<number>(-1);
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const [isAfterClick, setIsAfterClick] = useState(false);
  const messages = useAtomValue(messagesAtom);
  const { userTyping } = useSocket();
  const typing = useAtomValue(typingAtom);
  const [typingArr, setTypingArr] = useState([]);
  const replyMsg = messages?.list.find((v) => v.id === Number(Object.keys(isReply)));
  const inputRef = useRef(null);
  const activeData = useAtomValue(activeAtom) as ActiveDataProps;
  const [isTag, setIsTag] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    if (focusIndex === activeData?.length) {
      setFocusIndex(0);
    }
  }, [focusIndex, activeData]);

  useEffect(() => {
    const arr = [];
    const users = typing.map((v) => v.users_id);
    arr.push(...users.filter((v) => v !== myInfo.user_id));

    setTypingArr(arr);
  }, [typing]);

  useEffect(() => {
    const handleResize = () => {
      setRows(window.innerWidth > 480 ? 3 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    //스크롤 위에 있을때, 내가 작성한 메세지가 보내지면 아래로 스크롤
    if (isAfterClick && lastMsgRef.current) {
      console.log("lastMsgRef.current", lastMsgRef.current);
      lastMsgRef.current.scrollIntoView();
      setIsAfterClick(false);
    }
  }, [messages]);

  const handleClick = () => {
    if (Object.keys(isReply).length === 1) {
      //답장 보내기
      sendMessage({
        contents: contents,
        meetings_id: id,
        region_code: "RC003",
        users_id: myInfo.user_id,
        reply_id: Number(Object.keys(isReply)),
      });
    } else {
      //그냥 보내기
      sendMessage({
        contents: contents,
        meetings_id: id,
        region_code: "RC003",
        users_id: myInfo.user_id,
      });
    }

    setCurrentMsg("");
    setIsAfterClick(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleClick();
      setIsReply([]);
    } else {
      if (keyEvent[e.key]) keyEvent[e.key]();
    }
  };

  const keyEvent = {
    "@": () => {
      setIsTag(true);
    },
    ArrowDown: () => {
      if (isTag) {
        setFocusIndex((prev) => {
          const newIndex = prev + 1;
          return newIndex;
        });
      }
    },
    ArrowUp: () => {
      if (isTag) {
        setFocusIndex((prev) => {
          const newIndex = prev - 1;
          return newIndex;
        });
      }
    },
    Enter: () => {},
  };

  const handleChangeContents = (text: string) => {
    setContents(text);
    setCurrentMsg(text);
  };

  const handleTyping = () => {
    userTyping({ users_id: myInfo.user_id, meetings_id: id, region_code: "RC003" });
  };

  const handleCloseReply = () => {
    setIsReply([]);
  };

  //답장 시 포커스
  if (isReply && inputRef.current) {
    inputRef.current.focus();
  }

  console.log("🚀focusIndex", isTag, focusIndex);
  return (
    <div className="bg-[rgba(13,160,197,0.1)] p-4 pt-0">
      {typingArr.length !== 0 && (
        <div>
          {typingArr?.join(", ")}
          님이 입력 중입니다.
        </div>
      )}
      {/* 답장할 때 */}
      {Object.keys(isReply).length !== 0 && (
        <div className="mb-1 flex items-start justify-between rounded-lg bg-white p-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-point">
              {replyMsg?.nickname === myInfo?.nickname ? "나" : replyMsg?.nickname}에게 답장
            </span>
            <span>{replyMsg?.contents}</span>
          </div>
          <button className="text-textGray hover:text-text" onClick={handleCloseReply}>
            <IoCloseOutline size={20} />
          </button>
        </div>
      )}
      {/* 태그할 때 */}
      <div className="relative flex flex-col rounded-lg bg-white">
        {isTag && (
          <div className="absolute bottom-[calc(100%+1rem)] left-8 w-52 rounded-lg shadow-lg">
            {activeData?.map((v, i) => (
              <button
                key={v.id}
                className={`block w-full p-4 first:rounded-t-lg last:rounded-b-lg hover:bg-surface ${focusIndex === i ? "bg-surface" : "bg-white"}`}
              >
                {v.nickname === myInfo.nickname ? (
                  <span className="flex items-center justify-center gap-1">
                    <span className="h-5 w-5 rounded-full bg-point p-[2px] text-xs text-white">나</span>
                    <span>
                      @{v.nickname}
                      {i}
                    </span>
                  </span>
                ) : (
                  <span>
                    @{v.nickname}
                    {i}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        {/* 채팅 입력창 */}
        <textarea
          ref={inputRef}
          className="scrollbar w-full flex-1 resize-none whitespace-pre-wrap rounded-lg bg-white p-4 pb-0"
          placeholder="내용을 입력해 주세요..."
          rows={rows}
          onChange={(e) => {
            handleChangeContents(e.target.value);
            handleTyping();
          }}
          onSubmit={() => setContents("")}
          onKeyDown={handleKeyDown}
          value={currentMsg}
        />
        <div className="flex items-center justify-between p-4">
          <button className="flex h-12 w-12 items-center justify-center rounded-lg bg-white p-2 shadow-md">
            <TbPhoto size={20} />
          </button>
          <Button title="전송" disabled={currentMsg.length === 0} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};
export default InputBar;

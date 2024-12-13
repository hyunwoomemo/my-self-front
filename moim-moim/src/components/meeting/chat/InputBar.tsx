"use client";

import { myInfoProps } from "@/app/client-layout";
import Button from "@/components/common/Button";
import { useSocket } from "@/hooks/useSocket";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { messagesAtom, typingAtom } from "@/store/meeting/messages/atom";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { TbPhoto } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";

const InputBar = ({ id, lastMsgRef, isReply, setIsReply }) => {
  const [contents, setContents] = useState<string>("");
  const [currentMsg, setCurrentMsg] = useState("");
  const { sendMessage } = useSocket();
  const [rows, setRows] = useState<number>(() => (window.innerWidth > 480 ? 3 : 1));
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const [isAfterClick, setIsAfterClick] = useState(false);
  const messages = useAtomValue(messagesAtom);
  const { userTyping } = useSocket();
  const typing = useAtomValue(typingAtom);
  const [typingArr, setTypingArr] = useState([]);
  const replyMsg = messages?.list.find((v) => v.id === Number(Object.keys(isReply)));

  useEffect(() => {
    const arr = [];
    const users = typing.map((v) => v.users_id);
    arr.push(...users.filter((v) => v !== myInfo.user_id));

    setTypingArr(arr);
  }, [typing]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== undefined) {
        setRows(window.innerWidth > 480 ? 3 : 1);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      console.log("답장보내기");
      sendMessage({
        contents: contents,
        meetings_id: id,
        region_code: "RC003",
        users_id: myInfo.user_id,
        reply_id: Number(Object.keys(isReply)),
      });
    } else {
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
    }
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

  return (
    <div className="bg-[rgba(13,160,197,0.1)] p-4 pt-0">
      {typingArr.length !== 0 && (
        <div>
          {typingArr?.join(", ")}
          님이 입력 중입니다.
        </div>
      )}
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

      <div className="flex flex-col rounded-lg bg-white">
        <textarea
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

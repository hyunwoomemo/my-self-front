"use client";

import { myInfoProps } from "@/app/client-layout";
import Button from "@/components/common/Button";
import { useSocket } from "@/hooks/useSocket";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { messagesAtom } from "@/store/meeting/messages/atom";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { TbPhoto } from "react-icons/tb";

const InputBar = ({ id, msgRef }) => {
  const [contents, setContents] = useState<string>("");
  const [currentMsg, setCurrentMsg] = useState("");
  const { sendMessage } = useSocket();
  const [rows, setrows] = useState<number>(() => (window.innerWidth > 480 ? 3 : 1));
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const [isAfterClick, setIsAfterClick] = useState(false);
  const messages = useAtomValue(messagesAtom);

  useEffect(() => {
    const handleResize = () => {
      setrows(window.innerWidth > 480 ? 3 : 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    //스크롤 위에 있을때, 내가 작성한 메세지가 보내지면 아래로 스크롤
    if (isAfterClick && msgRef.current) {
      console.log("msgRef.current", msgRef.current);
      msgRef.current.scrollIntoView();
      setIsAfterClick(false);
    }
  }, [messages]);

  const handleClick = () => {
    sendMessage({
      contents: contents,
      meetings_id: id,
      region_code: "A02",
      users_id: myInfo.id,
    });
    setCurrentMsg("");
    setIsAfterClick(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleClick();
    }
  };

  const handleChangeContents = (text: string) => {
    setContents(text);
    setCurrentMsg(text);
  };
  return (
    <div className="bg-[rgba(13,160,197,0.1)] p-4 pt-0">
      <div className="flex flex-col rounded-lg bg-white">
        <textarea
          className="scrollbar w-full flex-1 resize-none whitespace-pre-wrap rounded-lg bg-white p-4 pb-0"
          placeholder="내용을 입력해 주세요..."
          rows={rows}
          onChange={(e) => handleChangeContents(e.target.value)}
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

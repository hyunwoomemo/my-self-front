"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useSocket } from "@/hooks/useSocket";
import { ReactElement, useEffect, useState } from "react";
import { TbPhoto } from "react-icons/tb";

const InputBar = ({ id }) => {
  const [contents, setContents] = useState<string>("");
  const [currentMsg, setCurrentMsg] = useState("");

  const { sendMessage } = useSocket();

  const handleClick = () => {
    sendMessage({
      contents: contents,
      meetings_id: id,
      region_code: "A02",
      users_id: 125,
    });
    setCurrentMsg("");
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
  console.log(contents);
  return (
    <div className="p-4 pt-0">
      <div className="flex flex-col rounded-lg bg-surface">
        <textarea
          className="scrollbar w-full flex-1 resize-none whitespace-pre-wrap rounded-lg bg-surface p-4 pb-0"
          placeholder="내용을 입력해 주세요..."
          rows={screen.width > 599 ? 3 : 1}
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

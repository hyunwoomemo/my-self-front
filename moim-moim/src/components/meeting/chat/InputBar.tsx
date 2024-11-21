"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useSocket } from "@/hooks/useSocket";
import { ReactElement, useEffect, useState } from "react";

const InputBar = ({ id }) => {
  console.log("aaa");
  const [contents, setContents] = useState<string>("");

  const { sendMessage } = useSocket();

  const handleClick = () => {
    sendMessage({
      contents: contents,
      meetings_id: id,
      region_code: "A02",
      users_id: 125,
    });
  };

  const handleChangeContents = (text: string) => {
    console.log("tttt", text);
    setContents(text);
  };

  return (
    <>
      <Input onChange={(e) => handleChangeContents(e.target.value)} />
      <Button title="전송" onClick={handleClick} />
    </>
  );
};
export default InputBar;

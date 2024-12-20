"use client";

import { myInfoProps } from "@/app/client-layout";
import Button from "@/components/common/Button";
import { ActiveDataProps, useSocket } from "@/hooks/useSocket";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { messagesAtom, typingAtom } from "@/store/meeting/messages/atom";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { TbPhoto } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { activeAtom } from "@/store/meeting/active/atom";

const InputBar = ({ id, lastMsgRef, isReply, setIsReply }) => {
  const [contents, setContents] = useState("");
  const { sendMessage } = useSocket();
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
  const [tagId, setTagId] = useState(-1);
  const editableRef = useRef<HTMLDivElement>(null);
  const [tagNick, setTagNick] = useState(activeData?.[0]?.nickname);
  const currentRegion = JSON.parse(localStorage.getItem("address")).address_code;

  useEffect(() => {
    // focusIndex 변경 시 tagNick 동기화
    if (focusIndex >= 0 && focusIndex < activeData?.length) {
      setTagNick(activeData[focusIndex]?.nickname || "");
    }
  }, [focusIndex, activeData]);

  useEffect(() => {
    const arr = [];
    const users = typing.map((v) => v.users_id);
    arr.push(...users.filter((v) => v !== myInfo.user_id));

    setTypingArr(arr);
  }, [typing]);

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.focus();

      focusContentEditableTextToEnd(editableRef.current);
    }
  }, []);

  useEffect(() => {
    //스크롤 위에 있을때, 내가 작성한 메세지가 보내지면 아래로 스크롤
    if (isAfterClick && lastMsgRef.current) {
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
        region_code: currentRegion,
        users_id: myInfo.user_id,
        reply_id: Number(Object.keys(isReply)),
      });
    } else if (tagId !== -1) {
      //언급 보내기
      sendMessage({
        contents: contents,
        meetings_id: id,
        region_code: currentRegion,
        users_id: myInfo.user_id,
        tag_id: tagId,
      });
    } else {
      //그냥 보내기
      sendMessage({
        contents: contents,
        meetings_id: id,
        region_code: currentRegion,
        users_id: myInfo.user_id,
      });
    }

    setContents("");
    setIsAfterClick(true);
    if (editableRef.current) {
      editableRef.current.innerText = "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && contents === "") {
      //아무 내용없을 때 전송 방지
      e.preventDefault();
      setContents("");
      return;
    }
    if (e.key === "Enter" && !e.shiftKey && !isTag) {
      e.preventDefault();
      handleClick();
      setIsReply([]);
      setContents("");
      if (editableRef.current) editableRef.current.innerHTML = "";
      if (tagId !== -1) {
        setTagId(-1);
        setContents("");
      }
    } else {
      if (keyEvent[e.key]) keyEvent[e.key](e);
    }
  };

  const keyEvent = {
    Escape: () => {
      if (isTag) {
        setIsTag(false);
      }
    },
    "@": () => {
      if (!editableRef.current?.innerText.includes("@")) {
        // 한 명만 언급하기 (추후에 수정 필요)
        setIsTag(true);
      }
    },
    ArrowDown: () => {
      if (isTag) {
        setFocusIndex((prev) => {
          const newIndex = (prev + 1) % activeData.length; //배열 길이로 나눈 나머지
          setTagNick(activeData[newIndex]?.nickname || "");
          return newIndex;
        });
      }
    },
    ArrowUp: () => {
      if (isTag) {
        setFocusIndex((prev) => {
          const newIndex = prev - 1 < 0 ? activeData.length - 1 : prev - 1; //맨 위로 올라가면 맨 아래로 이동
          setTagNick(activeData[newIndex]?.nickname || "");
          return newIndex;
        });
      }
    },
    Enter: (e) => {
      if (isTag) {
        //언급창 떠있을 때
        e.preventDefault();
        setTagId(activeData[focusIndex].users_id);
        setIsTag(false);
        setTagNick(activeData[focusIndex].nickname);
        setFocusIndex(0);
        handleTagNick();
      }
    },
  };

  const handleTagNick = () => {
    if (editableRef.current) {
      let currentHTML = editableRef.current.innerHTML;

      currentHTML = currentHTML.replace(/^@/, ""); //현재는 첫번째 @만 삭제됨,, 개선 필요,,
      currentHTML += ` <span class="text-point font-bold">@${tagNick}</span>&nbsp;`;
      editableRef.current.innerHTML = currentHTML;

      // 커서를 태그 뒤로 이동
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(editableRef.current);
      range.collapse(false); // 끝으로 이동
      selection?.removeAllRanges();
      selection?.addRange(range);

      document.execCommand("styleWithCSS", false, "false");
    }
  };

  const handleTyping = () => {
    userTyping({ users_id: myInfo.user_id, meetings_id: id, region_code: currentRegion });
  };

  const handleCloseReply = () => {
    setIsReply([]);
  };

  //답장 시 포커스
  if (isReply && editableRef.current) {
    editableRef.current.focus();
  }
  const handleInput = (e) => {
    const text = e.target.innerText || "";
    setContents(text);

    //커서
    const selection = window.getSelection();
    if (selection?.rangeCount > 0) {
      const range = selection?.getRangeAt(0);
      const textBeforeCursor = range?.startContainer.textContent?.substring(0, range?.startOffset) || "";

      //커서 앞에 '@'가 있으면 태그창 열리기
      if (textBeforeCursor.endsWith("@")) {
        setIsTag(true);
      } else {
        setIsTag(false);
      }
    }
  };

  const focusContentEditableTextToEnd = (e: HTMLElement) => {
    if (e.innerText.length === 0) {
      e.focus();

      return;
    }

    // const selection = window.getSelection();
    // const newRange = document.createRange();
    // newRange.selectNodeContents(e);
    // newRange.collapse(false);
    // selection?.removeAllRanges();
    // selection?.addRange(newRange);
  };

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
      <div className="relative flex flex-col rounded-lg bg-white">
        {/* 태그창 열기 */}
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
                    <span>{v.nickname}</span>
                  </span>
                ) : (
                  <span>{v.nickname}</span>
                )}
              </button>
            ))}
          </div>
        )}
        {/* 채팅 입력창 */}
        <div className="relative flex flex-col rounded-lg bg-white">
          <div
            ref={editableRef}
            contentEditable
            className="w-full whitespace-pre-wrap rounded-lg p-4 text-black outline-none"
            onInput={(e) => {
              handleInput(e);
              handleTyping();
              focusContentEditableTextToEnd(e.currentTarget);
            }}
            onKeyDown={handleKeyDown}
            suppressContentEditableWarning
          ></div>
        </div>
        <div className="flex items-center justify-between p-4">
          <button className="flex h-12 w-12 items-center justify-center rounded-lg bg-white p-2 shadow-md">
            <TbPhoto size={20} />
          </button>
          <Button title="전송" disabled={contents?.length === 0} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};
export default InputBar;

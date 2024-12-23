"use client";

import { getListProps, getMeetingData, useSocket } from "@/hooks/useSocket";
import { currentMeetingAtom } from "@/store/meeting/currentMeeting/atom";
import { listAtom } from "@/store/meeting/list/atom";
import { messagesAtom } from "@/store/meeting/messages/atom";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/ko";
import { HiArrowSmallDown } from "react-icons/hi2";
import { loadingAtom } from "@/store/common/atom";
import { Loader } from "@/components/common/Loader";
import { activeAtom } from "@/store/meeting/active/atom";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { myInfoProps } from "@/app/client-layout";
import Empty from "@/components/common/Empty";
import { FiCornerDownRight } from "react-icons/fi";
import { meetingDataAtom } from "@/store/meeting/data/atom";

const Contents = ({ id, scrollRef, lastMsgRef, contentsRef, handleReply }) => {
  const data = useAtomValue(listAtom) as getListProps[];
  const [currentMeeting, setCurrentMeeting] = useAtom(currentMeetingAtom);
  const { enterMeeting, socket } = useSocket();
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;

  const messages = useAtomValue(messagesAtom);

  const loading = useAtomValue(loadingAtom);
  const activeData = useAtomValue(activeAtom);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasFocus, setHasFocus] = useState(false);
  const msgRefs = useRef([]);
  const [isHover, setIsHover] = useState({});
  const meetingData = useAtomValue(meetingDataAtom) as getMeetingData;
  const currentRegion = JSON.parse(localStorage.getItem("address")).address_code;

  useEffect(() => {
    console.log("방 입장");
    return () => {
      if (currentMeeting) {
        setCurrentMeeting(-1);
        console.log("방 떠남");
        socket?.emit("exitMoim", { region_code: currentRegion, meetings_id: Number(id) });
      }
    };
  }, []);

  useEffect(() => {
    // 채팅창 처음 켰을 때 맨 아래로 이동 시키기
    handleToBottom();
  }, [lastMsgRef.current]);

  useEffect(() => {
    const handleFocusWindow = () => {
      setHasFocus(true);
      if (data) {
        const target = data.find((v) => {
          return v.id === Number(id);
        });
        const type = target?.type;

        if (type && myInfo) {
          console.log("🚀focussss");
          enterMeeting({
            region_code: currentRegion,
            meetings_id: Number(id),
            users_id: myInfo.user_id,
            type: type,
            afterBlur: true,
          });
        }
      }
    };

    const handleBlurWindow = () => {
      setHasFocus(false);
      console.log("🎀blurrrrr");
      socket?.emit("blurMoim", { region_code: currentRegion, meetings_id: Number(id) });
    };

    window.addEventListener("focus", handleFocusWindow);
    window.addEventListener("blur", handleBlurWindow);

    return () => {
      window.removeEventListener("focus", handleFocusWindow);
      window.removeEventListener("blur", handleBlurWindow);
    };
  }, [hasFocus]);

  useEffect(() => {
    // 스크롤 올렸을 때 "맨 아래로 버튼" 활성화 시키기
    const handleScroll = () => {
      if (lastMsgRef?.current?.offsetTop - 500 > contentsRef?.current.scrollTop + contentsRef?.current?.offsetHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    // 새로 고침했을 때 재입장!!!
    if (currentMeeting) return;

    if (data) {
      const target = data.find((v) => {
        return v.id === Number(id);
      });
      const type = target?.type;
      if (type && myInfo) {
        enterMeeting({ region_code: currentRegion, meetings_id: Number(id), users_id: myInfo.user_id, type: type });
      }
    }
  }, [currentMeeting, data]);

  const handleToBottom = () => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView();
    }
  };

  //답장하기
  const handleMouseOver = (i) => {
    setIsHover({
      [i]: true,
    });
  };
  const handleMouseOut = (i) => {
    setIsHover({
      [i]: false,
    });
  };

  msgRefs.current.map((v, i) => {
    if (msgRefs.current) {
      v?.addEventListener("mouseover", () => handleMouseOver(i));
      v?.addEventListener("mouseout", () => handleMouseOut(i));
    }
  });

  //메시지가 없을 때
  // if (!messages) return;

  const getUnReadCount = (data) => {
    // console.log("🔔", data, activeData);

    // 읽어야할 사람들
    const users = (data.users || "")
      .split(",") //string을 ","로 구분하여 배열로 만들어서
      .map((v) => Number(v)); //string을 Number로 바꾸고,

    const unReadCount = users.reduce((result, cur) => {
      // console.log("activeData", activeData, cur, data); // 내가 활용할 수 있는 데이터들

      const curr = activeData?.find((v) => v.users_id === cur); //전체 인원 중에서 읽어야할 사람을 추출해서

      if (moment(curr?.last_active_time).isBefore(data.created_at)) {
        result = result + 1;
      } //비교해서 맞으면 카운트 1

      return result;
    }, 0);

    return unReadCount;
  };

  if (loading) {
    return <Loader />;
  }

  if (!messages)
    return (
      <div className="flex flex-col-reverse gap-2 p-4">
        <div className="w-full rounded-3xl bg-[rgba(95,125,143,0.3)] p-1 text-center text-sm font-thin text-white">
          {moment(meetingData?.created_at).format("YYYY년 MM월 DD일 dddd")}
        </div>
      </div>
    );
  return (
    <>
      <div>
        <div className="flex h-full flex-col-reverse gap-2 p-4">
          {messages?.list?.map((v, i, arr) => {
            const isMe = myInfo.user_id === v.users_id;
            return (
              <div key={v.id} className={`flex flex-col gap-2`}>
                {moment(arr[i + 1]?.created_at).format("YYYY MM DD dddd") !==
                  moment(v?.created_at).format("YYYY MM DD dddd") && (
                  <div className="w-full rounded-3xl bg-[rgba(95,125,143,0.3)] p-1 text-center text-sm font-thin text-white">
                    {moment(v?.created_at).format("YYYY년 MM월 DD일 dddd")}
                  </div>
                )}
                {myInfo.user_id !== v.users_id && v.nick && v.admin !== 1 && <div className="mt-2">{v.nickname}</div>}

                {v.admin === 1 ? (
                  <div className="w-full rounded-3xl bg-[rgba(95,125,143,0.3)] p-1 text-center text-sm font-thin text-white">
                    {v.contents}
                  </div>
                ) : (
                  <div
                    ref={(el) => (msgRefs.current[v.id] = el)}
                    className={`relative flex w-fit max-w-[70%] items-end gap-1 ${isMe ? "flex-row-reverse self-end" : ""}`}
                  >
                    <div className={`flex items-end gap-1 ${isMe ? "flex-row-reverse pl-14" : "pr-14"}`}>
                      <div
                        className={`w-fit flex-shrink-0 whitespace-pre-wrap rounded-3xl p-3 ${isMe ? "self-end rounded-br-none bg-semiPrimary text-right" : "rounded-bl-none bg-white"}`}
                      >
                        {/* 답장일 때 */}
                        {v.reply_id !== 0 && (
                          <div
                            onClick={() => {
                              const replyElement = msgRefs.current?.[v.reply_id];
                              console.log("replyElement", v.id, v.reply_id);
                              if (replyElement) {
                                replyElement.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              } else {
                                console.error(`Element with ID ${v.reply_id} not found.`);
                              }
                            }}
                          >
                            <div className="text-xs text-primary">
                              {v.reply_nickname === myInfo?.nickname ? "나" : v.reply_nickname}
                              에게 답장
                            </div>
                            <div className="break-all text-sm text-disabledText">{v.reply_contents}</div>
                            <div className="h-[1px] w-full bg-[rgba(0,0,0,0.1)]"></div>
                          </div>
                        )}
                        <div className="pt-1">{v.contents}</div>
                      </div>

                      {/* 답장하기 아이콘 */}
                      {isHover[v.id] && (
                        <button
                          className={`group absolute bottom-0 cursor-pointer p-1 ${isMe ? "right-[calc(100%-3rem)]" : "left-[calc(100%-3rem)]"}`}
                          onClick={() => handleReply(v.id)}
                          // onClick={() => console.log("clicked")}
                        >
                          <span className="block rounded-full bg-black bg-opacity-5 p-1 text-white group-hover:bg-opacity-10">
                            <FiCornerDownRight size={12} />
                          </span>
                        </button>
                      )}
                      {/* 시간 */}
                      {v.time && (
                        <span className="pb-1 text-[9px] text-textGray">{moment(v.created_at).format("HH:mm")}</span>
                      )}
                      {/* 읽음 표시 */}
                      {getUnReadCount(v) !== 0 && (
                        <span className="pb-1 text-[9px] text-point">{getUnReadCount(v)}</span>
                      )}
                    </div>
                  </div>
                )}
                {/* <span className="pb-1 text-[9px] text-textGray">{moment(v.created_at).format("HH:mm")}</span> */}
              </div>
            );
          })}
          <div className="w-full rounded-3xl bg-[rgba(95,125,143,0.3)] p-1 text-center text-sm font-thin text-white">
            {moment(meetingData?.created_at).format("YYYY년 MM월 DD일 dddd")}
          </div>
          <div ref={scrollRef}></div>
        </div>
        <div ref={lastMsgRef}></div>

        {isVisible && (
          <div
            className="fixed bottom-56 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md shadow-gray-300"
            onClick={handleToBottom}
          >
            <HiArrowSmallDown size={20} />
          </div>
        )}
      </div>
    </>
  );
};

export default Contents;

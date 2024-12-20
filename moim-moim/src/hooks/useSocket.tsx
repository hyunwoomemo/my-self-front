"use client";

import { errorAtom, loadingAtom } from "@/store/common/atom";
import { activeAtom } from "@/store/meeting/active/atom";
import { currentMeetingAtom } from "@/store/meeting/currentMeeting/atom";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { listAtom } from "@/store/meeting/list/atom";
import { endMsgAtom, messagesAtom, messagesValue, recentMsgAtom, typingAtom } from "@/store/meeting/messages/atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { GroupedData } from "@/utils/group";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { myInfoProps } from "@/app/client-layout";

export let socket: Socket;

export interface getListProps {
  category1_name: string;
  category1_id: number;
  category2_name: string;
  category2_id: number;
  created_at: string;
  creator_id: number;
  description: string;
  event_date: string;
  id: number;
  max_members: number;
  name: string;
  region_code: string;
  userCount: number;
  type: number;
  last_active_time: string;
  likeCount: number;
}

export interface getMeetingData {
  category1_name: string;
  category2_name: string;
  created_at: string;
  creator_id: number;
  creator_name: string;
  description: string;
  event_date: string;
  id: number;
  max_members: number;
  name: string;
  region_code: string;
  userCount: number;
  type: number;
  likeCount: number;
}

export interface SendMessageProps {
  contents: string;
  meetings_id: number;
  region_code: string;
  users_id: number;
  reply_id?: number;
  tag_id?: number;
}

export interface JoinMeetingProps {
  meetings_id: number;
  region_code: string;
  users_id: number;
  type: number;
}

export interface GenerateMeeting {
  name: string;
  region_code: string;
  maxMembers: number;
  description: string;
  users_id: number;
  type: number;
  category1: number | undefined;
  category2: number | undefined;
  date: moment.Moment;
}

export interface EnterMeeting {
  region_code: string;
  meetings_id: number;
  users_id: number;
  type: number;
  afterBlur?: boolean;
}

export interface ListValue {
  admin?: number;
  contents: string;
  created_at: string;
  id: number;
  meetings_id: number;
  nickname: string;
  reply_id: number;
  users: string;
  users_id: number;
}

export interface ActiveDataProps {
  id: number;
  last_active_time: string;
  meetings_id: number;
  nickname: string;
  status: number;
  updated_at: string;
  users_id: number;
}

export const useSocket = () => {
  const setList = useSetAtom(listAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setMeetingData = useSetAtom(meetingDataAtom);
  const setMessages = useSetAtom(messagesAtom);
  const [currentMeeting, setCurrentMeeting] = useAtom(currentMeetingAtom);
  const setActive = useSetAtom(activeAtom);
  const setError = useSetAtom(errorAtom);
  const setTyping = useSetAtom(typingAtom);
  const router = useRouter();
  const setRecentMsg = useSetAtom(recentMsgAtom);
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const setEndMsg = useSetAtom(endMsgAtom);

  useEffect(() => {
    //소켓 연결
    if (!socket) {
      //socket이 여러개 연결되는 걸 방지, 없을 때만 연결하기!!!
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        transports: ["websocket"],
        reconnectionAttempts: 10,
      });
    } else {
      // 이미 등록되어있는 on 이벤트 제거
      socket?.removeAllListeners();
    }

    const handleConnect = () => {
      console.log("connected!", myInfo?.user_id);
      register({ users_id: myInfo?.user_id });
    };

    const handleMeetingActive = (data) => {
      setLoading(true);
      setActive(data);
      setLoading(false);
    };

    const handleError = (error) => {
      setError(error);
    };

    const handleUserTyping = (data) => {
      setTyping(data);
    };
    socket?.on("connect", handleConnect);
    socket?.on("meetingActive", handleMeetingActive);
    socket?.on("enterRes", (data) => {
      console.log("enterRes", data);
      if (data.CODE === "EM000") {
        router.push(`/moim/${currentMeeting}/chat`);
      } else if (data.CODE === "EM001") {
        router.push(`/moim/${currentMeeting}/intro`);
      } else {
        console.log("enter error");
      }
    });
    socket?.on("list", handleGetList);
    socket?.on("meetingData", handleGetMeetingData);
    socket?.on("messages", handleMessagesData);
    socket?.on("receiveMessage", handleReceiveMessage);
    socket?.on("disconnect", (e) => {
      console.log("disconnect e", e);
    });
    socket?.on("error", handleError);
    socket?.on("userTyping", handleUserTyping);
  }, [currentMeeting, myInfo]);

  const handleGetList = (data: getListProps) => {
    setLoading(true);
    setList(data);
    setLoading(false);
  };

  const handleGetMeetingData = (data: getMeetingData) => {
    setLoading(true);
    setMeetingData(data);
    setLoading(false);
  };

  const handleMessagesData = (data: messagesValue) => {
    setLoading(true);
    console.log("data?.end🔔", data);
    setEndMsg(data?.end);
    if (data) {
      const list = Array.isArray(data?.list) ? data.list : [];
      return { ...data, list: GroupedData([data, ...list]).reverse() };
    }
    // setMessages(data);
    setLoading(false);
  };

  const handleReceiveMessage = (data: messagesValue) => {
    console.log("handleReceiveMessage", data);
    setLoading(true);
    setMessages((prev: messagesValue) => {
      const list = Array.isArray(prev?.list) ? prev.list : [];
      return { ...prev, list: GroupedData([data, ...list]).reverse() };
    });
    setRecentMsg(data);
    setLoading(false);
  };

  const register = ({ users_id }) => {
    socket?.emit("register", { users_id });
  };

  const joinArea = (region_code: string) => {
    socket?.emit("join", { region_code });
  };

  const enterMeeting = ({ region_code, meetings_id, users_id, type, afterBlur }: EnterMeeting) => {
    setLoading(true);
    console.log("현재 입장한 방의 id, currentMeeting", meetings_id);
    setCurrentMeeting(meetings_id);
    setLoading(false);

    socket?.emit("enterMeeting", { region_code, meetings_id, users_id, type, afterBlur });
  };

  const generateMeeting = (params: GenerateMeeting) => {
    socket?.emit("generateMeeting", params);
  };

  const joinMeeting = (params: JoinMeetingProps) => {
    socket?.emit("joinMeeting", params);
  };

  const sendMessage = (params: SendMessageProps) => {
    socket?.emit("sendMessage", params);
  };

  const likeMoim = ({ users_id, meetings_id, region_code }) => {
    socket?.emit("likeMoim", { users_id, meetings_id, region_code });
  };

  const userTyping = ({ users_id, meetings_id, region_code }) => {
    socket?.emit("typing", { users_id, meetings_id, region_code });
  };

  const leaveMoim = ({ users_id, meetings_id, region_code }) => {
    socket?.emit("leaveMoim", { users_id, meetings_id, region_code });
  };

  return {
    register,
    joinArea,
    enterMeeting,
    generateMeeting,
    joinMeeting,
    sendMessage,
    likeMoim,
    userTyping,
    leaveMoim,
    socket,
  };
};

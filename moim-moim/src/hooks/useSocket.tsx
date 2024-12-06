"use client";

import { errorAtom, loadingAtom } from "@/store/common/atom";
import { activeAtom } from "@/store/meeting/active/atom";
import { currentMeetingAtom } from "@/store/meeting/currentMeeting/atom";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { listAtom } from "@/store/meeting/list/atom";
import { messagesAtom } from "@/store/meeting/messages/atom";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { GroupedData } from "@/utils/group";

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
}

export interface SendMessageProps {
  contents: string;
  meetings_id: number;
  region_code: string;
  users_id: number;
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
  category1: number;
  category2: number;
}

export interface EnterMeeting {
  region_code: string;
  meetings_id: number;
  users_id: number;
  type: number;
}

export interface MessagesValue {
  contents: string;
  created_at: string;
  id: number;
  meetings_id: number;
  unReadCount: number;
  users_id: number;
}

export const useSocket = () => {
  const setList = useSetAtom(listAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setMeetingData = useSetAtom(meetingDataAtom);
  const setMessages = useSetAtom(messagesAtom);
  const setCurrentMeeting = useSetAtom(currentMeetingAtom);
  const setActive = useSetAtom(activeAtom);
  const setError = useSetAtom(errorAtom);
  const router = useRouter();

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

    const handleConnect = () => console.log("connected!");

    const handleMeetingActive = (data) => {
      setLoading(true);
      setActive(data);
      setLoading(false);
    };

    const handleError = (error) => {
      setError(error);
    };

    socket?.on("connect", handleConnect);
    socket?.on("meetingActive", handleMeetingActive);
    socket?.on("list", handleGetList);
    socket?.on("meetingData", handleGetMeetingData);
    socket?.on("messages", handleMessagesData);
    socket?.on("receiveMessage", handleReceiveMessage);
    socket?.on("disconnect", (e) => {
      console.log("disconnect e", e);
    });
    socket?.on("error", handleError);
  }, []);

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

  const handleMessagesData = (data: MessagesValue) => {
    console.log("???????", data);
    setLoading(true);

    setMessages({ ...data, list: GroupedData(data.list).reverse() });
    // setMessages(data);
    setLoading(false);
  };

  const handleReceiveMessage = (data: MessagesValue) => {
    console.log("handleReceiveMessage", data);
    setLoading(true);
    setMessages((prev: MessagesValue) => {
      return { ...prev, list: GroupedData([data, ...prev.list]).reverse() };
    });
    setLoading(false);
  };

  const joinArea = (region_code: string) => {
    socket?.emit("join", { region_code });
  };

  const enterMeeting = ({ region_code, meetings_id, users_id, type }: EnterMeeting) => {
    setLoading(true);
    console.log("enterMeetingenterMeeting");
    setCurrentMeeting(meetings_id);
    setLoading(false);

    socket?.emit("enterMeeting", { region_code, meetings_id, users_id, type });
    socket?.on("enterRes", (data) => {
      console.log("enterRes", data);
      if (data.CODE === "EM000") {
        router.push(`/moim/${meetings_id}/chat`);
      } else if (data.CODE === "EM001") {
        router.push(`/moim/${meetings_id}/intro`);
      } else {
        console.log("enter error");
      }
    });
  };

  const generateMeeting = (params: GenerateMeeting) => {
    socket?.emit("generateMeeting", params);
  };

  const joinMeeting = (params: JoinMeetingProps) => {
    socket?.emit("joinMeeting", params);
    socket?.on("enterRes", (data) => {
      console.log("enterRes", data);
      if (data.CODE === "EM000") {
        router.push(`/moim/${params.meetings_id}/chat`);
      } else if (data.CODE === "EM001") {
        router.push(`/moim/${params.meetings_id}/intro`);
      } else {
        console.log("enter error");
      }
    });
  };

  const sendMessage = (params: SendMessageProps) => {
    socket?.emit("sendMessage", params);
  };

  return { joinArea, enterMeeting, generateMeeting, joinMeeting, sendMessage, socket };
};

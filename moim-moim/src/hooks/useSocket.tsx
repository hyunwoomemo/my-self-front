import { loadingAtom } from "@/store/common/atom";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { listAtom } from "@/store/meeting/list/atom";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export interface getListProps {
  created_at: string;
  creator_id: number;
  description: string;
  event_date: string;
  id: number;
  max_members: number;
  name: string;
  region_code: string;
  userCount: number;
}

export interface getMeetingData {
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
}

export const useSocket = () => {
  const setList = useSetAtom(listAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setMeetingData = useSetAtom(meetingDataAtom);

  if (!socket) {
    //socket이 여러개 연결되는 걸 방지, 없을 때만 연결하기!!!
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
    });
  }

  const handleGetList = (data: getListProps) => {
    setLoading(true);
    setList(data);
    setLoading(false);
  };

  const joinArea = (region_code: string) => {
    socket.emit("join", { region_code });
  };

  const enterMeeting = ({ region_code, meetings_id, users_id }) => {
    socket.emit("enterMeeting", { region_code, meetings_id, users_id });
  };

  const handleGetMeetingData = (data: getMeetingData) => {
    setLoading(true);
    setMeetingData(data);
    setLoading(false);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("list", handleGetList);
    socket.on("meetingData", handleGetMeetingData);
  }, []);

  return { socket, joinArea, enterMeeting };
};

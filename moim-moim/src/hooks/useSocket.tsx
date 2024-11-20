import { loadingAtom } from "@/store/common/atom";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { listAtom } from "@/store/meeting/list/atom";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

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

export const useSocket = () => {
  const setList = useSetAtom(listAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setMeetingData = useSetAtom(meetingDataAtom);
  const router = useRouter();

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
  const enterMeeting = ({ region_code, meetings_id, users_id, type }) => {
    socket.emit("enterMeeting", { region_code, meetings_id, users_id, type });

    socket.on("enterRes", (data) => {
      console.log("datadata", data);
      if (data.CODE === "EM000") {
        router.push(`/moim/${meetings_id}/chat`);
      } else if (data.CODE === "EM001") {
        router.push(`/moim/${meetings_id}/intro`);
      } else {
        console.log("enter error");
      }
    });
  };

  const generateMeeting = ({ name, region_code, maxMembers, description, users_id, type, category1, category2 }) => {
    socket.emit("generateMeeting", {
      name,
      region_code,
      maxMembers,
      description,
      users_id,
      type,
      category1,
      category2,
    });
  };

  const joinMeeting = ({ meetings_id, region_code, users_id, type }) => {
    socket.emit("joinMeeting", {
      meetings_id,
      region_code,
      users_id,
      type,
    });
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

    return () => {
      socket.off("list", handleGetList);
      socket.off("meetingData", handleGetMeetingData);
    };
  }, []);

  return { socket, joinArea, enterMeeting, generateMeeting, joinMeeting };
};

"use client";
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";
import { accountApi } from "./api";
import { useAtom } from "jotai";
import { myInfoAtom } from "@/store/account/myInfo/atom";

export interface myInfoProps {
  birthdate: string;
  created_at: string;
  deleted_at: string;
  email: string;
  gender: string;
  id: number;
  ip: string;
  like: number;
  nickname: string;
  password: string;
  profile_image_name: string;
  profile_image_url: string;
  provider: string;
  provider_id: number;
  updated_at: string;
}
const ClientLayout = ({ children }) => {
  const { joinArea } = useSocket();
  const [myInfo, setMyinfo] = useAtom(myInfoAtom);

  useEffect(() => {
    accountApi.myInfo().then((res) => setMyinfo(res.data));
  }, [setMyinfo]);

  console.log("myInfo", myInfo);
  useEffect(() => {
    //회원가입 완료되면 해야할 일 : 지역담는 변수를 jotai 전역 변수로 만들고 setter함수로 myInfo에 있는 지역을 담고 dependency array에는 전역변수 담기
    joinArea("A02");
  }, [joinArea]);

  return <>{children}</>;
};

export default ClientLayout;

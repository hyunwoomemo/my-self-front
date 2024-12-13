"use client";
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";
import { accountApi } from "./api";
import { useAtom, useAtomValue } from "jotai";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { setCookie } from "cookies-next";
import { errorAtom } from "@/store/common/atom";

export interface MyInfoAddressesProps {
  address: string;
  address_code: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
}
export interface myInfoProps {
  birthdate: string;
  created_at: string;
  deleted_at: string;
  email: string;
  gender: string;
  user_id: number;
  ip: string;
  like: number;
  nickname: string;
  password: string;
  profile_image_name: string;
  profile_image_url: string;
  provider: string;
  provider_id: number;
  updated_at: string;
  addresses: MyInfoAddressesProps;
  interests: string;
}
const ClientLayout = ({ children }) => {
  const { joinArea } = useSocket();
  const [myInfo, setMyinfo] = useAtom(myInfoAtom);
  const error = useAtomValue(errorAtom);

  useEffect(() => {
    if (error) {
      alert(`에러났어용, 에러 메세지: ${error.message}`);
    }
  }, [error]);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("accessToken") && urlParams.has("refreshToken")) {
          const accessToken = urlParams.get("accessToken");
          const refreshToken = urlParams.get("refreshToken");
          // 쿠키에 토큰 저장
          setCookie("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);
          // URL에서 토큰 제거
          const newUrl = window.location.pathname; // 현재 경로만 가져옴
          window.history.replaceState(null, "", newUrl); // 쿼리 파라미터 제거
        }
        // 토큰 저장 후 myInfo API 호출
        const currentPath = window.location.pathname;
        if (!(currentPath === "/login" || currentPath === "/sign")) {
          const response = await accountApi.myInfo();
          setMyinfo(response.data);
        }
      } catch (err) {
        console.error("에러:", err);
      }
    };
    fetchTokenData();
  }, []);

  // useEffect(() => {
  //   accountApi.myInfo().then((res) => setMyinfo(res.data));
  // }, []);

  console.log("myInfo", myInfo);
  useEffect(() => {
    //회원가입 완료되면 해야할 일 : 지역담는 변수를 jotai 전역 변수로 만들고 setter함수로 myInfo에 있는 지역을 담고 dependency array에는 전역변수 담기
    joinArea("RC003");
  }, [joinArea]);

  return <>{children}</>;
};

export default ClientLayout;

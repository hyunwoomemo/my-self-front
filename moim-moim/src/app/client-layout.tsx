"use client";
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { setCookie } from "cookies-next";
import { errorAtom } from "@/store/common/atom";
// import { revalidateContents } from "@/utils/revalidateTag";

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
const ClientLayout = ({ children, myInfo }) => {
  const { joinArea } = useSocket();
  const setMyinfo = useSetAtom(myInfoAtom);
  const error = useAtomValue(errorAtom);

  useEffect(() => {
    setMyinfo(myInfo);
  }, [myInfo]);

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
          setMyinfo(myInfo);
        }
      } catch (err) {
        console.error("에러:", err);
      }
    };
    fetchTokenData();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAddress = localStorage.getItem("address");
      if (savedAddress) {
        joinArea(JSON.parse(localStorage.getItem("address")).address_code);
        console.log("joinArea(myInfo?.addresses[0]?.address_code);", joinArea(myInfo?.addresses[0]?.address_code));
      } else {
        joinArea(myInfo?.addresses[0]?.address_code);
        console.log("joinArea(myInfo?.addresses[0]?.address_code)", joinArea(myInfo?.addresses[0]?.address_code));
      }
    }
  }, [myInfo?.addresses[0]?.address_code]);

  return <>{children}</>;
};
export default ClientLayout;

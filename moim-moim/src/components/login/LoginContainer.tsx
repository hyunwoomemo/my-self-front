"use client";

import React, { useEffect } from "react";
import { LoginForm } from "@/components/login/LoginForm";
import "@/app/(auth)/styles/login.scss";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { accountApi } from "@/app/nextApi";
import { accountApiv1 } from "@/app/api";

export function LoginContainer() {
  const router = useRouter();
  const setMyinfo = useSetAtom(myInfoAtom);
  const handleLoginWithGoogle = () => {
    // loginWithProvider("google");
  };

  useEffect(() => {
    localStorage.removeItem("address");
    localStorage.removeItem("category1");
    localStorage.removeItem("category2");
  }, []);

  const handleLoginWithKakao = () => {
    // loginWithProvider("kakao");
    // window.location.href = 'http://localhost/auth/kakao'
    window.location.href = "http://moimmoim.duckdns.org/auth/kakao";
  };

  const handleLoginWithNaver = () => {
    // loginWithProvider("naver");
  };

  const handleLoginWithApple = () => {
    // loginWithProvider("apple");
  };

  const handleLoginClick = async (data: { email: string; password: string }) => {
    try {
      const res = await accountApiv1.login(data);
      if (res.statusCode === 200) {
        const { data } = res;
        console.log("datatata", res);
        setCookie("accessToken", data.accessToken);
        setCookie("refreshToken", data.refreshToken);

        accountApi.myInfo().then((userInfo) => {
          if (userInfo.success) {
            setMyinfo(userInfo.data);
          }
        });

        router.push("/");
      } else {
        return;
      }
    } catch (error) {
      console.error("로그인 중 에러 발생", error);
      alert("로그인 중 문제가 발생하였습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div className="login-container">
      <LoginForm
        onLoginClick={handleLoginClick}
        onLoginWithGoogle={handleLoginWithGoogle}
        onLoginWithKakao={handleLoginWithKakao}
        onLoginWithNaver={handleLoginWithNaver}
        onLoginWithApple={handleLoginWithApple}
      />
    </div>
  );
}

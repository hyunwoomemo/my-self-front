"use client";

import React from "react";
import { LoginForm } from "@/components/login/LoginForm";
import "@/app/(auth)/styles/login.scss";
import { accountApi } from "@/app/api";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function LoginContainer() {
  const router = useRouter();
  const handleLoginWithGoogle = () => {
    // loginWithProvider("google");
  };

  const handleLoginWithKakao = () => {
    // loginWithProvider("kakao");
  };

  const handleLoginWithNaver = () => {
    // loginWithProvider("naver");
  };

  const handleLoginWithApple = () => {
    // loginWithProvider("apple");
  };

  const handleLoginClick = async (data: { email: string; password: string }) => {
    try {
      const res = await accountApi.login(data);
      if (res.statusCode === 200) {
        const { data } = res;
        console.log("datatata", res);
        setCookie("accessToken", data.accessToken);
        setCookie("refreshToken", data.refreshToken);
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

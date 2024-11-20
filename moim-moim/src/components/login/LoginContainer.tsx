"use client";

import React from "react";
import { LoginForm } from "@/components/login/LoginForm";
import { loginWithProvider } from "@/actions/login/LoginAction";
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
    console.log("로그인 시도:", data);
    const res = await accountApi.login(data);
    console.log("resres", res);
    if (res.status === 200) {
      setCookie("accessToken", res.data.accessToken);
      setCookie("refreshToken", res.data.refreshToken);
      router.push("/");
    } else {
      return;
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

"use client";

import React from "react";
import { LoginForm } from "@/components/login/LoginForm";
import { loginWithProvider } from "@/actions/login/LoginAction";
import "@/app/(auth)/styles/login.scss";
import { accountApi } from "@/app/api";

export function LoginContainer() {
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
    console.log("res", res);
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

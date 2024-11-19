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
    const res = await accountApi.login(data);
    if (res.status === 200) {
      const {data} = res;
      setCookie("accessToken", data.data.accessToken);
      setCookie("refreshToken", data.data.refreshToken);
      // router.push("/");
    } else {
      return;
    }
  };
  const test = async () => {
    console.log('test')
    const res = await accountApi.myInfo();
    console.log('res', res)
  }
  return (
    <div className="login-container">
      <LoginForm
        onLoginClick={handleLoginClick}
        onLoginWithGoogle={handleLoginWithGoogle}
        onLoginWithKakao={handleLoginWithKakao}
        onLoginWithNaver={handleLoginWithNaver}
        onLoginWithApple={handleLoginWithApple}
      />
      <button onClick={test}>test</button>
    </div>
  );
}

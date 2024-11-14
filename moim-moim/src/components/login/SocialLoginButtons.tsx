"use client";
import React from "react";
// import '../../styles/socialLoginButtons.scss'
interface SocialLoginButtonsProps {
  onLoginWithGoogle: () => void;
  onLoginWithKakao: () => void;
  onLoginWithNaver: () => void;
  onLoginWithApple: () => void;
}

export function SocialLoginButtons({
  onLoginWithGoogle,
  onLoginWithKakao,
  onLoginWithNaver,
  onLoginWithApple,
}: SocialLoginButtonsProps) {
  return (
    <div className="flex justify-center gap-8 py-5">
      <button className="bg-social google" onClick={onLoginWithGoogle}></button>
      <button className="bg-social kakao" onClick={onLoginWithKakao}></button>
      <button className="bg-social naver" onClick={onLoginWithNaver}></button>
      <button className="bg-social apple" onClick={onLoginWithApple}></button>
    </div>
  );
}

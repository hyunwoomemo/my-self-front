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
    <div className="social-login">
      <button className="social-button google" onClick={onLoginWithGoogle}>
        구글로 로그인
      </button>
      <button className="social-button kakao" onClick={onLoginWithKakao}>
        카카오로 로그인
      </button>
      <button className="social-button naver" onClick={onLoginWithNaver}>
        네이버로 로그인
      </button>
      <button className="social-button apple" onClick={onLoginWithApple}>
        애플로 로그인
      </button>
    </div>
  );
}

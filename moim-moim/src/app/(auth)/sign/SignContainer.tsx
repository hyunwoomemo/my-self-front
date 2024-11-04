'use client';  // 클라이언트 컴포넌트로 설정

import React from 'react';
import { SignForm } from './components/SignForm';
import { signUpWithProvider } from './action/SignAction';
import { FormData } from './types'; // FormData 타입을 import
import '../styles/sign.scss';

export function SignContainer() {
  const handleSignUpClick = async (data: FormData) => {
    await signUpWithProvider(data);  // 비동기 회원가입 로직 호출
  };

  return (
    <div className="sign-container">
      <SignForm onSignUpClick={handleSignUpClick} />
    </div>
  );
}
"use client";
import React from "react";
import { FormData } from "./types";
import { SocialLoginButtons } from "./SocialLoginButtons";

// import "../../styles/login.scss";
import "@/app/(auth)/styles/login.scss";
import Input from "../common/Input";
import Button from "../common/Button";
interface LoginFormProps {
  onLoginClick: (data: FormData) => void;
  onLoginWithGoogle: () => void;
  onLoginWithKakao: () => void;
  onLoginWithNaver: () => void;
  onLoginWithApple: () => void;
}
interface FormData {
  email: string;
  password: string;
}

export function LoginForm({
  onLoginClick,
  onLoginWithGoogle,
  onLoginWithKakao,
  onLoginWithNaver,
  onLoginWithApple,
}: LoginFormProps) {
  const [formData, setFormData] = React.useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("나는 로그인 버튼");
    e.preventDefault();
    onLoginClick(formData); // 로그인 클릭 핸들러 호출
  };

  return (
    <form
      className="flex w-2/3 min-w-[300px] flex-col gap-6 rounded-xl bg-white p-10 shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-6">
        <Input
          label="이메일 주소"
          type="email"
          placeholder="moim@moimmoim.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button title="로그인" type="submit" custom="full" onClick={() => {}} />
      </div>
      <div className="flex w-fit flex-col gap-2">
        <button className="text-left underline">Forgot password?</button>
        <button>
          Don't have an account? <span className="font-bold text-primary underline">Sign up!</span>
        </button>
      </div>
      <SocialLoginButtons
        onLoginWithGoogle={onLoginWithGoogle}
        onLoginWithKakao={onLoginWithKakao}
        onLoginWithNaver={onLoginWithNaver}
        onLoginWithApple={onLoginWithApple}
      />
    </form>
  );
}

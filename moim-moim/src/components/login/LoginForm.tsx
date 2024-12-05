"use client";
import React from "react";
import { SocialLoginButtons } from "./SocialLoginButtons";

// import "../../styles/login.scss";
import "@/app/(auth)/styles/login.scss";
import Input from "../common/Input";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormData>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginClick(formData); // 로그인 클릭 핸들러 호출
  };

  const signUpHandler = () => {
    router.push("/sign");
  };
  return (
    <form
      className="flex w-2/3 min-w-[300px] flex-col gap-6 rounded-xl bg-white p-10 shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-6">
        <Input
          label="이메일 주소"
          name="email"
          type="email"
          placeholder="moim@moimmoim.com"
          onChange={handleChange}
          required
        />
        <Input
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호 입력"
          onChange={handleChange}
          required
        />
        <Button title="로그인" type="submit" custom="full" />
      </div>
      <div className="flex w-fit flex-col gap-2">
        <button className="text-left underline">Forgot password?</button>
        <button onClick={signUpHandler}>
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

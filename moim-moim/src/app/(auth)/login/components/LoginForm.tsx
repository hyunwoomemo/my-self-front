"use client";
import React from "react";
import { FormData } from "../types";
import { SocialLoginButtons } from "./SocialLoginButtons";

import "../../styles/login.scss";
interface LoginFormProps {
  onLoginClick: (data: FormData) => void;
  onLoginWithGoogle: () => void;
  onLoginWithKakao: () => void;
  onLoginWithNaver: () => void;
  onLoginWithApple: () => void;
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
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <div className="form-group">
        <input type="text" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} required />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>

      <button type="submit">로그인</button>
      <SocialLoginButtons
        onLoginWithGoogle={onLoginWithGoogle}
        onLoginWithKakao={onLoginWithKakao}
        onLoginWithNaver={onLoginWithNaver}
        onLoginWithApple={onLoginWithApple}
      />
    </form>
  );
}

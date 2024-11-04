"use client";
import React from "react";
import { FormData } from "./types"; // FormData 타입을 import

interface SignFormProps {
  onSignUpClick: (data: FormData) => void; // Action을 호출하는 props
}

export function SignForm({ onSignUpClick }: SignFormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    nickName: "",
    birthDate: "",
    gender: "",
  });

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // 유효성 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "유효한 이메일을 입력해주세요.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!formData.nickName) {
      newErrors.nickName = "닉네임을 입력해주세요.";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "생년월일을 입력해주세요.";
    }

    if (!formData.gender) {
      newErrors.gender = "성별을 선택해주세요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Action 호출
    onSignUpClick(formData);
    setErrors({}); // 에러 초기화
  };

  return (
    <form className="sign-form" onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <div className="form-group">
        <input type="text" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div className="form-group">
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
      </div>
      <div className="form-group">
        <input type="text" name="nickName" placeholder="닉네임" value={formData.nickName} onChange={handleChange} />
        {errors.nickName && <div className="error">{errors.nickName}</div>}
      </div>
      <div className="form-group">
        <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
        {errors.birthDate && <div className="error">{errors.birthDate}</div>}
      </div>
      <div className="form-group">
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">성별 선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
        {errors.gender && <div className="error">{errors.gender}</div>}
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
}

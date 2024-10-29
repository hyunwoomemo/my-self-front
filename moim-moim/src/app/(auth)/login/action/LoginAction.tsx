import { signIn } from "next-auth/react";

export const handleEmailSignIn = (email: string, password: string) => {
  console.log("Email:", email);
  console.log("Password:", password);
  // 로그인 로직 추가
};

export const handleSocialSignIn = (provider: string) => {
  signIn(provider);
};

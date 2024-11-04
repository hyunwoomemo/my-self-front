import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import AppleProvider from "next-auth/providers/apple";

import jwt from "jsonwebtoken"; // 어캐 쓰능교 ..
function generateAppleClientSecret() {
  const payload = {
    iss: process.env.APPLE_TEAM_ID,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 180, // 180일 유효
    aud: "https://appleid.apple.com",
    sub: process.env.APPLE_ID,
  };

  const privateKey = process.env.APPLE_PRIVATE_KEY!.replace(/\\n/g, "\n");
  return jwt.sign(payload, privateKey, {
    algorithm: "ES256",
    keyid: process.env.APPLE_KEY_ID,
  });
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: generateAppleClientSecret(),
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

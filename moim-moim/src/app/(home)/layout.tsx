import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "모임모임 | 더이상 혼자가 아니다",
  description: "맛집, 취미, 여행 이젠 함께하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

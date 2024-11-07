import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Hr from "@/components/common/Hr";
import Nav from "@/components/common/Nav";
import Header from "@/components/home/Header";
import React from "react";

const gamtan = localFont({
  src: [
    {
      path: "./fonts/gamtanLoadThin.woff2",
      weight: "300",
    },
    {
      path: "./fonts/gamtanLoadRegular.woff2",
      weight: "normal",
    },
    {
      path: "./fonts/gamtanLoadBold.woff2",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-gamtan",
});

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
    <html lang="en" className={`${gamtan.className} scrollbar`}>
      <body>
        <div className="commonLayoutContainer">
          <Header />
          <Hr />
          <main className="relative w-full max-w-[600px]" style={{ height: "calc(100vh - 11rem)" }}>
            {children}
          </main>
          <Nav />
        </div>
      </body>
    </html>
  );
}

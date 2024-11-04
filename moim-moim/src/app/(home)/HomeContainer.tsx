import React from "react";
import Link from "next/link";
import "./home.scss";

export const HomeContainer = () => {
  return (
    <div className="home-container">
      <h1>환영합니다!</h1>
      <div className="button-container">
        <Link href="/login">
          <button className="login-button">로그인</button>
        </Link>
        <Link href="/sign">
          <button className="signup-button">회원가입</button>
        </Link>
      </div>
    </div>
  );
};

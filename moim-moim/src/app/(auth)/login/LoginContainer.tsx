"use client";

import React from "react";
import LoginForm from "./components/LoginForm";
import SocialLoginButtons from "./components/SocialLoginButtons";
import { handleEmailSignIn } from "./action/LoginAction";
import "../styles/login.scss";
const LoginContainer = () => (
  <div className="auth-container">
    <h1>Login</h1>
    <LoginForm onLogin={handleEmailSignIn} />
    <SocialLoginButtons />
  </div>
);

export default LoginContainer;

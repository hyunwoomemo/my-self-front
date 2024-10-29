// app/auth/Sign/SignContainer.tsx
"use client";

import React from "react";
import SignForm from "./components/SignForm";
import { handleEmailSignUp } from "./action/SignAction";
import "../styles/login.scss";

const SignContainer = () => (
  <div className="auth-container">
    <h1>Sign</h1>
    <SignForm onSign={handleEmailSignUp} />
  </div>
);

export default SignContainer;

import React from "react";
import { handleSocialSignIn } from "../action/LoginAction";

const SocialLoginButtons = () => (
  <div className="social-buttons">
    <button onClick={() => handleSocialSignIn("google")}>Google</button>
    <button onClick={() => handleSocialSignIn("naver")}>Naver</button>
    <button onClick={() => handleSocialSignIn("kakao")}>Kakao</button>
    <button onClick={() => handleSocialSignIn("instagram")}>Instagram</button>
  </div>
);

export default SocialLoginButtons;

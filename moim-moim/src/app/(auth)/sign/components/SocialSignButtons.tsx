import React from 'react';

interface SocialSignButtonsProps {
  onProviderClick: (provider: string) => void;
}

export function SocialSignButtons({ onProviderClick }: SocialSignButtonsProps) {
  return (
    <div className="social-sign-buttons">
      <button onClick={() => onProviderClick('naver')} className="naver-button">Sign Up with Naver</button>
      <button onClick={() => onProviderClick('kakao')} className="kakao-button">Sign Up with Kakao</button>
      <button onClick={() => onProviderClick('google')} className="google-button">Sign Up with Google</button>
      <button onClick={() => onProviderClick('apple')} className="apple-button">Sign Up with Apple</button>
    </div>
  );
}
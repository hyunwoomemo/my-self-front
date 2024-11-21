import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { accountApi } from "@/app/api";

const EmailStep = ({
  formData,
  setFormData,
  nextStep,
}: {
  formData: { email: string };
  setFormData: any;
  nextStep: () => void;
}) => {
  const [isVerified, setIsVerified] = useState(false); // 인증 요청 상태 관리
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [timer, setTimer] = useState(180); // 타이머 (초 단위)
  const [isTimerActive, setIsTimerActive] = useState(false); // 타이머 활성화 여부

  const [verifyCode, setVerifyCode] = useState(""); // 인증코드 값

  const popularDomains = ["naver.com", "gmail.com", "daum.net", "yahoo.com", "hotmail.com"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("name,value", name, value);
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 인증 요청
  const handleVerifyRequest = async () => {
    if (isValidEmail(formData.email)) {
      try {
        const { data, status } = await accountApi.requestEmail({ email: formData.email });
        if (status === 200) {
          setIsVerified(true); // 인증 상태 업데이트
          setIsTimerActive(true); // 타이머 활성화
          setTimer(180); // 타이머 초기화
          alert("인증 요청이 완료되었습니다.");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      alert("올바른 이메일 형식을 입력해주세요.");
    }
  };

  // 타이머 관리
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearTimeout(countdown);
  }, [isTimerActive, timer]);

  // 남은 시간 포맷 (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  // 인증 확인
  const handleVerifyResponse = async (e) => {
    e.preventDefault();
    if (!(isTimerActive && timer > 0)) {
      alert("인증시간 초과");
    } else {
      try {
				console.log('verifyCode', verifyCode)
        const { data, status } = await accountApi.confirmEmail({ email: formData.email, code: verifyCode.value });
        if (status === 200) {
					alert(data.message);
          nextStep(e); // 다음 단계로 이동
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev: any) => ({
      ...prev,
      email: value,
    }));

    // 실시간 추천 도메인
    if (value.includes("@")) {
      const [local, domainPart] = value.split("@");
      if (domainPart) {
        const filtered = popularDomains
          .filter((domain) => domain.startsWith(domainPart))
          .map((domain) => `${local}@${domain}`);
        setSuggestions(filtered);
      } else {
        setSuggestions(popularDomains.map((domain) => `${local}@${domain}`));
      }
    } else {
      setSuggestions([]);
    }
  };

  // 추천 도메인 클릭 핸들러
  const handleSuggestionClick = (suggestion: string) => {
    setFormData((prev: any) => ({
      ...prev,
      email: suggestion,
    }));
    setSuggestions([]);
  };

  const handleVerifyCodeChange = (e) => {
    const { value } = e.target;
    setVerifyCode((prev: any) => ({
      ...prev,
      value,
    }));
  };

  return (
    <form className="sign-form">
      <h1>
        안전한 모임을 위해
        <br /> 간단한 본인 인증이 필요해요.
      </h1>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Input
            type="email"
            name="email"
            label="이메일 주소"
            placeholder="moimmoim@domain.com"
            value={formData.email}
            onChange={handleEmailChange}
          />
          <Button type="button" title="인증 요청" flex={true} onClick={handleVerifyRequest}></Button>
        </div>
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion, idx) => (
              <li key={idx} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {isVerified && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Input label="인증번호" type="main" placeholder="인증번호 입력" onChange={handleVerifyCodeChange} />
              <div style={{ margin: "10px 0", marginTop: "auto", fontSize: "14px" }}>
                남은 시간: {timer > 0 ? formatTime(timer) : "시간 초과"}
              </div>
            </div>
            <Button type="button" custom="full" title="인증 확인" onClick={handleVerifyResponse}></Button>
          </>
        )}
      </div>
    </form>
  );
};

export default EmailStep;

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
  const [isLoading, setIsLoading] = useState(false);
  const [verifyCode, setVerifyCode] = useState(""); // 인증코드 값

  const popularDomains = ["naver.com", "gmail.com", "daum.net", "yahoo.com", "hotmail.com"];

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 인증 요청
  const handleVerifyRequest = async (e) => {
		e.preventDefault();
    if (isValidEmail(formData.email)) {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
        console.log("verifyCode", verifyCode);
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
    <>
			<img src="/account/line-md_circle.png" />
      <h1 className="text-2xl font-bold mt-2">
        안전한 모임을 위해
        <br />
        간단한 본인 인증이 필요해요.
      </h1>
      <form className="mt-10 flex h-[calc(100vh-24rem)] flex-col gap-5">
        <div>
          <span className="text-lg font-bold">이메일 주소</span>
          <div className="mt-2 flex flex-row items-center gap-2">
            <div className="basis-3/5">
              <Input
                type="email"
                name="email"
                placeholder="moimmoim@domain.com"
                value={formData.email}
                onChange={handleEmailChange}
								disabled={isVerified}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleVerifyRequest(e); // 엔터키 눌렀을 때 기본 동작 방지
									}
								}}
              />
            </div>
            <Button
              type="button"
              className="basis-2/5 bg-indigo-500"
              flex={true}
              onClick={handleVerifyRequest}
              isLoading={isLoading}
            >
              인증 요청
            </Button>
          </div>
          {!isVerified && suggestions.length > 0 && (
            <ul className="absolute z-10 mt-2 w-11/12 rounded-lg bg-white shadow-lg">
              {suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="cursor-pointer px-4 py-2 hover:bg-indigo-100"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {isVerified && (
          <>
            <div className="flex-1 items-end gap-2">
              <Input
                label="인증번호"
                type="main"
                maxLength={6}
                placeholder="인증번호 입력"
                onChange={handleVerifyCodeChange}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleVerifyResponse(e); // 엔터키 눌렀을 때 기본 동작 방지
									}
								}}
              />

              <div className="mb-2 mt-2 text-sm">
                <span className="text-[#d71e1e]">남은 시간: {timer > 0 ? formatTime(timer) : "시간 초과"}</span>
              </div>
            </div>
            <div>
              <Button type="button" custom="full" title="인증 확인" onClick={handleVerifyResponse}></Button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default EmailStep;

"use client"; // 클라이언트 컴포넌트로 설정

import React, { useEffect, useState } from "react";
import EmailStep from "@/components/sign/EmailStep";
import InfoStep from "@/components/sign/InfoStep";
import InterestsStep from "@/components/sign/InterestsStep";
import AddressStep from "@/components/sign/AddressStep";

interface Addresses {
  address: string;
  address_code: string;
}

type FormDataType = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  birthdate: string;
  gender: string;
  provider: string;
  interests: [];
  addresses: Addresses[];
};

export function SignContainer() {
  const [step, setStep] = useState(1);
  const [isSocial, setIsSocial] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = React.useState<FormDataType>({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    birthdate: "",
    gender: "",
    provider: "",
    interests: [],
    addresses: [],
  });
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const json = new URLSearchParams(window.location.search);
        if (json.size > 0) {
          json.forEach((value, key) => {
            setFormData((prev) => ({
              ...prev,
              [key]: value,
            }));
          });
          setStep(2);
          setIsSocial(true);
          setIsLoading(true);
        } else {
          setIsSocial(false);
          setIsLoading(true);
        }
      } catch (err) {
        console.error("로그인 에러:", err);
      }
    };
    fetchUserData();
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EmailStep formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <InfoStep formData={formData} setFormData={setFormData} isSocial={isSocial} nextStep={nextStep} />;
      case 3:
        return <InterestsStep formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 4:
        return <AddressStep formData={formData} setFormData={setFormData} />;
    }
  };

  return <>{isLoading && <div className="px-5 pb-5 pt-20">{renderStep()}</div>}</>;
}

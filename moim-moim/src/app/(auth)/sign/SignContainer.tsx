"use client"; // 클라이언트 컴포넌트로 설정

import React, { useState } from "react";
import "@/app/(auth)/styles/sign.scss";
import EmailStep from "@/components/sign/EmailStep";
import InfoStep from "@/components/sign/InfoStep";
import InterestsStep from "@/components/sign/InterestsStep";
import AddressStep from "@/components/sign/AddressStep";
import { SignForm } from "@/components/sign/SignForm";

type FormDataType = {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
  birthDate: string;
  gender: string;
};

export function SignContainer() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = React.useState<FormDataType>({
    email: "",
    password: "",
    confirmPassword: "",
    nickName: "",
    birthDate: "",
    gender: "",
  });

  const nextStep = (e) => {
    console.log("다음다음");
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EmailStep formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <InfoStep formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 3:
        return <InterestsStep formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 4:
        return <AddressStep formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    }
  };

  return <div className="sign-container">{renderStep()}</div>;
}

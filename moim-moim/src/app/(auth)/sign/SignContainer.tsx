"use client"; // 클라이언트 컴포넌트로 설정

import React, { useEffect, useState } from "react";
import EmailStep from "@/components/sign/EmailStep";
import InfoStep from "@/components/sign/InfoStep";
import InterestsStep from "@/components/sign/InterestsStep";
import AddressStep from "@/components/sign/AddressStep";
import { accountApi } from "@/app/api";

interface Addresses {
  address: string;
  address_code: string;
}

type FormDataType = {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
  birthDate: string;
  gender: string;
  interests: [];
  addresses: Addresses[];
};

export function SignContainer() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = React.useState<FormDataType>({
    email: "ounsy0612@gmail.com",
    password: "",
    confirmPassword: "",
    nickName: "",
    birthDate: "",
    gender: "",
    interests: [],
    addresses: [],
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

  return <div className="px-5 pb-5 pt-20">{renderStep()}</div>;
}

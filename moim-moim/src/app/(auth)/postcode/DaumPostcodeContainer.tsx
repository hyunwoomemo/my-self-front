"use client";
import React, { useState } from "react";
import useDaumPostcodePopup from "@/components/postcode/useDaumPostcodePopup";
import "./daumPostcodeContainer.scss";
import { Address } from "@/components/postcode";

const DaumPostcodeContainer: React.FunctionComponent = () => {
  const [addresses, setAddresses] = useState<{ address: string }[]>(Array(3).fill({ address: "" })); // 3개의 주소를 저장하는 상태
  const openPostcodePopup = useDaumPostcodePopup(); // Daum 우편번호 팝업 열기 훅

  // 주소 선택 시 호출되는 핸들러
  const handleComplete = (address: Address, index: number) => {
    const formattedAddress = formatAddress(address); // 형식화된 주소
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = { address: formattedAddress }; // 선택된 주소를 리스트에 추가
    setAddresses(updatedAddresses); // 상태 업데이트
  };

  const formatAddress = (address: Address) => {
    console.log("address", address);
    const { address: fullAddress } = address;
    const addressParts = fullAddress.split(" "); // 주소를 공백으로 분할

    // 필요한 부분만 추출: "시", "구", "동" 순서로 조합
    const city = addressParts[0]; // 시
    const district = addressParts[1]; // 구
    const neighborhood = addressParts[2] || ""; // 동, 없으면 빈 문자열

    return `${city} ${district} ${neighborhood}`.trim(); // 형식화된 주소 반환
  };

  return (
    <div className="postcode-container">
      <div className="postcode-inputs">
        {addresses.map((item, index) => (
          <div
            key={index}
            className="postcode-input"
            onClick={() => openPostcodePopup({ onComplete: (address) => handleComplete(address, index) })}
          >
            <input type="text" value={item.address} placeholder={`주소 ${index + 1}`} readOnly />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaumPostcodeContainer;

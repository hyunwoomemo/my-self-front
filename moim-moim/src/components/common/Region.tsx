"use client";
import axios from "axios";

import Input from "./Input";
import { useState } from "react";

interface AddressValue {
  address_name: string;
  b_code: string;
  h_code: string;
  main_address_no: string;
  mountain_yn: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_h_name: string;
  region_3depth_name: string;
  sub_address_no: string;
  x: string;
  y: string;
}

export interface Address {
  address: AddressValue;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_h_name: string;
  region_3depth_name: string;
}

interface RegionProps {
  address: Address[];
  setAddress: (addresses: Address[]) => void;
  addressKeyword: string;
  setAddressKeyword: (keyword: string) => void;
  //   selectedArea: string;
  setSelectedArea: (area: string) => void;
}

const Region = ({
  address,
  setAddress,
  addressKeyword,
  setAddressKeyword,
  //   selectedArea,
  setSelectedArea,
}: RegionProps) => {
  const handleChange = async (keyword?: string) => {
    setAddressKeyword(keyword);
    if (!keyword || keyword.length < 2) {
      setAddress([]);
      return;
    }
    try {
      const API_KEY = "3701961545217d122bc39b5367853799";
      const res = await axios.get(`https://dapi.kakao.com/v2/local/search/address?query=${keyword}`, {
        headers: {
          Authorization: `KakaoAK ${API_KEY}`,
        },
      });
      // res => setAdress

      const result = res.data.documents;

      setAddress(result || []);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="relative">
      <Input
        label="지역"
        placeholder="동/읍/면으로 찾기"
        type="main"
        value={addressKeyword}
        onChange={(v) => {
          handleChange(v.target.value);
        }}
      />
      {address.length > 0 && (
        <div className="absolute flex w-full flex-col gap-2 rounded-lg bg-white p-5 shadow-md">
          {address.map((v) => {
            const { region_1depth_name, region_2depth_name, region_3depth_h_name, region_3depth_name } = v.address;
            console.log("vvv", v);
            return (
              <div
                className="cursor-pointer hover:text-primary"
                key={v.address_name}
                onClick={() => {
                  setSelectedArea(v.address_name);
                  setAddressKeyword(
                    `${region_1depth_name} ${region_2depth_name} ${region_3depth_h_name || region_3depth_name}`,
                  );
                  setAddress([]);
                }}
              >
                {region_1depth_name} {region_2depth_name} {region_3depth_h_name || region_3depth_name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Region;

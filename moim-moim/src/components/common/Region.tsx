"use client";
import axios from "axios";
import Input from "./Input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  setAddress: Dispatch<SetStateAction<Address[]>>;
  addressKeyword: string;
  setAddressKeyword: (keyword: string) => void;
  //   selectedArea: string;
  setSelectedArea: (area: string) => void;
  label?: string;
}

const Region = ({
  address,
  setAddress,
  addressKeyword,
  setAddressKeyword,
  //   selectedArea,
  setSelectedArea,
  label,
}: RegionProps) => {
  const [isAutoSearch, setIsAutoSearch] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [autoSearchKeyword, setAutoSearchKeyword] = useState("");

  useEffect(() => {
    setAutoSearchKeyword(
      `${address[focusIndex]?.address.region_1depth_name} ${address[focusIndex]?.address.region_2depth_name} ${address[focusIndex]?.address.region_3depth_h_name || address[focusIndex]?.address.region_3depth_name}`,
    );
  }, [focusIndex]);

  useEffect(() => {
    if (address.length === focusIndex) {
      //마지막에 도달하면 처음으로
      setFocusIndex(0);
    }
    if (address.length > 0 && focusIndex > -1) {
      setIsAutoSearch(true);
    } else {
      setIsAutoSearch(false);
    }
  }, [address, focusIndex]);

  const handleChange = async (e) => {
    const keyword = e.target.value;
    setAddressKeyword(keyword);

    if (!keyword || keyword.length < 2) {
      setAddress([]);
      return;
    }
    if (isAutoSearch) {
      //자동완성 켜졌을 때
      const enteredValue = e.nativeEvent.inputType === "deleteContentBackward" ? "" : e.nativeEvent.data;
      if (e.nativeEvent.inputType === "deleteContentBackward") {
        //backspace시
        setAutoSearchKeyword(keyword);
      } else {
        setAutoSearchKeyword(autoSearchKeyword + enteredValue);
      }
      setFocusIndex(-1);
      setIsAutoSearch(false);
    }
    try {
      const API_KEY = "3701961545217d122bc39b5367853799";
      const res = await axios.get(`https://dapi.kakao.com/v2/local/search/address?query=${keyword}`, {
        headers: {
          Authorization: `KakaoAK ${API_KEY}`,
        },
      });
      // res => setAdress
      console.log("res", res);
      const result = res.data.documents;

      setAddress(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleKeyDown = (e) => {
    if (keyEvent[e.key]) keyEvent[e.key]();
  };

  const keyEvent = {
    ArrowDown: () => {
      setFocusIndex((prev) => {
        console.log("prev", prev);
        const newIndex = prev + 1;
        return newIndex;
      });
    },
    ArrowUp: () => {
      console.log("FocusIndex", focusIndex);

      if (address.length === 0) return;
      console.log("aa", address.length, focusIndex);
      if (focusIndex === 0) {
        setFocusIndex(address.length);
      }
      setFocusIndex((prev) => {
        console.log("prev", prev);
        const newIndex = prev - 1;
        return newIndex;
      });
      setAutoSearchKeyword(
        `${address[focusIndex]?.address.region_1depth_name} ${address[focusIndex]?.address.region_2depth_name} ${address[focusIndex]?.address.region_3depth_h_name || address[focusIndex]?.address.region_3depth_name}`,
      );
    },
    Enter: () => {
      if (!isAutoSearch || focusIndex === -1) return;
      setAddressKeyword(
        `${address[focusIndex]?.address.region_1depth_name} ${address[focusIndex]?.address.region_2depth_name} ${address[focusIndex]?.address.region_3depth_h_name || address[focusIndex]?.address.region_3depth_name}`,
      );
      setSelectedArea(
        `${address[focusIndex]?.address.region_1depth_name} ${address[focusIndex]?.address.region_2depth_name} ${address[focusIndex]?.address.region_3depth_h_name || address[focusIndex]?.address.region_3depth_name}`,
      );
      setAddress([]);
    },
  };

  const parseAddress = address.filter((v) => (v.address.region_3depth_h_name || v.address.region_3depth_name) !== "");

  return (
    <div className="relative">
      <Input
        label={label ? label : "지역"}
        placeholder="동/읍/면으로 찾기"
        type="main"
        value={isAutoSearch ? autoSearchKeyword : addressKeyword}
        onChange={(e) => {
          handleChange(e);
        }}
        onKeyDown={handleKeyDown}
      />
      {parseAddress.length > 0 && (
        <div className="absolute z-10 flex w-full flex-col gap-2 rounded-lg bg-white p-5 shadow-md">
          {parseAddress.map((v, i) => {
            const { region_1depth_name, region_2depth_name, region_3depth_h_name, region_3depth_name } = v.address;
            const parseRegionName = `${region_1depth_name} ${region_2depth_name} ${region_3depth_h_name || region_3depth_name}`;
            return (
              <div
                className={`cursor-pointer hover:text-primary ${focusIndex === i ? "bg-red" : undefined}`}
                key={v.address_name}
                onClick={() => {
                  setSelectedArea(v.address_name);
                  setAddressKeyword(parseRegionName);
                  setAddress([v]);
                }}
              >
                {parseRegionName}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Region;

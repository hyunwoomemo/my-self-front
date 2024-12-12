"use client";

import Button from "@/components/common/Button";
import PageHeader from "@/components/common/PageHeader";
import Region, { Address } from "@/components/common/Region";
import { useSocket } from "@/hooks/useSocket";
import { currentAreaAtom } from "@/store/area/atom";
import { useSetAtom } from "jotai";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const [address, setAddress] = useState([]);
  const [addressKeyword, setAddressKeyword] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState("");
  const { joinArea } = useSocket();
  const setCurrentArea = useSetAtom(currentAreaAtom);
  const [address1, setAddress1] = useState<Address[]>([]);
  const [address2, setAddress2] = useState<Address[]>([]);
  const [address3, setAddress3] = useState<Address[]>([]);
  const [addressKeyword1, setAddressKeyword1] = useState<string>("");
  const [addressKeyword2, setAddressKeyword2] = useState<string>("");
  const [addressKeyword3, setAddressKeyword3] = useState<string>("");
  const [selectedArea1, setSelectedArea1] = useState<string>("");
  const [selectedArea2, setSelectedArea2] = useState<string>("");
  const [selectedArea3, setSelectedArea3] = useState<string>("");

  const handleClick = () => {
    joinArea(selectedArea);
    setCurrentArea(selectedArea);
  };

  console.log("selectedArea", selectedArea1);
  return (
    <>
      <PageHeader title="관심 지역" />
      <div className="flex h-[calc(100vh-12rem)] flex-col justify-between p-5 pt-0">
        <div className="h-full flex-1">
          <div className="flex flex-col gap-2">
            <Image src="/account/mingcute_location-line.png" alt="location img" width={60} height={60} />

            <h1 className="text-2xl font-bold">
              관심있는 지역을
              <br />
              3개까지 저장할 수 있어요.
            </h1>
          </div>
          <div className="mt-10 flex flex-col gap-4">
            <div>
              <Region
                address={address1}
                addressKeyword={addressKeyword1}
                setAddress={setAddress1}
                setAddressKeyword={setAddressKeyword1}
                setSelectedArea={setSelectedArea1}
                label="지역 1"
              />
            </div>
            <div>
              <Region
                address={address2}
                addressKeyword={addressKeyword2}
                setAddress={setAddress2}
                setAddressKeyword={setAddressKeyword2}
                setSelectedArea={setSelectedArea2}
                label="지역 2"
              />
            </div>
            <div>
              <Region
                address={address3}
                addressKeyword={addressKeyword3}
                setAddress={setAddress3}
                setAddressKeyword={setAddressKeyword3}
                setSelectedArea={setSelectedArea3}
                label="지역 3"
              />
            </div>
          </div>
        </div>
        <Button title="저장" disabled={!selectedArea} onClick={handleClick} />
      </div>
    </>
  );
}

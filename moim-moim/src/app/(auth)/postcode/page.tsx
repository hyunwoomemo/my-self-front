"use client";

import { getUserInfo } from "@/actions/user/getUserInfo";
import Button from "@/components/common/Button";
import Region from "@/components/common/Region";
import { Address } from "@/components/postcode";
import { useSocket } from "@/hooks/useSocket";
import { currentAreaAtom } from "@/store/area/atom";
import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [address, setAddress] = useState<Address[]>([]);
  const [addressKeyword, setAddressKeyword] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState("");
  const { joinArea } = useSocket();
  const setCurrentArea = useSetAtom(currentAreaAtom);

  const handleClick = () => {
    joinArea(selectedArea);
    setCurrentArea(selectedArea);
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col justify-between p-5">
      <Region
        address={address}
        addressKeyword={addressKeyword}
        setAddress={setAddress}
        setAddressKeyword={setAddressKeyword}
        setSelectedArea={setSelectedArea}
      />
      <Button title="저장" disabled={!selectedArea} onClick={handleClick} />
    </div>
  );
}

"use client";

import { addressApi } from "@/app/api";
import PageHeader from "@/components/common/PageHeader";
import Region, { selectedAreaValue } from "@/components/common/Region";
import { Address } from "cluster";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SelectRegion = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [selectedArea, setSelectedArea] = useState<selectedAreaValue>();
  const [addressKeyword, setAddressKeyword] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const area_id = searchParams?.get("id");

  useEffect(() => {
    if (selectedArea) {
      addressApi.createAddress({
        address_name: selectedArea.address.address_name,
        region_1depth_name: selectedArea.address.region_1depth_name,
        region_2depth_name: selectedArea.address.region_2depth_name,
        region_3depth_name: selectedArea.address.region_3depth_h_name || selectedArea.address.region_3depth_name,
        prev_address_id: area_id,
      });
      router.push("/area");

      console.log("selectedArea", selectedArea.address);
    }
  }, [selectedArea]);

  return (
    <div>
      <PageHeader title="지역 선택" />
      <div className="p-4 pt-0">
        <Region
          address={address}
          addressKeyword={addressKeyword}
          setAddress={setAddress}
          setAddressKeyword={setAddressKeyword}
          setSelectedArea={setSelectedArea}
        />
      </div>
    </div>
  );
};

export default SelectRegion;

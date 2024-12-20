"use client";

import { addressApi } from "@/app/api";
import PageHeader from "@/components/common/PageHeader";
import Region, { selectedAreaValue } from "@/components/common/Region";
import { loadingAtom } from "@/store/common/atom";
import { revalidateContents } from "@/utils/revalidateTag";
import { Address } from "cluster";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";

const SelectRegion = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [selectedArea, setSelectedArea] = useState<selectedAreaValue>();
  const [addressKeyword, setAddressKeyword] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const area_id = searchParams?.get("id");
  const [loading, setLoading] = useAtom(loadingAtom);

  useEffect(() => {
    if (selectedArea) {
      try {
        // Address 생성 API 호출
        addressApi
          .createAddress({
            address_name: selectedArea.address.address_name,
            region_1depth_name: selectedArea.address.region_1depth_name,
            region_2depth_name: selectedArea.address.region_2depth_name,
            region_3depth_name: selectedArea.address.region_3depth_h_name || selectedArea.address.region_3depth_name,
            prev_address_id: area_id,
          })
          .then((res) => {
            if (!res) return;

            setLoading(true);
            revalidateContents("myInfo");
            setLoading(false);
          })
          .then(() => {
            setLoading(true);
            router.push("/area");
            setLoading(false);
          });
      } catch (err) {
        console.error("Error during revalidation:", err);
      }
    }
  }, [selectedArea]);

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="지역 선택" />
      <div className="h-[calc(100vh-11rem)] p-4 pt-0">
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

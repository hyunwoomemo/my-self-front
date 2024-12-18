import { useState } from "react";
import Button from "../common/Button";
import Region, { Address, selectedAreaValue } from "../common/Region";
import { accountApi } from "@/app/api";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { currentAreaAtom } from "@/store/area/atom";

const AddressStep = ({ formData, setFormData }: { formData: any; setFormData: any }) => {
  const router = useRouter();

  const [address, setAddress] = useState<Address[]>([]); // 검색한 지역 목록들
  const [selectedArea, setSelectedArea] = useState<selectedAreaValue>(); // 선택한 지역
  const [addressKeyword, setAddressKeyword] = useState<string>(""); // 입력한 키워드

  const handleNextStep = (e) => {
    e.preventDefault();
    const { address: searchAddress } = selectedArea;
    const { region_1depth_name, region_2depth_name, region_3depth_h_name, region_3depth_name } = searchAddress;

    const addresses = [
      {
        address: selectedArea?.address_name,
        address_code: "test",
        region_1depth_name,
        region_2depth_name,
        region_3depth_name: region_3depth_h_name || region_3depth_name,
      },
    ];
    const birthdate = formData.birthdate + formData.gender;
    const updatedFormData = { ...formData, addresses, birthdate };
    // API 호출
    accountApi
      .register(updatedFormData)
      .then(({ message }) => {
        alert(message);
        router.push("/login");
      })
      .catch((error) => {
        alert(error.message);
      });

    //값은 바껴있어야할것같아서..?
    setFormData((prev) => {
      return { ...prev, addresses };
    });
  };

  return (
    <>
      <img src="/account/mingcute_location-line.png" />
      <h1 className="text-2xl font-bold">
        자주 방문하는 지역을 선택하면
        <br />
        가까운 사람들과 연결돼요.
      </h1>
      <form className="mt-10 flex h-[calc(100vh-24rem)] flex-col gap-5">
        <div className="flex-1">
          <Region
            address={address}
            setAddress={setAddress}
            addressKeyword={addressKeyword}
            setAddressKeyword={setAddressKeyword}
            setSelectedArea={setSelectedArea}
          />
        </div>
        <Button custom="full" title="완료" disabled={!selectedArea} onClick={handleNextStep}></Button>
      </form>
    </>
  );
};

export default AddressStep;

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Loader } from "@/components/common/Loader";
import { useAtom, useAtomValue } from "jotai";
import { loadingAtom } from "@/store/common/atom";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { getMeetingData } from "@/hooks/useSocket";
import Empty from "@/components/common/Empty";
import IntroData from "./IntroData";
import { myLikeMoimAtom } from "@/store/meeting/list/atom";
import { moimApi } from "@/app/nextApi";
import { myInfoAtom } from "@/store/account/myInfo/atom";

const IntroContainer = () => {
  const [imgNum, setImgNum] = useState<string | null>(null);
  const loading = useAtomValue(loadingAtom);
  const data = useAtomValue(meetingDataAtom) as getMeetingData;
  const router = useRouter();

  // console.log("ss", socket?.connected);
  console.log("meetingData", data);

  useEffect(() => {
    const num = Math.floor(Math.random() * 10 + 1);
    const formattedNum = num.toString().padStart(2, "0");
    console.log(formattedNum);
    setImgNum(formattedNum);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {data ? (
        // <div className="relative" style={{ height: "calc(100vh - (21px + 4.625rem))" }}>
        <div className="relative h-screen">
          <div className="absolute left-0 right-0 top-0 z-20 flex w-full items-center justify-end p-5">
            <button className="text-4xl text-white" onClick={() => router.push("/")}>
              <IoCloseOutline />
            </button>
          </div>
          <IntroData enterIntro data={data} />

          {/* (dev) 임시로 랜덤 배경 처리 */}
          {imgNum && (
            <Image src={`/moim_bg_default/moim_bg_default${imgNum}.jpg`} alt="background_default_image" fill priority />
          )}
        </div>
      ) : (
        <Empty text="정보를 불러올 수 없습니다." />
      )}
    </>
  );
};

export default IntroContainer;

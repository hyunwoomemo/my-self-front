"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbCrown } from "react-icons/tb";
import { GoHeartFill } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";
import { useEffect, useState } from "react";

const IntroContainer = ({ data }) => {
  const [imgNum, setImgNum] = useState<string | null>(null);

  useEffect(() => {
    const num = Math.floor(Math.random() * 10 + 1);
    const formattedNum = num.toString().padStart(2, "0");
    console.log(formattedNum);
    setImgNum(formattedNum);
  }, []);

  const router = useRouter();

  return (
    <>
      <div className="absolute left-0 right-0 top-0 z-20 flex w-full items-center justify-between p-5">
        <button className="text-2xl text-white">
          <SlSettings />
        </button>
        <button className="text-4xl text-white">
          <IoCloseOutline />
        </button>
      </div>

      <div className="absolute z-10 flex h-full w-full flex-col gap-5 bg-black bg-opacity-60 px-5 py-5">
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col items-center gap-6 pt-20">
            <div className="flex flex-col items-center gap-2">
              <span className="w-fit rounded-full bg-semiPrimary px-4 py-2 text-xs font-bold">
                {data.category1} / {data.category2}
              </span>
              <h1 className="text-3xl font-bold text-bg">{data.title}</h1>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-point text-center text-3xl text-white shadow-lg">
                  <TbCrown />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white">{data.host_nick}</span>
                  <span className="text-xs text-white">{data.host_level}</span>
                </div>

                <span className="text-sm font-bold text-semiPrimary">
                  {data.location} · {data.date} · {data.time}
                </span>
              </div>
            </div>
          </div>
          {/* 추후에 미디어쿼리 적용 */}
          <div className="scrollbar max-h-28 w-full overflow-y-auto rounded-xl bg-black bg-opacity-80 p-4">
            {data.desc}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="rounded-lg bg-white p-5 text-3xl text-textGray">
            <GoHeartFill />
          </div>
          <Button title="입장하기" type="flex" onClick={() => router.push("/")} />
        </div>
      </div>
      {imgNum && (
        <Image src={`/moim_bg_default/moim_bg_default${imgNum}.jpg`} alt="background_default_image" fill priority />
      )}
    </>
  );
};

export default IntroContainer;

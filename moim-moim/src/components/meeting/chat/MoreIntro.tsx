"use client";

import { useAtomValue } from "jotai";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { getMeetingData } from "@/hooks/useSocket";
import IntroData from "../intro/IntroData";
import Image from "next/image";
import { useEffect, useState } from "react";
import SlideBar from "./SlideBar";

const MoreIntro = () => {
  const data = useAtomValue(meetingDataAtom) as getMeetingData;
  const [imgNum, setImgNum] = useState<string | null>(null);

  useEffect(() => {
    const num = Math.floor(Math.random() * 10 + 1);
    const formattedNum = num.toString().padStart(2, "0");
    console.log(formattedNum);
    setImgNum(formattedNum);
  }, []);
  return (
    <SlideBar>
      123123213
      <div className="relative h-[calc(100%-6.8rem)]">
        <IntroData data={data} />
        {imgNum && (
          <Image src={`/moim_bg_default/moim_bg_default${imgNum}.jpg`} alt="background_default_image" fill priority />
        )}
      </div>
      123
    </SlideBar>
  );
};

export default MoreIntro;

"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbCrown } from "react-icons/tb";
import { GoHeartFill } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { PiUsersLight } from "react-icons/pi";
import Loader from "@/components/common/Loader";
import { useAtomValue } from "jotai";
import { loadingAtom } from "@/store/common/atom";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { getMeetingData, useSocket } from "@/hooks/useSocket";
import moment from "moment";
import Empty from "@/components/common/Empty";

const IntroContainer = () => {
  const [imgNum, setImgNum] = useState<string | null>(null);
  const loading = useAtomValue(loadingAtom);
  const data = useAtomValue(meetingDataAtom) as getMeetingData;
  const router = useRouter();
  const { joinMeeting, socket } = useSocket();

  // console.log("ss", socket?.connected);
  console.log("meetingData", data);

  useEffect(() => {
    const num = Math.floor(Math.random() * 10 + 1);
    const formattedNum = num.toString().padStart(2, "0");
    console.log(formattedNum);
    setImgNum(formattedNum);
  }, []);

  const handleClick = () => {
    joinMeeting({
      meetings_id: data.id,
      region_code: "A02",
      users_id: 125,
      type: data.type,
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {data ? (
        // <div className="relative" style={{ height: "calc(100vh - (21px + 4.625rem))" }}>
        <div className="relative h-screen">
          <div className="absolute left-0 right-0 top-0 z-20 flex w-full items-center justify-between p-5">
            <button className="text-2xl text-white">
              <SlSettings />
            </button>
            <button className="text-4xl text-white" onClick={() => router.back()}>
              <IoCloseOutline />
            </button>
          </div>

          <div className="absolute z-10 flex h-full w-full flex-col gap-5 bg-black bg-opacity-60 px-5 py-5">
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex flex-col items-center gap-6 pt-20">
                <div className="flex flex-col items-center gap-2">
                  <span className="w-fit rounded-full bg-semiPrimary px-4 py-2 text-xs font-bold">
                    {data.category1_name}/{data.category2_name}
                  </span>
                  <h1 className="text-center text-3xl font-bold text-bg">{data.name}</h1>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-point text-center text-3xl text-white shadow-lg">
                      <TbCrown />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-white">{data.creator_name}</span>
                      <span className="text-xs text-white">레벨</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="flex items-center">
                        <CiHeart className="text-2xl text-white" />
                        <span className="text-white">7</span>
                      </div>
                      <div className="font-thin text-white">·</div>
                      <div className="flex items-center gap-1">
                        <PiUsersLight className="text-2xl text-white" />
                        <span className="text-white">
                          {data.userCount}/{data.max_members}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-semiPrimary">
                      {data.region_code} · {moment(data.event_date).format("LL")} ·{" "}
                      {moment(data.event_date).format("LT")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="scrollbar w-full overflow-y-auto whitespace-pre-wrap break-all rounded-xl bg-black bg-opacity-80 p-4 text-white h_sm:max-h-44 h_lg:max-h-64 h_xl:max-h-96">
                {data.description}
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="flex gap-2">
              <div className="rounded-lg bg-white p-5 text-3xl text-textGray">
                <GoHeartFill />
              </div>
              <Button title={data.type === 3 ? "입장하기" : "입장 신청하기"} flex textSize="lg" onClick={handleClick} />
            </div>
          </div>

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

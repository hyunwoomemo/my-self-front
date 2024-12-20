"use client";

import PageHeader from "@/components/common/PageHeader";
import { GoHeartFill, GoShareAndroid } from "react-icons/go";
import Tabs from "@/components/common/Tabs";
import { useState } from "react";
import MoreIntro from "./MoreIntro";
import Members from "./Members";
import { getMeetingData, useSocket } from "@/hooks/useSocket";
import { useAtom, useAtomValue } from "jotai";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { myInfoProps } from "@/app/client-layout";
import { moimApi } from "@/app/nextApi";
import { myLikeMoimAtom } from "@/store/meeting/list/atom";

const tabData = [
  {
    label: "소개",
    value: "MoreIntro",
  },
  {
    label: "모임 멤버",
    value: "Members",
  },
];
const SlideBar = ({ show, setShow }) => {
  const [tabValue, setTabValue] = useState(tabData[0]);
  const { likeMoim } = useSocket();
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const [myLikeMoim, setMyLikeMoim] = useAtom(myLikeMoimAtom);
  const meetingData = useAtomValue(meetingDataAtom) as getMeetingData;
  const isLike = myLikeMoim.some((v) => v.receiver_id === meetingData.id);
  const currentRegion = JSON.parse(localStorage.getItem("address")).address_code;

  const handleClick = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  const handleClickHeart = async () => {
    likeMoim({ users_id: myInfo.user_id, meetings_id: meetingData.id, region_code: currentRegion });
  };

  return (
    <>
      <div className="absolute left-1/2 top-0 z-20 h-screen w-screen max-w-[600px] -translate-x-1/2 animate-showSlideBar bg-white">
        <div className="flex items-center justify-between">
          <PageHeader title="모아보기" onPrevClick={handleClick} style={{ flex: 1 }} />
          <div className="flex h-[calc(100%-8rem)] cursor-pointer gap-4 p-3">
            <GoHeartFill color={`${isLike ? "#ff0000" : "#ebebeb"}`} size={24} onClick={handleClickHeart} />
            <GoShareAndroid size={24} />
          </div>
        </div>
        <Tabs data={tabData} setTabValue={setTabValue} tabValue={tabValue} type="default" />
        {tabValue.value === "MoreIntro" && <MoreIntro />}
        {tabValue.value === "Members" && <Members meetingData={meetingData} />}
      </div>
    </>
  );
};

export default SlideBar;

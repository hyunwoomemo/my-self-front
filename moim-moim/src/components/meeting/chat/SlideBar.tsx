"use client";

import PageHeader from "@/components/common/PageHeader";
import { GoHeartFill, GoShareAndroid } from "react-icons/go";
import Tabs from "@/components/common/Tabs";
import { useState } from "react";
import MoreIntro from "./MoreIntro";
import Members from "./Members";

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

  const handleClick = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-screen bg-white">
        <div className="flex items-center justify-between">
          <PageHeader title="모아보기" onPrevClick={handleClick} style={{ flex: 1 }} />
          <div className="flex gap-4 p-3">
            <GoHeartFill color="#ebebeb" size={24} />
            <GoShareAndroid size={24} />
          </div>
        </div>
        <Tabs data={tabData} setTabValue={setTabValue} tabValue={tabValue} type="default" />
        {tabValue.value === "MoreIntro" && <MoreIntro />}
        {tabValue.value === "Members" && <Members />}
      </div>
    </>
  );
};

export default SlideBar;

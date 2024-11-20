"use client";

import { useState } from "react";
import MeetingList from "../meeting/list/MeetingList";
import Tabs from "../common/Tabs";
import MainFilter from "./MainFilter";
import { useRouter } from "next/navigation";
import CreateButton from "./AddButton";
import Header from "./Header";
import Hr from "../common/Hr";

const tabList = [
  {
    label: "#전체",
    value: "all",
  },
  {
    label: "친목",
    value: "friendship",
  },
  {
    label: "취미",
    value: "interest",
  },
  {
    label: "직업",
    value: "job",
  },
];

const MeetingListContainer = () => {
  const [value, setValue] = useState(tabList[0]);
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col">
        <Header />
        <Hr />
        <div className="sticky left-0 right-0 top-0">
          <Tabs data={tabList} type="default" tabValue={value} setTabValue={setValue} />
          <MainFilter />
        </div>
        <div id="meetingList" className="flex flex-1 flex-col gap-5 p-5">
          <MeetingList />
        </div>
      </div>
      <div className="fixed bottom-32 w_sm:right-4 w_lg:right-56" onClick={() => router.push("/create")}>
        <CreateButton />
      </div>
    </>
  );
};

export default MeetingListContainer;

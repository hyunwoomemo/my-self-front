"use client";

import { useEffect, useState } from "react";
import MeetingList from "../meeting/list/MettingList";
import Tabs from "./Tabs";
import MainFilter from "./MainFilter";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";
import CreateButton from "./AddButton";

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

const MeetingListData = [
  {
    id: 1234,
    title: "영동시장 맛집가실 분",
    desc: "논현역 근처 직장인분들 모이세요!!",
    category1: "친목",
    category2: "맛집",
    state: "30분 전",
    like: 1,
    members: 3,
    state: "30분 전",
  },
  {
    id: 2434,
    title: "영동시장 맛집가실 분",
    desc: "논현역 근처 직장인분들 모이세요!!",
    category1: "친목",
    category2: "맛집",
    like: 1,
    members: 3,
    state: "30분 전",
  },
];
const MeetingListContainer = () => {
  const [value, setValue] = useState(tabList[0]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="sticky left-0 right-0 top-0">
        <Tabs data={tabList} type="default" tabValue={value} setTabValue={setValue} />
        <MainFilter />
      </div>
      <div id="meetingList" className="flex flex-1 flex-col gap-5 p-5">
        <MeetingList data={MeetingListData} />
      </div>
      <div className="fixed bottom-32 right-28" onClick={() => router.push("/create")}>
        <CreateButton />
      </div>
    </>
  );
};

export default MeetingListContainer;

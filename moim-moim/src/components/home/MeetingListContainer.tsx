"use client";

import { useEffect, useState } from "react";
import MeetingList from "../meeting/MettingList";
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
    title: "영동시장 맛집가실 분",
    desc: "논현역 근처 직장인분들 모이세요!!",
    category: "맛집",
    state: "30분 전",
    like: 1,
    members: 3,
  },
  {
    title: "영동시장 맛집가실 분",
    desc: "논현역 근처 직장인분들 모이세요!!",
    category: "맛집",
    state: "30분 전",
    like: 1,
    members: 3,
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
      <Tabs data={tabList} type="default" tabValue={value} setTabValue={setValue} />
      {/* <Hr /> */}
      <MainFilter />
      <div id="meetingList" className="flex flex-1 flex-col gap-5 p-5">
        {MeetingListData.map((v, i) => (
          <MeetingList key={i} />
        ))}
      </div>
      <div className="absolute bottom-6 right-6" onClick={() => router.push("/create")}>
        <CreateButton />
      </div>
    </>
  );
};

export default MeetingListContainer;

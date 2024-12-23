"use client";

import { useEffect, useState } from "react";
import Tabs from "../common/Tabs";
import MainFilter from "./MainFilter";
import { useRouter } from "next/navigation";
import CreateButton from "./AddButton";
import Header from "./Header";
import Hr from "../common/Hr";
import MeetingList from "../meeting/list/MeetingList";
import { useAtomValue, useSetAtom } from "jotai";
import { loadingAtom } from "@/store/common/atom";
import { myListAtom } from "@/store/meeting/list/atom";
import { moimApi } from "@/app/nextApi";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { myInfoProps } from "@/app/client-layout";

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
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const setLoading = useSetAtom(loadingAtom);
  const setMyList = useSetAtom(myListAtom);

  useEffect(() => {
    const myList = async () => {
      try {
        setLoading(true);
        const res = await moimApi.myMoim(myInfo?.user_id);
        console.log("resresresrsesrses", res);
        setMyList(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    myList();
  }, [myInfo?.user_id]);

  return (
    <>
      <div className="flex flex-col">
        <Header />
        <Hr />
        <div className="sticky left-0 right-0 top-0">
          <Tabs data={tabList} type="default" tabValue={value} setTabValue={setValue} />
          <MainFilter />
        </div>
        <div id="meetingList" className="flex flex-1 flex-col gap-5 p-5 pt-4">
          <MeetingList />
        </div>
      </div>
      <div
        className="fixed bottom-32 right-[calc(50%-300px)] -translate-x-1/2 w_sm:right-[calc(50%-50vw)]"
        onClick={() => router.push("/create")}
      >
        <CreateButton />
      </div>
    </>
  );
};

export default MeetingListContainer;

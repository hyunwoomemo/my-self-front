"use client";

import Empty from "@/components/common/Empty";
import Loader from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import { getMeetingData } from "@/hooks/useSocket";
import { loadingAtom } from "@/store/common/atom";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { useAtomValue } from "jotai";
import moment from "moment";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import SlideBar from "./SlideBar";

const MeetingHeader = () => {
  const data = useAtomValue(meetingDataAtom) as getMeetingData;
  const loading = useAtomValue(loadingAtom);
  const [show, setShow] = useState<boolean>(false);

  const handleClickSideBar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(!show);
  };

  if (loading) {
    return <Loader />;
  }

  if (!data) return <Empty text="데이터가 없습니다." />;

  return (
    <>
      <div className="sticky top-0 w-full border-b border-solid border-border bg-[rgba(255,255,255,0.5)] backdrop-blur-[2px]">
        <PageHeader title={data.name} icon={<FaBars size={22} color="#333" />} onIconClick={handleClickSideBar} />
        <div className="flex justify-between bg-opacity-80 pb-5 pl-10 pr-5 w_sm:pb-3">
          <div className="flex flex-col">
            <h3 className="font-tantan text-3xl">{moment(data.event_date).format("YYYY.MM.DD")}</h3>
            <h5 className="text-sm text-textGray">
              {moment(data.event_date).format("dddd")}, {moment(data.event_date).format("LT")}
            </h5>
          </div>
        </div>
      </div>
      {show && <SlideBar show={show} setShow={setShow} />}
    </>
  );
};

export default MeetingHeader;

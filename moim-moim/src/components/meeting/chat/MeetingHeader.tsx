"use client";

import Empty from "@/components/common/Empty";
import Loader from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import { getMeetingData } from "@/hooks/useSocket";
import { loadingAtom } from "@/store/common/atom";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { useAtomValue } from "jotai";
import { BiHomeSmile } from "react-icons/bi";
import localFont from "next/font/local";
import moment from "moment";

const MeetingHeader = () => {
  const data = useAtomValue(meetingDataAtom) as getMeetingData;
  const loading = useAtomValue(loadingAtom);

  // console.log("data", data);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {data ? (
        <>
          <div className="sticky top-0 w-full border-b border-solid border-border bg-[rgba(255,255,255,0.5)] backdrop-blur-[2px]">
            <PageHeader
              title={data.name}
              icon={<BiHomeSmile size={28} color="#33 3" />}
              link={`/moim/${data.id}/intro`}
            />
            <div className="flex justify-between bg-opacity-80 pb-5 pl-10 pr-5 w_sm:pb-3">
              <div className="flex flex-col">
                <h3 className="font-tantan text-3xl">{moment(data.event_date).format("YYYY.MM.DD")}</h3>
                <h5 className="text-sm text-textGray">
                  {moment(data.event_date).format("dddd")}, {moment(data.event_date).format("LT")}
                </h5>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Empty text="데이터가 없습니다." />
      )}
    </>
  );
};

export default MeetingHeader;

"use client";

import { moimApi } from "@/app/nextApi";
import { myInfoProps } from "@/app/client-layout";
import { Loader } from "@/components/common/Loader";
import CreateButton from "@/components/home/AddButton";
import Header from "@/components/home/Header";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { loadingAtom } from "@/store/common/atom";
import { myListAtom, myListValue } from "@/store/meeting/list/atom";
import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import "moment/locale/ko";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PiUsersThree } from "react-icons/pi";
import Hr from "@/components/common/Hr";

const MyList = () => {
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const [loading, setLoading] = useAtom(loadingAtom);
  const [myList, setMyList] = useAtom(myListAtom);
  const router = useRouter();

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

  const sortList = myList.sort((a, b) => {
    return moment(b?.last_active_time).valueOf() - moment(a?.last_active_time).valueOf();
  });

  if (loading) return <Loader />;
  return (
    <>
      <Header />
      <Hr />
      <div className="p-4 pt-0">
        {sortList.map((v) => {
          return (
            <div
              key={v.id}
              className="flex cursor-pointer items-center gap-4 border-b border-solid border-surface py-5"
              onClick={() => {
                router.push(`/moim/${v.id}/chat`);
              }}
            >
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--point)] text-7xl text-white w_sm:h-20 w_sm:w-20 w_sm:text-6xl">
                <PiUsersThree />
              </div>
              <div className="flex flex-1 justify-between">
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="flex flex-col">
                    <h3 className="text-[1.1rem] font-bold">{v.name}</h3>
                    <span className="text-sm">
                      {v.address} · 멤버 {v.max_members}명
                    </span>
                  </div>
                  <span className="text-sm text-point">
                    {moment(v.event_date).format("YYYY년 MM월 DD일 dddd HH:mm")}
                  </span>
                </div>
                <span className="text-sm text-textGray">{moment(v.last_active_time).format("LT")}</span>
              </div>
            </div>
          );
        })}
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

export default MyList;

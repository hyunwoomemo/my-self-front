"use client";

import { moimApi } from "@/app/nextApi";
import { myInfoProps } from "@/app/client-layout";
import { Loader } from "@/components/common/Loader";
import CreateButton from "@/components/home/AddButton";
import Header from "@/components/home/Header";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { loadingAtom } from "@/store/common/atom";
import { listAtom, myLikeMoimAtom, myLikeMoimValue, myListAtom } from "@/store/meeting/list/atom";
import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import "moment/locale/ko";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiUsersThree } from "react-icons/pi";
import Hr from "@/components/common/Hr";
import Tabs from "@/components/common/Tabs";
import Dot from "@/components/common/Dot";
import { GoHeartFill } from "react-icons/go";
import { ListValue, useSocket } from "@/hooks/useSocket";

const tabList = [
  {
    label: "참여중인 모임",
    value: "current",
  },
  {
    label: "내가 찜한 모임",
    value: "like",
  },
  {
    label: "최근에 본 모임",
    value: "latest",
  },
];

const MyList = () => {
  const router = useRouter();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [myList, setMyList] = useAtom(myListAtom);
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const [tabValue, setTabValue] = useState(tabList[0]);
  const myLikeMoim = useAtomValue(myLikeMoimAtom);
  const list = useAtomValue(listAtom) as ListValue;
  const { likeMoim } = useSocket();

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

  const likeList = list && myLikeMoim && list.filter((v) => myLikeMoim.some((like) => like.receiver_id === v.id));
  console.log("likeListlikeList", list, myLikeMoim, likeList);

  const handleClickHeart = async (v) => {
    v.preventDefault();
    console.log("heart clicked!!!");
    likeMoim({ users_id: myInfo.user_id, meetings_id: v.id, region_code: v.region_code });

    // 백엔드에서 결과주면 성공했을 시에만 아래 단계 실행
    const res = await moimApi.myLike(myInfo?.user_id);
    setMyLikeMoim(res.data);
  };

  if (loading) return <Loader />;
  return (
    <>
      <Header />
      <Hr />
      <div className="pt-1">
        <Tabs data={tabList} setTabValue={setTabValue} tabValue={tabValue} type="default" />
        <div className="px-4">
          {tabValue.value === "current" && (
            <>
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
                            {v.address} · 멤버 {v.userCount}명
                          </span>
                        </div>
                        <span className="text-sm text-point">
                          {moment(v.event_date).format("YYYY년 MM월 DD일 dddd HH시 mm분")}
                        </span>
                      </div>
                      <span className="text-sm text-textGray">{moment(v.last_active_time).format("LT")}</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {tabValue.value === "like" && (
            <>
              {likeList.map((v) => {
                return (
                  <div
                    key={v.id}
                    className="flex cursor-pointer items-center gap-4 border-b border-solid border-surface py-5"
                    onClick={() => {
                      router.push(`/moim/${v.id}/intro`);
                    }}
                  >
                    <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--point)] text-7xl text-white w_sm:h-20 w_sm:w-20 w_sm:text-6xl">
                      <PiUsersThree />
                    </div>
                    <div className="flex flex-1 justify-between">
                      <div className="flex flex-1 flex-col justify-between gap-4">
                        <div className="flex flex-col">
                          <h3 className="text-[1.1rem] font-bold">{v.name}</h3>

                          <div className="flex items-center gap-2">
                            <div className="rounded-3xl bg-[var(--darkSurface)] px-3 py-[0.15rem] text-xs">
                              {v.category1_name}/{v.category2_name}
                            </div>
                            <Dot />
                            <span className="text-sm">멤버 {v.userCount}명</span>
                          </div>
                        </div>
                        <span className="text-sm text-point">
                          {moment(v.event_date).format("YYYY년 MM월 DD일 dddd HH시 mm분")}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-between">
                        <span className="text-sm text-textGray">{moment(v.last_active_time).format("LT")}</span>

                        <GoHeartFill
                          size={32}
                          color={myLikeMoim.some((m) => m.receiver_id === v.id) ? "#cd4d4d" : "#e5e7eb"}
                          onClick={(v) => handleClickHeart(v)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {tabValue.value === "latest" && (
            <>
              <p>dddd</p>
            </>
          )}
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

export default MyList;

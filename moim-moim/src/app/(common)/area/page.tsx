"use client";

import { myInfoProps } from "@/app/client-layout";
import Button from "@/components/common/Button";
import { Loader } from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import { useSocket } from "@/hooks/useSocket";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { currentAreaAtom } from "@/store/area/atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;

  useEffect(() => {}, [myInfo]);

  if (!myInfo) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title="관심 지역" />
      <div className="scrollbar flex h-[calc(100vh-4.625rem-70px)] flex-col justify-between overflow-y-auto p-5 pt-0">
        <div className="flex h-full flex-1 flex-col justify-between">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <Image src="/account/mingcute_location-line.png" alt="location img" width={60} height={60} />

              <h1 className="text-2xl font-bold">
                관심있는 지역을
                <br />
                3개까지 저장할 수 있어요.
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              {Array(3)
                .fill("지역")
                .map((v, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span>
                      {v} {i + 1}
                    </span>
                    <button
                      className="rounded-lg border border-solid border-border p-4"
                      onClick={() =>
                        router.push(`/area/select?id=${myInfo?.addresses[i] ? myInfo?.addresses[i].id : ""}`)
                      }
                    >
                      {myInfo?.addresses[i]?.region_3depth_name ? (
                        myInfo?.addresses[i].region_3depth_name
                      ) : (
                        <span className="text-textGray">자주가는 지역을 추가해 보세요.</span>
                      )}
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-4 flex">
            <Button flex title="저장" />
          </div>
        </div>
      </div>
    </>
  );
}

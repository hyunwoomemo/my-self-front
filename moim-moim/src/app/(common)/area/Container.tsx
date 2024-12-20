"use client";
import Button from "@/components/common/Button";
import PageHeader from "@/components/common/PageHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Container = ({ myInfo }) => {
  const router = useRouter();

  return (
    <>
      <PageHeader title="관심 지역" onPrevClick={() => router.push("/")} />
      <div className="scrollbar flex h-[calc(100vh-11rem)] flex-col justify-between overflow-y-auto p-5 pt-0">
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
              {/* {Array(3)
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
                ))} */}
              {myInfo?.addresses.map((v, i) => {
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <span className={`${i === 0 ? "flex items-center gap-2" : ""}`}>
                      지역 {i + 1}
                      {i === 0 && <span className="rounded-full bg-point px-2 py-1 text-xs text-white">기본 지역</span>}
                    </span>
                    <button
                      className="rounded-lg border border-solid border-border p-4"
                      onClick={() => router.push(`/area/select?id=${v.id}`)}
                    >
                      {v.region_3depth_name ? (
                        v.region_3depth_name
                      ) : (
                        <span className="text-textGray">자주가는 지역을 추가해 보세요.</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex">
            <Button flex title="저장" />
          </div>
        </div>
      </div>
    </>
  );
};

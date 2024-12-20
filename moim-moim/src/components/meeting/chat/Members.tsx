"use client";

import { myInfoProps } from "@/app/client-layout";
import Input from "@/components/common/Input";
import { ActiveDataProps, useSocket } from "@/hooks/useSocket";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { activeAtom } from "@/store/meeting/active/atom";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdFilterList } from "react-icons/md";

const Members = ({ meetingData }) => {
  const activeData = useAtomValue(activeAtom) as ActiveDataProps[];
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const { leaveMoim } = useSocket();
  const router = useRouter();
  const leaderId = activeData.find((v) => v.users_id === meetingData.creator_id)?.users_id;
  activeData.find((v) => v.users_id === meetingData.creator_id)?.users_id;
  const membersList = Object.values(
    activeData.filter((v) => v.users_id !== myInfo.user_id && v.users_id !== meetingData.creator_id),
  );
  console.log("membersList", activeData);
  const handleLeaveMoim = () => {
    leaveMoim({ users_id: myInfo.user_id, meetings_id: meetingData.id, region_code: meetingData.region_code });
    router.push("/");
  };

  return (
    <div className="flex h-[calc(100%-7rem)] flex-col p-4">
      <div className="relative">
        <Input placeholder="멤버를 검색하세요." />
        {/* <div className="absolute flex w-full flex-col gap-2 rounded-lg bg-white p-5 shadow-md">
          {address.map((v) => {
            const { region_1depth_name, region_2depth_name, region_3depth_h_name, region_3depth_name } = v.address;
            console.log("vvv", v);
            return (
              <div
                className="cursor-pointer hover:text-primary"
                key={v.address_name}
                onClick={() => {
                  setSelectedArea(v.address_name);
                  setAddressKeyword(
                    `${region_1depth_name} ${region_2depth_name} ${region_3depth_h_name || region_3depth_name}`,
                  );
                  setAddress([]);
                }}
              >
                {region_1depth_name} {region_2depth_name} {region_3depth_h_name || region_3depth_name}
              </div>
            );
          })}
        </div> */}
      </div>
      <div className="flex max-h-[calc(100%-6rem)] flex-col px-2 py-6">
        <div className="flex justify-between">
          <span className="font-bold">총 {activeData.length}명</span>
          <div className="flex items-center gap-1">
            <MdFilterList />
            <span>가나다 순</span>
          </div>
        </div>
        <ul className="scrollbar flex max-h-[calc(100%-20px)] flex-1 flex-col gap-2 overflow-y-auto pt-4">
          {/* 방장 */}
          {meetingData.creator_id === leaderId && (
            <li className={`flex items-center gap-2`}>
              <div className="crown">
                <Image src="/moim/default_profile.png" alt="default profile image" width={48} height={48} />
              </div>
              <span className="font-bold text-point">{meetingData.creator_name}</span>
            </li>
          )}
          {/* 방장이 나일때 */}
          {meetingData.creator_id !== leaderId && (
            <li className={`flex items-center gap-2`}>
              <div>
                <Image src="/moim/default_profile.png" alt="default profile image" width={48} height={48} />
              </div>
              <span>{myInfo.nickname}</span>
            </li>
          )}
          {/* 나 */}
          <li className={`flex items-center gap-2`}>
            <div>
              <Image src="/moim/default_profile.png" alt="default profile image" width={48} height={48} />
            </div>
            <span>{myInfo.nickname}</span>
          </li>
          {activeData &&
            membersList.map((v) => {
              return (
                <li key={v.users_id} className={`flex items-center gap-2`}>
                  <div className={`${meetingData.creator_id === v.users_id ? "crown" : undefined}`}>
                    <Image src="/moim/default_profile.png" alt="default profile image" width={48} height={48} />
                  </div>
                  <span className={`${meetingData.creator_id === v.users_id ? "font-bold text-point" : "font-normal"}`}>
                    {v.nickname}?
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
      <button className="underline" onClick={handleLeaveMoim}>
        모임방 나가기
      </button>
    </div>
  );
};

export default Members;

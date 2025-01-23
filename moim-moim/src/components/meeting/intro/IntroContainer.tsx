"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCloseOutline, IoShareSocial, IoShareSocialOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Loader } from "@/components/common/Loader";
import { useAtomValue } from "jotai";
import { inviteCodeAtom, loadingAtom } from "@/store/common/atom";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { getListProps, getMeetingData, useSocket } from "@/hooks/useSocket";
import Empty from "@/components/common/Empty";
import IntroData from "./IntroData";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { myInfoProps } from "@/app/client-layout";
import { listAtom } from "@/store/meeting/list/atom";
import { GoShareAndroid } from "react-icons/go";
import Modal from "@/components/common/Modal";
import { RxCopy } from "react-icons/rx";

const IntroContainer = ({ id }) => {
  const [imgNum, setImgNum] = useState<string | null>(null);
  const loading = useAtomValue(loadingAtom);
  const data = useAtomValue(meetingDataAtom) as getMeetingData;
  const router = useRouter();
  const [currentRegion, setCurrentRegion] = useState<string | null>(null);
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const list = useAtomValue(listAtom) as getListProps[];
  const { enterMeeting, generateInviteCode } = useSocket();
  const code = useAtomValue(inviteCodeAtom);
  const [isModalCode, setIsModalCode] = useState(false);
  console.log("isModalCode", isModalCode);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const address = JSON.parse(localStorage.getItem("address") || "{}");
      setCurrentRegion(address?.address_code || null);
    }
  }, []);

  useEffect(() => {
    if (list) {
      const target = list.find((v) => {
        return v.id === Number(id);
      });

      const type = target?.type;

      console.log("target", list, type, id);
      if (type && myInfo) {
        enterMeeting({
          region_code: String(currentRegion),
          meetings_id: Number(id),
          users_id: myInfo.user_id,
          type: type,
        });
      }
    }
  }, [list]);

  useEffect(() => {
    const num = Math.floor(Math.random() * 10 + 1);
    const formattedNum = num.toString().padStart(2, "0");
    console.log(formattedNum);
    setImgNum(formattedNum);
  }, []);

  const onClickInvite = () => {
    generateInviteCode({ users_id: myInfo.user_id, meetings_id: Number(id), region_code: String(currentRegion) });
    setIsModalCode(true);
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("복사되었습니다!");
    } catch (e) {
      alert("다시 시도해주세요.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {isModalCode && (
        <Modal title="초대 코드" isModal={isModalCode} setIsModal={setIsModalCode}>
          <>
            <p className="mb-4 text-center">
              이 모임으로 초대하고 싶으신가요?
              <br />
              아래 초대 코드를 복사해서 친구에게 공유해 보세요!
            </p>
            <div className="rounded-xl border border-solid border-border bg-surface p-3 text-center text-3xl font-bold text-primary">
              {code}
            </div>
            <button
              className="my-4 flex w-full items-center justify-center gap-1"
              onClick={() => handleCopyClipBoard(`${code}`)}
            >
              <RxCopy size={14} />
              <span className="underline">복사하기</span>
            </button>
          </>
        </Modal>
      )}

      {data && (
        <div className="relative h-screen">
          <div className="absolute left-0 right-0 top-0 z-20 flex w-full items-center justify-end gap-2 p-5">
            <button className="text-2xl text-white" onClick={onClickInvite}>
              <GoShareAndroid />
            </button>
            <button className="text-4xl text-white" onClick={() => router.push("/")}>
              <IoCloseOutline />
            </button>
          </div>
          <IntroData enterIntro data={data} />

          {/* (dev) 임시로 랜덤 배경 처리 */}
          {imgNum && (
            <Image src={`/moim_bg_default/moim_bg_default${imgNum}.jpg`} alt="background_default_image" fill priority />
          )}
        </div>
      )}
    </>
  );
};

export default IntroContainer;

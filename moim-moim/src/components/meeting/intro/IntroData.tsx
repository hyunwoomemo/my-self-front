import { myInfoProps } from "@/app/client-layout";
import Button from "@/components/common/Button";
import { getMeetingData, useSocket } from "@/hooks/useSocket";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { meetingDataAtom } from "@/store/meeting/data/atom";
import { useAtomValue } from "jotai";
import moment from "moment";
import { CiHeart } from "react-icons/ci";
import { GoHeartFill } from "react-icons/go";
import { PiUsersLight } from "react-icons/pi";
import { TbCrown } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { TbPhotoEdit } from "react-icons/tb";

interface IntroDataProps {
  data: getMeetingData;
  enterIntro?: boolean;
}

const IntroData = ({ data, enterIntro }: IntroDataProps) => {
  const { joinMeeting } = useSocket();
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;
  const meetingData = useAtomValue(meetingDataAtom) as getMeetingData;
  const router = useRouter();

  const handleEnterClick = () => {
    //입장하기 or 입장 신청하기 버튼 클릭
    joinMeeting({
      meetings_id: data.id,
      region_code: "RC003",
      users_id: myInfo.user_id,
      type: data.type,
    });
  };

  const handleSettingClick = () => {
    //방장이 방 수정하기 버튼 클릭
    router.push(`/create/write?type=edit`);
  };

  return (
    <div className={`absolute bottom-0 left-0 z-10 flex h-full w-full flex-col gap-5 bg-black bg-opacity-60 px-5 py-5`}>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col items-center gap-6 pt-20">
          <div className="flex flex-col items-center gap-2">
            <span className="w-fit rounded-full bg-semiPrimary px-4 py-2 text-xs font-bold">
              {data.category1_name}/{data.category2_name}
            </span>
            <h1 className="text-center text-3xl font-bold text-bg">{data.name}</h1>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-point text-center text-3xl text-white shadow-lg">
                <TbCrown />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">{data.creator_name}</span>
                <span className="text-xs text-white">레벨</span>
              </div>
              <div className="flex gap-1">
                <div className="flex items-center">
                  <CiHeart className="text-2xl text-white" />
                  <span className="text-white">7</span>
                </div>
                <div className="font-thin text-white">·</div>
                <div className="flex items-center gap-1">
                  <PiUsersLight className="text-2xl text-white" />
                  <span className="text-white">
                    {data.userCount}
                    {data.max_members !== -1 ? `/${data.max_members}` : undefined}
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-semiPrimary">
                {data.region_code} · {moment(data.event_date).format("LL")} · {moment(data.event_date).format("LT")}
              </span>
              {!enterIntro && myInfo.user_id === meetingData.creator_id && (
                <div className="mt-2 flex w-full items-center justify-center gap-3">
                  <button className="text-2xl" onClick={handleSettingClick} title="수정하기">
                    <TbPhotoEdit size={22} color="#fff" />
                  </button>
                  <button className="text-2xl" onClick={handleSettingClick} title="수정하기">
                    <MdOutlineEdit size={22} color="#fff" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="scrollbar w-full overflow-y-auto whitespace-pre-wrap break-all rounded-xl bg-black bg-opacity-80 p-4 text-white h_sm:max-h-44 h_lg:max-h-64 h_xl:max-h-96">
          {data.description}
        </div>
      </div>
      {/* 하단 버튼 */}
      {enterIntro && (
        <div className="flex gap-2">
          <div className="rounded-lg bg-white p-5 text-3xl text-textGray">
            <GoHeartFill />
          </div>
          <Button
            title={data.type === 3 ? "입장하기" : "입장 신청하기"}
            flex
            textSize="lg"
            onClick={handleEnterClick}
          />
        </div>
      )}
    </div>
  );
};

export default IntroData;

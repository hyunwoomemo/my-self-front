import { myInfoProps } from "@/app/client-layout";
import Button from "@/components/common/Button";
import { getMeetingData, useSocket } from "@/hooks/useSocket";
import { myInfoAtom } from "@/store/account/myInfo/atom";
import { useAtomValue } from "jotai";
import moment from "moment";
import { CiHeart } from "react-icons/ci";
import { GoHeartFill } from "react-icons/go";
import { PiUsersLight } from "react-icons/pi";
import { TbCrown } from "react-icons/tb";

interface IntroDataProps {
  data: getMeetingData;
  enterIntro?: boolean;
}

const IntroData = ({ data, enterIntro }: IntroDataProps) => {
  const { joinMeeting } = useSocket();
  const myInfo = useAtomValue(myInfoAtom) as myInfoProps;

  const handleClick = () => {
    joinMeeting({
      meetings_id: data.id,
      region_code: "A02",
      users_id: myInfo.id,
      type: data.type,
    });
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
                    {data.userCount}/{data.max_members}
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-semiPrimary">
                {data.region_code} · {moment(data.event_date).format("LL")} · {moment(data.event_date).format("LT")}
              </span>
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
          <Button title={data.type === 3 ? "입장하기" : "입장 신청하기"} flex textSize="lg" onClick={handleClick} />
        </div>
      )}
    </div>
  );
};

export default IntroData;

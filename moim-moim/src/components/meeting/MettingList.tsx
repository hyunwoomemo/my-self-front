import { PiUsersThree, PiUsersLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";

const MeetingList = () => {
  return (
    <div className="flex items-center gap-4 border-b border-solid border-surface pb-5">
      {/* <Image src={} alt={} /> */}
      <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--point)] text-7xl text-white">
        <PiUsersThree />
      </div>
      <div className="flex max-w-[calc(100%-6rem)] flex-1 flex-col justify-between gap-3">
        <div className="flex flex-col">
          <h3 className="w-full truncate text-[1.1rem] font-bold" title="영동시장">
            영동시장
          </h3>
          <h5 className="w-full truncate text-sm text-[var(--textGray)]" title="부가설명">
            부가설명
          </h5>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center gap-2">
            <div className="rounded-3xl bg-[var(--darkSurface)] px-3 py-[0.15rem] text-xs">맛집</div>
            <div className="font-thin text-[var(--textGray)]">·</div>
            <span className="text-xs text-[var(--point)]">30분 전</span>
          </div>
          <div className="flex gap-1">
            <div className="flex items-center">
              <CiHeart className="text-2xl" />
              <span>7</span>
            </div>
            <div className="font-thin text-[var(--textGray)]">·</div>
            <div className="flex items-center gap-1">
              <PiUsersLight className="text-2xl" />
              <span>7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingList;

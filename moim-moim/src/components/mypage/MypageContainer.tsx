"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { MdOutlineSettings } from "react-icons/md";
import Button from "../common/Button";

const MypageContainer = ({ userInfo }) => {
  console.log("userInfo", userInfo);
  const router = useRouter();
  const userInterests = userInfo?.interests || [];
  const userAddresses = userInfo?.addresses || [];
  const userBirthdate = userInfo.birthdate || "";

  const logoutClick = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    router.push("/");
  };

  function birthdateFormatDate(v) {
    // 입력 문자열의 연도, 월, 일을 추출
    const year = v.startsWith("9") ? "19" + v.slice(0, 2) : "20" + v.slice(0, 2); // 19XX 또는 20XX로 시작
    const month = v.slice(2, 4); // 3번째와 4번째 자리
    const day = v.slice(4, 6); // 5번째와 6번째 자리

    // YYYY.MM.DD 형식으로 반환
    return `${year}.${month}.${day}`;
  }

  return (
    <>
      <header>
        <div className="flex justify-between p-6 pb-4">
          <div className="relative">
            <div className="flex cursor-pointer items-center gap-2">
              <span className="text-xl font-bold">프로필</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-2xl">
            <MdOutlineSettings />
          </div>
        </div>
      </header>
      <div className="mt-10 flex">
        <div className="box-border h-32 w-32 border-4">이미지</div>
        <div>
          <div>
            <span className="text-xl font-bold">{userInfo.nickname}</span>
          </div>
          <div>
            <p className="text-gray-400">
              {userAddresses[0]?.region_1depth_name} {birthdateFormatDate(userInfo.birthdate)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        {userInterests.map((item, index) => (
          <div key={index} className="mx-2 px-4 rounded-md bg-slate-300">
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-10 bg-zinc-300 p-5">
        <div className="rounded-md bg-white">
          <div className="flex w-full items-center justify-evenly">
            <div className="mx-5">
              <div>
                <span>0</span>
              </div>
              <div>
                <span>찜 모임</span>
              </div>
            </div>
            <span>|</span>
            <div className="mx-5">
              <div>
                <span>0</span>
              </div>
              <div>
                <span>최근 본 모임</span>
              </div>
            </div>
            <span>|</span>
            <div className="mx-5">
              <div>
                <span>0</span>
              </div>
              <div>
                <span>초대받은 모임</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      <Button
        title="로그아웃"
        custom="label"
        onClick={() => logoutClick()}
      />
      </div>
    </>
  );
};

export default MypageContainer;

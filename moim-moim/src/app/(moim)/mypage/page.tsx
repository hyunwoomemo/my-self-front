import MypageContainer from "@/components/mypage/MypageContainer";
import { getUserInfo } from "@/actions/user/getUserInfo";


export default async function Page() {
  const userInfo = await getUserInfo();


  return <MypageContainer userInfo={userInfo?.data} />;
}

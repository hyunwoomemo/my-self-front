import MeetingListContainer from "@/components/home/MeetingListContainer";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/actions/user/getUserInfo";

const Home = async () => {
  const myInfo = await getUserInfo();

  console.log("123123123eddd", myInfo);
  if (myInfo?.statusCode === 401 || !myInfo) {
    redirect("/login");
  }
  return <MeetingListContainer />;
};

export default Home;

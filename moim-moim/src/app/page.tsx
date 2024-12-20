import { getUserInfo } from "@/actions/user/getUserInfo";
import MeetingListContainer from "@/components/home/MeetingListContainer";
import { redirect } from "next/navigation";

const Home = async () => {
  const myInfo = await getUserInfo();
  console.log("myinfo🙋‍♀️🙋‍♀️🙋‍♀️", myInfo);
  if (myInfo.statusCode === 401) {
    redirect("/login");
  }
  return <MeetingListContainer />;
};

export default Home;

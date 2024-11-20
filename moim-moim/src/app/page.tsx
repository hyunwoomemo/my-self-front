import MeetingListContainer from "@/components/home/MeetingListContainer";
import { accountApi } from "./api";

const Home = async () => {
  accountApi.myInfo();
  return <MeetingListContainer />;
};

export default Home;

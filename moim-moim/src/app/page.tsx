import MeetingListContainer from "@/components/home/MeetingListContainer";
import { useSocket } from "@/hooks/useSocket";

const Home = () => {
  useSocket();

  return <MeetingListContainer />;
};

export default Home;

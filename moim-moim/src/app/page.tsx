import MeetingListContainer from "@/components/home/MeetingListContainer";
import { LoginContainer } from "@/components/login/LoginContainer";
import { getCookie } from "cookies-next";

const Home = () => {
  const token = getCookie("accessToken");
  console.log("토큰?", token);
  if (token) {
    return <MeetingListContainer />;
  } else {
    return <LoginContainer />;
  }
};

export default Home;

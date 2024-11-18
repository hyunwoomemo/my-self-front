import MeetingListContainer from "@/components/home/MeetingListContainer";
import { LoginContainer } from "@/components/login/LoginContainer";
import { getCookie } from "@/utils/cookie";
import { redirect } from "next/navigation";

const Home = async () => {
  const token = await getCookie("accessToken");

  console.log("token", token);
  if (token) {
    redirect("/list");
  } else {
    redirect("/login");
  }
};

export default Home;

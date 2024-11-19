import MeetingListContainer from "@/components/home/MeetingListContainer";
import { LoginContainer } from "@/components/login/LoginContainer";
import { getCookie } from "@/utils/cookie";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";

const Home = async () => {
  // const router = useRouter();
  // const token = await getCookie("accessToken");

  // console.log("token123", token);
  // router.push("/list");
  // if (token) {
    // redirect("/list");
  // } else {
    // redirect("/login");
  // }
};

export default Home;

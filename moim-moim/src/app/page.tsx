import { getCookie } from "@/utils/cookie";
import { redirect } from "next/navigation";

const Home = async () => {
  const token = await getCookie("accessToken");

  if (token) {
    console.log("token", token); //이거 왜 안뜨지?
    redirect("/list");
  } else {
    redirect("/login");
  }
};

export default Home;

import { LoginContainer } from "@/components/login/LoginContainer";
// import { getCookie } from "@/utils/cookie";
import { redirect } from "next/navigation";

export default async function Page() {
  // const token = await getCookie("accessToken");

  // if (token) {
    // redirect("/");
  // } else {
    return <LoginContainer />;
  // }
}

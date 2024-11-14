import { accountApi } from "@/app/api";
import { LoginContainer } from "./LoginContainer";

export default async function Page() {
  try {
    const response = await accountApi.register();
    console.log("api", response);
  } catch (error) {
    console.error("api 오류", error);
  }

  return <LoginContainer />;
}

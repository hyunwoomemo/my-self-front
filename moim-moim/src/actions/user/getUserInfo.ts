import { accountApi } from "@/app/api";
import { cookies } from "next/headers";

export const getUserInfo = async () => {
  const cookieStore = await cookies();
  const token = await cookieStore.get("accessToken")?.value;

  if (!token) return null;
  try {
    const res = await accountApi.myInfo();
    if (!res.ok) {
      console.error(`요청 실패 코드: ${res.status}`);
      const error = await res.json();
      console.log(error);
    }

    const json = await res.json();
    console.log("❤️?", json);
    return json;
  } catch (error) {
    console.error("api 호출 실패", error, "token", token);
  }
};

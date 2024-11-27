import { nextFetch } from "@/utils/fetch";

export const getUserInfo = async () => {
  try {
    return await nextFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/myInfo`);
  } catch (error) {
    console.error("api 호출 실패", error);
  }
};

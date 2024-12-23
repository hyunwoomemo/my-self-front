import { getToken } from "./getToekn";

export const getUserInfo = async () => {
  const token = await getToken();
  // console.log("token", token);

  //서버 컴포넌트에서 myInfo 사용
  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/myInfo`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["myInfo"],
        },
      });

      return await res.json();
    } catch (error) {
      console.error("api 호출 실패", error);
    }
  }
};

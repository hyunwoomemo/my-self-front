import { getCookie } from "cookies-next";

//클라이언트 컴포넌트에서 (토큰 필요한)api 호출할 때
export const nextFetch = async (url, options) => {
  const token = await getCookie("accessToken");
  console.log("token", token);

  const newOption = {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(url, newOption);
  console.log("res", res);
  const json = await res.json();

  return json;
};

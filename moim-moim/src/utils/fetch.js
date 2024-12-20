import { getCookie } from "cookies-next";

//클라이언트 컴포넌트에서 (토큰 필요한)api 호출할 때
export const nextFetch = async (url, options) => {
  try {
    const token = await getCookie("accessToken");
    // if (!token) throw new Error("토큰 없음");

    const newOption = {
      ...options,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(url, newOption);
    const json = await res.json();

    console.log("🙋‍♀️🙋‍♀️🙋‍♀️", json);
    if (json.statusCode === 401) {
      window.location.href = "/login";
    }

    return json;
  } catch (err) {
    console.error("fetch error", err);
  }
};

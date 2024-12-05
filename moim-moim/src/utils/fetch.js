import { getCookie } from "cookies-next";

export const nextFetch = async (url, options) => {
  const token = await getCookie("accessToken");
  // const token = await cookieStore.get("accessToken")?.value;
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

import { cookies } from "next/headers";

export const nextFetch = async (url, options) => {
  const cookieStore = await cookies();
  const token = await cookieStore.get("accessToken")?.value;
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

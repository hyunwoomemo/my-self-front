import { cookies } from "next/headers"; //서버컴포넌트에서만 사용 가능

export const getCookie = async (key) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
};
export const setCookie = async (key, value) => {
  const cookieStore = await cookies();
  return cookieStore.set(key, value);
};

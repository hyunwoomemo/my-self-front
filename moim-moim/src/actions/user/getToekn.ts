import { cookies } from "next/headers";

export const getToken = async (target = "accessToken") => {
  const cookieStore = cookies();

  const token = (await cookieStore).get(target);

  return token?.value;
};

"use server";

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string) {
  return cookies().set(key, value);
}
export async function getCookie(key: string) {
  return cookies().get(key)?.value;
}

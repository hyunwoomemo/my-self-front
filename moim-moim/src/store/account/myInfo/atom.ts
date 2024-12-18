import { atom } from "jotai";

export const myInfoAtom = atom();
export const currentAreaAtom = atom({
  address: "",
  region_3depth_name: "",
});

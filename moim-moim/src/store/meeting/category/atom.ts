import { atom } from "jotai";

interface selectedCategoryValues {
  c1_id: number;
  c1_name: string;
  c2_id: number;
  c2_name: string;
}
export const selectedCategoryAtom = atom<selectedCategoryValues>();

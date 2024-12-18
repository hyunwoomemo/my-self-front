import { atom } from "jotai";

export interface myListValue {
  id: number;
  name: string;
  created_at: string;
  max_members: number;
  event_date: string;
  creator_id: number;
  region_code: string;
  description: string;
  type: number;
  category1: number;
  category2: number;
  logo: null;
  users_id: number;
  status: number;
  last_active_time: string;
  category1_name: string;
  category2_name: string;
  address: null;
  userCount: number;
  likeCount: number;
}

export const listAtom = atom();
export const myListAtom = atom<myListValue[]>([]);

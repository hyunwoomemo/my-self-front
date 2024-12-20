import { atom } from "jotai";

interface ListValue {
  admin: number;
  contents: string;
  created_at: string;
  id: number;
  meetings_id: number;
  nickname: string;
  reply_contents: string;
  reply_id: number;
  reply_nickname: string;
  tag_id: number;
  users: string;
  users_id: number;
}
export interface messagesValue {
  end: boolean;
  list: ListValue;
  total: number;
}

// export const messagesAtom = atom({ list: [], total: 0 });
export const messagesAtom = atom<messagesValue>();
export const typingAtom = atom([]);
export const recentMsgAtom = atom({});
export const endMsgAtom = atom(false);

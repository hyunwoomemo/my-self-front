import { nextFetch } from "@/utils/fetch";

//클라이언트 컴포넌트에서 get api 호출하기
export const accountApi = {
  myInfo: () => {
    return nextFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/myInfo`, { next: { tags: ["myInfo"] } });
  },

  interests: () => {
    return nextFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/interests`);
  },

  confirmNickname: (nickname: string) => {
    return nextFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/confirmNickname?nickname=${nickname}`);
  },
};

export const moimApi = {
  myMoim: (id) => {
    return nextFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/moim/myMoim/${id}`);
  },
  myLike: (id) => {
    return nextFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/moim/like/${id}`);
  },
};

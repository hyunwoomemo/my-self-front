import { nextFetch } from "@/utils/fetch";

//클라이언트 컴포넌트에서 get api 호출하기
export const accountApi = {
  myInfo: () => {
    return nextFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/myInfo`, { next: { tags: ["myInfo"] } });
  },

  interests: () => {
    return nextFetch("/auth/interests");
  },

  confirmNickname: (nickname: string) => {
    return nextFetch(`/auth/confirmNickname?nickname=${nickname}`);
  },
};

export const moimApi = {
  myMoim: (id: number) => {
    return nextFetch(`/moim/myMoim/${id}`);
  },
};

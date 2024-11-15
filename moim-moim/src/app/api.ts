import request from "@/utils/axios";

export const accountApi = {
  register: (data: {
    email: string;
    nickname: string;
    password: string;
    passwordCheck: string;
    birthdate: string;
    interestes: [];
    addresses: [
      {
        address: string;
        address_code: string;
      },
    ];
  }) => {
    return request.post("auth/register", data);
  },
  login: (data: { email: string; password: string }) => {
    return request.post("/auth/login", data);
  },
};

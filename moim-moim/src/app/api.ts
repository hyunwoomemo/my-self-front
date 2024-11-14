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
        address: "string";
        address_code: "string";
      },
    ];
  }) => request.post("auth/register", data),
  login: ({ email, password }: { email: string; password: string }) => {
    request.post("/auth/login", { email, password });
  },
};

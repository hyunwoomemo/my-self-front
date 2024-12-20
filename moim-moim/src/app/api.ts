import request from "@/utils/axios";

export const accountApiv1 = {
  register: (data: {
    email: string;
    nickname: string;
    password: string;
    passwordCheck: string;
    birthdate: string;
    gender: string;
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
  requestEmail: (data: { email: string }) => {
    return request.post("/auth/requestEmail", data);
  },
  confirmEmail: (data: { email: string; code: string }) => {
    return request.post("/auth/confirmEmail", data);
  },
};

export const moimApi = {
  getMoreMessage: (id, total) => {
    return request.post("/moim/getMoreMessage", { meetings_id: id, length: total });
  },
};

export const addressApi = {
  createAddress: ({ address_name, region_1depth_name, region_2depth_name, region_3depth_name, prev_address_id }) => {
    return request.post("/address/createAddress", {
      address_name,
      region_1depth_name,
      region_2depth_name,
      region_3depth_name,
      prev_address_id,
    });
  },
};

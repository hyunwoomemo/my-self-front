import request from "@/utils/axios";

// export const accountApi = {
//   register: (data: {
//     email: string;
//     nickname: string;
//     password: string;
//     passwordCheck: string;
//     birthdate: string;
//     interestes: [];
//     addresses: [{
//         address: "string",
//         address_code: "string"
//     }];
//   }) => {
//     return request.post("auth/register", data),
//   },
// };
export const accountApi = {
  register: async () => {
    try {
      const response = await request.post("auth/register", {
        email: "user@example.com",
        nickname: "John Doe",
        password: "fjqmxlt1!",
        passwordCheck: "fjqmxlt1!",
        birthdate: "910612",
        interests: [1, 8],
        addresses: [
          {
            address: "논현1동",
            address_code: "AAA",
          },
        ],
      });
      return response;
    } catch (error) {
      console.error("회원가입 API 호출 에러", error);
      throw error;
    }
  },
};

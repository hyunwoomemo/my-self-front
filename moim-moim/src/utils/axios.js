import axios from "axios";
import { getCookie } from "cookies-next";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

axios.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      //서버 환경인가?
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");
      console.log("⭐", accessToken, refreshToken);
      if (accessToken) {
        //refreshToken은??
        config.headers.token = accessToken;
      } else {
        // return config;
        console.log("❌ No accessToken found.");
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const responseBody = (response) => {
  return response;
};

const request = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
};

export default request;

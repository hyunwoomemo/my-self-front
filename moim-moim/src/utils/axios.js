import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
axios.interceptors.request.use(
  async (config) => {
    //토큰 담기
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const responseBody = (response) => {
  return response.data;
};

const request = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
};

export default request;

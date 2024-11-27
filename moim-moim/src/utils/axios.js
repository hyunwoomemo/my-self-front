import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 백엔드 API URL
  // withCredentials: true,           // 쿠키 및 인증 정보 허용
});

apiClient.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 토큰 만료 처리
apiClient.interceptors.response.use(
  (response) => response, // 성공 응답 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정

      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        try {
          // Refresh Token으로 Access Token 갱신
          const { data } = await apiClient.post("/auth/refreshToken", { refreshToken });
          const { newAccessToken } = data.data;
          // setCookie("accessToken", newAccessToken, { path: "/" }); // 새 토큰 저장
          setCookie("accessToken", newAccessToken);
          // 갱신된 토큰으로 헤더 업데이트 후 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("❌ Refresh token expired or invalid:", refreshError);
          // Refresh Token도 만료되었을 경우 로그아웃 처리
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          // 원하는 경로로 리다이렉트 (예: 로그인 페이지)
          if (typeof window !== "undefined") {
            // window.location.href = "/login";
            redirect("/");
          }
        }
      } else {
        console.log("❌ No refresh token found. Logging out...");
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        if (typeof window !== "undefined") {
          // window.location.href = "/login";
          redirect("/");
        }
      }
    }
    return Promise.reject(error);
  },
);

const responseBody = (response) => {
  return response;
};

const request = {
  get: (url) => apiClient.get(url).then(responseBody),
  post: (url, body) => apiClient.post(url, body).then(responseBody),
};

export default request;

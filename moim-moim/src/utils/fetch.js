import { deleteCookie, getCookie } from "cookies-next";

//클라이언트 컴포넌트에서 (토큰 필요한)api 호출할 때
export const nextFetch = async (url, options) => {
  try {
    const token = await getCookie("accessToken");
    // if (!token) throw new Error("토큰 없음");

    const newOption = {
      ...options,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(url, newOption);
    if (!res.ok) {
      if (json.statusCode === 401) {
        window.location.href = "/login";
        return;
      }
      throw new Error("오류", res.status);
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error("fetch error", err);
    const refreshToken = getCookie("refreshToken");
    console.log("refreshToken", refreshToken);
    if (refreshToken) {
      try {
        const { data } = await apiClient.post("/auth/refreshToken", { refreshToken });
        const { newAccessToken } = data.data;
        setCookie("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.log("refreshToken 없음", err);
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        window.location.href = "/login";
      }
    }
    throw err;
  }
};

import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_DOMAIN,
  timeout: 60000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// accessToken 만료 시 refreshToken으로 토큰 재발급 및 기존 api 재요청
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const errorCode = error.response?.data?.code;

    // 1. 401 에러 감지 로깅 (어떤 요청에서 401이 났는지 확인)
    if (status === 401) {
      console.group("❌ [Axios 401 Error Detected]");
      console.log("URL:", originalRequest?.url);
      console.log("Method:", originalRequest?.method?.toUpperCase());
      console.log("Error Code:", errorCode);
      console.log("Response Data:", error.response?.data);
      console.groupEnd();
    }

    // 2. AccessToken 만료 시 재발급 로직
    if (status === 401 && errorCode === "JWT401-EXPIRED_ACCESS" && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");

        if (!refreshToken) {
          console.warn("⚠️ RefreshToken이 SecureStore에 없습니다. 로그아웃 처리합니다.");
          await useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        console.log("🔄 토큰 재발급 요청 시작 (/v1/auth/reissue)...");

        const { data } = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_DOMAIN}/v1/auth/reissue`,
          { refreshToken },
        );

        const newAccessToken = data.newAccessToken;
        const newRefreshToken = data.refreshToken;

        await useAuthStore.getState().updateToken(newAccessToken, newRefreshToken);

        console.log("✅ 토큰 재발급 성공! 실패했던 기존 요청을 재시도합니다.");

        // 헤더 업데이트 및 기존 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (reissueError: any) {
        console.group("🔥 [Token Reissue Failed]");
        console.log("Reissue Error Status:", reissueError.response?.status);
        console.log("Reissue Error Data:", reissueError.response?.data);
        console.groupEnd();

        await useAuthStore.getState().logout();
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  },
);

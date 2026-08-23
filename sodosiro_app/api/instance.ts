import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_DOMAIN,
  timeout: 30000,
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

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "JWT401-EXPIRED_ACCESS" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      try {
        const { data } = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_DOMAIN}/v1/auth/reissue`,
          { refreshToken },
        );

        const newAccessToken = data.newAccessToken;
        const newRefreshToken = data.refreshToken;

        await useAuthStore.getState().updateToken(newAccessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch {
        await useAuthStore.getState().logout();

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

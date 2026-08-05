import * as SecureStore from "expo-secure-store";
import { axiosInstance } from "./instance";

export async function loginWithKakaoApi(idToken: string) {
  const { data } = await axiosInstance.post<LoginResponse>("/v1/auth/social", {
    provider: "kakao",
    idToken: idToken,
  });

  return data;
}

export async function logoutApi() {
  const refreshToken = await SecureStore.getItemAsync("refreshToken");

  return axiosInstance.post("/v1/auth/app/logout", {
    refreshToken,
  });
}

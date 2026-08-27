import { useAuthStore } from "@/stores/useAuthStore";
import * as SecureStore from "expo-secure-store";
import { axiosInstance } from "./instance";

type PostUpdateLocationBody = {
  latitude: number;
  longitude: number;
  accuracy: number;
  occurredAt: Date;
};

export async function postUpdateLocation(body: PostUpdateLocationBody) {
  // Zustand에 토큰이 없으면 SecureStore에서 direct 추출
  let token = useAuthStore.getState().accessToken;

  if (!token) {
    token = await SecureStore.getItemAsync("accessToken");
  }

  // 토큰이 완전히 없는 비로그인 상태면 요청을 보내지 않음
  if (!token) {
    console.warn("⚠️ 위치 전송 스킵: 저장된 토큰이 없습니다.");
    return;
  }

  return axiosInstance.post(`/api/v1/locations`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

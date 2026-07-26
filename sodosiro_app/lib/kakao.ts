// lib/kakao.ts
import {
  getProfile,
  login,
  logout,
  unlink,
  type KakaoOAuthToken,
  type KakaoProfile,
} from "@react-native-seoul/kakao-login";

export type KakaoLoginResult =
  | { type: "success"; token: KakaoOAuthToken; profile: KakaoProfile }
  | { type: "cancel" }
  | { type: "error"; message: string };

export async function signInWithKakao(): Promise<KakaoLoginResult> {
  try {
    // 카카오톡 설치돼 있으면 앱 전환, 아니면 계정 로그인으로 자동 폴백
    const token = await login();
    const profile = await getProfile();
    return { type: "success", token, profile };
  } catch (e: any) {
    // 사용자가 뒤로가기/취소한 경우
    if (e?.code === "E_CANCELLED_OPERATION" || e?.message?.includes("cancel")) {
      return { type: "cancel" };
    }
    return { type: "error", message: e?.message ?? "카카오 로그인 실패" };
  }
}

export async function signOutFromKakao() {
  await logout();
}

// 연결 끊기 (회원 탈퇴 시)
export async function disconnectKakao() {
  await unlink();
}

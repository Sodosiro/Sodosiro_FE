const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface SocialLoginRequest {
  provider: "kakao";
  authorizationCode: string;
}

export interface SocialLoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (
  authorizationCode: string,
): Promise<SocialLoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/v1/auth/social`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      provider: "kakao",
      authorizationCode,
    } satisfies SocialLoginRequest),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "로그인에 실패했습니다.");
  }

  return response.json();
};

export const withdraw = async (accessToken: string, refreshToken: string) => {
  const response = await fetch(`${API_BASE_URL}/v1/auth/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "회원 탈퇴에 실패했습니다.");
  }
};

export const getMe = async (accessToken: string) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("사용자 정보를 불러오지 못했습니다.");
  }

  return response.json();
};

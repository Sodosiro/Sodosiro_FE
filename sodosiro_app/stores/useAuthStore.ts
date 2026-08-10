import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;

  initialize: () => Promise<void>;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  updateToken: (accessToken: string, refreshToken: string) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: true,
  isAuthenticated: false,
  accessToken: null,

  // 앱 재시작 시 SecureStore에서 accessToken zustand로 저장, 로그인 상태 설정
  initialize: async () => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      if (!accessToken) {
        set({
          isLoading: false,
          isAuthenticated: false,
          accessToken: null,
        });
        return;
      }

      set({
        isLoading: false,
        isAuthenticated: true,
        accessToken,
      });
    } catch {
      set({
        isLoading: false,
        isAuthenticated: false,
        accessToken: null,
      });
    }
  },

  login: async (accessToken, refreshToken) => {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);

    set({
      isAuthenticated: true,
      accessToken,
    });
  },

  // accessToken, refreshToken 재발급 시 사용
  updateToken: async (newAccessToken, newRefreshToken) => {
    await SecureStore.setItemAsync("accessToken", newAccessToken);
    await SecureStore.setItemAsync("refreshToken", newRefreshToken);

    set({
      accessToken: newAccessToken,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");

    set({
      isAuthenticated: false,
      accessToken: null,
    });
  },
}));

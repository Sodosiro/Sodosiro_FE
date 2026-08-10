import { create } from "zustand";

interface WebViewState {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useWebViewStore = create<WebViewState>((set) => ({
  isLoading: true,
  setIsLoading: (value) =>
    set({
      isLoading: value,
    }),
}));

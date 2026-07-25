import { create } from "zustand";

interface LocationState {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  isDenied: boolean;
  setLocation: (location: { latitude: number; longitude: number }) => void;
  setIsDenied: (value: boolean) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  isDenied: false,

  setLocation: (location) => set({ location }),

  setIsDenied: (value) =>
    set({
      isDenied: value,
    }),
}));

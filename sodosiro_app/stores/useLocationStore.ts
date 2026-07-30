import { create } from "zustand";

interface LocationState {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  isDenied: boolean;
  isTracking: boolean;
  setLocation: (location: { latitude: number; longitude: number }) => void;
  setIsDenied: (value: boolean) => void;
  setIsTracking: (value: boolean) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  isDenied: false,
  isTracking: false,

  setLocation: (location) => set({ location }),

  setIsDenied: (value) =>
    set({
      isDenied: value,
    }),

  setIsTracking: (value) =>
    set({
      isTracking: value,
    }),
}));

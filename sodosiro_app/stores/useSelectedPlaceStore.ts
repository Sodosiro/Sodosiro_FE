import { create } from "zustand";

interface SelectedPlaceStore {
  selectedPlace: PlaceType | null;
  setSelectedPlace: (place: PlaceType | null) => void;
}

export const useSelectedPlaceStore = create<SelectedPlaceStore>((set) => ({
  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
}));

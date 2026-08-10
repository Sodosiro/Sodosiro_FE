import { create } from "zustand";

interface ExploreStore {
  keyword: string;
  searchResult: PlaceType[] | null;
  selectedCategory: CategoryType;
  allPlaces: PlaceType[] | null;

  selectedPlace: PlaceType | null;
  setSelectedPlace: (place: PlaceType | null) => void;

  setKeyword: (keyword: string) => void;
  setSearchResult: (results: PlaceType[]) => void;
  setSelectedCategory: (category: CategoryType) => void;
  clearSearchResult: () => void;
  setAllPlaces: (places: PlaceType[] | null) => void;
}

export const useExploreStore = create<ExploreStore>((set) => ({
  keyword: "",
  searchResult: null,
  selectedCategory: "all",
  allPlaces: null,

  setKeyword: (keyword) => set({ keyword }),
  setSearchResult: (results) => set({ searchResult: results }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearSearchResult: () => set({ keyword: "", searchResult: null }),
  setAllPlaces: (places: PlaceType[] | null) => set({ allPlaces: places }),

  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
}));

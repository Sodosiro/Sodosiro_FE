import { create } from "zustand";

interface ExploreStore {
  keyword: string;
  result: PlaceType[] | null;
  selectedCategory: CategoryType;

  setKeyword: (keyword: string) => void;
  setResult: (results: PlaceType[]) => void;
  setSelectedCategory: (category: CategoryType) => void;
  clearResult: () => void;
}

export const useExploreStore = create<ExploreStore>((set) => ({
  keyword: "",
  result: null,
  selectedCategory: "all",

  setKeyword: (keyword) => set({ keyword }),
  setResult: (results) => set({ result: results }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearResult: () => set({ keyword: "", result: null }),
}));

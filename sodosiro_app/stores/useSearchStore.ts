import { create } from "zustand";

interface SearchStore {
  keyword: string;
  result: PlaceType[] | null;

  setKeyword: (keyword: string) => void;
  setResult: (results: PlaceType[]) => void;
  clearResult: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  keyword: "",
  result: null,

  setKeyword: (keyword) => set({ keyword }),
  setResult: (results) => set({ result: results }),
  clearResult: () => set({ keyword: "", result: null }),
}));

import { PLACE_LIST } from "@/mocks/places";
import { useSearchStore } from "@/stores/useSearchStore";
import { router } from "expo-router";
import { addSearchHistory } from "./searchHistory";

export const handleSearch = async (keyword: string) => {
  if (!keyword.trim()) return;

  const result = PLACE_LIST;

  await addSearchHistory(keyword);

  useSearchStore.getState().setResult(result);
  useSearchStore.getState().setKeyword(keyword);

  router.back();
};

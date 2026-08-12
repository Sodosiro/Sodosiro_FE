import { useExploreStore } from "@/stores/useExploreStore";
import { router } from "expo-router";
import { addSearchHistory } from "./searchHistory";

export const handleSearch = async (keyword: string) => {
  const trimmed = keyword.trim();
  if (!trimmed) return;

  await addSearchHistory(trimmed);

  useExploreStore.getState().setKeyword(trimmed);
  useExploreStore.getState().setSelectedPlaceId(null);
  useExploreStore.getState().setSelectedCategory("all");

  router.back();
};

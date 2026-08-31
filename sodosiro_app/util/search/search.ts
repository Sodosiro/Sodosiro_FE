import { useExploreStore } from "@/stores/useExploreStore";
import { router } from "expo-router";
import { addSearchHistory } from "./searchHistory";

export const handleSearch = async (keyword: string) => {
  const trimmed = keyword.trim();
  if (!trimmed) return;

  useExploreStore.getState().setKeyword(trimmed);
  useExploreStore.getState().setSelectedPlaceId(null);
  useExploreStore.getState().setSelectedCategory("all");
  useExploreStore.getState().setOnlySmallTown(false);

  await addSearchHistory(trimmed);

  router.back();
};

import { router } from "expo-router";
import { addSearchHistory } from "./searchHistory";

export const handleSearch = async (keyword: string) => {
  if (!keyword?.trim()) return;

  await addSearchHistory(keyword);

  router.replace({
    pathname: "/(tabs)/explore",
    params: {
      keyword: keyword,
    },
  });
};

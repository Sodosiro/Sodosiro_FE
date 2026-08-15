import { getPlacesApi } from "@/api/place";
import { useExploreStore } from "@/stores/useExploreStore";
import { CategoryToNumber } from "@/util/place/category";
import { useQuery } from "@tanstack/react-query";

export function useSearchPlacesQuery() {
  const keyword = useExploreStore((state) => state.keyword);
  const selectedCategory = useExploreStore((state) => state.selectedCategory);

  return useQuery({
    queryKey: ["search", keyword, selectedCategory],
    queryFn: () =>
      getPlacesApi({
        keyword: keyword || undefined,
        size: 10000,
        category:
          selectedCategory !== "all"
            ? [CategoryToNumber[selectedCategory]]
            : undefined,
      }),
    enabled: !!keyword.trim(),
  });
}

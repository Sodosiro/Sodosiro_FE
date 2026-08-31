import { getLikePlacesApi, getPlaceDetailApi, getPlacesApi } from "@/api/place";
import { GetReviewsParams } from "@/api/review";
import { useAuthStore } from "@/stores/useAuthStore";
import { useExploreStore } from "@/stores/useExploreStore";
import { CategoryToNumber } from "@/util/place/category";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function usePlacesQuery(
  category: CategoryType,
  sort: "ALL" | "DEFAULT" | "POPULAR" = "ALL",
  size: number = 20,
  sigunguCode?: string,
) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["places", category, sort, size, sigunguCode],
    queryFn: () =>
      getPlacesApi({
        size: size,
        category: category === "all" ? undefined : [CategoryToNumber[category]],
        sort,
        sigunguCode,
      }),
    enabled: isAuthenticated,
  });
}

export function useSearchPlacesQuery() {
  const keyword = useExploreStore((state) => state.keyword);
  const selectedCategory = useExploreStore((state) => state.selectedCategory);
  const onlySmallTown = useExploreStore((state) => state.onlySmallTown);

  return useQuery({
    queryKey: ["search", keyword, selectedCategory, onlySmallTown],
    queryFn: () =>
      getPlacesApi({
        keyword: keyword || undefined,
        size: 10000,
        category:
          selectedCategory !== "all"
            ? [CategoryToNumber[selectedCategory]]
            : undefined,
        regionType: onlySmallTown ? "SMALL_TOWN" : "ALL",
      }),
    enabled: !!keyword.trim(),
  });
}

export function usePlaceDetailQuery(contentId: number) {
  return useQuery({
    queryKey: ["placeDetail", contentId],
    queryFn: () => getPlaceDetailApi(contentId),
    enabled: !!contentId,
  });
}

export function useLikePlacesQuery(
  category: CategoryType,
  sigunguCode = undefined,
  sort: GetReviewsParams["sort"] = "RECENT",
  size = 20,
) {
  return useInfiniteQuery({
    queryKey: ["likePlaces", category, sigunguCode, sort],

    queryFn: ({ pageParam }) =>
      getLikePlacesApi({
        category: category === "all" ? undefined : [CategoryToNumber[category]],
        sigunguCode,
        size,
        cursor: pageParam,
        sort,
      }),

    initialPageParam: undefined as number | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
  });
}

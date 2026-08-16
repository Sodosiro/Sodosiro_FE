import { getLikePlaces } from "@/api/place";
import { GetReviewsParams } from "@/api/review";
import { CategoryToNumber } from "@/util/place/category";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useLikePlacesQuery(
  category: CategoryType,
  sigunguCode = undefined,
  sort: GetReviewsParams["sort"] = "RECENT",
  size = 20,
) {
  return useInfiniteQuery({
    queryKey: ["likePlaces", category, sigunguCode, sort],

    queryFn: ({ pageParam }) =>
      getLikePlaces({
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

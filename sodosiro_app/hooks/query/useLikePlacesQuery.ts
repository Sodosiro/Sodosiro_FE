import { getLikePlaces } from "@/api/place";
import { GetReviewsParams } from "@/api/review";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useLikePlacesQuery(
  sigunguCode = undefined,
  sort: GetReviewsParams["sort"] = "RECENT",
  size = 20,
) {
  return useInfiniteQuery({
    queryKey: ["likePlaces", sigunguCode, sort],

    queryFn: ({ pageParam }) =>
      getLikePlaces({ sigunguCode, size, cursor: pageParam, sort }),

    initialPageParam: undefined as number | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
  });
}

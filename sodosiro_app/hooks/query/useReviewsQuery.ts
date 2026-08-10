import { getReviewsApi, GetReviewsParams } from "@/api/review";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useReviewsQuery(
  contentId: number,
  sort: GetReviewsParams["sort"] = "RECENT",
) {
  return useInfiniteQuery({
    queryKey: ["reviews", contentId, sort],

    queryFn: ({ pageParam }) =>
      getReviewsApi(contentId, { size: 20, sort, cursor: pageParam }),

    initialPageParam: undefined as number | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },

    enabled: !!contentId,
  });
}

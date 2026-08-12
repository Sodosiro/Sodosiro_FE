import { getMyReviewsApi, GetReviewsParams } from "@/api/review";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useMyReviewsQuery(
  sort: GetReviewsParams["sort"] = "RECENT",
  hasImage = false,
) {
  return useInfiniteQuery({
    queryKey: ["myReviews"],

    queryFn: ({ pageParam }) =>
      getMyReviewsApi({ size: 20, cursor: pageParam }),

    initialPageParam: undefined as number | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
  });
}

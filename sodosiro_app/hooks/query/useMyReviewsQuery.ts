import { getMyReviewsApi, GetReviewsParams } from "@/api/review";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export function useMyReviewsQuery(
  sort: GetReviewsParams["sort"] = "RECENT",
  hasImage = false,
) {
  return useInfiniteQuery({
    queryKey: ["myReviews", sort, hasImage],

    queryFn: ({ pageParam }) =>
      getMyReviewsApi({ cursor: pageParam, sort: sort, size: 20, hasImage }),

    initialPageParam: undefined as number | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
    placeholderData: keepPreviousData,
  });
}

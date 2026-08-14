import { getReviewsApi, GetReviewsParams } from "@/api/review";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export function useReviewsQuery(
  contentId: number,
  sort: GetReviewsParams["sort"] = "RECENT",
  hasImage = false,
  size = 20,
) {
  return useInfiniteQuery({
    queryKey: ["reviews", contentId, sort, hasImage],

    queryFn: ({ pageParam }) =>
      getReviewsApi(contentId, { size, sort, cursor: pageParam, hasImage }),

    initialPageParam: undefined as number | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
    placeholderData: keepPreviousData,
    enabled: !!contentId,
  });
}

import {
  getMyReviewApi,
  getMyReviewsApi,
  getReviewsApi,
  GetReviewsParams,
} from "@/api/review";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

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

export function useMyReviewQuery(reviewId: number) {
  return useQuery({
    queryKey: ["myReview", reviewId],
    queryFn: () => getMyReviewApi(reviewId),
    enabled: !!reviewId,
  });
}

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
  });
}

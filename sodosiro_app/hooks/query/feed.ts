import { getFeedApi, getFeedsApi, getMyFeedsApi } from "@/api/feed";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useFeedsQuery(size = 20) {
  return useInfiniteQuery({
    queryKey: ["feeds", size],

    queryFn: ({ pageParam }) =>
      getFeedsApi({
        size,
        cursor: pageParam,
      }),

    initialPageParam: undefined as number | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
  });
}

export function useFeedQuery(feedId: number) {
  return useQuery({
    queryKey: ["feed", feedId],
    queryFn: () => getFeedApi(feedId),
    enabled: !!feedId,
  });
}

export function useMyFeedsQuery(size = 20) {
  return useInfiniteQuery({
    queryKey: ["feeds", "myFeeds", size],

    queryFn: ({ pageParam }) =>
      getMyFeedsApi({
        size,
        cursor: pageParam,
      }),

    initialPageParam: undefined as number | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
  });
}

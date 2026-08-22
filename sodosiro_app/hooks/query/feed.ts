import { getFeedsApi } from "@/api/feed";
import { useInfiniteQuery } from "@tanstack/react-query";

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

export function useMyFeedsQuery(size = 20) {
  return useInfiniteQuery({
    queryKey: ["myFeeds", size],

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

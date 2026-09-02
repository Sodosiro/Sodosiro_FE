import { getFestivalsApi } from "@/api/festival";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useFestivalsQuery(
  areaCode = undefined,
  sigunguId: number | undefined = undefined,
  status: FestivalStatus = "ALL",
  size = 20,
) {
  return useInfiniteQuery({
    queryKey: ["likePlaces", areaCode, sigunguId, status, size],

    queryFn: ({ pageParam }) =>
      getFestivalsApi({
        areaCode,
        sigunguId,
        size,
        status,
        cursor: pageParam,
        year: new Date().getFullYear(),
      }),

    initialPageParam: undefined as number | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
  });
}

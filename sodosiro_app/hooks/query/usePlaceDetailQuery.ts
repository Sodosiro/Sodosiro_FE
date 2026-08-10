import { getPlaceDetailApi } from "@/api/place";
import { useQuery } from "@tanstack/react-query";

export function usePlaceDetailQuery(contentId: number) {
  return useQuery({
    queryKey: ["placeDetail", contentId],
    queryFn: () => getPlaceDetailApi(contentId),
    enabled: !!contentId,
  });
}

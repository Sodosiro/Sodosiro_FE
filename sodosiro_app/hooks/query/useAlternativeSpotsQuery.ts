import { getAlternativeSpotsApi } from "@/api/place";
import { useQuery } from "@tanstack/react-query";

export function useAlternativeSpotsQuery(contentId?: number | string) {
  return useQuery({
    queryKey: ["alternativeSpots", contentId],
    queryFn: () => getAlternativeSpotsApi({ contentId: contentId! }),
    enabled: !!contentId,
  });
}

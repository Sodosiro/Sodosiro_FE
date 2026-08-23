import { getRegionIntroductionApi, getVisitedRegions } from "@/api/region";
import { useQuery } from "@tanstack/react-query";

export function useRegionIntroductionQuery(sigunguId: number) {
  return useQuery({
    queryKey: ["region", sigunguId],
    queryFn: () => getRegionIntroductionApi(sigunguId),
    enabled: !!sigunguId,
  });
}

export function useVisitedRegionsQuery(areaCode: string) {
  return useQuery({
    queryKey: ["visitedRegion", areaCode],
    queryFn: () => getVisitedRegions(areaCode),
    enabled: !!areaCode,
  });
}

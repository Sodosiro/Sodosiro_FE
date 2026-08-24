import { getRegionIntroductionApi } from "@/api/region";
import { useQuery } from "@tanstack/react-query";

export function useRegionIntroductionQuery(sigunguId: number) {
  return useQuery({
    queryKey: ["region", sigunguId],
    queryFn: () => getRegionIntroductionApi(sigunguId),
    enabled: !!sigunguId,
  });
}

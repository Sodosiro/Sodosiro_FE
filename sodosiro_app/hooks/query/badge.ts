import { getBadgesApi } from "@/api/badge";
import { useQuery } from "@tanstack/react-query";

export function useBadgeQuery() {
  return useQuery({
    queryKey: ["badge"],
    queryFn: () => getBadgesApi(),
  });
}

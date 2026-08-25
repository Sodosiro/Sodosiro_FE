import { getBingoApi, getBingoSeasonsApi } from "@/api/bingo";
import { useQuery } from "@tanstack/react-query";

export function useBingoQuery(
  sigunguId: number,
  year?: number,
  seasonType?: SeasonType,
) {
  return useQuery({
    queryKey: ["bingo", sigunguId, year, seasonType],
    queryFn: () => getBingoApi(sigunguId, year, seasonType),
    enabled: !!sigunguId,
  });
}

export function useBingoSeasonsQuery() {
  return useQuery({
    queryKey: ["bingoSeasons"],
    queryFn: () => getBingoSeasonsApi(),
  });
}

import { postBingoGps } from "@/api/bingo";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { useMutation } from "@tanstack/react-query";

export function useBingoGpsMutation() {
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: ({
      contentId,
      latitude,
      longitude,
    }: {
      contentId: number;
      latitude: number;
      longitude: number;
    }) => postBingoGps(contentId, latitude, longitude),

    onSuccess: () => {
      invalidateQueries([["bingo"]]);
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
  };
}

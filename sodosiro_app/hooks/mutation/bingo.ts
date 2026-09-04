import { postBingoGps } from "@/api/bingo";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { useMutation } from "@tanstack/react-query";

export function useBingoGpsMutation() {
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: ({ contentId }: { contentId: number }) =>
      postBingoGps(contentId),

    onSuccess: () => {
      invalidateQueries([["bingo"], ["visitedRegion"], ["badge"]]);
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
  };
}

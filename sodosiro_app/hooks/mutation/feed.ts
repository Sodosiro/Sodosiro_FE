import { postLikeFeedApi } from "@/api/feed";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { useMutation } from "@tanstack/react-query";

export function useLikeFeedMutation() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (diggingId: number) => postLikeFeedApi(diggingId),

    onSuccess: () => {
      invalidateQueries([["feeds"]]);
    },
  });

  return {
    mutateAsync,
    isPending,
  };
}
